---
title: The Smorgasbord of Windows Terminal… Windows
---
Over the years the Eleventy project has seen some things. One of the issues we’ve seen crop up a few times now involved the Quick Start guide, which had a few steps that asked folks to create a few new files in a Terminal application.

Notably, not everyone is familiar with [Terminal applications so we have some introductory documentation on that too](https://www.11ty.dev/docs/terminal-window/).

It started with this command:

```sh
echo '# Heading' > index.md
```

This worked fine for folks on macOS or Linux but in some cases caused issues for some Windows users.

For folks using the **Command Prompt** application in Windows (also known as `cmd.exe`) this new `index.md` incorrectly included the single quotes in the file’s content: `'# Heading'`. Command Prompt developers need to run the command without the quotes:

```sh
echo # Header > index.md
```

For folks using the **Terminal** application in Windows (also known as **Windows PowerShell**—versions of PowerShell v5 and prior; the one that is bundled by default with VS Code), the `>` _redirection_ operator encodes files using UTF-16 (and not the typical UTF-8 expected by Eleventy) resulting in `��#� �H�e�a�d�i�n�g�` output in the browser.

Terminal/PowerShell developers need to use the following command:

```sh
echo '# Header' | out-file -encoding utf8 'index.md'
```

For folks using **PowerShell Core** (the new cross-platform open source terminal application from Microsoft) or **Windows Subsystem for Linux** (also known as WSL), the original command works without issue:

```sh
echo '# Header' > index.md
```

This _smorgasbord_ adds some hurdles. Folks on Windows machines need to:

1. Know how to open a Terminal application
1. Know _what_ Terminal application they’ve opened
1. Pick the right command for their specific Terminal application type

<table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Availability</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Command Prompt</td>
      <td>Default</td>
    </tr>
    <tr>
      <td>Terminal, Windows PowerShell <code>&lt;=5</code></td>
      <td>Default, VS Code Default</td>
    </tr>
    <tr>
      <td>PowerShell Core <code>&gt;=6</code></td>
      <td>Installation required</td>
    </tr>
    <tr>
      <td>Windows Subsystem for Linux</td>
      <td>Installation required</td>
    </tr>
  </tbody>
</table>

Microsoft seems to be iterating in the right direction with the long-term goal of elevating PowerShell Core as the primary terminal application, but the legacy applications are significantly muddying the waters!

## Moving forward

Here’s how we’re trying to help Windows folks navigate this complexity:

1. We added a tabs interface for the different commands for: macOS, Linux, Windows, and Cross Platform.
1. The Windows tab shows the PowerShell specific command using `out-file`. It’s compatible with both Windows PowerShell and PowerShell Core.
1. If `out-file` doesn’t work in your Windows terminal application (if you’re using Command Prompt), we recommend using the Cross Platform method.

The Cross Platform command uses a new, tiny [11ty/create package](https://github.com/11ty/create) that writes a string argument to a file using `utf8` encoding.

```sh
npx @11ty/create index.md "# Heading"
```

The above works in macOS, Linux, or Windows (anywhere `npx` does, requiring Node v18 or newer). No `package.json` installation is required and it installs on the fly.

`@11ty/create` is a little [75 lines-of-code](https://github.com/11ty/create/blob/5499a74e989458b30fe6d5a3e3e74bfd9f2458f2/create.js) utility written in ESM, using the [Node test runner](https://nodejs.org/docs/latest/api/test.html) and Node’s built-in [`util.parseArgs`](https://nodejs.org/api/util.html#utilparseargsconfig). It only has [one dependency for colorized terminal text](https://www.npmjs.com/package/kleur).

This may make way for more code-generation utilities in 11ty moving forward but only with the right problem-solving/complexity/automation/education trade-offs.

## Character Encoding Detection

I did also experiment with some character encoding detection (via [`node-chardet`](https://github.com/runk/node-chardet)) to gives folks a better error messaging experience when they attempt to process more exotic file encodings in Eleventy.

This approach had a significant performance cost and while very impressive and well-coded (zero dependencies and 22KB!) it was still _guessing_ (more or less) so the tradeoff didn’t make sense in this case.