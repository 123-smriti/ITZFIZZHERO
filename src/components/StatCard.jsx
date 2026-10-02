// variant "orbit": floats around the big phone. variant "final": sits in the row under the headline.
export default function StatCard({ stat, variant = "orbit", className = "", lineSide = "left" }) {
  const orbit = variant === "orbit";
  return (
    <article
      className={`${orbit ? "stat-card absolute w-[44vw] max-w-[270px] md:w-[260px] md:p-5" : "final-card min-w-0 md:max-w-[220px] md:flex-1"} border border-white/10 bg-white/[0.03] p-4 backdrop-blur-sm ${className}`}
    >
      {orbit && (
        <span
          aria-hidden="true"
          className={`stat-line absolute top-1/2 hidden h-px w-16 bg-gradient-to-r md:block ${
            lineSide === "left" ? "right-full origin-right from-transparent to-glow/70" : "left-full origin-left from-glow/70 to-transparent"
          }`}
        />
      )}
      <p className="text-3xl font-light tracking-tight text-white md:text-4xl lg:text-5xl">{stat.value}</p>
      <h3 className="mt-3 text-[10px] font-semibold tracking-[0.22em] text-glow md:text-xs">{stat.title}</h3>
      <p className="mt-1 text-xs leading-snug text-white/55 md:text-sm">{stat.description}</p>
    </article>
  );
}
