import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { Building2, Layers, Award, MapPin, ArrowLeft, ArrowRight } from "lucide-react";
import galeria1 from "@/assets/rd-galeria-1.jpg";
import galeria2 from "@/assets/rd-galeria-2.jpg";
import galeria3 from "@/assets/rd-galeria-3.jpg";
import heroImg from "@/assets/rd-hero.jpg";

export type Step = {
  n: string;
  label: string;
  big: string;
  desc: string;
  Icon: React.ComponentType<{ className?: string }>;
  image?: string;
  imagePosition?: string;
};

const STEPS: Step[] = [
  {
    n: "01",
    label: "Rede",
    big: "+700 revendas",
    desc: "Uma das maiores redes de esquadrias premium do Brasil, com parceiros ativos em todas as regiões e projetos entregues em milhares de empreendimentos residenciais e comerciais.",
    Icon: Building2,
    image: heroImg,
  },
  {
    n: "02",
    label: "Experiência",
    big: "Quase 4 décadas",
    desc: "Desenvolvendo soluções em portas, janelas e sistemas de alumínio para grandes vãos, com engenharia própria e produtos de alto padrão reconhecidos por arquitetos e construtoras.",
    Icon: Award,
    image: galeria1,
  },
  {
    n: "03",
    label: "Portfólio",
    big: "Portas & Janelas",
    desc: "Portas deslizantes, sistemas folding, pivotantes, janelas premium e soluções sob medida — tudo pensado para atender projetos residenciais, comerciais e arquitetura de alto padrão.",
    Icon: Layers,
    image: galeria2,
    imagePosition: "50% center",
  },
  {
    n: "04",
    label: "Alcance",
    big: "Brasil todo",
    desc: "Presença nacional com atendimento e suporte comercial dedicado, indicando oportunidades de negócio para revendedores em regiões estratégicas de todo o país.",
    Icon: MapPin,
    image: galeria3,
    imagePosition: "50% center",
  },
];

const INTERVAL_MS = 4000;

export function StatsScrollLock({ steps, variant = "light" }: { steps?: Step[]; variant?: "light" | "dark" } = {}) {
  const STEPS_LIST = steps && steps.length > 0 ? steps : STEPS;
  const labelActive = variant === "dark" ? "#ffffff" : "oklch(0.18 0.005 250)";
  const labelIdle =
    variant === "dark"
      ? "color-mix(in oklab, #ffffff 35%, transparent)"
      : "color-mix(in oklab, oklch(0.18 0.005 250) 25%, transparent)";
  const [active, setActive] = useState(0);
  const stoppedRef = useRef(false);

  useEffect(() => {
    const id = window.setInterval(() => {
      if (stoppedRef.current) return;
      setActive((prev) => (prev + 1) % STEPS_LIST.length);
    }, INTERVAL_MS);
    return () => window.clearInterval(id);
  }, []);

  const RAIL_W = 60;
  const RAIL_H = 440;
  const STEP_GAP = RAIL_H / STEPS_LIST.length;
  const dotY = (i: number) => STEP_GAP / 2 + i * STEP_GAP;
  const baseX = 6;
  const apexX = 48;

  const buildPath = (activeIdx: number) => {
    const y = dotY(activeIdx);
    const pre = y - 60;
    const post = y + 60;
    return `M ${baseX} 0
            L ${baseX} ${pre}
            C ${baseX} ${y - 30}, ${apexX} ${y - 30}, ${apexX} ${y}
            C ${apexX} ${y + 30}, ${baseX} ${y + 30}, ${baseX} ${post}
            L ${baseX} ${RAIL_H}`;
  };

  return (
    <section className="relative" style={{ backgroundColor: "transparent" }}>
      <div className="flex items-center py-12 md:py-16">
        <div
          className="mx-auto grid w-full grid-cols-12 gap-8 pl-5 pr-5 md:pl-32 md:pr-10"
          style={{ maxWidth: "1300px" }}
        >
          {/* MOBILE — horizontal stepper */}
          <div className="col-span-12 min-w-0 md:hidden">
            <div className="relative w-full" style={{ height: 70 }}>
              <svg
                width="100%"
                height={70}
                viewBox="0 0 400 70"
                preserveAspectRatio="none"
                className="absolute left-0 top-0 overflow-visible"
                aria-hidden
              >
                {(() => {
                  const W = 400;
                  const stepGap = W / STEPS_LIST.length;
                  const dotX = (i: number) => stepGap / 2 + i * stepGap;
                  const baseY = 12;
                  const apexY = 44;
                  const x = dotX(active);
                  const pre = x - 50;
                  const post = x + 50;
                  const d = `M 0 ${baseY}
                    L ${pre} ${baseY}
                    C ${x - 25} ${baseY}, ${x - 25} ${apexY}, ${x} ${apexY}
                    C ${x + 25} ${apexY}, ${x + 25} ${baseY}, ${post} ${baseY}
                    L ${W} ${baseY}`;
                  return (
                    <>
                      <motion.path
                        initial={false}
                        animate={{ d }}
                        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                        fill="none"
                        stroke="var(--gold)"
                        strokeOpacity={0.7}
                        strokeWidth={1.5}
                        strokeLinecap="round"
                      />
                      <motion.circle
                        initial={false}
                        animate={{ cx: x, cy: apexY }}
                        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                        r={5}
                        fill="var(--gold)"
                      />
                      <motion.circle
                        initial={false}
                        animate={{ cx: x, cy: apexY }}
                        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                        r={10}
                        fill="transparent"
                        stroke="var(--gold)"
                        strokeWidth={1.2}
                        strokeDasharray="2 4"
                        opacity={0.85}
                        style={{
                          transformBox: "fill-box",
                          transformOrigin: "center",
                          animation: "spin-ring 8s linear infinite",
                        }}
                      />
                    </>
                  );
                })()}
              </svg>

              <div
                className="absolute inset-x-0 bottom-0 grid"
                style={{ gridTemplateColumns: `repeat(${STEPS_LIST.length}, 1fr)` }}
              >
                {STEPS_LIST.map((s, i) => {
                  const isActive = i === active;
                  return (
                    <motion.div
                      key={s.n}
                      initial={false}
                      animate={{ scale: isActive ? 1.1 : 1 }}
                      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                      className="flex flex-col items-center text-center"
                      style={{ transformOrigin: "center bottom" }}
                    >
                      <motion.div
                        initial={false}
                        animate={{
                          color: isActive
                            ? "var(--gold)"
                            : "color-mix(in oklab, var(--muted-foreground) 50%, transparent)",
                        }}
                        transition={{ duration: 0.6 }}
                        className="font-display text-[9px] tracking-[0.25em]"
                      >
                        {s.n}
                      </motion.div>
                      <motion.div
                        initial={false}
                        animate={{
                          color: isActive ? labelActive : labelIdle,
                        }}
                        transition={{ duration: 0.6 }}
                        className="mt-0.5 font-display text-xs font-medium leading-none"
                      >

                        {s.label}
                      </motion.div>
                    </motion.div>
                  );
                })}
              </div>
              <style>{`@keyframes spin-ring { to { transform: rotate(360deg); } }`}</style>
            </div>
          </div>

          {/* DESKTOP rail */}
          <div className="hidden md:col-span-3 md:block">
            <div className="relative" style={{ height: RAIL_H, paddingLeft: RAIL_W + 4 }}>
              <svg
                width={RAIL_W}
                height={RAIL_H}
                viewBox={`0 0 ${RAIL_W} ${RAIL_H}`}
                className="absolute left-0 top-0 overflow-visible"
                aria-hidden
              >
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
                  style={{
                    transformBox: "fill-box",
                    transformOrigin: "center",
                    animation: "spin-ring 8s linear infinite",
                  }}
                />
                <style>{`@keyframes spin-ring { to { transform: rotate(360deg); } }`}</style>
              </svg>

              {STEPS_LIST.map((s, i) => {
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
                    <div className="relative">
                      <motion.div
                        initial={false}
                        animate={{
                          color: isActive
                            ? "var(--gold)"
                            : "color-mix(in oklab, var(--muted-foreground) 50%, transparent)",
                        }}
                        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                        className="absolute -top-5 left-0 font-display text-[11px] tracking-[0.3em]"
                      >
                        {s.n}
                      </motion.div>
                      <motion.div
                        initial={false}
                        animate={{
                          color: isActive
                            ? "oklch(0.18 0.005 250)"
                            : "color-mix(in oklab, oklch(0.18 0.005 250) 25%, transparent)",
                        }}
                        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                        className="font-display text-lg font-medium leading-none md:text-xl"
                      >
                        {s.label}
                      </motion.div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Active card */}
          <div className="col-span-12 min-w-0 md:col-span-9">
            <div
              className="relative mx-auto min-h-[520px] w-full max-w-xl overflow-hidden md:h-[460px] md:min-h-0 md:overflow-visible"
              style={{ perspective: 1600 }}
            >
              {STEPS_LIST.map((s, i) => {
                const offset = i - active;
                const isActive = offset === 0;

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
                    className="absolute inset-0 flex flex-col gap-5 rounded-3xl bg-background p-6 pb-24 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.25)] md:gap-0 md:p-10 md:pb-10"
                  >
                    <div className="absolute right-6 top-6 z-10 font-display text-2xl font-medium text-foreground/15 md:right-9 md:top-9 md:text-3xl">
                      {s.n}
                    </div>

                    {s.image && (
                      <div
                        aria-hidden
                        className="pointer-events-none absolute right-6 top-6 z-0 hidden overflow-hidden rounded-2xl shadow-[0_20px_40px_-20px_rgba(0,0,0,0.35)] md:block"
                        style={{ width: "38%", height: "70%" }}
                      >
                        <img
                          src={s.image}
                          alt=""
                          className="h-full w-full object-cover"
                          style={{ objectPosition: s.imagePosition ?? "center" }}
                          draggable={false}
                          loading="lazy"
                          decoding="async"
                        />
                      </div>
                    )}

                    <motion.div
                      animate={{
                        opacity: isActive ? 1 : 0.4,
                        y: isActive ? 0 : 8,
                      }}
                      transition={{ duration: 0.6, delay: isActive ? 0.15 : 0 }}
                      className="md:max-w-[52%]"
                    >
                      <h3
                        className="font-display pr-10"
                        style={{
                          fontWeight: 500,
                          fontSize: "clamp(24px, 6.5vw, 44px)",
                          lineHeight: "0.95",
                          color: "oklch(0.18 0.005 250)",
                          letterSpacing: "-0.03em",
                        }}
                      >
                        {s.label}
                      </h3>
                      <div className="mt-2 font-display text-3xl font-medium leading-none text-foreground md:text-[44px]">
                        {s.big}
                      </div>
                      <p className="mt-3 text-[18px] leading-relaxed text-muted-foreground md:mt-4 md:text-[18px]">
                        {s.desc}
                      </p>
                    </motion.div>

                    {s.image && (
                      <div
                        aria-hidden
                        className="pointer-events-none relative z-0 mt-5 h-[160px] w-full overflow-hidden rounded-2xl shadow-[0_20px_40px_-20px_rgba(0,0,0,0.35)] md:hidden"
                      >
                        <img
                          src={s.image}
                          alt=""
                          className="h-full w-full object-cover"
                          style={{ objectPosition: s.imagePosition ?? "center" }}
                          draggable={false}
                          loading="lazy"
                          decoding="async"
                        />
                      </div>
                    )}

                    {isActive && (
                      <div className="absolute bottom-6 right-6 z-20 flex items-center gap-3 md:bottom-10 md:right-10">
                        <button
                          type="button"
                          aria-label="Anterior"
                          onClick={() => {
                            stoppedRef.current = true;
                            setActive((prev) => (prev - 1 + STEPS_LIST.length) % STEPS_LIST.length);
                          }}
                          className="flex h-11 w-11 items-center justify-center rounded-full border border-foreground/15 bg-background text-foreground transition-colors hover:border-foreground hover:bg-foreground hover:text-background"
                        >
                          <ArrowLeft className="h-4 w-4" />
                        </button>
                        <button
                          type="button"
                          aria-label="Próximo"
                          onClick={() => {
                            stoppedRef.current = true;
                            setActive((prev) => (prev + 1) % STEPS_LIST.length);
                          }}
                          className="flex h-11 w-11 items-center justify-center rounded-full border border-foreground/15 bg-background text-foreground transition-colors hover:border-foreground hover:bg-foreground hover:text-background"
                        >
                          <ArrowRight className="h-4 w-4" />
                        </button>
                      </div>
                    )}
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
