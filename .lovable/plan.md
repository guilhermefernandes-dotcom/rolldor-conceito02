# Reescrever a animação "Um novo padrão"

Objetivo: acabar com o bug visual do scroll-lock atual (posição fixed com salto no fim, textos aparecendo/sumindo rápido demais) e transformar a seção em uma cena mais cinematográfica, mas simples e previsível — sem prender o scroll.

## O que muda

**Sem scroll-lock.** A seção passa a ser uma seção normal (altura definida pelo conteúdo), sem `position: fixed`, sem `sticky`, sem `height: 380vh`. O scroll do usuário flui reto.

**Nova coreografia (baseada em entrada na viewport, não em progresso de scroll travado):**

1. Estado inicial: título "UM NOVO PADRÃO" gigante em uma linha, centralizado, com um leve tracking mais aberto e a palavra "PADRÃO" em verde escuro/muted como acento — dá camada visual e mata a sensação "seca".
2. Ao entrar na viewport, o título faz uma entrada em duas partes: mask reveal vertical (clip-path) letra-a-palavra, com um leve blur → foco. Duração curta, easing suave (cubic-bezier equivalente ao "Apple ease").
3. Logo abaixo, uma fina linha horizontal (divider) se expande de 0 → 100% da largura do bloco de texto, servindo de "âncora" entre título e corpo.
4. O sub-título "Muito mais do que esquadrias. / Um novo padrão para viver sua casa." aparece com stagger por linha (fade + slide up 16px), a segunda linha em opacidade reduzida (hierarquia).
5. Os três parágrafos aparecem em stagger (100ms entre cada), fade + slide up 12px. O último parágrafo ganha um destaque sutil (peso 500, cor cheia) — funciona como fecho.
6. Um pequeno selo/tag no topo ("O padrão Roll Door" em uppercase tracking largo, verde da marca) ancora visualmente a seção antes do título e reforça a identidade.

**Micro-detalhes que tiram o "seco":**
- Um gradiente sutil de fundo (radial suave do centro, tom concrete → concrete mais claro) só para dar profundidade, mantendo `#F2F0EA` como base.
- Uma leve textura de linhas diagonais (mesmo padrão da FAQ/CTA) em opacidade baixíssima, coerente com o resto da LP.
- Um pseudo-cursor decorativo (pequena barra vertical piscando devagar) ao lado do título após a entrada, evocando "novo capítulo".
- Underline animado na palavra "extraordinária" do último parágrafo (reaproveitando o componente `UnderlineWord` já existente).

**Comportamento técnico:**
- Trocar `useScroll`/`useSpring`/`useTransform` do `NovoPadraoPinned` inteiro por `motion` + `whileInView` com `viewport={{ once: true, amount: 0.35 }}` e `transition` com `delay` escalonado. Confiável, sem depender de altura mágica ou ordem de scroll.
- Remover a classe global `.novo-padrao-stage` (o hack de `position: fixed !important`) do `src/styles.css` — some da folha de estilos junto.
- Manter o nome do componente exportado (`NovoPadraoPinned`) para não mexer no import de `residencial.tsx`. Só o miolo do arquivo é reescrito.

## Arquivos afetados

- `src/components/NovoPadraoPinned.tsx` — reescrita completa.
- `src/styles.css` — remover o bloco `.novo-padrao-stage` (linhas 224-227).

## Detalhes técnicos (para referência de implementação)

- Motion for React: `whileInView` com `viewport={{ once: true, amount: 0.35 }}`; variantes com `staggerChildren` no container e `y: 16, opacity: 0` → `y: 0, opacity: 1` nos filhos; título usa `clipPath: "inset(0 0 100% 0)"` → `"inset(0 0 0% 0)"` para o mask reveal; easing `[0.22, 1, 0.36, 1]`, durações entre 0.5s (texto) e 0.9s (título).
- Título continua `whitespace-nowrap` com `clamp()` no `font-size` para nunca quebrar linha, como o usuário já pediu antes.
- Nada de `useScroll`, nada de `sticky`, nada de `height` em `vh`. Padding vertical generoso (`py-32 md:py-48`) para respirar.
- Sem props novas em `residencial.tsx` — chamada continua `<NovoPadraoPinned />`.

## Fora de escopo

Não mexer em outras seções, no `StatsScrollLock`, no carrossel de projetos, no formulário, nem em cores globais.
