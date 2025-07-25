---
title: How to setup your own icon set in Vuetify 3
description: "How to use custom SVG icons in Vuetify 3: alias strategy, font
  generation, and hybrid approaches with practical examples."
image: https://images.unsplash.com/photo-1506729623306-b5a934d88b53
date: 2024-12-14
tags:
  - Vue 3
  - Vuetify 3
---

## Intro

Vuetify 3 has made lots of changes from Vuetify 2, and obviously, icon management is one of them.

By default, Vuetify 3 uses the Material Design Icon, but has the [documentation](https://vuetifyjs.com/en/features/icon-fonts/#installing-icon-fonts) to help anyone use another icon set.

However, things tend to be more difficult if you have your own set of SVG icons that doesn't come from any library.

For this, you have 2 possibilities:

## Display your icons as a SVG (alias strategy)

This solution is the fastest way to display anything custom, but it comes with a few drowbacks:

1. The SVG icon must be a square of 24x24px and have a viewBox of `0 0 24 24`. Otherwise, the icon will be cropped to fit this requirement.
2. Your custom icon will only be callable with a "$" sign before it. Meaning, an icon called ie "add-image" will only display with the following syntax:

```vue [src/app.vue]
<template>
  <v-icon icon="$add-image" />
</template>
```

3. The icon itself will render as a SVG markup in your HTML. The only "risk" I can think of is if you have a CSS rule targeting SVG markups.

If you have no problem with these concerns and only have a few icons, then this is how you do it:

1. Import Vuetify's default aliases

```ts [src/plugins/vuetify.ts]
import { aliases } from 'vuetify/iconsets/mdi'
```

2. Create a variable that's an object containing dynamic keys and arrays of strings as values, and spread the default aliases from vuetify in it.

```ts [src/plugins/vuetify.ts]
const customAliases = {
    ...aliases,
    'add-image': [
        'M7.54 19h-2.54v-6h0.25c0.024 0.001...',
        'M15.46 9.14c-0.070-0.005-0.152-0.007-0.235-0.007s-0.165...',
        'M21 19.24c-0.286-0.948-1.004-1.686-1.919-1.994l-0.021-0.839...',
    ],
    'other-icon': [
        'M19.8 5.3c-0.1 0.7-0.1 1.3-0.2 2-0.3 1.5-1...'
    ],
    // Other icons...
}
```

As you can see, the particularity is that you need to copy your SVG's different `<path>`'s `d` attribute and paste it one after the other.

Once done, add your aliases to your Vuetify configuration:

```ts [src/plugins/vuetify.ts]
export default const vuetify = createVuetify({
  // Your other configuration
  icons: {
    defaultSet: 'mdi',
    aliases: {
      ...customAliases,
    },
    sets: {
      mdi,
    },
  },
});
```

Once your server refreshes, all your new icons will be available with a $ before their name.

## Display your icon as a font (iconSet strategy)

This solution is slightly longer to setup, but it allows more icons to be loaded

1. Generate an SVG icon set from IcoMoon.

[IcoMoon](https://icomoon.io/) is a web app where you can upload SVG files (or IcoMoon configurations), and you can download them as font, with autogenerated (s)css. To do so, follow [this tutorial](https://redcrackle.com/blog/using-icomoon-convert-svg-icons-icon-fonts/). Please note that the "preferences" button in the "Generate fonts" tab allows you to customize some of the generated css files, such as if you want a scss file instead, prefix/suffix classes, etc.

As specified at the end of the tutorial, the downloaded files contain a directory named "fonts" with your SVG converted to fonts, 2 (s)css files (variables and styles), a html/css example of implementation and a readme file.

The files we need are the font directory, the generated (s)css files and the json file. Simply put them in your assets directory alongside other style files. Mine looks like so:

```bash
assets/
| exported-font/
| - variables.scss
| | fonts/
| | - exported-font.svg
| | - exported-font.woff
| |  - exported-font.ttf
| - exported-font_icomoon.com.json
| - style.scss
```

We now need to import the style file, declare a new icon set, and register it to Vuetify.

1. Import the style file

```ts [src/plugins/vuetify.ts]
// We'll need this h() function in the next step.
import { h } from 'vue'
import '@/assets/fonts/exported-font/style.scss'
```

2. Declare the icon set

In my example, let's say I defined my prefix class for my icons as "imi-" (for "**im**ported **i**cons).

```ts [src/plugins/vuetify.ts]
const importedIcons = {
    component: (props) => {
        return h('i', { class: `imi-${props.icon}` })
    },
}
```

This small function loops through all the icons you defined in IcoMoon, (say, "custom-icon" and "other-icon", and applies a prefix icon. This is useful in my project, but you can simply return `props.icon` otherwise.

Also, the `i` passed as first parameter will generate all your icons inside a `<i>` markup, just like the default MDI icons.

3. Registering the icon set

Update your configuration like follows:

```ts [src/plugins/vuetify.ts]
export default const vuetify = createVuetify({
  // Your other configuration
  icons: {
    defaultSet: 'mdi',
    sets: {
      mdi,
      imi: importedIcons,
    },
  },
});
```

As stated in Vuetify's documentation, you can define which icon set is the default one. If not set, "mdi", will be the one by default.

Your custom font is now available with the following markup:

```vue [src/app.vue]
<template>
  <v-icon icon="imi:custom-icon" />
</template>
```

That's all! By the way, both the alias and the icon set strategy allow you to specify your icon through Vuetify's component props!

```vue [src/app.vue]
<template>
  <!-- With the alias strategy  -->
  <v-list-item prepend-icon="$custom-icon" title="Alias method" />

  <!-- With the icon set strategy -->
  <v-list-item prepend-icon="imi:custom-icon" title="Icon set method" />
</template>
```

## Bonus: iconSet, with external svgs

Let's say that you couldn't manage to generate one specific icon with IcoMoon, or that you just don't want to go through the hassle of generate a whole new icon set just for one added icon ; you have the SVG file, you need it *right away*, but you still want to use your custom `imi-` set. There's a possibility for that!

1. Create a new Vue file with just your SVG inside

```vue [src/components/icons/CustomIcon.vue]
<template>
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="28"
        height="28"
        viewBox="0 0 28 28"
    >
        <path fill="#373f51" d="M17.151 3.445l6.613 6.513-6.613 6.505z" />
        <path fill="#2cc4a7" d="M15.597 3.445v21.109l-6.542-14.602z" />
        <path fill="#adffed" d="M9.448 4.793l-5.212 5.16 11.361 14.602-6.542-14.602z" />
    </svg>
</template>
```

2. Edit your `importedIcon` 's component function

```ts [src/plugins/vuetify.ts]
// Recommended imports
import type { IconProps, IconSet } from 'vuetify'
// The icon you just created
import CustomIcon from '@/components/icon/CustomIcon.vue'
import SomeOtherIcon from '@/components/icon/SomeOtherIcon.vue'

const importedIcons: IconSet = {
    component: (props: IconProps) => {
        switch (props.icon) {
            case 'custom-icon':
                return h(CustomIcon)
            case 'some-other-icon':
                return h(SomeOtherIcon)
                // This doesn't change:
            default:
                return h('i', { class: `imi-${props.icon}` })
        }
    },
}
```

3. Use your new icons!

Now these new icons will be available with the syntax you'd expect:

```vue [src/app.vue]
<template>
  <v-icon icon="imi:custom-icon" />
  <v-icon icon="imi:some-other-icon" />
</template>
```

## Why this tutorial felt necessary?

I found myself in a situation where I needed to migrate a Vue 2 / Vuetify 2 project to a Vue 3 / Vuetify 3 version, and all the custom icons we had in it weren't working anymore, showing a small rectangle with characters in it.

At first, I avoided the problem by using the aliases system (took me a while to figure out how it worked), but then we quickly realized all the drowbacks, and the required fix was to downsize ALL the icons, making them appear smaller than how they looked in Vuetify 2.

Then I took some more time to find an explanation to why the custom icons would not simply display, and TL;DR, the following css rules was the main culprit:

```css [vuetify.css]
.mdi::before {
    display: inline-block;
    font: 24px/1 Material Design Icons;
    font-size: inherit;
    text-rendering: auto;
    line-height: inherit;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}
```

These CSS rules does not exist in Vuetify 2. The `mdi` class didn't have any property at all.

However, removing it from the markup in Vuetify 3 via my browser would break all the default icons, but my custom ones would finally show up. The culprit was obviously the `font:` rule that allows mdi icons to display properly.

As I told you earlier, the default icon set is mdi, and Vuetify translates this by adding a `mdi` class to all `<v-icon>` components, *unless* you specify another set.

After that, it was kind of easy to understand what needed to be done, but I felt this tutorial was even more required after how unclear the instructions from Vuetify were.

## Conclusion

Migrating custom icons from Vuetify 2 to Vuetify 3 is always challenging due to significant changes in how the framework handles icon management. While the official documentation covers standard icon libraries, it leaves developers with custom SVG icons searching for solutions.

This tutorial provides three practical approaches: the quick alias strategy for simple use cases, the comprehensive icon set strategy using IcoMoon for larger icon collections, and a hybrid approach for mixing font icons with individual SVGs. Each method has its trade-offs, but understanding these options will help you choose the right approach for your project's needs.

The key insight is that Vuetify 3's default MDI class styling can interfere with custom icons, which is why specifying a custom icon set prevents these conflicts and ensures your icons display correctly. With these strategies, you can maintain the flexibility of custom icons while leveraging Vuetify 3's improved architecture.
