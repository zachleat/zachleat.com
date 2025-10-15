---
title: How to import() a JavaScript String
tags: project
seo:
  openGraphBackgroundImage: /og/sources/bigolship.jpg
  openGraphAlt: A large container ship runs aground
posterImage:
  showOnPage: true
  height: 22em
tag_icon: "fab:js"
---
You can use arbitrary [JavaScript in front matter in Eleventy project files](https://www.11ty.dev/docs/data-frontmatter/#java-script-front-matter) (via the  `js` type).

Historically Eleventy has made use of the `node-retrieve-globals` package to accomplish this, which was a nightmarish conglomeration of a few different Node.js approaches (each with different advantages and drawbacks).

_Related research: [Dynamic Script Evaluation in JavaScript](https://github.com/zachleat/javascript-eval-modules)_

The biggest drawbacks to `node-retrieve-globals` include:

- CommonJS code only (even in [a `require(esm)` world](https://joyeecheung.github.io/blog/2024/03/18/require-esm-in-node-js/)). While dynamic `import()` works, `import` and `export` do not. Top level `await` is emulated typically by wrapping your code with an `async` function wrapper.
- It uses Node.js only approaches not viable as Eleventy works to deliver [a library](https://fediverse.zachleat.com/@zachleat/114434795493653605) that is [browser-friendly](https://neighborhood.11ty.dev/@11ty/114519676689929120).

Regardless, this abomination was a necessary evil due to the experimental status of Node.js’ [`vm.Module`](https://nodejs.org/docs/latest/api/vm.html#class-vmmodule) (since Node v12, ~2019), the ESM-friendly partner to CommonJS-compatible `vm.Script`. I’d still love to see `vm.Module` achieve a level of stability, but I digress.

## New Best Friend is `import()`

Moving forward, I’ve been having success from a much lighter approach using `import()`, described in [_Evaluating JavaScript code via import()_ by Dr. Axel Rauschmayer](https://2ality.com/2019/10/eval-via-import.html). It looks something like this:

```js
let code = `export default function() {}`;
let u = `data:text/javascript;charset=utf-8,${encodeURIComponent(code)}`;
let mod = await import(u);
```

Newer runtimes with `Blob` support might look like this ([example from David Bushell](https://github.com/dbushell/dinossr/blob/f555a4231c230aebc563194fc88778eb58270879/src/bundle/import.ts#L13-L16)):

```js
let code = `export default function() {}`;
let blob = new Blob([code], {type: "text/javascript"});
let u = URL.createObjectURL(blob);
let mod = await import(u);
URL.revokeObjectURL(u);
```

### Limitations

1. Importing a Blob of code does _not_ work in Node.js (as of v24), despite Node having support for Blob in v18 and newer.
	> Only URLs with a scheme in: file, data, and node are supported by the default ESM loader. Received protocol \'blob:\'
1. `import.meta.url` just points to the parent `data:` or `blob:`, which isn’t super helpful in script.
1. No import of relative references, even if you’ve mapped it to a full path via an Import Map.
	- e.g. `import './relative.js'`
		> TypeError: Failed to resolve module specifier ./relative.js: Invalid relative url or base scheme isn't hierarchical.
1. No import of bare references. These _can_ be remapped via Import Maps.
	- e.g. `import 'barename'`
		> TypeError: Failed to resolve module specifier "barename". Relative references must start with either "/", "./", or "../".

Though interestingly, Node.js _will_ let you import builtins e.g. `import 'node:fs'`.

## Enter `import-module-string`

I’ve worked around the above limitations and packaged this code up into `import-module-string`, a package that _could_ be described as a super lightweight runtime-independent (server or client) JavaScript bundler.

- [`import-module-string` on GitHub](https://github.com/zachleat/import-module-string)
- [`import-module-string` on npm](https://www.npmjs.com/package/import-module-string)

I was able to repurpose [a package I created in June 2022](/web/esm-import-transformer/) to help here: [`esm-import-transformer`](https://github.com/zachleat/esm-import-transformer) recursively preprocesses and transform imports to remap them to `Blob` URLs (falling back to `data:` when a feature test determines Blob doesn’t work).

```js
import { importFromString } from "import-module-string";

await importFromString(`import num from "./relative.js";
export const c = num;`);
```

Where `relative.js` contains `export default 3;`, the above code becomes (example from Node.js):

```js
await importFromString(`import num from "data:text/javascript;charset=utf-8,export%20default%203%3B";
export const c = num;`);
```

Which returns:

```js
{ c: 3 }
```

This transformation happens recursively for all imports (even imports in imports) with very little ceremony.

When you’ve added a [`<script type="importmap">` Import Map](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/script/type/importmap) to your HTML, the script will use `import.meta.resolve` to use the Import Map when resolving module targets.

### Even more features

A few more features for this new package:

- Extremely limited dependency footprint, only 3 dependencies total: `acorn`, `acorn-walk`, and `esm-import-transformer`.
- Multi-runtime: tested with Node (18+), some limited testing in Deno, Chromium, Firefox, and WebKit.
	- This was my first time using [Vitest](https://vitest.dev/) and it worked pretty well! I only hit one snag trying to [test `import.meta.resolve`](https://github.com/vitest-dev/vitest/issues/6953).
- Supports top-level `async`/`await` (as expected in ES modules)
- If you use `export`, the package uses your exports to determine what it returns. If there is no `export` in play, it implicitly exports all globals (via `var`, `let`, `const`, `function`, `Array` or `Object` destructuring assignment, `import` specifiers, etc), emulating the behavior in `node-retrieve-globals`. You can disable implicit exports using `implicitExports: false`.
- Emulates `import.meta.url` when the `filePath` option is supplied
- `addRequire` option adds support for `require()` (this feature is exclusive to server runtimes)
- Supports a `data` object to pass in your own global variables to the script. These must be `JSON.stringify` friendly, though this restriction could be relaxed with more serialization options later.
- When running in-browser, each script is subject to URL content size maximums: Chrome `512MB`, Safari `2048MB`, Firefox `512MB`, Firefox prior to v137 `32MB`.

As always with dynamic script execution, do not use this mechanism to run code that is untrusted (_especially_ when running in-browser on a domain with privileged access to secure information like authentication tokens). Make sure you sandbox appropriately!