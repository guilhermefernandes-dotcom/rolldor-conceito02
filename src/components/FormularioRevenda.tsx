import { useRef, useState } from "react";
import { motion } from "motion/react";
import { AlertCircle, ArrowRight, CheckCircle2, ChevronDown, Loader2, Lock } from "lucide-react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { telefoneValido } from "@/lib/telefone";
import { TelefoneInput } from "@/components/TelefoneInput";

const UFS = [
  "AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", "MT", "MS", "MG", "PA",
  "PB", "PR", "PE", "PI", "RJ", "RN", "RS", "RO", "RR", "SC", "SP", "SE", "TO",
];

const SEGMENTOS = [
  { value: "vidracaria", label: "Vidraçaria" },
  { value: "esquadrias", label: "Esquadrias" },
  { value: "serralheria", label: "Serralheria" },
  { value: "outro", label: "Outro" },
] as const;

/** 00.000.000/0000-00, formatado conforme digita ou cola. */
function formatarCnpj(valor: string) {
  const d = valor.replace(/\D/g, "").slice(0, 14);
  return d
    .replace(/^(\d{2})(\d)/, "$1.$2")
    .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
    .replace(/\.(\d{3})(\d)/, ".$1/$2")
    .replace(/(\d{4})(\d)/, "$1-$2");
}

/** Confere os dígitos verificadores do CNPJ. */
function cnpjValido(valor: string) {
  const d = valor.replace(/\D/g, "");
  if (d.length !== 14 || /^(\d)\1+$/.test(d)) return false;
  const dv = (base: string) => {
    let soma = 0;
    let peso = base.length - 7;
    for (const n of base) {
      soma += Number(n) * peso--;
      if (peso < 2) peso = 9;
    }
    const r = soma % 11;
    return r < 2 ? 0 : 11 - r;
  };
  return dv(d.slice(0, 12)) === Number(d[12]) && dv(d.slice(0, 13)) === Number(d[13]);
}

// Mesmas regras da policy do Supabase (revenda_leads), com mensagens que dizem como corrigir
const schema = z.object({
  nome: z.string().trim().min(2, "Digite seu nome").max(120),
  empresa: z.string().trim().min(2, "Digite o nome da empresa").max(160),
  cnpj: z.string().trim().refine(cnpjValido, "Confira o CNPJ (14 números)"),
  whatsapp: z.string().trim().refine(telefoneValido, "Confira o número com DDD"),
  email: z
    .string()
    .trim()
    .min(1, "Digite seu e-mail")
    .email("Confira o e-mail, ex.: nome@empresa.com")
    .max(200),
  cidade: z.string().trim().min(2, "Digite a cidade").max(120),
  estado: z
    .string()
    .trim()
    .refine((uf) => UFS.includes(uf), "Escolha o estado"),
  segmento: z.enum(["vidracaria", "esquadrias", "serralheria", "outro"], {
    message: "Escolha o segmento",
  }),
  faturamento: z.string().trim().max(60).optional().or(z.literal("")),
  mensagem: z.string().trim().max(1500).optional().or(z.literal("")),
});

type FormState = z.input<typeof schema>;
type Campo = keyof FormState;

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

// Ordem visual dos campos, para levar o foco ao primeiro com erro
const ORDEM: Campo[] = [
  "empresa",
  "cnpj",
  "segmento",
  "faturamento",
  "nome",
  "whatsapp",
  "email",
  "cidade",
  "estado",
  "mensagem",
];

// Visual único dos campos: 48px de altura, fundo mais claro que o card e fonte de 16px
// (abaixo disso o iPhone dá zoom ao tocar no campo).
const CAMPO_BASE =
  "block h-11 w-full rounded-xl border bg-white/[0.07] px-3.5 font-sans text-[16px] text-white transition-colors placeholder:text-white/40 hover:border-white/40 focus:bg-white/[0.09] focus:border-brand-green focus:outline-none focus:ring-2 focus:ring-brand-green/25";
const CAMPO_OK = "border-white/20";
const CAMPO_ERRO = "border-[#FF8A80]";

export function FormularioRevenda() {
  const [values, setValues] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<Partial<Record<Campo, string>>>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [serverError, setServerError] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const honeypotRef = useRef<HTMLInputElement>(null);

  function erroDoCampo(key: Campo, v: FormState): string | undefined {
    const r = schema.shape[key].safeParse(v[key]);
    return r.success ? undefined : r.error.issues[0]?.message;
  }

  function update<K extends Campo>(key: K, value: FormState[K]) {
    const novo = { ...values, [key]: value };
    setValues(novo);
    // Com erro na tela, revalida a cada tecla: o aviso some assim que a pessoa corrige
    if (errors[key]) setErrors((e) => ({ ...e, [key]: erroDoCampo(key, novo) }));
  }

  // Valida ao sair do campo, nunca enquanto a pessoa ainda está digitando
  function aoSair(key: Campo) {
    if (!values[key]) return;
    setErrors((e) => ({ ...e, [key]: erroDoCampo(key, values) }));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (status === "loading") return;
    setServerError(null);
    const parsed = schema.safeParse(values);
    if (!parsed.success) {
      const fieldErrors: Partial<Record<Campo, string>> = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as Campo;
        if (!fieldErrors[key]) fieldErrors[key] = issue.message;
      }
      setErrors(fieldErrors);
      const primeiro = ORDEM.find((k) => fieldErrors[k]);
      const el = primeiro
        ? formRef.current?.querySelector<HTMLElement>(`[data-campo="${primeiro}"]`)
        : null;
      el?.focus({ preventScroll: true });
      el?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    // Robô preencheu o campo invisível: mostra sucesso e não grava nada
    if (honeypotRef.current?.value) {
      setStatus("success");
      return;
    }

    setStatus("loading");
    const payload = {
      nome: parsed.data.nome,
      empresa: parsed.data.empresa,
      cnpj: parsed.data.cnpj || null,
      whatsapp: parsed.data.whatsapp,
      email: parsed.data.email.toLowerCase(),
      cidade: parsed.data.cidade,
      estado: parsed.data.estado,
      segmento: parsed.data.segmento,
      faturamento: parsed.data.faturamento || null,
      mensagem: parsed.data.mensagem || null,
    };

    const { error } = await supabase.from("revenda_leads").insert(payload);
    if (error) {
      setStatus("error");
      setServerError("Não foi possível enviar seu cadastro agora. Tente novamente em instantes.");
      return;
    }

    setStatus("success");
    setValues(initialState);
    setErrors({});
  }

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        role="status"
        className="rounded-3xl border border-white/10 bg-[#15181A] p-8 text-center text-white shadow-[0_30px_80px_-30px_rgba(0,0,0,0.6)] md:p-14"
      >
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-brand-green text-[#0E1111]">
          <CheckCircle2 className="h-8 w-8" strokeWidth={2} />
        </div>
        <h3 className="font-display text-3xl font-medium text-white md:text-4xl">
          Cadastro recebido!
        </h3>
        <p className="mx-auto mt-4 max-w-lg text-[17px] leading-relaxed text-white/80 md:text-lg">
          Nossa equipe vai analisar sua região e o perfil da sua empresa e entrará em contato em
          breve para apresentar o programa de parceria Roll Door.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-8 inline-flex min-h-11 items-center gap-2 rounded-xl border border-white/20 px-6 py-3 font-display text-sm font-bold text-white transition-colors hover:bg-white/5"
        >
          Enviar outro cadastro
        </button>
      </motion.div>
    );
  }

  const borda = (k: Campo) => (errors[k] ? CAMPO_ERRO : CAMPO_OK);
  const aria = (k: Campo) => ({
    "data-campo": k,
    "aria-invalid": errors[k] ? true : undefined,
    "aria-describedby": errors[k] ? `revenda-${k}-erro` : undefined,
    onBlur: () => aoSair(k),
  });

  return (
    <form
      ref={formRef}
      onSubmit={onSubmit}
      className="relative rounded-3xl border border-white/10 bg-[#15181A] p-4 text-white shadow-[0_30px_80px_-30px_rgba(0,0,0,0.6)] sm:p-6 md:p-8"
      noValidate
    >
      {/* Armadilha para robôs: invisível para pessoas e leitores de tela */}
      <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label>
          Site
          <input ref={honeypotRef} type="text" name="site" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="mb-5 md:mb-6">
        <h3 className="font-display text-[24px] font-medium leading-tight tracking-tight text-white md:text-[30px]">
          Cadastre sua empresa
        </h3>
        <p className="mt-1.5 max-w-md text-[15px] leading-snug text-white/75 md:text-[16px]">
          Nossa equipe entra em contato para apresentar o programa de parceria.
        </p>
      </div>

      {/* Grupo 1: empresa */}
      <Grupo titulo="Sua empresa" primeiro />
      <div className="mt-3 grid grid-cols-1 gap-x-3 gap-y-3 sm:grid-cols-2 md:mt-4 md:gap-y-3.5">
        <Field label="Nome da empresa" campo="empresa" error={errors.empresa} className="sm:col-span-2">
          <input
            {...aria("empresa")}
            className={`${CAMPO_BASE} ${borda("empresa")}`}
            value={values.empresa}
            onChange={(e) => update("empresa", e.target.value)}
            autoComplete="organization"
            enterKeyHint="next"
          />
        </Field>
        <Field label="CNPJ" campo="cnpj" error={errors.cnpj}>
          <input
            {...aria("cnpj")}
            className={`${CAMPO_BASE} ${borda("cnpj")}`}
            value={values.cnpj}
            onChange={(e) => update("cnpj", formatarCnpj(e.target.value))}
            placeholder="00.000.000/0000-00"
            inputMode="numeric"
            autoComplete="off"
            maxLength={18}
            enterKeyHint="next"
          />
        </Field>
        <Field label="Segmento" campo="segmento" error={errors.segmento}>
          <div className="relative">
            <select
              {...aria("segmento")}
              className={`${CAMPO_BASE} ${borda("segmento")} appearance-none pr-10`}
              value={values.segmento}
              onChange={(e) => update("segmento", e.target.value as FormState["segmento"])}
            >
              {SEGMENTOS.map((s) => (
                <option key={s.value} value={s.value} className="bg-neutral-900 text-white">
                  {s.label}
                </option>
              ))}
            </select>
            <ChevronDown
              aria-hidden
              className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-white/60"
            />
          </div>
        </Field>
        <Field
          label="Faturamento mensal (opcional)"
          campo="faturamento"
          error={errors.faturamento}
          className="sm:col-span-2"
        >
          <input
            {...aria("faturamento")}
            className={`${CAMPO_BASE} ${borda("faturamento")}`}
            value={values.faturamento}
            onChange={(e) => update("faturamento", e.target.value)}
            placeholder="Ex.: R$ 50 a 100 mil"
            enterKeyHint="next"
          />
        </Field>
      </div>

      {/* Grupo 2: contato */}
      <Grupo titulo="Seu contato" />
      <div className="mt-3 grid grid-cols-1 gap-x-3 gap-y-3 sm:grid-cols-2 md:mt-4 md:gap-y-3.5">
        <Field label="Seu nome" campo="nome" error={errors.nome} className="sm:col-span-2">
          <input
            {...aria("nome")}
            className={`${CAMPO_BASE} ${borda("nome")}`}
            value={values.nome}
            onChange={(e) => update("nome", e.target.value)}
            autoComplete="name"
            autoCapitalize="words"
            enterKeyHint="next"
          />
        </Field>
        <Field label="WhatsApp" campo="whatsapp" error={errors.whatsapp}>
          <TelefoneInput
            {...aria("whatsapp")}
            className={`${CAMPO_BASE} ${borda("whatsapp")}`}
            value={values.whatsapp}
            onValueChange={(v) => update("whatsapp", v)}
            placeholder="(44) 98824-9953"
            enterKeyHint="next"
          />
        </Field>
        <Field label="E-mail" campo="email" error={errors.email}>
          <input
            {...aria("email")}
            type="email"
            inputMode="email"
            className={`${CAMPO_BASE} ${borda("email")}`}
            value={values.email}
            onChange={(e) => update("email", e.target.value.replace(/\s/g, ""))}
            autoComplete="email"
            autoCapitalize="off"
            autoCorrect="off"
            spellCheck={false}
            placeholder="nome@empresa.com"
            enterKeyHint="next"
          />
        </Field>
        <div className="grid grid-cols-[1fr_96px] gap-3 sm:col-span-2 md:grid-cols-[1fr_120px]">
          <Field label="Cidade" campo="cidade" error={errors.cidade}>
            <input
              {...aria("cidade")}
              className={`${CAMPO_BASE} ${borda("cidade")}`}
              value={values.cidade}
              onChange={(e) => update("cidade", e.target.value)}
              autoComplete="address-level2"
              autoCapitalize="words"
              enterKeyHint="next"
            />
          </Field>
          <Field label="Estado" campo="estado" error={errors.estado}>
            <div className="relative">
              <select
                {...aria("estado")}
                className={`${CAMPO_BASE} ${borda("estado")} appearance-none pr-8 ${
                  values.estado ? "" : "text-white/50"
                }`}
                value={values.estado}
                onChange={(e) => {
                  update("estado", e.target.value);
                  setErrors((er) => ({ ...er, estado: undefined }));
                }}
                autoComplete="address-level1"
              >
                <option value="" disabled className="bg-neutral-900 text-white/60">
                  UF
                </option>
                {UFS.map((uf) => (
                  <option key={uf} value={uf} className="bg-neutral-900 text-white">
                    {uf}
                  </option>
                ))}
              </select>
              <ChevronDown
                aria-hidden
                className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/60"
              />
            </div>
          </Field>
        </div>
        <Field
          label="Mensagem (opcional)"
          campo="mensagem"
          error={errors.mensagem}
          className="sm:col-span-2"
        >
          <textarea
            {...aria("mensagem")}
            className={`${CAMPO_BASE} ${borda("mensagem")} h-auto min-h-[88px] resize-y py-2.5`}
            value={values.mensagem}
            onChange={(e) => update("mensagem", e.target.value)}
            maxLength={1500}
            placeholder="Conte um pouco sobre sua empresa e sua região."
          />
        </Field>
      </div>

      {serverError && (
        <div
          role="alert"
          className="mt-5 flex items-start gap-2 rounded-xl border border-[#FF8A80]/40 bg-[#FF8A80]/10 px-3 py-2.5 text-[14px] text-white"
        >
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-[#FF8A80]" aria-hidden />
          {serverError}
        </div>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        aria-busy={status === "loading"}
        className="mt-5 inline-flex h-[52px] w-full items-center justify-center gap-2 rounded-2xl bg-brand-green px-6 font-display text-[17px] font-bold text-[#0E1111] transition-transform hover:-translate-y-0.5 active:scale-[0.99] disabled:cursor-wait disabled:opacity-80 md:mt-6 md:h-14 md:text-lg"
        style={{ boxShadow: "0 18px 40px -14px rgba(156, 203, 59, 0.55)" }}
      >
        {status === "loading" ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" aria-hidden /> Enviando...
          </>
        ) : (
          <>
            Quero fazer parte <ArrowRight className="h-5 w-5" aria-hidden />
          </>
        )}
      </button>
      <p className="mt-3 flex items-start justify-center gap-1.5 text-center text-[13px] leading-snug text-white/60">
        <Lock className="mt-[2px] h-3.5 w-3.5 shrink-0" aria-hidden />
        Seus dados são usados só para responder sobre a parceria Roll Door.
      </p>
    </form>
  );
}

function Grupo({ titulo, primeiro = false }: { titulo: string; primeiro?: boolean }) {
  return (
    <div className={`flex items-center gap-3 ${primeiro ? "" : "mt-5 md:mt-6"}`}>
      <span className="font-display text-[12px] font-semibold uppercase tracking-[0.16em] text-brand-green">
        {titulo}
      </span>
      <span aria-hidden className="h-px flex-1 bg-white/10" />
    </div>
  );
}

function Field({
  label,
  campo,
  error,
  children,
  className = "",
}: {
  label: string;
  campo: Campo;
  error?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-1.5 block font-display text-[14px] font-medium text-white/85">{label}</span>
      {children}
      {error && (
        <span
          id={`revenda-${campo}-erro`}
          className="mt-1.5 flex items-start gap-1.5 text-[13px] leading-snug text-[#FF8A80]"
        >
          <AlertCircle className="mt-[1px] h-3.5 w-3.5 shrink-0" aria-hidden />
          {error}
        </span>
      )}
    </label>
  );
}
