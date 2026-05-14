import whatsappScreen from "@/assets/whatsapp-vip-screen.png";

/**
 * Animated magnifier card — a lens sweeps across a phone-style screenshot
 * revealing a zoomed crop of the same image. On hover, the lens fades and
 * the screen scales up.
 *
 * Themed for the Leevi dark/gold palette (matches the LOSS AVERSION section).
 */
export function MagnifierCard() {
  return (
    <div className="leevi-magnifier group relative mx-auto w-full max-w-[360px] overflow-hidden rounded-[32px] border border-gold/25 bg-gradient-to-b from-[oklch(0.22_0.02_85)] to-[oklch(0.16_0.01_85)] p-6 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.6)]">
      {/* corner dots */}
      <span className="leevi-mag-dot absolute left-5 top-5" />
      <span className="leevi-mag-dot absolute right-5 top-5" />
      <span className="leevi-mag-dot absolute bottom-5 left-5" />
      <span className="leevi-mag-dot absolute bottom-5 right-5" />

      {/* Gold halo behind the screen */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -z-0 h-[120%] w-[120%] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-60 blur-[60px] transition-all duration-700 group-hover:scale-125 group-hover:opacity-90"
        style={{
          background:
            "radial-gradient(circle, oklch(0.72 0.12 80 / 0.35) 0%, transparent 60%)",
        }}
      />

      {/* Label */}
      <div className="relative z-10 mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-gold" />
          <span className="font-display text-[10px] uppercase tracking-[0.25em] text-gold">
            Dentro do Grupo VIP
          </span>
        </div>
        <span className="font-display text-[10px] uppercase tracking-[0.25em] text-white/40">
          AO VIVO
        </span>
      </div>

      {/* Phone-screen frame */}
      <div className="leevi-mag-frame relative z-10 mx-auto aspect-[9/19] w-[80%] overflow-hidden rounded-[24px] border border-white/10 bg-black shadow-inner">
        {/* Base screenshot */}
        <img
          src={whatsappScreen}
          alt="Conversas reais do Grupo VIP de Revendedoras Leevi no WhatsApp"
          className="leevi-mag-screen absolute inset-0 h-full w-full object-cover transition-transform duration-700"
          loading="lazy"
        />

        {/* Animated magnifier lens */}
        <div
          aria-hidden
          className="leevi-mag-lens pointer-events-none absolute z-20 h-[42%] w-[42%] rounded-full opacity-100 transition-opacity duration-500 group-hover:opacity-0"
          style={{
            backgroundImage: `url(${whatsappScreen})`,
            backgroundSize: "260% auto",
            boxShadow:
              "0 0 0 2px rgba(255,255,255,0.5), 0 0 0 4px oklch(0.72 0.12 80 / 0.6), 0 30px 50px -10px rgba(0,0,0,0.6), inset 0 0 30px rgba(255,255,255,0.1)",
          }}
        />

        {/* Subtle glare on top of lens */}
        <div
          aria-hidden
          className="leevi-mag-lens-glare pointer-events-none absolute z-30 h-[42%] w-[42%] rounded-full opacity-100 transition-opacity duration-500 group-hover:opacity-0"
          style={{
            background:
              "radial-gradient(circle at 30% 25%, rgba(255,255,255,0.45) 0%, rgba(255,255,255,0.08) 25%, transparent 55%)",
          }}
        />
      </div>

      {/* Caption */}
      <div className="relative z-10 mt-5 text-center">
        <p className="font-display text-sm font-bold text-white">
          Veja de pertinho.
        </p>
        <p className="mt-1 text-xs leading-relaxed text-white/50">
          É assim que as revendedoras conversam dentro do grupo todos os dias.
        </p>
      </div>

      <style>{`
        .leevi-mag-dot {
          width: 10px;
          height: 10px;
          border-radius: 999px;
          background: oklch(0.72 0.12 80 / 0.35);
          border: 1px solid oklch(0.72 0.12 80 / 0.55);
          z-index: 5;
        }
        @keyframes leevi-lens-sweep {
          0%   { top: 8%;  left: -10%; }
          25%  { top: 28%; left: 60%;  }
          50%  { top: 55%; left: 5%;   }
          75%  { top: 75%; left: 55%;  }
          100% { top: 8%;  left: -10%; }
        }
        @keyframes leevi-lens-bg {
          0%   { background-position: 0% 5%;    }
          25%  { background-position: 80% 25%;  }
          50%  { background-position: 10% 55%;  }
          75%  { background-position: 70% 80%;  }
          100% { background-position: 0% 5%;    }
        }
        .leevi-mag-lens {
          animation: leevi-lens-sweep 9s ease-in-out infinite,
                     leevi-lens-bg 9s ease-in-out infinite;
          will-change: top, left, background-position;
        }
        .leevi-mag-lens-glare {
          animation: leevi-lens-sweep 9s ease-in-out infinite;
          will-change: top, left;
          mix-blend-mode: screen;
        }
        .leevi-magnifier:hover .leevi-mag-screen {
          transform: scale(1.08);
        }
        @media (prefers-reduced-motion: reduce) {
          .leevi-mag-lens,
          .leevi-mag-lens-glare {
            animation: none;
            top: 30%;
            left: 30%;
          }
        }
      `}</style>
    </div>
  );
}
