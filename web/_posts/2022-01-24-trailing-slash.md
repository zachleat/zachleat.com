---
title: 'Trailing Slashes on URLs: Contentious or Settled?'
postRank: 1
tags:
  - popular-posts
---

After some discussion with [{% indieAvatar "https://whitep4nth3r.com/" %}Salma](https://whitep4nth3r.com/) last week, I decided it was worthwhile to do a deep dive on Trailing Slashes in URLs. More specifically, which of these should I be using?

- `http://zachleat.com/resource`
- `http://zachleat.com/resource/`

I did what any curious but self-doubting person might do in this situation. I [posted a Twitter poll](https://twitter.com/zachleat/status/1485010201937944578). The results surprised me!

But before we go much further, let’s go over the problems we’re trying to solve:

1. **Performance**: when you leave off a trailing slash and the platform expects one (or vice versa), you get a redirect which is a performance no-no.
2. **SEO**: if your content exists at two (or more!) distinct URL endpoints, it is a SEO no-no. SE-no-no. SEO-apolo-graphql-anton-ohno (I apologize for nothing). `*Ahem*`. You _need_ redirects.
3. **Asset References**: if your markup uses relative paths to reference assets (e.g. `<img src="image.avif">`), these URLs may break if your host isn’t aggressive enough with redirects to a canonical home base.
4. [**Cool URIs Don’t Change**](https://www.11ty.dev/docs/permalinks/#cool-uris-dont-change): we want to avoid including any file extension in our URLs.

At the end, the most important piece to remember here is that **consistency is king**. No matter which approach you use for a specific resource (trailing slash or sans the slash), it should be the canonical version and it should be used everywhere (even when third parties link to your site). Any other non-canonical version of the URL should (ideally) redirect to the canonical version.

_Interestingly, some of my surprise at current sentiment was that [developers sometimes use different strategies for different types of content within the same project](https://twitter.com/chriscoyier/status/1485079001689255936)! That was something I did not expect and am curious how well that is supported by tooling._

## Perspectives

I think the leaky part of the poll in question is that there are a bunch of different perspectives to this problem:

1. Developers, wanting to implement a personal or team preference.
2. App/site/framework tooling (e.g. say, uh, you’re the maintainer of Eleventy)
3. Platform (e.g. Netlify—casting a wide net and thinking what works best across as many tools and frameworks as possible)

_Disclosure: I am both an employee of Netlify and the creator/maintainer of Eleventy._

[{% indieAvatar "https://sebastienlorber.com/" %}Sebastien Lorber](https://sebastienlorber.com/) has put together an [incredible repository of research results](https://github.com/slorber/trailing-slash-guide) showing how this works on a variety of popular hosts and static site generators. I’ll reference this data throughout this post. Sebastien also included results for a variety of different configuration options on those different platforms. I simplified to platform-default behavior for this post.

### Writing `resource/index.html`

Gatsby, Docusaurus, NuxtJS, and Eleventy all use folder generated `resource/index.html` files to offer an easy and portable way to use trailing slashes by default.

The default filename `index.html` is a convention that’s pretty safely cemented in web history at this point. It represents the file shown when a file name is not specified in the URL. _Citations from [Apache](https://httpd.apache.org/docs/2.4/mod/mod_dir.html#directoryindex), [NGINX](https://docs.nginx.com/nginx/admin-guide/web-server/serving-static-content/), [LiteSpeed](https://docs.litespeedtech.com/cp/cpanel/switch-apache/#what-changes-do-i-need-to-make-to-my-apache-configuration-to-make-it-work), [Microsoft IIS](https://docs.microsoft.com/en-us/iis/configuration/system.webserver/defaultdocument/)._

Here’s what happens when a web browser makes a request to a URL representing this content:

- `/resource`
  - ✅ GitHub Pages, Netlify, and Cloudflare Pages redirect to the trailing slash `/resource/` as expected.
  - 🟡 **Warning:** Vercel, Render, and Azure Static Web Apps: slashless `/resource` returns content but without redirects, resulting in multiple endpoints for the same content.
- `/resource/`
  - ✅ All hosts agree that `/resource/` should return content from `resource/index.html`
- 💔 **Warning:** If you’re using relative resource URLs, the assets may be missing on Vercel, Render, and Azure Static Web Apps (depending on which duplicated endpoint you’ve visited).
  - `<img src="image.avif">` on `/resource/` resolves to `/resource/image.avif`
  - `<img src="image.avif">` on `/resource` resolves to `/image.avif`

### Writing `resource.html`

Both Jekyll and Next.js take a different approach. They output `resource.html` instead of index.html files.

Here’s what happens when a web browser makes a request to a URL representing this content:

- `/resource`
  - ✅ Almost everyone agrees that `/resource` should return content from `resource.html`
  - 🆘 **Warning:** Confusingly Vercel is the only host tested that returns a HTTP 404 error for `/resource`.
- `/resource/`
  - ✅ Netlify and Cloudflare Pages redirect to the slashless `/resource`.
  - 🆘 **Warning:** GitHub Pages, Vercel, and Azure Static Web Apps all return a HTTP 404 error. I’ll admit this one is a little more contentious. I won’t take a hardline here—I can see the reasoning behind it. But I do consider it better to redirect than 404.

### ⚠️ Writing Both `resource.html` and `resource/index.html`

There exists an even edgier edge case here. What happens when `resource.html` and `resource/index.html` both exist in a project?

- `/resource`
  - ✅ Everyone agrees that `/resource` should return content from `resource.html`
- `/resource/`
  - ✅ Almost everyone agrees that `/resource/` should return content from `resource/index.html`
  - 🆘 **Warning:** Netlify redirects to `/resource` instead.

More seriously, I think this case actually represents a larger URL _usability problem_ for the content. In this case, though pedantically and technically correct, `/resource` and `/resource/` confusingly resolve to different pieces of content. I think this should be avoided if at all possible and a **tooling error** is warranted. It could be argued that Netlify takes an opinionated stance here to attempt to resolve the ambiguity at a platform level.

<div class="callout callout--11ty callout--sm">
  {%- renderTemplate "liquid,md" -%}
  <div class="callout-hed">{% indieAvatar "https://www.11ty.dev/" %}Eleventy Specific Note</div>

Eleventy users can rest easy: because input files `resource.html` and `resource/index.html` both write to the output directory at `_site/resource/index.html` by default, we throw a `DuplicatePermalinkOutputError` error to mitigate this for you. (You can force the issue using `permalink` if you _really_ want)
{%- endrenderTemplate -%}

</div>

## Results Table

Here’s a summary table of the above findings, leaving off the (in my opinion) flawed _Writing Both_ case above.

**Legend**:

- 🆘 HTTP 404 Error
- 💔 Potentially Broken Assets (e.g. `<img src="image.avif">`)
- 🟡 SEO Warning: Multiple endpoints for the same content
- ✅ Correct, canonical or redirects to canonical

<table class="fullwidth">
  <thead>
    <tr>
      <th></th>
      <th colspan="2"><code>resource.html</code></th>
      <th colspan="2"><code>resource/index.html</code></th>
      <!-- <th colspan="2">Both</th> -->
    </tr>
    <tr>
      <th>Host</th>
      <th><code>/resource</code></th>
      <th><code>/resource/</code></th>
      <th><code>/resource</code></th>
      <th><code>/resource/</code></th>
      <!-- <th><code>/resource</code></th>
      <th><code>/resource/</code></th> -->
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><a href="https://slorber.github.io/trailing-slash-guide">GitHub Pages</a></td>
      <td>✅</td>
      <td>🆘 <code>404</code></td>
      <td>✅➡️ <code>/resource/</code></td>
      <td>✅</td>
      <!-- <td>✅</td>
      <td>✅</td> -->
    </tr>
    <tr>
      <td><a href="https://trailing-slash-guide-default.netlify.app">Netlify</a></td>
      <td>✅</td>
      <td>✅➡️ <code>/resource</code></td>
      <td>✅➡️ <code>/resource/</code></td>
      <td>✅</td>
      <!-- <td>✅</td>
      <td>🆘➡️ <code>/resource</code></td> -->
    </tr>
    <tr>
      <td><a href="https://vercel-default-eight.vercel.app">Vercel</a></td>
      <td>🆘 <code>404</code></td>
      <td>🆘 <code>404</code></td>
      <td>🟡💔</td>
      <td>✅</td>
      <!-- <td>✅</td>
      <td>✅</td> -->
    </tr>
    <tr>
      <td><a href="https://trailing-slash-guide.pages.dev">Cloudflare Pages</a></td>
      <td>✅</td>
      <td>✅➡️ <code>/resource</code></td>
      <td>✅➡️ <code>/resource/</code></td>
      <td>✅</td>
      <!-- <td>✅</td>
      <td>✅</td> -->
    </tr>
    <tr>
      <td><a href="https://trailing-slash-guide.onrender.com">Render</a></td>
      <td>✅</td>
      <td>🟡💔</td>
      <td>🟡💔</td>
      <td>✅</td>
      <!-- <td>✅</td>
      <td>✅</td> -->
    </tr>
    <tr>
      <td><a href="https://polite-bay-08a23e210.azurestaticapps.net">Azure Static Web Apps</a></td>
      <td>✅</td>
      <td>🆘 <code>404</code></td>
      <td>🟡💔</td>
      <td>✅</td>
      <!-- <td>✅</td>
      <td>✅</td> -->
    </tr>
  </tbody>
</table>

## So, what?

Ideally, (speaking as the maintainer of Eleventy) folks working on developer tooling should craft tools to create output that uses existing conventions and can be portable to as many hosts in as many different hosting environments as possible.

That being said, given the above information it seems clear to me that `resource/index.html` is marginally safer than `resource.html` for tooling (on the premise that resolved but duplicated content with potentially missing assets is better than a 404 error 😅).

What’s more, I think it is the unique job of our development tools to help diagnose and mitigate future production problems. My (very biased) opinion is that more frameworks and tools should take a harder line in preventing confusingly similar but distinct URLs in a project. It is a usability error to have `resource.html` (output to `/resource`) and `resource/index.html` (output to `/resource/`) fighting over the same URL in the same project, and we should treat it as such.
