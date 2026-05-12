import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Users, Building2, Sparkles, Truck } from "lucide-react";
import leeviStore from "@/assets/leevi-store.jpg";

type Step = {
  n: string;
  label: string;
  big: string;
  desc: string;
  Icon: React.ComponentType<{ className?: string }>;
  image?: string;
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
    image: leeviStore,
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

const INTERVAL_MS = 4000;

/**
 * Auto-cycling card progression. Every 4s the active card advances; after the
 * last card it loops back to the first.
 */
export function StatsScrollLock() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setActive((prev) => (prev + 1) % STEPS.length);
    }, INTERVAL_MS);
    return () => window.clearInterval(id);
  }, []);




  // Curve geometry — list lives inside a 60x440 SVG, dots evenly spaced.
  const RAIL_W = 60;
  const RAIL_H = 440;
  const STEP_GAP = RAIL_H / STEPS.length; // 110
  const dotY = (i: number) => STEP_GAP / 2 + i * STEP_GAP;
  const baseX = 6; // resting line x (kept on the left)
  const apexX = 28; // bulge x (rightward) at active dot

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
      className="relative"
      style={{ backgroundColor: "transparent" }}
    >
      <div className="flex items-center overflow-hidden py-12 md:py-16">
        <div className="mx-auto grid w-full grid-cols-12 gap-8 px-5 md:px-10" style={{ maxWidth: "1300px" }}>
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
                <motion.circle
                  initial={false}
                  animate={{ cx: apexX, cy: dotY(active) }}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  r={6}
                  fill="var(--gold)"
                  stroke="var(--gold)"
                  strokeWidth={1.5}
                />
                {/* Dashed ring around active dot */}
                <motion.circle
                  initial={false}
                  animate={{ cx: apexX, cy: dotY(active) }}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  r={12}
                  fill="transparent"
                  stroke="var(--gold)"
                  strokeWidth={1.2}
                  strokeDasharray="2 4"
                  opacity={0.85}
                />
              </svg>

              {/* Labels positioned at each dot's y */}
              {STEPS.map((s, i) => {
                const isActive = i === active;
                return (
                  <motion.div
                    key={s.n}
                    initial={false}
                    animate={{
                      scale: isActive ? 1.18 : 1,
                      x: isActive ? 6 : 0,
                    }}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute left-0 -translate-y-1/2"
                    style={{
                      top: dotY(i),
                      paddingLeft: RAIL_W + 4,
                      width: "100%",
                      transformOrigin: "left center",
                    }}
                  >
                    <motion.div
                      initial={false}
                      animate={{
                        color: isActive
                          ? "var(--gold)"
                          : "color-mix(in oklab, var(--muted-foreground) 50%, transparent)",
                      }}
                      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                      className="font-display text-[11px] tracking-[0.3em]"
                    >
                      {s.n}
                    </motion.div>
                    <motion.div
                      initial={false}
                      animate={{
                        color: isActive
                          ? "rgb(56,56,56)"
                          : "color-mix(in oklab, rgb(56,56,56) 25%, transparent)",
                      }}
                      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                      className="mt-0.5 font-display text-lg font-bold md:text-xl"
                    >
                      {s.label}
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* RIGHT — active card + dramatic 3D peek */}
          <div className="col-span-12 md:col-span-9">
            <div
              className="relative mx-auto h-[480px] w-full max-w-xl md:h-[520px]"
              style={{ perspective: 1600 }}
            >
              {STEPS.map((s, i) => {
                const offset = i - active;
                const isActive = offset === 0;

                // Outgoing (left) — flies away with rotation + blur
                // Active (0) — centered, sharp
                // Next (1) — peeks behind right, tilted
                // Stack (2) — further behind, smaller
                let x = "0%";
                let rotateY = 0;
                let scale = 1;
                let opacity = 1;
                let blur = 0;
                let z = 0;

                if (offset < 0) {
                  x = "-60%";
                  rotateY = 35;
                  scale = 0.85;
                  opacity = 0;
                  blur = 12;
                  z = -200;
                } else if (offset === 0) {
                  x = "0%";
                  rotateY = 0;
                  scale = 1;
                  opacity = 1;
                  blur = 0;
                  z = 0;
                } else if (offset === 1) {
                  x = "16%";
                  rotateY = -14;
                  scale = 0.92;
                  opacity = 0.55;
                  blur = 2;
                  z = -120;
                } else if (offset === 2) {
                  x = "26%";
                  rotateY = -18;
                  scale = 0.84;
                  opacity = 0.25;
                  blur = 4;
                  z = -240;
                } else {
                  x = "30%";
                  rotateY = -20;
                  scale = 0.78;
                  opacity = 0;
                  blur = 6;
                  z = -360;
                }

                return (
                  <motion.div
                    key={s.n}
                    initial={false}
                    animate={{
                      x,
                      rotateY,
                      scale,
                      opacity,
                      filter: `blur(${blur}px)`,
                      z,
                    }}
                    transition={{
                      duration: 0.85,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    style={{
                      zIndex: 100 - Math.abs(offset),
                      transformStyle: "preserve-3d",
                      transformOrigin: "left center",
                    }}
                    className="absolute inset-0 flex flex-col rounded-3xl bg-background p-8 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.25)] md:p-10"
                  >
                    <div className="absolute right-7 top-7 z-10 font-display text-2xl font-bold text-foreground/15 md:right-9 md:top-9 md:text-3xl">
                      {s.n}
                    </div>

                    {s.image && (
                      <div
                        aria-hidden
                        className="pointer-events-none absolute right-6 top-6 z-0 hidden overflow-hidden rounded-2xl shadow-[0_20px_40px_-20px_rgba(0,0,0,0.35)] md:block"
                        style={{ width: "44%", height: "78%" }}
                      >
                        <img
                          src={s.image}
                          alt=""
                          className="h-full w-full object-cover"
                          draggable={false}
                        />
                      </div>
                    )}

                    <motion.div
                      animate={{
                        opacity: isActive ? 1 : 0.4,
                        y: isActive ? 0 : 8,
                      }}
                      transition={{ duration: 0.6, delay: isActive ? 0.15 : 0 }}
                    >
                      <h3
                        className="font-display"
                        style={{ fontWeight: 600, fontSize: "44px", lineHeight: "0.95", color: "rgb(56,56,56)", letterSpacing: "-0.03em" }}
                      >
                        {s.label}
                      </h3>
                      <div className="mt-2 font-display text-4xl font-black leading-none text-gold md:text-[44px]">
                        {s.big}
                      </div>
                      <p className="mt-4 text-base leading-relaxed text-muted-foreground md:text-[17px]">
                        {s.desc}
                      </p>
                    </motion.div>

                    <div className="mt-auto flex items-end gap-5">
                      {STEPS.map((step, j) => {
                        const Icon = step.Icon;
                        const chipActive = j === active;
                        return (
                          <div
                            key={step.n}
                            className="flex flex-col items-center gap-2"
                          >
                            <div
                              className={`flex h-11 w-11 items-center justify-center rounded-full transition-all duration-500 md:h-12 md:w-12 ${
                                chipActive
                                  ? "scale-110 bg-gold shadow-[0_8px_20px_-6px_color-mix(in_oklab,var(--gold)_55%,transparent)]"
                                  : "bg-secondary"
                              }`}
                            >
                              <Icon
                                className={`h-5 w-5 ${
                                  chipActive
                                    ? "text-background"
                                    : "text-muted-foreground/60"
                                }`}
                              />
                            </div>
                            <span
                              className={`font-display text-[10px] tracking-[0.25em] transition-opacity ${
                                chipActive
                                  ? "text-gold opacity-100"
                                  : "opacity-0"
                              }`}
                            >
                              {step.label.toUpperCase()}
                            </span>
                          </div>
                        );
                      })}
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
