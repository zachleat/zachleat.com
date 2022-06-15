---
title: "Use esm-import-transformer for “isomorphic-ish” ECMAScript Modules"
tags: project
---
This is a small Node utility that uses [Acorn](https://github.com/acornjs/acorn) to change the location of `import` specifier locations.

```js
// Before
import {html, css, LitElement} from "lit";

// After
import {html, css, LitElement} from "https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js";
```

* [Source code on GitHub](https://github.com/zachleat/esm-import-transformer)

This is useful when you want to use the same input source JavaScript code to run in both a server context and a client context, without making huge modifications to the code! It could also be used as a build-time workaround for import maps until [browser support improves](https://caniuse.com/import-maps).

_Practically speaking, I used this in a [couple places](https://twitter.com/zachleat/status/1534205971807064071) to implement the SSR examples for [`<is-land>`](https://github.com/11ty/is-land)._

The transformations are mapped using standard import maps objects and the package can run as an ES module (via `import`) or in CommonJS (via `require`).

## Usage

Pass in a source code string and an [import maps](https://github.com/WICG/import-maps) object.

```js
// Import the ES Module:
import { ImportTransformer } from "esm-import-transformer";

// or use with CommonJS:
// const { ImportTransformer } = require("esm-import-transformer");

let it = new ImportTransformer();

let sourceCode = `import {html, css, LitElement} from "lit";`;

let importMap = {
  imports: {
    lit: "https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js"
  }
};

let outputCode = it.transform(sourceCode, importMap);
```

## Installation

Available on [npm](https://www.npmjs.com/package/esm-import-transformer) and [GitHub](https://github.com/zachleat/esm-import-transformer)

```
npm install esm-import-transformer
```