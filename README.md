# ITZFIZZ - Scroll-Driven Smartphone Hero
A cinematic, scroll-controlled hero section where a futuristic smartphone tells the story.

## The story (what happens as you scroll)
1. **Intro** - the phone fades and scales in on page load.
2. **Impact stats** - as you scroll, the phone keeps moving (left, then up/down with a slight tilt) and four statistics appear one by one around it.
3. **Zoom** - the phone moves to the centre and zooms in. The stats fade away and the phone screen turns into a glowing grid with a counter.
4. **Disappear** - the phone zooms through the screen and fades out.
5. **Headline** - "WELCOME ITZFIZZ" appears letter by letter.
6. **Final layout** - the four stats come back one by one under the headline, then a small phone arrives between them.

## Tech stack
| Tool                 | Used for |

| React 18             | Components and structure |
| Vite                 | Dev server and build |
| Tailwind CSS 3       | Layout, spacing, typography, responsive design |
| GSAP + ScrollTrigger | Pinned, scrubbed scroll timeline and load animation |

## How the animation works
- **One pinned timeline.** `useScrollAnimation.js` creates a single GSAP timeline with `ScrollTrigger` (`pin: true`, `scrub: 1`). The hero stays fixed while scroll progress drives the timeline, so everything feels like one continuous story.
- **Timings in one place.** The `const t = {...}` object in the hook holds the start time of each stage. Change a number there to speed up or slow down a stage.
- **Separate transform layers.** The phone has three nested wrappers: `.phone-scroll` (ScrollTrigger), `.phone-tilt` (mouse tilt) and `.phone-enter` (page load). Each animation owns its own element, so they never fight over `transform`.
- **Data-driven stats.** Cards are rendered from `data/stats.js` through one `StatCard` component. Each stat is rendered twice: once floating around the big phone and once in the final row. The floating copies are hidden from screen readers.
- **Mouse tilt.** On desktop with a real mouse, the phone tilts up to about 4 degrees. It is disabled on touch devices.
- **Cleanup.** `gsap.matchMedia()` creates everything and `mm.revert()` removes all animations and listeners when the component unmounts.

Live URL:-https://123-smriti.github.io/ITZFIZZHERO/



