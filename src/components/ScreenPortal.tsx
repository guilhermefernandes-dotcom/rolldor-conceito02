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
        <div className="absolute inset-0 z-0 flex items-center justify-center bg-transparent px-6 py-16 md:px-12">
          <div className="mx-auto w-full max-w-7xl">
            {/* heading lives in parent AUTORIDADE section */}

            {/* Stat cards */}
            <div className="mt-12 grid grid-cols-2 gap-4 md:mt-16 md:grid-cols-4 md:gap-6">
              {[
                { n: "01", title: "+50 mil", desc: "Revendedoras ativas" },
                { n: "02", title: "São Luís — MA", desc: "Sede própria" },
                { n: "03", title: "Centenas", desc: "Lançamentos por mês" },
                { n: "04", title: "Brasil todo", desc: "Envio para todos os estados" },
              ].map((c) => (
                <div
                  key={c.n}
                  className="flex min-h-[180px] flex-col justify-between rounded-2xl bg-card p-6 shadow-sm md:min-h-[220px] md:p-7"
                >
                  <span className="font-display text-xs tracking-[0.3em] text-gold/80">
                    {c.n}
                  </span>
                  <div>
                    <h3 className="font-display text-2xl font-bold leading-tight text-gold md:text-3xl">
                      {c.title}
                    </h3>
                    <p className="mt-3 text-xs text-muted-foreground md:text-sm">
                      {c.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="mt-10 flex justify-center md:mt-14">
              <a
                href="https://wa.me/5599999999999?text=Quero%20entrar%20no%20Grupo%20VIP%20Leevi"
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center gap-3 rounded-md bg-gold px-8 py-4 font-display text-sm font-bold uppercase tracking-wider text-background shadow-md transition-all hover:brightness-110"
              >
                Entrar no Grupo VIP
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </div>
        </div>

        {/* Portal overlay (covers description until end of scroll) */}
        <motion.div
          style={{ opacity: overlayOpacity }}
          className="pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-center overflow-hidden bg-secondary/70"
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
