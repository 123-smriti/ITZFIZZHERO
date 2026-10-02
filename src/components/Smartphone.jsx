// Original fictional phone built only from HTML/CSS: no image assets, nothing to break.
const DOTS = [[18, 70], [74, 24], [60, 82], [30, 30], [82, 58], [45, 50]];
const WALLPAPER =
  "bg-[radial-gradient(circle_at_18%_8%,rgba(109,125,255,.5),transparent_45%),radial-gradient(circle_at_88%_78%,rgba(168,85,247,.38),transparent_50%),#06070b]";

function Ring({ id, pct }) {
  return (
    <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90" aria-hidden="true">
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#8b9bff" />
          <stop offset="1" stopColor="#c084fc" />
        </linearGradient>
      </defs>
      <circle cx="50" cy="50" r="40" fill="none" stroke="rgba(255,255,255,.08)" strokeWidth="7" />
      <circle cx="50" cy="50" r="40" fill="none" stroke={`url(#${id})`} strokeWidth="7" strokeLinecap="round" strokeDasharray="251.3" strokeDashoffset={251.3 * (1 - pct / 100)} />
    </svg>
  );
}

export default function Smartphone({ mini = false }) {
  const size = mini
    ? "w-[72px] md:w-[104px] rounded-[1.1rem] md:rounded-[1.5rem]"
    : "w-[44vw] max-w-[230px] md:w-[clamp(200px,19vw,290px)] md:max-w-none rounded-[2.2rem] md:rounded-[2.8rem]";
  const inner = mini ? "rounded-[1rem] md:rounded-[1.35rem] p-[2px]" : "rounded-[2.1rem] md:rounded-[2.7rem] p-[5px] md:p-[6px]";
  const screen = mini ? "rounded-[.85rem] md:rounded-[1.2rem]" : "rounded-[1.8rem] md:rounded-[2.3rem]";

  const glow = mini
    ? " shadow-[0_20px_40px_-15px_rgba(0,0,0,.9),0_0_40px_-15px_rgba(109,125,255,.5)]"
    : " shadow-[0_40px_90px_-20px_rgba(0,0,0,.9),0_0_120px_-15px_rgba(109,125,255,.5)]";

  return (
    <div
      role="img"
      aria-label="Futuristic smartphone showing the ITZFIZZ interface"
      className={`relative aspect-[9/19] ${size} bg-[linear-gradient(145deg,#eef0f6,#7b8190_28%,#2b2e36_52%,#9aa0ae_78%,#dfe3ec)] p-[2px]${glow}`}
    >
      {/* hardware keys */}
      {!mini && (
        <>
          <span aria-hidden="true" className="absolute -left-[3px] top-[14%] h-5 w-[3px] rounded-l bg-zinc-400" />
          <span aria-hidden="true" className="absolute -left-[3px] top-[21%] h-9 w-[3px] rounded-l bg-zinc-400" />
          <span aria-hidden="true" className="absolute -left-[3px] top-[31%] h-9 w-[3px] rounded-l bg-zinc-400" />
          <span aria-hidden="true" className="absolute -right-[3px] top-[26%] h-14 w-[3px] rounded-r bg-zinc-400" />
        </>
      )}

      <div className={`h-full w-full bg-black ${inner}`}>
        <div className={`relative h-full w-full overflow-hidden ${screen} ${WALLPAPER} shadow-[inset_0_0_0_1px_rgba(255,255,255,.08)]`}>
          {mini ? (
            <div className="absolute inset-0 flex items-center justify-center pt-3">
              <div className="h-[62%] w-[62%]"><Ring id="ring-mini" pct={95} /></div>
            </div>
          ) : (
            <>
              {/* idle interface */}
              <div className="scr-idle absolute inset-0 flex flex-col px-4 pb-3 pt-10 md:px-5 md:pb-4 md:pt-12">
                <div className="flex items-center justify-between text-[7px] text-white/60 md:text-[9px]">
                  <span>09:30</span><span className="tracking-widest">5G</span>
                </div>
                <p className="mt-3 text-[8px] font-semibold tracking-[0.3em] text-white/90 md:text-[10px]">ITZFIZZ</p>
                <div className="relative mx-auto mt-3 aspect-square w-[74%]">
                  <Ring id="ring-big" pct={87} />
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-lg font-light text-white md:text-3xl">87</span>
                    <span className="text-[6px] tracking-[0.25em] text-white/50 md:text-[8px]">IMPACT</span>
                  </div>
                </div>
                <div className="mt-3 grid grid-cols-3 gap-1.5">
                  {[[40, 70, 55], [60, 35, 80], [30, 75, 50]].map((bars, i) => (
                    <div key={i} className="flex h-8 items-end gap-[2px] rounded-lg bg-white/[0.07] p-1.5 md:h-11">
                      {bars.map((h, j) => <span key={j} className="w-full rounded-sm bg-glow/80" style={{ height: `${h}%` }} />)}
                    </div>
                  ))}
                </div>
                <div className="mt-auto flex justify-between px-1">
                  {[0, 1, 2, 3].map((i) => <span key={i} className="h-5 w-5 rounded-md bg-white/[0.09] md:h-7 md:w-7 md:rounded-lg" />)}
                </div>
                <span aria-hidden="true" className="mx-auto mt-3 h-[3px] w-1/3 rounded-full bg-white/50" />
              </div>

              {/* immersive interface (revealed during zoom) */}
              <div className="scr-immerse absolute inset-0">
                <div
                  className="scr-grid absolute inset-0"
                  style={{
                    backgroundImage: "linear-gradient(rgba(109,125,255,.25) 1px,transparent 1px),linear-gradient(90deg,rgba(109,125,255,.25) 1px,transparent 1px)",
                    backgroundSize: "22px 22px",
                    maskImage: "radial-gradient(circle at 50% 50%,#000 10%,transparent 70%)",
                    WebkitMaskImage: "radial-gradient(circle at 50% 50%,#000 10%,transparent 70%)",
                  }}
                />
                {DOTS.map(([l, t], i) => (
                  <span key={i} className="scr-dot absolute h-[3px] w-[3px] rounded-full bg-white/80" style={{ left: `${l}%`, top: `${t}%` }} />
                ))}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <p className="scr-count text-2xl font-light text-white md:text-4xl">0%</p>
                  <p className="mt-2 text-[6px] tracking-[0.3em] text-glow md:text-[8px]">ENTERING ITZFIZZ</p>
                </div>
              </div>
            </>
          )}

          {/* glass: static reflection + slow moving sheen */}
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[linear-gradient(115deg,rgba(255,255,255,.14),transparent_30%)]" />
          {!mini && <div aria-hidden="true" className="sheen pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-white/10 to-transparent" />}
          {/* dynamic island */}
          <div aria-hidden="true" className={`absolute left-1/2 top-[2.5%] flex -translate-x-1/2 items-center justify-end rounded-full bg-black ${mini ? "h-1.5 w-5 pr-1" : "h-3.5 w-16 pr-2 md:h-5 md:w-24 md:pr-3"}`}>
            {!mini && <span className="h-1.5 w-1.5 rounded-full bg-[#1b2a4a] md:h-2 md:w-2" />}
          </div>
        </div>
      </div>
    </div>
  );
}
