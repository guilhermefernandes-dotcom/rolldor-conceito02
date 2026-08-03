const WEBHOOK_URL = "https://hook.us1.make.celonis.com/2mtfbb3ilskkmmppmd2qxazull573mng";

/** Envia o payload do formulário para o webhook externo (não bloqueia o fluxo). */
export function sendToWebhook(payload: Record<string, unknown>) {
  try {
    void fetch(WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...payload, enviado_em: new Date().toISOString() }),
      keepalive: true,
    }).catch(() => {});
  } catch {
    /* silencioso */
  }
}
