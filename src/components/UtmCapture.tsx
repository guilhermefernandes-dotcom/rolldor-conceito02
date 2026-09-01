import * as React from "react";

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
 * Carrega o script de captura de UTM sem o Google Tag Manager.
 */
export function UtmCapture() {
  React.useEffect(() => {
    let cancelled = false;
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

  return null;
}
