import { motion, type Variants } from "motion/react";

const EASE = [0.22, 1, 0.36, 1] as const;

const ANTES = [
  "Produção complexa",
  "Compra de matéria-prima",
  "Desperdícios",
  "Necessidade de equipe maior",
  "Mais risco de erro e retrabalho",
];

const DEPOIS = [
  "Produto praticamente pronto",
  "Suporte especializado",
  "Instalação mais objetiva",
  "Padrão premium",
  "Mais argumentos para vender",
];

const list: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.25 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 14, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: EASE },
  },
};

export function AntesDepois() {
  return (
    <section className="relative overflow-hidden bg-secondary/60 py-24 md:py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(115deg, rgba(14,17,17,0.9) 0 1px, transparent 1px 22px)",
        }}
      />

      <div className="relative mx-auto max-w-[1400px] px-5 md:px-10">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={list}
          className="mx-auto max-w-3xl text-center"
        >
          <motion.span
            variants={item}
            className="font-display text-[11px] font-medium uppercase tracking-[0.32em] text-brand-green-ink md:text-xs"
          >
            Na prática
          </motion.span>
          <motion.h2
            variants={item}
            className="mt-5 font-display text-4xl font-medium leading-[1.05] tracking-tight md:text-6xl"
          >
            O que muda para a{" "}
            <span className="relative inline-block whitespace-nowrap">
              <span className="relative z-10">sua empresa?</span>
              <motion.span
                aria-hidden
                variants={{
                  hidden: { scaleX: 0 },
                  show: {
                    scaleX: 1,
                    transition: { duration: 0.8, ease: EASE, delay: 0.35 },
                  },
                }}
                className="absolute inset-x-0 bottom-1 h-[0.3em] origin-left rounded-sm bg-brand-green/40"
              />
            </span>
          </motion.h2>
          <motion.p
            variants={item}
            className="mt-6 text-lg leading-relaxed text-muted-foreground md:text-xl"
          >
            Ao se tornar Revenda Premium Roll Door, sua empresa passa a contar com uma
            solução que reduz etapas, simplifica a operação e ajuda a elevar o padrão dos
            projetos atendidos.
          </motion.p>
        </motion.div>

        {/* Comparativo */}
        <div className="relative mt-16 grid gap-6 md:mt-20 md:grid-cols-[1fr_auto_1fr] md:items-stretch md:gap-8">
          {/* ANTES */}
          <motion.div
            initial={{ opacity: 0, x: -40, rotateY: 8 }}
            whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, ease: EASE }}
            className="relative min-w-0 overflow-hidden rounded-3xl border border-foreground/10 bg-white/60 p-8 backdrop-blur md:p-10"
          >
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-[0.06]"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(45deg, rgba(14,17,17,1) 0 1px, transparent 1px 10px)",
              }}
            />
            <span className="relative font-display text-xs font-medium uppercase tracking-[0.32em] text-foreground/60">
              Antes
            </span>
            <motion.ul
              variants={list}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              className="relative mt-8 space-y-5"
            >
              {ANTES.map((t) => (
                <motion.li
                  key={t}
                  variants={item}
                  className="flex items-start gap-3 text-xl leading-snug text-foreground/65 md:text-2xl"
                >
                  <span
                    aria-hidden
                    className="mt-[0.6em] h-px w-5 shrink-0 bg-foreground/25"
                  />
                  <span className="line-through decoration-foreground/20 decoration-1">
                    {t}
                  </span>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>

          {/* X animado */}
          <div className="flex items-center justify-center md:px-2">
            <motion.svg
              viewBox="0 0 100 100"
              className="h-14 w-14 md:h-20 md:w-20"
              fill="none"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.6 }}
            >
              {[
                "M12 12 L88 88",
                "M88 12 L12 88",
              ].map((d, i) => (
                <motion.path
                  key={d}
                  d={d}
                  stroke="currentColor"
                  strokeWidth={3}
                  strokeLinecap="round"
                  className="text-foreground/70"
                  variants={{
                    hidden: { pathLength: 0, opacity: 0 },
                    show: {
                      pathLength: 1,
                      opacity: 1,
                      transition: { duration: 0.7, ease: EASE, delay: 0.3 + i * 0.18 },
                    },
                  }}
                />
              ))}
            </motion.svg>
          </div>

          {/* COM A ROLL DOOR */}
          <motion.div
            initial={{ opacity: 0, x: 40, rotateY: -8 }}
            whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.1 }}
            className="relative min-w-0 overflow-hidden rounded-3xl border border-brand-green/40 bg-foreground p-8 text-white shadow-[0_40px_80px_-50px_rgba(14,17,17,0.8)] md:p-10"
          >
            <motion.div
              aria-hidden
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 1.2, ease: EASE, delay: 0.35 }}
              className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full"
              style={{
                background:
                  "radial-gradient(circle, rgba(156,203,59,0.35) 0%, transparent 70%)",
              }}
            />
            <span className="relative font-display text-xs font-medium uppercase tracking-[0.32em] text-brand-green">
              Com a Roll Door
            </span>
            <motion.ul
              variants={list}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              className="relative mt-8 space-y-5"
            >
              {DEPOIS.map((t) => (
                <motion.li
                  key={t}
                  variants={item}
                  className="flex items-start gap-3 text-xl leading-snug text-white md:text-2xl"
                >
                  <span
                    aria-hidden
                    className="mt-[0.55em] h-1.5 w-1.5 shrink-0 rounded-full bg-brand-green"
                  />
                  <span>{t}</span>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
