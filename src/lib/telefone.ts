/**
 * Telefone brasileiro: normaliza qualquer coisa colada ou digitada
 * ("+55 (44) 98824-9953", "5544988249953", "044 98824 9953", "44988249953")
 * para no máximo 11 dígitos (DDD + número) e formata como (44) 98824-9953.
 */

const DDDS_VALIDOS = new Set([
  11, 12, 13, 14, 15, 16, 17, 18, 19, 21, 22, 24, 27, 28, 31, 32, 33, 34, 35, 37, 38, 41, 42, 43,
  44, 45, 46, 47, 48, 49, 51, 53, 54, 55, 61, 62, 63, 64, 65, 66, 67, 68, 69, 71, 73, 74, 75, 77,
  79, 81, 82, 83, 84, 85, 86, 87, 88, 89, 91, 92, 93, 94, 95, 96, 97, 98, 99,
]);

/** Só os dígitos nacionais (DDD + número), sem +55 nem zero de operadora. */
export function digitosTelefone(valor: string): string {
  let d = valor.replace(/\D/g, "");
  // +55 / 55 na frente de um número completo
  if (d.length > 11 && d.startsWith("55")) d = d.slice(2);
  // 0 de discagem interurbana (044...) e código de operadora (0 15 44...)
  if (d.length > 11 && d.startsWith("0")) d = d.replace(/^0\d{2}(?=\d{10,11}$)/, "");
  if (d.length > 10 && d.startsWith("0")) d = d.slice(1);
  return d.slice(0, 11);
}

/** Formata progressivamente enquanto a pessoa digita. */
export function formatarTelefone(digitos: string): string {
  const d = digitos.slice(0, 11);
  if (d.length === 0) return "";
  if (d.length <= 2) return `(${d}`;
  const ddd = d.slice(0, 2);
  const resto = d.slice(2);
  // No Brasil só celular começa com 9 (9 dígitos); fixo começa com 2–5 (8 dígitos)
  const celular = d.length === 11 || resto.startsWith("9");
  const corte = celular ? 5 : 4;
  if (resto.length <= corte) return `(${ddd}) ${resto}`;
  return `(${ddd}) ${resto.slice(0, corte)}-${resto.slice(corte)}`;
}

export function telefoneValido(valor: string): boolean {
  const d = digitosTelefone(valor);
  if (d.length !== 10 && d.length !== 11) return false;
  if (!DDDS_VALIDOS.has(Number(d.slice(0, 2)))) return false;
  // Celular tem 9 dígitos começando com 9; fixo tem 8 começando com 2–5
  if (d.length === 11) return d[2] === "9";
  return /[2-5]/.test(d[2]);
}

/** +5544988249953 — útil para o CRM abrir o WhatsApp direto. */
export function telefoneE164(valor: string): string {
  const d = digitosTelefone(valor);
  return d ? `+55${d}` : "";
}
