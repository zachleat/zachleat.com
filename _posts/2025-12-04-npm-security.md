---
title: No more tokens! Locking down npm Publish Workflows
tags: eleventy
---
With the recent spate of high profile npm security incidents involving compromised deployment workflows, I decided that it would be prudent to do a full inventory of my npm security footprint (especially for [11ty](https://www.11ty.dev/)).

Just in the last few months:

- `November 2025`: [Shai Halud v2 (PostHog)](https://socket.dev/blog/shai-hulud-strikes-again-v2) (and [PostHog post-mortem](https://posthog.com/blog/nov-24-shai-hulud-attack-post-mortem)): Worm infected ×834 packages. Propagated via `preinstall` npm script.
- `September 2025`
	1. [Shai Halud (`@ctrl/tinycolor`, CrowdStrike)](https://socket.dev/blog/tinycolor-supply-chain-attack-affects-40-packages): Worm infected ×526 packages. Propagated via `postinstall` npm script.
	1. [DuckDB](https://socket.dev/blog/duckdb-npm-account-compromised-in-continuing-supply-chain-attack): targeted phishing email (_with_ 2FA) pointed to fake domain `npmjs.help`. Compromised packages were published with token created by attacker.
	1. [`debug` and `chalk`](https://socket.dev/blog/npm-author-qix-compromised-in-major-supply-chain-attack): same as above: targeted phishing email (_with_ 2FA).
- `August 2025`: [S1ngularity (Nx)](https://socket.dev/blog/nx-packages-compromised) (and [Nx post-mortem](https://nx.dev/blog/s1ngularity-postmortem)): well-meaning but insecure code (from approved authors) was merged which allowed arbitrary commands to be executed via content in Pull Requests to the repo. Compromised packages were published via a stolen NPM token.

<details>
<summary>Expand to see the insecure YAML from the S1ngularity attack <!-- https://github.com/nrwl/nx/pull/32458/files --></summary>

{% raw %}
```sh
# Some content omitted for brevity
on:
  pull_request:
    types: [opened, edited, synchronize, reopened]
  # …
jobs:
  validate-pr-title:
    # …
    steps:
      # …
      - name: Create PR message file
        run: |
          mkdir -p /tmp
          cat > /tmp/pr-message.txt << 'EOF'
          ${{ github.event.pull_request.title }}

          ${{ github.event.pull_request.body }}
          EOF

      - name: Validate PR title
        run: |
          echo "Validating PR title: ${{ github.event.pull_request.title }}"
          node ./scripts/commit-lint.js /tmp/pr-message.txt
```
{% endraw %}

</details>

Given the attack vectors of recent incidents, any packages using GitHub Actions (or other CI) to publish should be considered to have an elevated risk (and this was very common across [`11ty`’s _numerous_ packages](https://github.com/orgs/11ty/repositories)).

I’ve been pretty cautious about npm tokens. I have each repository set up (painstakingly) to use _extremely_ granular tokens (access to publish one package and one package _only_). This limits the blast radius of any compromise to a single package and has helped manage my blood pressure (I accidentally [leaked](https://github.com/11ty/eleventy-plugin-syntaxhighlight/issues/93) a token earlier this year).

## Security Checklist

I’ve completed my review and made a bunch of changes to improve my security footprint on GitHub and npm, noted below. The suggestions below avoid introducing additional third-party tooling that may decrease your footprint short-term (while actually increasing it long-term).

Caveat: my current workflow uses GitHub Releases to trigger a GitHub Action workflow to publish packages to npm (and this advice may vary a bit if you’re using different tools like GitLab or pnpm or yarn, sorry).

1. Use {% icon "fas:check-double" %}**Two-Factor Authentication** (2FA) for both GitHub AND npm, for _every_ person that has access to publish. This is table-stakes. No compromises. Require 2FA everywhere.
	- On GitHub, go to your organization’s Settings page and navigate to Authentication Security. Check the _Require Two-factor authentication for everyone_ and _Only allow secure two-factor methods_ checkboxes.
	- npm requires you to specify this on a per-package basis that I describe in the _Restrict Publishing Access_ section below.
1. When logging into npm and GitHub, use your {% icon "fas:key" %}**password manager exclusively**! Never type in a password or a 2FA code manually. Your password manager will help ensure that you don’t put in your credentials on a compromised (but realistic looking) domain.
	- Would you know that `npmjs.help` was a spoofed domain? Maybe on your average day, but on your worst day? When you didn’t sleep well the night before? 😴
1. Review GitHub users that have the [{% icon "fas:pencil" %}Write role](https://docs.github.com/en/organizations/managing-user-access-to-your-organizations-repositories/managing-repository-roles/repository-roles-for-an-organization#permissions-for-each-role) in your repositories (Write can create releases).
1. Find any repositories using NPM tokens and {% icon "fas:skull" %}**delete the tokens** in the settings for _both_ GitHub and npm. We’re moving to a post-token world.
	- {% icon "fas:trophy" %}Success criteria is having [0 Access Tokens listed in your npm Settings](https://fediverse.zachleat.com/@zachleat/115652337081660540) (granular or otherwise).
1. Switch to use [{% icon "fas:plug" %}**Trusted Publishers**](https://docs.npmjs.com/trusted-publishers) (OIDC) in the Settings tab for each npm package. This will also setup the release to include provenance as well (which is great).
	- This scopes your credentials to one specific GitHub Action (you specify which file to point to in `.github/workflows/`) and allows you to remove any references to tokens in the GitHub Actions YAML configuration file.
	- The big goal here for me was to completely separate my publish workflow and credentials and disallow any access to those credentials from other workflows in the repository (usually unit tests that run on every commit to the repo). You _could_ also use GitHub Environments to achieve this. This limits the blast radius from worm propagation (via `postinstall` or `preinstall`) to publish events only (not every commit), which is far more infrequent.
1. **Restrict npm Publishing Access** in the Settings tab for each npm package. Use the _Require two-factor authentication and disallow tokens (recommended)_ option. Death to tokens!
1. Check in your {% icon "fas:lock" %}**lock file** (e.g. `package-lock.json` for npm). This is especially important when using a release script that uses npm packages to generate release artifacts. Use [`npm ci`](https://docs.npmjs.com/cli/v10/commands/npm-ci) instead of `npm install` in your release script.
1. GitHub Actions configuration files should {% icon "fas:thumbtack" %}**pin the full SHA** for `uses` dependencies (e.g. [`eleventy-plugin-vite`](https://github.com/11ty/eleventy-plugin-vite/blob/c04e9630b8c89a9ca8896eb0ab35328323d99ee1/.github/workflows/release.yml#L14-L15)). I learned that [Dependabot can update and manage these](https://github.com/11ty/eleventy-plugin-vite/blob/c04e9630b8c89a9ca8896eb0ab35328323d99ee1/.github/dependabot.yml#L9) too!<!-- I’m reminded of my [`setup-node` dependency failing on Node 22](https://fediverse.zachleat.com/@zachleat/112814100573630319) last year (though I couldn’t say conclusively whether or not this would have avoided that issue). -->

### Other good ideas

Given the above changes, I would consider the following items to not to be of immediate urgency (though still recommended).

- GitHub: Enable [{% icon "fas:house-lock" %}Immutable Releases](https://docs.github.com/en/code-security/supply-chain-security/understanding-your-software-supply-chain/immutable-releases) preferably at the organization level. This will ensure no one can change tags and release contents after a release has been shipped.
- Use a package manager {% icon "fas:snowflake" %}cooldown.
	- Added the [`cooldown` option to my Dependabot configuration](https://docs.github.com/en/code-security/dependabot/working-with-dependabot/dependabot-options-reference#cooldown-) (direct [link to `dependabot.yml`](https://github.com/11ty/eleventy/blob/bcd75f56524a3874aeb3dfb49569ffd5ac745ca5/.github/dependabot.yml#L12-L13)). This updates production dependencies weekly, now with a 7 day cooldown.
	- I usually use `npm-check-updates` for local package.json file maintenance. It has a [`cooldown` option too](https://github.com/raineorshine/npm-check-updates?tab=readme-ov-file#cooldown)!
	- `npm install` does have a [`--before`](https://docs.npmjs.com/cli/v11/commands/npm-install#before) option to pass a Date that can be used similarly (though isn’t [relative](https://github.com/npm/cli/pull/8802)).
	- More on [socket.dev: pnpm 10.16 Adds New Setting for Delayed Dependency Updates](https://socket.dev/blog/pnpm-10-16-adds-new-setting-for-delayed-dependency-updates)
- Reduce {% icon "fas:arrow-down" %}dependencies! Every third party dependency has some risk associated with it, as you’re inheriting a bit of those developers’ security footprint too. It’s worth noting that the work being done by the folks at [e18e](https://e18e.dev/) to reduce dependency counts is making great headway to improve the ecosystem at large. You can do this in your own projects! I’m proud of the work we’ve done on `@11ty/eleventy` over the years (source: [v3.1.0 release notes](https://github.com/11ty/eleventy/releases/tag/v3.1.0)): <table>
  <thead>
    <tr>
      <th>Version</th>
      <th>Production Dep Count</th>
      <th>Production Size</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>v3.1.0</td>
      <td>×142</td>
      <td>21.4 MB</td>
    </tr>
    <tr>
      <td>v3.0.0</td>
      <td>×187</td>
      <td>27.4 MB</td>
    </tr>
    <tr>
      <td>v2.0.1</td>
      <td>×215</td>
      <td>36.4 MB</td>
    </tr>
    <tr>
      <td>v1.0.2</td>
      <td>×356</td>
      <td>73.3 MB</td>
    </tr>
  </tbody>
</table>

- Some folks recommend disabling scripts when installing (via `npm config set ignore-scripts true` or via stock use of [pnpm](https://pnpm.io/)). This might be marginally useful in some cases but in my opinion is just a short term solution in response to common attack patterns that we’ve already seen. Importing (or requiring) a compromised or malicious package can execute arbitrary commands without using a `preinstall` or `postinstall` script just fine. If you really need to lock down your environment, you might consider running a [Virtual Machine](https://www.virtualbox.org/), [Dev Container](https://code.visualstudio.com/docs/devcontainers/create-dev-container), and/or using [Node.js’ Permissions model](https://nodejs.org/docs/latest/api/permissions.html) or [stock Deno](https://docs.deno.com/runtime/fundamentals/security/).

Stay safe out there, y’all!

## Additional Reading

- [snyk NPM Security Best Practices](https://snyk.io/articles/npm-security-best-practices-shai-hulud-attack/)
- [Publishing More Securely on npm: Guidance from the OpenJS Security Collaboration Space](https://openjsf.org/blog/publishing-securely-on-npm)
- [Publishing from CI with 2FA (GitHub Tutorial)](https://github.com/npm-pub-2025/ci-publish)