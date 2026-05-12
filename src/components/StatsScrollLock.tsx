import { useRef } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent } from "motion/react";
import { useState } from "react";
import { Users, Building2, Sparkles, Truck } from "lucide-react";

type Step = {
  n: string;
  label: string;
  big: string;
  desc: string;
  Icon: React.ComponentType<{ className?: string }>;
};

const STEPS: Step[] = [
  {
    n: "01",
    label: "Comunidade",
    big: "+50 mil",
    desc: "revendedoras acompanhando a Leevi todos os dias.",
    Icon: Users,
  },
  {
    n: "02",
    label: "Origem",
    big: "Atacado & Varejo",
    desc: "com sede própria em São Luís — MA.",
    Icon: Building2,
  },
  {
    n: "03",
    label: "Curadoria",
    big: "Centenas",
    desc: "de lançamentos por mês no nosso mix.",
    Icon: Sparkles,
  },
  {
    n: "04",
    label: "Logística",
    big: "Brasil todo",
    desc: "Envio para todos os estados com agilidade.",
    Icon: Truck,
  },
];

/**
 * Pinned scroll-locked card progression.
 * Each scroll segment swaps the active card and lights up the corresponding
 * step in the left rail.
 */
export function StatsScrollLock() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const [active, setActive] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const idx = Math.min(STEPS.length - 1, Math.max(0, Math.floor(v * STEPS.length)));
    if (idx !== active) setActive(idx);
  });

  // progress within the current step (0..1)
  const railProgress = useTransform(scrollYProgress, (v) => {
    const seg = 1 / STEPS.length;
    return Math.min(1, (v - active * seg) / seg);
  });
  const railWidth = useTransform(railProgress, (v) => `${v * 100}%`);

  // Curve geometry — list lives inside a 60x440 SVG, dots evenly spaced.
  const RAIL_W = 60;
  const RAIL_H = 440;
  const STEP_GAP = RAIL_H / STEPS.length; // 110
  const dotY = (i: number) => STEP_GAP / 2 + i * STEP_GAP;
  const baseX = 28; // resting line x
  const apexX = 6; // bulge x (leftward) at active dot

  const buildPath = (activeIdx: number) => {
    const y = dotY(activeIdx);
    const pre = y - 36;
    const post = y + 36;
    return `M ${baseX} 0
            L ${baseX} ${pre}
            C ${baseX} ${y - 18}, ${apexX} ${y - 18}, ${apexX} ${y}
            C ${apexX} ${y + 18}, ${baseX} ${y + 18}, ${baseX} ${post}
            L ${baseX} ${RAIL_H}`;
  };




  return (
    <section
      ref={ref}
      className="relative"
      style={{ height: `${STEPS.length * 100}vh` }}
    >
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <div className="mx-auto grid w-full max-w-7xl grid-cols-12 gap-8 px-5 md:px-10">
          {/* LEFT — step rail with curving line */}
          <div className="col-span-12 md:col-span-3">
            <div
              className="relative"
              style={{ height: RAIL_H, paddingLeft: RAIL_W + 4 }}
            >
              {/* Curved rail SVG */}
              <svg
                width={RAIL_W}
                height={RAIL_H}
                viewBox={`0 0 ${RAIL_W} ${RAIL_H}`}
                className="absolute left-0 top-0 overflow-visible"
                aria-hidden
              >
                {/* Static gold rail line — curves to active dot */}
                <motion.path
                  initial={false}
                  animate={{ d: buildPath(active) }}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  fill="none"
                  stroke="var(--gold)"
                  strokeOpacity={0.7}
                  strokeWidth={1.5}
                  strokeLinecap="round"
                />
                {/* Dots */}
                {STEPS.map((s, i) => {
                  const isActive = i === active;
                  const reached = i <= active;
                  const cx = isActive ? apexX : baseX;
                  return (
                    <motion.circle
                      key={s.n}
                      initial={false}
                      animate={{ cx, r: isActive ? 7 : 4.5 }}
                      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                      cy={dotY(i)}
                      fill={reached ? "var(--gold)" : "hsl(var(--background))"}
                      stroke="var(--gold)"
                      strokeWidth={1.5}
                    />
                  );
                })}
                {/* Soft halo on active dot */}
                <motion.circle
                  initial={false}
                  animate={{ cx: apexX, cy: dotY(active) }}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  r={14}
                  fill="var(--gold)"
                  opacity={0.18}
                />
              </svg>

              {/* Labels positioned at each dot's y */}
              {STEPS.map((s, i) => {
                const isActive = i === active;
                return (
                  <div
                    key={s.n}
                    className="absolute left-0 -translate-y-1/2"
                    style={{
                      top: dotY(i),
                      paddingLeft: RAIL_W + 4,
                      width: "100%",
                    }}
                  >
                    <div
                      className={`font-display text-[11px] tracking-[0.3em] transition-colors ${
                        isActive ? "text-gold" : "text-muted-foreground/50"
                      }`}
                    >
                      {s.n}
                    </div>
                    <div
                      className={`mt-0.5 font-display text-lg font-bold transition-colors md:text-xl ${
                        isActive ? "text-foreground" : "text-foreground/25"
                      }`}
                    >
                      {s.label}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* CENTER — animated icon visual */}
          <div className="hidden md:col-span-4 md:flex md:items-center md:justify-center">
            <div className="relative flex h-72 w-72 items-center justify-center">
              {/* soft glow */}
              <div className="absolute inset-0 rounded-full bg-gold/15 blur-3xl" />
              {/* concentric rings */}
              <motion.div
                className="absolute inset-0 rounded-full border border-gold/30"
                animate={{ rotate: 360 }}
                transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
              />
              <motion.div
                className="absolute inset-6 rounded-full border border-gold/20"
                animate={{ rotate: -360 }}
                transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
              />
              <motion.div
                className="absolute inset-12 rounded-full border border-gold/10"
                animate={{ rotate: 360 }}
                transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
              />
              {/* active icon */}
              {STEPS.map((s, i) => {
                const Icon = s.Icon;
                return (
                  <motion.div
                    key={s.n}
                    initial={false}
                    animate={{
                      opacity: i === active ? 1 : 0,
                      scale: i === active ? 1 : 0.7,
                    }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute flex h-28 w-28 items-center justify-center rounded-full bg-background shadow-lg"
                  >
                    <Icon className="h-12 w-12 text-gold" />
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* RIGHT — active card + peek */}
          <div className="col-span-12 md:col-span-5">
            <div className="relative h-[420px] md:h-[460px]">
              {STEPS.map((s, i) => {
                const offset = i - active;
                const isActive = offset === 0;
                return (
                  <motion.div
                    key={s.n}
                    initial={false}
                    animate={{
                      x: offset === 0 ? 0 : offset > 0 ? 60 : -60,
                      opacity: isActive ? 1 : offset === 1 ? 0.35 : 0,
                      scale: isActive ? 1 : 0.92,
                    }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    style={{ zIndex: STEPS.length - Math.abs(offset) }}
                    className="absolute inset-0 flex flex-col rounded-3xl bg-secondary p-10 shadow-[0_30px_70px_-30px_rgba(0,0,0,0.18)] md:p-12"
                  >
                    <div className="font-display text-[11px] tracking-[0.3em] text-gold/80">
                      {s.n} <span className="mx-2 text-gold/40">—</span>{" "}
                      {s.label.toUpperCase()}
                    </div>

                    <div className="mt-auto">
                      <h3 className="font-display text-5xl font-black leading-[1.05] tracking-tight text-gold md:text-7xl">
                        {s.big}
                      </h3>
                      <p className="mt-5 max-w-md text-base leading-relaxed text-muted-foreground md:text-lg">
                        {s.desc}
                      </p>
                    </div>

                    {/* bottom separator with scroll progress fill */}
                    <div className="relative mt-10 h-px w-full overflow-hidden bg-border/70">
                      {isActive && (
                        <motion.div
                          className="absolute inset-y-0 left-0 bg-gold"
                          style={{ width: railWidth }}
                        />
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
