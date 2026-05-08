import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <main className="min-h-screen bg-neutral-50 px-6 py-16">
      <div className="mx-auto max-w-3xl">
        <p className="mb-2 font-mono text-xs uppercase tracking-widest text-neutral-500">Wireframes — LP Grupo VIP Leevi</p>
        <h1 className="mb-8 text-4xl font-bold">Escolha um wireframe para visualizar</h1>
        <div className="grid gap-4 md:grid-cols-2">
          <Link
            to="/wireframe-a"
            className="block rounded border-2 border-dashed border-neutral-400 bg-white p-6 transition hover:border-neutral-800"
          >
            <p className="mb-2 font-mono text-xs text-neutral-500">WIREFRAME A</p>
            <h2 className="mb-2 text-xl font-bold">Copy Original</h2>
            <p className="text-sm text-neutral-600">10 seções • narrativa "informação como ativo escasso" • 8 CTAs.</p>
          </Link>
          <Link
            to="/wireframe-b"
            className="block rounded border-2 border-dashed border-neutral-400 bg-white p-6 transition hover:border-neutral-800"
          >
            <p className="mb-2 font-mono text-xs text-neutral-500">WIREFRAME B</p>
            <h2 className="mb-2 text-xl font-bold">Copy Completa</h2>
            <p className="text-sm text-neutral-600">9 seções • abordagem direta com escassez forte • 9 CTAs + marquee.</p>
          </Link>
        </div>
      </div>
    </main>
  );
}
