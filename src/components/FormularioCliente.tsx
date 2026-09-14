import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { CheckCircle2, Loader2, ArrowRight, Home } from "lucide-react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { HiddenUtmFields, readUtmFields, pushFormSubmitEvent } from "@/lib/utm";
import { sendToWebhook } from "@/lib/webhook";

const schema = z.object({
  nome: z.string().trim().min(2, "Informe seu nome").max(120),
  whatsapp: z.string().trim().min(8, "Informe um WhatsApp válido").max(40),
  email: z.string().trim().email("Informe um e-mail válido").max(200),
  cidade: z.string().trim().min(2, "Informe a cidade").max(120),
  estado: z.string().trim().min(2, "Informe o estado").max(60),
  mensagem: z.string().trim().max(1500).optional().or(z.literal("")),
});

type FormState = z.input<typeof schema>;

const initialState: FormState = {
  nome: "",
  whatsapp: "",
  email: "",
  cidade: "",
  estado: "",
  mensagem: "",
};

export function FormularioCliente() {
  const [values, setValues] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [serverError, setServerError] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [highlight, setHighlight] = useState(false);

  // Destaque imediato quando o usuário clica em qualquer CTA "Solicitar orçamento".
  useEffect(() => {
    let timer: number | undefined;
    function onHighlight() {
      setHighlight(true);
      if (timer) window.clearTimeout(timer);
      timer = window.setTimeout(() => setHighlight(false), 1400);
    }
    window.addEventListener("rd:highlight-form", onHighlight);
    return () => {
      window.removeEventListener("rd:highlight-form", onHighlight);
      if (timer) window.clearTimeout(timer);
    };
  }, []);

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setValues((v) => ({ ...v, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  }

  // Formata apenas quando o cursor está no fim do campo, para nunca reposicionar
  // o caret durante a digitação (causa de "cliques mortos"/travamentos no Android).
  function onWhatsappChange(e: React.ChangeEvent<HTMLInputElement>) {
    const el = e.target;
    const raw = el.value;
    const caretAtEnd = el.selectionStart === raw.length;
    if (!caretAtEnd) {
      update("whatsapp", raw);
      return;
    }
    const d = raw.replace(/\D/g, "").slice(0, 11);
    let out = d;
    if (d.length > 2 && d.length <= 6) out = `(${d.slice(0, 2)}) ${d.slice(2)}`;
    else if (d.length > 6 && d.length <= 10) out = `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
    else if (d.length > 10) out = `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
    else if (d.length > 0) out = `(${d}`;
    update("whatsapp", out);
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setServerError(null);
    const parsed = schema.safeParse(values);
    if (!parsed.success) {
      const fieldErrors: Partial<Record<keyof FormState, string>> = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as keyof FormState;
        if (!fieldErrors[key]) fieldErrors[key] = issue.message;
      }
      setErrors(fieldErrors);
      return;
    }

    setStatus("loading");
    const utm = readUtmFields(formRef.current);
    const payload = {
      nome: parsed.data.nome,
      whatsapp: parsed.data.whatsapp,
      email: parsed.data.email,
      cidade: parsed.data.cidade,
      estado: parsed.data.estado,
      tipo_projeto: "casa" as const,
      fase_obra: "projeto" as const,
      mensagem: parsed.data.mensagem || null,
      ...utm,
    };

    const { error } = await supabase.from("cliente_leads").insert(payload);
    if (error) {
      setStatus("error");
      setServerError("Não foi possível enviar seu cadastro agora. Tente novamente em instantes.");
      return;
    }
    sendToWebhook({ ...payload, origem: "residencial" });
    pushFormSubmitEvent();
    setStatus("success");
    setValues(initialState);
  }

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-3xl border border-white/10 bg-white/[0.03] p-10 text-center text-white shadow-[0_30px_80px_-30px_rgba(0,0,0,0.25)] backdrop-blur-sm md:p-14"
      >
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-brand-green text-white">
          <CheckCircle2 className="h-8 w-8" strokeWidth={2} />
        </div>
        <h3 className="font-display text-3xl font-medium text-white md:text-4xl">
          Recebemos seu contato.
        </h3>
        <p className="mx-auto mt-4 max-w-lg text-[18px] text-white/70 md:text-lg">
          Um especialista Roll Door vai analisar seu projeto e entrar em contato em breve para
          indicar o parceiro ideal na sua região.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-8 inline-flex items-center gap-2 rounded-xl border border-white/15 px-6 py-3 font-display text-sm font-bold text-white transition-colors hover:bg-white/5"
        >
          Enviar outro contato
        </button>
      </motion.div>
    );
  }

  const inputBase =
    "w-full rounded-xl border bg-white/[0.03] px-3 py-2.5 font-sans text-[15px] text-white transition-colors placeholder:text-white/40 focus:outline-none focus:border-brand-green focus:ring-2 focus:ring-brand-green/25";

  return (
    <form
      ref={formRef}
      onSubmit={onSubmit}
      id="formulario-orcamento"
      className={`rounded-3xl border bg-white/[0.03] p-3 text-white shadow-[0_30px_80px_-30px_rgba(0,0,0,0.25)] backdrop-blur-sm transition-all duration-300 md:p-8 ${
        highlight
          ? "border-brand-green/70 ring-2 ring-brand-green/40 ring-offset-2 ring-offset-transparent"
          : "border-white/10"
      }`}
      noValidate
    >
      <HiddenUtmFields />
      <div className="mb-3 text-center">
        <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-brand-green/10">
          <Home className="h-4 w-4 text-brand-green" strokeWidth={1.8} />
        </div>
        <h3 className="font-display text-xl font-medium text-white md:text-3xl">
          Solicite um orçamento.
        </h3>
        <p className="mx-auto mt-1 max-w-md text-[15px] leading-snug text-white/70">
          Preencha seus dados e um especialista da Roll Door entrará em contato.
        </p>
      </div>

      <div className="grid gap-2 md:grid-cols-2">
        <Field label="Nome" error={errors.nome}>
          <input
            className={`${inputBase} ${errors.nome ? "border-destructive" : "border-white/15"}`}
            value={values.nome}
            onChange={(e) => update("nome", e.target.value)}
            autoComplete="name"
          />
        </Field>
        <Field label="WhatsApp" error={errors.whatsapp}>
          <input
            type="tel"
            className={`${inputBase} ${errors.whatsapp ? "border-destructive" : "border-white/15"}`}
            value={values.whatsapp}
            onChange={onWhatsappChange}
            placeholder="(11) 90000-0000"
            inputMode="numeric"
            autoComplete="tel"
            maxLength={16}
          />
        </Field>
        <Field label="E-mail" error={errors.email}>
          <input
            type="email"
            className={`${inputBase} ${errors.email ? "border-destructive" : "border-white/15"}`}
            value={values.email}
            onChange={(e) => update("email", e.target.value)}
            autoComplete="email"
          />
        </Field>
        <div className="grid grid-cols-[3fr_1fr] gap-2 md:col-span-2">
          <Field label="Cidade" error={errors.cidade}>
            <input
              className={`${inputBase} ${errors.cidade ? "border-destructive" : "border-white/15"}`}
              value={values.cidade}
              onChange={(e) => update("cidade", e.target.value)}
              autoComplete="address-level2"
            />
          </Field>
          <Field label="Estado" error={errors.estado}>
            <input
              list="uf-list"
              className={`${inputBase} px-2 text-center uppercase ${errors.estado ? "border-destructive" : "border-white/15"}`}
              value={values.estado}
              onChange={(e) =>
                update("estado", e.target.value.replace(/[^a-zA-Z]/g, "").toUpperCase().slice(0, 2))
              }
              placeholder="SP"
              maxLength={2}
              autoCapitalize="characters"
              autoComplete="address-level1"
            />
            <datalist id="uf-list">
              {UFS.map((uf) => (
                <option key={uf} value={uf} />
              ))}
            </datalist>
          </Field>
        </div>
        <Field label="Mensagem (opcional)" error={errors.mensagem} className="md:col-span-2">
          <textarea
            className={`${inputBase} min-h-[80px] resize-y border-white/15`}
            value={values.mensagem}
            onChange={(e) => update("mensagem", e.target.value)}
            placeholder="Conte um pouco sobre seu projeto."
          />
        </Field>
      </div>

      {serverError && (
        <div className="mt-4 rounded-xl border border-destructive/30 bg-destructive/5 px-3 py-2 text-[14px] text-destructive">
          {serverError}
        </div>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="mt-4 inline-flex h-14 w-full items-center justify-center gap-2 rounded-2xl px-6 font-display text-base font-semibold text-white transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70 sm:h-16 sm:text-lg"
        style={{
          background: "#9CCB3B",
          boxShadow: "0 18px 40px -12px rgba(151, 191, 76, 0.45)",
        }}
      >
        {status === "loading" ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" /> Enviando...
          </>
        ) : (
          <>
            Solicitar orçamento <ArrowRight className="h-5 w-5" />
          </>
        )}
      </button>

      <p className="mt-2 text-[12px] text-white/50">
        Usamos seus dados apenas para responder ao seu contato sobre seu projeto Roll Door.
      </p>
    </form>
  );
}

function Field({
  label,
  error,
  children,
  className = "",
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-0.5 block truncate font-display text-[11px] font-medium uppercase tracking-[0.08em] text-white/60">
        {label}
      </span>
      {children}
      {error && <span className="mt-0.5 block text-[12px] text-destructive">{error}</span>}
    </label>
  );
}
