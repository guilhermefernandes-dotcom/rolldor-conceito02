import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight } from "lucide-react";

/**
 * CTA fixo no rodapé do mobile (zona do polegar).
 * Só aparece depois que o hero sai da tela e some quando o formulário (#cta-final)
 * entra na tela, para nunca cobrir os campos nem o botão de envio.
 */
export function StickyCta({
  children,
  href = "#cta-final",
  onClick,
}: {
  children: React.ReactNode;
  href?: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}) {
  const [passouHero, setPassouHero] = useState(false);
  const [formVisivel, setFormVisivel] = useState(false);

  useEffect(() => {
    const onScroll = () => setPassouHero(window.scrollY > window.innerHeight * 0.8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const alvo = document.querySelector(href);
    const io = alvo
      ? new IntersectionObserver(([e]) => setFormVisivel(e.isIntersecting), { threshold: 0 })
      : null;
    if (alvo && io) io.observe(alvo);

    return () => {
      window.removeEventListener("scroll", onScroll);
      io?.disconnect();
    };
  }, [href]);

  const visivel = passouHero && !formVisivel;

  return (
    <AnimatePresence>
      {visivel && (
        <motion.a
          href={href}
          onClick={onClick}
          initial={{ y: 24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 24, opacity: 0 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-x-4 z-40 inline-flex min-h-14 items-center justify-center gap-2 rounded-2xl bg-brand-green px-6 py-4 font-display text-base font-bold tracking-tight text-[#0E1111] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.6)] md:hidden"
          style={{ bottom: "calc(1rem + env(safe-area-inset-bottom, 0px))" }}
        >
          {children} <ArrowRight className="h-4 w-4" />
        </motion.a>
      )}
    </AnimatePresence>
  );
}
