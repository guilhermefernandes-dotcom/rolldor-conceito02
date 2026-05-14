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
    <div className="pointer-events-none fixed left-0 top-6 z-[60] md:top-8">
      <AnimatePresence mode="wait">
        {toast && (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ type: "spring", stiffness: 280, damping: 26 }}
            className="pointer-events-auto flex max-w-[520px] items-center gap-5 rounded-r-2xl border border-l-0 border-[#16a34a]/25 bg-white py-5 pl-5 pr-8 text-foreground shadow-[0_28px_70px_-18px_rgba(0,0,0,0.28)]"
            style={{
              borderLeft: "6px solid #16a34a",
            }}
          >
            <div className="relative flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-[#16a34a]/10 ring-2 ring-[#16a34a]/30">
              <img src={leeviMark} alt="" className="h-9 w-9 object-contain" / loading="lazy" decoding="async">
              <span className="absolute -bottom-0.5 -right-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-[#16a34a] ring-2 ring-white">
                <Check className="h-3.5 w-3.5 text-white" strokeWidth={3.5} />
              </span>
            </div>
            <div className="min-w-0 leading-tight">
              <div className="truncate font-display text-[19px] font-bold text-foreground">
                {toast.name} <span className="font-medium text-foreground/60">entrou no grupo</span>
              </div>
              <div className="mt-1.5 flex items-center gap-2 truncate text-[16px] font-semibold text-[#16a34a]">
                <span className="inline-block h-2 w-2 rounded-full bg-[#16a34a]" />
                {toast.city}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
