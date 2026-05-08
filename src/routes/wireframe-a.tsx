import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/wireframe-a")({
  head: () => ({
    meta: [
      { title: "Wireframe A — Grupo VIP Leevi (Copy Original)" },
      { name: "description", content: "Wireframe básico da LP Grupo VIP Leevi — copy original." },
    ],
  }),
  component: WireframeA,
});

const Box = ({ children, h, className = "" }: { children?: React.ReactNode; h?: string; className?: string }) => (
  <div className={`border-2 border-dashed border-neutral-400 bg-neutral-100 flex items-center justify-center text-neutral-500 text-xs uppercase tracking-wider ${className}`} style={{ minHeight: h }}>
    {children}
  </div>
);

const Section = ({ n, title, children }: { n: number; title: string; children: React.ReactNode }) => (
  <section className="border-t-2 border-neutral-300 py-10">
    <div className="mx-auto max-w-5xl px-6">
      <div className="mb-6 flex items-center gap-3">
        <span className="rounded bg-neutral-800 px-2 py-1 font-mono text-xs text-white">SEÇÃO {String(n).padStart(2, "0")}</span>
        <h2 className="font-mono text-sm uppercase tracking-widest text-neutral-600">{title}</h2>
      </div>
      {children}
    </div>
  </section>
);

const CTA = ({ label = "QUERO ENTRAR NO GRUPO VIP →" }: { label?: string }) => (
  <div className="my-4 inline-block rounded border-2 border-neutral-800 bg-neutral-800 px-6 py-3 font-mono text-sm text-white">
    [ {label} ]
  </div>
);

function WireframeA() {
  return (
    <main className="min-h-screen bg-white text-neutral-900">
      {/* Top nav placeholder */}
      <header className="border-b-2 border-neutral-300 bg-neutral-50 py-4">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6">
          <Box className="w-32" h="32px">LOGO</Box>
          <span className="font-mono text-xs text-neutral-500">WIREFRAME A — COPY ORIGINAL</span>
        </div>
      </header>

      {/* HERO */}
      <Section n={1} title="HERO">
        <p className="mb-2 font-mono text-[11px] uppercase tracking-widest text-neutral-500">GRUPO VIP DE REVENDEDORAS — LEEVI</p>
        <h1 className="mb-4 text-3xl font-bold leading-tight md:text-5xl">
          A diferença entre revender bem e revender no escuro cabe num grupo de WhatsApp.
        </h1>
        <p className="mb-6 max-w-2xl text-neutral-600">
          Toda semana tem live com os lançamentos do nosso atacado, condições que só existem dentro do grupo, sorteios pra quem aparece e a leitura honesta do que tá vendendo de verdade.
        </p>
        <CTA />
        <p className="text-xs text-neutral-500">Entrada gratuita. Vagas limitadas pelo WhatsApp.</p>
        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
          <Box h="280px">IMAGEM HERO / MOCKUP LIVE</Box>
          <Box h="280px">PRODUTOS DESTAQUE</Box>
        </div>
      </Section>

      {/* PROBLEMA */}
      <Section n={2} title="ABERTURA — PROBLEMA → REFRAME">
        <h2 className="mb-4 text-2xl font-bold md:text-3xl">A maioria das revendedoras compra errado. E nem sabe.</h2>
        <div className="grid gap-4 text-sm text-neutral-700 md:grid-cols-2">
          <p>Compra modelo que tá saindo de moda achando que tá novo. Compra peça que o concorrente já tá vendendo a duas semanas...</p>
          <p>Isso não é falha de quem revende. É falha de acesso. Quem tem informação primeiro, vende primeiro. O Grupo VIP da Leevi existe pra inverter esse jogo.</p>
        </div>
        <div className="mt-6"><CTA label="ENTRAR NO GRUPO →" /></div>
      </Section>

      {/* 4 VANTAGENS */}
      <Section n={3} title="AS 4 VANTAGENS">
        <h2 className="mb-6 text-2xl font-bold md:text-3xl">O que você passa a ter quando entra</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {[
            ["01.", "Acesso antecipado", "Os lançamentos chegam no seu WhatsApp antes de virarem post."],
            ["02.", "Ofertas e condições exclusivas", "Condição de revendedora VIP não circula em outro lugar."],
            ["03.", "Sorteios e ações ao vivo", "Quem aparece na live ganha. Literalmente."],
            ["04.", "Inteligência de produto", "A gente te conta o que tá vendendo. De verdade."],
          ].map(([num, title, desc]) => (
            <div key={num} className="border-2 border-dashed border-neutral-400 p-5">
              <div className="mb-2 font-mono text-xs text-neutral-500">{num}</div>
              <h3 className="mb-2 font-bold">{title}</h3>
              <p className="text-sm text-neutral-600">{desc}</p>
            </div>
          ))}
        </div>
        <div className="mt-6"><CTA label="QUERO ESSAS 4 VANTAGENS →" /></div>
      </Section>

      {/* AUTORIDADE */}
      <Section n={4} title="QUEM É A LEEVI">
        <h2 className="mb-4 text-2xl font-bold md:text-3xl">Não somos um perfil novo de Instagram.</h2>
        <p className="mb-6 max-w-3xl text-neutral-600">
          Distribuidora de calçados e acessórios sediada em São Luís — MA. +50 mil pessoas acompanham nosso trabalho no Instagram.
        </p>
        <CTA label="ENTRAR NO GRUPO VIP →" />
      </Section>

      {/* COMO FUNCIONA */}
      <Section n={5} title="COMO FUNCIONA — 4 PASSOS">
        <h2 className="mb-6 text-2xl font-bold md:text-3xl">Como entrar (leva 30 segundos)</h2>
        <ol className="grid gap-4 md:grid-cols-4">
          {["Clica e aceita o convite", "Recebe aviso da live", "Aparece ao vivo", "Garante a peça"].map((step, i) => (
            <li key={i} className="border-2 border-dashed border-neutral-400 p-4">
              <div className="mb-2 font-mono text-xs text-neutral-500">PASSO {i + 1}</div>
              <p className="text-sm">{step}</p>
            </li>
          ))}
        </ol>
        <p className="mt-4 text-xs text-neutral-500">Sem cadastro. Sem formulário. Sem pedir CNPJ.</p>
      </Section>

      {/* VITRINE */}
      <Section n={6} title="VITRINE DE PRODUTOS">
        <h2 className="mb-2 text-2xl font-bold md:text-3xl">Algumas peças que sumiram rápido nas últimas lives</h2>
        <p className="mb-6 text-sm text-neutral-600">Se você visse essas no momento em que entraram no grupo, comprava antes de virarem "esgotado".</p>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <Box key={i} h="180px">PRODUTO {i + 1}</Box>
          ))}
        </div>
        <div className="mt-6"><CTA label="QUERO ESTAR NA PRÓXIMA LIVE →" /></div>
      </Section>

      {/* PROVA SOCIAL */}
      <Section n={7} title="PROVA SOCIAL">
        <h2 className="mb-6 text-2xl font-bold md:text-3xl">O que dizem as revendedoras que já estão dentro</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <Box key={i} h="220px">PRINT WHATSAPP {i + 1}</Box>
          ))}
        </div>
        <div className="mt-6 border-2 border-dashed border-yellow-500 bg-yellow-50 p-4 text-sm">
          ⚠️ Aviso real: Tem peça que esgota durante a própria live.
        </div>
      </Section>

      {/* LOSS AVERSION */}
      <Section n={8} title="POR QUE NÃO FICAR DE FORA">
        <h2 className="mb-6 text-2xl font-bold md:text-3xl">O que você perde ficando de fora</h2>
        <div className="grid gap-3 md:grid-cols-2">
          {[
            "Perde os lançamentos que a concorrente vai estar vendendo na semana seguinte.",
            "Perde as condições exclusivas que só saem dentro do grupo.",
            "Perde os sorteios e ações que acontecem ao vivo.",
            "Perde a leitura de mercado que separa quem aposta de quem decide.",
          ].map((t, i) => (
            <div key={i} className="border-2 border-dashed border-neutral-400 p-4 text-sm">❌ {t}</div>
          ))}
        </div>
        <p className="mt-6 font-bold">Não custa entrar. Custa ficar de fora.</p>
        <div className="mt-4"><CTA label="ENTRAR AGORA →" /></div>
      </Section>

      {/* FAQ */}
      <Section n={9} title="FAQ">
        <h2 className="mb-6 text-2xl font-bold md:text-3xl">Perguntas que sempre chegam antes de entrar</h2>
        <div className="space-y-3">
          {["É pago?", "Vão me encher de mensagem?", "Preciso ter CNPJ?", "E se eu não puder entrar na live?", "Posso sair quando quiser?"].map((q, i) => (
            <div key={i} className="border-2 border-dashed border-neutral-400 p-4">
              <p className="font-mono text-sm">▸ {q}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* CTA FINAL */}
      <Section n={10} title="CTA FINAL">
        <h2 className="mb-4 text-3xl font-bold md:text-5xl">A próxima live já tem data.</h2>
        <p className="mb-6 max-w-2xl text-neutral-600">
          Você pode chegar nela como quem viu primeiro — ou como quem viu pelo print depois.
        </p>
        <CTA label="QUERO ENTRAR NO GRUPO VIP →" />
        <p className="mt-3 text-xs text-neutral-500">Entrada gratuita • Sem flood • Saída a qualquer momento</p>
      </Section>

      {/* Floating elements */}
      <div className="fixed bottom-6 left-6 hidden rounded border-2 border-dashed border-green-600 bg-white p-3 text-xs shadow-lg md:block">
        🟢 Ana entrou no Grupo VIP
      </div>
      <div className="fixed bottom-0 left-0 right-0 border-t-2 border-neutral-800 bg-neutral-800 p-3 text-center font-mono text-sm text-white md:hidden">
        [ ENTRAR NO GRUPO VIP → ]
      </div>
    </main>
  );
}
