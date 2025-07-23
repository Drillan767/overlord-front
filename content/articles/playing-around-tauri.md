---
title: Playing around Tauri
description: I had the opportunity to develop a "real" project for a friend,
  that required Taurus. Here are some return on experience
image: /images/tauri/logo.png
date: 2024-12-13
tags:
  - Rust
  - Vuetify
  - Vue 3
  - Tauri
---

## Intro

So, I have a friend who is a sound engineer for a company that asks him to create music and sounds for various projects. This is the same friend whose website [I made](/projects/geoffrey-turpin). He had an issue where he wanted his virtual instruments (or VSTs) to be equally audible for the user, so he had to find a way to ensure that every notes of every instrument wouldn't overlap each other.

So, he asked me for some help, and having never developed a standalone software, I happily accepted to lend a hand. The only problem is: all the technologies I know are web related, not "computer" related. Fortunately, Fireship released a video showcasing Tauri in a [video, in 100s](https://www.youtube.com/watch?v=-X8evddpu7M). I still looked over alternatives such as Electron or Wails, but I admit my mind was already made up. Plus, I didn't want to embed a whole Chrome browser just for a single page application.

## So, what is Tauri?

After creating a new Tauri project and checking out the created files, Tauri feels like your "average" Laravel project with a back-end, being Rust, and a front-end, being Vite with whatever you want with it. And, like with InertiaJS, some libraries allows you to communicate between the two languages. The main difference, though, is that Tauri as everything it needs to interact on your computer.

The main configuration entrypoint is a file located in the `src-tauri/` named `tauri.conf.json` , and looks like this:

```json [src-tauri/tauri.conf.json]
{
  "$schema": "https://schema.tauri.app/config/2",
  "productName": "Orchestral Range Tool",
  "version": "0.2.2",
  "identifier": "com.orchestral-range-tool.app",
  "build": {
    "beforeDevCommand": "yarn dev",
    "devUrl": "http://localhost:1420",
    "beforeBuildCommand": "yarn build",
    "frontendDist": "../dist"
  },
  "app": {
    "windows": [
      {
        "title": "Orchestral Range Tool",
        "width": 1600,
        "height": 900
      }
    ],
    "security": {
      "csp": null
    }
  },
  "bundle": {
    "createUpdaterArtifacts": true,
    "active": true,
    "targets": "all",
    "icon": [
      "icons/32x32.png",
      "icons/128x128.png",
      "icons/128x128@2x.png",
      "icons/icon.icns",
      "icons/icon.ico"
    ]
  },
  "plugins": {
    "updater": {
      "pubkey": "somePubKey",
      "endpoints": [
        "http://localhost:8000/orchestral-range-tool/{{target}}/{{current_version}}"
      ],
      "windows": {
        "installMode": "basicUi"
      }
    }
  }
}
```

As you can see, a lot of "basic" stuff is handled here, such as the program's icon, build command, resolution, version, name and even automatic update. But that's not all, because after reading a bit of documentation, you can see that just because Rust and Javascript / Typescript have nothing in common doesn't stop them from being able to communicate with each other.

For example, you can define a function in rust, and "invoke" it from the front-end, like so:

```text
// src-tauri/src/lib.rs

#[tauri::command]
fn my_custom_command() {
  println!("I was invoked from JavaScript!");
}
```

Then add it to the list of available commands in the `lib.rs` file from Rust, which is the equivalent of `main.ts` from Vite:

```text
// src-tauri/src/lib.rs

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
  tauri::Builder::default()
    .invoke_handler(tauri::generate_handler![my_custom_command]) // Add your command here!
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
```

Finally, you can "invoke" it from the front, like so:

```ts
// src/main.ts

import { invoke } from '@tauri-apps/api/core';

const invoke = window.__TAURI__.core.invoke;

// Invoke the command
invoke('my_custom_command');
```

This allows you to interact with the device you're on, to generate PDFs, connect to a local database, whatever you feel like doing.

The other way around allows the user to, for example, receive notifications from something that went on in the background. Tauri's documentation describes a way to inform Vite that the user logged in successfully to their account, so it can redirect the user to their dashboard:

```text
use tauri::{AppHandle, Emitter};

#[tauri::command]
fn login(app: AppHandle, user: String, password: String) {
  let authenticated = user == "tauri-apps" && password == "tauri";
  let result = if authenticated { "loggedIn" } else { "invalidCredentials" };
  app.emit_to("login", "login-result", result).unwrap();
}
```

Then "simply" listen to it from Vite:

```ts
import { listen } from '@tauri-apps/api/event';

interface AuthResult {
  result: 'loggedIn' | 'invalidCredentials'
}

listen<AuthResult>('login-result', (event) => {
  console.log(
    `Result from login is ${event.payload.result}`
  );
});
```

My knowledge of Rust is rather limited, and I didn't have any need for any Rust interaction, so I didn't interact with the Rust side at all, and focused on the Vite (and Vue 3 + Vuetify 3) part. If you want more details on it, check out the [project itself](/projects/orchestral-range-tool)!

Compiling your project locally will result in a program that can invoke your local Webview (Windows uses WebView2 aka Microsoft Edge , MacOS uses WKWebView, Safari's WebView component, Linux uses WebKitGTK), and inject compiled front-end assets to it.

When running the compiled program, Tauri:

1. Creates a window using the native windowing system
2. Instantiates the platform's WebView component within that window
3. Loads the embedded web assets into the WebView
4. Establishes the IPC bridge between WebView and Rust backend

And there you go, a fully functional and relatively small program that doesn't embed a whole browser in it.

## Conclusion

Building executable programs without the necessary knowledge is a problem that has started to fade away these last years, even more so with the growing popularity of AI. Still, to me, Tauri is an excellent way to learn more about the language, since with a click of the button in Javascript allows you to trigger function in Rust.

Also, this was the first time I could experiment with the DevOps aspect of software distribution, the kind that allows the user to update them by the click of a button displayed in a notification. It is possible to create a Github Action or a Gitlab CI that will build the program in all targeted versions, then will send an event to all programs that a new version is available. After that, Tauri has a self update function that does everything smoothly.

Just for that, I really recommend to give Tauri a go!
