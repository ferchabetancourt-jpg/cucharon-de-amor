
ALTER TABLE public.recipes_staging ADD COLUMN IF NOT EXISTS created_by text;

GRANT INSERT, UPDATE ON public.recipes_staging TO authenticated;

CREATE POLICY "Authenticated can insert pending recipes"
ON public.recipes_staging
FOR INSERT
TO authenticated
WITH CHECK (
  status = 'pending'
  OR (auth.jwt() ->> 'email') = 'ferchabetancourt@gmail.com'
);

CREATE POLICY "Admin can update recipes"
ON public.recipes_staging
FOR UPDATE
TO authenticated
USING ((auth.jwt() ->> 'email') = 'ferchabetancourt@gmail.com')
WITH CHECK ((auth.jwt() ->> 'email') = 'ferchabetancourt@gmail.com');
