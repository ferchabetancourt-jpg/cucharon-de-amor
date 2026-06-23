DROP POLICY IF EXISTS "Public read access" ON public.recipes_staging;
REVOKE SELECT ON public.recipes_staging FROM anon, authenticated;
GRANT ALL ON public.recipes_staging TO service_role;