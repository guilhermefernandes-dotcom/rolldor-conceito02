import { useEffect, useState } from "react";
import { motion, useReducedMotion, type Variants } from "motion/react";

/**
 * "Um novo padrão" — entrada cinematográfica.
 * O título é digitado (typing effect) e reescreve a cada 5s.
 */

const EASE = [0.22, 1, 0.36, 1] as const;

const FULL_TEXT = "UM NOVO PADRÃO";
const TYPE_MS = 90;      // tempo por caractere
const HOLD_MS = 5000;    // tempo com o texto completo antes de reescrever
const ERASE_MS = 35;     // tempo por caractere ao apagar

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

function useTypingLoop(text: string) {
  const [displayed, setDisplayed] = useState("");
  // Quem pede menos movimento vê o título inteiro, sem digitar/apagar em loop
  const reduzir = useReducedMotion();

  useEffect(() => {
    if (reduzir) {
      setDisplayed(text);
      return;
    }
    let cancelled = false;
    let timeoutId: ReturnType<typeof setTimeout>;

    const type = (i: number) => {
      if (cancelled) return;
      if (i <= text.length) {
        setDisplayed(text.slice(0, i));
        timeoutId = setTimeout(() => type(i + 1), TYPE_MS);
      } else {
        timeoutId = setTimeout(() => erase(text.length), HOLD_MS);
      }
    };

    const erase = (i: number) => {
      if (cancelled) return;
      if (i >= 0) {
        setDisplayed(text.slice(0, i));
        timeoutId = setTimeout(() => erase(i - 1), ERASE_MS);
      } else {
        timeoutId = setTimeout(() => type(1), 250);
      }
    };

    type(1);
    return () => {
      cancelled = true;
      clearTimeout(timeoutId);
    };
  }, [text, reduzir]);

  return displayed;
}

export function NovoPadraoPinned() {
  const typed = useTypingLoop(FULL_TEXT);

  // Divide o texto digitado em "UM NOVO " + "PADRÃO" para manter o segundo verde
  const splitIdx = "UM NOVO ".length;
  const first = typed.slice(0, Math.min(splitIdx, typed.length));
  const second = typed.length > splitIdx ? typed.slice(splitIdx) : "";

  return (
    <section
      className="relative overflow-hidden py-28 md:py-40"
      style={{
        background:
          "radial-gradient(120% 90% at 50% 20%, #F7F5EF 0%, #F2F0EA 45%, #ECE9E1 100%)",
      }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(115deg, rgba(14,17,17,0.9) 0 1px, transparent 1px 22px)",
        }}
      />
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
        <motion.span
          variants={fadeUp}
          className="font-display text-[11px] font-medium uppercase tracking-[0.32em] text-brand-green-ink md:text-xs"
        >
          O padrão Roll Door
        </motion.span>

        {/* Título com typing effect — sempre em uma linha, sem overflow */}
        <motion.h2
          variants={fadeUp}
          aria-label={FULL_TEXT}
          className="mt-8 whitespace-nowrap font-display text-[#0E1111] md:mt-10"
          style={{
            fontWeight: 500,
            // ajustado para NUNCA estourar horizontalmente
            fontSize: "clamp(36px, 8.2vw, 150px)",
            lineHeight: 1.05,
            letterSpacing: "-0.03em",
            minHeight: "1.05em",
          }}
        >
          <span aria-hidden>{first}</span>
          <span aria-hidden className="text-[#2F3D30]">
            {second}
          </span>
          {/* Cursor piscando padrão */}
          <span
            aria-hidden
            className="caret-blink ml-[0.06em] inline-block align-middle"
            style={{
              width: "0.055em",
              height: "0.78em",
              background: "#9CCB3B",
              borderRadius: "1px",
              transform: "translateY(-0.05em)",
            }}
          />
        </motion.h2>

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
          <motion.span variants={fadeUp} className="block text-[#0E1111]/60">
            Um novo padrão para viver sua casa.
          </motion.span>
        </motion.h3>

        <motion.div
          variants={paragraphs}
          className="mx-auto mt-10 max-w-2xl space-y-4 text-[17px] leading-relaxed text-[#0E1111]/75 md:mt-14 md:text-[19px]"
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
