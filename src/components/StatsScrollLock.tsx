import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { Users, Building2, Sparkles, Truck, ArrowLeft, ArrowRight } from "lucide-react";
import leeviStore from "@/assets/leevi-store.webp";
import curadoria from "@/assets/curadoria.webp";
import logistica from "@/assets/logistica.webp";
import community from "@/assets/community.webp";

type Step = {
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
    label: "Comunidade",
    big: "+50 mil",
    desc: "revendedoras acompanham a Leevi todos os dias, criando uma das maiores redes de moda feminina do país, com engajamento real, conversas vivas e oportunidade de venda diária.",
    Icon: Users,
    image: community,
  },
  {
    n: "02",
    label: "Origem",
    big: "Atacado & Varejo",
    desc: "com sede própria em São Luís, MA, mais de uma década de mercado e estrutura completa de showroom, estoque e logística para abastecer revendedoras em todo o Brasil.",
    Icon: Building2,
    image: leeviStore,
  },
  {
    n: "03",
    label: "Curadoria",
    big: "+300 por mês",
    desc: "calçados e acessórios selecionados a dedo, com lançamentos constantes que antecipam tendências e garantem novidade pra você oferecer toda semana.",
    Icon: Sparkles,
    image: curadoria,
    imagePosition: "30% center",
  },
  {
    n: "04",
    label: "Logística",
    big: "Brasil todo",
    desc: "envios diários para todos os estados com agilidade, embalagem caprichada e códigos de rastreio — sua revenda gira rápido, sem dor de cabeça.",
    Icon: Truck,
    image: logistica,
    imagePosition: "35% center",
  },
];

const INTERVAL_MS = 4000;

/**
 * Auto-cycling card progression. Every 4s the active card advances; after the
 * last card it loops back to the first.
 */
export function StatsScrollLock() {
  const [active, setActive] = useState(0);
  const stoppedRef = useRef(false);

  useEffect(() => {
    const id = window.setInterval(() => {
      if (stoppedRef.current) return;
      setActive((prev) => (prev + 1) % STEPS.length);
    }, INTERVAL_MS);
    return () => window.clearInterval(id);
  }, []);

  const goPrev = () => {
    stoppedRef.current = true;
    setActive((prev) => (prev - 1 + STEPS.length) % STEPS.length);
  };
  const goNext = () => {
    stoppedRef.current = true;
    setActive((prev) => (prev + 1) % STEPS.length);
  };




  // Curve geometry — list lives inside a 60x440 SVG, dots evenly spaced.
  const RAIL_W = 60;
  const RAIL_H = 440;
  const STEP_GAP = RAIL_H / STEPS.length; // 110
  const dotY = (i: number) => STEP_GAP / 2 + i * STEP_GAP;
  const baseX = 6; // resting line x (kept on the left)
  const apexX = 48; // bulge x (rightward) at active dot

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
    <section
      className="relative"
      style={{ backgroundColor: "transparent" }}
    >
      <div className="flex items-center py-12 md:py-16">
        <div className="mx-auto grid w-full grid-cols-12 gap-8 pl-5 pr-5 md:pl-32 md:pr-10" style={{ maxWidth: "1300px" }}>
          {/* MOBILE — horizontal stepper above cards */}
          <div className="col-span-12 md:hidden">
            <div className="relative w-full" style={{ height: 70 }}>
              {/* Horizontal curved rail */}
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
                  const stepGap = W / STEPS.length;
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
                        style={{ transformBox: "fill-box", transformOrigin: "center", animation: "spin-ring 8s linear infinite" }}
                      />
                    </>
                  );
                })()}
              </svg>

              {/* Labels distributed horizontally */}
              <div className="absolute inset-x-0 bottom-0 grid" style={{ gridTemplateColumns: `repeat(${STEPS.length}, 1fr)` }}>
                {STEPS.map((s, i) => {
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
                          color: isActive
                            ? "rgb(56,56,56)"
                            : "color-mix(in oklab, rgb(56,56,56) 25%, transparent)",
                        }}
                        transition={{ duration: 0.6 }}
                        className="mt-0.5 font-display text-xs font-bold leading-none"
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

          {/* DESKTOP — vertical step rail with curving line */}
          <div className="hidden md:col-span-3 md:block">
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
                  style={{ transformBox: "fill-box", transformOrigin: "center", animation: "spin-ring 8s linear infinite" }}
                />
                <style>{`@keyframes spin-ring { to { transform: rotate(360deg); } }`}</style>
              </svg>

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
                            ? "rgb(56,56,56)"
                            : "color-mix(in oklab, rgb(56,56,56) 25%, transparent)",
                        }}
                        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                        className="font-display text-lg font-bold leading-none md:text-xl"
                      >
                        {s.label}
                      </motion.div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* RIGHT — active card + dramatic 3D peek */}
          <div className="col-span-12 md:col-span-9">
            <div
              className="relative mx-auto min-h-[600px] w-full max-w-xl md:h-[460px] md:min-h-0"
              style={{ perspective: 1600 }}
            >
              {STEPS.map((s, i) => {
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
                    <div className="absolute right-6 top-6 z-10 font-display text-2xl font-bold text-foreground/15 md:right-9 md:top-9 md:text-3xl">
                      {s.n}
                    </div>

                    {/* Desktop image — absolute right side */}
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

                    {/* Text block */}
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
                        style={{ fontWeight: 600, fontSize: "clamp(24px, 6.5vw, 44px)", lineHeight: "0.95", color: "rgb(56,56,56)", letterSpacing: "-0.03em" }}
                      >
                        {s.label}
                      </h3>
                      <div className="mt-2 font-display text-3xl font-black leading-none text-gold md:text-[44px]">
                        {s.big}
                      </div>
                      <p className="mt-3 text-[17px] leading-relaxed text-muted-foreground md:mt-4 md:text-[17px]">
                        {s.desc}
                      </p>
                    </motion.div>

                    {/* Mobile image — below text */}
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
                  </motion.div>
                );
              })}

              {/* Carousel arrows — pinned to card bottom */}
              <button
                type="button"
                onClick={goPrev}
                aria-label="Card anterior"
                className="absolute bottom-5 left-5 z-[200] flex h-11 w-11 items-center justify-center rounded-full bg-foreground/5 text-foreground/70 backdrop-blur transition-all hover:scale-110 hover:bg-gold hover:text-background md:bottom-8 md:left-8"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={goNext}
                aria-label="Próximo card"
                className="absolute bottom-5 right-5 z-[200] flex h-11 w-11 items-center justify-center rounded-full bg-foreground/5 text-foreground/70 backdrop-blur transition-all hover:scale-110 hover:bg-gold hover:text-background md:bottom-8 md:right-8"
              >
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
