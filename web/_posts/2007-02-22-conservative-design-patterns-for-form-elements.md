---
title: Conservative Design Patterns for Form Elements
author: Zach Leatherman
layout: post
permalink: /conservative-design-patterns-for-form-elements/
categories:
  - Interface Design
tags:
  - Conservative Design
  - Design Patterns
  - feedtrim
---

Have you ever been to a web site that looks as though it has been built exclusively using pre-made bulky widgets cookie cuttered right onto the page? Lovely grid components, sweet over-featured WYSIWYG editors, maybe a Google or Yahoo map thrown in on the page for good measure. Conformist web sites using the conditioning forced upon them by time, executive, or work-ethic based constraints. The widgets on these websites either seem too bulky, reinventing the wheel with avant-garde user interaction for a confusing user experience, or they are just too lightweight to justify using at all.

What I’m proposing is a standard set of Design Patterns for form input, as an extension to already existing HTML form elements. By describing the best practices for certain use cases of input, we can form a set of building blocks that can be used to enhance existing forms, instead of replacing them with totally new ways of user interaction.

So keeping away from [the spirit of inventing names for things that are already being done][1], I won’t be trivializing this idea with a catch phrase. Instead I hope you will realize the value of **BUILDING BLOCKS** over **cookie cutters**.

 [1]: http://www.adaptivepath.com/publications/essays/archives/000385.php

These components be used to handle the tween cases of GUI development, where the interaction doesn’t warrant a full blown widget, but requires more than a standard HTML form element. I would be excited to see work done at this level of GUI development inside of the JavaScript libraries that are out there instead of work on the overblown “Widget Set” that seems to be the buzz in the community.

**Spectrum of GUI Elements**

Raw HTML Inputs (Text, Password, Select…) -> Smidgets -> Full Blown Widgets (Editable Grid, Rich Text Editor)

**Legend**

*   Toggle Option On or Off (Toggle)
*   Select 0-1 Options From a List (Select1)
*   Select 0 Options From a List (Select )
*   Input 0 Characters into an Element (InputX)
*   Input is obfuscated to prevent from being read (Obfuscated)

To describe what we want, let’s first see what we have.

**Existing HTML Elements**

*   Buttons (clicking performs a data altering action or form submission action) 
    *   Submit
    *   Reset
    *   Push (without attached behavior)
*   Checkbox (Toggle)
*   Checkbox Group (Select )
*   Radio Group (Select1)
*   Select Single (Select1)
*   Select Multiple (Select )
*   Text (InputX)
*   Textarea (*antiquated due to CSS styled word wrapping multi line Text input*) (InputX)
*   Password (InputX, Obfuscated)

And because this is going to be a series, I’ll continue with my first case of a Conservative Design Form Element in a new post.

Let me just reiterate that I do hope you take the ideas for these GUI components and develop them in your favorite JavaScript library. The purpose of this is to come up with a set of feature-based standards so that people don’t have to keep developing their own components over and over again. Do you have an idea for a feature that you think should be included in the standard or luxury feature set of a component? Post it in the comments of that component blog post and I’ll certainly modify the post with your suggestions.
