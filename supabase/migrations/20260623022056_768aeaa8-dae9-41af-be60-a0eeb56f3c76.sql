GRANT SELECT, INSERT, DELETE ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admin email can view user_roles"
ON public.user_roles FOR SELECT
TO authenticated
USING ((auth.jwt() ->> 'email') = 'ferchabetancourt@gmail.com');

CREATE POLICY "Admin email can insert user_roles"
ON public.user_roles FOR INSERT
TO authenticated
WITH CHECK ((auth.jwt() ->> 'email') = 'ferchabetancourt@gmail.com');

CREATE POLICY "Admin email can delete user_roles"
ON public.user_roles FOR DELETE
TO authenticated
USING ((auth.jwt() ->> 'email') = 'ferchabetancourt@gmail.com');