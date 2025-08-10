---
image: /images/supabase.jpg
title: Setting up SSO in a self-hosted Supabase instance
date: 2025-08-09
description: A step-by-step guide to configuring OAuth SSO authentication
  (Twitter/X) in a self-hosted Supabase instance using Docker, including
  frontend integration and common troubleshooting tips
tags:
  - Supabase
  - Docker
  - SSO
---

## Intro

A bit of context first. In a previous article, I talked about how I fell out of love with Supabase, because, on free plan, not using a project for 2 weeks would disable it, and not for 3 months would disable it **PERMANENTLY**.

I was still frustrated because, having tried to self host a Supabase instance made me realised that it was nowhere near the experience of using it on Supabase's servers, and most of the things I was used to find easily weren't easy to find, such as auth providers.

For Sarah's Garden project, I defaulted using Firebase and DataConnect to do the same things I did with Supabase earlier, meaning realtime, SQL database and most importantly (to me at least), SSO login with Twitter. I knew it would have a cost, but hey, at least it wouldn't be deactivated after a while.

I recently got last month's bill and it was 6€, which, sure, I can afford, but my VPS hosting costs less, and I was (for now) the only one using it. So, back to trying to make Supabase work, I guess.

## Self-hosting

I also talked about this earlier, but I have Coolify in my server to deploy almost anything I want in a matter of a few clicks and a few minutes. They offer lots of packages ready to use, such as databases, applications, CMS, S3 services, etc, etc. If they don't have it, you can still use a Dockerfile or a docker-compose file to import it yourself. And, of course, they propose Supabase, with lots of stuff already configured. If you don't have Coolify and don't want to install it, you can still find what we'll talk about in the `docker/docker-compose.yml` of your cloned project. In any case, you'll need to have Docker installed on the server or device on which you want to host Supabase, as well as a pre-configured SSO. For Twitter, you'll need to save the API key and secret in the `CLIENT_ID` and `CLIENT_SECRET` of GoTrue, but we'll talk about it later.

## Front-end

To be able to authenticate with your favourite SSO, you'll need the following boilerplate (it's rather framework-agnostic, but I'll use Vue as an example)

```vue [app.vue]
<script setup lang="ts">
import { createClient, type Session } from "@supabase/supabase-js";
import { ref, onMounted } from 'vue'

// Remember not to commit your secrets!
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;
const hostName  = import.meta.env.VITE_HOSTNAME // http://localhost:5173 or https://yourdomain.com

const supabase = createClient(supabaseUrl, supabaseKey);

async function signInWithTwitter() {
    await supabase.auth.signInWithOAuth({
        provider: 'twitter',
        options: {
            redirectTo: hostName,
        },
    })
}

// This will contain the authenticated user's basic informations
const authSession = ref<Session | null>(null)

onMounted(async () => {
    // Start listening to auth events on mounted
    supabase.auth.onAuthStateChange((event, session) => {
        if (event === 'SIGNED_IN') {
            // Update the authSession with the user's informations
            authSession.value = session
        }
    })
})

</script>

<template>
  <div class="app">
    <h1>Welcome to the App</h1>
    <button @click="signInWithTwitter">Sign in with Twitter</button>
    <div v-if="authSession">
    <!-- May vary depending on the used SSO -->
      <h2>Welcome, {{ authSession.user.user_metadata.full_name }}</h2>
    </div>
  </div>
</template>
```

## Enabling your SSO

So, I'll take my case in example and use Twitter OAuth, but you're obviously free to pick whichever SSO you need / want. You'll still need to add the following environment variables to the auth section of the docker-compose.yml file, though:

```yaml [docker-compose.yaml]
services:
  # ...
  supabase-auth:
    # ...
    environment:
      # ...
      - GOTRUE_EXTERNAL_TWITTER_ENABLED=true
      - GOTRUE_EXTERNAL_TWITTER_CLIENT_ID=your-twitter-client-id
      - GOTRUE_EXTERNAL_TWITTER_SECRET=your-twitter-client-secret
      - GOTRUE_EXTERNAL_TWITTER_REDIRECT_URI=https://supabase.yourownwebsite.com/auth/v1/callback
```

But that's not all, because at this point, if you did everything correctly so far, when you'll try to log in, you'll be redirected to Twitter / your SSO, but then, back to... your Supabase dashboard. Something is missing.

Edit your docker-compose.yml file again, and add the following:

```yaml [docker-compose.yaml]
services:
  # ...
  supabase-auth:
    # ...
    environment:
      # ...
      - GOTRUE_SITE_URL=https://your-real-website.com
      # Add the following to be able to use the auth system locally while developing your website
      - GOTRUE_URI_ALLOW_LIST=http://localhost:5173 
```

All you need now is to restart your Supabase instance, and you should be good to go!

## Why this article?

Mainly because it was a struggle to find any information on how to setup SSO on a self-hosted Supabase, while it took me about 10 clicks on a free plan. Also, while setting up environment variables in Coolify's global deploy configuration works 99% of the time, it didn't work here so I got a little bit frustrated, until I discovered how these variables were supposed to be set up. I also discovered that the auth provider page was *hidden* in self-hosted thanks to this [comment](https://www.reddit.com/r/Supabase/comments/19dryse/comment/lj2549p/?utm_source=share\&utm_medium=web3x\&utm_name=web3xcss\&utm_term=1\&utm_content=share_button). Finally, because I wish I had found an article or a video talking about how to setup this kind of thing without too much hassle.
