---
title: "Yordzzle"
description: "A wordle clone with added features for UI customization and multiplayer challenges"
url_live: "https://www.yordzzle.com/"
image: "/projectIcons/yordzzle.png"
---

## Project Background

The year before last, my partner was caught up in the wordle craze along with everyone else. But, like many, she was chafing at the restrictive once-per-day drip-feed gameplay. (This was in the days before wordle unlimited had emerged.) I quickly spun up a toy single-page project that let her play as much as she wanted. I scraped the dictionary wordle itself used to keep it interesting. But very quickly, it turned out, what she really wanted was a way to compete with me. She then moved to Vietnam for work. So I went and turned the prototype into a full blown app that not only lets you play unlimited amounts, but also challenge friends remotely to beat your own scores. Also, because she is a statistics nerd and likes cute stuff, it has way more charts and themes than any other wordle-clone did at the time (maybe still does?).

## Implementation Notes
- As a challenge, I did it in vanilla JS with my own custom component rendering solution. (No VDOMs needed). I've had to build my own simplified rendering library solutions in the past for work and it was a bit of a derust in that aspect.
- I wanted to avoid any kind of user management or auth (a normal thing for my toy projects that are public but may not be supported long term) so I relied heavily on localstorage for user management. However, the big feature of the game that sets it apart is being able to see the results of challenges you send to other players. I did a few feasibility prototypes, but in the end this was a great use case for trying out Cloudflare Pages and Functions for an API that interfaces with a firestore backend for game state syncing between players.
- The other biggest challenge ended up being sharing results. Wordle has a famously simple way to copy your results to clipboard to paste in social media. I wanted direct share buttons. I'd written features like this before professionally, but had never had an opportunity to use the new webshare api. Unfortunately, it wasn't completely ready for primetime across android, desktop, and iphone. So I had to implement a lot of fallbacks under the hood, especially on mobile.

## Next Steps

I never promoted it, and the world was awash with wordle clones last year, but when I just checked the stats, despite no maintenance in a year, there seem to still be a small group of people still using it long after my partner and I stopped.