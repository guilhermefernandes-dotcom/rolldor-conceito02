import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { ChevronDown, ArrowRight } from "lucide-react";
import mockupDesktop from "@/assets/mockup-desktop.webp";
import mockupMobile from "@/assets/mockup-mobile.webp";
import screenDesktop from "@/assets/whatsapp-screen.png";
import screenMobile from "@/assets/whatsapp-mobile.png";

/**
 * Pinned scroll-driven reveal:
 * - Phone starts tilted in 3D with a gold glow behind it.
 * - On scroll, it rotates flat, scales up dramatically and translates down,
 *   covering the viewport like a portal.
 * - The overlay then fades out, revealing the description content layered behind.
 *
 * Desktop uses a horizontal phone mockup; mobile uses a vertical one.
 */
export function ScreenPortal() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // Phase 1: tilt 25deg -> 0 (0..0.4)
  // Phase 2: scale + slide down (0.4..0.85)
  // Phase 3: fade overlay out (0.85..0.97)
  const rotateX = useTransform(scrollYProgress, [0, 0.4], [25, 0]);

  // Desktop transforms
  const scale = useTransform(scrollYProgress, [0.4, 0.85], [1.15, 8]);
  const y = useTransform(scrollYProgress, [0.4, 0.85], [-40, 480]);

  // Mobile transforms (smaller scale, less translate)
  const scaleM = useTransform(scrollYProgress, [0.4, 0.85], [1, 5.5]);
  const yM = useTransform(scrollYProgress, [0.4, 0.85], [-20, 240]);

  const overlayOpacity = useTransform(scrollYProgress, [0.85, 0.97], [1, 0]);

  return (
    <section ref={ref} className="relative" style={{ height: "300vh" }}>
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Description revealed BEHIND the portal */}
        <div className="absolute inset-0 z-0 flex items-center justify-center bg-background px-6 md:px-12">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-display text-5xl font-semibold leading-tight tracking-tight text-foreground md:text-7xl">
              Por dentro do Grupo VIP
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-sm text-muted-foreground md:text-base">
              Veja como é a rotina de quem está dentro: lançamentos, lives e ofertas exclusivas todos os dias.
            </p>
          </div>
        </div>

        {/* Portal overlay (covers description until end of scroll) */}
        <motion.div
          style={{ opacity: overlayOpacity }}
          className="pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-center overflow-hidden bg-secondary"
        >
          {/* radial gold glow */}
          <div className="pointer-events-none absolute left-1/2 top-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/30 blur-[120px] md:h-[600px] md:w-[600px]" />

          {/* "Keep scrolling" badge */}
          <div className="absolute bottom-12 z-20 flex items-center gap-2 rounded-full border-2 border-background bg-secondary py-1.5 pl-1.5 pr-5 shadow-sm">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-background">
              <ChevronDown className="h-5 w-5 animate-bounce text-foreground" />
            </span>
            <span className="text-sm font-medium text-foreground">Continue rolando</span>
          </div>

          {/* Heading + description */}
          <div className="relative z-10 flex flex-col items-center gap-4 px-6 text-center">
            <h2 className="font-display text-5xl font-semibold leading-tight text-foreground md:text-7xl">
              Por dentro do Grupo VIP
            </h2>
            <p className="max-w-md text-sm text-muted-foreground md:max-w-xl md:text-base">
              Veja como é a rotina de quem está dentro: lançamentos, lives e ofertas exclusivas todos os dias.
            </p>
          </div>

          {/* Desktop phone (horizontal) */}
          <motion.div
            style={{
              rotateX,
              scale,
              y,
              transformPerspective: 1600,
              transformOrigin: "50% 0%",
            }}
            className="relative mt-8 hidden w-[680px] md:block lg:w-[780px]"
          >
            <img src={mockupDesktop} alt="" className="relative z-10 w-full select-none" draggable={false} />
            {/* Overlay screen content — bbox derived from mockup transparent screen */}
            <div
              className="absolute z-[5] overflow-hidden rounded-[14px]"
              style={{
                left: "25.9%",
                right: "24.2%",
                top: "9.4%",
                bottom: "39.1%",
              }}
            >
              <img src={screenDesktop} alt="" className="h-full w-full object-cover object-top" />
            </div>
          </motion.div>

          {/* Mobile phone (vertical) */}
          <motion.div
            style={{
              rotateX,
              scale: scaleM,
              y: yM,
              transformPerspective: 1200,
              transformOrigin: "50% 0%",
            }}
            className="relative mt-6 w-[280px] md:hidden"
          >
            <img src={mockupMobile} alt="" className="relative z-10 w-full select-none" draggable={false} />
            <div
              className="absolute z-[5] overflow-hidden rounded-[28px]"
              style={{
                left: "31.7%",
                right: "31.4%",
                top: "2.2%",
                bottom: "23%",
              }}
            >
              <img src={screenMobile} alt="" className="h-full w-full object-cover object-top" />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
