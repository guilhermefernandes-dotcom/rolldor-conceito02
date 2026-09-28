const CLICK_ID_KEYS = ["gclid", "gbraid", "wbraid", "fbclid"] as const;

type ClickIdKey = (typeof CLICK_ID_KEYS)[number];

const STORAGE_PREFIX = "rd_click_";
const TTL_MS = 90 * 24 * 60 * 60 * 1000;

/** Salva os IDs de clique presentes na URL atual (não apaga os já salvos). */
export function captureClickIds() {
  if (typeof window === "undefined") return;
  const params = new URLSearchParams(window.location.search);
  for (const key of CLICK_ID_KEYS) {
    const value = params.get(key);
    if (!value) continue;
    try {
      window.localStorage.setItem(STORAGE_PREFIX + key, JSON.stringify({ v: value, t: Date.now() }));
    } catch {
      /* ignore */
    }
  }
}

function readStored(key: ClickIdKey): string | null {
  try {
    const raw = window.localStorage.getItem(STORAGE_PREFIX + key);
    if (!raw) return null;
    const saved = JSON.parse(raw) as { v?: string; t?: number };
    if (!saved.v || !saved.t || Date.now() - saved.t > TTL_MS) return null;
    return saved.v;
  } catch {
    return null;
  }
}

/** IDs de clique do Google (gclid, com fallback para gbraid/wbraid) e do Meta (fbclid). */
export function getClickIds(): { gclid: string | null; fbclid: string | null } {
  if (typeof window === "undefined") return { gclid: null, fbclid: null };
  captureClickIds();
  return {
    gclid: readStored("gclid") ?? readStored("gbraid") ?? readStored("wbraid"),
    fbclid: readStored("fbclid"),
  };
}
