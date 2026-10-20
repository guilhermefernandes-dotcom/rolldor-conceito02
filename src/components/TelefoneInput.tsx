import { forwardRef, useLayoutEffect, useRef } from "react";
import { digitosTelefone, formatarTelefone } from "@/lib/telefone";

type Props = Omit<React.InputHTMLAttributes<HTMLInputElement>, "value" | "onChange" | "type"> & {
  value: string;
  onValueChange: (formatado: string) => void;
};

/** Quantos dígitos existem antes da posição `pos` de `texto`. */
function digitosAntes(texto: string, pos: number) {
  return texto.slice(0, pos).replace(/\D/g, "").length;
}

/** Posição no texto formatado logo depois do n-ésimo dígito. */
function posicaoDoDigito(texto: string, n: number) {
  if (n <= 0) return texto.startsWith("(") ? 1 : 0;
  let vistos = 0;
  for (let i = 0; i < texto.length; i++) {
    if (/\d/.test(texto[i]) && ++vistos === n) return i + 1;
  }
  return texto.length;
}

/**
 * Campo de WhatsApp com máscara (00) 00000-0000.
 * - Colar qualquer formato (+55, 0 de DDD, espaços, traços) formata sozinho.
 * - O cursor fica onde a pessoa estava ao editar no meio do número.
 * - Backspace/Delete em cima de "(", ")", espaço ou "-" apaga o dígito vizinho em vez de travar.
 */
export const TelefoneInput = forwardRef<HTMLInputElement, Props>(function TelefoneInput(
  { value, onValueChange, onKeyDown, ...rest },
  ref,
) {
  const innerRef = useRef<HTMLInputElement | null>(null);
  const cursorRef = useRef<number | null>(null);

  useLayoutEffect(() => {
    const el = innerRef.current;
    // Só reposiciona quando a edição foi no meio do número. No fim o navegador já deixa o
    // cursor certo, e mexer nele durante a digitação causava travadas no teclado do Android.
    if (
      el &&
      cursorRef.current !== null &&
      cursorRef.current < el.value.length &&
      document.activeElement === el
    ) {
      el.setSelectionRange(cursorRef.current, cursorRef.current);
    }
    cursorRef.current = null;
  }, [value]);

  function aplicar(texto: string, digitosAntesDoCursor: number) {
    const formatado = formatarTelefone(digitosTelefone(texto));
    const n = Math.min(digitosAntesDoCursor, formatado.replace(/\D/g, "").length);
    const pos = posicaoDoDigito(formatado, n);
    if (formatado === value) {
      // Nada mudou (ex.: digitou uma letra): o React restaura o valor, então só recoloca o cursor
      requestAnimationFrame(() => innerRef.current?.setSelectionRange(pos, pos));
      return;
    }
    cursorRef.current = pos;
    onValueChange(formatado);
  }

  return (
    <input
      {...rest}
      ref={(el) => {
        innerRef.current = el;
        if (typeof ref === "function") ref(el);
        else if (ref) ref.current = el;
      }}
      type="tel"
      inputMode="tel"
      autoComplete="tel-national"
      maxLength={20}
      value={value}
      onChange={(e) => {
        const el = e.target;
        const bruto = el.value;
        const pos = el.selectionStart ?? bruto.length;
        const brutoDigitos = bruto.replace(/\D/g, "").length;
        const tipo = (e.nativeEvent as InputEvent).inputType ?? "";
        // Número já completo e a pessoa digitou mais um dígito: ignora (não reinterpreta como +55)
        if (brutoDigitos > 11 && tipo.startsWith("insertText")) {
          aplicar(value, digitosAntes(bruto, pos) - 1);
          return;
        }
        // Colado/autopreenchido com +55, 0 de DDD etc.: cursor vai para o fim do número
        const antes = brutoDigitos > 11 ? digitosTelefone(bruto).length : digitosAntes(bruto, pos);
        aplicar(bruto, antes);
      }}
      onKeyDown={(e) => {
        onKeyDown?.(e);
        if (e.defaultPrevented) return;
        const el = e.currentTarget;
        const ini = el.selectionStart ?? 0;
        const fim = el.selectionEnd ?? 0;
        if (ini !== fim) return; // com seleção o navegador apaga normalmente
        const v = el.value;
        if (e.key === "Backspace" && ini > 0 && /\D/.test(v[ini - 1])) {
          e.preventDefault();
          const d = v.replace(/\D/g, "");
          const n = digitosAntes(v, ini);
          if (n === 0) return;
          aplicar(d.slice(0, n - 1) + d.slice(n), n - 1);
        } else if (e.key === "Delete" && ini < v.length && /\D/.test(v[ini])) {
          e.preventDefault();
          const d = v.replace(/\D/g, "");
          const n = digitosAntes(v, ini);
          aplicar(d.slice(0, n) + d.slice(n + 1), n);
        }
      }}
    />
  );
});
