---
title: The portfolio website that took two years to simplify
description: A developer's journey from custom CMS complexity to file-based
  simplicity. Learn why I chose Nuxt over Astro, ditched Tailwind for Vuetify,
  and why markdown files solved my portfolio website problems.
image: /images/this-website/website.png
date: 2024-12-15
tags:
  - Nuxt
  - Vuetify
  - Vue 3
---

## Intro

Building a portfolio website should be simple, right? Wrong. Well, after two years of technology shifts, abandoned projects, and a forgotten "be back soon" webpage, I learned that sometimes the best solution is the one you almost overlooked. Here's the honest story of how my portfolio website evolved from an over-engineered custom CMS dream to a streamlined Nuxt-powered site — including the year I completely forgot it existed.

In this article, I'll walk you through the decision-making process behind choosing the right tech stack for a personal website, compare popular content management solutions, and share why sometimes stepping back leads to the best path forward.

## The Custom CMS Dream (And Why I Abandoned It)

A lot of things have changed since I developed my previous version of the website. The first thing I wanted was to build my own CMS, with everything it implied, meaning authentication, content type creation, translation, etc. My end goal was to be able to clone the project, tweak a few fields, and anyone could have their own custom CMS. Also, even though I was satisfied with the front-end part of the website, I wasn't **fully** satisfied. The glitch effects were a hassle to do, and I felt like the purple I used had a problem. Also, Tailwind is good, but I'm not a huge fan of having 30 classes per HTML elements.

## Discovery: Vuetify Changes Everything

The job I started around the time I finished the previous one was using Vuetify 2, which at the time had a beta release of their 3rd version. While it took a long time to be usable, the ability to rapidly build interfaces and configure settings application-wide was mind blowing to me. You no longer had to do something like the following to define how your div will display:

```vue [src/app.vue]
<div class="bg-white dark:bg-gray-800 rounded-lg px-6 py-8 ring shadow-xl ring-gray-900/5">
  <div>
    <span class="inline-flex items-center justify-center rounded-md bg-indigo-500 p-2 shadow-lg">
      <svg class="h-6 w-6 stroke-white" ...>
        <!-- ... -->
      </svg>
    </span>
  </div>
  <h3 class="text-gray-900 dark:text-white mt-5 text-base font-medium tracking-tight ">Writes upside-down</h3>
  <p class="text-gray-500 dark:text-gray-400 mt-2 text-sm ">
    The Zero Gravity Pen can be used to write in any orientation, including upside-down. It even works in outer space.
  </p>
</div>
```

Instead, you just define primary, secondary, and even ternary colors if you want, then you override those Vuetify defines by default.

```ts [src/plugins/vuetify.ts]
const themes: Record<string, ThemeDefinition> = {
  light: {
    colors: {
      background: '#F5F5F5',
      surface: '#FFFFFF',
      // ...
      'surface-light': '#e8e8e8',
      'success-tonal': '#e8F5E9',
      'on-success-tonal': '#1B5E20',
    },
    dark: false,
    variables: {
      'overlay-background': '#161c1f',
    },
  },
  dark: {
    colors: {
      ...statusColors,
      background: '#060808',
      surface: '#121414',
      // ...
      'surface-light': '#38393a',
      'success-tonal': '#212e22',
      'on-success-tonal': '#42a33d',
    },
    dark: true,
    variables: {
      'overlay-background': '#161c1f',
    },
  },
};
```

All that's left is to handle the theme switch, and the colors will be applied on their own without requiring any addional classes.

Getting rid of Tailwind for Vuetify went way faster than I expected, but I guess that batteries-included components ready to use do save lots of time. But the more I thought about it, the more I realized that even though I wanted something customisable, I wasn't planning to use it.

## The Great Simplification

So I decided to create a single html / css webpage that said "The website is being migrated, just hang in there, it'll come reaaaally soon!", then got to work:

Exit the custom CMS (that was barely started at this point), hello Directus, a gorgeous headless CMS that's already working like a charm and has tons of features! Exit also the translation, hello english-only website! And finally, exit light / dark theme handling, hello dark only theme!

## One Year Later: The Forgotten Website

And after this... Nothing, for a whole year. I had other preoccupations, other side projects, and other duties that I needed to attend to. Then one day, (aka, a month ago), I stumbled upon my own domain name and just wanting to check if what I thought was my website was up, I found myself facing my "temporary" message that I set up a year ago. Whoops.

Soooo back to work. But, once again, time flew by, new technologies appeared in the meantime, as did AI technologies... To sum up, web development completely transformed itself in the span of a single year. And this time, even though I know I'm able to handle rather big websites with lots of services, at the end of the day, what I wanted to have for myself needed to be as simple as possible: server side rendering, content managing, Vue 3 and Vuetify 3.

## Back to Basics: Choosing the Right Stack

The biggest headache was to choose what kind of content management I wanted. I found settling for a whole SQL database was overkill for what I had in mind, which would be maximum 3 or 4 tables, but maybe even less, so I didn't want to have a huge CMS just for this, needing to update it every once in a while. Also, there would also be the question of backing up my data just in case something bad happened, as well as the uploaded media, that would also be automated, etc, etc.

Another solution would be to use a "Backend as a Service". Like Firebase, Appwrite, or Supabase, but each of them have their downside:

- Appwrite only have a noSQL as database
- When using their cloud, Supabase disables the project if nothing happens for more than 2 weeks, and completely if nothing happens for more than 3 months. The only solution is to pay 30€ per month. Pricey, even though it handles backups, logins, media, and a postgresSQL. But pricey.
- I find Firebase to be... to big for just a portfolio. Plus, it's noSQL by default. There's indeed a new SQL database, named DataConnect, but it requires to give your credit card informations, and I really don't like it. Plus, I have seen quite a lot of [horror stories](https://www.webapper.com/aws-cost-horror-stories/) about bills skyrocketing because of a bad configuration.

So, where does this leave us?

With a file based content management, where every single one of them is stored on Github. Same for any media. Also, no need to authentication, so no need to handle an admin part, security, roles, etc. Any update would be a commit, a building time, and \~tadaaa\~, the website is now updated with close to no down time!

The last question was to determine which framework to use. I originally ditched Nuxt because I had one or two bad experiences with it, and thought about simply going with Vue. But then, I heard of Astro that would both handle server side rendering and using markdown files to generate content, so I tried it. While the development experience was nice, I realized several things:

- I had a hard time figuring out stuff that I knew how to do with Vue
- You *can* install Vue on the top of Astro, which would then do most of the hard work
- I couldn't find a material design framework made for Astro that suited me, so I thought that I still could install Vuetify
- ... But then, why use Astro at all?
- Oh and, Nuxt 4 just got released!
- And it can do server side rendering, and its plugin, [Nuxt Content](https://content.nuxt.com/), can handle markdown files!
- You can even define fields in the markdown file's header, and it's available in typescript afterwards!

So, in the span of a few days, I generated a design similar to the "old" one with [Lovable](https://lovable.dev/), found a new glitch effect for my headings that was way less of an hassle to setup, and got to work. And tadaaa, here's my new website, with hopefully no more major updates in the future.

Cherry on the top, I discovered [Coolify](https://coolify.io/), which, once installed, allows the user to use their server as a Vercel dashboard and deploy anything they want in just a few clicks. 10/10, would recommend.

## Key Takeaways: Less is More

Looking back at this chaos that was my journey, the biggest lesson is that personal projects don't need enterprise-level complexity. Here's what I learned:

**Start simple**: File-based content management with Git backing is perfectly adequate for most portfolios and nothing to be ashamed of. No database, no authentication headaches, no backup concerns. No. Headache.

**Embrace constraints**: Dropping features like multi-language support and light/dark themes wasn't giving up — it was focusing on what actually mattered.

**Technology churn is real**: What seemed cutting-edge two years ago might be outdated today. Falling back to the "boring" choice (like Nuxt) is the right one because it's stable and well-documented, and doesn't have the hassle to "waste" time to learn new stuff just for one purpose.

**Perfect is the enemy of done**: My custom CMS would probably still be half-finished if I hadn't simplified. The current site took days instead of months to build.

If you're building your own portfolio, ask yourself: what's the minimum viable solution that meets your actual needs? You might be surprised how little you really need.

Want even more details on the technical part of the website, go ahead and check it the [project section](/projects/this-website)!
