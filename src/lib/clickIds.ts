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

function readStoredEntry(key: ClickIdKey): { v: string; t: number } | null {
  try {
    const raw = window.localStorage.getItem(STORAGE_PREFIX + key);
    if (!raw) return null;
    const saved = JSON.parse(raw) as { v?: string; t?: number };
    if (!saved.v || !saved.t || Date.now() - saved.t > TTL_MS) return null;
    return { v: saved.v, t: saved.t };
  } catch {
    return null;
  }
}

function readStored(key: ClickIdKey): string | null {
  return readStoredEntry(key)?.v ?? null;
}

function readCookie(name: string): string | null {
  try {
    const match = document.cookie.match(new RegExp("(?:^|; )" + name + "=([^;]*)"));
    return match ? decodeURIComponent(match[1]) : null;
  } catch {
    return null;
  }
}

/**
 * fbc no formato da API de Conversões do Meta: fb.1.<momento do clique em ms>.<fbclid>.
 * Usa o cookie _fbc do pixel; sem ele, monta a partir do fbclid salvo.
 */
function getFbc(): string | null {
  const cookie = readCookie("_fbc");
  if (cookie) return cookie;
  const saved = readStoredEntry("fbclid");
  return saved ? `fb.1.${saved.t}.${saved.v}` : null;
}

type ClickIds = {
  gclid: string | null;
  fbclid: string | null;
  fbc: string | null;
  fbp: string | null;
};

/**
 * IDs de clique do Google (gclid, com fallback para gbraid/wbraid) e do Meta
 * (fbclid, mais fbc e fbp para a API de Conversões).
 */
export function getClickIds(): ClickIds {
  if (typeof window === "undefined") return { gclid: null, fbclid: null, fbc: null, fbp: null };
  captureClickIds();
  return {
    gclid: readStored("gclid") ?? readStored("gbraid") ?? readStored("wbraid"),
    fbclid: readStored("fbclid"),
    fbc: getFbc(),
    fbp: readCookie("_fbp"),
  };
}
