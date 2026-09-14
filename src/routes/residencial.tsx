import { createFileRoute } from "@tanstack/react-router";
import { UtmCapture } from "@/components/UtmCapture";
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
} from "lucide-react";
import heroPortaBandeirasAsset from "@/assets/hero-porta-bandeiras.jpg.asset.json";
import seloBrasil from "@/assets/selo-image-20.png.asset.json";
import seloFalcaoBauer from "@/assets/selo-image-21.png.asset.json";
import seloUniversidadeSom from "@/assets/selo-image-22.png.asset.json";
import seloAbravidro from "@/assets/selo-image-23.png.asset.json";
import project1Asset from "@/assets/rd-project-2.webp.asset.json";
import project2Asset from "@/assets/rd-project-3.webp.asset.json";
import project3Asset from "@/assets/rd-project-6.webp.asset.json";
import project4Asset from "@/assets/rd-project-4.webp.asset.json";
import project5Asset from "@/assets/rd-project-5.webp.asset.json";
import prodCamaraoAsset from "@/assets/rd-real-camarao.webp.asset.json";
import prodPivotanteAsset from "@/assets/rd-real-pivotante.webp.asset.json";
import prodPersianaAsset from "@/assets/rd-real-persiana.webp.asset.json";
import prodSystemsAsset from "@/assets/rd-real-systems.webp.asset.json";
import prodSlimAsset from "@/assets/rd-real-slim.webp.asset.json";
import prodInsideAsset from "@/assets/rd-real-inside.webp.asset.json";
import galCamarao1 from "@/assets/rd-gal-camarao1.webp.asset.json";
import galGiro2 from "@/assets/rd-gal-giro2.webp.asset.json";
import galGiro3 from "@/assets/rd-gal-giro3.webp.asset.json";
import galPivo2 from "@/assets/rd-gal-pivo2.webp.asset.json";
import galPivo3 from "@/assets/rd-gal-pivo3.webp.asset.json";
import galPers2 from "@/assets/rd-gal-pers2.webp.asset.json";
import galPers3 from "@/assets/rd-gal-pers3.webp.asset.json";
import galLite3 from "@/assets/rd-gal-lite3.webp.asset.json";
import galLite4 from "@/assets/rd-gal-lite4.webp.asset.json";
import galSlim2 from "@/assets/rd-gal-slim2.webp.asset.json";
import galSlim3 from "@/assets/rd-gal-slim3.webp.asset.json";
import galInside2 from "@/assets/rd-gal-inside2.webp.asset.json";
import premCamarao from "@/assets/rd-premium-camarao.jpg.asset.json";
import premGiro from "@/assets/rd-premium-giro.jpg.asset.json";
import premLitePlus from "@/assets/rd-premium-liteplus.jpg.asset.json";
import premConvencional from "@/assets/rd-premium-convencional.jpg.asset.json";
import premAngra from "@/assets/rd-premium-angra.jpg.asset.json";

const heroImg = heroPortaBandeirasAsset.url;
import logoAsset from "@/assets/roll-door-logo.png.asset.json";
import step01Img from "@/assets/step-01-solicite.webp";
import step02Img from "@/assets/step-02-diagnostico.webp";
import step03Img from "@/assets/step-03-parceiro.webp";
import step04Img from "@/assets/step-04-instalacao.webp";
import { FormularioCliente } from "@/components/FormularioCliente";
import { StatsScrollLock, type Step as ScrollStep } from "@/components/StatsScrollLock";


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


const GTM_HEAD_SCRIPT = `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-P2GL2SVF');`;

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
      scripts: [{ children: GTM_HEAD_SCRIPT }],
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
      className={`group relative inline-flex h-16 items-center justify-center gap-2 rounded-2xl px-10 font-display text-lg font-semibold text-white transition-transform hover:-translate-y-0.5 sm:h-[68px] sm:px-14 sm:text-xl ${className}`}
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

type CategoriaId = "portas" | "janelas" | "grandes-vaos" | "solucoes-internas";

const CATEGORIAS: { id: CategoriaId; label: string }[] = [
  { id: "portas", label: "Portas" },
  { id: "janelas", label: "Janelas" },
  { id: "grandes-vaos", label: "Grandes Vãos" },
  { id: "solucoes-internas", label: "Soluções Internas" },
];

type Produto = {
  id: string;
  nome: string;
  tag: string;
  cats: CategoriaId[];
  fotos: string[];
};

// A primeira foto de cada produto é a capa exibida na visão geral.
const PRODUTOS: Produto[] = [
  {
    id: "camarao",
    nome: "Porta Camarão",
    tag: "Integração total",
    cats: ["portas", "grandes-vaos"],
    fotos: [premCamarao.url, galCamarao1.url, prodCamaraoAsset.url],
  },
  {
    id: "giro",
    nome: "Porta de Giro",
    tag: "Clássica e versátil",
    cats: ["portas"],
    fotos: [premGiro.url, galGiro2.url, galGiro3.url],
  },
  {
    id: "pivotante",
    nome: "Porta Pivotante",
    tag: "Alto padrão",
    cats: ["portas"],
    fotos: [prodPivotanteAsset.url, galPivo2.url, galPivo3.url],
  },
  {
    id: "persiana",
    nome: "Persiana Integrada Hiperventilada",
    tag: "Conforto e automação",
    cats: ["janelas"],
    fotos: [prodPersianaAsset.url, galPers3.url, galPers2.url],
  },
  {
    id: "systems",
    nome: "Roll Door Systems",
    tag: "Vãos amplos",
    cats: ["grandes-vaos"],
    fotos: [prodSystemsAsset.url, premConvencional.url],
  },
  {
    id: "lite",
    nome: "Roll Door Lite",
    tag: "Linha residencial",
    cats: ["grandes-vaos", "portas"],
    fotos: [premLitePlus.url, galLite3.url, galLite4.url, premAngra.url],
  },
  {
    id: "slim",
    nome: "Roll Door Slim",
    tag: "Perfis minimalistas",
    cats: ["grandes-vaos"],
    fotos: [prodSlimAsset.url, galSlim3.url, galSlim2.url],
  },
  {
    id: "inside",
    nome: "Inside Door Kit",
    tag: "Ambientes internos",
    cats: ["solucoes-internas"],
    fotos: [galInside2.url, prodInsideAsset.url],
  },
];

// Mini ícone de porta (desenho em SVG) usado nos itens do dropdown
function IconePorta({ ativo }: { ativo: boolean }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden
      className="shrink-0"
    >
      <rect
        x="2"
        y="1.5"
        width="12"
        height="13"
        rx="1.5"
        stroke="currentColor"
        strokeWidth="1.4"
      />
      <line x1="8" y1="1.5" x2="8" y2="14.5" stroke="currentColor" strokeWidth="1.1" />
      <circle cx="6" cy="8" r="0.9" fill="currentColor" opacity={ativo ? 1 : 0.7} />
    </svg>
  );
}

// Produto em destaque de cada categoria, exibido na visão "Todos"
const DESTAQUES: Record<CategoriaId, string> = {
  portas: "camarao",
  janelas: "persiana",
  "grandes-vaos": "systems",
  "solucoes-internas": "inside",
};

function ProdutosFiltraveis() {
  // selecao: "todos" ou o id de um produto
  const [selecao, setSelecao] = useState<string>("todos");
  const [categoriaAtiva, setCategoriaAtiva] = useState<CategoriaId | null>(null);
  const [dropdownAberto, setDropdownAberto] = useState<CategoriaId | null>(null);
  const [fotoAberta, setFotoAberta] = useState<{ src: string; nome: string } | null>(null);

  const produtoAtivo =
    selecao !== "todos" ? PRODUTOS.find((p) => p.id === selecao) ?? null : null;

  // Fotos exibidas: capas dos 4 destaques (Todos) ou todas as fotos do produto
  const fotos: { src: string; nome: string; id: string; idx: number }[] = produtoAtivo
    ? produtoAtivo.fotos.map((src, idx) => ({
        src,
        nome: produtoAtivo.nome,
        id: produtoAtivo.id,
        idx,
      }))
    : CATEGORIAS.flatMap((c) => {
        const p = PRODUTOS.find((prod) => prod.id === DESTAQUES[c.id]);
        return p ? [{ src: p.fotos[0], nome: p.nome, id: p.id, idx: 0 }] : [];
      });

  React.useEffect(() => {
    if (!fotoAberta) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setFotoAberta(null);
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [fotoAberta]);

  const aoClicarTodos = () => {
    setSelecao("todos");
    setCategoriaAtiva(null);
    setDropdownAberto(null);
  };

  // Clicar numa categoria só abre/fecha o dropdown — a grade não muda
  const aoClicarCategoria = (c: CategoriaId) => {
    setDropdownAberto((atual) => (atual === c ? null : c));
  };

  const escolherProduto = (id: string, c: CategoriaId) => {
    setSelecao(id);
    setCategoriaAtiva(c);
    setDropdownAberto(null);
  };

  const produtosDoDropdown = dropdownAberto
    ? PRODUTOS.filter((p) => p.cats.includes(dropdownAberto))
    : [];

  const todosAtivo = selecao === "todos";

  return (
    <div>
      {/* ── Filtro: "Todos" em largura total + categorias estilo porta ── */}
      <div className="mt-9 md:mt-12">
        <div className="mx-auto max-w-xl md:max-w-3xl">
          <div aria-hidden className="mb-2 hidden items-center gap-1.5 md:flex">
            <span className="h-[3px] flex-1 rounded-full bg-foreground/15" />
            <span className="h-1.5 w-1.5 rounded-full bg-foreground/25" />
            <span className="h-[3px] w-10 rounded-full bg-foreground/15" />
            <span className="h-1.5 w-1.5 rounded-full bg-foreground/25" />
            <span className="h-[3px] flex-1 rounded-full bg-foreground/15" />
          </div>

          {/* Todos — container 100% acima das categorias */}
          <button
            type="button"
            onClick={aoClicarTodos}
            aria-pressed={todosAtivo}
            className={`relative h-12 w-full overflow-hidden rounded-xl border-2 px-4 font-display text-[14px] font-medium transition-colors duration-300 md:h-14 md:text-[16px] ${
              todosAtivo
                ? "border-brand-green text-white"
                : "border-foreground/20 bg-white/70 text-foreground/70 hover:border-foreground/45 hover:text-foreground"
            }`}
          >
            {todosAtivo && (
              <motion.span
                layoutId="painel-categoria"
                aria-hidden
                className="absolute inset-0 bg-brand-green"
                transition={{ type: "spring", stiffness: 420, damping: 38 }}
              />
            )}
            <span
              aria-hidden
              className={`pointer-events-none absolute inset-[4px] rounded-lg border transition-colors duration-300 ${
                todosAtivo ? "border-white/35" : "border-foreground/10"
              }`}
            />
            {/* puxador central de porta de correr dupla */}
            <span
              aria-hidden
              className={`pointer-events-none absolute left-1/2 top-1/2 hidden h-5 w-[3px] -translate-x-6 -translate-y-1/2 rounded-full transition-colors duration-300 md:block ${
                todosAtivo ? "bg-white/60" : "bg-foreground/15"
              }`}
            />
            <span className="relative z-10">Todos</span>
          </button>

          {/* Categorias — abrem o dropdown de produtos */}
          <div className="mt-2 grid grid-cols-2 gap-2 md:grid-cols-4 md:gap-3">
            {CATEGORIAS.map((c) => {
              const ativo = categoriaAtiva === c.id && !todosAtivo;
              const aberto = dropdownAberto === c.id;
              return (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => aoClicarCategoria(c.id)}
                  aria-pressed={ativo}
                  aria-expanded={aberto}
                  className={`relative h-12 overflow-hidden rounded-xl border-2 px-3 font-display text-[13px] font-medium transition-colors duration-300 md:h-14 md:px-4 md:text-[15px] ${
                    ativo
                      ? "border-brand-green text-white"
                      : aberto
                        ? "border-brand-green bg-white text-foreground"
                        : "border-foreground/20 bg-white/70 text-foreground/70 hover:border-foreground/45 hover:text-foreground"
                  }`}
                >
                  {ativo && (
                    <motion.span
                      layoutId="painel-categoria"
                      aria-hidden
                      className="absolute inset-0 bg-brand-green"
                      transition={{ type: "spring", stiffness: 420, damping: 38 }}
                    />
                  )}
                  <span
                    aria-hidden
                    className={`pointer-events-none absolute inset-[4px] rounded-lg border transition-colors duration-300 ${
                      ativo ? "border-white/35" : "border-foreground/10"
                    }`}
                  />
                  <span className="relative z-10 inline-flex items-center gap-1.5">
                    {c.label}
                    <motion.span
                      aria-hidden
                      animate={{ rotate: aberto ? 180 : 0 }}
                      transition={{ duration: 0.25 }}
                      className="inline-flex"
                    >
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                        <path
                          d="M1.5 3.5L5 7l3.5-3.5"
                          stroke="currentColor"
                          strokeWidth="1.6"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </motion.span>
                  </span>
                </button>
              );
            })}
          </div>

          {/* Dropdown de produtos — desce abaixo dos botões, nunca corta */}
          <AnimatePresence>
            {dropdownAberto && (
              <motion.div
                key={dropdownAberto}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                style={{ transformOrigin: "top center" }}
                className="overflow-hidden"
              >
                <div className="mx-auto mt-2 w-full max-w-2xl rounded-2xl border-2 border-brand-green/60 bg-white p-2 shadow-xl md:mt-3">
                  <div className="grid grid-cols-1 gap-1 sm:grid-cols-2">
                    {produtosDoDropdown.map((p) => {
                      const selecionado = selecao === p.id;
                      return (
                        <button
                          key={p.id}
                          type="button"
                          onClick={() => escolherProduto(p.id, dropdownAberto)}
                          className={`flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-left font-display text-[13px] font-medium transition-colors md:text-[14px] ${
                            selecionado
                              ? "bg-brand-green text-white"
                              : "text-foreground/75 hover:bg-brand-green/10 hover:text-foreground"
                          }`}
                        >
                          <IconePorta ativo={selecionado} />
                          <span className="flex-1 leading-snug">{p.nome}</span>
                          <span
                            className={`rounded-full px-1.5 py-0.5 text-[10px] font-semibold ${
                              selecionado
                                ? "bg-white/25 text-white"
                                : "bg-foreground/8 text-foreground/50"
                            }`}
                          >
                            {p.fotos.length}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Cabeçalho da seleção atual */}
      <div className="mt-8 flex flex-wrap items-end justify-between gap-3 md:mt-10">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={produtoAtivo ? produtoAtivo.id : "todos"}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.25 }}
          >
            <span className="font-display text-[10px] font-medium uppercase tracking-[0.18em] text-brand-green md:text-[11px]">
              {produtoAtivo ? produtoAtivo.tag : "Destaques"}
            </span>
            <h3
              className="font-display text-[22px] font-medium text-foreground md:text-[30px]"
              style={{ letterSpacing: "-0.02em" }}
            >
              {produtoAtivo ? produtoAtivo.nome : "Um destaque de cada linha"}
              <span className="ml-2 align-middle font-sans text-[13px] font-normal text-foreground/50 md:text-[14px]">
                {fotos.length} fotos
              </span>
            </h3>
          </motion.div>
        </AnimatePresence>
        {produtoAtivo && (
          <button
            type="button"
            onClick={aoClicarTodos}
            className="font-display text-[13px] font-medium text-foreground/60 underline-offset-4 transition-colors hover:text-brand-green hover:underline md:text-[14px]"
          >
            ← Voltar para Todos
          </button>
        )}
      </div>

      {/* ── Galeria: altura natural no mobile, 9:16 uniforme no desktop ── */}
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 md:mt-8 lg:grid-cols-4">
        <AnimatePresence mode="popLayout" initial={false}>
          {fotos.map((f, i) => (
            <motion.figure
              key={`${f.id}-${f.idx}`}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.35, delay: i * 0.04, ease: [0.22, 1, 0.36, 1] }}
              className="group relative overflow-hidden rounded-2xl bg-foreground/5 shadow-sm ring-1 ring-black/5 sm:aspect-[9/16] md:rounded-3xl"
            >
              <button
                type="button"
                onClick={() => setFotoAberta({ src: f.src, nome: f.nome })}
                aria-label={`Ampliar foto de ${f.nome}`}
                className="block h-full w-full"
              >
                <img
                  src={f.src}
                  alt={`${f.nome} — foto ${f.idx + 1}`}
                  loading="lazy"
                  decoding="async"
                  className="block h-auto w-full transition-transform duration-500 group-hover:scale-[1.04] sm:absolute sm:inset-0 sm:h-full sm:object-cover"
                />
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/55 to-transparent"
                />
                <span className="pointer-events-none absolute bottom-3 left-3 right-3 text-left font-display text-[12px] font-medium leading-snug text-white md:text-[13px]">
                  {f.nome}
                </span>
              </button>
            </motion.figure>
          ))}
        </AnimatePresence>
      </div>

      {/* Lightbox — foto ampliada */}
      <AnimatePresence>
        {fotoAberta && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setFotoAberta(null)}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm md:p-10"
          >
            <button
              type="button"
              onClick={() => setFotoAberta(null)}
              aria-label="Fechar foto"
              className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur transition-colors hover:bg-white/30"
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
                <path
                  d="M4 4l10 10M14 4L4 14"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>
            <motion.img
              key={fotoAberta.src}
              src={fotoAberta.src}
              alt={fotoAberta.nome}
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="max-h-[88vh] max-w-full rounded-xl object-contain shadow-2xl"
            />
            <div className="pointer-events-none absolute bottom-5 left-1/2 -translate-x-1/2 rounded-full bg-black/55 px-4 py-1.5 font-display text-[13px] font-medium text-white backdrop-blur-sm">
              {fotoAberta.nome}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CTA da seção */}
      <div className="mt-10 flex justify-center md:mt-14">
        <a
          href="#cta-final"
          className="inline-flex h-14 w-full items-center justify-center gap-2 rounded-2xl px-10 font-display text-lg font-semibold text-white shadow-[0_18px_40px_-12px_rgba(151,191,76,0.5)] transition-transform hover:-translate-y-0.5 sm:w-auto sm:px-12 md:h-16 md:text-xl"
          style={{ background: "#9CCB3B" }}
        >

          Solicitar orçamento
          <ArrowRight className="h-5 w-5" />
        </a>
      </div>
    </div>
  );
}

function GtmBody() {
  return (
    <noscript>
      <iframe
        src="https://www.googletagmanager.com/ns.html?id=GTM-P2GL2SVF"
        height="0"
        width="0"
        style={{ display: "none", visibility: "hidden" }}
      />
    </noscript>
  );
}

function LandingCliente() {
  const { scrollY } = useScroll();
  const heroPad = useTransform(scrollY, [0, 120], [13, 0]);
  const heroRadius = useTransform(scrollY, [0, 120], [28, 0]);

  return (
    <>
      <GtmBody />
      <main className="min-h-screen bg-foreground text-white antialiased">
        <UtmCapture />

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
                Esquadrias alto padrão e portas de alumínio sob medida para mais amplitude e
                integração.
              </p>
            </Reveal>

            <Reveal delay={0.5}>
              <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
                <CtaPrimary href="#cta-final" className="w-full font-semibold sm:w-auto">
                  Solicitar orçamento
                </CtaPrimary>
                <a
                  href="#produtos"
                  className="inline-flex h-14 w-full items-center justify-center gap-2 rounded-2xl border border-white/45 bg-white/10 px-8 font-display text-base font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/20 sm:h-[56px] sm:w-auto sm:px-10 sm:text-lg"
                >
                  Ver produtos
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
          <Reveal>
            <div
              className="relative overflow-hidden rounded-3xl p-4 text-white sm:p-8 md:p-12"
              style={{
                background:
                  "linear-gradient(160deg, oklch(0.22 0.005 250) 0%, oklch(0.16 0.005 250) 45%, oklch(0.11 0.005 250) 100%)",
              }}
            >
              <div
                className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full opacity-30 blur-3xl"
                style={{ background: "#9CCB3B" }}
              />
              <div className="relative grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-14">
                <div className="flex flex-col">
                  <span className="font-display text-xs font-medium uppercase tracking-[0.24em] text-brand-green">
                    Fale com um especialista
                  </span>
                  <h2 className="mt-3 font-display text-3xl font-medium leading-[1.05] tracking-tight text-white md:text-5xl">
                    Seu projeto merece uma solução à altura.
                  </h2>
                  <p className="mt-4 max-w-md text-[16px] leading-relaxed text-white/70 md:text-[18px]">
                    Solicite um atendimento e descubra como as soluções Roll Door podem transformar sua residência com design, tecnologia e sofisticação.
                  </p>

                  <div className="my-6 hidden h-px w-full bg-white/15 lg:my-8 lg:block" />

                  <ul className="hidden flex-col gap-4 lg:flex">
                    {[
                      "Atendimento personalizado para seu projeto",
                      "Indicação do parceiro Roll Door da sua região",
                      "Suporte técnico especializado",
                    ].map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-3 text-[16px] text-white/90 md:text-[18px]"
                      >
                        <Check className="mt-1 h-5 w-5 shrink-0 text-brand-green" strokeWidth={2.5} />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-10 hidden grid-cols-1 gap-3 sm:grid-cols-2 lg:grid">
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

                <FormularioCliente />
              </div>
            </div>
          </Reveal>
        </div>
      </section>


    </main>
    </>
  );
}
