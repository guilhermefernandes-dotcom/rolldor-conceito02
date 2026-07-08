import { createFileRoute } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "motion/react";
import {
  ArrowRight,
  Building2,
  Wrench,
  Sparkles,
  Award,
  Headphones,
  MegaphoneIcon,
  Target,
  Handshake,
  Layers,
  Check,
  Plus,
  Minus,
  Quote,
  Compass,
  PenLine,
  ShieldCheck,
} from "lucide-react";
import polygonShape from "@/assets/polygon-13.svg";
import { useState } from "react";
import heroImg from "@/assets/rd-hero.jpg";
import galeria1 from "@/assets/rd-galeria-1.jpg";
import galeria2 from "@/assets/rd-galeria-2.jpg";
import galeria3 from "@/assets/rd-galeria-3.jpg";
import rdMark from "@/assets/rd-mark.png";
import portaDeslizante from "@/assets/rd-porta-deslizante.jpg";
import janelaImg from "@/assets/rd-janela.jpg";
import grandesVaos from "@/assets/rd-grandes-vaos.jpg";
import personalizado from "@/assets/rd-personalizado.jpg";
import logoAsset from "@/assets/roll-door-logo.png.asset.json";
import rLogoAsset from "@/assets/roll-door-R.png.asset.json";
import { StatsScrollLock } from "@/components/StatsScrollLock";
import { VitrineOrbit } from "@/components/VitrineOrbit";
import { JoinNotifications } from "@/components/JoinNotifications";
import { FormularioRevenda } from "@/components/FormularioRevenda";

export const Route = createFileRoute("/")({
  head: () => {
    const title =
      "Rede Premium Roll Door — Torne-se um Revendedor de Esquadrias de Alto Padrão";
    const description =
      "Seja um Revendedor Premium Roll Door e venda uma das marcas mais desejadas do mercado de esquadrias. Suporte técnico, oportunidades de negócio e produtos de alto padrão pra impulsionar suas vendas.";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        {
          name: "keywords",
          content:
            "revenda esquadrias, roll door, portas deslizantes, janelas premium, revendedor premium, alumínio de alto padrão, esquadrias de alto padrão, rede de revendas",
        },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: description },
      ],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                q: "Preciso já trabalhar com esquadrias?",
                a: "Sim. O programa é destinado para empresas do segmento, como vidraçarias, serralherias e fabricantes de esquadrias.",
              },
              {
                q: "Existe exclusividade?",
                a: "As condições são avaliadas conforme a região e o perfil do parceiro.",
              },
              {
                q: "Recebo suporte?",
                a: "Sim. Os parceiros contam com suporte técnico e comercial durante toda a parceria.",
              },
              {
                q: "Como funciona o processo de aprovação?",
                a: "Após o cadastro, nossa equipe entra em contato para avaliar o perfil da empresa e apresentar as condições do programa.",
              },
            ].map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          }),
        },
      ],
    };
  },
  component: Landing,
});

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  },
};

function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
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

function Wordmark({ className = "" }: { className?: string }) {
  return (
    <img
      src={logoAsset.url}
      alt="Roll Door Company"
      className={`h-auto w-auto max-h-14 md:max-h-20 ${className}`}
      style={{ maxWidth: "260px" }}
    />
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
        className="absolute -bottom-1 left-0 right-0 h-[3px] origin-left rounded-full bg-foreground md:h-[4px]"
      />
    </span>
  );
}

const LOGOS_REVENDAS = [
  "Vidraçaria Alpha",
  "Esquadrias Prime",
  "Serralheria Vitral",
  "Vidros & Cia",
  "Alumínio Nobre",
  "Vidraçaria Cristal",
  "Esquadrias do Vale",
  "Vidraçaria Real",
  "Serralheria Aço Sul",
  "Vidraçaria Atlântico",
  "Esquadrias Modena",
  "Vidraçaria Central",
];

function CtaPrimary({
  children,
  href = "#cta-final",
  className = "",
}: {
  children: React.ReactNode;
  href?: string;
  className?: string;
}) {
  return (
    <a
      href={href}
      className={`group relative flex h-16 w-full items-center justify-center rounded-2xl px-8 font-display text-lg font-bold text-accent-foreground transition-transform hover:-translate-y-0.5 sm:h-[72px] sm:px-12 sm:text-xl ${className}`}
      style={{
        background:
          "linear-gradient(180deg, var(--accent-light) 0%, var(--accent) 50%, var(--accent-dark) 100%)",
        boxShadow:
          "inset 0 2px 0 hsl(0 0% 100% / 0.15), inset 0 -3px 0 var(--accent-shadow), 0 18px 40px -12px color-mix(in oklab, var(--accent) 70%, transparent)",
      }}
    >
      {children}
    </a>
  );
}

function Landing() {
  const { scrollY } = useScroll();
  const heroPad = useTransform(scrollY, [0, 120], [13, 0]);
  const heroRadius = useTransform(scrollY, [0, 120], [28, 0]);

  return (
    <main className="min-h-screen bg-background text-foreground antialiased">
      <JoinNotifications />

      {/* HERO */}
      <motion.div className="bg-foreground" style={{ padding: heroPad }}>
        <motion.section
          className="relative w-full overflow-hidden bg-secondary px-6 py-16 md:px-10 md:py-24"
          style={{ borderRadius: heroRadius }}
        >
          {/* Background image */}
          <div aria-hidden className="pointer-events-none absolute inset-0">
            <img
              src={heroImg}
              alt=""
              className="h-full w-full object-cover"
              fetchPriority="high"
              decoding="async"
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(180deg, rgba(0,0,0,0.60) 0%, rgba(0,0,0,0.75) 50%, rgba(0,0,0,0.88) 100%)",
              }}
            />
          </div>

          <div className="relative mx-auto flex max-w-6xl flex-col items-center text-center">
            <Reveal>
              <Wordmark className="mb-8" />
            </Reveal>
            <Reveal delay={0.15}>
              <h1
                className="font-display mx-auto text-white"
                style={{
                  fontWeight: 600,
                  fontSize: "clamp(24px, 5.2vw, 56px)",
                  lineHeight: "1.05",
                  letterSpacing: "-0.03em",
                  maxWidth: "26ch",
                }}
              >
                Torne-se um Revendedor Premium{" "}
                <span className="text-white/70">Roll Door</span> e venda uma das marcas mais
                desejadas do mercado de esquadrias.
              </h1>
            </Reveal>
            <Reveal delay={0.25}>
              <p className="mt-6 max-w-2xl text-base leading-relaxed tracking-[-0.01em] text-white/70 md:mt-8 md:text-[21px]">
                Trabalhe com uma marca reconhecida nacionalmente, tenha suporte comercial, receba
                oportunidades de negócio e ofereça produtos de alto padrão que agregam valor ao seu
                portfólio.
              </p>
            </Reveal>
            <Reveal delay={0.35}>
              <ul className="mt-8 grid gap-3 text-left sm:grid-cols-2 md:mt-10">
                {[
                  "Marca consolidada no mercado",
                  "Suporte técnico especializado",
                  "Produtos de alto padrão",
                  "Programa exclusivo para parceiros",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-[15px] text-white/85 md:text-[17px]">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white text-foreground">
                      <Check className="h-3.5 w-3.5" strokeWidth={3} />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={0.5} className="w-full max-w-[640px]">
              <div className="relative mt-10 w-full">
                <CtaPrimary>Quero ser um Revendedor Premium</CtaPrimary>
              </div>
            </Reveal>
          </div>
        </motion.section>
      </motion.div>

      {/* MARQUEE — prova social topo */}
      <div className="overflow-hidden bg-foreground py-4">
        <div
          className="flex animate-[leevi-marquee_30s_linear_infinite] whitespace-nowrap font-display"
          style={{
            fontWeight: 500,
            fontSize: "clamp(15px, 4.5vw, 22px)",
            lineHeight: "1.3",
            color: "rgba(255,255,255,0.95)",
            letterSpacing: "-0.01em",
          }}
        >
          {Array.from({ length: 6 }).flatMap((_, i) =>
            [
              "+700 revendas na Rede Roll Door",
              "Quase 4 décadas de mercado",
              "Suporte técnico dedicado",
              "Esquadrias de alto padrão",
            ].map((item, j) => (
              <span key={`${i}-${j}`} className="inline-flex items-center">
                <span className="px-8">{item}</span>
                <span className="opacity-60">•</span>
              </span>
            )),
          )}
        </div>
      </div>

      {/* PROVA SOCIAL — logos + autoridade */}
      <section className="border-t border-border bg-secondary/60 py-24 md:py-32">
        <div className="mx-auto max-w-[1400px] px-5 md:px-10">
          <div className="mx-auto max-w-4xl text-center">
            <Reveal>
              <h2 className="font-display text-4xl font-black leading-[1.05] tracking-tight md:text-6xl">
                Mais de <UnderlineWord delay={0}>700 revendas</UnderlineWord> fazem parte da{" "}
                <UnderlineWord delay={0.18}>rede Roll Door</UnderlineWord>.
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mx-auto mt-6 max-w-2xl text-base text-muted-foreground md:text-[21px]">
                Há quase quatro décadas desenvolvendo soluções para grandes vãos, a Roll Door é
                referência em portas e janelas de alto padrão em todo o Brasil. Nossa marca já está
                presente em milhares de projetos residenciais e comerciais.
              </p>
            </Reveal>
          </div>

          {/* Carrossel de logos (nomes fictícios estilizados) */}
          <Reveal delay={0.3}>
            <div className="mt-14 overflow-hidden">
              <div className="flex animate-[leevi-marquee_45s_linear_infinite] whitespace-nowrap">
                {[...LOGOS_REVENDAS, ...LOGOS_REVENDAS].map((nome, i) => (
                  <div
                    key={i}
                    className="mx-6 inline-flex h-16 items-center justify-center rounded-lg border border-foreground/10 bg-white px-8 font-display text-base font-bold tracking-wide text-foreground/70 shadow-sm md:mx-8 md:text-lg"
                  >
                    {nome}
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>

        <StatsScrollLock />
      </section>

      {/* POR QUE SER REVENDEDOR — cards em fundo escuro */}
      <section className="bg-secondary/60 pt-4 pb-28">
        <div className="w-full" style={{ padding: "20px" }}>
          <div
            className="relative w-full rounded-[32px] px-6 py-14 md:px-12 md:py-20"
            style={{ background: "oklch(0.14 0.005 250)" }}
          >
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 rounded-[32px] opacity-[0.06]"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(115deg, rgba(255,255,255,0.9) 0 1px, transparent 1px 14px)",
              }}
            />

            {/* triângulo decorativo fora do card — efeito caixa de mensagem */}
            <div
              aria-hidden
              className="pointer-events-none absolute top-[60%] -left-6 z-10 h-0 w-0 md:top-[55%] md:-left-8"
              style={{
                borderTop: "28px solid transparent",
                borderBottom: "28px solid transparent",
                borderRight: "28px solid oklch(0.14 0.005 250)",
              }}
            />

            <div className="relative z-10">
              <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
                <div className="max-w-2xl">
                  <Reveal>
                    <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 py-2 pl-2 pr-5 backdrop-blur">
                      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/95">
                        <img
                          src={rdMark}
                          alt="Roll Door"
                          className="h-5 w-5 object-contain"
                          loading="lazy"
                          decoding="async"
                        />
                      </span>
                      <span className="font-display text-sm font-medium tracking-wide text-white/90">
                        por que ser um revendedor
                      </span>
                    </div>
                    <h2
                      className="text-white"
                      style={{
                        fontFamily: '"DM Sans", ui-sans-serif, system-ui, sans-serif',
                        fontWeight: 600,
                        fontSize: "clamp(28px, 6.5vw, 48px)",
                        lineHeight: "1.05",
                      }}
                    >
                      Muito mais do que um fornecedor.
                      <br />
                      <span className="text-white/60">
                        Um parceiro para crescer junto com você.
                      </span>
                    </h2>
                    <p className="mt-6 max-w-xl text-white/70 md:text-lg">
                      Ao fazer parte da Rede Premium Roll Door, sua empresa conta com uma estrutura
                      pensada para impulsionar suas vendas.
                    </p>
                  </Reveal>
                </div>
                <Reveal delay={0.1}>
                  <a
                    href="#cta-final"
                    className="group inline-flex items-center gap-3 rounded-2xl border border-white/20 bg-white/10 px-7 py-4 font-display text-base font-bold text-white transition-colors hover:bg-white/15"
                  >
                    Quero fazer parte
                    <ArrowRight className="h-5 w-5" />
                  </a>
                </Reveal>
              </div>

              <div className="mt-12 grid gap-[13px] md:mt-16 md:grid-cols-2 lg:grid-cols-4">
                {[
                  {
                    icon: Layers,
                    title: "Produtos exclusivos",
                    desc: "Portfólio pensado para o mercado de alto padrão.",
                    bullets: [
                      "Linha completa premium",
                      "Design exclusivo Roll Door",
                      "Foco em alto padrão",
                    ],
                  },
                  {
                    icon: Award,
                    title: "Marca reconhecida nacionalmente",
                    desc: "Décadas de reputação a favor da sua venda.",
                    bullets: [
                      "Presença em todo o Brasil",
                      "Autoridade no segmento",
                      "Credibilidade que vende",
                    ],
                  },
                  {
                    icon: Headphones,
                    title: "Suporte técnico especializado",
                    desc: "Atendimento próximo em cada etapa do projeto.",
                    highlight: true,
                    bullets: [
                      "Consultoria em projeto",
                      "Suporte pós-venda",
                      "Equipe técnica dedicada",
                    ],
                  },
                  {
                    icon: MegaphoneIcon,
                    title: "Materiais de marketing",
                    desc: "Recursos prontos para você vender mais e melhor.",
                    bullets: [
                      "Catálogos e mídias prontas",
                      "Campanhas sazonais",
                      "Kit de identidade visual",
                    ],
                  },
                  {
                    icon: Handshake,
                    title: "Atendimento dedicado",
                    desc: "Um canal direto com a equipe Roll Door.",
                    bullets: [
                      "Canal direto de contato",
                      "Resposta prioritária",
                      "Gestor de conta parceiro",
                    ],
                  },
                  {
                    icon: Sparkles,
                    title: "Capacitação comercial",
                    desc: "Treinamentos e materiais para sua equipe.",
                    bullets: [
                      "Treinamentos periódicos",
                      "Materiais de produto",
                      "Argumentos de venda",
                    ],
                  },
                  {
                    icon: Target,
                    title: "Indicação de oportunidades*",
                    desc: "Leads e projetos direcionados por região.",
                    bullets: [
                      "Leads por região",
                      "Projetos qualificados",
                      "Encaminhamento ativo",
                    ],
                  },
                  {
                    icon: Building2,
                    title: "Condições diferenciadas",
                    desc: "Comerciais especiais para parceiros da rede.",
                    bullets: [
                      "Política de preço parceira",
                      "Prazos diferenciados",
                      "Benefícios exclusivos",
                    ],
                  },
                ].map(({ icon: Icon, title, bullets, highlight }, i) => (
                  <Reveal key={i} delay={i * 0.04} className="h-full">
                    <article
                      className="group relative flex h-full flex-col rounded-[20px] p-6"
                      style={
                        highlight
                          ? {
                              background:
                                "linear-gradient(180deg, rgba(201,168,76,0.22) 0%, rgba(201,168,76,0.06) 100%)",
                              border: "1px solid rgba(201,168,76,0.45)",
                            }
                          : {
                              background: "rgba(255,255,255,0.04)",
                              border: "1px solid rgba(255,255,255,0.08)",
                            }
                      }
                    >
                      <Icon
                        className={`h-7 w-7 ${highlight ? "text-[#e8c07a]" : "text-[#c9a84c]"}`}
                        strokeWidth={1.4}
                      />
                      <h3 className="mt-6 font-display text-[19px] font-semibold leading-tight text-white md:text-[21px]">
                        {title}
                      </h3>

                      <div className="my-5 h-px w-full bg-white/10" />

                      <ul className="flex flex-col gap-2.5">
                        {bullets.map((b) => (
                          <li
                            key={b}
                            className="flex items-start gap-2 text-[13.5px] leading-snug text-white/75 md:text-sm"
                          >
                            <Check
                              className={`mt-0.5 h-4 w-4 shrink-0 ${
                                highlight ? "text-[#e8c07a]" : "text-[#c9a84c]"
                              }`}
                              strokeWidth={2.5}
                            />
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>

                      <a
                        href="#cta-final"
                        className={`mt-6 inline-flex items-center justify-between rounded-xl px-4 py-3 font-display text-sm font-medium transition-colors ${
                          highlight
                            ? "bg-black/40 text-white hover:bg-black/55"
                            : "bg-white/[0.04] text-white/85 hover:bg-white/[0.08] border border-white/10"
                        }`}
                      >
                        Saiba mais
                        <ArrowRight className="h-4 w-4" />
                      </a>
                    </article>
                  </Reveal>
                ))}
              </div>

              <p className="relative z-10 mt-8 text-xs text-white/40">
                *Disponível conforme critérios do programa.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* DIFERENCIAIS */}
      <section className="bg-secondary/60 py-24 md:py-32">
        <div className="mx-auto max-w-[1400px] px-5 md:px-10">
          <div className="mx-auto max-w-3xl text-center">
            <Reveal>
              <h2 className="font-display text-4xl font-black leading-[1.05] tracking-tight md:text-6xl">
                Por que o mercado escolhe a{" "}
                <UnderlineWord delay={0}>Roll Door</UnderlineWord>?
              </h2>
            </Reveal>
          </div>

          {(() => {
            const items = [
              {
                title: "Engenharia para grandes vãos",
                desc: "Projetos desenvolvidos para entregar elegância, desempenho e segurança.",
                icon: Compass,
                corner: "tl" as const,
              },
              {
                title: "Design que agrega valor",
                desc: "Produtos que valorizam qualquer projeto arquitetônico.",
                icon: PenLine,
                corner: "tr" as const,
              },
              {
                title: "Qualidade reconhecida",
                desc: "Décadas de experiência desenvolvendo soluções premium para o mercado brasileiro.",
                icon: ShieldCheck,
                corner: "bl" as const,
              },
              {
                title: "Marca que gera confiança",
                desc: "Seu cliente já reconhece a qualidade da Roll Door antes mesmo da primeira visita.",
                icon: Award,
                corner: "br" as const,
              },
            ];

            const cornerPos = {
              tl: "-top-6 -left-6 md:-top-8 md:-left-8",
              tr: "-top-6 -right-6 md:-top-8 md:-right-8",
              bl: "-bottom-6 -left-6 md:-bottom-8 md:-left-8",
              br: "-bottom-6 -right-6 md:-bottom-8 md:-right-8",
            };

            return (
              <div className="relative mx-auto mt-16 flex max-w-[900px] items-center justify-center">
                {/* rings decorativos */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border"
                  style={{
                    width: "min(120%, 1100px)",
                    aspectRatio: "1 / 1",
                    borderColor: "color-mix(in oklab, var(--gold) 25%, transparent)",
                  }}
                />
                <div
                  aria-hidden
                  className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border"
                  style={{
                    width: "min(100%, 900px)",
                    aspectRatio: "1 / 1",
                    borderColor: "color-mix(in oklab, var(--gold) 35%, transparent)",
                  }}
                />

                <div className="relative grid w-full grid-cols-2 gap-3 md:gap-4">
                  {items.map(({ title, desc, icon: Icon, corner }, i) => (
                    <Reveal key={title} delay={i * 0.08}>
                      <div
                        className="relative flex h-full min-h-[180px] flex-col items-center justify-center rounded-2xl p-6 text-center md:min-h-[220px] md:p-8"
                        style={{
                          background:
                            "linear-gradient(135deg, color-mix(in oklab, var(--gold) 55%, white) 0%, color-mix(in oklab, var(--gold) 85%, white) 100%)",
                          boxShadow:
                            "inset 0 1px 0 rgba(255,255,255,0.4), 0 20px 40px -20px color-mix(in oklab, var(--gold) 50%, transparent)",
                        }}
                      >
                        {/* ícone flutuante no canto externo */}
                        <div
                          className={`absolute ${cornerPos[corner]} z-10 flex h-14 w-14 items-center justify-center rounded-full border bg-white shadow-md md:h-16 md:w-16`}
                          style={{
                            borderColor: "color-mix(in oklab, var(--gold) 40%, transparent)",
                          }}
                        >
                          <Icon
                            className="h-6 w-6 md:h-7 md:w-7"
                            strokeWidth={1.6}
                            style={{ color: "var(--gold)" }}
                          />
                        </div>

                        <h3
                          className="font-display text-lg font-bold leading-tight md:text-2xl"
                          style={{ color: "oklch(0.18 0.005 250)" }}
                        >
                          {title}
                        </h3>
                        <p
                          className="mt-2 text-[13px] leading-snug md:text-sm"
                          style={{ color: "oklch(0.28 0.02 60)" }}
                        >
                          {desc}
                        </p>
                      </div>
                    </Reveal>
                  ))}
                </div>

                {/* logo R no centro */}
                <div
                  className="pointer-events-none absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2"
                  aria-hidden
                >
                  <div
                    className="flex h-[120px] w-[120px] items-center justify-center rounded-full bg-white shadow-[0_20px_50px_-15px_rgba(0,0,0,0.25)] md:h-[150px] md:w-[150px]"
                    style={{
                      border: "1px solid color-mix(in oklab, var(--gold) 30%, transparent)",
                    }}
                  >
                    <img
                      src={rLogoAsset.url}
                      alt="Roll Door"
                      className="h-[70%] w-[70%] object-contain"
                      draggable={false}
                    />
                  </div>
                </div>
              </div>
            );
          })()}
        </div>
      </section>

      {/* PORTFÓLIO — VitrineOrbit */}
      <div className="bg-secondary/60 p-[25px]">
        <VitrineOrbit />
      </div>

      {/* PORTFÓLIO — lista de linhas */}
      <section className="bg-secondary/60 pb-24 md:pb-32">
        <div className="mx-auto max-w-[1400px] px-5 md:px-10">
          <div className="mx-auto max-w-3xl text-center">
            <Reveal>
              <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground md:text-[19px]">
                Ofereça soluções para residências, condomínios, empreendimentos e projetos de
                arquitetura de alto padrão.
              </p>
            </Reveal>
          </div>

          <div className="mt-14 grid gap-5 md:grid-cols-3">
            {[
              { title: "Portas deslizantes", img: portaDeslizante },
              { title: "Janelas premium", img: janelaImg },
              { title: "Grandes vãos", img: grandesVaos },
              { title: "Sistemas de alumínio", img: personalizado },
              { title: "Soluções personalizadas", img: galeria1 },
              { title: "Fachadas arquitetônicas", img: galeria2 },
            ].map((p, i) => (
              <Reveal key={p.title} delay={i * 0.05}>
                <div className="group relative aspect-[4/3] overflow-hidden rounded-2xl">
                  <img
                    src={p.img}
                    alt={p.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                    decoding="async"
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(180deg, transparent 40%, rgba(15,15,20,0.85) 100%)",
                    }}
                  />
                  <div className="absolute inset-x-0 bottom-0 p-6">
                    <h3 className="font-display text-2xl font-bold text-white">{p.title}</h3>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* GALERIA — texto sobre projetos */}
      <section className="relative overflow-hidden bg-foreground py-24 text-white md:py-32">
        <div className="mx-auto max-w-[1400px] px-5 md:px-10">
          <div className="grid gap-10 md:grid-cols-[1fr_1.4fr] md:items-center md:gap-16">
            <Reveal>
              <h2 className="font-display text-4xl font-black leading-[1.05] tracking-tight text-white md:text-6xl">
                Projetos que <span className="text-white/60">impressionam</span> seus clientes.
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-white/70 md:text-xl">
                Quando o cliente vê um projeto Roll Door, ele entende imediatamente o diferencial.
              </p>
              <p className="mt-4 text-lg leading-relaxed text-white/70 md:text-xl">
                Você vende muito mais do que esquadrias.{" "}
                <strong className="font-semibold text-white">
                  Você entrega sofisticação, tecnologia e valorização do imóvel.
                </strong>
              </p>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="grid gap-4">
                <div className="aspect-[16/10] overflow-hidden rounded-3xl">
                  <img src={galeria2} alt="Residência premium Roll Door" className="h-full w-full object-cover" loading="lazy" decoding="async" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="aspect-square overflow-hidden rounded-2xl">
                    <img src={galeria1} alt="Projeto residencial Roll Door" className="h-full w-full object-cover" loading="lazy" decoding="async" />
                  </div>
                  <div className="aspect-square overflow-hidden rounded-2xl">
                    <img src={galeria3} alt="Empreendimento de alto padrão Roll Door" className="h-full w-full object-cover" loading="lazy" decoding="async" />
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* DEPOIMENTOS */}
      <section className="bg-secondary/60 py-24 md:py-32">
        <div className="mx-auto max-w-[1400px] px-5 md:px-10">
          <div className="mx-auto max-w-3xl text-center">
            <Reveal>
              <h2 className="font-display text-4xl font-black leading-[1.05] tracking-tight md:text-6xl">
                Quem já é <UnderlineWord delay={0}>parceiro</UnderlineWord> recomenda.
              </h2>
            </Reveal>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {[
              {
                quote:
                  "Desde que começamos a trabalhar com a Roll Door conseguimos agregar muito mais valor aos nossos projetos.",
                autor: "Vidraçaria parceira",
                cidade: "São Paulo, SP",
              },
              {
                quote: "Hoje nossos clientes já chegam pedindo Roll Door.",
                autor: "Esquadrias parceira",
                cidade: "Curitiba, PR",
              },
              {
                quote: "Além do produto, o suporte faz toda diferença.",
                autor: "Serralheria parceira",
                cidade: "Belo Horizonte, MG",
              },
            ].map((d, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <div className="flex h-full flex-col rounded-3xl border border-foreground/10 bg-white p-8 shadow-[0_20px_50px_-30px_rgba(0,0,0,0.2)]">
                  <Quote className="h-8 w-8 text-foreground/25" strokeWidth={1.5} />
                  <p className="mt-4 flex-1 font-display text-lg font-medium leading-relaxed text-foreground md:text-xl">
                    "{d.quote}"
                  </p>
                  <div className="mt-6 border-t border-foreground/10 pt-4">
                    <div className="font-display text-sm font-bold text-foreground">{d.autor}</div>
                    <div className="text-xs text-muted-foreground">{d.cidade}</div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* COMO FUNCIONA — 4 passos */}
      <section className="bg-secondary/60 py-24 md:py-32">
        <div className="mx-auto max-w-[1400px] px-5 md:px-10">
          <div className="mx-auto max-w-3xl text-center">
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full border border-foreground/15 bg-white px-4 py-1.5 text-xs font-semibold tracking-wide text-foreground/70">
                <Sparkles className="h-3.5 w-3.5 text-[#C9A84C]" /> como funciona
              </span>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-5 font-display text-4xl font-black leading-[1.05] tracking-tight md:text-6xl">
                Em 4 passos<br />
                você já está <UnderlineWord delay={0}>dentro</UnderlineWord>.
              </h2>
            </Reveal>
          </div>

          {/* Diagrama central + cards laterais */}
          <div className="relative mx-auto mt-16 grid max-w-[1200px] items-center gap-8 md:mt-20 md:grid-cols-[minmax(0,1fr)_minmax(0,520px)_minmax(0,1fr)] md:gap-6">
            {/* Cards esquerda */}
            <div className="flex flex-col gap-6 md:gap-10">
              {[
                { t: "Preencha o formulário", d: "Deixe seus dados e conte sobre sua empresa e região — leva menos de 2 minutos." },
                { t: "Apresentamos o programa", d: "Entramos em contato para mostrar condições, produtos e diferenciais da parceria." },
              ].map((c, i) => (
                <Reveal key={i} delay={i * 0.08}>
                  <div className="rounded-2xl border border-foreground/10 bg-white p-5 shadow-[0_20px_50px_-30px_rgba(0,0,0,0.25)] md:p-6">
                    <h3 className="font-display text-base font-bold text-foreground md:text-lg">{c.t}</h3>
                    <p className="mt-2 text-[13px] leading-relaxed text-muted-foreground md:text-sm">{c.d}</p>
                  </div>
                </Reveal>
              ))}
            </div>

            {/* Centro: 2x2 grid dourado com anéis */}
            <div className="relative mx-auto flex aspect-square w-full max-w-[440px] items-center justify-center">
              {/* Anéis concêntricos */}
              <div className="pointer-events-none absolute inset-0 rounded-full border border-[#C9A84C]/25" />
              <div className="pointer-events-none absolute inset-[8%] rounded-full border border-[#C9A84C]/20" />
              <div className="pointer-events-none absolute inset-[18%] rounded-full border border-[#C9A84C]/15" />

              {/* Ícones flutuantes nos 4 cantos do anel */}
              {[
                { pos: "top-2 left-1/2 -translate-x-1/2", icon: <Handshake className="h-4 w-4" /> },
                { pos: "top-1/2 right-2 -translate-y-1/2", icon: <MegaphoneIcon className="h-4 w-4" /> },
                { pos: "bottom-2 left-1/2 -translate-x-1/2", icon: <Target className="h-4 w-4" /> },
                { pos: "top-1/2 left-2 -translate-y-1/2", icon: <Check className="h-4 w-4" /> },
              ].map((f, i) => (
                <div
                  key={i}
                  className={`absolute ${f.pos} flex h-9 w-9 items-center justify-center rounded-full border border-[#C9A84C]/40 bg-white text-[#8a6d1f] shadow-sm`}
                >
                  {f.icon}
                </div>
              ))}

              {/* Grid 2x2 */}
              <div className="relative grid h-[70%] w-[70%] grid-cols-2 grid-rows-2 gap-2">
                {[
                  { n: "1", t: "Preencha o formulário" },
                  { n: "2", t: "Análise da equipe" },
                  { n: "3", t: "Apresentação do programa" },
                  { n: "4", t: "Comece a vender" },
                ].map((s) => (
                  <div
                    key={s.n}
                    className="flex flex-col items-center justify-center rounded-xl p-3 text-center text-[11px] font-semibold leading-tight text-[#3a2d0a] md:text-[13px]"
                    style={{
                      background:
                        "linear-gradient(135deg, #d9b45c 0%, #C9A84C 55%, #a8862f 100%)",
                      boxShadow: "inset 0 1px 0 rgba(255,255,255,0.35), 0 10px 22px -14px rgba(168,134,47,0.55)",
                    }}
                  >
                    {s.t}
                  </div>
                ))}
              </div>

              {/* Círculo central com marca */}
              <div className="absolute left-1/2 top-1/2 flex h-[26%] w-[26%] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-foreground shadow-[0_10px_30px_-8px_rgba(0,0,0,0.55)] ring-4 ring-secondary/60">
                <img src={rdMark} alt="Roll Door" className="h-[55%] w-[55%] object-contain" />
              </div>
            </div>

            {/* Cards direita */}
            <div className="flex flex-col gap-6 md:gap-10">
              {[
                { t: "Nossa equipe analisa", d: "Avaliamos sua região e o perfil da empresa cadastrada para garantir a melhor parceria." },
                { t: "Você começa a vender", d: "Inicie sua jornada como Revendedor Premium Roll Door com suporte técnico e comercial." },
              ].map((c, i) => (
                <Reveal key={i} delay={i * 0.08}>
                  <div className="rounded-2xl border border-foreground/10 bg-white p-5 shadow-[0_20px_50px_-30px_rgba(0,0,0,0.25)] md:p-6">
                    <h3 className="font-display text-base font-bold text-foreground md:text-lg">{c.t}</h3>
                    <p className="mt-2 text-[13px] leading-relaxed text-muted-foreground md:text-sm">{c.d}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          {/* Rodapé com CTA */}
          <Reveal delay={0.15}>
            <p className="mx-auto mt-14 max-w-2xl text-center text-sm leading-relaxed text-muted-foreground md:text-base">
              Quando esses <strong className="text-foreground">4 passos</strong> acontecem juntos, virar
              revendedor deixa de ser dúvida e vira <strong className="text-foreground">decisão estratégica</strong>.
            </p>
          </Reveal>
          <div className="mt-6 flex justify-center">
            <a
              href="#cta-final"
              className="inline-flex items-center gap-2 rounded-full bg-[#C9A84C] px-7 py-3.5 font-display text-sm font-bold text-[#2a2007] shadow-[0_18px_40px_-16px_rgba(201,168,76,0.75)] transition hover:brightness-105 md:text-base"
            >
              Quero fazer parte da próxima turma
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="relative overflow-hidden bg-foreground py-24 text-white md:py-32">
        <div className="pointer-events-none absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(115deg, rgba(255,255,255,0.9) 0 1px, transparent 1px 22px)",
          }}
        />
        <div className="relative mx-auto max-w-[1400px] px-5 md:px-10">
          <div className="grid gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)] md:gap-12">
            <div>
              <Reveal>
                <h2 className="font-display text-3xl font-black leading-[1.05] tracking-tight text-white md:text-5xl">
                  Ficou com<br />dúvidas?
                </h2>
                <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/60 md:text-base">
                  Aqui estão as perguntas mais comuns sobre o programa. Precisa de mais informações?
                  Preencha o formulário abaixo e nossa equipe entra em contato.
                </p>
              </Reveal>
            </div>

            <div className="space-y-3">
              {[
                {
                  q: "Preciso já trabalhar com esquadrias?",
                  a: "Sim. O programa é destinado para empresas do segmento, como vidraçarias, serralherias e fabricantes de esquadrias.",
                },
                {
                  q: "Existe exclusividade?",
                  a: "As condições são avaliadas conforme a região e o perfil do parceiro.",
                },
                {
                  q: "Recebo suporte?",
                  a: "Sim. Os parceiros contam com suporte técnico e comercial durante toda a parceria.",
                },
                {
                  q: "Como funciona o processo de aprovação?",
                  a: "Após o cadastro, nossa equipe entra em contato para avaliar o perfil da empresa e apresentar as condições do programa.",
                },
              ].map((item, i) => (
                <FaqItem key={i} q={item.q} a={item.a} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA FINAL COM FORMULÁRIO */}
      <section id="cta-final" className="bg-secondary/60 py-24 md:py-32">
        <div className="mx-auto max-w-[1200px] px-5 md:px-10">
          <div className="mx-auto max-w-3xl text-center">
            <Reveal>
              <h2 className="font-display text-4xl font-black leading-[1.05] tracking-tight md:text-6xl">
                Sua empresa está pronta para vender uma das{" "}
                <UnderlineWord delay={0}>marcas mais reconhecidas</UnderlineWord> do mercado
                premium?
              </h2>
            </Reveal>
            <Reveal delay={0.15}>
              <p className="mx-auto mt-6 max-w-2xl text-base text-muted-foreground md:text-[19px]">
                Junte-se à Rede Premium Roll Door e ofereça aos seus clientes produtos que unem
                design, engenharia e alto padrão. Preencha o formulário e fale com um especialista.
              </p>
            </Reveal>
          </div>

          <div className="mx-auto mt-14 max-w-3xl">
            <Reveal delay={0.2}>
              <FormularioRevenda />
            </Reveal>
          </div>
        </div>
      </section>

      {/* STICKY MOBILE CTA */}
      <a
        href="#cta-final"
        className="fixed bottom-4 left-4 right-4 z-40 inline-flex items-center justify-center gap-2 rounded-2xl bg-foreground px-6 py-4 font-display text-base font-bold tracking-tight text-white shadow-[0_20px_60px_-15px_rgba(0,0,0,0.6)] transition-colors hover:bg-foreground/90 md:hidden"
      >
        Quero ser Revendedor Premium <ArrowRight className="h-4 w-4" />
      </a>
    </main>
  );
}

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] transition-colors hover:border-white/25">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left md:px-7 md:py-6"
      >
        <span className="font-display text-base font-semibold tracking-tight text-white md:text-lg">
          {q}
        </span>
        <span className="flex h-7 w-7 shrink-0 items-center justify-center text-white">
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
