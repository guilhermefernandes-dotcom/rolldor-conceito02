import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check } from "lucide-react";
import rdMark from "@/assets/rd-mark.png";

const EMPRESAS = [
  { nome: "Vidraçaria Alpha", estado: "PR" },
  { nome: "Esquadrias Prime", estado: "SP" },
  { nome: "Serralheria Vitral", estado: "MG" },
  { nome: "Vidros & Cia", estado: "SC" },
  { nome: "Alumínio Nobre", estado: "RS" },
  { nome: "Vidraçaria Cristal", estado: "PE" },
  { nome: "Esquadrias do Vale", estado: "SP" },
  { nome: "Vidraçaria Real", estado: "BA" },
  { nome: "Serralheria Aço Sul", estado: "SC" },
  { nome: "Vidraçaria Atlântico", estado: "CE" },
  { nome: "Esquadrias Modena", estado: "DF" },
  { nome: "Vidraçaria Central", estado: "AM" },
  { nome: "Alumínio Design", estado: "ES" },
  { nome: "Vidraçaria Horizonte", estado: "RN" },
  { nome: "Serralheria Premium", estado: "AL" },
  { nome: "Vidraçaria Solar", estado: "GO" },
  { nome: "Esquadrias Mont Blanc", estado: "SP" },
  { nome: "Vidros Aurora", estado: "MG" },
  { nome: "Alumínio Vertical", estado: "RJ" },
  { nome: "Vidraçaria Lumière", estado: "PR" },
  { nome: "Esquadrias Bella Vista", estado: "SC" },
  { nome: "Serralheria Ferro & Vidro", estado: "RS" },
  { nome: "Vidraçaria Panorama", estado: "BA" },
  { nome: "Vidros Nova Era", estado: "PE" },
  { nome: "Esquadrias Império", estado: "SP" },
  { nome: "Vidraçaria Belvedere", estado: "MG" },
  { nome: "Alumínio Master", estado: "GO" },
  { nome: "Vidros Transparência", estado: "CE" },
  { nome: "Esquadrias Atlanta", estado: "RJ" },
  { nome: "Vidraçaria Diamante", estado: "PB" },
  { nome: "Serralheria Norte Sul", estado: "PA" },
  { nome: "Vidros Vitória Régia", estado: "AM" },
  { nome: "Esquadrias Portal", estado: "MT" },
  { nome: "Vidraçaria Estrela", estado: "MS" },
  { nome: "Alumínio Prata", estado: "SP" },
  { nome: "Vidros Reflexo", estado: "SC" },
  { nome: "Esquadrias Contemporânea", estado: "RS" },
  { nome: "Vidraçaria Ipanema", estado: "RJ" },
  { nome: "Serralheria Aliança", estado: "MG" },
  { nome: "Vidros Cristallo", estado: "SP" },
  { nome: "Esquadrias Vitrale", estado: "PR" },
  { nome: "Vidraçaria Costa Verde", estado: "RJ" },
  { nome: "Alumínio Forte", estado: "BA" },
  { nome: "Vidros Miraflores", estado: "SE" },
  { nome: "Esquadrias Sant'Ana", estado: "PI" },
  { nome: "Vidraçaria São Jorge", estado: "MA" },
  { nome: "Serralheria Planalto", estado: "DF" },
  { nome: "Vidros Alvorada", estado: "TO" },
  { nome: "Esquadrias Serra Azul", estado: "ES" },
  { nome: "Vidraçaria Bandeirantes", estado: "SP" },
  { nome: "Alumínio Pampa", estado: "RS" },
  { nome: "Vidros Litoral", estado: "SC" },
  { nome: "Esquadrias Monte Verde", estado: "MG" },
  { nome: "Vidraçaria Guanabara", estado: "RJ" },
  { nome: "Serralheria Independência", estado: "PR" },
  { nome: "Vidros Zênite", estado: "GO" },
  { nome: "Esquadrias Oceânica", estado: "CE" },
  { nome: "Vidraçaria Palmeiras", estado: "PE" },
  { nome: "Alumínio Sigma", estado: "SP" },
  { nome: "Vidros Aliança Sul", estado: "RS" },
  { nome: "Esquadrias Fênix", estado: "BA" },
  { nome: "Vidraçaria Aurora Boreal", estado: "AC" },
  { nome: "Serralheria Rio Branco", estado: "RO" },
  { nome: "Vidros Amazônia", estado: "AP" },
  { nome: "Esquadrias Boa Vista", estado: "RR" },
  { nome: "Vidraçaria Sol Nascente", estado: "AL" },
];

const TIMES = ["agora mesmo", "há 1 min", "há 2 min", "há 3 min", "há 5 min"];

type Toast = { id: number; nome: string; estado: string; time: string };


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
