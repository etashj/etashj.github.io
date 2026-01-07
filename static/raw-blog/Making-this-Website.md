---
title: "Making this Website"
date: "2026-01-07"
author: Etash Jhanji
description: "built with svelte, tailwind, three.js, and a whole lot of cope"
keywords: ["svelte", "typescript", "tailwindCSS"]
link: https://etashj.github.io/blog/Making-this-Website
raw-link: https://etashj.github.io/raw-blog/Making-this-Website.md
---
Portfolio sites are extrememly common, if not expected, for people in the tech industry. They are a reflection of personality: showcasing accomplishments, project, design, and interests. But as software, especially frontend development, faces a critical point and LLMs take over the development of user experiences, more and more people are making portfolio sites. 

Now this is, of course, a good thing. More people are epxressing themselves and using these tools to create a public image for networking, but at some point it becomes disingeunous. How can AI slop be a good reflection of a person. A portfolio should showcase your desire to learn and build your skills and hsowcase existing ones. Vibecoding is a way to use syntactic vomit and sculpt it into a product to ship and iterate quickly. It defeats the purpose of writing and learning good code and user experience. 

With that in mind, this website was styled completely by a human (me) and human written (with a little AI help because it my first time using Svelte). Note that the full source is available on [GitHub](https://github.com/etashj/etashj.github.io). 

### the menu bar
#### desktop
Man this was a pain. If you didn't notice, when navigating between the five main pages, the floater in the menu bar slides between the pages and springs as well. The component library I'm using ([MeltUI](https://melt-ui.com)) didn't have exactly this, so it's coded fully from scratch with the [Svelte Spring class](https://svelte.dev/docs/svelte/svelte-motion#Spring). I think it looks pretty good, it's not very technicaly complicated, but it might be my favorite part of the website. It looks exactly how I imagined in my head and I have th esatisfaction of hand coding it and not using a navigation tool that was shat out by AI. 
#### mobile
To preserve my styleing I collapsed this into a dropdown menu, which is provided by MeltUI, much much less exciting. 

### the homepage
I wanted something minimal, and I had just seen two examples of ascii rendering of 3d models ([three.js example](https://threejs.org/examples/webgl_effects_ascii.html) and [Nolan Jiang's site](https://nolanjiang.com)), but I needed to pick something good to render. I naturally picked Pokemon becasue the models are [readily available](https://archive.vg-resource.com/thread-25872.html) (although with dubious legality, im not using them for profit). I also added a little tag in the corner since its kinda hard to tell which pokemon it is. My personal favorite is mew but it picks from a bank located at [/models.json](/models.json). 

### about page
It's kind of hard to make an about page interesting, but I also wanted to have a tl;dr version of the yap I have on the main page. Essentially I created these codeblocks to showcase each paragraphs details. The syntax highlighitng is manual 🥀 becasue I didn't foresee how annoying it would be to so it (I ended up adding syntax highlighitng anyway for these blogs). 

We have a big gap right here because fall break ended and I picked up development after winter break. I also switched from VSCode to [Zed](https://zed.dev). 

### projects page 
It's also hard to make a projects page interesting. I didn't want to break minimalism so I intentionally didn't include any images. I also decided to go for a glass kind of look to add some depth (and because my first iteration didn't look good at all). This was kind of annoying to animate with the tilt and light, but all in all not too bad. The projects are stored in json files and numbered in reverse order in the `$lib/data/projects` directory, so I can add and remove them as I like. 

### design page 
I wanted to keep this minimal while still including the images. So I was thinking about adding images with hover for descriptions, but lowkey didn't like any of my work enough to fill up the page. 

### blog page 
The blog page is really jsut a duplicate of the projects page. It reads from `$lib/data/blog` and lists all md files. The markdown files have headers which provide metadata which is parsed by [mdsvex](https://mdsvex.pngwn.io). For example, this blog has the following header. You can also download the source md file. 
```
---
title: "Making this Website"
date: "2026-01-07"
author: Etash Jhanji
description: "built with svelte, tailwind, three.js, and a whole lot of cope"
keywords: ["svelte", "typescript", "tailwindCSS"]
link: https://etashj.github.io/blog/Making-this-Website.md
raw-link: https://etashj.github.io/raw-blog/Making-this-Website.md
---
```
To make the files available statically, on the build the markdown files are copied to `static/raw-blog` which means htye can be served to the user easily for download. Try downlaoding this one at [https://etashj.github.io/raw-blog/Making-this-Website.md](https://etashj.github.io/raw-blog/Making-this-Website.md)

#### easter eggs
I wanted to added a few features just for fun to the site.
1. If you tap my name in the menu bar, it swaps the latin script to devanagari script in every instance of my name. 
2. At the homepage you can add parameters to select the pokemon, for example `https://etashj.github.io/?model=mew` will only render Mew and `https://etashj.github.io/?model=charizard.stl` will only render Charizard. Note that the `.stl` is optional
3. All of the blogs can be downloaded as markdown files for offline access

In other news, the website it written with SvelteKit and its static site adapter as well as tailwind for styles and typescript for scripting. Its built with the github pages workflow. Overall I'm pretty happy with this site, it looks better than the last one and is pretty efficient. This is also my first time writing a blog, but I'm glad it was super easy to add.
