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
  const railHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const railWidth = useTransform(railProgress, (v) => `${v * 100}%`);

  return (
    <section
      ref={ref}
      className="relative"
      style={{ height: `${STEPS.length * 100}vh` }}
    >
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <div className="mx-auto grid w-full max-w-7xl grid-cols-12 gap-8 px-5 md:px-10">
          {/* LEFT — step rail */}
          <div className="col-span-12 md:col-span-3">
            <div className="relative pl-6">
              {/* vertical line */}
              <div className="absolute left-2 top-2 bottom-2 w-px bg-border" />
              <motion.div
                className="absolute left-2 top-2 w-px bg-gold"
                style={{ height: railHeight }}
              />

              <ol className="space-y-8">
                {STEPS.map((s, i) => {
                  const isActive = i === active;
                  return (
                    <li key={s.n} className="relative">
                      {/* dot */}
                      <span
                        className={`absolute -left-[22px] top-1.5 flex h-4 w-4 items-center justify-center rounded-full border-2 transition-all duration-300 ${
                          isActive
                            ? "border-gold bg-gold shadow-[0_0_0_4px_rgba(0,0,0,0.04)]"
                            : i < active
                              ? "border-gold bg-gold/40"
                              : "border-border bg-background"
                        }`}
                      />
                      <div
                        className={`font-display text-[11px] tracking-[0.3em] transition-colors ${
                          isActive ? "text-gold" : "text-muted-foreground/60"
                        }`}
                      >
                        {s.n}
                      </div>
                      <div
                        className={`mt-1 font-display text-lg font-bold transition-colors md:text-xl ${
                          isActive ? "text-foreground" : "text-foreground/30"
                        }`}
                      >
                        {s.label}
                      </div>
                    </li>
                  );
                })}
              </ol>
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
                    className="absolute inset-0 flex flex-col justify-between rounded-3xl bg-background p-8 shadow-[0_30px_70px_-30px_rgba(0,0,0,0.25)] md:p-10"
                  >
                    <div className="font-display text-xs tracking-[0.3em] text-gold/80">
                      {s.n} — {s.label.toUpperCase()}
                    </div>
                    <div>
                      <h3 className="font-display text-4xl font-black leading-[1.05] tracking-tight text-gold md:text-6xl">
                        {s.big}
                      </h3>
                      <p className="mt-5 max-w-md text-base text-muted-foreground md:text-lg">
                        {s.desc}
                      </p>
                    </div>
                    {/* progress bar inside active card */}
                    <div className="relative h-[3px] w-full overflow-hidden rounded-full bg-border">
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
