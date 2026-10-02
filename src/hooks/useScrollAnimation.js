import { useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
// stops the pinned hero from jumping when the mobile browser address bar shows/hides
ScrollTrigger.config({ ignoreMobileResize: true });

/**
 * One pinned, scrubbed timeline:
 *  phone moves > statOne..statFour appear around it > phoneZoom > phoneExit (disappears)
 *  > headline types in letter by letter > stats appear one by one under it > small phone arrives between them
 * Wrappers keep scroll, mouse-tilt and page-load transforms separate:
 *   .phone-scroll (ScrollTrigger) > .phone-tilt (mouse) > .phone-enter (page load)
 */
export default function useScrollAnimation(heroRef) {
  useLayoutEffect(() => {
    const hero = heroRef.current;
    const q = gsap.utils.selector(hero);
    const mm = gsap.matchMedia();

    mm.add(
      // gsap.matchMedia only runs this callback if at least one condition matches.
      // "motion" guarantees it also runs on narrow (mobile) screens, where "wide" is false.
      { motion: "(prefers-reduced-motion: no-preference)", reduce: "(prefers-reduced-motion: reduce)", wide: "(min-width: 768px)" },
      (context) => {
        const { reduce, wide } = context.conditions;
        const orbit = q(".stat-card");
        const finals = q(".final-card");
        const phone = q(".phone-scroll");

        gsap.set(q(".scr-immerse"), { autoAlpha: 0 });

        /* Reduced motion: no pin. Show the finished layout (headline, stats, small phone). */
        if (reduce) {
          gsap.set([...orbit, ...phone], { display: "none" });
          return;
        }

        gsap.set(orbit, { autoAlpha: 0 });
        gsap.set([...q(".letter"), ...q(".subline"), ...finals, ...q(".mini-phone")], { autoAlpha: 0 });

        // page load: big phone enters
        gsap.from(q(".phone-enter"), { autoAlpha: 0, scale: 0.75, y: 100, rotation: 5, duration: 1.4, ease: "power3.out", delay: 0.2 });

        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: { trigger: hero, start: "top top", end: wide ? "+=5600" : "+=3800", pin: true, scrub: 1, anticipatePin: 1 },
        });

        const t = { s: [1, 2.2, 3.4, 4.6], zoom: 6.2, exit: 8.4, head: 9.2, finals: 11.6, mini: 14.9 };

        // the phone keeps moving as each statistic arrives
        const path = wide
          ? [{ x: -120, y: 0, rotation: 0 }, { x: -60, y: -20, rotation: -3 }, { x: 60, y: 10, rotation: 3 }, { x: 0, y: 0, rotation: 0 }]
          : [{ x: 0, y: 10, rotation: 0 }, { x: 0, y: -10, rotation: -3 }, { x: 0, y: 10, rotation: 3 }, { x: 0, y: 0, rotation: 0 }];
        path.forEach((p, i) => tl.to(phone, { ...p, duration: 1.2, ease: "power2.inOut" }, i === 0 ? 0.2 : t.s[i]));

        // stats appear one by one, emerging from the phone
        const from = wide ? [{ x: 80 }, { y: -30 }, { x: -80 }, { y: 40 }] : [{ y: 30 }, { y: 30 }, { y: -30 }, { y: -30 }];
        orbit.forEach((card, i) => {
          tl.fromTo(card, { autoAlpha: 0, scale: 0.9, ...from[i] }, { autoAlpha: 1, scale: 1, x: 0, y: 0, duration: 1, ease: "power2.out" }, t.s[i]);
          const line = card.querySelector(".stat-line");
          if (line) tl.fromTo(line, { scaleX: 0 }, { scaleX: 1, duration: 0.8 }, t.s[i]);
        });

        // zoom: phone centres and grows, cards peel away, screen becomes the focus
        tl.to(phone, { x: 0, y: 0, rotation: 0, scale: wide ? 1.8 : 1.4, duration: 2.2, ease: "power2.inOut" }, t.zoom);
        tl.to(orbit, {
          autoAlpha: 0, scale: 0.92, duration: 1.2, stagger: 0.1, ease: "power1.in",
          x: (i) => (wide ? (i < 2 ? 60 : -60) : 0),
          y: (i) => (wide ? 0 : i < 2 ? -40 : 40),
        }, t.zoom);
        tl.to(q(".scr-idle"), { autoAlpha: 0, duration: 1 }, t.zoom + 0.6);
        tl.to(q(".scr-immerse"), { autoAlpha: 1, duration: 1.2 }, t.zoom + 0.8);
        tl.fromTo(q(".scr-grid"), { scale: 1 }, { scale: 1.6, duration: 2.2 }, t.zoom);
        tl.to(q(".scr-dot"), { y: -40, duration: 2.2, stagger: 0.1 }, t.zoom);
        const counter = { v: 0 };
        const countEl = q(".scr-count")[0];
        tl.to(counter, { v: 95, duration: 1.8, onUpdate: () => { countEl.textContent = `${Math.round(counter.v)}%`; } }, t.zoom + 0.8);

        // phone zooms through the screen and disappears
        tl.to(phone, { autoAlpha: 0, scale: wide ? 2.8 : 2.2, duration: 1, ease: "power2.in" }, t.exit);

        // headline: letter by letter
        tl.fromTo(q(".letter"), { autoAlpha: 0, y: 40 }, { autoAlpha: 1, y: 0, duration: 0.6, stagger: 0.14, ease: "power2.out" }, t.head);
        tl.fromTo(q(".subline"), { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.8 }, t.head + 2.2);

        // statistics return one by one under the headline
        finals.forEach((card, i) => {
          tl.fromTo(card, { autoAlpha: 0, y: 30 }, { autoAlpha: 1, y: 0, duration: 0.7, ease: "power2.out" }, t.finals + i * 0.8);
        });

        // small phone arrives between the stats
        tl.fromTo(q(".mini-phone"), { autoAlpha: 0, scale: 0.4, y: 40 }, { autoAlpha: 1, scale: 1, y: 0, duration: 1, ease: "back.out(1.4)" }, t.mini);

        // subtle mouse tilt: desktop with a real pointer only
        if (wide && window.matchMedia("(pointer: fine)").matches) {
          const tilt = q(".phone-tilt")[0];
          gsap.set(tilt, { transformPerspective: 900 });
          const rx = gsap.quickTo(tilt, "rotationX", { duration: 0.8, ease: "power3.out" });
          const ry = gsap.quickTo(tilt, "rotationY", { duration: 0.8, ease: "power3.out" });
          const onMove = (e) => {
            ry((e.clientX / window.innerWidth - 0.5) * 8);
            rx(-(e.clientY / window.innerHeight - 0.5) * 8);
          };
          window.addEventListener("pointermove", onMove);
          return () => window.removeEventListener("pointermove", onMove);
        }
      }
    );

    return () => mm.revert();
  }, [heroRef]);
}
