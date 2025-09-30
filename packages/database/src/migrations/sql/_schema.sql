\restrict VFLybQsvbNlGcQo42qvLANh4ThF8JzZWZ1vmxPvDKWpLKnv36XhxFfOhE7hHLNs

CREATE FUNCTION public.update_updated_at_column() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
	BEGIN
		NEW.updated_at = now();
		RETURN NEW;
	END;
	$$;

CREATE TABLE public.account (
    id text DEFAULT (gen_random_uuid())::text NOT NULL,
    user_id text NOT NULL,
    account_id text NOT NULL,
    provider_id text NOT NULL,
    access_token text,
    refresh_token text,
    access_token_expires_at timestamp with time zone,
    refresh_token_expires_at timestamp with time zone,
    scope text,
    id_token text,
    password text,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);

CREATE TABLE public.effect_sql_migrations (
    migration_id integer NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    name text NOT NULL
);

CREATE TABLE public.session (
    id text DEFAULT (gen_random_uuid())::text NOT NULL,
    user_id text NOT NULL,
    token text NOT NULL,
    expires_at timestamp with time zone NOT NULL,
    ip_address text,
    user_agent text,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);

CREATE TABLE public."user" (
    id text DEFAULT (gen_random_uuid())::text NOT NULL,
    name text NOT NULL,
    email text NOT NULL,
    email_verified boolean DEFAULT false NOT NULL,
    image text,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);

CREATE TABLE public.verification (
    id text DEFAULT (gen_random_uuid())::text NOT NULL,
    identifier text NOT NULL,
    value text NOT NULL,
    expires_at timestamp with time zone NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);

ALTER TABLE ONLY public.account
    ADD CONSTRAINT account_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.effect_sql_migrations
    ADD CONSTRAINT effect_sql_migrations_pkey PRIMARY KEY (migration_id);

ALTER TABLE ONLY public.session
    ADD CONSTRAINT session_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.session
    ADD CONSTRAINT session_token_key UNIQUE (token);

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.verification
    ADD CONSTRAINT verification_pkey PRIMARY KEY (id);

CREATE INDEX idx_account_provider_id ON public.account USING btree (provider_id);

CREATE INDEX idx_account_user_id ON public.account USING btree (user_id);

CREATE INDEX idx_session_expires_at ON public.session USING btree (expires_at);

CREATE INDEX idx_session_token ON public.session USING btree (token);

CREATE INDEX idx_session_user_id ON public.session USING btree (user_id);

CREATE INDEX idx_user_email ON public."user" USING btree (email);

CREATE INDEX idx_verification_expires_at ON public.verification USING btree (expires_at);

CREATE INDEX idx_verification_identifier ON public.verification USING btree (identifier);

CREATE TRIGGER update_account_updated_at BEFORE UPDATE ON public.account FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_session_updated_at BEFORE UPDATE ON public.session FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_user_updated_at BEFORE UPDATE ON public."user" FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_verification_updated_at BEFORE UPDATE ON public.verification FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

ALTER TABLE ONLY public.account
    ADD CONSTRAINT fk_account_user_id FOREIGN KEY (user_id) REFERENCES public."user"(id) ON DELETE CASCADE;

ALTER TABLE ONLY public.session
    ADD CONSTRAINT fk_session_user_id FOREIGN KEY (user_id) REFERENCES public."user"(id) ON DELETE CASCADE;

\unrestrict VFLybQsvbNlGcQo42qvLANh4ThF8JzZWZ1vmxPvDKWpLKnv36XhxFfOhE7hHLNs

\restrict Xf4ZKI9XgFOzPzZzWnpLe4m27Aix0mPpo9866Njv3dyfboxuNIrGPiWDdxU96N0

INSERT INTO public.effect_sql_migrations (migration_id, created_at, name) VALUES (1, '2025-09-30 17:06:54.564233+00', 'create-core-auth_tables');

\unrestrict Xf4ZKI9XgFOzPzZzWnpLe4m27Aix0mPpo9866Njv3dyfboxuNIrGPiWDdxU96N0