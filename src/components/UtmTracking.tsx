import * as React from "react";

const GTM_ID = "GTM-5RZ8XX2S";

function loadScript(src: string) {
  return new Promise<void>((resolve) => {
    if (document.querySelector(`script[src="${src}"]`)) return resolve();
    const s = document.createElement("script");
    s.src = src;
    s.async = false;
    s.onload = () => resolve();
    s.onerror = () => resolve();
    document.body.appendChild(s);
  });
}

/**
 * Carrega GTM + script de captura de UTM apenas nesta página.
 */
export function UtmTracking() {
  React.useEffect(() => {
    let cancelled = false;

    // Google Tag Manager
    const w = window as unknown as { dataLayer?: unknown[] };
    w.dataLayer = w.dataLayer || [];
    if (!document.querySelector(`script[src*="googletagmanager.com/gtm.js?id=${GTM_ID}"]`)) {
      w.dataLayer.push({ "gtm.start": new Date().getTime(), event: "gtm.js" });
      const gtm = document.createElement("script");
      gtm.async = true;
      gtm.src = `https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`;
      document.head.appendChild(gtm);
    }

    const timers: ReturnType<typeof setTimeout>[] = [];

    (async () => {
      await loadScript("https://code.jquery.com/jquery-3.7.1.min.js");
      await loadScript("/gpc-utm.js");
      if (cancelled) return;
      const run = () => {
        const fn = (window as unknown as { CamposUTM?: (modal?: boolean) => void }).CamposUTM;
        if (typeof fn === "function") fn();
        else timers.push(setTimeout(run, 300));
      };
      [0, 300, 800, 1600, 3000].forEach((ms) => timers.push(setTimeout(run, ms)));
    })();

    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
    };
  }, []);

  return (
    <noscript>
      <iframe
        src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
        height="0"
        width="0"
        style={{ display: "none", visibility: "hidden" }}
      />
    </noscript>
  );
}
