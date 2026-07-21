import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "motion/react";

/**
 * Apple-style pinned reveal:
 * - Section is 250vh tall, inner is sticky h-screen
 * - "Um novo padrão" starts huge & centered, shrinks + moves up as user scrolls
 * - Sub-headline + paragraph fade+slide in during the second half
 */
export function NovoPadraoPinned() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const p = useSpring(scrollYProgress, { stiffness: 120, damping: 24, mass: 0.35 });

  // "Um novo padrão" — big -> small
  const bigScale = useTransform(p, [0, 0.5], [1, 0.18]);
  const bigY = useTransform(p, [0, 0.5], ["0vh", "-24vh"]);
  const bigOpacity = useTransform(p, [0.45, 0.6], [1, 0.55]);
  const bigLetter = useTransform(p, [0, 0.5], ["-0.04em", "-0.02em"]);

  // Sub-content — fades/slides in
  const subOpacity = useTransform(p, [0.4, 0.7], [0, 1]);
  const subY = useTransform(p, [0.4, 0.7], [40, 0]);

  const paraOpacity = useTransform(p, [0.55, 0.85], [0, 1]);
  const paraY = useTransform(p, [0.55, 0.85], [40, 0]);

  return (
    <section
      ref={ref}
      className="relative bg-[#F2F0EA]"
      style={{ height: "260vh" }}
    >
      <div className="sticky top-0 flex h-screen w-full items-center justify-center overflow-hidden px-6 md:px-10">
        {/* Huge word */}
        <motion.h2
          style={{
            scale: bigScale,
            y: bigY,
            opacity: bigOpacity,
            letterSpacing: bigLetter,
            fontWeight: 500,
            lineHeight: 0.9,
          }}
          className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 text-center font-display text-[#0E1111]"
        >
          <span
            style={{
              fontSize: "clamp(80px, 22vw, 320px)",
              display: "inline-block",
            }}
          >
            Um novo padrão
          </span>
        </motion.h2>

        {/* Revealed content */}
        <div className="relative mx-auto flex max-w-4xl flex-col items-center text-center">
          <div className="h-[16vh] md:h-[18vh]" />

          <motion.h3
            style={{ opacity: subOpacity, y: subY }}
            className="font-display text-[#0E1111]"
          >
            <span
              style={{
                fontWeight: 500,
                fontSize: "clamp(28px, 5vw, 56px)",
                lineHeight: "1.05",
                letterSpacing: "-0.035em",
                display: "block",
              }}
            >
              Muito mais do que esquadrias.
              <br />
              <span className="text-[#0E1111]/50">
                Um novo padrão para viver sua casa.
              </span>
            </span>
          </motion.h3>

          <motion.div
            style={{ opacity: paraOpacity, y: paraY }}
            className="mx-auto mt-8 max-w-2xl space-y-4 text-[17px] leading-relaxed text-[#0E1111]/70 md:text-[19px]"
          >
            <p>Cada detalhe de um projeto transmite uma sensação.</p>
            <p>
              Com a Roll Door, você cria ambientes mais amplos, iluminados e sofisticados,
              utilizando sistemas desenvolvidos para unir estética, engenharia e desempenho.
            </p>
            <p className="text-[#0E1111]">
              Porque uma casa extraordinária merece soluções à altura.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
