
CREATE TYPE public.revenda_segmento AS ENUM ('vidracaria', 'esquadrias', 'serralheria', 'outro');

CREATE TABLE public.revenda_leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nome TEXT NOT NULL,
  empresa TEXT NOT NULL,
  cnpj TEXT,
  whatsapp TEXT NOT NULL,
  email TEXT NOT NULL,
  cidade TEXT NOT NULL,
  estado TEXT NOT NULL,
  segmento public.revenda_segmento NOT NULL,
  faturamento TEXT,
  mensagem TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT INSERT ON public.revenda_leads TO anon;
GRANT INSERT ON public.revenda_leads TO authenticated;
GRANT ALL ON public.revenda_leads TO service_role;

ALTER TABLE public.revenda_leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Qualquer visitante pode enviar um lead"
  ON public.revenda_leads
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);
