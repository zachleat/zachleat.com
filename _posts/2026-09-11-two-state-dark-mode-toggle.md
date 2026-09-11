---
title: "Trying out a Two-state Dark Mode Toggle"
---
Lea Verou sparked some lovely discussions about [dark/light mode toggles](https://lea.verou.me/blog/2026/dark-mode-toggles/) by asking a simple question: do these form controls need three options for two user-facing states?

You have _Dark_ mode (1). You have _Light_ mode (2). You have _System_ mode (inheriting your operating system preference) which is ultimately _Dark_ (1) or _Light_ mode (2). Typically the form controls have three options:

- _System_ (auto)
- _Light_ (saved on device as an override)
- _Dark_ (saved on device as an override)

In Lea’s proposal, you’d have:

- _System_ (auto)
- Opposite of _System_ (saved on device as an override)

Toggling back to system/auto should always clear any saved override preference.

I’ve added a little toggle to the footer of my own site (noting when the system preference matches the current selection with `(auto)`) and it looks like:

- `Dark (auto) [Toggle] Light` for users with a _Dark_ system preference.
- `Dark [Toggle] Light (auto)` for users with a _Light_ system preference.

I’m enjoying it so far!

I should also note that [Bramus did write a criticism](https://www.bram.us/2026/08/18/the-case-for-tri-state-dark-mode-toggles/) of the approach, noting a special case for users that have their system preference switch automatically (which I do personally use). I do think the simpler control and the simpler interaction (every toggle has a noticeable visual effect on the page) is worth the tradeoff there (personally). The strongest counterargument is that **one of the three options on the tri-state toggle has no visual effect at all.**

_Related: Lea’s reactions follow-up post: [The best dark mode toggle is probably none](https://lea.verou.me/blog/2026/dark-mode-toggles-2/)._