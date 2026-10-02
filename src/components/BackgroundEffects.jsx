const NOISE =
  "url(\"data:image/svg+xml;utf8,<svg xmlns=\u0027http://www.w3.org/2000/svg\u0027 width=\u0027160\u0027 height=\u0027160\u0027><filter id=\u0027n\u0027><feTurbulence type=\u0027fractalNoise\u0027 baseFrequency=\u0027.8\u0027 numOctaves=\u00272\u0027/></filter><rect width=\u0027100%\u0027 height=\u0027100%\u0027 filter=\u0027url(%23n)\u0027/></svg>\")";

// 16 particles, pseudo-random but deterministic; half are hidden on small screens
const PARTICLES = Array.from({ length: 16 }, (_, i) => ({
  left: (i * 37 + 11) % 100,
  top: (i * 53 + 7) % 100,
  delay: (i % 6) * -1.5,
}));

export default function BackgroundEffects() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_45%,#10131c_0%,#050505_70%)]" />
      <div className="absolute left-1/2 top-1/2 h-[70vmin] w-[70vmin] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(circle,rgba(109,125,255,.22),transparent_65%)]" />
      <div
        className="absolute inset-0 opacity-60"
        style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,.03) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.03) 1px,transparent 1px)",
          backgroundSize: "72px 72px",
          maskImage: "radial-gradient(ellipse at 50% 50%,#000 10%,transparent 72%)",
          WebkitMaskImage: "radial-gradient(ellipse at 50% 50%,#000 10%,transparent 72%)",
        }}
      />
      {PARTICLES.map((p, i) => (
        <span
          key={i}
          className={`particle absolute h-[2px] w-[2px] rounded-full bg-white/40 ${i > 7 ? "max-md:hidden" : ""}`}
          style={{ left: `${p.left}%`, top: `${p.top}%`, animationDelay: `${p.delay}s` }}
        />
      ))}
      <div className="absolute inset-0 opacity-[0.07] mix-blend-overlay" style={{ backgroundImage: NOISE }} />
    </div>
  );
}
