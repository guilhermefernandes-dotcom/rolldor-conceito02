const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"] as const;

export type UtmKey = (typeof UTM_KEYS)[number];

/** Hidden inputs preenchidos automaticamente pelo script de UTM (gpc_campo). */
export function HiddenUtmFields() {
  return (
    <>
      {UTM_KEYS.map((key) => (
        <input
          key={key}
          type="hidden"
          className="gpc_campo"
          name={key}
          defaultValue={`{${key}}`}
        />
      ))}
    </>
  );
}

/** Lê os valores atuais dos campos ocultos de UTM dentro do formulário. */
export function readUtmFields(form: HTMLFormElement | null): Record<UtmKey, string | null> {
  const out = {} as Record<UtmKey, string | null>;
  for (const key of UTM_KEYS) {
    const el = form?.querySelector<HTMLInputElement>(`input[name="${key}"]`);
    const value = el?.value ?? "";
    out[key] = value && !value.includes("{") ? value : null;
  }
  return out;
}

/** Dispara o evento de envio de formulário no GTM. */
export function pushFormSubmitEvent() {
  const w = window as unknown as { dataLayer?: unknown[] };
  w.dataLayer = w.dataLayer || [];
  w.dataLayer.push({ event: "gtm.formSubmit" });
}
