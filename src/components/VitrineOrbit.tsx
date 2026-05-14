import { useEffect, useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
  
  
} from "motion/react";
import { ArrowRight } from "lucide-react";
import sandalia from "@/assets/sandalia-dourada.png";
import sandaliaCaramelo from "@/assets/sandalia-caramelo.png";
import sandaliaVerde from "@/assets/sandalia-verde.png";
import sandaliaPerola from "@/assets/sandalia-perola.png";
import sandaliaPreta from "@/assets/sandalia-preta.png";
import leeviMark from "@/assets/leevi-mark.png";

const WHATSAPP =
  "https://wa.me/5599999999999?text=Quero%20entrar%20no%20Grupo%20VIP%20Leevi";

const ITEMS = [
  { src: sandalia, name: "Sandália Vizzano", tag: "Mais vendida" },
  { src: sandaliaCaramelo, name: "Papete Vizzano", tag: "Lançamento" },
  { src: sandaliaVerde, name: "Mule Verde Vizzano", tag: "Alto giro" },
  { src: sandaliaPerola, name: "Sandália Pérola Vizzano", tag: "Sai rápido" },
  { src: sandaliaPreta, name: "Rasteira Preta Moleca", tag: "Top giro" },
  { src: sandaliaCaramelo, name: "Papete Vizzano", tag: "Novidade" },
  { src: sandaliaVerde, name: "Mule Verde Vizzano", tag: "Vitrine" },
  { src: sandaliaPreta, name: "Rasteira Preta Moleca", tag: "Procurada" },
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

  // Mouse parallax
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
      className="relative w-full overflow-hidden rounded-[20px] border-x border-b border-gold/40 py-20 md:py-32"
      style={{ background: "oklch(0.99 0.003 85)" }}
    >
      {/* Subtle line grid pattern */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(to right, oklch(0.55 0.04 80 / 0.08) 1px, transparent 1px), linear-gradient(to bottom, oklch(0.55 0.04 80 / 0.08) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          rotateX: rotX,
          rotateY: rotY,
          maskImage:
            "radial-gradient(ellipse at center, black 30%, transparent 85%)",
        }}
      />
      <div className="relative mx-auto grid max-w-[1400px] grid-cols-1 items-center gap-12 px-6 lg:grid-cols-[1fr_1fr] lg:gap-0">
        {/* LEFT — text */}
        <div className="relative z-30">
          {/* Protective radial backdrop for legibility */}
          <div
            aria-hidden
            className="pointer-events-none absolute -inset-10 -z-10"
            style={{
              background:
                "radial-gradient(ellipse at center, oklch(0.99 0.003 85 / 0.92) 0%, oklch(0.99 0.003 85 / 0.6) 45%, transparent 75%)",
            }}
          />

          <h2
            className="font-display"
            style={{
              fontWeight: 600,
              fontSize: "60px",
              lineHeight: "60px",
              color: "rgb(56,56,56)",
              letterSpacing: "-0.03em",
              maxWidth: "16ch",
            }}
          >
            As peças que costumam{" "}
            <span className="text-gold-deep">esgotar primeiro</span> dentro do grupo.
          </h2>

          <p className="mt-6 max-w-md text-base leading-relaxed text-muted-foreground md:text-lg">
            Você não precisa garimpar 10 fornecedores.{" "}
            <strong className="font-semibold text-foreground">
              Você só precisa do Grupo VIP Leevi.
            </strong>
          </p>

          <div className="mt-8">
            <a
              href={WHATSAPP}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 rounded-full px-7 py-3.5 font-display text-sm font-bold uppercase tracking-wider text-accent-foreground transition-transform hover:-translate-y-0.5 active:translate-y-0"
              style={{
                background:
                  "linear-gradient(180deg, var(--accent-light) 0%, var(--accent) 50%, var(--accent-dark) 100%)",
                boxShadow:
                  "inset 0 2px 0 hsl(0 0% 100% / 0.35), inset 0 -3px 0 var(--accent-shadow), 0 18px 40px -12px color-mix(in oklab, var(--accent) 70%, transparent)",
              }}
            >
              Solicitar acesso
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>

            {/* Active item — minimal, photo + name */}
            <div className="relative mt-7 h-16 overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ y: 12, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -12, opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="flex items-center gap-4"
                >
                  <img
                    src={current.src}
                    alt=""
                    className="h-16 w-16 object-contain"
                  />
                  <span className="font-display text-lg font-bold text-foreground md:text-xl">
                    {current.name}
                  </span>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* RIGHT — orbit */}
        <div className="relative mx-auto aspect-square w-[300px] sm:w-[420px] md:w-[620px] lg:-ml-40 lg:w-[820px]">
          {/* Orbit rings */}
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
              stroke="oklch(0.55 0.12 80 / 0.45)"
              strokeWidth="1"
            />
            <ellipse
              cx="410"
              cy="410"
              rx="210"
              ry="210"
              fill="none"
              stroke="oklch(0.55 0.12 80 / 0.35)"
              strokeWidth="1"
              strokeDasharray="4 6"
            />
          </svg>

          {/* Rotating orbit */}
          <motion.div
            className="absolute inset-0"
            animate={{ rotate: -(active * ANGLE_STEP) }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            {ITEMS.map((item, i) => {
              const angle = (i * ANGLE_STEP * Math.PI) / 180;
              const radiusPct = 38; // % of container
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
                  <div
                    className="relative flex h-20 w-20 items-center justify-center rounded-full sm:h-24 sm:w-24 md:h-28 md:w-28"
                  >
                    <img
                      src={item.src}
                      alt={item.name}
                      loading="lazy"
                      className="h-16 w-16 object-contain sm:h-20 sm:w-20 md:h-24 md:w-24"
                    />
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Center brand — white background, gold mark, animates on each tick */}
          <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <motion.div
              className="relative flex h-28 w-28 items-center justify-center rounded-full sm:h-32 sm:w-32 md:h-36 md:w-36 lg:h-40 lg:w-40"
              animate={{
                scale: highlighting ? 1.15 : 1,
              }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              style={{
                background: "#ffffff",
                border: "1px solid oklch(0.72 0.12 80 / 0.35)",
              }}
            >
              <img
                src={leeviMark}
                alt="Leevi"
                className="h-14 w-14 object-contain sm:h-16 sm:w-16 md:h-20 md:w-20"
                style={{
                  filter:
                    "brightness(0) saturate(100%) invert(62%) sepia(48%) saturate(560%) hue-rotate(2deg) brightness(92%) contrast(88%)",
                }}
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
