import { motion, type Variants } from "motion/react";

/**
 * "Um novo padrão" — entrada cinematográfica, sem scroll-lock.
 * Animações disparadas pela entrada na viewport (whileInView).
 */

const EASE = [0.22, 1, 0.36, 1] as const;

const container: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.15 },
  },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE },
  },
};

const paragraphs: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
};

export function NovoPadraoPinned() {
  return (
    <section
      className="relative overflow-hidden py-28 md:py-40"
      style={{
        background:
          "radial-gradient(120% 90% at 50% 20%, #F7F5EF 0%, #F2F0EA 45%, #ECE9E1 100%)",
      }}
    >
      {/* Textura diagonal muito sutil, coerente com o resto da LP */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(115deg, rgba(14,17,17,0.9) 0 1px, transparent 1px 22px)",
        }}
      />
      {/* Vinheta suave nas bordas verticais */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(14,17,17,0.05), transparent 15%, transparent 85%, rgba(14,17,17,0.05))",
        }}
      />

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.35 }}
        className="relative z-10 mx-auto flex max-w-[1400px] flex-col items-center px-6 text-center md:px-10"
      >
        {/* Selo */}
        <motion.span
          variants={fadeUp}
          className="font-display text-[11px] font-medium uppercase tracking-[0.32em] text-brand-green md:text-xs"
        >
          O padrão Roll Door
        </motion.span>

        {/* Título com mask reveal */}
        <div className="mt-8 overflow-hidden md:mt-10">
          <motion.h2
            variants={{
              hidden: { clipPath: "inset(0 0 100% 0)", y: "0.15em", filter: "blur(6px)" },
              visible: {
                clipPath: "inset(0 0 0% 0)",
                y: "0em",
                filter: "blur(0px)",
                transition: { duration: 1.05, ease: EASE, delay: 0.05 },
              },
            }}
            className="whitespace-nowrap font-display text-[#0E1111]"
            style={{
              fontWeight: 500,
              fontSize: "clamp(42px, 11vw, 200px)",
              lineHeight: 1,
              letterSpacing: "-0.03em",
            }}
          >
            UM NOVO <span className="text-[#2F3D30]/80">PADRÃO</span>
            <motion.span
              aria-hidden
              className="ml-[0.12em] inline-block align-middle"
              style={{
                width: "0.06em",
                height: "0.78em",
                background: "#9CCB3B",
                borderRadius: "1px",
              }}
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: [0, 1, 1, 0.2, 1],
                  transition: { duration: 1.6, delay: 1.0, times: [0, 0.2, 0.5, 0.75, 1], repeat: Infinity, repeatType: "loop", repeatDelay: 0.4 },
                },
              }}
            />
          </motion.h2>
        </div>

        {/* Divider que expande */}
        <motion.div
          variants={{
            hidden: { scaleX: 0, opacity: 0 },
            visible: {
              scaleX: 1,
              opacity: 1,
              transition: { duration: 0.9, ease: EASE, delay: 0.2 },
            },
          }}
          style={{ transformOrigin: "center" }}
          className="mt-10 h-px w-24 bg-[#0E1111]/25 md:mt-14 md:w-40"
        />

        {/* Sub-headline em duas linhas */}
        <motion.h3
          variants={paragraphs}
          className="mt-10 font-display text-[#0E1111] md:mt-14"
          style={{
            fontWeight: 500,
            fontSize: "clamp(24px, 4.2vw, 48px)",
            lineHeight: "1.1",
            letterSpacing: "-0.03em",
          }}
        >
          <motion.span variants={fadeUp} className="block">
            Muito mais do que esquadrias.
          </motion.span>
          <motion.span variants={fadeUp} className="block text-[#0E1111]/50">
            Um novo padrão para viver sua casa.
          </motion.span>
        </motion.h3>

        {/* Parágrafos */}
        <motion.div
          variants={paragraphs}
          className="mx-auto mt-10 max-w-2xl space-y-4 text-[17px] leading-relaxed text-[#0E1111]/70 md:mt-14 md:text-[19px]"
        >
          <motion.p variants={fadeUp}>
            Cada detalhe de um projeto transmite uma sensação.
          </motion.p>
          <motion.p variants={fadeUp}>
            Com a Roll Door, você cria ambientes mais amplos, iluminados e sofisticados,
            utilizando sistemas desenvolvidos para unir estética, engenharia e desempenho.
          </motion.p>
          <motion.p
            variants={fadeUp}
            className="text-[#0E1111]"
            style={{ fontWeight: 500 }}
          >
            Porque uma casa{" "}
            <span className="relative inline-block">
              <span className="relative z-10">extraordinária</span>
              <motion.span
                aria-hidden
                className="absolute inset-x-0 bottom-0 h-[0.35em] rounded-sm"
                style={{ background: "#9CCB3B", opacity: 0.35, transformOrigin: "left" }}
                variants={{
                  hidden: { scaleX: 0 },
                  visible: {
                    scaleX: 1,
                    transition: { duration: 0.7, ease: EASE, delay: 0.35 },
                  },
                }}
              />
            </span>{" "}
            merece soluções à altura.
          </motion.p>
        </motion.div>
      </motion.div>
    </section>
  );
}
