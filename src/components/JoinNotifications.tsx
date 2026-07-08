import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check } from "lucide-react";
import rdMark from "@/assets/rd-mark.png";

const EMPRESAS = [
  { nome: "Vidraçaria Alpha", cidade: "Curitiba, PR" },
  { nome: "Esquadrias Prime", cidade: "São Paulo, SP" },
  { nome: "Serralheria Vitral", cidade: "Belo Horizonte, MG" },
  { nome: "Vidros & Cia", cidade: "Florianópolis, SC" },
  { nome: "Alumínio Nobre", cidade: "Porto Alegre, RS" },
  { nome: "Vidraçaria Cristal", cidade: "Recife, PE" },
  { nome: "Esquadrias do Vale", cidade: "Campinas, SP" },
  { nome: "Vidraçaria Real", cidade: "Salvador, BA" },
  { nome: "Serralheria Aço Sul", cidade: "Joinville, SC" },
  { nome: "Vidraçaria Atlântico", cidade: "Fortaleza, CE" },
  { nome: "Esquadrias Modena", cidade: "Brasília, DF" },
  { nome: "Vidraçaria Central", cidade: "Manaus, AM" },
  { nome: "Alumínio Design", cidade: "Vitória, ES" },
  { nome: "Vidraçaria Horizonte", cidade: "Natal, RN" },
  { nome: "Serralheria Premium", cidade: "Maceió, AL" },
];

const TIMES = ["agora mesmo", "há 1 min", "há 2 min", "há 3 min", "há 5 min"];

type Toast = { id: number; nome: string; cidade: string; time: string };

export function JoinNotifications() {
  const [toast, setToast] = useState<Toast | null>(null);

  useEffect(() => {
    let mounted = true;
    let idCounter = 0;
    let pool = [...EMPRESAS].sort(() => Math.random() - 0.5);

    const showNext = () => {
      if (!mounted) return;
      if (pool.length === 0) pool = [...EMPRESAS].sort(() => Math.random() - 0.5);
      const pick = pool.shift()!;
      const time = TIMES[Math.floor(Math.random() * TIMES.length)];
      setToast({ id: ++idCounter, nome: pick.nome, cidade: pick.cidade, time });

      setTimeout(() => {
        if (mounted) setToast(null);
      }, 5000);
    };

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
            className="pointer-events-auto flex max-w-[300px] items-center gap-3 rounded-r-xl border border-l-0 border-foreground/15 bg-white py-3 pl-3 pr-4 text-foreground shadow-[0_18px_50px_-18px_rgba(0,0,0,0.28)] md:max-w-[520px] md:gap-5 md:rounded-r-2xl md:py-5 md:pl-5 md:pr-8 md:shadow-[0_28px_70px_-18px_rgba(0,0,0,0.28)]"
            style={{
              borderLeft: "4px solid oklch(0.18 0.005 250)",
            }}
          >
            <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-foreground/5 ring-2 ring-foreground/15 md:h-16 md:w-16">
              <img src={rdMark} alt="" className="h-6 w-6 object-contain md:h-9 md:w-9" loading="lazy" decoding="async" />
              <span className="absolute -bottom-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-foreground ring-2 ring-white md:h-6 md:w-6">
                <Check className="h-2.5 w-2.5 text-white md:h-3.5 md:w-3.5" strokeWidth={3.5} />
              </span>
            </div>
            <div className="min-w-0 leading-tight">
              <div className="truncate font-display text-[13px] font-bold text-foreground md:text-[19px]">
                {toast.nome} <span className="font-medium text-foreground/60">entrou na Rede Premium</span>
              </div>
              <div className="mt-1 flex items-center gap-1.5 truncate text-[11px] font-semibold text-foreground/70 md:mt-1.5 md:gap-2 md:text-[16px]">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-foreground md:h-2 md:w-2" />
                {toast.cidade}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
