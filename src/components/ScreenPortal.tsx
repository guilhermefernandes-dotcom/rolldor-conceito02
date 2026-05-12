import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { ChevronDown } from "lucide-react";
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
  // Phase 2: scale up (0.4..0.85)
  // Phase 3: warp + fade to next section (0.85..1)
  const rotateX = useTransform(scrollYProgress, [0, 0.4], [25, 0]);

  // Desktop transforms — scale from center, with a final warp burst
  const scale = useTransform(scrollYProgress, [0.4, 0.85, 1], [1.15, 6, 14]);
  const y = useTransform(scrollYProgress, [0.4, 0.85, 1], [80, 80, -120]);

  // Mobile transforms
  const scaleM = useTransform(scrollYProgress, [0.4, 0.85, 1], [1, 4.5, 10]);
  const yM = useTransform(scrollYProgress, [0.4, 0.85, 1], [40, 40, -80]);

  // Backdrop blur intensifies as user scrolls deeper, peaks at the warp
  const blurPx = useTransform(scrollYProgress, [0, 0.5, 0.85, 1], [0, 6, 14, 36]);
  const backdropFilter = useTransform(blurPx, (v) => `blur(${v}px)`);

  // Warp dim: a soft tinted veil that grows during the teleport
  const warpVeilOpacity = useTransform(scrollYProgress, [0.7, 0.92, 1], [0, 0.4, 0]);

  // Final overlay fade — phone & UI dissolve into the next section
  const overlayOpacity = useTransform(scrollYProgress, [0.85, 0.98], [1, 0]);
  const phoneOpacity = useTransform(scrollYProgress, [0.85, 0.97], [1, 0]);

  return (
    <section ref={ref} className="relative" style={{ height: "300vh" }}>
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Blurred backdrop tied to scroll — uses parent section bg color */}
        <motion.div
          aria-hidden
          style={{ backdropFilter, WebkitBackdropFilter: backdropFilter }}
          className="absolute inset-0 z-[1] bg-secondary/40"
        />

        {/* Warp veil — gold-tinted bloom during the teleport */}
        <motion.div
          aria-hidden
          style={{ opacity: warpVeilOpacity }}
          className="pointer-events-none absolute inset-0 z-[2] bg-gradient-radial from-gold/30 via-secondary/60 to-secondary"
        />

        {/* Portal overlay (covers description until end of scroll) */}
        <motion.div
          style={{ opacity: overlayOpacity }}
          className="pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-center overflow-hidden bg-transparent"
        >
          {/* radial gold glow — subtle so the section bg stays uniform */}
          <div className="pointer-events-none absolute left-1/2 top-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/10 blur-[140px] md:h-[600px] md:w-[600px]" />

          {/* "Keep scrolling" badge */}
          <div className="absolute bottom-12 z-20 flex items-center gap-2 rounded-full border-2 border-background bg-secondary py-1.5 pl-1.5 pr-5 shadow-sm">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-background">
              <ChevronDown className="h-5 w-5 animate-bounce text-foreground" />
            </span>
            <span className="text-sm font-medium text-foreground">Continue rolando</span>
          </div>

          {/* Desktop phone (horizontal) */}
          <motion.div
            style={{
              rotateX,
              scale,
              y,
              opacity: phoneOpacity,
              transformPerspective: 1600,
              transformOrigin: "50% 50%",
            }}
            className="relative mt-8 hidden w-[680px] md:block lg:w-[780px]"
          >
            <img
              src={mockupDesktop}
              alt=""
              className="relative z-10 w-full select-none"
              draggable={false}
              style={{
                WebkitMaskImage:
                  "linear-gradient(to bottom, #000 0%, #000 70%, transparent 100%)",
                maskImage:
                  "linear-gradient(to bottom, #000 0%, #000 70%, transparent 100%)",
              }}
            />
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
              transformOrigin: "50% 50%",
            }}
            className="relative mt-6 w-[280px] md:hidden"
          >
            <img
              src={mockupMobile}
              alt=""
              className="relative z-10 w-full select-none"
              draggable={false}
              style={{
                WebkitMaskImage:
                  "linear-gradient(to bottom, #000 0%, #000 75%, transparent 100%)",
                maskImage:
                  "linear-gradient(to bottom, #000 0%, #000 75%, transparent 100%)",
              }}
            />
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
