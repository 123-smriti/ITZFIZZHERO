import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ScrollProgress() {
  const fill = useRef(null);
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(fill.current, { scaleY: 0 }, {
        scaleY: 1, ease: "none",
        scrollTrigger: { start: 0, end: "max", scrub: true },
      });
    });
    return () => ctx.revert();
  }, []);
  return (
    <div aria-hidden="true" className="fixed right-5 top-1/2 z-40 hidden h-28 w-px -translate-y-1/2 bg-white/10 md:block">
      <div ref={fill} className="h-full w-full origin-top bg-white/70" style={{ transform: "scaleY(0)" }} />
    </div>
  );
}
