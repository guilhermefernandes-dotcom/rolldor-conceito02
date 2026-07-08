import { useEffect, useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
} from "motion/react";

import portaProduto from "@/assets/rd-produto-porta.png";
import janelaProduto from "@/assets/rd-produto-janela.png";
import foldingProduto from "@/assets/rd-produto-folding.png";
import pivotProduto from "@/assets/rd-produto-pivot.png";
import rdMark from "@/assets/rd-mark.png";

const ITEMS = [
  { src: portaProduto, name: "Portas Deslizantes", tag: "Alto padrão" },
  { src: janelaProduto, name: "Janelas Premium", tag: "Linha residencial" },
  { src: foldingProduto, name: "Sistemas Folding", tag: "Grandes vãos" },
  { src: pivotProduto, name: "Portas Pivotantes", tag: "Design" },
  { src: portaProduto, name: "Sistemas de Alumínio", tag: "Engenharia" },
  { src: janelaProduto, name: "Fachadas", tag: "Arquitetura" },
  { src: foldingProduto, name: "Soluções Personalizadas", tag: "Sob medida" },
  { src: pivotProduto, name: "Portas de Entrada", tag: "Assinatura" },
];

export function VitrineOrbit() {
  const [active, setActive] = useState(0);
  const [highlighting, setHighlighting] = useState(false);

  useEffect(() => {
    const id = setInterval(() => {
      setActive((i) => (i + 1) % ITEMS.length);
      setHighlighting(true);
      setTimeout(() => setHighlighting(false), 550);
    }, 2000);
    return () => clearInterval(id);
  }, []);

  const containerRef = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const sx = useSpring(mx, { stiffness: 80, damping: 20 });
  const sy = useSpring(my, { stiffness: 80, damping: 20 });
  const rotX = useTransform(sy, [0, 1], [6, -6]);
  const rotY = useTransform(sx, [0, 1], [-6, 6]);

  function onMove(e: React.MouseEvent) {
    const r = containerRef.current?.getBoundingClientRect();
    if (!r) return;
    mx.set((e.clientX - r.left) / r.width);
    my.set((e.clientY - r.top) / r.height);
  }

  const current = ITEMS[active];
  const ANGLE_STEP = 360 / ITEMS.length;

  return (
    <section
      ref={containerRef}
      onMouseMove={onMove}
      className="relative w-full overflow-hidden rounded-[20px] border border-foreground/10 py-10 md:py-32"
      style={{ background: "oklch(1 0 0)" }}
    >
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(to right, oklch(0.18 0.005 250 / 0.05) 1px, transparent 1px), linear-gradient(to bottom, oklch(0.18 0.005 250 / 0.05) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          rotateX: rotX,
          rotateY: rotY,
          maskImage:
            "radial-gradient(ellipse at center, black 30%, transparent 85%)",
        }}
      />
      <div className="relative mx-auto grid max-w-[1400px] grid-cols-1 items-center gap-12 px-6 lg:grid-cols-[1fr_1fr] lg:gap-0">
        <div className="relative z-30 text-center lg:text-left">
          <div
            aria-hidden
            className="pointer-events-none absolute -inset-10 -z-10"
            style={{
              background:
                "radial-gradient(ellipse at center, oklch(1 0 0 / 0.92) 0%, oklch(1 0 0 / 0.6) 45%, transparent 75%)",
            }}
          />

          <h2
            className="font-display mx-auto lg:mx-0"
            style={{
              fontWeight: 500,
              fontSize: "clamp(34px, 9vw, 60px)",
              lineHeight: "1.02",
              color: "oklch(0.18 0.005 250)",
              letterSpacing: "-0.03em",
              maxWidth: "16ch",
            }}
          >
            Um portfólio completo pra{" "}
            <span
              className="text-foreground"
              style={{
                background: "oklch(0.18 0.005 250 / 0.08)",
                padding: "0 0.18em",
                borderRadius: "6px",
                boxDecorationBreak: "clone",
                WebkitBoxDecorationBreak: "clone",
              }}
            >
              atender qualquer projeto
            </span>{" "}
            de alto padrão.
          </h2>

          <p className="mx-auto mt-6 max-w-lg text-lg leading-relaxed text-muted-foreground lg:mx-0 md:text-xl">
            Você oferece ao seu cliente soluções para residências, condomínios e empreendimentos —{" "}
            <strong className="font-semibold text-foreground">
              tudo com a assinatura Roll Door.
            </strong>
          </p>

          <div className="mt-8">
            <div className="relative mt-8 w-full max-w-[640px] mx-auto lg:mx-0">
              <a
                href="#cta-final"
                className="group relative flex h-16 w-full items-center justify-center rounded-2xl px-8 font-display text-lg font-bold text-accent-foreground transition-transform hover:-translate-y-0.5 sm:h-[72px] sm:px-12 sm:text-xl"
                style={{
                  background:
                    "linear-gradient(180deg, var(--accent-light) 0%, var(--accent) 50%, var(--accent-dark) 100%)",
                  boxShadow:
                    "inset 0 2px 0 hsl(0 0% 100% / 0.15), inset 0 -3px 0 var(--accent-shadow), 0 18px 40px -12px color-mix(in oklab, var(--accent) 70%, transparent)",
                }}
              >
                Quero ser um Revendedor Premium
              </a>
            </div>

            <div className="relative mt-7 h-16 overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ y: 12, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -12, opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="flex items-center justify-center gap-4 lg:justify-start"
                >
                  <img
                    src={current.src}
                    alt=""
                    className="h-16 w-16 object-contain"
                    loading="lazy"
                    decoding="async"
                  />
                  <span className="font-display text-lg font-medium text-foreground md:text-xl">
                    {current.name}
                  </span>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        <div className="relative mx-auto aspect-square w-[230px] sm:w-[420px] md:w-[620px] lg:-ml-40 lg:w-[820px]">
          <svg
            aria-hidden
            viewBox="0 0 820 820"
            className="absolute inset-0 h-full w-full opacity-30"
          >
            <ellipse
              cx="410"
              cy="410"
              rx="310"
              ry="310"
              fill="none"
              stroke="oklch(0.32 0.008 250 / 0.4)"
              strokeWidth="1"
            />
            <ellipse
              cx="410"
              cy="410"
              rx="210"
              ry="210"
              fill="none"
              stroke="oklch(0.32 0.008 250 / 0.3)"
              strokeWidth="1"
              strokeDasharray="4 6"
            />
          </svg>

          <motion.div
            className="absolute inset-0"
            animate={{ rotate: -(active * ANGLE_STEP) }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            {ITEMS.map((item, i) => {
              const angle = (i * ANGLE_STEP * Math.PI) / 180;
              const radiusPct = 38;
              const x = 50 + radiusPct * Math.cos(angle);
              const y = 50 + radiusPct * Math.sin(angle);

              return (
                <motion.div
                  key={i}
                  className="absolute -translate-x-1/2 -translate-y-1/2"
                  style={{ left: `${x}%`, top: `${y}%` }}
                  animate={{ rotate: active * ANGLE_STEP }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="relative flex h-20 w-20 items-center justify-center rounded-full sm:h-32 sm:w-32 md:h-36 md:w-36">
                    <img
                      src={item.src}
                      alt={item.name}
                      loading="lazy"
                      className="h-16 w-16 object-contain sm:h-28 sm:w-28 md:h-32 md:w-32"
                    />
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <motion.div
              className="relative flex h-20 w-20 items-center justify-center rounded-full sm:h-32 sm:w-32 md:h-36 md:w-36 lg:h-40 lg:w-40"
              animate={{
                scale: highlighting ? 1.15 : 1,
              }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              style={{
                background: "#ffffff",
                border: "1px solid oklch(0.32 0.008 250 / 0.35)",
              }}
            >
              <img
                src={rdMark}
                alt="Roll Door"
                className="h-10 w-10 object-contain sm:h-16 sm:w-16 md:h-20 md:w-20"
                loading="lazy"
                decoding="async"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
