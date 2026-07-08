import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  ArrowRight,
  ArrowDown,
  Check,
  ChevronDown,
  Wrench,
  Sparkles,
  Award,
  ShieldCheck,
  Users,
  Package,
  Palette,
  Building2,
  Boxes,
  Handshake,
  MessageSquare,
  Send,
  Menu,
  X,
} from "lucide-react";

import logoAsset from "@/assets/rd/logo.webp.asset.json";
import heroAsset from "@/assets/rd/hero.webp.asset.json";
import banner2 from "@/assets/rd/banner2.webp.asset.json";
import banner3 from "@/assets/rd/banner3.webp.asset.json";
import banner4 from "@/assets/rd/banner4.webp.asset.json";
import banner5 from "@/assets/rd/banner5.webp.asset.json";
import proj1 from "@/assets/rd/proj1.webp.asset.json";
import projA from "@/assets/rd/proj_HfU7aT.webp.asset.json";
import projB from "@/assets/rd/proj_KjOj6S.webp.asset.json";
import projC from "@/assets/rd/proj_U6LDX7.webp.asset.json";
import projD from "@/assets/rd/proj_Uib9Yl.webp.asset.json";
import projE from "@/assets/rd/proj_WBCNYK.webp.asset.json";

export const Route = createFileRoute("/")({
  component: RevendedorPage,
});

const BENEFITS = [
  "Produtos exclusivos para o mercado de alto padrão",
  "Marca reconhecida nacionalmente",
  "Suporte técnico especializado",
  "Materiais de marketing",
  "Atendimento dedicado",
  "Capacitação comercial",
  "Indicação de oportunidades de negócio*",
  "Condições comerciais diferenciadas para parceiros",
];

const DIFFERENTIALS = [
  { icon: Wrench, title: "Engenharia para grandes vãos", desc: "Projetos desenvolvidos para entregar elegância, desempenho e segurança." },
  { icon: Sparkles, title: "Design que agrega valor", desc: "Produtos que valorizam qualquer projeto arquitetônico." },
  { icon: Award, title: "Qualidade reconhecida", desc: "Décadas de experiência desenvolvendo soluções premium para o mercado brasileiro." },
  { icon: ShieldCheck, title: "Marca que gera confiança", desc: "Seu cliente já reconhece a qualidade da Roll Door antes mesmo da primeira visita." },
];

const PORTFOLIO = [
  { icon: Boxes, title: "Portas deslizantes" },
  { icon: Building2, title: "Janelas" },
  { icon: Package, title: "Grandes vãos" },
  { icon: Palette, title: "Sistemas de alumínio premium" },
  { icon: Handshake, title: "Soluções personalizadas" },
];

const TESTIMONIALS = [
  { quote: "Desde que começamos a trabalhar com a Roll Door conseguimos agregar muito mais valor aos nossos projetos.", author: "Revendedor Roll Door", role: "Vidraçaria — SP" },
  { quote: "Hoje nossos clientes já chegam pedindo Roll Door.", author: "Revendedor Roll Door", role: "Esquadrias — MG" },
  { quote: "Além do produto, o suporte faz toda diferença.", author: "Revendedor Roll Door", role: "Serralheria — PR" },
];

const STEPS = [
  { n: "01", title: "Preencha o formulário.", desc: "Envie seus dados e conte um pouco sobre a sua empresa." },
  { n: "02", title: "Nossa equipe analisa sua região e o perfil da empresa.", desc: "Avaliamos disponibilidade e sinergia com o programa." },
  { n: "03", title: "Entramos em contato para apresentar a parceria.", desc: "Você recebe todas as condições e materiais do programa." },
  { n: "04", title: "Você inicia sua jornada como Revendedor Premium Roll Door.", desc: "Começa a vender uma das marcas mais desejadas do mercado." },
];

const FAQ = [
  { q: "Preciso já trabalhar com esquadrias?", a: "Sim. O programa é destinado para empresas do segmento, como vidraçarias, serralherias e fabricantes de esquadrias." },
  { q: "Existe exclusividade?", a: "As condições são avaliadas conforme a região e o perfil do parceiro." },
  { q: "Recebo suporte?", a: "Sim. Os parceiros contam com suporte técnico e comercial durante toda a parceria." },
  { q: "Como funciona o processo de aprovação?", a: "Após o cadastro, nossa equipe entra em contato para avaliar o perfil da empresa e apresentar as condições do programa." },
];

const PARTNER_LABELS = [
  "VIDRAÇARIA SAMPA",
  "ALUMÍNIO SUL",
  "ARQ. STUDIO",
  "GLASS PREMIUM",
  "SERRALHERIA REAL",
  "BAHIA VIDROS",
  "ATLÂNTICO",
  "NORTE ESQUADRIAS",
  "VITRAL DESIGN",
  "URBANO VIDROS",
  "TERRA FIRME",
  "MARÍTIMA",
];

function RevendedorPage() {
  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white">
      <Header />
      <Hero />
      <SocialProof />
      <WhyBecome />
      <Differentials />
      <Portfolio />
      <Gallery />
      <Testimonials />
      <HowItWorks />
      <FinalCTA />
      <FaqSection />
      <Footer />
    </div>
  );
}

/* ---------------- Header ---------------- */
function Header() {
  const [open, setOpen] = useState(false);
  const nav = [
    { href: "#programa", label: "O Programa" },
    { href: "#diferenciais", label: "Diferenciais" },
    { href: "#portfolio", label: "Portfólio" },
    { href: "#depoimentos", label: "Depoimentos" },
    { href: "#faq", label: "FAQ" },
  ];
  return (
    <header className="fixed top-0 z-50 w-full border-b border-white/5 bg-[#0d0d0d]/80 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 md:px-8">
        <a href="#top" className="flex items-center">
          <img src={logoAsset.url} alt="Roll Door Company" className="h-8 w-auto" />
        </a>
        <nav className="hidden items-center gap-9 lg:flex">
          {nav.map((l) => (
            <a key={l.href} href={l.href} className="text-sm font-medium tracking-wide text-white/70 transition hover:text-white">
              {l.label}
            </a>
          ))}
        </nav>
        <a
          href="#formulario"
          className="hidden items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold uppercase tracking-wider text-white shadow-[0_10px_30px_-10px] shadow-accent/50 transition hover:bg-accent-light lg:inline-flex"
        >
          Ser revendedor
          <ArrowRight className="h-4 w-4" />
        </a>
        <button className="rounded-md p-2 text-white lg:hidden" onClick={() => setOpen(!open)} aria-label="Menu">
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>
      {open && (
        <div className="border-t border-white/5 bg-[#0d0d0d] px-5 py-6 lg:hidden">
          <div className="flex flex-col gap-4">
            {nav.map((l) => (
              <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="text-base font-medium text-white/80">
                {l.label}
              </a>
            ))}
            <a
              href="#formulario"
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold uppercase tracking-wider text-white"
            >
              Ser revendedor
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

/* ---------------- Hero ---------------- */
function Hero() {
  return (
    <section id="top" className="relative flex min-h-[100svh] items-center overflow-hidden pt-32 md:pt-24">
      <div className="absolute inset-0">
        <img src={heroAsset.url} alt="" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0d0d0d] via-[#0d0d0d]/85 to-[#0d0d0d]/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d] via-transparent to-transparent" />
      </div>
      <div className="relative mx-auto grid w-full max-w-7xl grid-cols-1 gap-14 px-5 pb-24 md:px-8 lg:grid-cols-[1.15fr_1fr] lg:items-center">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-accent-light">
            <span className="h-1.5 w-1.5 rounded-full bg-accent-light" />
            Rede Premium — inscrições abertas
          </span>
          <h1 className="mt-6 font-display text-4xl font-semibold leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-[64px]">
            Torne-se um <span className="text-accent-light">Revendedor Premium</span> Roll Door.
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-white/70 md:text-lg">
            Venda uma das marcas mais desejadas do mercado de esquadrias. Trabalhe com uma marca reconhecida nacionalmente, tenha suporte comercial, receba oportunidades de negócio e ofereça produtos de alto padrão que agregam valor ao seu portfólio.
          </p>

          <ul className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {[
              "Marca consolidada no mercado",
              "Suporte técnico especializado",
              "Produtos de alto padrão",
              "Programa exclusivo para parceiros",
            ].map((b) => (
              <li key={b} className="flex items-start gap-3 text-sm text-white/85">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent">
                  <Check className="h-3 w-3 text-white" strokeWidth={3} />
                </span>
                {b}
              </li>
            ))}
          </ul>

          <div className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
            <a
              href="#formulario"
              className="group inline-flex items-center gap-3 rounded-full bg-accent px-8 py-4 text-sm font-semibold uppercase tracking-[0.15em] text-white shadow-[0_20px_50px_-15px] shadow-accent/60 transition hover:bg-accent-light"
            >
              Quero ser um Revendedor Premium
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </a>
            <div className="text-xs uppercase tracking-widest text-white/50">
              +700 revendas · Presença nacional
            </div>
          </div>
        </div>

        <div className="relative hidden lg:block">
          <div className="relative rounded-3xl border border-white/10 bg-white/[0.03] p-2 backdrop-blur-sm">
            <img src={banner2.url} alt="Projeto Roll Door" className="aspect-[4/5] w-full rounded-2xl object-cover" />
            <div className="absolute -bottom-6 -left-6 flex items-center gap-3 rounded-2xl border border-white/10 bg-[#0d0d0d]/90 px-5 py-4 backdrop-blur">
              <div className="flex -space-x-2">
                {[banner3.url, banner4.url, banner5.url].map((s) => (
                  <img key={s} src={s} alt="" className="h-9 w-9 rounded-full border-2 border-[#0d0d0d] object-cover" />
                ))}
              </div>
              <div className="text-xs">
                <div className="font-semibold text-white">+700 revendas</div>
                <div className="text-white/60">na Rede Roll Door</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Social proof ---------------- */
function SocialProof() {
  const row = [...PARTNER_LABELS, ...PARTNER_LABELS];
  return (
    <section className="border-y border-white/5 bg-[#0a0a0a] py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:items-center lg:gap-20">
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.3em] text-accent-light">Prova social</div>
            <h2 className="mt-4 font-display text-3xl font-semibold leading-tight text-white md:text-4xl">
              Mais de <span className="text-accent-light">700 revendas</span> fazem parte da rede Roll Door.
            </h2>
          </div>
          <p className="text-white/70">
            Há quase quatro décadas desenvolvendo soluções para grandes vãos, a Roll Door é referência em portas e janelas de alto padrão em todo o Brasil. Nossa marca já está presente em milhares de projetos residenciais e comerciais, atendendo arquitetos, construtoras e clientes que buscam design, tecnologia e qualidade.
          </p>
        </div>

        <div className="relative mt-14 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          <div className="flex w-max animate-[leevi-marquee_45s_linear_infinite] gap-6">
            {row.map((label, i) => (
              <div
                key={i}
                className="flex h-16 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] px-8 text-xs font-semibold uppercase tracking-[0.2em] text-white/60"
              >
                {label}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Why Become ---------------- */
function WhyBecome() {
  return (
    <section id="programa" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="max-w-3xl">
          <div className="text-xs font-semibold uppercase tracking-[0.3em] text-accent-light">Por que ser um revendedor</div>
          <h2 className="mt-4 font-display text-4xl font-semibold leading-[1.1] text-white md:text-5xl">
            Muito mais do que um fornecedor. Um <span className="text-accent-light">parceiro para crescer</span> junto com você.
          </h2>
          <p className="mt-6 text-lg text-white/70">
            Ao fazer parte da Rede Premium Roll Door, sua empresa conta com uma estrutura pensada para impulsionar suas vendas.
          </p>
        </div>

        <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {BENEFITS.map((b, i) => (
            <div
              key={b}
              className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] p-6 transition hover:border-accent/40 hover:bg-white/[0.04]"
            >
              <div className="text-4xl font-semibold text-white/10">{String(i + 1).padStart(2, "0")}</div>
              <div className="mt-8 flex items-start gap-3">
                <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent">
                  <Check className="h-3.5 w-3.5 text-white" strokeWidth={3} />
                </span>
                <p className="text-sm font-medium leading-relaxed text-white/90">{b}</p>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-6 text-xs text-white/40">*Disponível conforme critérios do programa.</p>
      </div>
    </section>
  );
}

/* ---------------- Differentials ---------------- */
function Differentials() {
  return (
    <section id="diferenciais" className="relative overflow-hidden bg-[#0a0a0a] py-24 md:py-32">
      <div className="absolute inset-0 opacity-40">
        <div className="absolute -left-40 top-20 h-96 w-96 rounded-full bg-accent/20 blur-[120px]" />
        <div className="absolute -right-32 bottom-10 h-80 w-80 rounded-full bg-accent-dark/30 blur-[100px]" />
      </div>
      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.3em] text-accent-light">Diferenciais</div>
            <h2 className="mt-4 max-w-2xl font-display text-4xl font-semibold leading-[1.1] text-white md:text-5xl">
              Por que o mercado escolhe a <span className="text-accent-light">Roll Door</span>?
            </h2>
          </div>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2">
          {DIFFERENTIALS.map(({ icon: Icon, title, desc }, i) => (
            <div
              key={title}
              className="group relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.04] to-white/[0.01] p-8 md:p-10"
            >
              <div className="flex items-start justify-between">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-accent/15 text-accent-light">
                  <Icon className="h-7 w-7" />
                </div>
                <span className="font-display text-6xl font-semibold text-white/5">0{i + 1}</span>
              </div>
              <h3 className="mt-8 font-display text-2xl font-semibold text-white md:text-3xl">{title}</h3>
              <p className="mt-3 text-white/65">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Portfolio ---------------- */
function Portfolio() {
  return (
    <section id="portfolio" className="py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:items-end">
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.3em] text-accent-light">Portfólio</div>
            <h2 className="mt-4 font-display text-4xl font-semibold leading-[1.1] text-white md:text-5xl">
              Um portfólio completo para atender <span className="text-accent-light">diferentes projetos</span>.
            </h2>
          </div>
          <p className="text-white/70">
            Ofereça soluções para residências, condomínios, empreendimentos e projetos de arquitetura de alto padrão.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
          {PORTFOLIO.map(({ icon: Icon, title }, i) => (
            <div
              key={title}
              className="group relative flex aspect-square flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition hover:border-accent/40 hover:bg-accent/5"
            >
              <span className="text-xs font-semibold uppercase tracking-widest text-white/40">0{i + 1}</span>
              <div>
                <Icon className="h-8 w-8 text-accent-light" />
                <h3 className="mt-3 font-display text-lg font-semibold leading-tight text-white">{title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Gallery ---------------- */
function Gallery() {
  const images = [banner2.url, projB.url, projA.url, proj1.url, banner4.url, projC.url, projD.url, projE.url];
  return (
    <section className="bg-[#0a0a0a] py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <div className="text-xs font-semibold uppercase tracking-[0.3em] text-accent-light">Galeria</div>
          <h2 className="mt-4 font-display text-4xl font-semibold leading-[1.1] text-white md:text-5xl">
            Projetos que <span className="text-accent-light">impressionam</span> seus clientes.
          </h2>
        </div>

        <div className="mt-14 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
          {images.map((src, i) => (
            <div
              key={i}
              className={`group relative overflow-hidden rounded-2xl bg-white/5 ${i === 0 || i === 5 ? "col-span-2 row-span-2 aspect-square" : "aspect-square"}`}
            >
              <img src={src} alt={`Projeto Roll Door ${i + 1}`} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition group-hover:opacity-100" />
            </div>
          ))}
        </div>

        <div className="mx-auto mt-16 max-w-3xl text-center text-lg leading-relaxed text-white/75">
          <p>
            Quando o cliente vê um projeto Roll Door, ele entende imediatamente o diferencial.
          </p>
          <p className="mt-4 font-display text-2xl text-white">
            Você vende muito mais do que esquadrias. Você entrega <span className="text-accent-light">sofisticação, tecnologia e valorização</span> do imóvel.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Testimonials ---------------- */
function Testimonials() {
  return (
    <section id="depoimentos" className="py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="max-w-3xl">
          <div className="text-xs font-semibold uppercase tracking-[0.3em] text-accent-light">Depoimentos</div>
          <h2 className="mt-4 font-display text-4xl font-semibold leading-[1.1] text-white md:text-5xl">
            Quem já é parceiro <span className="text-accent-light">recomenda</span>.
          </h2>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <figure
              key={i}
              className="relative flex flex-col justify-between overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.05] to-white/[0.01] p-8"
            >
              <span className="absolute right-6 top-4 font-display text-8xl leading-none text-accent/30">"</span>
              <blockquote className="relative text-lg leading-relaxed text-white/90">
                {t.quote}
              </blockquote>
              <figcaption className="mt-8 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-accent/20 text-accent-light">
                  <Users className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-white">{t.author}</div>
                  <div className="text-xs text-white/50">{t.role}</div>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- How it works ---------------- */
function HowItWorks() {
  return (
    <section className="relative overflow-hidden bg-[#0a0a0a] py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="max-w-3xl">
          <div className="text-xs font-semibold uppercase tracking-[0.3em] text-accent-light">Como funciona</div>
          <h2 className="mt-4 font-display text-4xl font-semibold leading-[1.1] text-white md:text-5xl">
            Faça parte da Rede Premium em <span className="text-accent-light">poucos passos</span>.
          </h2>
        </div>

        <div className="mt-16 grid gap-4 lg:grid-cols-4">
          {STEPS.map((s, i) => (
            <div key={s.n} className="relative">
              <div className="flex h-full flex-col rounded-3xl border border-white/10 bg-white/[0.03] p-7">
                <div className="flex items-center justify-between">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-accent font-display text-lg font-bold text-white">
                    {s.n}
                  </span>
                  {i < STEPS.length - 1 && (
                    <ArrowRight className="hidden h-5 w-5 text-white/20 lg:block" />
                  )}
                </div>
                <h3 className="mt-6 font-display text-xl font-semibold leading-snug text-white">{s.title}</h3>
                <p className="mt-3 text-sm text-white/60">{s.desc}</p>
              </div>
              {i < STEPS.length - 1 && (
                <div className="my-3 flex justify-center lg:hidden">
                  <ArrowDown className="h-5 w-5 text-white/30" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Final CTA + Form ---------------- */
function FinalCTA() {
  return (
    <section id="formulario" className="relative overflow-hidden py-24 md:py-32">
      <div className="absolute inset-0 opacity-60">
        <div className="absolute left-1/2 top-0 h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-accent/20 blur-[160px]" />
      </div>
      <div className="relative mx-auto grid max-w-7xl gap-14 px-5 md:px-8 lg:grid-cols-[1fr_1.15fr] lg:gap-20">
        <div>
          <div className="text-xs font-semibold uppercase tracking-[0.3em] text-accent-light">Vamos conversar</div>
          <h2 className="mt-4 font-display text-4xl font-semibold leading-[1.05] text-white md:text-5xl lg:text-[52px]">
            Sua empresa está pronta para vender uma das marcas mais reconhecidas do mercado de <span className="text-accent-light">esquadrias premium</span>?
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-white/70">
            Junte-se à Rede Premium Roll Door e ofereça aos seus clientes produtos que unem design, engenharia e alto padrão. Preencha o formulário e fale com um especialista.
          </p>

          <div className="mt-10 grid gap-5">
            {[
              { icon: MessageSquare, title: "Análise personalizada", desc: "Avaliamos sua região e perfil comercial." },
              { icon: Handshake, title: "Condições diferenciadas", desc: "Programa exclusivo para empresas parceiras." },
              { icon: ShieldCheck, title: "Suporte contínuo", desc: "Atendimento técnico e comercial dedicado." },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent/15 text-accent-light">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <div className="font-semibold text-white">{title}</div>
                  <div className="text-sm text-white/60">{desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <LeadForm />
      </div>
    </section>
  );
}

function LeadForm() {
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center rounded-3xl border border-accent/40 bg-gradient-to-br from-accent/10 to-white/[0.02] p-10 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-accent">
          <Check className="h-8 w-8 text-white" strokeWidth={3} />
        </div>
        <h3 className="mt-6 font-display text-2xl font-semibold text-white">Recebemos seu cadastro!</h3>
        <p className="mt-3 max-w-md text-white/70">
          Nossa equipe entrará em contato em breve para apresentar as condições do programa Roll Door Premium.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm md:p-9"
    >
      <div className="mb-6">
        <div className="text-xs font-semibold uppercase tracking-[0.25em] text-accent-light">Formulário</div>
        <h3 className="mt-2 font-display text-2xl font-semibold text-white">Quero fazer parte da Rede Premium</h3>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="Nome" name="nome" required />
        <Field label="Empresa" name="empresa" required />
        <Field label="CNPJ" name="cnpj" required placeholder="00.000.000/0000-00" />
        <Field label="WhatsApp" name="whatsapp" required placeholder="(00) 00000-0000" />
        <Field label="E-mail" name="email" type="email" required />
        <Field label="Cidade" name="cidade" required />
        <Field label="Estado" name="estado" required maxLength={2} placeholder="UF" />
        <SelectField label="Segmento" name="segmento" required options={["Vidraçaria", "Esquadrias", "Serralheria", "Outro"]} />
        <SelectField
          label="Faturamento mensal (opcional)"
          name="faturamento"
          options={["Até R$ 50 mil", "R$ 50 mil – R$ 150 mil", "R$ 150 mil – R$ 500 mil", "Acima de R$ 500 mil"]}
        />
      </div>

      <div className="mt-4">
        <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-white/70">Mensagem</label>
        <textarea
          name="mensagem"
          rows={4}
          className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30"
          placeholder="Conte um pouco sobre sua empresa e sua região de atuação."
        />
      </div>

      <button
        type="submit"
        className="group mt-7 inline-flex w-full items-center justify-center gap-3 rounded-full bg-accent px-8 py-4 text-sm font-semibold uppercase tracking-[0.15em] text-white shadow-[0_20px_50px_-15px] shadow-accent/60 transition hover:bg-accent-light"
      >
        Quero fazer parte da Rede Premium
        <Send className="h-4 w-4 transition group-hover:translate-x-1" />
      </button>

      <p className="mt-4 text-center text-xs text-white/40">
        Ao enviar, você concorda em ser contatado pela equipe Roll Door.
      </p>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  placeholder,
  maxLength,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
  maxLength?: number;
}) {
  return (
    <div>
      <label htmlFor={name} className="mb-2 block text-xs font-semibold uppercase tracking-wider text-white/70">
        {label}
        {required && <span className="text-accent-light"> *</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        maxLength={maxLength}
        className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30"
      />
    </div>
  );
}

function SelectField({
  label,
  name,
  required,
  options,
}: {
  label: string;
  name: string;
  required?: boolean;
  options: string[];
}) {
  return (
    <div>
      <label htmlFor={name} className="mb-2 block text-xs font-semibold uppercase tracking-wider text-white/70">
        {label}
        {required && <span className="text-accent-light"> *</span>}
      </label>
      <select
        id={name}
        name={name}
        required={required}
        defaultValue=""
        className="w-full appearance-none rounded-xl border border-white/10 bg-white/[0.04] bg-[url('data:image/svg+xml;charset=UTF-8,%3csvg%20xmlns%3d%22http%3a//www.w3.org/2000/svg%22%20viewBox%3d%220%200%2020%2020%22%20fill%3d%22%23ffffff88%22%3e%3cpath%20d%3d%22M5.5%207.5L10%2012l4.5-4.5%22%20stroke%3d%22%23ffffff88%22%20stroke-width%3d%221.5%22%20fill%3d%22none%22/%3e%3c/svg%3e')] bg-[right_0.75rem_center] bg-[length:1.25rem] bg-no-repeat px-4 py-3 pr-10 text-sm text-white focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30"
      >
        <option value="" disabled className="bg-[#0d0d0d]">Selecione</option>
        {options.map((o) => (
          <option key={o} value={o} className="bg-[#0d0d0d]">{o}</option>
        ))}
      </select>
    </div>
  );
}

/* ---------------- FAQ ---------------- */
function FaqSection() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="bg-[#0a0a0a] py-24 md:py-32">
      <div className="mx-auto max-w-4xl px-5 md:px-8">
        <div className="text-center">
          <div className="text-xs font-semibold uppercase tracking-[0.3em] text-accent-light">FAQ</div>
          <h2 className="mt-4 font-display text-4xl font-semibold leading-tight text-white md:text-5xl">
            Perguntas frequentes
          </h2>
        </div>

        <div className="mt-14 space-y-3">
          {FAQ.map((f, i) => {
            const isOpen = open === i;
            return (
              <div
                key={f.q}
                className={`overflow-hidden rounded-2xl border transition ${isOpen ? "border-accent/40 bg-white/[0.04]" : "border-white/10 bg-white/[0.02]"}`}
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-6 px-6 py-5 text-left"
                >
                  <span className="font-display text-lg font-semibold text-white md:text-xl">{f.q}</span>
                  <ChevronDown className={`h-5 w-5 shrink-0 text-accent-light transition ${isOpen ? "rotate-180" : ""}`} />
                </button>
                {isOpen && (
                  <div className="px-6 pb-6 text-white/70">{f.a}</div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Footer ---------------- */
function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#0a0a0a] py-14">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-8 px-5 text-center md:flex-row md:justify-between md:text-left">
        <div className="flex items-center gap-4">
          <img src={logoAsset.url} alt="Roll Door Company" className="h-8 w-auto" />
        </div>
        <p className="max-w-md text-sm text-white/50">
          Roll Door Company — soluções em movimento para projetos com bom gosto. Programa Rede Premium para revendedores.
        </p>
        <div className="text-xs uppercase tracking-widest text-white/40">
          © {new Date().getFullYear()} Roll Door
        </div>
      </div>
    </footer>
  );
}
