import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "motion/react";

/**
 * Scroll-locked reveal:
 * - Section is pinned (sticky) for ~180vh of scroll
 * - "UM NOVO PADRÃO" starts huge on a single line, shrinks as user scrolls
 * - Sub-headline + paragraphs fade/slide in while the title shrinks
 */
export function NovoPadraoPinned() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const p = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 26,
    mass: 0.3,
  });

  // Title shrinks quickly in the first ~40% of the scroll
  const titleScale = useTransform(p, [0, 0.45], [1, 0.32]);
  const titleY = useTransform(p, [0, 0.45], ["0vh", "-22vh"]);
  const titleOpacity = useTransform(p, [0.7, 0.95], [1, 0]);

  // Revealed content appears as title shrinks
  const subOpacity = useTransform(p, [0.25, 0.55], [0, 1]);
  const subY = useTransform(p, [0.25, 0.55], [40, 0]);

  const paraOpacity = useTransform(p, [0.45, 0.75], [0, 1]);
  const paraY = useTransform(p, [0.45, 0.75], [40, 0]);

  return (
    <section
      ref={ref}
      className="relative bg-[#F2F0EA]"
      style={{ height: "200vh" }}
    >
      <div className="sticky top-0 flex h-screen w-full items-center justify-center overflow-hidden">
        {/* Huge single-line title */}
        <motion.h2
          style={{
            scale: titleScale,
            y: titleY,
            opacity: titleOpacity,
            fontWeight: 500,
            lineHeight: 1,
            letterSpacing: "-0.04em",
          }}
          className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 whitespace-nowrap text-center font-display text-[#0E1111]"
        >
          <span
            style={{
              // 15 chars incl. spaces -> ~6.2vw keeps it on one line at all widths
              fontSize: "clamp(48px, 12vw, 220px)",
              display: "inline-block",
            }}
          >
            UM NOVO PADRÃO
          </span>
        </motion.h2>

        {/* Revealed content — sits below the shrunken title */}
        <div className="relative mx-auto flex max-w-4xl flex-col items-center px-6 text-center md:px-10">
          <div className="h-[14vh] md:h-[16vh]" />

          <motion.h3
            style={{ opacity: subOpacity, y: subY }}
            className="font-display text-[#0E1111]"
          >
            <span
              style={{
                fontWeight: 500,
                fontSize: "clamp(24px, 4.2vw, 48px)",
                lineHeight: "1.08",
                letterSpacing: "-0.03em",
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
            className="mx-auto mt-6 max-w-2xl space-y-3 text-[17px] leading-relaxed text-[#0E1111]/70 md:mt-8 md:text-[19px]"
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
