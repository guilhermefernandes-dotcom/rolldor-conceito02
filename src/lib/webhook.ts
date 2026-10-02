const WEBHOOK_URL = "https://hook.us1.make.celonis.com/2mtfbb3ilskkmmppmd2qxazull573mng";

/**
 * Envia o payload do formulário para o webhook externo (não bloqueia o fluxo).
 * Usa form-urlencoded (requisição "simples", sem preflight de CORS): o JSON com
 * keepalive era descartado no Safari/iOS e nos navegadores do Instagram/Facebook.
 */
export function sendToWebhook(payload: Record<string, unknown>) {
  const body = new URLSearchParams();
  for (const [key, value] of Object.entries({ ...payload, enviado_em: new Date().toISOString() })) {
    if (value !== null && value !== undefined) body.append(key, String(value));
  }

  try {
    if (navigator.sendBeacon?.(WEBHOOK_URL, body)) return;
  } catch {
    /* cai no fetch abaixo */
  }

  try {
    void fetch(WEBHOOK_URL, { method: "POST", mode: "no-cors", body, keepalive: true }).catch(() => {});
  } catch {
    /* silencioso */
  }
}
