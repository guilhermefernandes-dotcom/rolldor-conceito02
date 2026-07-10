import { useState } from "react";
import { motion } from "motion/react";
import { CheckCircle2, Loader2, PhoneCall, ArrowRight, ChevronDown } from "lucide-react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";

const schema = z.object({
  nome: z.string().trim().min(2, "Informe seu nome").max(120),
  empresa: z.string().trim().min(2, "Informe o nome da empresa").max(160),
  cnpj: z.string().trim().max(25).optional().or(z.literal("")),
  whatsapp: z.string().trim().min(8, "Informe um WhatsApp válido").max(40),
  email: z.string().trim().email("Informe um e-mail válido").max(200),
  cidade: z.string().trim().min(2, "Informe a cidade").max(120),
  estado: z.string().trim().min(2, "Informe o estado").max(60),
  segmento: z.enum(["vidracaria", "esquadrias", "serralheria", "outro"], {
    message: "Selecione um segmento",
  }),
  faturamento: z.string().trim().max(60).optional().or(z.literal("")),
  mensagem: z.string().trim().max(1500).optional().or(z.literal("")),
});

type FormState = z.input<typeof schema>;

const initialState: FormState = {
  nome: "",
  empresa: "",
  cnpj: "",
  whatsapp: "",
  email: "",
  cidade: "",
  estado: "",
  segmento: "vidracaria",
  faturamento: "",
  mensagem: "",
};

export function FormularioRevenda() {
  const [values, setValues] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [serverError, setServerError] = useState<string | null>(null);
  const [segmentOpen, setSegmentOpen] = useState(false);

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setValues((v) => ({ ...v, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
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
    const payload = {
      nome: parsed.data.nome,
      empresa: parsed.data.empresa,
      cnpj: parsed.data.cnpj || null,
      whatsapp: parsed.data.whatsapp,
      email: parsed.data.email,
      cidade: parsed.data.cidade,
      estado: parsed.data.estado,
      segmento: parsed.data.segmento,
      faturamento: parsed.data.faturamento || null,
      mensagem: parsed.data.mensagem || null,
    };

    const { error } = await supabase.from("revenda_leads").insert(payload);
    if (error) {
      setStatus("error");
      setServerError(
        "Não foi possível enviar seu cadastro agora. Tente novamente em instantes.",
      );
      return;
    }
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
          Cadastro recebido!
        </h3>
        <p className="mx-auto mt-4 max-w-lg text-[18px] text-white/70 md:text-lg">
          Nossa equipe vai analisar sua região e o perfil da sua empresa e entrará em contato em
          breve para apresentar o programa de parceria Roll Door.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-8 inline-flex items-center gap-2 rounded-xl border border-white/15 px-6 py-3 font-display text-sm font-bold text-white transition-colors hover:bg-white/5"
        >
          Enviar outro cadastro
        </button>
      </motion.div>
    );
  }

  const inputBase =
    "w-full rounded-xl border bg-white/[0.03] px-4 py-3.5 font-sans text-[16px] text-white transition-colors placeholder:text-white/40 focus:outline-none focus:border-brand-green focus:ring-2 focus:ring-brand-green/25";

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-3xl border border-white/10 bg-white/[0.03] p-8 text-white shadow-[0_30px_80px_-30px_rgba(0,0,0,0.25)] backdrop-blur-sm md:p-12"
      noValidate
    >
      <div className="mb-8 text-center">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-brand-green/10">
          <PhoneCall className="h-6 w-6 text-brand-green" strokeWidth={1.8} />
        </div>
        <h3 className="font-display text-3xl font-medium text-white md:text-4xl">
          Cadastre sua empresa
        </h3>
        <p className="mx-auto mt-3 max-w-md text-[18px] leading-relaxed text-white/70">
          Preencha o formulário abaixo e nossa equipe entrará em contato para apresentar o programa
          de parceria.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <Field label="Nome" error={errors.nome}>
          <input
            className={`${inputBase} ${errors.nome ? "border-destructive" : "border-white/15"}`}
            value={values.nome}
            onChange={(e) => update("nome", e.target.value)}
            autoComplete="name"
          />
        </Field>
        <Field label="Empresa" error={errors.empresa}>
          <input
            className={`${inputBase} ${errors.empresa ? "border-destructive" : "border-white/15"}`}
            value={values.empresa}
            onChange={(e) => update("empresa", e.target.value)}
            autoComplete="organization"
          />
        </Field>
        <Field label="WhatsApp" error={errors.whatsapp}>
          <input
            className={`${inputBase} ${errors.whatsapp ? "border-destructive" : "border-white/15"}`}
            value={values.whatsapp}
            onChange={(e) => update("whatsapp", e.target.value)}
            placeholder="(11) 90000-0000"
            inputMode="tel"
            autoComplete="tel"
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
            className={`${inputBase} ${errors.estado ? "border-destructive" : "border-white/15"}`}
            value={values.estado}
            onChange={(e) => update("estado", e.target.value)}
            placeholder="Ex: SP"
            autoComplete="address-level1"
          />
        </Field>
        <Field label="CNPJ (opcional)" error={errors.cnpj}>
          <input
            className={`${inputBase} border-white/15`}
            value={values.cnpj}
            onChange={(e) => update("cnpj", e.target.value)}
            placeholder="00.000.000/0000-00"
          />
        </Field>
        <Field label="Segmento" error={errors.segmento}>
          <select
            className={`${inputBase} ${errors.segmento ? "border-destructive" : "border-white/15"}`}
            value={values.segmento}
            onChange={(e) => update("segmento", e.target.value as FormState["segmento"])}
          >
            <option value="vidracaria">Vidraçaria</option>
            <option value="esquadrias">Esquadrias</option>
            <option value="serralheria">Serralheria</option>
            <option value="outro">Outro</option>
          </select>
        </Field>
        <Field
          label="Faturamento mensal (opcional)"
          error={errors.faturamento}
          className="md:col-span-2"
        >
          <input
            className={`${inputBase} border-white/15`}
            value={values.faturamento}
            onChange={(e) => update("faturamento", e.target.value)}
            placeholder="Ex: R$ 50-100 mil"
          />
        </Field>
        <Field label="Mensagem (opcional)" error={errors.mensagem} className="md:col-span-2">
          <textarea
            className={`${inputBase} min-h-[120px] resize-y border-white/15`}
            value={values.mensagem}
            onChange={(e) => update("mensagem", e.target.value)}
            placeholder="Conte um pouco sobre sua empresa e sua região."
          />
        </Field>
      </div>

      {serverError && (
        <div className="mt-5 rounded-xl border border-destructive/30 bg-destructive/5 px-4 py-3 text-[15px] text-destructive">
          {serverError}
        </div>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="mt-8 inline-flex h-[62px] w-full items-center justify-center gap-2 rounded-2xl bg-brand-green px-8 font-display text-lg font-medium text-white transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70"
        style={{
          boxShadow: "0 18px 40px -12px rgba(151, 191, 76, 0.45)",
        }}
      >
        {status === "loading" ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" /> Enviando...
          </>
        ) : (
          <>
            Quero fazer parte <ArrowRight className="h-5 w-5" />
          </>
        )}
      </button>
      <p className="mt-4 text-[14px] text-white/50">
        Usamos seus dados apenas para responder ao seu contato sobre a parceria Roll Door.
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
      <span className="mb-2 block font-display text-[13px] font-medium uppercase tracking-[0.14em] text-white/60">
        {label}
      </span>
      {children}
      {error && <span className="mt-1.5 block text-[13px] text-destructive">{error}</span>}
    </label>
  );
}
