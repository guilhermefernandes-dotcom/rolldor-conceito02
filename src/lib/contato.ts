export const WHATSAPP_NUMERO = "5544988249953";
export const EMAIL_CONTATO = "contato@rolldoor.com.br";

/** Link wa.me com a mensagem já escrita (só dígitos, com 55, texto codificado). */
export function linkWhatsapp(mensagem: string) {
  return `https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(mensagem)}`;
}
