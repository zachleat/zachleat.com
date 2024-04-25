---
title: The Commit that Updated a Thousand Demos
video_title: Automatically Rebuild Shared Components with Site Mounting
tags:
  - cloudcannon
  - video
medialength: 5 min
toot: https://fediverse.zachleat.com/@zachleat/111381417124715846
---
CloudCannon launched a new feature today called [Site Mounting](https://cloudcannon.com/documentation/articles/site-mounting/) and I’m very excited about it. I put together a quick video demoing the feature, which I’ve immediately put to good use across a bunch of projects.

{%- renderTemplate "webc" %}
<div><youtube-lite-player @slug="IwZf9VdQbKo" :@label="$data.video_title"></youtube-lite-player></div>
{%- endrenderTemplate %}

If you’re interested in looking at the demos used in the video above, here they are: [Style Guide](https://wandering-cow.cloudvent.net/), [Site Mounting](https://ardent-desert.cloudvent.net/), and [Geolocation](https://busy-jellyfish.cloudvent.net/).

## Use Cases

{%- originalPostEmbed "https://cloudcannon.com/blog/share-components-and-syndicate-content-with-site-mounting/" %}

George Phillips goes on with a few more excellent use cases in his blog post: [Share components and syndicate content with Site Mounting](https://cloudcannon.com/blog/share-components-and-syndicate-content-with-site-mounting/).


> By enabling Site Mounting with source files, you can easily reuse (’mount’) your centrally managed site components and shared layouts across multiple CloudCannon sites and keep these components on all of your sites up to date — all from one single source of truth.

> Site Mounting means no more prebuild scripts to clone in files from Git, no more environment variables to share access to private repositories, no more committing dependencies directly into your Git repository, and no more complex custom APIs to rebuild your dependent sites after you’ve changed a single component.

> Site Mounting also unlocks the ability to mount the build output of a site in addition to its source files. In effect, you’re now able to set up a pre-generated headless API without GraphQL, where you can aggregate content from multiple sites into a single content lake that you control — and from that single hub, you can publish to any number of separate sites.
