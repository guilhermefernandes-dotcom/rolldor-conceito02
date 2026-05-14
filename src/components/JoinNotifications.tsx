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
            className="pointer-events-auto flex max-w-[300px] items-center gap-3 rounded-r-xl border border-l-0 border-[#16a34a]/25 bg-white py-3 pl-3 pr-4 text-foreground shadow-[0_18px_50px_-18px_rgba(0,0,0,0.28)] md:max-w-[520px] md:gap-5 md:rounded-r-2xl md:py-5 md:pl-5 md:pr-8 md:shadow-[0_28px_70px_-18px_rgba(0,0,0,0.28)]"
            style={{
              borderLeft: "4px solid #16a34a",
            }}
          >
            <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#16a34a]/10 ring-2 ring-[#16a34a]/30 md:h-16 md:w-16">
              <img src={leeviMark} alt="" className="h-6 w-6 object-contain md:h-9 md:w-9" loading="lazy" decoding="async" />
              <span className="absolute -bottom-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#16a34a] ring-2 ring-white md:h-6 md:w-6">
                <Check className="h-2.5 w-2.5 text-white md:h-3.5 md:w-3.5" strokeWidth={3.5} />
              </span>
            </div>
            <div className="min-w-0 leading-tight">
              <div className="truncate font-display text-[13px] font-bold text-foreground md:text-[19px]">
                {toast.name} <span className="font-medium text-foreground/60">entrou no grupo</span>
              </div>
              <div className="mt-1 flex items-center gap-1.5 truncate text-[11px] font-semibold text-[#16a34a] md:mt-1.5 md:gap-2 md:text-[16px]">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#16a34a] md:h-2 md:w-2" />
                {toast.city}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
