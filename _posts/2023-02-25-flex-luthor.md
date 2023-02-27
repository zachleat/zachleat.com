---
title: Flex Luthor, a Little CSS Flexbox Layout Helper
tags: project
---
Just going through the backlog of some old projects and found this [Filament Group](https://www.filamentgroup.com/) gem that went unpublished!

Flex Luthor is a small CSS wrapper library to help with responsive intrinsic-sized Flexbox layouts that wrap based on content and container width (avoiding viewport-based media queries).

View the <a href="https://flex-luthor.zachleat.dev/" class="hed-h3">Demo</a> or <a href="https://github.com/zachleat/flex-luthor" class="hed-h3">Source Code</a>

This library predated Flexbox support for the `gap` property but I updated it to use `gap` in the new `v3.0.0` version. I think the coolest feature it provides is the addition of borders only when cells wrap to a new line (horizontal, vertical, or both).

## Install

Available on [`npm`](https://www.npmjs.com/package/@zachleat/flex-luthor)

```
npm install @zachleat/flex-luthor --save
```