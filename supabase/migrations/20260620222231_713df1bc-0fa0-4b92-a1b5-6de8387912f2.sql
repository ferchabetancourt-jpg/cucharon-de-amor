ALTER TABLE public.recipes_staging ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON public.recipes_staging FROM anon, authenticated;
GRANT ALL ON public.recipes_staging TO service_role;