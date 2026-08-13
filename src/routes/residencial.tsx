import { createFileRoute } from "@tanstack/react-router";
import { UtmTracking } from "@/components/UtmTracking";
import React, { useState } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "motion/react";
import {
  ArrowRight,
  Check,
  Compass,
  Sparkles,
  ShieldCheck,
  Layers,
  Quote,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import heroPortaBandeirasAsset from "@/assets/hero-porta-bandeiras.jpg.asset.json";
import seloBrasil from "@/assets/selo-image-20.png.asset.json";
import seloFalcaoBauer from "@/assets/selo-image-21.png.asset.json";
import seloUniversidadeSom from "@/assets/selo-image-22.png.asset.json";
import seloAbravidro from "@/assets/selo-image-23.png.asset.json";
import banner2Asset from "@/assets/rd-banner-5.webp.asset.json";
import project1Asset from "@/assets/rd-project-2.webp.asset.json";
import project2Asset from "@/assets/rd-project-3.webp.asset.json";
import project3Asset from "@/assets/rd-project-6.webp.asset.json";
import project4Asset from "@/assets/rd-project-4.webp.asset.json";
import project5Asset from "@/assets/rd-project-5.webp.asset.json";
import prodCamaraoAsset from "@/assets/rd-real-camarao.webp.asset.json";
import prodGiroAsset from "@/assets/rd-real-giro.webp.asset.json";
import prodPivotanteAsset from "@/assets/rd-real-pivotante.webp.asset.json";
import prodPersianaAsset from "@/assets/rd-real-persiana.webp.asset.json";
import prodSystemsAsset from "@/assets/rd-real-systems.webp.asset.json";
import prodLiteAsset from "@/assets/rd-real-lite.webp.asset.json";
import prodSlimAsset from "@/assets/rd-real-slim.webp.asset.json";
import prodInsideAsset from "@/assets/rd-real-inside.webp.asset.json";
import galCamarao1 from "@/assets/rd-gal-camarao1.webp.asset.json";
import galCamarao2 from "@/assets/rd-gal-camarao2.webp.asset.json";
import galCamarao3 from "@/assets/rd-gal-camarao3.webp.asset.json";
import galGiro1 from "@/assets/rd-gal-giro1.webp.asset.json";
import galGiro2 from "@/assets/rd-gal-giro2.webp.asset.json";
import galGiro3 from "@/assets/rd-gal-giro3.webp.asset.json";
import galPivo1 from "@/assets/rd-gal-pivo1.webp.asset.json";
import galPivo2 from "@/assets/rd-gal-pivo2.webp.asset.json";
import galPivo3 from "@/assets/rd-gal-pivo3.webp.asset.json";
import galPers1 from "@/assets/rd-gal-pers1.webp.asset.json";
import galPers2 from "@/assets/rd-gal-pers2.webp.asset.json";
import galPers3 from "@/assets/rd-gal-pers3.webp.asset.json";
import galMax1 from "@/assets/rd-gal-max1.webp.asset.json";
import galMax2 from "@/assets/rd-gal-max2.webp.asset.json";
import galLite1 from "@/assets/rd-gal-lite1.webp.asset.json";
import galLite2 from "@/assets/rd-gal-lite2.webp.asset.json";
import galLite3 from "@/assets/rd-gal-lite3.webp.asset.json";
import galLite4 from "@/assets/rd-gal-lite4.webp.asset.json";
import galSlim1 from "@/assets/rd-gal-slim1.webp.asset.json";
import galSlim2 from "@/assets/rd-gal-slim2.webp.asset.json";
import galSlim3 from "@/assets/rd-gal-slim3.webp.asset.json";
import galInside1 from "@/assets/rd-gal-inside1.webp.asset.json";
import galInside2 from "@/assets/rd-gal-inside2.webp.asset.json";
import galInside3 from "@/assets/rd-gal-inside3.webp.asset.json";

const prodCamarao = prodCamaraoAsset.url;
const prodGiro = prodGiroAsset.url;
const prodPivotante = prodPivotanteAsset.url;
const prodPersiana = prodPersianaAsset.url;
const prodSystems = prodSystemsAsset.url;
const prodLite = prodLiteAsset.url;
const prodSlim = prodSlimAsset.url;
const prodInside = prodInsideAsset.url;
const heroImg = heroPortaBandeirasAsset.url;
const pullQuoteBg = banner2Asset.url;
import logoAsset from "@/assets/roll-door-logo.png.asset.json";
import step01Img from "@/assets/step-01-solicite.webp";
import step02Img from "@/assets/step-02-diagnostico.webp";
import step03Img from "@/assets/step-03-parceiro.webp";
import step04Img from "@/assets/step-04-instalacao.webp";
import { FormularioCliente } from "@/components/FormularioCliente";
import { StatsScrollLock, type Step as ScrollStep } from "@/components/StatsScrollLock";
import { NovoPadraoPinned } from "@/components/NovoPadraoPinned";


const residencialSteps: ScrollStep[] = [
  {
    n: "01",
    label: "Vãos de todos os tamanhos",
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
      "Sistemas de esquadrias premium desenvolvidos para arquitetura moderna, grandes vãos e design minimalista. Solicite um orçamento e transforme seu projeto residencial.";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        {
          name: "keywords",
          content:
            "esquadrias premium, portas de correr, grandes vãos, arquitetura moderna, casa de alto padrão, roll door residencial",
        },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: description },
      ],
      links: [
        {
          rel: "preload",
          as: "image",
          href: heroPortaBandeirasAsset.url,
          fetchpriority: "high",
        },
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

type CategoriaId = "todos" | "portas" | "janelas" | "grandes-vaos" | "solucoes-internas";

const CATEGORIAS: { id: CategoriaId; label: string }[] = [
  { id: "todos", label: "Todos" },
  { id: "portas", label: "Portas" },
  { id: "janelas", label: "Janelas" },
  { id: "grandes-vaos", label: "Grandes Vãos" },
  { id: "solucoes-internas", label: "Soluções Internas" },
];

const PRODUTOS: {
  nome: string;
  tag: string;
  img: string;
  cats: CategoriaId[];
}[] = [
  { nome: "Porta Camarão", tag: "Integração total", img: prodCamarao, cats: ["portas", "grandes-vaos"] },
  { nome: "Porta de Giro", tag: "Clássica e versátil", img: prodGiro, cats: ["portas"] },
  { nome: "Porta Pivotante", tag: "Alto padrão", img: prodPivotante, cats: ["portas"] },
  { nome: "Persiana Integrada Hiperventilada", tag: "Conforto e automação", img: prodPersiana, cats: ["janelas"] },
  { nome: "Roll Door Systems", tag: "Vãos amplos", img: prodSystems, cats: ["grandes-vaos"] },
  { nome: "Roll Door Lite", tag: "Linha residencial", img: prodLite, cats: ["grandes-vaos", "portas"] },
  { nome: "Roll Door Slim", tag: "Perfis minimalistas", img: prodSlim, cats: ["grandes-vaos"] },
  { nome: "Inside Door Kit", tag: "Ambientes internos", img: prodInside, cats: ["solucoes-internas"] },
];

function ProdutosFiltraveis() {
  const [categoria, setCategoria] = useState<CategoriaId>("todos");

  const visiveis =
    categoria === "todos"
      ? PRODUTOS
      : PRODUTOS.filter((p) => p.cats.includes(categoria));

  return (
    <div>
      {/* Filtros */}
      <div className="mt-8 flex flex-wrap items-center justify-center gap-2 md:mt-10 md:gap-3">
        {CATEGORIAS.map((c) => {
          const ativo = categoria === c.id;
          return (
            <button
              key={c.id}
              type="button"
              onClick={() => setCategoria(c.id)}
              aria-pressed={ativo}
              className={`h-10 rounded-full px-4 font-display text-[13px] font-medium transition-all md:h-11 md:px-6 md:text-[15px] ${
                ativo
                  ? "bg-foreground text-white shadow-lg"
                  : "border border-foreground/15 bg-white/60 text-foreground/70 hover:border-foreground/40 hover:text-foreground"
              }`}
            >
              {c.label}
            </button>
          );
        })}
      </div>

      {/* Grid de produtos */}
      <motion.div layout className="mt-8 grid grid-cols-2 gap-3 md:mt-12 md:gap-5 lg:grid-cols-4">
        <AnimatePresence mode="popLayout" initial={false}>
          {visiveis.map((p) => (
            <motion.div
              layout
              key={p.nome}
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="group flex h-full flex-col overflow-hidden rounded-2xl bg-white p-4 shadow-sm ring-1 ring-black/5 transition duration-300 hover:-translate-y-1 hover:shadow-xl md:rounded-3xl md:p-6">
                <div className="relative flex aspect-square w-full items-center justify-center overflow-hidden rounded-xl bg-foreground/5 md:rounded-2xl">
                  <img
                    src={p.img}
                    alt={p.nome}
                    loading="lazy"
                    decoding="async"
                    width={1000}
                    height={1000}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="mt-4 flex flex-1 flex-col">
                  <span className="font-display text-[10px] font-medium uppercase tracking-[0.18em] text-brand-green md:text-[11px]">
                    {p.tag}
                  </span>
                  <h3
                    className="mt-1 font-display text-[15px] font-medium leading-snug text-foreground md:text-[19px]"
                    style={{ letterSpacing: "-0.02em" }}
                  >
                    {p.nome}
                  </h3>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* CTA da seção */}
      <div className="mt-10 flex justify-center md:mt-14">
        <a
          href="#cta-final"
          className="inline-flex h-14 w-full items-center justify-center gap-2 rounded-2xl border-2 border-brand-green px-10 font-display text-lg font-medium text-brand-green transition-colors hover:bg-brand-green hover:text-white sm:w-auto sm:px-12 md:h-16 md:text-xl"
        >
          Solicitar orçamento
          <ArrowRight className="h-5 w-5" />
        </a>
      </div>
    </div>
  );
}



function LandingCliente() {
  const { scrollY } = useScroll();
  const heroPad = useTransform(scrollY, [0, 120], [13, 0]);
  const heroRadius = useTransform(scrollY, [0, 120], [28, 0]);

  return (
    <main className="min-h-screen bg-foreground text-white antialiased">
      <UtmTracking />

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
            <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/65 to-black/90" />
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
                  fontSize: "clamp(30px, 4.4vw, 54px)",
                  lineHeight: "1.08",
                  letterSpacing: "-0.03em",
                  maxWidth: "22ch",
                  textShadow: "0 2px 24px rgba(0,0,0,0.55)",
                }}
              >
                Esquadrias de alumínio{" "}
                <span className="text-brand-green">premium</span> para o seu projeto.
              </h1>
            </Reveal>

            <Reveal delay={0.25}>
              <p
                className="mt-6 max-w-2xl text-[17px] font-medium leading-relaxed tracking-[-0.01em] text-white md:text-[20px]"
                style={{ textShadow: "0 1px 16px rgba(0,0,0,0.6)" }}
              >
                Design, desempenho e acabamento de alto padrão para valorizar sua obra.
              </p>
            </Reveal>

            <Reveal delay={0.35}>
              <ul className="mt-7 flex justify-center">
                {["Rede de especialistas em todo o Brasil"].map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-3 text-[16px] text-white md:text-[18px]"
                    style={{ textShadow: "0 1px 12px rgba(0,0,0,0.6)" }}
                  >
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-brand-green/60 text-brand-green">
                      <Check className="h-3.5 w-3.5" strokeWidth={3} />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.5}>
              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
                <CtaPrimary href="#produtos" className="w-full sm:w-auto">
                  Ver produtos
                </CtaPrimary>
                <a
                  href="#cta-final"
                  className="inline-flex h-16 w-full items-center justify-center gap-2 rounded-2xl border-2 border-brand-green px-10 font-display text-lg font-medium text-brand-green transition-colors hover:bg-brand-green hover:text-white sm:h-[68px] sm:w-auto sm:px-12 sm:text-xl"
                >
                  Solicitar orçamento
                </a>
              </div>
            </Reveal>

            <Reveal delay={0.6}>
              <div className="mt-10 w-full border-t border-white/10 pt-6">
                <p className="text-[13px] uppercase tracking-[0.22em] text-white/45">
                  Qualidade certificada
                </p>
                <div className="mt-5 flex flex-wrap items-center justify-center gap-3 md:gap-4">
                  {[
                    { src: seloBrasil.url, alt: "100% fabricado no Brasil" },
                    { src: seloFalcaoBauer.url, alt: "Testado pelo Instituto Falcão Bauer — acreditado pelo INMETRO" },
                    { src: seloUniversidadeSom.url, alt: "Universidade do Som" },
                    { src: seloAbravidro.url, alt: "Prêmio Abravidro Glass South America" },
                  ].map((s) => (
                    <div
                      key={s.alt}
                      className="flex h-[68px] w-[104px] shrink-0 items-center justify-center rounded-xl bg-white/92 px-3 py-2 shadow-sm backdrop-blur-sm md:h-[76px] md:w-[124px]"
                    >
                      <img
                        src={s.src}
                        alt={s.alt}
                        loading="lazy"
                        decoding="async"
                        className="max-h-full max-w-full object-contain"
                      />
                    </div>
                  ))}
                </div>
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
              "Esquadrias de alto padrão",
              "Arquitetura moderna",
              "Acabamento premium",
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

      {/* SESSÃO 2 — Produtos (filtros por categoria) */}
      <section id="produtos" className="scroll-mt-16 bg-foreground py-6 md:py-8">
        <div className="mx-auto w-full px-4 md:px-8">
          <div className="relative w-full overflow-hidden rounded-[24px] bg-[#F2F0EA] px-4 py-14 md:rounded-[32px] md:px-12 md:py-24">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 rounded-[24px] opacity-[0.06] md:rounded-[32px]"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(115deg, rgba(14,17,17,0.9) 0 1px, transparent 1px 18px)",
              }}
            />
            <div className="relative z-10 mx-auto max-w-[1280px]">
              <div className="mx-auto max-w-3xl text-center">
                <Reveal>
                  <span className="font-display text-xs font-medium uppercase tracking-[0.24em] text-brand-green">
                    Nossos produtos
                  </span>
                  <h2
                    className="mt-5 font-display text-foreground"
                    style={{
                      fontWeight: 500,
                      fontSize: "clamp(28px, 5.2vw, 56px)",
                      lineHeight: "1.05",
                      letterSpacing: "-0.035em",
                    }}
                  >
                    Esquadrias pensadas para o{" "}
                    <UnderlineWord delay={0}>seu projeto</UnderlineWord>.
                  </h2>
                  <p className="mx-auto mt-6 max-w-2xl text-[17px] leading-relaxed text-foreground/65 md:text-[20px]">
                    Conheça nossas linhas de esquadrias, portas e sistemas desenvolvidos para
                    projetos de alto padrão.
                  </p>
                </Reveal>
              </div>

              <Reveal delay={0.15}>
                <ProdutosFiltraveis />
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* SESSÃO 3 — Arquitetura, design e engenharia (4 cards) */}
      <section className="relative overflow-hidden border-t border-white/5 bg-foreground py-16 md:py-32">
        <div className="mx-auto max-w-[1400px] px-5 md:px-10">
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

      {/* SESSÃO 4 — "Um novo padrão" (Apple-style pinned reveal) */}
      <NovoPadraoPinned />

      {/* SESSÃO 5 — O detalhe que valoriza (pull quote) */}
      <section className="relative overflow-hidden border-y border-white/5 bg-foreground py-16 md:py-36">
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
            <div className="mx-auto mt-8 max-w-2xl space-y-5 text-[16px] leading-relaxed text-white/75 md:mt-10 md:text-[20px]">
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
                    "Produtos desenvolvidos para arquitetura moderna.",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-4 py-5">
                      <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-brand-green/60 text-brand-green">
                        <Check className="h-3.5 w-3.5" strokeWidth={3} />
                      </span>
                      <span className="text-[16px] leading-relaxed text-white/85 md:text-[20px]">
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
      <section className="relative overflow-hidden bg-[#F2F0EA] py-16 md:py-32">
        <div className="mx-auto max-w-[1280px] px-6 md:px-10">
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
              <p className="mx-auto mt-6 text-[16px] text-[#0E1111]/60 md:text-[20px]">
                Quatro passos entre a sua ideia e um ambiente Roll Door.
              </p>
            </Reveal>
          </div>

          {/* Horizontal 4-step layout with icon circles + arrows */}
          <div className="mt-16 md:mt-24">
            <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 md:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr] md:items-start md:gap-4">
              {[
                { n: "01", title: "Solicite", desc: "Você inicia o contato e conta sobre o seu projeto.", img: step01Img },
                { n: "02", title: "Diagnóstico", desc: "Nossa equipe identifica a melhor solução para o seu ambiente.", img: step02Img },
                { n: "03", title: "Parceiro local", desc: "Você é direcionado a um parceiro especializado da sua região.", img: step03Img },
                { n: "04", title: "Instalação", desc: "Seu projeto ganha vida com a qualidade e o acabamento Roll Door.", img: step04Img },
              ].map((s, i) => (
                <React.Fragment key={s.n}>
                  <Reveal delay={i * 0.08}>
                    <div className="flex flex-col items-center text-center">
                      <div
                        className="relative aspect-square w-full max-w-[240px] overflow-hidden rounded-full"
                        style={{ backgroundColor: "#9CCB3B" }}
                      >
                        <img
                          src={s.img}
                          alt={`Ilustração etapa ${s.n} — ${s.title}`}
                          loading="lazy"
                          width={1024}
                          height={1024}
                          className="absolute inset-0 h-full w-full object-contain p-10"
                        />
                      </div>
                      <div className="mt-6 flex items-center gap-3">
                        <span className="font-display text-xs font-medium uppercase tracking-[0.28em] text-[#2F3D30]/70">{s.n}</span>
                        <span className="h-px w-8 bg-brand-green" />
                      </div>
                      <h3
                        className="mt-3 font-display text-[#0E1111]"
                        style={{ fontWeight: 500, fontSize: "clamp(20px, 1.8vw, 26px)", letterSpacing: "-0.02em" }}
                      >
                        {s.title}
                      </h3>
                      <p className="mt-2 max-w-[260px] text-[16px] leading-relaxed text-[#0E1111]/65 md:text-[18px]">{s.desc}</p>
                    </div>
                  </Reveal>
                  {i < 3 && (
                    <div className="hidden self-center md:flex md:items-center md:justify-center">
                      <svg width="32" height="16" viewBox="0 0 32 16" fill="none" aria-hidden className="text-[#0E1111]/40">
                        <path d="M1 8h28m0 0l-6-6m6 6l-6 6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </section>



      {/* SESSÃO 8 — Depoimentos */}
      <section className="relative overflow-hidden border-t border-white/5 bg-foreground py-16 md:py-32">
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
                <div className="flex h-full flex-col rounded-3xl border border-white/10 bg-white/[0.03] p-6 md:p-8">
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
        className="relative overflow-hidden border-t border-white/5 bg-foreground py-16 md:py-32"
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
                className="relative flex h-full flex-col overflow-hidden rounded-3xl p-6 text-white sm:p-8 md:p-12"
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
                <p className="mt-6 max-w-md text-[16px] leading-relaxed text-white/75 md:text-[19px]">
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
                    <li key={item} className="flex items-start gap-3 text-[16px] text-white/90 md:text-[18px]">
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
                      44 98824-9953
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

    </main>
  );
}
