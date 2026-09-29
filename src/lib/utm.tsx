import * as React from "react";

const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"] as const;

export type UtmKey = (typeof UTM_KEYS)[number];

const STORAGE_KEY = "rd_utm_params";

/** Lê as UTMs da URL atual, com fallback para o que já foi capturado na sessão. */
export function getUtmParams(): Record<UtmKey, string> {
  const out = {} as Record<UtmKey, string>;
  for (const key of UTM_KEYS) out[key] = "";
  if (typeof window === "undefined") return out;

  const params = new URLSearchParams(window.location.search);
  let found = false;
  for (const key of UTM_KEYS) {
    const value = params.get(key);
    if (value) {
      out[key] = value;
      found = true;
    }
  }

  if (found) {
    try {
      window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(out));
    } catch {
      /* ignore */
    }
    return out;
  }

  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY);
    if (raw) {
      const saved = JSON.parse(raw) as Partial<Record<UtmKey, string>>;
      for (const key of UTM_KEYS) if (saved[key]) out[key] = saved[key] as string;
    }
  } catch {
    /* ignore */
  }
  return out;
}

/** Hidden inputs preenchidos com as UTMs da URL após a hidratação. */
export function HiddenUtmFields() {
  const [utm, setUtm] = React.useState<Record<UtmKey, string> | null>(null);

  React.useEffect(() => {
    setUtm(getUtmParams());
  }, []);

  return (
    <>
      {UTM_KEYS.map((key) => (
        <input
          key={key}
          type="hidden"
          className="gpc_campo"
          name={key}
          value={utm?.[key] ?? ""}
          readOnly
        />
      ))}
    </>
  );
}

/** Lê os valores atuais de UTM (campos ocultos do formulário ou URL/sessão). */
export function readUtmFields(form: HTMLFormElement | null): Record<UtmKey, string | null> {
  const fromUrl = getUtmParams();
  const out = {} as Record<UtmKey, string | null>;
  for (const key of UTM_KEYS) {
    const el = form?.querySelector<HTMLInputElement>(`input[name="${key}"]`);
    const raw = el?.value ?? "";
    const value = raw && !raw.includes("{") ? raw : fromUrl[key];
    out[key] = value || null;
  }
  return out;
}

/** Envia um evento para o dataLayer do GTM. */
export function pushDataLayerEvent(event: string) {
  const w = window as unknown as { dataLayer?: unknown[] };
  w.dataLayer = w.dataLayer || [];
  w.dataLayer.push({ event });
}

/** Dispara o evento de envio de formulário no GTM (gatilho das conversões). */
export function pushFormSubmitEvent() {
  pushDataLayerEvent("gtm.formSubmit");
}
