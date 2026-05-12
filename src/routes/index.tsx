import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Wireframe B — Grupo VIP Leevi (Copy Completa)" },
      { name: "description", content: "Wireframe básico da LP Grupo VIP Leevi — copy completa." },
    ],
  }),
  component: WireframeB,
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

const CTA = ({ label = "QUERO ENTRAR NO GRUPO VIP" }: { label?: string }) => (
  <div className="my-4 inline-block rounded border-2 border-neutral-800 bg-neutral-800 px-6 py-3 font-mono text-sm text-white">
    [ 👉 {label} ]
  </div>
);

function Index() {
  return (
    <main className="min-h-screen bg-white text-neutral-900">
      <header className="border-b-2 border-neutral-300 bg-neutral-50 py-4">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6">
          <Box className="w-32" h="32px">LOGO</Box>
          <span className="font-mono text-xs text-neutral-500">LP GRUPO VIP LEEVI</span>
        </div>
      </header>

      {/* Marquee */}
      <div className="border-y-2 border-dashed border-neutral-400 bg-neutral-100 py-2">
        <p className="text-center font-mono text-xs uppercase tracking-widest text-neutral-600">
          ▸ MARQUEE: VAGAS LIMITADAS • GRUPO VIP LEEVI • VAGAS LIMITADAS • GRUPO VIP LEEVI ▸
        </p>
      </div>

      {/* HERO */}
      <Section n={1} title="HERO">
        <p className="mb-2 font-mono text-[11px] uppercase tracking-widest text-neutral-500">EXCLUSIVO PARA REVENDEDORAS</p>
        <h1 className="mb-4 text-3xl font-bold leading-tight md:text-5xl">
          Entre para o GRUPO VIP de Revendedoras Leevi e veja os lançamentos do atacado antes da sua concorrente.
        </h1>
        <p className="mb-6 max-w-2xl text-neutral-600">
          Toda semana tem live ao vivo com novidades, ofertas que não saem do grupo e os produtos de maior giro selecionados pra você lucrar mais — antes de todo mundo.
        </p>
        <CTA />
        <div className="mt-3 inline-block border-2 border-dashed border-red-500 bg-red-50 px-3 py-2 text-xs">
          ⚠️ Grupo com limite de participantes. Restam poucas vagas para esta semana.
        </div>
        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
          <Box h="280px">FOTO REVENDEDORA / MOCKUP LIVE</Box>
          <Box h="280px">PRODUTOS DESTAQUE</Box>
        </div>
      </Section>

      {/* AUTORIDADE */}
      <Section n={2} title="AUTORIDADE / QUEM É A LEEVI">
        <h2 className="mb-6 text-2xl font-bold md:text-3xl">
          Somos referência em calçados e acessórios para revenda em todo o Brasil
        </h2>
        <div className="grid gap-4 md:grid-cols-4">
          {[
            "+50 mil revendedoras",
            "Sede em São Luís — MA",
            "Centenas de lançamentos/mês",
            "Envio para todo Brasil",
          ].map((t, i) => (
            <div key={i} className="border-2 border-dashed border-neutral-400 p-5 text-center">
              <p className="text-sm font-bold">{t}</p>
            </div>
          ))}
        </div>
        <p className="mt-6 italic text-neutral-600">"Quem conhece a Leevi sabe da curadoria. Quem está no GRUPO VIP, sai na frente."</p>
        <div className="mt-4"><CTA label="ENTRAR NO GRUPO VIP" /></div>
      </Section>

      {/* VANTAGENS */}
      <Section n={3} title="VANTAGENS — CORAÇÃO DA LP">
        <h2 className="mb-6 text-2xl font-bold md:text-3xl">Vantagens exclusivas para quem está no grupo e participa das lives</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {[
            ["🎯", "Lançamentos antes de todo mundo", "24h antes de irem pro Instagram, site ou qualquer lugar."],
            ["💰", "Preços que só existem dentro do grupo", "Condições reservadas para quem participa das lives."],
            ["🎁", "Sorteios e bônus para quem participa ao vivo", "Toda semana tem sorteios, brindes e ações relâmpago."],
            ["📈", "Dicas dos produtos com mais alto giro", "Você para de apostar no escuro e compra o que vende."],
          ].map(([icon, title, desc], i) => (
            <div key={i} className="border-2 border-dashed border-neutral-400 p-5">
              <div className="mb-2 text-2xl">{icon}</div>
              <h3 className="mb-2 font-bold">{title}</h3>
              <p className="text-sm text-neutral-600">{desc}</p>
            </div>
          ))}
        </div>
        <div className="mt-6"><CTA label="QUERO TODAS ESSAS VANTAGENS" /></div>
      </Section>

      {/* COMO FUNCIONA */}
      <Section n={4} title="COMO FUNCIONA — 4 PASSOS">
        <h2 className="mb-6 text-2xl font-bold md:text-3xl">É simples e rápido fazer parte do GRUPO VIP</h2>
        <ol className="grid gap-4 md:grid-cols-4">
          {["Clique e entre pelo WhatsApp", "Receba aviso das lives", "Participe ao vivo", "Aproveite condições exclusivas"].map((step, i) => (
            <li key={i} className="border-2 border-dashed border-neutral-400 p-4">
              <div className="mb-2 font-mono text-xs text-neutral-500">PASSO {i + 1}</div>
              <p className="text-sm">{step}</p>
            </li>
          ))}
        </ol>
        <div className="mt-6"><CTA label="ENTRAR NO GRUPO VIP AGORA" /></div>
      </Section>

      {/* VITRINE */}
      <Section n={5} title="VITRINE DE PRODUTOS — ALTO GIRO">
        <h2 className="mb-2 text-2xl font-bold md:text-3xl">Peças que costumam esgotar primeiro dentro do GRUPO VIP</h2>
        <p className="mb-6 text-sm text-neutral-600">Estes são alguns dos produtos que nossas revendedoras mais disputam toda semana.</p>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-5">
          {Array.from({ length: 10 }).map((_, i) => (
            <Box key={i} h="160px">PRODUTO {i + 1}</Box>
          ))}
        </div>
        <div className="mt-6"><CTA /></div>
      </Section>

      {/* PROVA SOCIAL */}
      <Section n={6} title="PROVA SOCIAL — DEPOIMENTOS">
        <h2 className="mb-6 text-2xl font-bold md:text-3xl">Veja o que nossas revendedoras dizem</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <Box key={i} h="200px">DEPOIMENTO {i + 1}</Box>
          ))}
        </div>
        <div className="mt-6 border-2 border-dashed border-yellow-500 bg-yellow-50 p-4 text-sm">
          ⚠️ ATENÇÃO! Algumas peças esgotam ainda durante a live.
        </div>
        <div className="mt-4"><CTA label="ENTRAR NO GRUPO VIP" /></div>
      </Section>

      {/* LOSS AVERSION */}
      <Section n={7} title="POR QUE NÃO PODE FICAR DE FORA">
        <h2 className="mb-6 text-2xl font-bold md:text-3xl">Por que você não pode ficar de fora do GRUPO VIP</h2>
        <div className="grid gap-3 md:grid-cols-2">
          {[
            ["🔥", "Compra antes do site, do Instagram e de qualquer canal."],
            ["💸", "Condições exclusivas com preços que não saem do grupo."],
            ["📦", "Curadoria semanal de alto giro."],
            ["🔒", "Grupo fechado e silencioso. Apenas a equipe Leevi posta."],
          ].map(([icon, t], i) => (
            <div key={i} className="border-2 border-dashed border-neutral-400 p-4 text-sm">
              <span className="mr-2">{icon}</span>{t}
            </div>
          ))}
        </div>
        <div className="mt-6"><CTA /></div>
      </Section>

      {/* FAQ */}
      <Section n={8} title="FAQ">
        <h2 className="mb-6 text-2xl font-bold md:text-3xl">Tire suas dúvidas sobre o Grupo VIP</h2>
        <div className="space-y-3">
          {[
            "Preciso pagar para entrar?",
            "Vão me mandar muita mensagem?",
            "Preciso ter CNPJ?",
            "Como funcionam as lives?",
            "Posso sair quando quiser?",
          ].map((q, i) => (
            <div key={i} className="border-2 border-dashed border-neutral-400 p-4">
              <p className="font-mono text-sm">▸ {q}</p>
            </div>
          ))}
        </div>
        <div className="mt-6"><CTA label="ENTRAR NO GRUPO VIP" /></div>
      </Section>

      {/* CTA FINAL */}
      <Section n={9} title="CTA FINAL — ESCASSEZ FORTE">
        <h2 className="mb-4 text-3xl font-bold md:text-5xl">As vagas do GRUPO VIP estão chegando ao fim!</h2>
        <p className="mb-6 max-w-2xl text-neutral-600">
          Toda semana fechamos a entrada quando o grupo enche. Quem perde a janela só consegue entrar quando alguém sai.
        </p>
        <ul className="mb-6 space-y-2 text-sm">
          <li>✅ Lançamentos antes de todo mundo</li>
          <li>✅ Lives semanais com curadoria de alto giro</li>
          <li>✅ Ofertas que não saem do grupo</li>
          <li>✅ Sorteios e bônus para quem participa</li>
        </ul>
        <CTA label="ENTRAR NO GRUPO VIP AGORA" />
      </Section>

      {/* FOOTER */}
      <footer className="border-t-2 border-neutral-300 bg-neutral-50 py-8">
        <div className="mx-auto max-w-5xl px-6 text-xs text-neutral-500">
          <p className="mb-2">Termos de Uso • Política de Privacidade • Política de Cookies • CNPJ Leevi</p>
          <p>Copyright ©2026</p>
        </div>
      </footer>

      {/* Floating */}
      <div className="fixed bottom-6 left-6 hidden rounded border-2 border-dashed border-green-600 bg-white p-3 text-xs shadow-lg md:block">
        🟢 Mariana acabou de entrar no GRUPO VIP
      </div>
      <div className="fixed bottom-0 left-0 right-0 border-t-2 border-neutral-800 bg-neutral-800 p-3 text-center font-mono text-sm text-white md:hidden">
        [ ENTRAR NO GRUPO VIP → ]
      </div>
    </main>
  );
}
