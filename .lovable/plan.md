# Reforma da LP: Leevi → Roll Door Premium

Manter 100% da estrutura visual/componentes atuais. Trocar apenas paleta base, imagens e copy — e no CTA final substituir o botão WhatsApp por um formulário real com armazenamento.

## 1. Paleta (src/styles.css)

Mantém a mesma **estrutura híbrida** (seções claras e escuras alternadas), mas re-tinta os tokens semânticos pra identidade Roll Door (arquitetura de alto padrão, minimalismo).

- `--background`: off-white → **branco puro `oklch(1 0 0)`**
- `--foreground` / textos: grafite quente → **preto suave `oklch(0.18 0.005 250)`**
- `--gold` / `--gold-soft` / `--gold-deep` → renomeadas visualmente pra **acento metálico / cinza-champagne** (mantendo os nomes de variáveis pra não quebrar componentes):
  - `--gold`: `oklch(0.72 0.015 240)` (grafite claro)
  - `--gold-soft`: `oklch(0.86 0.008 240)`
  - `--gold-deep`: `oklch(0.32 0.01 240)` (grafite profundo)
- `--accent` (verde do botão) → **grafite escuro `hsl(220 8% 18%)`** com highlight `hsl(220 8% 28%)` e shadow `hsl(220 10% 10%)` — botão preto premium, condizente com Roll Door
- Fontes: manter DM Sans + Satoshi (já sóbrias e adequadas ao segmento)
- Gradientes e sombras: recalibrados pra tons neutros

## 2. Imagens (todas geradas por IA)

Substituir os arquivos abaixo por versões arquitetônicas premium:

| Arquivo atual | Novo conteúdo |
|---|---|
| `hero.webp` | Casa moderna com portas de vidro deslizantes gigantes, vista externa, luz dourada |
| `products.webp` | Fachada com sistema de esquadrias premium |
| `leevi-launches.webp` | Interior amplo com janelas de piso ao teto |
| `p1–p4.jpg` | Portas deslizantes / janelas / grandes vãos / sistemas de alumínio |
| `t1–t3.jpg` | Retratos de arquitetos/empresários (parceiros da rede) |
| `depoimento-mockup-*.webp` | Mockups de depoimentos com fotos de projetos Roll Door |
| `sandalia-*.webp` (VitrineOrbit) | Renderizações de tipos de porta/janela em fundo transparente |
| `leevi-mark.png` | Marca "R" estilizada Roll Door (monograma) |
| `badge-vagas.webp` | Selo "Rede Premium — Vagas por região" |
| `logo.webp` | Wordmark "ROLL DOOR" |
| `como-funciona-radar.webp` | Mapa/radar de cobertura Brasil |
| Novo: `logos-revendas-*` | 8-10 logos fictícias de vidraçarias/serralherias pro carrossel de prova social |

## 3. Reescrita completa de copy

Cada seção da LP mapeada para o novo conteúdo Roll Door que você forneceu:

- **Hero**: "Torne-se um Revendedor Premium Roll Door…" + 4 checks + botão "Quero ser um Revendedor Premium"
- **JoinNotifications**: nomes de empresas (vidraçarias) entrando na rede, ao invés de mulheres — "Vidraçaria Alpha • Curitiba, PR — entrou na Rede Premium"
- **Prova social**: "Mais de 700 revendas…" + carrossel de logos + parágrafo sobre 4 décadas
- **Por que ser um revendedor** (8 itens ✔)
- **Diferenciais** (4 cards)
- **VitrineOrbit → Portfólio**: renomeado, orbitando tipos de produto (portas deslizantes, janelas, grandes vãos, sistemas de alumínio, soluções personalizadas)
- **StatsScrollLock → Galeria**: fotos fullscreen de casas de alto padrão com texto "Quando o cliente vê um projeto Roll Door…"
- **Depoimentos**: 3 quotes de parceiros
- **Como funciona**: 4 passos
- **FAQ**: 4 novas perguntas
- **CTA final**: substituído por formulário real (ver §4)
- **Meta tags SEO/OG**: título, description, JSON-LD FAQ, canonical → tudo Roll Door
- **JoinNotifications, mocks, alt texts**: revisão completa

## 4. Formulário real no CTA final

- Ativa **Lovable Cloud** (necessário pra armazenar leads)
- Cria migration com tabela `revenda_leads`:
  - Campos: nome, empresa, cnpj, whatsapp, email, cidade, estado, segmento (enum), faturamento (opcional), mensagem, created_at
  - RLS: **anon INSERT permitido** (formulário público); SELECT apenas para admins (via user_roles)
  - GRANT INSERT TO anon; GRANT ALL TO service_role
- Componente `<FormularioRevenda />` com:
  - Validação client-side via Zod (nome/empresa/whatsapp obrigatórios, email válido, CNPJ formatado, etc.)
  - Server function `submitLead` que faz o INSERT via cliente publishable (respeita RLS)
  - Estados: loading, sucesso ("Recebemos seu cadastro — nossa equipe entrará em contato"), erro
  - Estilo alinhado ao design system existente (inputs em card branco com borda sutil, botão preto)

## 5. Ajustes estruturais mínimos

- Trocar todas as menções ao Grupo VIP / WhatsApp / lives / calçados nos componentes
- Botões que hoje apontam pro WhatsApp: manter link WhatsApp de contato geral (placeholder `5599999999999`) exceto o CTA final que vira scroll pro formulário
- Ícones lucide: reaproveitar (Check, Star, TrendingUp etc.) mas ajustar contexto

## 6. Detalhes técnicos

- Migration em `supabase/migrations/*_create_revenda_leads.sql`
- Server function em `src/lib/leads.functions.ts` usando client publishable (não admin)
- Zod schema compartilhado
- Toast via sonner (já disponível no template shadcn)
- Sem edição do `routeTree.gen.ts`, sem mudança de rotas
- SEO: og:image nova (imagem hero regenerada)

## Ordem de execução

1. Ativar Cloud + migration
2. Regenerar paleta em styles.css
3. Gerar imagens novas em paralelo (batch)
4. Reescrever index.tsx (copy + imports)
5. Atualizar JoinNotifications, VitrineOrbit, StatsScrollLock com novos dados/imagens
6. Criar componente de formulário + server function
7. Verificar build

Tempo estimado: alto (é praticamente re-tematizar tudo). Confirma que posso ir?