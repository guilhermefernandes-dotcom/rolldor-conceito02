import { createFileRoute } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "motion/react";
import {
  ArrowRight,
  Check,
  Compass,
  Sparkles,
  ShieldCheck,
  Layers,
  Quote,
} from "lucide-react";
import heroBannerAsset from "@/assets/hero-residencial.jpg.asset.json";
import banner2Asset from "@/assets/rd-banner-5.webp.asset.json";
import banner4Asset from "@/assets/rd-banner-4.webp.asset.json";
import project1Asset from "@/assets/rd-project-2.webp.asset.json";
import project2Asset from "@/assets/rd-project-3.webp.asset.json";
import project3Asset from "@/assets/rd-project-6.webp.asset.json";
import project4Asset from "@/assets/rd-project-4.webp.asset.json";
import project5Asset from "@/assets/rd-project-5.webp.asset.json";
const heroImg = heroBannerAsset.url;
const galeria1 = project1Asset.url;
const galeria2 = project2Asset.url;
const galeria3 = project3Asset.url;
const galeria4 = project4Asset.url;
const galeria5 = project5Asset.url;
const pullQuoteBg = banner2Asset.url;
const session2Img = banner4Asset.url;
import logoAsset from "@/assets/roll-door-logo.png.asset.json";
import { FormularioCliente } from "@/components/FormularioCliente";
import { StatsScrollLock, type Step as ScrollStep } from "@/components/StatsScrollLock";
import { NovoPadraoPinned } from "@/components/NovoPadraoPinned";


const residencialSteps: ScrollStep[] = [
  {
    n: "01",
    label: "Grandes vãos",
    big: "Integração total",
    desc: "Integre ambientes internos e externos com elegância e leveza, ampliando a sensação de espaço e trazendo a natureza para dentro do projeto.",
    Icon: Layers,
    image: project1Asset.url,
  },
  {
    n: "02",
    label: "Design minimalista",
    big: "Perfis discretos",
    desc: "Perfis finos e discretos que desaparecem na arquitetura, valorizando a paisagem e cada linha do seu projeto residencial.",
    Icon: Compass,
    image: project2Asset.url,
  },
  {
    n: "03",
    label: "Alto desempenho",
    big: "Durabilidade real",
    desc: "Projetados para oferecer durabilidade, segurança, isolamento acústico e excelente desempenho técnico em uso residencial de alto padrão.",
    Icon: ShieldCheck,
    image: project3Asset.url,
    imagePosition: "50% center",
  },
  {
    n: "04",
    label: "Acabamento premium",
    big: "Detalhes que ficam",
    desc: "Cada detalhe pensado para entregar sofisticação em todos os ambientes — do puxador ao encaixe, tudo em padrão de arquitetura premium.",
    Icon: Sparkles,
    image: project4Asset.url,
    imagePosition: "50% center",
  },
];


export const Route = createFileRoute("/residencial")({
  head: () => {
    const title =
      "Roll Door — Esquadrias premium para residências de alto padrão";
    const description =
      "Sistemas de esquadrias premium desenvolvidos para arquitetura contemporânea, grandes vãos e design minimalista. Solicite um orçamento e transforme seu projeto residencial.";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        {
          name: "keywords",
          content:
            "esquadrias premium, portas deslizantes, grandes vãos, arquitetura contemporânea, casa de alto padrão, roll door residencial",
        },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: description },
      ],
    };
  },
  component: LandingCliente,
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

function UnderlineWord({
  children,
  delay = 0,
  color = "#9CCB3B",
}: {
  children: React.ReactNode;
  delay?: number;
  color?: string;
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
        className="absolute -bottom-1 left-0 right-0 h-[3px] origin-left rounded-full md:h-[4px]"
        style={{ background: color }}
      />
    </span>
  );
}

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
      className={`group relative inline-flex h-16 items-center justify-center gap-2 rounded-2xl px-10 font-display text-lg font-medium text-white transition-transform hover:-translate-y-0.5 sm:h-[68px] sm:px-14 sm:text-xl ${className}`}
      style={{
        background: "#9CCB3B",
        boxShadow: "0 18px 40px -12px rgba(151, 191, 76, 0.45)",
      }}
    >
      {children}
      <ArrowRight className="h-5 w-5" />
    </a>
  );
}

function LandingCliente() {
  const { scrollY } = useScroll();
  const heroPad = useTransform(scrollY, [0, 120], [13, 0]);
  const heroRadius = useTransform(scrollY, [0, 120], [28, 0]);

  return (
    <main className="min-h-screen bg-foreground text-white antialiased">
      {/* HERO — imagem full com overlay escuro, tipografia elegante */}
      <motion.div style={{ padding: heroPad, background: "#9CCB3B" }}>
        <motion.section
          className="relative w-full overflow-hidden px-6 py-16 md:px-10 md:py-16 lg:py-20"
          style={{ borderRadius: heroRadius, background: "#0b0b0c" }}
        >
          <div aria-hidden className="pointer-events-none absolute inset-0">
            <img
              src={heroImg}
              alt=""
              className="h-full w-full object-cover"
              fetchPriority="high"
              decoding="async"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/45 to-black/75" />
          </div>



          <div className="relative mx-auto flex max-w-5xl flex-col items-center text-center">
            <Reveal>
              <img
                src={logoAsset.url}
                alt="Roll Door Company"
                className="mb-6 h-auto w-auto max-h-12 md:mb-8 md:max-h-16"
                style={{ maxWidth: "220px", filter: "brightness(0) invert(1)" }}
              />
            </Reveal>

            <Reveal delay={0.15}>
              <h1
                className="font-display mx-auto text-white"
                style={{
                  fontWeight: 500,
                  fontSize: "clamp(28px, 4.4vw, 54px)",
                  lineHeight: "1.05",
                  letterSpacing: "-0.035em",
                  maxWidth: "22ch",
                }}
              >
                Transforme sua casa em um projeto que{" "}
                <span className="text-brand-green">impressiona</span> em cada detalhe.
              </h1>
            </Reveal>

            <Reveal delay={0.25}>
              <p className="mt-6 max-w-2xl text-[17px] leading-relaxed tracking-[-0.01em] text-white/70 md:text-[19px]">
                Sistemas de esquadrias premium desenvolvidos para quem busca arquitetura
                contemporânea, grandes vãos, design minimalista e máxima valorização do imóvel.
              </p>
            </Reveal>

            <Reveal delay={0.35}>
              <ul className="mt-7 grid gap-3 text-left sm:grid-cols-2">
                {[
                  "Design sofisticado",
                  "Grandes vãos e integração dos ambientes",
                  "Tecnologia e alto desempenho",
                  "Rede de especialistas em todo o Brasil",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-[17px] text-white/85">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-brand-green/60 text-brand-green">
                      <Check className="h-3.5 w-3.5" strokeWidth={3} />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.5}>
              <div className="mt-8">
                <CtaPrimary>Solicitar um orçamento</CtaPrimary>
              </div>
            </Reveal>
          </div>
        </motion.section>


      </motion.div>

      {/* MARQUEE — faixa de destaque verde */}
      <div className="overflow-hidden bg-brand-green py-4">
        <div
          className="flex animate-[leevi-marquee_35s_linear_infinite] whitespace-nowrap font-display"
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
              "Design sofisticado",
              "Grandes vãos",
              "Arquitetura contemporânea",
              "Rede de especialistas no Brasil",
            ].map((item, j) => (
              <span key={`${i}-${j}`} className="inline-flex items-center">
                <span className="px-8">{item}</span>
                <span className="opacity-60">•</span>
              </span>
            )),
          )}
        </div>
      </div>


      {/* SESSÃO 2 — "Um novo padrão" (Apple-style pinned reveal) */}
      <NovoPadraoPinned />



      {/* IMAGEM FULL-BLEED — respiro visual entre seções */}
      <div className="bg-[#F2F0EA] px-5 pb-6 md:px-10">
        <Reveal>
          <div className="relative mx-auto aspect-[21/9] w-full max-w-[1600px] overflow-hidden rounded-3xl">
            <img
              src={session2Img}
              alt="Residência de alto padrão com sistema Roll Door"
              className="h-full w-full object-cover"
              loading="lazy"
              decoding="async"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
          </div>
        </Reveal>
      </div>

      {/* SESSÃO 3 — Arquitetura, design e engenharia (4 cards) */}
      <section className="relative overflow-hidden border-t border-white/5 bg-foreground py-24 md:py-32">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10">
          <div className="mx-auto max-w-3xl text-center">
            <Reveal>
              <h2
                className="font-display text-white"
                style={{
                  fontWeight: 500,
                  fontSize: "clamp(28px, 5vw, 52px)",
                  lineHeight: "1.05",
                  letterSpacing: "-0.035em",
                }}
              >
                Quando <UnderlineWord delay={0}>arquitetura</UnderlineWord>, design e engenharia
                trabalham juntos.
              </h2>
            </Reveal>
          </div>

          <div className="mt-10 md:mt-14">
            <StatsScrollLock steps={residencialSteps} variant="dark" />
          </div>
        </div>
      </section>


      {/* SESSÃO 4 — Galeria projetos que inspiram */}
      <section className="relative overflow-hidden bg-[#F2F0EA] py-24 md:py-32">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10">
          <div className="grid gap-12 md:grid-cols-[1fr_1.3fr] md:items-center md:gap-16">
            <Reveal>
              <span className="font-display text-xs font-medium uppercase tracking-[0.24em] text-[#2F3D30]">
                Galeria
              </span>
              <h2
                className="mt-5 font-display text-[#0E1111]"
                style={{
                  fontWeight: 500,
                  fontSize: "clamp(30px, 5.2vw, 56px)",
                  lineHeight: "1.05",
                  letterSpacing: "-0.035em",
                }}
              >
                Projetos que <span className="text-[#0E1111]/50">inspiram.</span>
              </h2>
              <div className="mt-8 space-y-5 text-[18px] leading-relaxed text-[#0E1111]/70 md:text-[20px]">
                <p className="text-[#0E1111]">Mais do que produtos.</p>
                <p>
                  Criamos soluções que transformam residências em espaços exclusivos, modernos e
                  cheios de personalidade.
                </p>
              </div>
            </Reveal>


            <Reveal delay={0.15}>
              <div className="grid gap-4">
                <div className="aspect-[16/10] overflow-hidden rounded-3xl">
                  <img
                    src={galeria2}
                    alt="Residência de alto padrão com esquadrias Roll Door"
                    className="h-full w-full object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="aspect-square overflow-hidden rounded-2xl">
                    <img
                      src={galeria1}
                      alt="Projeto residencial contemporâneo"
                      className="h-full w-full object-cover"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <div className="aspect-square overflow-hidden rounded-2xl">
                    <img
                      src={galeria4}
                      alt="Ambiente integrado com esquadrias Roll Door"
                      className="h-full w-full object-cover"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <div className="aspect-square overflow-hidden rounded-2xl">
                    <img
                      src={galeria3}
                      alt="Grandes vãos com integração externa"
                      className="h-full w-full object-cover"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                </div>
                <div className="aspect-[21/9] overflow-hidden rounded-2xl">
                  <img
                    src={galeria5}
                    alt="Projeto Roll Door — grandes vãos e integração"
                    className="h-full w-full object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* SESSÃO 5 — O detalhe que valoriza (pull quote) */}
      <section className="relative overflow-hidden border-y border-white/5 bg-foreground py-28 md:py-36">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <img
            src={pullQuoteBg}
            alt=""
            className="h-full w-full object-cover opacity-25"
            loading="lazy"
            decoding="async"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-foreground via-foreground/85 to-foreground" />
        </div>
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(115deg, rgba(255,255,255,0.9) 0 1px, transparent 1px 22px)",
          }}
        />
        <div className="relative mx-auto max-w-4xl px-6 text-center md:px-10">
          <Reveal>
            <h2
              className="font-display text-white"
              style={{
                fontWeight: 500,
                fontSize: "clamp(28px, 5vw, 52px)",
                lineHeight: "1.08",
                letterSpacing: "-0.035em",
              }}
            >
              O <UnderlineWord delay={0}>detalhe</UnderlineWord> que valoriza todo o seu imóvel.
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="mx-auto mt-10 max-w-2xl space-y-5 text-[18px] leading-relaxed text-white/70 md:text-[20px]">
              <p>Escolher esquadrias premium não é apenas uma decisão estética.</p>
              <p>É investir em conforto, funcionalidade e valorização patrimonial.</p>
              <p>
                Projetos de alto padrão exigem soluções capazes de acompanhar essa mesma qualidade.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* SESSÃO 6 — Por que escolher a Roll Door (caixa de mensagem) */}
      <section className="bg-foreground pt-4 pb-24 md:pb-32">
        <div className="w-full" style={{ padding: "20px" }}>
          <div
            className="relative w-full overflow-hidden rounded-[32px] px-6 py-14 md:px-12 md:py-20"
            style={{ background: "oklch(0.18 0.005 250)" }}
          >
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 rounded-[32px] opacity-[0.06]"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(115deg, rgba(255,255,255,0.9) 0 1px, transparent 1px 14px)",
              }}
            />
            {/* triângulo — efeito caixa de mensagem */}
            <div
              aria-hidden
              className="pointer-events-none absolute top-[55%] -left-6 z-10 h-0 w-0 md:-left-8"
              style={{
                borderTop: "28px solid transparent",
                borderBottom: "28px solid transparent",
                borderRight: "28px solid oklch(0.18 0.005 250)",
              }}
            />

            <div className="relative z-10 mx-auto grid max-w-[1100px] gap-14 md:grid-cols-[1fr_1.2fr] md:items-center md:gap-20">
              <Reveal>
                <span className="font-display text-xs font-medium uppercase tracking-[0.24em] text-brand-green">
                  Por que Roll Door
                </span>
                <h2
                  className="mt-5 font-display text-white"
                  style={{
                    fontWeight: 500,
                    fontSize: "clamp(30px, 5vw, 56px)",
                    lineHeight: "1.05",
                    letterSpacing: "-0.035em",
                  }}
                >
                  Por que escolher a{" "}
                  <UnderlineWord delay={0}>Roll Door</UnderlineWord>?
                </h2>
                <p className="mt-6 max-w-md text-[18px] leading-relaxed text-white/65">
                  Uma marca construída sobre décadas de engenharia, design e presença nacional em
                  projetos de alto padrão.
                </p>
              </Reveal>

              <Reveal delay={0.15}>
                <ul className="flex flex-col divide-y divide-white/10">
                  {[
                    "Quase quatro décadas de experiência no mercado.",
                    "Marca reconhecida nacionalmente.",
                    "Soluções para projetos de alto padrão.",
                    "Rede de parceiros especializados em todo o Brasil.",
                    "Produtos desenvolvidos para arquitetura contemporânea.",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-4 py-5">
                      <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-brand-green/60 text-brand-green">
                        <Check className="h-3.5 w-3.5" strokeWidth={3} />
                      </span>
                      <span className="text-[18px] leading-relaxed text-white/85 md:text-[20px]">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>
          </div>
        </div>
      </section>


      {/* SESSÃO 7 — Da inspiração ao seu projeto */}
      <section className="relative overflow-hidden bg-[#F2F0EA] py-24 md:py-32">
        <div className="mx-auto max-w-[1200px] px-6 md:px-10">
          <div className="mx-auto max-w-3xl text-center">
            <Reveal>
              <span className="font-display text-xs font-medium uppercase tracking-[0.24em] text-[#2F3D30]">
                Como funciona
              </span>
              <h2
                className="mt-5 font-display text-[#0E1111]"
                style={{
                  fontWeight: 500,
                  fontSize: "clamp(28px, 5vw, 52px)",
                  lineHeight: "1.05",
                  letterSpacing: "-0.035em",
                }}
              >
                Da <UnderlineWord delay={0}>inspiração</UnderlineWord> ao seu projeto.
              </h2>
              <p className="mx-auto mt-6 text-[18px] text-[#0E1111]/60 md:text-[20px]">
                Nosso processo é simples.
              </p>
            </Reveal>
          </div>

          <div className="mt-16 grid gap-5 md:grid-cols-4">
            {[
              "Solicite seu atendimento.",
              "Nossa equipe identifica a melhor solução para seu projeto.",
              "Você é direcionado para um parceiro especializado da sua região.",
              "Seu projeto ganha vida com a qualidade Roll Door.",
            ].map((step, i) => (
              <Reveal key={i} delay={i * 0.08} className="h-full">
                <div
                  className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-[#0E1111]/10 bg-white p-7 transition-all duration-500 hover:-translate-y-1 hover:border-brand-green/50"
                  style={{
                    boxShadow:
                      "0 20px 50px -30px rgba(14,17,17,0.15)",
                  }}
                >
                  {/* subtle brand-green glow */}
                  <div
                    aria-hidden
                    className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full opacity-30 blur-3xl transition-opacity duration-500 group-hover:opacity-60"
                    style={{ background: "radial-gradient(circle, #9CCB3B 0%, transparent 70%)" }}
                  />
                  <span className="relative font-display text-4xl font-medium text-[#2F3D30] md:text-5xl">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="relative my-5 h-px w-10 bg-brand-green" />
                  <p className="relative text-[18px] leading-relaxed text-[#0E1111]/80">{step}</p>
                </div>
              </Reveal>
            ))}
          </div>

        </div>
      </section>


      {/* SESSÃO 8 — Depoimentos */}
      <section className="relative overflow-hidden border-t border-white/5 bg-foreground py-24 md:py-32">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10">
          <div className="mx-auto max-w-3xl text-center">
            <Reveal>
              <span className="font-display text-xs font-medium uppercase tracking-[0.24em] text-brand-green">
                Depoimentos
              </span>
              <h2
                className="mt-5 font-display text-white"
                style={{
                  fontWeight: 500,
                  fontSize: "clamp(28px, 5vw, 52px)",
                  lineHeight: "1.05",
                  letterSpacing: "-0.035em",
                }}
              >
                Quem escolheu <UnderlineWord delay={0}>Roll Door</UnderlineWord> recomenda.
              </h2>
            </Reveal>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {[
              {
                quote:
                  "A integração entre sala e área externa mudou completamente a experiência de morar na nossa casa.",
                autor: "Cliente residencial",
                cidade: "São Paulo, SP",
              },
              {
                quote:
                  "Especificamos Roll Door em todos os projetos onde o cliente busca acabamento verdadeiramente premium.",
                autor: "Arquiteta parceira",
                cidade: "Curitiba, PR",
              },
              {
                quote:
                  "O nível de detalhe dos perfis e a qualidade do acabamento fazem toda a diferença no resultado final.",
                autor: "Cliente residencial",
                cidade: "Balneário Camboriú, SC",
              },
            ].map((d, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <div className="flex h-full flex-col rounded-3xl border border-white/10 bg-white/[0.03] p-8">
                  <Quote className="h-8 w-8 text-brand-green/70" strokeWidth={1.5} />
                  <p className="mt-4 flex-1 font-display text-lg font-medium leading-relaxed text-white md:text-xl">
                    "{d.quote}"
                  </p>
                  <div className="mt-6 border-t border-white/10 pt-4">
                    <div className="font-display text-sm font-bold text-white">{d.autor}</div>
                    <div className="text-xs text-white/50">{d.cidade}</div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINAL + FORMULÁRIO */}
      <section
        id="cta-final"
        className="relative overflow-hidden border-t border-white/5 bg-foreground py-24 md:py-32"
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(115deg, rgba(255,255,255,0.9) 0 1px, transparent 1px 22px)",
          }}
        />
        <div className="relative mx-auto max-w-[1400px] px-5 md:px-10">
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-10">
            <Reveal>
              <div
                className="relative flex h-full flex-col overflow-hidden rounded-3xl p-8 text-white md:p-12"
                style={{
                  background:
                    "linear-gradient(160deg, oklch(0.22 0.005 250) 0%, oklch(0.16 0.005 250) 45%, oklch(0.11 0.005 250) 100%)",
                }}
              >
                <div
                  className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full opacity-30 blur-3xl"
                  style={{ background: "#9CCB3B" }}
                />
                <span className="font-display text-xs font-medium uppercase tracking-[0.24em] text-brand-green">
                  Fale com um especialista
                </span>
                <h2 className="mt-5 font-display text-4xl font-medium leading-[1.05] tracking-tight text-white md:text-5xl">
                  Seu projeto merece uma solução à altura.
                </h2>
                <p className="mt-6 max-w-md text-[18px] leading-relaxed text-white/75 md:text-[19px]">
                  Solicite um atendimento e descubra como as soluções Roll Door podem transformar
                  sua residência com design, tecnologia e sofisticação.
                </p>

                <div className="my-8 h-px w-full bg-white/15" />

                <ul className="flex flex-col gap-4">
                  {[
                    "Atendimento personalizado para seu projeto",
                    "Indicação do parceiro Roll Door da sua região",
                    "Suporte técnico especializado",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3 text-[18px] text-white/90">
                      <Check className="mt-1 h-5 w-5 shrink-0 text-brand-green" strokeWidth={2.5} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-auto grid grid-cols-1 gap-3 pt-10 sm:grid-cols-2">
                  <div className="rounded-2xl border border-white/15 bg-white/5 px-5 py-4 backdrop-blur-sm">
                    <div className="font-display text-xs font-medium uppercase tracking-widest text-white/50">
                      WhatsApp
                    </div>
                    <div className="mt-1 font-display text-[18px] font-medium text-white">
                      (11) 9 0000-0000
                    </div>
                  </div>
                  <div className="rounded-2xl border border-white/15 bg-white/5 px-5 py-4 backdrop-blur-sm">
                    <div className="font-display text-xs font-medium uppercase tracking-widest text-white/50">
                      E-mail
                    </div>
                    <div className="mt-1 font-display text-[18px] font-medium text-white">
                      contato@rolldoor.com.br
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <FormularioCliente />
            </Reveal>
          </div>
        </div>
      </section>

      {/* STICKY MOBILE CTA */}
      <a
        href="#cta-final"
        className="fixed bottom-4 left-4 right-4 z-40 inline-flex items-center justify-center gap-2 rounded-2xl bg-brand-green px-6 py-4 font-display text-base font-bold tracking-tight text-white shadow-[0_20px_60px_-15px_rgba(0,0,0,0.6)] transition-colors hover:bg-brand-green-deep md:hidden"
      >
        Solicitar um orçamento <ArrowRight className="h-4 w-4" />
      </a>
    </main>
  );
}
