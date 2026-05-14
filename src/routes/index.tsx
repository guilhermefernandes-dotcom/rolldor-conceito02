import { createFileRoute } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "motion/react";
import {
  ArrowRight,
  Tag,
  Gift,
  TrendingUp,
  Zap,
  Lock,
  PackageCheck,
  Flame,
  CheckCircle2,
  Check,
  Star,
  Plus,
  Minus,
  Quote,
} from "lucide-react";
import { useState, useEffect } from "react";
import heroImg from "@/assets/hero.jpg";
import productsImg from "@/assets/products.jpg";
import p1 from "@/assets/p1.jpg";
import p2 from "@/assets/p2.jpg";
import p3 from "@/assets/p3.jpg";
import p4 from "@/assets/p4.jpg";
import t1 from "@/assets/t1.jpg";
import t2 from "@/assets/t2.jpg";
import leeviMark from "@/assets/leevi-mark.png";
import launchesImg from "@/assets/leevi-launches.jpg";
import t3 from "@/assets/t3.jpg";
import depoimentoMockup from "@/assets/depoimento-mockup-mariana.png";

import depoimentoMockup3 from "@/assets/depoimento-mockup-patricia.png";
import logoUrl from "@/assets/logo.webp";
import badgeVagas from "@/assets/badge-vagas.webp";
import comoFuncionaRadar from "@/assets/como-funciona-radar.png";
import { StatsScrollLock } from "@/components/StatsScrollLock";
import { VitrineOrbit } from "@/components/VitrineOrbit";
import { JoinNotifications } from "@/components/JoinNotifications";
import { MagnifierCard } from "@/components/MagnifierCard";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Grupo VIP de Revendedoras Leevi — Lançamentos antes de todo mundo" },
      {
        name: "description",
        content:
          "Entre para o Grupo VIP de Revendedoras Leevi. Lives semanais, lançamentos do atacado, ofertas exclusivas e curadoria de alto giro pra você lucrar mais.",
      },
      { property: "og:title", content: "Grupo VIP de Revendedoras Leevi" },
      {
        property: "og:description",
        content: "Lançamentos do atacado, ofertas exclusivas e curadoria de alto giro pra revendedoras.",
      },
      { property: "og:image", content: heroImg },
    ],
  }),
  component: Landing,
});

const WHATSAPP = "https://wa.me/5599999999999?text=Quero%20entrar%20no%20Grupo%20VIP%20Leevi";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } },
};

function Logo({ className = "", priority = false }: { className?: string; priority?: boolean }) {
  return (
    <img
      src={logoUrl}
      alt="Leevi Distribuidora"
      width={800}
      height={373}
      decoding="async"
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : "auto"}
      className={`h-16 w-auto md:h-24 ${className}`}
    />
  );
}

function CTA({
  children = "Quero entrar no Grupo VIP",
  size = "lg",
  variant = "gold",
}: {
  children?: React.ReactNode;
  size?: "lg" | "md";
  variant?: "gold" | "outline";
}) {
  const base =
    "group inline-flex items-center justify-center gap-2 font-display font-bold uppercase tracking-wider transition-all duration-300";
  const sizing = size === "lg" ? "px-8 py-4 text-sm md:text-base" : "px-6 py-3 text-xs md:text-sm";
  const variants =
    variant === "gold"
      ? "bg-gradient-to-r from-gold via-gold to-gold-deep text-foreground shadow-[0_20px_60px_-20px_oklch(0.80_0.13_85_/_0.5)] hover:shadow-[0_24px_70px_-15px_oklch(0.80_0.13_85_/_0.7)] hover:-translate-y-0.5"
      : "border border-gold/40 text-gold hover:bg-gold hover:text-foreground";
  return (
    <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className={`${base} ${sizing} ${variants}`}>
      {children}
      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
    </a>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-5 inline-flex items-center gap-2">
      <span className="h-px w-8 bg-gold" />
      <span className="font-display text-[11px] uppercase tracking-[0.3em] text-gold">{children}</span>
    </div>
  );
}

function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      className={className}
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}

const DEPOIMENTOS = [
  { src: depoimentoMockup, alt: "Depoimento de Mariana C. no grupo VIP da Leevi" },
  { src: depoimentoMockup3, alt: "Depoimento de Patrícia S. no grupo VIP da Leevi" },
];

function DepoimentoCarousel() {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % DEPOIMENTOS.length), 3200);
    return () => clearInterval(id);
  }, []);
  return (
    <div className="relative w-full max-w-[460px]" style={{ aspectRatio: "660 / 1080" }}>
      {DEPOIMENTOS.map((d, i) => (
        <motion.img
          key={i}
          src={d.src}
          alt={d.alt}
          className="absolute inset-0 h-full w-full object-contain"
          style={{
            filter:
              "drop-shadow(0 40px 50px rgba(0,0,0,0.28)) drop-shadow(0 18px 22px rgba(0,0,0,0.18))",
          }}
          loading="eager"
          decoding="async"
          initial={false}
          animate={{
            opacity: i === index ? 1 : 0,
            scale: i === index ? 1 : 0.97,
          }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        />
      ))}
      {/* Pagination dots */}
      <div className="pointer-events-none absolute -bottom-6 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2">
        {DEPOIMENTOS.map((_, i) => (
          <span
            key={i}
            className="h-1.5 rounded-full transition-all duration-500"
            style={{
              width: i === index ? 24 : 8,
              background: i === index ? "var(--gold)" : "color-mix(in oklab, var(--gold) 30%, transparent)",
            }}
          />
        ))}
      </div>
    </div>
  );
}

function FloatingStepCard({
  title,
  desc,
}: {
  title: string;
  desc: string;
  align?: "left" | "right";
}) {
  return (
    <div className="relative rounded-2xl border border-border/60 bg-card p-6 text-left md:p-7">
      <h4 className="font-display text-xl font-bold tracking-tight text-gold-deep md:text-2xl">
        {title}
      </h4>
      <p className="mt-3 text-lg leading-relaxed text-muted-foreground md:text-xl">{desc}</p>
    </div>
  );
}

function UnderlineWord({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  return (
    <span className="relative inline-block whitespace-nowrap">
      <span className="relative z-10">{children}</span>
      <motion.span
        aria-hidden
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, delay: 0.5 + delay, ease: [0.22, 1, 0.36, 1] }}
        className="absolute -bottom-1 left-0 right-0 h-[3px] origin-left rounded-full bg-gold md:h-[4px]"
      />
    </span>
  );
}

// HandPhoneReveal removed — not in use

function Landing() {
  const { scrollY } = useScroll();
  const heroPad = useTransform(scrollY, [0, 120], [13, 0]);
  const heroRadius = useTransform(scrollY, [0, 120], [28, 0]);
  return (
    <main className="min-h-screen bg-background text-foreground antialiased">
      <JoinNotifications />
      {/* HERO — full width inside gold padded frame that collapses on scroll */}
      <motion.div className="bg-gold" style={{ padding: heroPad }}>
        <motion.section
          className="relative w-full overflow-hidden bg-secondary px-6 py-16 md:px-10 md:py-20"
          style={{ borderRadius: heroRadius }}
        >
          {/* Decorative background effects */}
          <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
            {/* Soft golden blobs */}
            <div className="absolute -left-32 -top-32 h-[28rem] w-[28rem] rounded-full bg-gold/25 blur-[120px]" />
            <div className="absolute -right-40 top-1/3 h-[32rem] w-[32rem] rounded-full bg-gold-soft/30 blur-[140px]" />
            <div className="absolute bottom-0 left-1/3 h-[24rem] w-[24rem] -translate-x-1/2 rounded-full bg-accent/15 blur-[120px]" />
            {/* Subtle grid */}
            <div
              className="absolute inset-0 opacity-[0.04]"
              style={{
                backgroundImage:
                  "linear-gradient(to right, rgb(56,56,56) 1px, transparent 1px), linear-gradient(to bottom, rgb(56,56,56) 1px, transparent 1px)",
                backgroundSize: "56px 56px",
                maskImage:
                  "radial-gradient(ellipse at center, black 40%, transparent 75%)",
                WebkitMaskImage:
                  "radial-gradient(ellipse at center, black 40%, transparent 75%)",
              }}
            />
            {/* Vignette to focus the center */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(ellipse at center, transparent 50%, color-mix(in oklab, var(--secondary) 60%, transparent) 100%)",
              }}
            />
          </div>
          <div className="relative mx-auto flex max-w-6xl flex-col items-center text-center">
            <Reveal>
              <Logo className="mb-4" priority />
            </Reveal>
            <Reveal delay={0.05}>
              <div className="mb-2" />
            </Reveal>
            <Reveal delay={0.15}>
              <h1
                className="font-display"
                style={{ fontWeight: 600, fontSize: "60px", lineHeight: "60px", color: "rgb(56,56,56)", letterSpacing: "-0.03em" }}
              >
                Veja os lançamentos do atacado
                <br />
                <span className="text-gold">antes da sua concorrente.</span>
              </h1>
            </Reveal>
            <Reveal delay={0.25}>
              <p className="mt-7 max-w-2xl text-[21px] leading-relaxed tracking-[-0.01em] text-muted-foreground md:text-[23px]">
                Toda semana tem live com novidades, ofertas que não saem do grupo e os produtos de
                maior giro selecionados pra você lucrar mais — antes de todo mundo.
              </p>
            </Reveal>
            <Reveal delay={0.35} className="w-full max-w-[640px]">
              <div className="relative mt-10 w-full">
                <a
                  href={WHATSAPP}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative flex h-16 w-full items-center justify-center rounded-2xl px-8 pr-20 font-display text-lg font-bold text-accent-foreground transition-transform hover:-translate-y-0.5 sm:h-[72px] sm:px-12 sm:pr-28 sm:text-xl"
                  style={{
                    background:
                      "linear-gradient(180deg, var(--accent-light) 0%, var(--accent) 50%, var(--accent-dark) 100%)",
                    boxShadow:
                      "inset 0 2px 0 hsl(0 0% 100% / 0.35), inset 0 -3px 0 var(--accent-shadow), 0 18px 40px -12px color-mix(in oklab, var(--accent) 70%, transparent)",
                  }}
                >
                  Quero participar da próxima turma
                </a>
                <img
                  src={badgeVagas}
                  alt="Vagas limitadas - turma reduzida"
                  width={400}
                  height={400}
                  decoding="async"
                  fetchPriority="high"
                  className="absolute -right-4 -top-6 sm:-right-10 sm:-top-8 h-24 w-24 sm:h-32 sm:w-32 rotate-12 drop-shadow-xl"
                />
              </div>
            </Reveal>
            <Reveal delay={0.45}>
              <div className="mt-8 inline-flex items-center gap-3 rounded-full border border-destructive/30 bg-destructive/5 px-4 py-2">
                <Flame className="h-4 w-4 text-destructive" />
                <p className="text-xs tracking-[-0.01em] text-foreground/80 md:text-sm">
                  <span className="font-bold text-destructive">Vagas limitadas.</span> Restam poucas
                  posições para esta semana.
                </p>
              </div>
            </Reveal>
          </div>
        </motion.section>
      </motion.div>

      {/* MARQUEE */}
      <div className="overflow-hidden bg-gold py-4">
        <div
          className="flex animate-[marquee_30s_linear_infinite] whitespace-nowrap font-display"
          style={{ fontWeight: 500, fontSize: "24px", lineHeight: "32px", color: "rgb(255,255,255)", letterSpacing: "-0.01em" }}
        >
          {Array.from({ length: 6 }).flatMap((_, i) =>
            ["Vagas limitadas", "Lives toda semana", "Lançamentos antes de todo mundo", "Grupo VIP Leevi"].map((item, j) => (
              <span key={`${i}-${j}`} className="inline-flex items-center">
                <span className="px-8">{item}</span>
                <span className="opacity-60">•</span>
              </span>
            ))
          )}
        </div>
        <style>{`@keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }`}</style>
      </div>

      {/* AUTORIDADE */}
      <section className="border-t border-border bg-secondary/70 pt-24 md:pt-32">
        <div className="mx-auto max-w-[1400px] px-5 md:px-10">
          {/* Centered heading with animated underlines on key words */}
          <div className="mx-auto max-w-4xl text-center">
            <Reveal>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-gold/20 bg-gold/10 py-2 pl-2 pr-5 shadow-sm backdrop-blur">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-background/80">
                  <img src={leeviMark} alt="Leevi" className="h-5 w-5 object-contain" />
                </span>
                <span className="font-display text-sm font-medium tracking-wide text-foreground/80">
                  quem é a Leevi
                </span>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="font-display text-4xl font-black leading-[1.05] tracking-tight md:text-6xl">
                Referência em <UnderlineWord delay={0}>calçados</UnderlineWord> e{" "}
                <UnderlineWord delay={0.18}>acessórios</UnderlineWord> para revenda em todo o{" "}
                <UnderlineWord delay={0.36}>Brasil</UnderlineWord>.
              </h2>
            </Reveal>
            <Reveal delay={0.25}>
              <p className="mx-auto mt-6 max-w-2xl text-[21px] text-muted-foreground md:text-[23px]">
                Quem conhece a Leevi sabe da curadoria. Quem está no GRUPO VIP, sai na frente.
              </p>
            </Reveal>
          </div>
        </div>

        <StatsScrollLock />
      </section>

      {/* VANTAGENS */}
      <section className="bg-secondary/70 pt-4 pb-28">
        <div className="w-full" style={{ padding: "20px" }}>
          <div
            className="relative w-full rounded-[32px] px-6 py-12 md:px-12 md:py-16"
            style={{ background: "oklch(0.22 0 0)" }}
          >
            {/* decorative bg details */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 rounded-[32px]"
              style={{
                background:
                  "radial-gradient(600px 320px at 85% -10%, color-mix(in oklab, var(--gold) 22%, transparent), transparent 60%), radial-gradient(500px 280px at -5% 110%, color-mix(in oklab, var(--gold) 14%, transparent), transparent 60%)",
              }}
            />
            {/* diagonal hairlines */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 rounded-[32px] opacity-[0.08]"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(115deg, rgba(255,255,255,0.9) 0 1px, transparent 1px 14px)",
                maskImage:
                  "linear-gradient(180deg, black 0%, black 70%, transparent 100%)",
                WebkitMaskImage:
                  "linear-gradient(180deg, black 0%, black 70%, transparent 100%)",
              }}
            />
            {/* gold accent line sweep */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 rounded-[32px] opacity-[0.18]"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(115deg, color-mix(in oklab, var(--gold) 90%, transparent) 0 1px, transparent 1px 90px)",
                maskImage:
                  "radial-gradient(ellipse 70% 60% at 80% 30%, black, transparent 75%)",
                WebkitMaskImage:
                  "radial-gradient(ellipse 70% 60% at 80% 30%, black, transparent 75%)",
              }}
            />
            {/* SVG noise grain */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 rounded-[32px] opacity-[0.18] mix-blend-overlay"
              style={{
                backgroundImage:
                  "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='220' height='220'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.55 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
                backgroundSize: "220px 220px",
              }}
            />
            {/* long thin gold stroke top-right */}
            <svg
              aria-hidden
              className="pointer-events-none absolute right-0 top-0 h-full w-[55%] opacity-[0.22]"
              viewBox="0 0 600 400"
              fill="none"
              preserveAspectRatio="none"
            >
              <path
                d="M -20 380 Q 200 280 380 200 T 620 -20"
                stroke="var(--gold)"
                strokeWidth="1"
                fill="none"
              />
              <path
                d="M -20 420 Q 240 320 420 240 T 660 20"
                stroke="var(--gold)"
                strokeWidth="0.6"
                fill="none"
              />
            </svg>
            <div className="relative z-10">
            {/* Header row */}
            <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
              <div className="max-w-2xl">
                <Reveal>
                  <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 py-2 pl-2 pr-5 backdrop-blur">
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/95">
                      <img src={leeviMark} alt="Leevi" className="h-5 w-5 object-contain" />
                    </span>
                    <span className="font-display text-sm font-medium tracking-wide text-white/90">
                      vantagens exclusivas
                    </span>
                  </div>
                  <h2
                    className="text-white"
                    style={{
                      fontFamily: '"DM Sans", ui-sans-serif, system-ui, sans-serif',
                      fontWeight: 600,
                      fontSize: "44px",
                      lineHeight: "40px",
                    }}
                  >
                    O que você ganha por estar{" "}
                    <span style={{ color: "var(--gold)" }}>dentro do grupo</span>.
                  </h2>
                </Reveal>
              </div>
              <Reveal delay={0.1}>
                <a
                  href="#cta"
                  className="group relative inline-flex items-center gap-3 rounded-2xl px-8 py-4 font-display text-lg font-bold text-accent-foreground transition-transform hover:-translate-y-0.5"
                  style={{
                    background:
                      "linear-gradient(180deg, var(--accent-light) 0%, var(--accent) 50%, var(--accent-dark) 100%)",
                    boxShadow:
                      "inset 0 2px 0 hsl(0 0% 100% / 0.35), inset 0 -3px 0 var(--accent-shadow)",
                  }}
                >
                  Quero entrar
                  <ArrowRight className="h-5 w-5" />
                </a>
              </Reveal>
            </div>

            {/* Cards grid */}
            <div className="mt-10 grid gap-[13px] md:mt-14 md:grid-cols-4">
              {[
                {
                  icon: Zap,
                  title: "Lançamentos antes de todo mundo",
                  bullets: [
                    "Novidades 24h antes do público",
                    "Avisos exclusivos no grupo",
                    "Acesso prioritário às coleções",
                  ],
                },
                {
                  icon: Tag,
                  title: "Preços que só existem no grupo",
                  bullets: [
                    "Descontos reservados",
                    "Cupons relâmpago",
                    "Condições especiais de revenda",
                  ],
                },
                {
                  icon: Gift,
                  title: "Sorteios e bônus toda semana",
                  bullets: [
                    "Brindes para participantes",
                    "Kits exclusivos das lives",
                    "Ações relâmpago ao vivo",
                  ],
                  highlight: true,
                },
                {
                  icon: TrendingUp,
                  title: "Curadoria de alto giro",
                  bullets: [
                    "Produtos validados na loja",
                    "Foco em alto giro",
                    "Sem apostar no escuro",
                  ],
                },
              ].map(({ icon: Icon, title, bullets, highlight }, i) => (
                <Reveal key={i} delay={i * 0.05} className="h-full">
                  <article
                    className="group relative flex h-full flex-col gap-2 rounded-[24px] p-2 backdrop-blur-xl transition-colors"
                    style={
                      highlight
                        ? {
                            background:
                              "linear-gradient(180deg, color-mix(in oklab, var(--gold) 22%, transparent) 0%, color-mix(in oklab, var(--gold) 10%, transparent) 100%)",
                            border:
                              "1px solid color-mix(in oklab, var(--gold) 45%, transparent)",
                          }
                        : {
                            background: "rgba(255,255,255,0.04)",
                            border: "1px solid rgba(255,255,255,0.08)",
                          }
                    }
                  >
                    {/* TOP — icon + title */}
                    <div
                      className="flex flex-1 flex-col rounded-[18px] p-6"
                      style={{
                        background: highlight
                          ? "color-mix(in oklab, var(--gold) 14%, rgba(255,255,255,0.04))"
                          : "rgba(255,255,255,0.05)",
                        border: "1px solid rgba(255,255,255,0.06)",
                      }}
                    >
                      <Icon
                        className="h-9 w-9"
                        style={{ color: "var(--gold)" }}
                        strokeWidth={1.3}
                      />

                      <h3 className="mt-14 font-display text-[26px] font-medium leading-[1.1] tracking-tight text-white">
                        {title}
                      </h3>
                    </div>

                    {/* BOTTOM — bullets + CTA pill */}
                    <div
                      className="flex flex-col gap-5 rounded-[18px] p-6"
                      style={{
                        background: highlight
                          ? "color-mix(in oklab, var(--gold) 8%, rgba(0,0,0,0.25))"
                          : "rgba(255,255,255,0.025)",
                        border: "1px solid rgba(255,255,255,0.05)",
                      }}
                    >
                      <ul className="space-y-2">
                        {bullets.map((b) => (
                          <li
                            key={b}
                            className="flex items-start gap-2.5 text-[21px] leading-relaxed text-white/75"
                          >
                            <Check
                              className="mt-0.5 h-4 w-4 shrink-0"
                              style={{ color: "var(--gold)" }}
                              strokeWidth={2.5}
                            />
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>

                      <a
                        href="#cta"
                        className="group/btn flex w-full items-center justify-between gap-3 rounded-md px-4 py-3.5 font-display text-base font-medium transition-colors"
                        style={
                          highlight
                            ? {
                                background: "oklch(0.16 0 0)",
                                color: "#ffffff",
                                border: "1px solid rgba(255,255,255,0.08)",
                              }
                            : {
                                background: "rgba(255,255,255,0.04)",
                                color: "rgba(255,255,255,0.95)",
                                border: "1px solid rgba(255,255,255,0.08)",
                              }
                        }
                      >
                        Saiba mais
                        <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                      </a>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>

            </div>
            {/* tail — polygon pointer */}
            <svg
              aria-hidden
              className="absolute left-28 z-0 md:left-40"
              style={{ bottom: "calc(-5rem + 13px)" }}
              width="190"
              height="149"
              viewBox="0 0 2137 1681"
              fill="none"
              preserveAspectRatio="xMidYMid meet"
            >
              <path
                d="M2006.04 652.34C2180.53 716.618 2180.53 963.406 2006.04 1027.68L269.133 1667.52C138.564 1715.62 7.69499e-05 1618.99 7.69499e-05 1479.85L7.69499e-05 200.178C7.69499e-05 61.0311 138.564 -35.592 269.134 12.5066L2006.04 652.34Z"
                fill="oklch(0.22 0 0)"
              />
            </svg>
          </div>
        </div>
      </section>

      {/* COMO FUNCIONA */}
      <section className="relative bg-secondary/70 py-24 md:py-32">
        <div className="mx-auto max-w-[1400px] px-5 md:px-10">
          <div className="text-center">
            <Reveal>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-gold/20 bg-gold/10 py-2 pl-2 pr-5 shadow-sm backdrop-blur">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-background/80">
                  <img src={leeviMark} alt="Leevi" className="h-5 w-5 object-contain" />
                </span>
                <span className="font-display text-sm font-medium tracking-wide text-foreground/80">
                  como funciona
                </span>
              </div>
              <h2 className="mx-auto max-w-2xl font-display text-4xl font-black leading-[1.05] tracking-tight md:text-6xl">
                Em 4 passos <br className="hidden md:block" />
                você já está <span className="text-gold">dentro</span>.
              </h2>
            </Reveal>
          </div>

          {(() => {
            const steps = [
              {
                key: "tl",
                title: "Clique no botão",
                desc: "Entra direto pelo WhatsApp, sem cadastro nem espera.",
                center: "Clique no botão",
              },
              {
                key: "tr",
                title: "Receba os avisos",
                desc: "Avisamos toda live com antecedência pra você não perder.",
                center: "Receba os avisos",
              },
              {
                key: "bl",
                title: "Participe ao vivo",
                desc: "Vê os lançamentos e tira dúvidas em tempo real com a curadoria.",
                center: "Participe ao vivo",
              },
              {
                key: "br",
                title: "Aproveite as ofertas",
                desc: "Condições exclusivas do grupo pra você lucrar mais em cada peça.",
                center: "Aproveite as ofertas",
              },
            ];

            return (
              <div className="relative mx-auto mt-20 max-w-[1400px]">
                {/* Desktop: radar centered with cards overlapping on top */}
                <div className="relative hidden md:block">
                  <Reveal>
                    <div className="relative mx-auto flex justify-center">
                      <img
                        src={comoFuncionaRadar}
                        alt="4 passos para entrar no grupo VIP"
                        className="h-auto w-[620px] lg:w-[760px]"
                      />
                    </div>
                  </Reveal>

                  {/* Top-left */}
                  <div className="absolute left-0 top-4 z-10 w-[340px] lg:w-[380px]">
                    <Reveal>
                      <FloatingStepCard title={steps[0].title} desc={steps[0].desc} />
                    </Reveal>
                  </div>
                  {/* Top-right */}
                  <div className="absolute right-0 top-4 z-10 w-[340px] lg:w-[380px]">
                    <Reveal>
                      <FloatingStepCard title={steps[1].title} desc={steps[1].desc} />
                    </Reveal>
                  </div>
                  {/* Bottom-left */}
                  <div className="absolute bottom-4 left-0 z-10 w-[340px] lg:w-[380px]">
                    <Reveal>
                      <FloatingStepCard title={steps[2].title} desc={steps[2].desc} />
                    </Reveal>
                  </div>
                  {/* Bottom-right */}
                  <div className="absolute bottom-4 right-0 z-10 w-[340px] lg:w-[380px]">
                    <Reveal>
                      <FloatingStepCard title={steps[3].title} desc={steps[3].desc} />
                    </Reveal>
                  </div>
                </div>

                {/* Mobile floating cards (stacked) */}
                <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 md:hidden">
                  {steps.map((s) => (
                    <Reveal key={s.key}>
                      <FloatingStepCard title={s.title} desc={s.desc} align="left" />
                    </Reveal>
                  ))}
                </div>
              </div>
            );
          })()}

          <Reveal>
            <p className="mx-auto mt-16 max-w-3xl text-center text-base text-muted-foreground md:text-xl">
              Quando esses <strong className="font-semibold text-foreground">4 passos</strong>{" "}
              acontecem juntos, entrar no grupo deixa de ser curiosidade e passa a ser{" "}
              <strong className="font-semibold text-foreground">decisão de venda</strong>.
            </p>
          </Reveal>

          <div className="mt-10 flex justify-center">
            <Reveal className="w-full max-w-[640px]">
              <div className="relative w-full">
                <a
                  href={WHATSAPP}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative flex h-16 w-full items-center justify-center rounded-2xl px-8 pr-20 font-display text-lg font-bold text-accent-foreground transition-transform hover:-translate-y-0.5 sm:h-[72px] sm:px-12 sm:pr-28 sm:text-xl"
                  style={{
                    background:
                      "linear-gradient(180deg, var(--accent-light) 0%, var(--accent) 50%, var(--accent-dark) 100%)",
                    boxShadow:
                      "inset 0 2px 0 hsl(0 0% 100% / 0.35), inset 0 -3px 0 var(--accent-shadow), 0 18px 40px -12px color-mix(in oklab, var(--accent) 70%, transparent)",
                  }}
                >
                  Quero participar da próxima turma
                </a>
                <img
                  src={badgeVagas}
                  alt="Vagas limitadas - turma reduzida"
                  width={400}
                  height={400}
                  decoding="async"
                  className="absolute -right-4 -top-6 sm:-right-10 sm:-top-8 h-24 w-24 sm:h-32 sm:w-32 rotate-12 drop-shadow-xl"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* VITRINE — Orbit */}
      <div className="bg-secondary/70 p-[25px]">
        <VitrineOrbit />
      </div>

      {/* PROVA SOCIAL */}
      <section className="bg-secondary/70 pt-24 md:pt-32">
        <div className="mx-auto max-w-[1400px] px-5 md:px-10">
          <div className="grid gap-12 md:grid-cols-2 md:items-stretch md:gap-16">
            {/* LEFT — pill, headline, CTA */}
            <div className="flex flex-col justify-between gap-12 md:py-4">
              <Reveal>
                <div className="inline-flex items-center gap-2 rounded-full border border-gold/20 bg-gold/10 py-2 pl-2 pr-5 shadow-sm backdrop-blur">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-background/80">
                    <img src={leeviMark} alt="Leevi" className="h-5 w-5 object-contain" />
                  </span>
                  <span className="font-display text-sm font-medium tracking-wide text-foreground/80">
                    depoimentos
                  </span>
                </div>
                <h2 className="mt-7 font-display text-4xl font-black leading-[1.05] tracking-tight md:text-6xl">
                  O que <UnderlineWord delay={0}>dizem</UnderlineWord>{" "}
                  <UnderlineWord delay={0.18}>nossas</UnderlineWord> revendedoras no grupo.
                </h2>
              </Reveal>

              <Reveal delay={0.15}>
                <div className="flex flex-wrap items-center gap-5">
                  <a
                    href={WHATSAPP}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-3 rounded-full px-8 py-4 font-display text-sm font-bold uppercase tracking-wider text-accent-foreground transition-transform hover:-translate-y-0.5 active:translate-y-0 md:text-base"
                    style={{
                      background:
                        "linear-gradient(180deg, var(--accent-light) 0%, var(--accent) 50%, var(--accent-dark) 100%)",
                      boxShadow:
                        "inset 0 2px 0 hsl(0 0% 100% / 0.35), inset 0 -3px 0 var(--accent-shadow), 0 18px 40px -12px color-mix(in oklab, var(--accent) 70%, transparent)",
                    }}
                  >
                    Entrar no Grupo VIP
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </a>

                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-background ring-1 ring-border">
                      <img src={leeviMark} alt="Leevi" className="h-7 w-7 object-contain" />
                    </div>
                    <div className="leading-tight">
                      <div className="font-display text-2xl font-black text-foreground">5.0</div>
                      <div className="font-display text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
                        Depoimentos<br />no grupo
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>

            {/* RIGHT — WhatsApp mockup */}
            <Reveal delay={0.1}>
              <div className="flex justify-center md:justify-end">
                <DepoimentoCarousel />
              </div>
            </Reveal>
          </div>
        </div>

        {/* Full-width gold ticker */}
        <Reveal delay={0.2}>
          <div className="relative mt-16 flex w-full items-stretch overflow-hidden bg-gold py-4 font-display">
            {/* EM LIVE badge */}
            <div className="z-10 -my-4 flex shrink-0 items-center gap-3 self-stretch rounded-r-3xl bg-gold-deep px-7 text-base font-black uppercase tracking-[0.25em] text-white">
              <span className="relative flex h-2.5 w-2.5">
                <span
                  className="absolute inset-0 rounded-full bg-white"
                  style={{ animation: "leevi-pulse-ring 1.4s ease-out infinite" }}
                />
                <span
                  className="relative inline-flex h-2.5 w-2.5 rounded-full bg-white"
                  style={{ animation: "leevi-pulse-dot 1.4s ease-in-out infinite" }}
                />
              </span>
              em live
            </div>

            {/* Marquee track */}
            <div className="flex flex-1 overflow-hidden">
              <div
                className="flex shrink-0 items-center whitespace-nowrap text-white"
                style={{
                  animation: "leevi-marquee 38s linear infinite",
                  fontWeight: 600,
                  fontSize: "18px",
                  letterSpacing: "-0.01em",
                }}
              >
                {Array.from({ length: 6 }).flatMap((_, group) =>
                  [
                    "Algumas peças esgotam ainda durante a live",
                    "Estoque limitado",
                    "Quem chega primeiro leva",
                    "Curadoria semanal",
                    "Compre antes do site",
                    "Lançamentos antes de todo mundo",
                  ].map((t, i) => (
                    <span key={`${group}-${i}`} className="inline-flex items-center">
                      <span className="px-8">{t}</span>
                      <span className="opacity-60">•</span>
                    </span>
                  )),
                )}
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* LOSS AVERSION */}
      <section
        className="relative overflow-hidden py-24 md:py-32"
        style={{ background: "oklch(0.18 0.005 80)" }}
      >
        {/* Diagonal line pattern */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "repeating-linear-gradient(115deg, oklch(0.95 0.02 85 / 0.06) 0px, oklch(0.95 0.02 85 / 0.06) 1px, transparent 1px, transparent 22px)",
          }}
        />
        {/* soft gold halos */}
        <div className="pointer-events-none absolute -left-40 top-1/3 h-[500px] w-[500px] rounded-full bg-gold/10 blur-[160px]" />
        <div className="pointer-events-none absolute -right-40 bottom-0 h-[400px] w-[400px] rounded-full bg-gold-soft/10 blur-[140px]" />

        <div className="relative mx-auto max-w-[1400px] px-5 md:px-10">
          {/* Centered header */}
          <div className="mx-auto max-w-3xl text-center">
            <Reveal>
              <SectionLabel>por que entrar agora</SectionLabel>
            </Reveal>
            <Reveal delay={0.1}>
              <h2
                className="font-display text-white"
                style={{ fontWeight: 600, fontSize: "60px", lineHeight: "60px", letterSpacing: "-0.03em" }}
              >
                O que você perde<br />
                ficando <span className="text-gold">de fora.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mx-auto mt-6 max-w-xl text-[19px] leading-relaxed text-white/60 md:text-[21px]">
                Cada semana fora do grupo é uma semana comprando depois da concorrência.
              </p>
            </Reveal>
          </div>

          {/* Top benefit cards — gold gradient with check badges */}
          <div className="mt-14 grid gap-6 md:grid-cols-3 md:gap-7">
            {[
              { kicker: "Acesso semanal", title: "Lançamentos antes do site", tone: "soft" },
              { kicker: "Vantagem exclusiva", title: "Preços e bônus do VIP", tone: "deep" },
              { kicker: "Curadoria Leevi", title: "Produtos de alto giro", tone: "soft" },
            ].map((c, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <div className="relative">
                  {/* Check badge */}
                  <div className="absolute left-1/2 -top-5 z-10 flex h-10 w-10 -translate-x-1/2 items-center justify-center rounded-full bg-card ring-1 ring-white/10">
                    <Check className="h-5 w-5 text-gold-deep" strokeWidth={3} />
                  </div>
                  <div
                    className="relative overflow-hidden rounded-[28px] px-6 pb-7 pt-9 text-center ring-1 ring-white/5"
                    style={{
                      background:
                        c.tone === "deep"
                          ? "linear-gradient(160deg, oklch(0.86 0.13 88), oklch(0.62 0.13 75))"
                          : "linear-gradient(160deg, oklch(0.92 0.10 92), oklch(0.74 0.13 82))",
                    }}
                  >
                    <div className="font-display text-[12px] font-semibold uppercase tracking-[0.18em] text-foreground/70">
                      {c.kicker}
                    </div>
                    <div className="mt-2 font-display text-[26px] font-bold leading-tight text-foreground md:text-[28px]">
                      {c.title}
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Sub-heading */}
          <Reveal delay={0.1}>
            <div className="mt-24 text-center">
              <h3 className="font-display text-3xl font-semibold tracking-tight text-white md:text-[40px]">
                Como funciona?
              </h3>
            </div>
          </Reveal>

          {/* Steps with curved dashed line */}
          <div className="relative mx-auto mt-12 max-w-5xl">
            <svg
              aria-hidden
              viewBox="0 0 1000 520"
              preserveAspectRatio="none"
              className="pointer-events-none absolute inset-0 hidden h-full w-full md:block"
            >
              <path
                d="M 200 40 C 520 60, 120 240, 500 260 S 880 460, 800 500"
                fill="none"
                stroke="oklch(0.82 0.12 85)"
                strokeWidth="2"
                strokeDasharray="2 8"
                strokeLinecap="round"
                opacity="0.5"
              />
            </svg>
            <div
              aria-hidden
              className="pointer-events-none absolute left-1/2 top-0 h-full w-px -translate-x-1/2 md:hidden"
              style={{
                backgroundImage:
                  "linear-gradient(to bottom, oklch(0.82 0.12 85 / 0.5) 50%, transparent 50%)",
                backgroundSize: "1px 10px",
              }}
            />

            <ol className="relative grid gap-14 md:grid-cols-3 md:gap-8">
              {[
                {
                  Icon: Zap,
                  n: "1",
                  title: "Você entra no grupo",
                  desc: "Cadastro rápido pelo WhatsApp. Sem mensalidade, sem letra miúda.",
                  align: "md:items-start md:text-left",
                },
                {
                  Icon: PackageCheck,
                  n: "2",
                  title: "Recebe lançamentos cedo",
                  desc: "A curadoria Leevi cai antes do site, com preço e bônus do VIP.",
                  align: "md:items-center md:text-center md:pt-24",
                },
                {
                  Icon: TrendingUp,
                  n: "3",
                  title: "Vende com vantagem",
                  desc: "Compra primeiro, marca o preço primeiro e gira estoque mais rápido.",
                  align: "md:items-end md:text-right md:pt-44",
                },
              ].map(({ Icon, n, title, desc, align }, i) => (
                <Reveal key={i} delay={i * 0.12}>
                  <li className={`relative flex flex-col items-center text-center ${align}`}>
                    <div className="relative">
                      <div className="absolute inset-0 -m-3 rounded-full bg-gold/20 blur-md" />
                      <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-white/[0.04] shadow-md ring-1 ring-white/10 backdrop-blur">
                        <Icon className="h-7 w-7 text-gold" />
                        <span className="absolute -right-1 -top-1 text-gold">✦</span>
                      </div>
                    </div>
                    <h4 className="mt-5 font-display text-xl font-semibold tracking-tight text-white md:text-[22px]">
                      {n}. {title}
                    </h4>
                    <p className="mt-2 max-w-[260px] text-[15px] leading-relaxed text-white/60">
                      {desc}
                    </p>
                  </li>
                </Reveal>
              ))}
            </ol>
          </div>

          <Reveal delay={0.2}>
            <div className="mt-16 flex justify-center">
              <CTA>Entrar no Grupo VIP</CTA>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-5 py-16 md:px-10 md:py-24">
        <div className="mx-auto max-w-[1400px]">
          <div
            className="relative overflow-hidden rounded-[24px] p-6 md:p-12"
            style={{ background: "oklch(0.18 0.005 80)" }}
          >
            {/* Line grid pattern */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0"
              style={{
                backgroundImage:
                  "linear-gradient(to right, oklch(0.95 0.02 85 / 0.05) 1px, transparent 1px), linear-gradient(to bottom, oklch(0.95 0.02 85 / 0.05) 1px, transparent 1px)",
                backgroundSize: "64px 64px",
              }}
            />

            <div className="relative grid gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)] md:gap-12">
              {/* LEFT — Title + contact cards */}
              <div>
                <Reveal>
                  <h2 className="font-display text-3xl font-black leading-[1.05] tracking-tight text-white md:text-5xl">
                    Ficou com<br />dúvidas?
                  </h2>
                  <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/60 md:text-base">
                    Aqui colocamos as perguntas mais comuns e você também pode falar com o nosso time pelos canais abaixo.
                  </p>

                  <div className="mt-8 space-y-3">
                    <a
                      href="mailto:contato@leevi.com.br"
                      className="block rounded-2xl border border-white/10 bg-white/[0.02] px-5 py-4 transition-colors hover:border-gold/40 hover:bg-white/[0.04]"
                    >
                      <div className="font-display text-sm font-bold uppercase tracking-wider text-gold">
                        E-mail
                      </div>
                      <div className="mt-1 text-sm text-white/80">
                        contato@leevi.com.br
                      </div>
                    </a>
                    <a
                      href={WHATSAPP}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block rounded-2xl border border-white/10 bg-white/[0.02] px-5 py-4 transition-colors hover:border-gold/40 hover:bg-white/[0.04]"
                    >
                      <div className="font-display text-sm font-bold uppercase tracking-wider text-gold">
                        WhatsApp
                      </div>
                      <div className="mt-1 text-sm text-white/80">
                        Conversar agora
                      </div>
                    </a>
                  </div>
                </Reveal>
              </div>

              {/* RIGHT — FAQ items */}
              <div className="space-y-3">
                {[
                  {
                    q: "Preciso pagar para entrar?",
                    a: "Não. A entrada no Grupo VIP de Revendedoras Leevi é 100% gratuita. Você só investe nos produtos quando quiser comprar.",
                  },
                  {
                    q: "Vão me mandar muita mensagem?",
                    a: "Não. O grupo é silencioso. Apenas a equipe Leevi posta — lançamentos, lives e ofertas. Sem spam, sem grupo bagunçado.",
                  },
                  {
                    q: "Preciso ter CNPJ?",
                    a: "Não é obrigatório. Atendemos revendedoras com e sem CNPJ. Algumas condições especiais são para CNPJ.",
                  },
                  {
                    q: "Como funcionam as lives?",
                    a: "Acontecem dentro do WhatsApp em horários divulgados no grupo. Você assiste, escolhe e fecha ali mesmo.",
                  },
                  {
                    q: "Posso sair quando quiser?",
                    a: "Claro. É só sair do grupo. Mas a maioria fica — porque é onde a oportunidade aparece primeiro.",
                  },
                ].map((item, i) => (
                  <FaqItem key={i} q={item.q} a={item.a} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="relative overflow-hidden py-28 md:py-40" style={{ background: "oklch(0.14 0.01 85)" }}>
        {/* Grid */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "linear-gradient(to right, oklch(0.95 0.02 85) 1px, transparent 1px), linear-gradient(to bottom, oklch(0.95 0.02 85) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />
        {/* Gold halos */}
        <div className="pointer-events-none absolute -top-40 left-1/2 h-[700px] w-[700px] -translate-x-1/2 rounded-full bg-gold/20 blur-[160px]" />
        <div className="pointer-events-none absolute -bottom-40 left-1/4 h-[400px] w-[400px] rounded-full bg-gold-deep/25 blur-[140px]" />

        {/* Edge marquee strip */}
        <div className="pointer-events-none absolute inset-x-0 top-0 flex overflow-hidden border-y border-gold/20 bg-gold/5 py-2">
          <div
            className="flex shrink-0 items-center whitespace-nowrap font-display text-[11px] font-bold uppercase tracking-[0.4em] text-gold/70"
            style={{ animation: "leevi-marquee 45s linear infinite" }}
          >
            {Array.from({ length: 8 }).map((_, i) => (
              <span key={i} className="inline-flex items-center">
                <span className="px-6">Vagas chegando ao fim</span>
                <span className="opacity-50">✦</span>
                <span className="px-6">Lançamentos antes de todo mundo</span>
                <span className="opacity-50">✦</span>
              </span>
            ))}
          </div>
        </div>

        <div className="relative mx-auto max-w-4xl px-5 text-center md:px-10">
          <Reveal>
            <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-destructive/40 bg-destructive/10 px-4 py-1.5 backdrop-blur-sm">
              <Flame className="h-3 w-3 text-destructive" />
              <span className="font-display text-[11px] uppercase tracking-[0.25em] text-destructive">
                Vagas chegando ao fim
              </span>
            </div>
            <h2 className="font-display text-4xl font-black leading-[1.02] tracking-tight text-white md:text-7xl">
              Sua próxima venda<br />começa{" "}
              <span className="relative inline-block">
                <span className="bg-gradient-to-r from-gold via-gold-soft to-gold-deep bg-clip-text italic text-transparent">
                  dentro do grupo.
                </span>
                <span className="absolute -bottom-2 left-0 h-px w-full bg-gradient-to-r from-transparent via-gold to-transparent" />
              </span>
            </h2>
            <p className="mx-auto mt-8 max-w-xl text-base leading-relaxed text-white/60 md:text-lg">
              Toda semana fechamos a entrada quando o grupo enche. Quem perde a janela só consegue
              entrar quando alguém sai.
            </p>

            <ul className="mx-auto mt-12 grid max-w-2xl gap-3 text-left text-sm md:grid-cols-2 md:text-base">
              {[
                "Lançamentos antes de todo mundo",
                "Lives semanais de alto giro",
                "Ofertas que não saem do grupo",
                "Sorteios e bônus exclusivos",
              ].map((t, i) => (
                <li
                  key={i}
                  className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3"
                >
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-gold" />
                  <span className="text-white/85">{t}</span>
                </li>
              ))}
            </ul>

            <div className="mt-12 flex justify-center">
              <CTA>Entrar no Grupo VIP agora</CTA>
            </div>
            <p className="mt-5 text-xs uppercase tracking-[0.2em] text-white/40">
              Entrada gratuita • Sem spam • Saia quando quiser
            </p>
          </Reveal>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative border-t border-gold/15 bg-foreground py-14">
        <div className="mx-auto flex max-w-[1400px] flex-col items-start justify-between gap-6 px-5 md:flex-row md:items-center md:px-10">
          <div className="text-background">
            <Logo />
          </div>
          <div className="text-xs text-white/50">
            <p className="space-x-1">
              <span className="cursor-pointer transition-colors hover:text-gold">Termos de Uso</span>
              <span>•</span>
              <span className="cursor-pointer transition-colors hover:text-gold">Política de Privacidade</span>
              <span>•</span>
              <span className="cursor-pointer transition-colors hover:text-gold">Política de Cookies</span>
            </p>
            <p className="mt-2">© 2026 Leevi Distribuidora — Todos os direitos reservados</p>
          </div>
        </div>
      </footer>

      {/* STICKY MOBILE CTA */}
      <a
        href={WHATSAPP}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-4 left-4 right-4 z-40 inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-gold via-gold to-gold-deep px-6 py-4 font-display text-sm font-bold uppercase tracking-wider text-foreground shadow-[0_20px_60px_-15px_oklch(0.80_0.13_85_/_0.6)] md:hidden"
      >
        Entrar no Grupo VIP <ArrowRight className="h-4 w-4" />
      </a>
    </main>
  );
}

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] transition-colors hover:border-gold/30">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left md:px-7 md:py-6"
      >
        <span className="font-display text-base font-semibold tracking-tight text-white md:text-lg">
          {q}
        </span>
        <span className="flex h-7 w-7 shrink-0 items-center justify-center text-gold">
          {open ? <Minus className="h-5 w-5" /> : <Plus className="h-5 w-5" />}
        </span>
      </button>
      <motion.div
        initial={false}
        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <p className="px-6 pb-5 text-sm leading-relaxed text-white/70 md:px-7 md:pb-6 md:text-base">
          {a}
        </p>
      </motion.div>
    </div>
  );
}
