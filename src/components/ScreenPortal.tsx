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

  // Phase 1: tilt 25deg -> 0 (0..0.3)
  // Phase 2: scale up (0.3..0.75)
  // Phase 3: TELEPORT — flash, warp, blur (0.75..1)
  const rotateX = useTransform(scrollYProgress, [0, 0.3], [25, 0]);

  // Desktop transforms — accelerate hard at the end for "warp speed"
  const scale = useTransform(scrollYProgress, [0.3, 0.75, 1], [1.15, 4, 14]);
  const y = useTransform(scrollYProgress, [0.3, 1], [80, 80]);
  // Slight tilt back during warp
  const phoneRotZ = useTransform(scrollYProgress, [0.75, 1], [0, -6]);
  // Motion blur on the phone during warp
  const phoneBlurPx = useTransform(scrollYProgress, [0.75, 0.95], [0, 24]);
  const phoneFilter = useTransform(phoneBlurPx, (v) => `blur(${v}px)`);

  // Mobile transforms
  const scaleM = useTransform(scrollYProgress, [0.3, 0.75, 1], [1, 3, 10]);
  const yM = useTransform(scrollYProgress, [0.3, 1], [40, 40]);

  // Mild backdrop blur during the journey (subtle depth)
  const ambientBlur = useTransform(scrollYProgress, [0, 0.5, 0.8], [0, 4, 10]);
  const ambientFilter = useTransform(ambientBlur, (v) => `blur(${v}px)`);

  // GOLD FLASH — quick burst right at warp peak
  const flashOpacity = useTransform(
    scrollYProgress,
    [0.78, 0.88, 0.95],
    [0, 0.85, 0],
  );

  // WARP RING — radial gradient that expands from center
  const warpScale = useTransform(scrollYProgress, [0.7, 1], [0.2, 6]);
  const warpOpacity = useTransform(
    scrollYProgress,
    [0.7, 0.85, 0.98],
    [0, 1, 0.7],
  );

  // FINAL VEIL — solid bg covering at the unpin (invisible handoff)
  const veilOpacity = useTransform(
    scrollYProgress,
    [0.82, 0.92, 1],
    [0, 1, 1],
  );
  const veilBlurPx = useTransform(scrollYProgress, [0.7, 0.95, 1], [0, 50, 80]);
  const veilFilter = useTransform(veilBlurPx, (v) => `blur(${v}px)`);

  // Portal contents (phone + glow + badge) fade into the warp
  const overlayOpacity = useTransform(scrollYProgress, [0.78, 0.95], [1, 0]);

  return (
    <section ref={ref} className="relative" style={{ height: "220vh" }}>
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Mild ambient blur backdrop tied to scroll */}
        <motion.div
          aria-hidden
          style={{ backdropFilter: ambientFilter, WebkitBackdropFilter: ambientFilter }}
          className="absolute inset-0 z-[1] bg-secondary/30"
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
              rotateZ: phoneRotZ,
              scale,
              y,
              filter: phoneFilter,
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

        {/* BLUR SWEEP — covers the portal and hands off to the next section */}
        <motion.div
          aria-hidden
          style={{
            opacity: transitionOpacity,
            backdropFilter: transitionFilter,
            WebkitBackdropFilter: transitionFilter,
          }}
          className="pointer-events-none absolute inset-0 z-30 bg-secondary"
        />
      </div>
    </section>
  );
}
