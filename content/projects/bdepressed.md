---
title: Bédéprimée
description: E-commerce website for an artist that sells pins, stickers and
  artworks of her own creation!
image: /images/bdpressed/bedeprimee.png
date: 2024-10-10
tags:
  - Laravel
  - Vuetify
  - Vue 3
  - InertiaJS
---

I'll refrain my will to tell a never-ending story about how I started this project but will simply state that I couldn't sleep after having to order some fun stickers through a *Google Form.* Obviously, it was not the artist's fault, she simply didn't have any way nor knowledge to get a website for her. So I proposed myself

The website itself caused close to no problem whatsoever: Laravel back-end, Vue 3 + Vuetify as a front-end, she sent me the visuals of what she wanted, and I developed a back end for her to see all the orders, the stocks, the awaited payments, etc, etc. I never created an e-commerce website before, so a lot of concepts where new to me, even though nothing was mind breaking, just some logic stuff here to protect both the customer and the seller. Plus, the world reknowned Stripe documentation helped a lot to answer questions that the artists had about stuff she'll have to handle later.

For the question about where to host it, it got REALLY complicated. My goal at all cost was to make her save money by using some GAFAM cloud platforms or their open sourced version. I recently fell out of love with Supabase, because while their "classic" version has a lot of stuff that their self hosted version doesn't, plus, as I said somewhere else, if nothing happens in the project for 2 weeks, it gets stopped and needs to be restarted manually, and after 3 months, it simply needs to be removed. I know myself, there would be weeks where I wouldn't be able to work on it, and I wouldn't be able to guarantee that people will keep going on her website after the release, so betting on the idea that everything would go smooth wasn't a good idea.

Another idea was to use Amplify V2 from AWS. When I tried it, it was released just a few months prior, and fixing their last bugs. The concept itself was a bit messy with a concept of cloned sandboxes that are supposed to be hosted on the machines but also listed online, a perplexing role system that got me to create an issue on their Github repository, and the thing that got me to leave, aka the images no longer showing up because the "token needed to be refreshed". Neither Github, Reddit, ChatGPT nor Claude had a clue about what thing.

Finally, I opted on hosting it on my own server through Coolify. Basic Dockerfile, basic webhook to automatically deploy when something gets pushed or merged on `main` , the images keep showing up, the basic, concrete stuff.

At the time I'm writing this, this is the project's stack:

- Laravel 11
- InertiaJS 2.0
- Vue 3.7
- Vuetify 3.6
- Stripe's PHP SDK

And that's about all. Great project with a great artist that was excited as I was \:D
