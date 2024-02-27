---
title: "Connect Frog"
description: "An online head to head multiplayer strategy game of jockeying for position, like connect four with a twist."
url_live: "https://connectfrog.com/"
image: "/projectIcons/connect-frog.png"
---

## Project Background

Similar to Yordzzle, trying to stay connected over long distances proved the inspiration for this. I had introduced my partner to a new two player abstract strategy board game with an adorable theme (titled Boop). We wanted to play it long distance. It was a good opportunity to derust on websocket based interactive products and lobby management, so I jumped in headfirst. The game supports private rooms, a public lobby, audio settings, live chat, and more.

## Implementation Notes
- I wanted this one to run on free infrastructure with minimal maintenance requirements. That meant not having to be responsible for auth, malicious behavior, etc. I did a long selection process between a number of libraries, implementations, and full fledged frameworks around websocket based communications and management, as well as hosting platforms. In the end I went with Socket.io in express, dockerized, running on Fly.io. Instead of using Socket.io namespacing and room support though, I wrote my own to get around a few limitations. 
- It's using React without any frameworks, with a custom build system (using Parcel) primarily to let me package custom audio sprites during build time. (It's gotten a lot easier since the days when I had to write my own AST walkers to get webpack and gulp to do what I needed them to!)


## Next Steps

An alpha release was planned and then put on hold because of life events. The game is still live and fully playable, but no marketing has been spent. I hope to restart the alpha plans in 2024.