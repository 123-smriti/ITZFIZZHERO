import { useRef } from "react";
import { stats } from "../data/stats";
import useScrollAnimation from "../hooks/useScrollAnimation";
import BackgroundEffects from "./BackgroundEffects";
import Smartphone from "./Smartphone";
import StatCard from "./StatCard";

// Stage 1: cards orbit the big phone. Mobile: two above, two below.
const POSITIONS = [
  "left-[4vw] top-[12%] md:left-auto md:right-[9vw] md:top-[52%]",
  "right-[4vw] top-[12%] md:right-[16vw] md:top-[18%]",
  "left-[4vw] bottom-[8%] md:left-[8vw] md:bottom-auto md:top-[38%]",
  "right-[4vw] bottom-[8%] md:left-[18vw] md:right-auto md:bottom-[12%]",
];
const LINE_SIDE = ["left", "left", "right", "right"];
const WORDS = ["WELCOME", "ITZFIZZ"];
const half = Math.ceil(stats.length / 2);

export default function Hero() {
  const heroRef = useRef(null);
  useScrollAnimation(heroRef);

  return (
    <section ref={heroRef} id="top" aria-label="ITZFIZZ introduction" className="relative h-[100svh] w-full overflow-hidden bg-ink">
      <BackgroundEffects />

      {/* big phone: .phone-scroll (scroll) > .phone-tilt (mouse) > .phone-enter (page load) */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="phone-scroll will-change-transform">
          <div className="phone-tilt">
            <div className="phone-enter"><Smartphone /></div>
          </div>
        </div>
      </div>

      {/* stage 1 cards (decorative duplicates of the final row, so hidden from screen readers) */}
      <div aria-hidden="true">
        {stats.map((s, i) => <StatCard key={s.title} stat={s} className={POSITIONS[i]} lineSide={LINE_SIDE[i]} />)}
      </div>

      {/* stage 2: headline, stats row and small phone */}
      <div className="final-stage pointer-events-none absolute inset-0 z-30 flex flex-col items-center justify-center px-4 text-center">
        <h1 aria-label="Welcome Itzfizz" className="flex flex-col items-center text-[clamp(2rem,12vw,3.4rem)] font-bold leading-tight md:flex-row md:gap-[0.6em] md:text-[clamp(2rem,5.4vw,6.5rem)]">
          {WORDS.map((w) => (
            <span key={w} aria-hidden="true" className="flex">
              {[...w].map((c, i) => <span key={i} className="letter mr-[0.14em] inline-block">{c}</span>)}
            </span>
          ))}
        </h1>
        <p className="subline mt-4 text-[10px] tracking-[0.35em] text-white/45 md:text-xs">INDIA'S FASTEST-GROWING DIGITAL MARKETING & GROWTH AGENCY</p>

        <div className="final-row mt-8 grid w-full max-w-[1100px] grid-cols-2 gap-3 text-left md:mt-12 md:flex md:items-center md:justify-center md:gap-5">
          {stats.slice(0, half).map((s) => <StatCard key={s.title} stat={s} variant="final" />)}
          <div className="col-span-2 flex justify-center md:col-auto">
            <div className="mini-phone"><Smartphone mini /></div>
          </div>
          {stats.slice(half).map((s) => <StatCard key={s.title} stat={s} variant="final" />)}
        </div>
      </div>
    </section>
  );
}
