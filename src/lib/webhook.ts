const WEBHOOK_URL = "https://hook.us1.make.celonis.com/2mtfbb3ilskkmmppmd2qxazull573mng";

/** Envia os dados do formulário para o webhook externo. Nunca quebra o fluxo do usuário. */
export async function sendToWebhook(
  origem: string,
  payload: Record<string, unknown>,
): Promise<void> {
  const body = JSON.stringify({
    origem,
    enviado_em: new Date().toISOString(),
    pagina: typeof window !== "undefined" ? window.location.href : null,
    ...payload,
  });

  try {
    await fetch(WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
      keepalive: true,
    });
  } catch {
    // fallback para casos de bloqueio de CORS
    try {
      await fetch(WEBHOOK_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "text/plain;charset=UTF-8" },
        body,
        keepalive: true,
      });
    } catch {
      /* ignora falhas do webhook */
    }
  }
}
