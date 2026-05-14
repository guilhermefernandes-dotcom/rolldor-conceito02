import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check } from "lucide-react";
import leeviMark from "@/assets/leevi-mark.png";

const NAMES = [
  { name: "Mariana C.", city: "Goiânia, GO" },
  { name: "Juliana S.", city: "Belo Horizonte, MG" },
  { name: "Patrícia R.", city: "Curitiba, PR" },
  { name: "Camila O.", city: "São Paulo, SP" },
  { name: "Bianca M.", city: "Florianópolis, SC" },
  { name: "Renata L.", city: "Recife, PE" },
  { name: "Aline F.", city: "Porto Alegre, RS" },
  { name: "Tatiane P.", city: "Salvador, BA" },
  { name: "Vanessa A.", city: "Fortaleza, CE" },
  { name: "Larissa D.", city: "Brasília, DF" },
  { name: "Fernanda T.", city: "Manaus, AM" },
  { name: "Gabriela H.", city: "Campinas, SP" },
  { name: "Karine N.", city: "Vitória, ES" },
  { name: "Priscila V.", city: "Natal, RN" },
  { name: "Daniela B.", city: "Maceió, AL" },
];

const TIMES = ["agora mesmo", "há 1 min", "há 2 min", "há 3 min", "há 5 min"];

type Toast = { id: number; name: string; city: string; time: string };

export function JoinNotifications() {
  const [toast, setToast] = useState<Toast | null>(null);

  useEffect(() => {
    let mounted = true;
    let idCounter = 0;
    let pool = [...NAMES].sort(() => Math.random() - 0.5);

    const showNext = () => {
      if (!mounted) return;
      if (pool.length === 0) pool = [...NAMES].sort(() => Math.random() - 0.5);
      const pick = pool.shift()!;
      const time = TIMES[Math.floor(Math.random() * TIMES.length)];
      setToast({ id: ++idCounter, name: pick.name, city: pick.city, time });

      // Hide after 5s
      setTimeout(() => {
        if (mounted) setToast(null);
      }, 5000);
    };

    // First show after 6s, then every 9-13s
    const initial = setTimeout(showNext, 6000);
    const interval = setInterval(() => showNext(), 11000);

    return () => {
      mounted = false;
      clearTimeout(initial);
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed left-4 top-4 z-[60] md:left-6 md:top-6">
      <AnimatePresence mode="wait">
        {toast && (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: -20, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 280, damping: 24 }}
            className="pointer-events-auto flex max-w-[340px] items-center gap-3 rounded-full border border-gold/40 bg-foreground/95 py-2 pl-2 pr-5 text-background shadow-[0_18px_50px_-12px_rgba(0,0,0,0.45)] backdrop-blur"
            style={{
              backgroundImage:
                "linear-gradient(135deg, color-mix(in oklab, var(--gold) 12%, transparent), transparent 60%)",
            }}
          >
            <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-background ring-2 ring-gold/60">
              <img src={leeviMark} alt="" className="h-6 w-6 object-contain" />
              <span className="absolute -bottom-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#16a34a] ring-2 ring-foreground">
                <Check className="h-2.5 w-2.5 text-white" strokeWidth={3.5} />
              </span>
            </div>
            <div className="min-w-0 leading-tight">
              <div className="truncate font-display text-[13px] font-bold text-background">
                {toast.name} <span className="font-medium text-background/70">acabou de entrar</span>
              </div>
              <div className="mt-0.5 flex items-center gap-1.5 text-[11px] text-background/60">
                <span className="font-display font-bold uppercase tracking-[0.18em] text-gold">
                  Grupo VIP
                </span>
                <span>·</span>
                <span>{toast.city}</span>
                <span>·</span>
                <span>{toast.time}</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
