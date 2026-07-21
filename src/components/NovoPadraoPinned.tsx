import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "motion/react";

/**
 * Scroll-locked reveal:
 * - Section is pinned (sticky) for a longer scroll window
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

  // Title shrinks early, then the section keeps the revealed copy locked on screen
  const titleScale = useTransform(p, [0, 0.32], [1, 0.3]);
  const titleY = useTransform(p, [0, 0.32], ["0vh", "-20vh"]);
  const titleOpacity = useTransform(p, [0.78, 0.94], [1, 0]);

  // Revealed content appears earlier and stays visible for most of the lock
  const subOpacity = useTransform(p, [0.18, 0.34], [0, 1]);
  const subY = useTransform(p, [0.18, 0.34], [36, 0]);

  const paraOpacity = useTransform(p, [0.28, 0.46, 0.84, 0.96], [0, 1, 1, 0]);
  const contentOpacity = useTransform(p, [0.18, 0.36, 0.86, 0.96], [0, 1, 1, 0]);
  const contentY = useTransform(p, [0.18, 0.36], [72, 0]);
  const stageTop = useTransform(p, [0, 0.001, 0.999, 1], ["100%", "0%", "0%", "-100%"]);

  return (
    <section
      ref={ref}
      data-novo-padrao-section
      className="relative bg-[#F2F0EA]"
      style={{ height: "380vh" }}
    >
      <motion.div
        data-novo-padrao-sticky
        style={{ top: stageTop }}
        className="novo-padrao-stage z-10 h-screen w-full overflow-hidden bg-[#F2F0EA]"
      >
        {/* Huge single-line title */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <motion.h2
            style={{
              scale: titleScale,
              y: titleY,
              opacity: titleOpacity,
              fontWeight: 500,
              fontSize: "clamp(42px, 10.2vw, 190px)",
              lineHeight: 1,
              letterSpacing: "-0.03em",
            }}
            data-novo-padrao-title
            className="whitespace-nowrap text-center font-display text-[#0E1111]"
          >
            UM NOVO PADRÃO
          </motion.h2>
        </div>

        {/* Revealed content — sits below the shrunken title */}
        <motion.div
          style={{ opacity: contentOpacity, y: contentY }}
          data-novo-padrao-content
          className="absolute inset-x-0 top-1/2 mx-auto flex max-w-4xl flex-col items-center px-6 text-center md:px-10"
        >

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
            style={{ opacity: paraOpacity }}
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
        </motion.div>
      </motion.div>
    </section>
  );
}
