---
title: Resume/CV on the Jamstack
tags:
  - jamstack
---
When I applied to work at Netlify, I put in a little work to update my dusty old résumé. It’s considered best practice to continually update your résumé, but who does that?? I’ve since discovered that my résumé can do some of this work for me and keep itself updated with a little help from the Jamstack, pulling in data from my blog and other data sources from around the web.

This post was inspired by a few other résumé helpers I found floating around the web past week:

* [How to not make a résumé in React by {% twitterImageAvatar "ericwbailey" %}Eric Bailey](https://ericwbailey.design/writing/how-to-not-make-a-resume-in-react.html)
* [Eleventy Résumé Builder by {% twitterImageAvatar "mxbck" %}Max Böck](https://mxb.dev/blog/eleventy-resume-builder/)

## Have a gander at the ol’ resume

* View [**Zach Leatherman’s Résumé**](/resume/)
* Have a peek at the [Source Code](https://github.com/zachleat/zachleat.com/blob/b2b538994cd7696839900a22acde3e72daf9f5ab/resume/index.liquid)
* Look at the [data sources](https://github.com/zachleat/zachleat.com/blob/b2b538994cd7696839900a22acde3e72daf9f5ab/resume/index.11tydata.js)

## Fed by blog data

> Public Speaker in eight different countries: 15 conferences, 13 meetups, seven barcamps, 12 podcasts, and one University guest lecture.

> 197 posts since February 2007, 57 entries on Web Fonts.

The above statements are generated by blog posts and metadata from post front matter. By meticulously tagging posts on my blog with this metadata, it can generate how many conferences and meetups I’ve done. For example, here’s the relevant front matter from a Smashing Conference in Barcelona:

```yaml
metadata:
  speaking:
    type: conference
    country: Spain
```

## Fed by social media

Twitter avatars are fetched for people, companies, and organizations for some nice visuals. These are cached in the build for four weeks before a new one is requested. Counts from social media networks are also updated from the build.

> 1,530 members and growing, 50+ speakers, 90+ events.

The number of members in NebraskaJS are fetched dynamically from Meetup.

> Eleventy (☆ 5,024)

GitHub star counts for projects I’ve worked on are injected from real data.

> @eleven_ty (4,218 followers)

Twitter follower counts are also retrieved and updated by the build.

## Update your resume for the last time (not really)

Hopefully this has given you some inspiration to automate some of your résumé content so that you don’t have to keep it updated manually! As always, it’s important not to automate too much or it’ll appear robotic—but knowing what to automate and what to keep manual is part of the magic.
