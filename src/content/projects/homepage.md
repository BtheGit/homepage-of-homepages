---
title: "Homepage of Homepages"
description: "The current iteration of my personal page, and also a collection of variations on the homepage theme. In progress."
url_live: "https://www.brendanbeltz.com/"
image: "/umbrella/umbrella-profile-md.jpg"
---

## Project background

My personal page has long been neglected and I was looking for inspiration for updating it. In the end, accidentally falling down the rabbit hole of Stable Diffusion proved the biggest catalyst. It started with trying to come up with a way to entertain my 4 year old nephew and realize his imaginary playmate Super Speedy Robot. I wanted to find some way to turn his descriptions and crayon scrawlings into something akin to the spiderman and lego worlds he's become obsessed with. But it turns out, he hated the results. The uncanny valley between AI realistic art and what was in his head was too great. But it was fun, I had gone through the pain of getting SD running locally, and I decided to get silly. I found a listing of all the artists SD knew by name, wrote a script to batch process the image at different weights through them (it's slow on my laptop) over the course of a few nights, and then handpicked the 50 or so that would blend well. 

## Implementation Notes

- The big challenge I found was that I couldn't find a library to do the crossfading between images I wanted (CSS and element hacks weren't very performant if I wanted 100s of images). So I ended up writing a small utility to do that. You'll see the different tiles crossfading constantly at different offsets. 
- Turns out I couldn't find what I wanted for text either. So taking a gist that demonstrated a cute svg morph hack, I extended it to let me cycle through developer related dad jokes as well. I plan to go back and package the image cross fader separately for vanilla, react, and svelte.
- Despite it being a single page, the whole thing is running on Astro because it was a good framework-agnostic platform for handling other project demoes I might want to add later without the need for subdomain redirects.

## Next Steps

This page will always be in progress as I add new feature demoes and variations on the profile theme.