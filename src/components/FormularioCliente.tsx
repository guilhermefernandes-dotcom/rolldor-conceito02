import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { AlertCircle, CheckCircle2, ChevronDown, Loader2, ArrowRight, Lock } from "lucide-react";
import { z } from "zod";

import {
  HiddenUtmFields,
  readUtmFields,
  pushDataLayerEvent,
  pushFormSubmitEvent,
} from "@/lib/utm";
import { captureClickIds, getClickIds } from "@/lib/clickIds";
import { telefoneValido } from "@/lib/telefone";
import { TelefoneInput } from "@/components/TelefoneInput";

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
  // Precisa existir também no campo "tipo de solução" do Kommo
  "Não sei",
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

const selecione = "Escolha uma opção";

// Erros de digitação comuns no domínio do e-mail (gmial.com -> gmail.com)
const DOMINIOS_CERTOS: Record<string, string> = {
  "gmial.com": "gmail.com",
  "gmai.com": "gmail.com",
  "gmil.com": "gmail.com",
  "gamil.com": "gmail.com",
  "gmail.co": "gmail.com",
  "gmail.con": "gmail.com",
  "gmail.com.br": "gmail.com",
  "hotmial.com": "hotmail.com",
  "hotmai.com": "hotmail.com",
  "hotmail.con": "hotmail.com",
  "hotmail.co": "hotmail.com",
  "outlok.com": "outlook.com",
  "outlook.con": "outlook.com",
  "yahoo.con": "yahoo.com",
  "icloud.con": "icloud.com",
};

function sugestaoEmail(email: string): string | null {
  const [usuario, dominio] = email.trim().toLowerCase().split("@");
  if (!usuario || !dominio) return null;
  const certo = DOMINIOS_CERTOS[dominio];
  return certo ? `${usuario}@${certo}` : null;
}

const UFS = [
  "AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", "MT", "MS", "MG",
  "PA", "PB", "PR", "PE", "PI", "RJ", "RN", "RS", "RO", "RR", "SC", "SP", "SE", "TO",
];

const schema = z.object({
  nome: z.string().trim().min(2, "Digite seu nome").max(120),
  // DDD válido + celular (9 dígitos começando com 9) ou fixo (8 dígitos)
  whatsapp: z
    .string()
    .trim()
    .refine(telefoneValido, "Confira o número com DDD"),
  email: z
    .string()
    .trim()
    .min(1, "Digite seu e-mail")
    .email("Confira o e-mail, ex.: nome@gmail.com")
    .max(200),
  cidade: z.string().trim().min(2, "Digite a cidade da obra").max(120),
  // Dropdown fechado com as 27 siglas: o Kommo roteia o lead para o vendedor pela UF.
  estado: z
    .string()
    .trim()
    .toUpperCase()
    .refine((uf) => UFS.includes(uf), "Escolha o estado"),
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

// Visual único dos campos: 48px de altura (alvo de toque), fundo mais claro que o card
// para o campo se destacar, e 16px de fonte (abaixo disso o iPhone dá zoom ao tocar).
const CAMPO_BASE =
  "block h-11 w-full rounded-xl border bg-white/[0.07] px-3.5 font-sans text-[16px] text-white transition-colors placeholder:text-white/40 hover:border-white/40 focus:bg-white/[0.09] focus:border-brand-green focus:outline-none focus:ring-2 focus:ring-brand-green/25";
const CAMPO_OK = "border-white/20";
const CAMPO_ERRO = "border-[#FF8A80]";

export function FormularioCliente() {
  const [values, setValues] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "disqualified" | "error"
  >("idle");
  const [serverError, setServerError] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const honeypotRef = useRef<HTMLInputElement>(null);
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

  function erroDoCampo(key: keyof FormState, v: FormState): string | undefined {
    const r = schema.shape[key].safeParse(v[key]);
    return r.success ? undefined : r.error.issues[0]?.message;
  }

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    const novo = { ...values, [key]: value };
    setValues(novo);
    // Com erro na tela, revalida a cada tecla: o aviso some assim que a pessoa corrige
    if (errors[key]) setErrors((e) => ({ ...e, [key]: erroDoCampo(key, novo) }));
  }

  // Valida ao sair do campo, nunca enquanto a pessoa ainda está digitando
  function aoSair(key: keyof FormState) {
    if (!values[key]) return;
    setErrors((e) => ({ ...e, [key]: erroDoCampo(key, values) }));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (status === "loading") return;
    setServerError(null);
    const parsed = schema.safeParse(values);
    if (!parsed.success) {
      const fieldErrors: Partial<Record<keyof FormState, string>> = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as keyof FormState;
        if (!fieldErrors[key]) fieldErrors[key] = issue.message;
      }
      setErrors(fieldErrors);
      // Leva o foco ao primeiro campo com problema
      const primeiro = (Object.keys(initialState) as (keyof FormState)[]).find(
        (k) => fieldErrors[k],
      );
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
    // O envio ao Make sai do banco (trigger trg_enviar_lead_make), não do navegador:
    // o endereço do webhook não é alcançável por parte das redes dos visitantes.
    const webhookPayload = {
      ...lead,
      ...qualificacao,
      qualificado: qualificado ? "sim" : "nao",
      motivo: motivos.join(", ") || null,
      ...getClickIds(),
      origem: "residencial",
    };
    const { error } = await supabase.from("cliente_leads").insert({
      ...lead,
      tipo_projeto: "casa" as const,
      fase_obra: faseDb,
      webhook_payload: webhookPayload,
    });
    if (error) {
      setStatus("error");
      setServerError("Não foi possível enviar seu cadastro agora. Tente novamente em instantes.");
      return;
    }
    // Todo lead enviado dispara o gtm.formSubmit, que conta a conversão no Google e no Meta.
    // lead_qualificado / lead_desqualificado seguem para segmentar a qualidade no GTM.
    pushFormSubmitEvent();
    pushDataLayerEvent(qualificado ? "lead_qualificado" : "lead_desqualificado");
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
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-brand-green text-[#0E1111]">
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
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-brand-green text-[#0E1111]">
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

  const borda = (k: keyof FormState) => (errors[k] ? CAMPO_ERRO : CAMPO_OK);
  const aria = (k: keyof FormState) => ({
    "data-campo": k,
    "aria-invalid": errors[k] ? true : undefined,
    "aria-describedby": errors[k] ? `${k}-erro` : undefined,
    onBlur: () => aoSair(k),
  });
  const emailSugerido = sugestaoEmail(values.email);

  return (
    <form
      ref={formRef}
      onSubmit={onSubmit}
      id="formulario-orcamento"
      className={`relative rounded-3xl border bg-[#15181A] p-4 text-white shadow-[0_30px_80px_-30px_rgba(0,0,0,0.6)] transition-all duration-300 sm:p-6 md:p-8 ${
        highlight
          ? "border-brand-green/70 ring-2 ring-brand-green/40 ring-offset-2 ring-offset-transparent"
          : "border-white/10"
      }`}
      noValidate
    >
      <HiddenUtmFields />
      {/* Armadilha para robôs: invisível para pessoas e leitores de tela */}
      <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label>
          Site
          <input ref={honeypotRef} type="text" name="site" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="mb-5 md:mb-6">
        <h3 className="font-display text-[24px] font-medium leading-tight tracking-tight text-white md:text-[30px]">
          Solicite um orçamento
        </h3>
        <p className="mt-1.5 max-w-md text-[15px] leading-snug text-white/75 md:text-[16px]">
          Preencha seus dados e um especialista da Roll Door entra em contato.
        </p>
      </div>

      {/* Grupo 1: contato */}
      <div className="grid grid-cols-1 gap-x-3 gap-y-3 sm:grid-cols-2 md:gap-y-3.5">
        <Field label="Nome" campo="nome" error={errors.nome} className="sm:col-span-2">
          <input
            {...aria("nome")}
            className={`${CAMPO_BASE} ${borda("nome")}`}
            value={values.nome}
            onChange={(e) => update("nome", e.target.value)}
            autoComplete="name"
            autoCapitalize="words"
            enterKeyHint="next"
            maxLength={120}
          />
        </Field>
        <Field label="WhatsApp" campo="whatsapp" error={errors.whatsapp}>
          {/* Máscara: aceita colar +55, 0 de DDD, espaços e traços; o cursor não pula */}
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
            enterKeyHint="next"
            placeholder="nome@email.com"
          />
          {emailSugerido && (
            <button
              type="button"
              onClick={(e) => {
                // o campo está dentro de um <label>: sem isso o clique devolve o foco ao input
                e.preventDefault();
                update("email", emailSugerido);
              }}
              className="mt-1.5 text-left text-[13px] text-white/80 underline decoration-brand-green underline-offset-4 hover:text-white"
            >
              Você quis dizer <strong className="font-semibold text-white">{emailSugerido}</strong>?
            </button>
          )}
        </Field>
        <div className="grid grid-cols-[1fr_96px] gap-3 sm:col-span-2 md:grid-cols-[1fr_120px]">
          <Field label="Cidade da obra" campo="cidade" error={errors.cidade}>
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
            <UfCombobox
              value={values.estado}
              hasError={Boolean(errors.estado)}
              onChange={(uf) => update("estado", uf)}
            />
          </Field>
        </div>
      </div>

      {/* Grupo 2: qualificação da obra */}
      <div className="mt-5 flex items-center gap-3 md:mt-6">
        <span className="font-display text-[12px] font-semibold uppercase tracking-[0.16em] text-brand-green">
          Sobre a obra
        </span>
        <span aria-hidden className="h-px flex-1 bg-white/10" />
      </div>
      <div className="mt-3 grid grid-cols-2 gap-x-3 gap-y-3 md:mt-4 md:gap-y-3.5">
        <SelectField
          campo="perfil"
          label="Qual opção melhor descreve você?"
          value={values.perfil}
          options={PERFIL_OPCOES}
          error={errors.perfil}
          onChange={(v) => update("perfil", v)}
          className="col-span-2"
        />
        <SelectField
          campo="fase_obra"
          label="Em que fase está sua obra?"
          shortLabel="Fase da obra"
          value={values.fase_obra}
          options={FASE_OBRA_OPCOES}
          error={errors.fase_obra}
          onChange={(v) => update("fase_obra", v)}
        />
        <SelectField
          campo="tamanho_obra"
          label="Qual o tamanho da sua obra?"
          shortLabel="Tamanho da obra"
          value={values.tamanho_obra}
          options={TAMANHO_OBRA_OPCOES}
          error={errors.tamanho_obra}
          onChange={(v) => update("tamanho_obra", v)}
        />
        <SelectField
          campo="tipo_solucao"
          label="Que tipo de solução você procura?"
          value={values.tipo_solucao}
          options={TIPO_SOLUCAO_OPCOES}
          error={errors.tipo_solucao}
          onChange={(v) => update("tipo_solucao", v)}
          className="col-span-2"
        />
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
        className="mt-5 inline-flex h-[52px] w-full items-center justify-center gap-2 rounded-2xl px-6 font-display text-[17px] font-bold text-[#0E1111] transition-transform hover:-translate-y-0.5 active:scale-[0.99] disabled:cursor-wait disabled:opacity-80 md:mt-6 md:h-14 md:text-lg"
        style={{
          background: "#9CCB3B",
          boxShadow: "0 18px 40px -14px rgba(156, 203, 59, 0.55)",
        }}
      >
        {status === "loading" ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" aria-hidden /> Enviando...
          </>
        ) : (
          <>
            Solicitar orçamento <ArrowRight className="h-5 w-5" aria-hidden />
          </>
        )}
      </button>

      <p className="mt-3 flex items-center justify-center gap-1.5 text-center text-[13px] leading-snug text-white/60">
        <Lock className="h-3.5 w-3.5 shrink-0" aria-hidden />
        Seus dados são usados só para responder sobre o seu projeto.
      </p>
    </form>
  );
}

function SelectField({
  campo,
  label,
  shortLabel,
  placeholder = "Selecione",
  value,
  options,
  error,
  onChange,
  className = "",
}: {
  campo: string;
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
    <Field label={rotulo} campo={campo} error={error} className={className}>
      <div className="relative">
        <select
          data-campo={campo}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${campo}-erro` : undefined}
          className={`${CAMPO_BASE} appearance-none truncate pr-10 ${
            value ? "text-white" : "text-white/50"
          } ${error ? CAMPO_ERRO : CAMPO_OK}`}
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
          className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-white/60"
          strokeWidth={2}
        />
      </div>
    </Field>
  );
}

/**
 * Campo de UF digitável com lista filtrada. O valor só é definido quando o lead
 * escolhe uma opção da lista (clique ou setas + Enter); digitar sozinho não vale.
 */
function UfCombobox({
  value,
  hasError,
  onChange,
}: {
  value: string;
  hasError: boolean;
  onChange: (uf: string) => void;
}) {
  const [query, setQuery] = useState(value);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  // Ao abrir o campo mostra todas as UFs; só filtra depois que o lead digita.
  const [filtrando, setFiltrando] = useState(false);

  const filtradas = filtrando ? UFS.filter((uf) => uf.startsWith(query)) : UFS;

  function abrirLista() {
    setFiltrando(false);
    setActive(Math.max(UFS.indexOf(value), 0));
    setOpen(true);
  }

  function escolher(uf: string) {
    onChange(uf);
    setQuery(uf);
    setOpen(false);
  }

  function onInput(e: React.ChangeEvent<HTMLInputElement>) {
    const texto = e.target.value.replace(/[^a-zA-Z]/g, "").toUpperCase().slice(0, 2);
    setQuery(texto);
    setFiltrando(true);
    setActive(0);
    setOpen(true);
    // Digitar invalida a escolha anterior até o lead selecionar de novo na lista.
    if (value) onChange("");
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setOpen(true);
      setActive((i) => Math.min(i + 1, filtradas.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter" && open) {
      // Enter escolhe a opção destacada em vez de enviar o formulário.
      e.preventDefault();
      if (filtradas[active]) escolher(filtradas[active]);
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  }

  return (
    <div className="relative">
      <input
        className={`${CAMPO_BASE} px-2 text-center uppercase ${hasError ? CAMPO_ERRO : CAMPO_OK}`}
        value={query}
        onChange={onInput}
        onKeyDown={onKeyDown}
        onFocus={abrirLista}
        onClick={abrirLista}
        onBlur={() => setOpen(false)}
        placeholder="UF"
        // O Chrome ignora autocomplete="off" em campos que parecem endereço ("Estado") e
        // abre o autopreenchimento por cima da lista. "one-time-code" + name neutro evita isso.
        name="rd_uf_escolha"
        autoComplete="one-time-code"
        spellCheck={false}
        autoCapitalize="characters"
        data-campo="estado"
        aria-invalid={hasError || undefined}
        aria-describedby={hasError ? "estado-erro" : undefined}
        role="combobox"
        aria-expanded={open}
        aria-controls="uf-opcoes"
      />
      {open && filtradas.length > 0 && (
        <ul
          id="uf-opcoes"
          role="listbox"
          // Evita que clicar na lista (ou na barra de rolagem) tire o foco do campo.
          onMouseDown={(e) => e.preventDefault()}
          className="absolute right-0 z-30 mt-1 max-h-48 w-full min-w-[4.5rem] overflow-y-auto rounded-xl border border-white/15 bg-neutral-900 py-1 shadow-lg"
        >
          {filtradas.map((uf, i) => (
            <li
              key={uf}
              role="option"
              aria-selected={uf === value}
              // mousedown (e não click) para escolher antes do blur fechar a lista.
              onMouseDown={(e) => {
                e.preventDefault();
                escolher(uf);
              }}
              // O campo está dentro de um <label>: sem isso o clique "vaza" e reabre a lista.
              onClick={(e) => e.preventDefault()}
              onMouseEnter={() => setActive(i)}
              className={`cursor-pointer px-3 py-2 text-center font-sans text-[16px] text-white ${
                i === active ? "bg-brand-green/25" : ""
              }`}
            >
              {uf}
            </li>
          ))}
        </ul>
      )}
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
  label: React.ReactNode;
  campo?: string;
  error?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-1.5 block truncate font-display text-[14px] font-medium text-white/85">
        {label}
      </span>
      {children}
      {error && (
        <span
          id={campo ? `${campo}-erro` : undefined}
          className="mt-1.5 flex items-start gap-1.5 text-[13px] leading-snug text-[#FF8A80]"
        >
          <AlertCircle className="mt-[1px] h-3.5 w-3.5 shrink-0" aria-hidden />
          {error}
        </span>
      )}
    </label>
  );
}
