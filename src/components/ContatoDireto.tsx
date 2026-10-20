import { Mail, MessageCircle } from "lucide-react";
import { EMAIL_CONTATO, linkWhatsapp } from "@/lib/contato";

/** Cartões de contato do painel do CTA final — agora clicáveis (abre o WhatsApp / o e-mail). */
export function ContatoDireto({ mensagem }: { mensagem: string }) {
  const card =
    "group flex min-h-[72px] items-center gap-3 rounded-2xl border border-white/15 bg-white/5 px-5 py-4 backdrop-blur-sm transition-colors hover:border-brand-green/70 hover:bg-white/10";
  return (
    <div className="mt-auto grid grid-cols-1 gap-3 pt-10 sm:grid-cols-2 lg:grid-cols-1 2xl:grid-cols-2">
      <a href={linkWhatsapp(mensagem)} target="_blank" rel="noopener noreferrer" className={card}>
        <MessageCircle className="h-5 w-5 shrink-0 text-brand-green" strokeWidth={2} aria-hidden />
        <span className="min-w-0">
          <span className="block font-display text-xs font-medium uppercase tracking-widest text-white/65">
            WhatsApp
          </span>
          <span className="mt-1 block font-display text-[18px] font-medium text-white">
            (44) 98824-9953
          </span>
        </span>
      </a>
      <a href={`mailto:${EMAIL_CONTATO}`} className={card}>
        <Mail className="h-5 w-5 shrink-0 text-brand-green" strokeWidth={2} aria-hidden />
        <span className="min-w-0">
          <span className="block font-display text-xs font-medium uppercase tracking-widest text-white/65">
            E-mail
          </span>
          <span className="mt-1 block break-words font-display text-[17px] font-medium text-white 2xl:text-[16px]">
            {EMAIL_CONTATO}
          </span>
        </span>
      </a>
    </div>
  );
}
