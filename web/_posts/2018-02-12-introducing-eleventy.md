---
title: 'Introducing Eleventy, a new Static Site Generator'
tags:
  - eleventy
  - project
  - highlight
---

<p>
	<div class="primarylink"><a href="https://www.11ty.io">11ty.io</a></div>
	<div class="primarylink"><a href="https://github.com/11ty/eleventy">eleventy on GitHub</a></div>
</p>

---

Eleventy is a new static site generator.

_If you’re not familiar with static site generators and their benefits, check out this great Smashing Magazine post: [Why Static Site Generators Are The Next Big Thing](https://www.smashingmagazine.com/2015/11/modern-static-website-generators-next-big-thing/) from [@biilmann](https://twitter.com/biilmann)._

Another static site generator? Yes. But why? Fair question.

Eleventy was created for three reasons:

* Flexibility
* Betting on JavaScript
* Not a JavaScript Framework

## Flexibility

### Templating engine flexibility

Eleventy allows you to mix and match templating engines to allow easy migration of existing content. Your content templates can use a different templating engine than your layout files!

_Linda is a web developer that does client work (get that money, Linda). Linda maintains a set of cross-project docs that she delivers alongside her front end components and templates. Linda has coded her docs using the Liquid templating engine in Jekyll. Now Linda has a client that wants her to deliver her components as Mustache templates. Easy. Linda switches from Jekyll to Eleventy because Eleventy can do both side-by-side. Good job, Linda._

| Static Site Generator | staticgen.com Rating | Templating Engine |
| --- | --- | --- |
| Jekyll | #1 | Liquid |
| Hugo | #2 | Go Templates | 
| Hexo | #3 | EJS, Pug |
| Gatsby | #4 | React.js |

Eleventy currently supports:

* HTML
* [Markdown](https://github.com/markdown-it/markdown-it)
* [Liquid](https://www.npmjs.com/package/liquidjs) (used by Jekyll)
* [Nunjucks](https://mozilla.github.io/nunjucks/)
* [Handlebars](https://github.com/wycats/handlebars.js)
* [Mustache](https://github.com/janl/mustache.js/)
* [EJS](https://www.npmjs.com/package/ejs)
* [Haml](https://github.com/tj/haml.js)
* [Pug](https://github.com/pugjs/pug)
* JavaScript Template Literals (ES2015)

### Directory Structure Flexibility

Eleventy wants to work with your project’s existing directory structure. We don’t require your content files to live in a `_posts` directory or a `scaffold` or `source` folder (unless you want them to). You tell Eleventy where your files are and we’ll work with you.

Just running `eleventy` will process files in the current directory and output to a `_site` folder. Customize this with `--input` and `--output`.

#### Finds files in current directory and outputs to a _site folder

``` bash
eleventy
```

#### Finds files in src directory and outputs to a _gh_pages folder

``` bash
eleventy --input=src --output=_gh_pages
```

#### Finds files in current directory and outputs to current directory

``` bash
eleventy --input=. --output=.
```

#### I only want to transform one file

Eleventy can work as a small utility function to do one-off files too. This will transform `README.md` into `README.html`.

``` bash
eleventy --input=README.md --output=.
```

## Bet on JavaScript

Always bet on JavaScript. JavaScript gives you access to npm. The npm ecosystem is large. Crazy large. And it’s only growing in popularity. According to [modulecounts.com](http://www.modulecounts.com/), npm has almost three times the modules of its second place competitor, Maven Central (Java). When you want to add functionality, it’s a good bet that a module exists on npm.

| Static Site Generator | Language | Module Count |
| --- | --- | --- |
| Jekyll | Ruby | ~140,000 on rubygems.org |
| Hugo | Go | ~20,000 on Gopm |
| Hexo | JavaScript | ~580,000 on npm |
| Gatsby | JavaScript | ~580,000 on npm |

## Eleventy is not a JavaScript Framework

While Eleventy uses JavaScript in node.js to transform templates into content, importantly (by default) it does not recommend nor force your HTML to include any Eleventy-specific client-side JavaScript. This is a core facet of the project’s intent and goals. We are not a JavaScript framework. We want our content decoupled as much as possible from Eleventy altogether, and because Eleventy uses templating engines that are Eleventy-independent, it gets us much closer to that goal.

We may include some form of project-specific client-side JavaScript in the future but it will be opt-in only and _not a project default_. Of course, you may include your own project’s client-side JavaScript at the pleasure of your use case and requirements.

Just a fair warning—always analyze the output of static site generators, especially ones that are tightly coupled to JavaScript frameworks. Most JavaScript frameworks include opinionated client-side JavaScript, even when using server-side rendering. Those libraries can be hefty, sometimes blocking your critical path or causing unnecessarily network congestion in your critical path with `preload`. Performance is critical. Static files can offer amazing performance. To maintain that performance edge, Eleventy allows you to have full control over what and how JavaScript is included in your content.

## Try it out!

I hope you’ll give Eleventy a try! Install it!

``` bash
npm install -g @11ty/eleventy
```

Check out the tutorials on [11ty.io](https://www.11ty.io/). Let me know what you like or don’t like about it! I’d love to hear your feedback.

One of the smallest but nicest things you can do for the project is to [star it on GitHub](https://github.com/11ty/eleventy). The big giant list of static site generators on [staticgen.com](https://www.staticgen.com/) is ordered by GitHub stars, so that will help our ranking out a lot. Thank you!
