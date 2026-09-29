import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { CheckCircle2, ChevronDown, Loader2, ArrowRight, Home } from "lucide-react";
import { z } from "zod";

import {
  HiddenUtmFields,
  readUtmFields,
  pushDataLayerEvent,
  pushFormSubmitEvent,
} from "@/lib/utm";
import { captureClickIds, getClickIds } from "@/lib/clickIds";
import { sendToWebhook } from "@/lib/webhook";

// Perguntas de qualificação. Os textos precisam ser idênticos às opções dos
// campos de seleção no Kommo, porque o Make preenche os campos pelo texto.
const PERFIL_OPCOES = [
  "Sou dono(a) da obra",
  "Sou arquiteto(a) ou engenheiro(a)",
  "Sou fornecedor",
  "Só estou pesquisando",
];
const FASE_OBRA_OPCOES = [
  "Projeto",
  "Em construção",
  "Obra em fase de acabamento",
  "Reforma",
  "Ainda não tenho obra",
];
const TAMANHO_OBRA_OPCOES = [
  "Até 100 m²",
  "De 100 a 200 m²",
  "De 200 a 400 m²",
  "Acima de 400 m²",
];
const TIPO_SOLUCAO_OPCOES = [
  "Portas de correr / grandes vãos",
  "Janelas",
  "Porta pivotante",
  "Projeto completo de esquadrias",
];

// Respostas que desqualificam o lead: vai só para a planilha, não para o Kommo,
// e não dispara a conversão de anúncios.
const DESQUALIFICA: Record<string, string> = {
  "Sou fornecedor": "Fornecedor",
  "Só estou pesquisando": "Só pesquisando",
  "Ainda não tenho obra": "Não tem obra",
};

// Mapeia a fase escolhida para o enum da coluna fase_obra (obrigatória) no banco.
const FASE_OBRA_DB = {
  Projeto: "projeto",
  "Em construção": "construcao",
  "Obra em fase de acabamento": "finalizacao",
  Reforma: "reforma",
} as const;

const selecione = "Selecione uma opção";

const UFS = [
  "AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", "MT", "MS", "MG",
  "PA", "PB", "PR", "PE", "PI", "RJ", "RN", "RS", "RO", "RR", "SC", "SP", "SE", "TO",
];

const schema = z.object({
  nome: z.string().trim().min(2, "Informe seu nome").max(120),
  whatsapp: z.string().trim().min(8, "Informe um WhatsApp válido").max(40),
  email: z.string().trim().email("Informe um e-mail válido").max(200),
  cidade: z.string().trim().min(2, "Informe a cidade").max(120),
  // Dropdown fechado com as 27 siglas: o Kommo roteia o lead para o vendedor pela UF.
  estado: z
    .string()
    .trim()
    .toUpperCase()
    .refine((uf) => UFS.includes(uf), "Selecione o estado"),
  perfil: z.string().min(1, selecione),
  fase_obra: z.string().min(1, selecione),
  tamanho_obra: z.string().min(1, selecione),
  tipo_solucao: z.string().min(1, selecione),
});

type FormState = z.input<typeof schema>;

const initialState: FormState = {
  nome: "",
  whatsapp: "",
  email: "",
  cidade: "",
  estado: "",
  perfil: "",
  fase_obra: "",
  tamanho_obra: "",
  tipo_solucao: "",
};

export function FormularioCliente() {
  const [values, setValues] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "disqualified" | "error"
  >("idle");
  const [serverError, setServerError] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [highlight, setHighlight] = useState(false);

  // Guarda gclid/fbclid da URL de entrada para enviar ao webhook no envio do formulário.
  useEffect(() => {
    captureClickIds();
  }, []);

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
    const lead = {
      nome: parsed.data.nome,
      whatsapp: parsed.data.whatsapp,
      email: parsed.data.email,
      cidade: parsed.data.cidade,
      estado: parsed.data.estado,
      mensagem: null,
      ...utm,
    };
    const qualificacao = {
      perfil: parsed.data.perfil,
      fase_obra: parsed.data.fase_obra,
      tamanho_obra: parsed.data.tamanho_obra,
      tipo_solucao: parsed.data.tipo_solucao,
    };
    const motivos = [qualificacao.perfil, qualificacao.fase_obra]
      .map((resposta) => DESQUALIFICA[resposta])
      .filter(Boolean);
    const qualificado = motivos.length === 0;

    // Import dinâmico: mantém o cliente de dados fora do carregamento inicial da página.
    const { supabase } = await import("@/integrations/supabase/client");
    // tipo_projeto não é mais perguntado, mas segue obrigatório na tabela.
    const faseDb =
      FASE_OBRA_DB[qualificacao.fase_obra as keyof typeof FASE_OBRA_DB] ?? "projeto";
    const { error } = await supabase
      .from("cliente_leads")
      .insert({ ...lead, tipo_projeto: "casa" as const, fase_obra: faseDb });
    if (error) {
      setStatus("error");
      setServerError("Não foi possível enviar seu cadastro agora. Tente novamente em instantes.");
      return;
    }
    sendToWebhook({
      ...lead,
      ...qualificacao,
      qualificado: qualificado ? "sim" : "nao",
      motivo: motivos.join(", ") || null,
      ...getClickIds(),
      origem: "residencial",
    });
    // Só o lead qualificado dispara o gtm.formSubmit, que conta a conversão no Google e no Meta.
    if (qualificado) {
      pushFormSubmitEvent();
      pushDataLayerEvent("lead_qualificado");
    } else {
      pushDataLayerEvent("lead_desqualificado");
    }
    setStatus(qualificado ? "success" : "disqualified");
    setValues(initialState);
  }

  if (status === "disqualified") {
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
          Obrigado pelo contato!
        </h3>
        <p className="mx-auto mt-4 max-w-lg text-[18px] text-white/70 md:text-lg">
          Neste momento nosso atendimento é focado em projetos com obra em andamento. Enquanto
          isso, conheça nossos projetos no Instagram{" "}
          <a
            href="https://www.instagram.com/rolldoorcompany/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-brand-green underline-offset-4 hover:underline"
          >
            @rolldoorcompany
          </a>
          .
        </p>
      </motion.div>
    );
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
    "w-full rounded-xl border bg-white/[0.03] px-3 py-2 font-sans text-[15px] md:py-2.5 text-white transition-colors placeholder:text-white/40 focus:outline-none focus:border-brand-green focus:ring-2 focus:ring-brand-green/25";

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
      <div className="mb-2 text-center md:mb-3">
        <div className="mx-auto mb-2 hidden h-10 w-10 items-center justify-center rounded-full bg-brand-green/10 md:flex">
          <Home className="h-4 w-4 text-brand-green" strokeWidth={1.8} />
        </div>
        <h3 className="font-display text-xl font-medium text-white md:text-3xl">
          Solicite um orçamento.
        </h3>
        <p className="mx-auto mt-1 max-w-md text-[13px] leading-snug text-white/70 md:text-[15px]">
          Preencha seus dados e um especialista da Roll Door entrará em contato.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-x-2 gap-y-1.5 md:gap-2">
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
        <Field label="E-mail" error={errors.email} className="col-span-2 md:col-span-1">
          <input
            type="email"
            className={`${inputBase} ${errors.email ? "border-destructive" : "border-white/15"}`}
            value={values.email}
            onChange={(e) => update("email", e.target.value)}
            autoComplete="email"
          />
        </Field>
        <div className="col-span-2 grid grid-cols-[3fr_1fr] gap-2">
          <Field label="Cidade" error={errors.cidade}>
            <input
              className={`${inputBase} ${errors.cidade ? "border-destructive" : "border-white/15"}`}
              value={values.cidade}
              onChange={(e) => update("cidade", e.target.value)}
              autoComplete="address-level2"
            />
          </Field>
          <SelectField
            label="Estado"
            placeholder="UF"
            value={values.estado}
            options={UFS}
            error={errors.estado}
            onChange={(v) => update("estado", v)}
          />
        </div>
        <SelectField
          label="Qual opção melhor descreve você?"
          value={values.perfil}
          options={PERFIL_OPCOES}
          error={errors.perfil}
          onChange={(v) => update("perfil", v)}
          className="col-span-2"
        />
        <SelectField
          label="Em que fase está sua obra?"
          shortLabel="Fase da obra"
          value={values.fase_obra}
          options={FASE_OBRA_OPCOES}
          error={errors.fase_obra}
          onChange={(v) => update("fase_obra", v)}
        />
        <SelectField
          label="Qual o tamanho da sua obra?"
          shortLabel="Tamanho da obra"
          value={values.tamanho_obra}
          options={TAMANHO_OBRA_OPCOES}
          error={errors.tamanho_obra}
          onChange={(v) => update("tamanho_obra", v)}
        />
        <SelectField
          label="Que tipo de solução você procura?"
          value={values.tipo_solucao}
          options={TIPO_SOLUCAO_OPCOES}
          error={errors.tipo_solucao}
          onChange={(v) => update("tipo_solucao", v)}
          className="col-span-2"
        />
      </div>

      {serverError && (
        <div className="mt-4 rounded-xl border border-destructive/30 bg-destructive/5 px-3 py-2 text-[14px] text-destructive">
          {serverError}
        </div>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="mt-3 inline-flex h-12 w-full items-center justify-center gap-2 rounded-2xl px-6 font-display text-base font-semibold text-white transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70 sm:h-16 sm:text-lg md:mt-4"
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

function SelectField({
  label,
  shortLabel,
  placeholder = "Selecione",
  value,
  options,
  error,
  onChange,
  className = "",
}: {
  label: string;
  /** Rótulo curto usado no mobile, onde o campo ocupa meia largura. */
  shortLabel?: string;
  placeholder?: string;
  value: string;
  options: string[];
  error?: string;
  onChange: (value: string) => void;
  className?: string;
}) {
  const rotulo = shortLabel ? (
    <>
      <span className="md:hidden">{shortLabel}</span>
      <span className="hidden md:inline">{label}</span>
    </>
  ) : (
    label
  );
  return (
    <Field label={rotulo} error={error} className={className}>
      <div className="relative">
        <select
          className={`w-full appearance-none rounded-xl border bg-white/[0.03] py-2 pl-3 pr-8 md:py-2.5 font-sans text-[15px] transition-colors focus:outline-none focus:border-brand-green focus:ring-2 focus:ring-brand-green/25 ${
            value ? "text-white" : "text-white/40"
          } ${error ? "border-destructive" : "border-white/15"}`}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        >
          <option value="" disabled className="bg-neutral-900 text-white/60">
            {placeholder}
          </option>
          {options.map((opcao) => (
            <option key={opcao} value={opcao} className="bg-neutral-900 text-white">
              {opcao}
            </option>
          ))}
        </select>
        <ChevronDown
          className="pointer-events-none absolute right-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-white/50"
          strokeWidth={2}
        />
      </div>
    </Field>
  );
}

function Field({
  label,
  error,
  children,
  className = "",
}: {
  label: React.ReactNode;
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
