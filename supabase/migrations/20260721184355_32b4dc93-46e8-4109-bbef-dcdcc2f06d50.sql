CREATE TYPE public.cliente_tipo_projeto AS ENUM ('casa', 'apartamento', 'reforma', 'construcao');
CREATE TYPE public.cliente_fase_obra AS ENUM ('projeto', 'construcao', 'reforma', 'finalizacao');

CREATE TABLE public.cliente_leads (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  nome TEXT NOT NULL,
  whatsapp TEXT NOT NULL,
  email TEXT NOT NULL,
  cidade TEXT NOT NULL,
  estado TEXT NOT NULL,
  tipo_projeto public.cliente_tipo_projeto NOT NULL,
  fase_obra public.cliente_fase_obra NOT NULL,
  mensagem TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT INSERT ON public.cliente_leads TO anon, authenticated;
GRANT SELECT ON public.cliente_leads TO authenticated;
GRANT ALL ON public.cliente_leads TO service_role;

ALTER TABLE public.cliente_leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Envio publico com validacao minima"
ON public.cliente_leads FOR INSERT
TO anon, authenticated
WITH CHECK (
  length(nome) BETWEEN 2 AND 120
  AND length(whatsapp) BETWEEN 8 AND 40
  AND length(email) BETWEEN 5 AND 200
  AND email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'
  AND length(cidade) BETWEEN 2 AND 120
  AND length(estado) BETWEEN 2 AND 60
  AND (mensagem IS NULL OR length(mensagem) <= 1500)
);

CREATE POLICY "Admins read cliente_leads"
ON public.cliente_leads FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));