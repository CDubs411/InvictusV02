-- Add quote_settings column to companies table
ALTER TABLE public.companies
ADD COLUMN quote_settings JSONB DEFAULT '{
  "labor_rate": 75,
  "material_markup": 15,
  "default_profit_margin": 20,
  "overhead_percentage": 10,
  "tax_rate": 8.25
}'::jsonb;
