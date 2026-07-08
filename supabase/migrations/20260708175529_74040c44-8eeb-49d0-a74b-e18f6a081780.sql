
DROP POLICY IF EXISTS "Qualquer visitante pode enviar um lead" ON public.revenda_leads;

CREATE POLICY "Envio publico com validacao minima"
  ON public.revenda_leads
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    length(nome) BETWEEN 2 AND 120
    AND length(empresa) BETWEEN 2 AND 160
    AND length(whatsapp) BETWEEN 8 AND 40
    AND length(email) BETWEEN 5 AND 200
    AND email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'
    AND length(cidade) BETWEEN 2 AND 120
    AND length(estado) BETWEEN 2 AND 60
    AND (mensagem IS NULL OR length(mensagem) <= 1500)
    AND (cnpj IS NULL OR length(cnpj) <= 25)
    AND (faturamento IS NULL OR length(faturamento) <= 60)
  );
