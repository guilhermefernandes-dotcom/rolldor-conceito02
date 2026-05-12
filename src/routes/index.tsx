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
  Star,
  Plus,
  Minus,
} from "lucide-react";
import { useState } from "react";
import heroImg from "@/assets/hero.jpg";
import productsImg from "@/assets/products.jpg";
import p1 from "@/assets/p1.jpg";
import p2 from "@/assets/p2.jpg";
import p3 from "@/assets/p3.jpg";
import p4 from "@/assets/p4.jpg";
import t1 from "@/assets/t1.jpg";
import t2 from "@/assets/t2.jpg";
import leeviMark from "@/assets/leevi-mark.png";
import t3 from "@/assets/t3.jpg";
import logoUrl from "@/assets/logo.webp";
import badgeVagas from "@/assets/badge-vagas.webp";
import { StatsScrollLock } from "@/components/StatsScrollLock";

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
              <Logo className="mb-4" />
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
              <p className="mt-7 max-w-2xl text-base leading-relaxed tracking-[-0.01em] text-muted-foreground md:text-lg">
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
      <section className="border-y border-border bg-secondary/70 pt-24 md:pt-32">
        <div className="mx-auto max-w-7xl px-5 md:px-10">
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
              <p className="mx-auto mt-6 max-w-2xl text-muted-foreground md:text-lg">
                Quem conhece a Leevi sabe da curadoria. Quem está no GRUPO VIP, sai na frente.
              </p>
            </Reveal>
          </div>
        </div>

        <StatsScrollLock />
      </section>

      {/* VANTAGENS */}
      <section className="py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-5 md:px-10">
          <div className="mx-auto max-w-3xl text-center">
            <Reveal>
              <SectionLabel>Vantagens exclusivas</SectionLabel>
              <h2 className="font-display text-3xl font-black leading-tight tracking-tight md:text-5xl">
                O que você ganha por estar{" "}
                <span className="italic text-gold">dentro do grupo</span>.
              </h2>
            </Reveal>
          </div>

          <div className="mt-16 grid gap-px bg-border md:grid-cols-2">
            {[
              {
                icon: Zap,
                title: "Lançamentos antes de todo mundo",
                desc: "Você vê as novidades 24h antes do Instagram, do site ou de qualquer canal público.",
              },
              {
                icon: Tag,
                title: "Preços que só existem no grupo",
                desc: "Condições reservadas para quem participa das lives. Não saem daqui pra fora.",
              },
              {
                icon: Gift,
                title: "Sorteios e bônus toda semana",
                desc: "Brindes, kits e ações relâmpago para quem aparece nas lives ao vivo.",
              },
              {
                icon: TrendingUp,
                title: "Curadoria de alto giro",
                desc: "Você para de apostar no escuro. Só compra o que realmente tem saída.",
              },
            ].map(({ icon: Icon, title, desc }, i) => (
              <Reveal key={i} delay={i * 0.05}>
                <div className="group h-full bg-background p-8 transition-colors hover:bg-secondary md:p-10">
                  <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl border border-gold/40 bg-gold/5 text-gold transition-colors group-hover:bg-gold group-hover:text-foreground">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-display text-xl font-bold tracking-tight md:text-2xl">{title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground md:text-base">{desc}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="mt-12 text-center">
            <CTA>Quero todas essas vantagens</CTA>
          </div>
        </div>
      </section>

      {/* COMO FUNCIONA */}
      <section
        className="relative border-y border-border py-24 md:py-32"
        style={{ background: "var(--gradient-dark)" }}
      >
        <div className="mx-auto max-w-7xl px-5 md:px-10">
          <div className="text-center">
            <Reveal>
              <SectionLabel>Como funciona</SectionLabel>
              <h2 className="mx-auto max-w-2xl font-display text-3xl font-black leading-tight tracking-tight md:text-5xl">
                Em 4 passos você já está dentro.
              </h2>
            </Reveal>
          </div>
          <ol className="mt-16 grid gap-8 md:grid-cols-4 md:gap-6">
            {[
              ["Clique no botão", "Entra direto pelo WhatsApp, sem cadastro."],
              ["Receba os avisos", "Avisamos toda live com antecedência."],
              ["Participe ao vivo", "Vê os lançamentos e tira dúvidas em tempo real."],
              ["Aproveite as ofertas", "Condições exclusivas pra você lucrar mais."],
            ].map(([title, desc], i) => (
              <Reveal key={i} delay={i * 0.08}>
                <li className="relative">
                  <div className="font-display text-7xl font-black leading-none text-gold/15 md:text-8xl">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <div className="mt-4 border-t border-gold/30 pt-4">
                    <h3 className="font-display text-lg font-bold tracking-tight">{title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{desc}</p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ol>
          <div className="mt-14 text-center">
            <CTA>Entrar no Grupo VIP agora</CTA>
          </div>
        </div>
      </section>

      {/* VITRINE */}
      <section className="py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-5 md:px-10">
          <div className="grid gap-10 md:grid-cols-12 md:items-end">
            <div className="md:col-span-7">
              <Reveal>
                <SectionLabel>Vitrine de alto giro</SectionLabel>
                <h2 className="font-display text-3xl font-black leading-tight tracking-tight md:text-5xl">
                  As peças que costumam{" "}
                  <span className="italic text-gold">esgotar primeiro</span> dentro do grupo.
                </h2>
              </Reveal>
            </div>
            <div className="md:col-span-5">
              <Reveal delay={0.1}>
                <p className="text-muted-foreground md:text-lg">
                  Selecionamos toda semana o que está vendendo de verdade na boca da revendedora.
                  Aqui está uma amostra do que circula nas lives.
                </p>
              </Reveal>
            </div>
          </div>

          <div className="mt-12 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-5">
            {[
              { src: p1, name: "Sandália Dourada Strappy", tag: "Mais vendida" },
              { src: p2, name: "Tênis Casual Premium", tag: "Lançamento" },
              { src: p3, name: "Bolsa Executiva Black", tag: "Alto giro" },
              { src: p4, name: "Salto Bloco Nude", tag: "Sai rápido" },
            ].map((p, i) => (
              <Reveal key={i} delay={i * 0.05}>
                <div className="group relative overflow-hidden rounded-2xl border border-border bg-card transition-all hover:border-gold/50">
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={p.src}
                      alt={p.name}
                      loading="lazy"
                      width={800}
                      height={800}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="absolute top-3 left-3 rounded-full bg-gold px-3 py-1 font-display text-[10px] font-bold uppercase tracking-wider text-foreground">
                    {p.tag}
                  </div>
                  <div className="border-t border-border p-4">
                    <div className="font-display text-sm font-bold tracking-tight">{p.name}</div>
                    <div className="mt-1 text-xs text-muted-foreground">Disponível na próxima live</div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.2}>
            <div className="mt-8 overflow-hidden rounded-2xl border border-gold/20">
              <img
                src={productsImg}
                alt="Coleção Leevi de calçados e acessórios"
                width={1920}
                height={1080}
                loading="lazy"
                className="h-64 w-full object-cover md:h-96"
              />
            </div>
          </Reveal>

          <div className="mt-10 text-center">
            <CTA>Ver tudo dentro do grupo</CTA>
          </div>
        </div>
      </section>

      {/* PROVA SOCIAL */}
      <section className="border-y border-border bg-secondary/70 py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-5 md:px-10">
          <div className="text-center">
            <Reveal>
              <SectionLabel>Quem já está dentro</SectionLabel>
              <h2 className="mx-auto max-w-2xl font-display text-3xl font-black leading-tight tracking-tight md:text-5xl">
                Revendedoras que viraram a chave depois do grupo.
              </h2>
            </Reveal>
          </div>

          <div className="mt-16 grid gap-6 md:grid-cols-3">
            {[
              {
                img: t1,
                name: "Mariana C.",
                city: "Fortaleza — CE",
                quote:
                  "Triplicou meu faturamento em 3 meses. Antes eu comprava no escuro, hoje compro o que eu sei que vai vender.",
              },
              {
                img: t2,
                name: "Juliana S.",
                city: "São Luís — MA",
                quote:
                  "As condições que pego no grupo eu não acho em lugar nenhum. Já saí de muita live com peça esgotada na concorrência.",
              },
              {
                img: t3,
                name: "Patrícia L.",
                city: "Recife — PE",
                quote:
                  "A live é direta, sem enrolação. Eu vejo o produto, escolho ali e ainda ganho sorteio. Vale demais.",
              },
            ].map((t, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <figure className="flex h-full flex-col rounded-2xl border border-border bg-background p-7">
                  <div className="flex items-center gap-1 text-gold">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <Star key={j} className="h-4 w-4 fill-gold" />
                    ))}
                  </div>
                  <blockquote className="mt-5 flex-1 text-base leading-relaxed text-foreground/90">
                    "{t.quote}"
                  </blockquote>
                  <figcaption className="mt-6 flex items-center gap-3 border-t border-border pt-5">
                    <img src={t.img} alt={t.name} loading="lazy" className="h-11 w-11 rounded-full object-cover" />
                    <div>
                      <div className="font-display text-sm font-bold">{t.name}</div>
                      <div className="text-xs text-muted-foreground">{t.city}</div>
                    </div>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.2}>
            <div className="mt-10 flex items-center justify-center gap-3 rounded-2xl border border-gold/30 bg-gold/5 px-5 py-4 text-sm">
              <Flame className="h-4 w-4 text-gold" />
              <span className="text-foreground/90">
                <span className="font-bold text-gold">Atenção:</span> algumas peças esgotam ainda durante a live.
              </span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* LOSS AVERSION */}
      <section className="py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-5 md:px-10">
          <div className="grid gap-12 md:grid-cols-12 md:gap-16">
            <div className="md:col-span-5">
              <Reveal>
                <SectionLabel>Por que entrar agora</SectionLabel>
                <h2 className="font-display text-3xl font-black leading-tight tracking-tight md:text-5xl">
                  O que você perde ficando{" "}
                  <span className="italic text-gold">de fora</span>.
                </h2>
                <p className="mt-6 text-muted-foreground md:text-lg">
                  Cada semana fora do grupo é uma semana comprando depois da concorrência.
                </p>
              </Reveal>
            </div>
            <div className="md:col-span-7">
              <ul className="grid gap-px bg-border md:grid-cols-2">
                {[
                  [Flame, "Compra antes do site, do Instagram e de qualquer canal."],
                  [Tag, "Condições exclusivas que não saem do grupo."],
                  [PackageCheck, "Curadoria semanal do que tem alto giro."],
                  [Lock, "Grupo fechado e silencioso. Apenas a equipe Leevi posta."],
                ].map(([Icon, t], i) => (
                  <Reveal key={i} delay={i * 0.05}>
                    <li className="flex h-full items-start gap-4 bg-background p-6">
                      <Icon className="mt-1 h-5 w-5 shrink-0 text-gold" />
                      <span className="text-sm md:text-base">{t as string}</span>
                    </li>
                  </Reveal>
                ))}
              </ul>
              <div className="mt-8">
                <CTA>Entrar no Grupo VIP</CTA>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-border bg-secondary/70 py-24 md:py-32">
        <div className="mx-auto max-w-3xl px-5 md:px-10">
          <div className="text-center">
            <Reveal>
              <SectionLabel>Perguntas frequentes</SectionLabel>
              <h2 className="font-display text-3xl font-black leading-tight tracking-tight md:text-5xl">
                Tire suas dúvidas.
              </h2>
            </Reveal>
          </div>
          <div className="mt-12 divide-y divide-border border-y border-border">
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
          <div className="mt-12 text-center">
            <CTA>Entrar no Grupo VIP</CTA>
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="relative overflow-hidden py-28 md:py-40">
        <div
          className="absolute inset-0 -z-10"
          style={{ background: "var(--gradient-dark)" }}
        />
        <div className="absolute -top-40 left-1/2 -z-10 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-gold/15 blur-[140px]" />
        <div className="mx-auto max-w-4xl px-5 text-center md:px-10">
          <Reveal>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-destructive/40 bg-destructive/10 px-4 py-1.5">
              <Flame className="h-3 w-3 text-destructive" />
              <span className="font-display text-[11px] uppercase tracking-[0.25em] text-destructive">
                Vagas chegando ao fim
              </span>
            </div>
            <h2 className="font-display text-4xl font-black leading-[1.05] tracking-tight md:text-7xl">
              Sua próxima venda começa{" "}
              <span className="bg-gradient-to-r from-gold via-gold-soft to-gold-deep bg-clip-text text-transparent">
                dentro do grupo.
              </span>
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-muted-foreground md:text-lg">
              Toda semana fechamos a entrada quando o grupo enche. Quem perde a janela só consegue
              entrar quando alguém sai.
            </p>
            <ul className="mx-auto mt-10 grid max-w-xl gap-3 text-left text-sm md:text-base">
              {[
                "Lançamentos antes de todo mundo",
                "Lives semanais com curadoria de alto giro",
                "Ofertas que não saem do grupo",
                "Sorteios e bônus para quem participa",
              ].map((t, i) => (
                <li key={i} className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-gold" />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
            <div className="mt-10 flex justify-center">
              <CTA>Entrar no Grupo VIP agora</CTA>
            </div>
            <p className="mt-5 text-xs text-muted-foreground">
              Entrada gratuita • Sem spam • Saia quando quiser
            </p>
          </Reveal>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-border bg-background py-12">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-5 md:flex-row md:items-center md:px-10">
          <Logo />
          <div className="text-xs text-muted-foreground">
            <p>Termos de Uso • Política de Privacidade • Política de Cookies</p>
            <p className="mt-1">© 2026 Leevi Distribuidora — Todos os direitos reservados</p>
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
    <div>
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between gap-4 py-5 text-left transition-colors hover:text-gold"
      >
        <span className="font-display text-base font-bold tracking-tight md:text-lg">{q}</span>
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-gold/40 text-gold">
          {open ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
        </span>
      </button>
      <motion.div
        initial={false}
        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <p className="pb-5 text-sm leading-relaxed text-muted-foreground md:text-base">{a}</p>
      </motion.div>
    </div>
  );
}
