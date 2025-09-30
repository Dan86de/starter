import { Effect } from "effect";
import { SqlClient } from "@effect/sql";

export default Effect.flatMap(SqlClient.SqlClient, (sql) => sql`
	-- Create user table
	CREATE TABLE "user" (
		id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
		name TEXT NOT NULL,
		email TEXT NOT NULL,
		email_verified BOOLEAN NOT NULL DEFAULT false,
		image TEXT,
		created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
		updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
	);

	-- Create session table
	CREATE TABLE "session" (
		id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
		user_id TEXT NOT NULL,
		token TEXT NOT NULL UNIQUE,
		expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
		ip_address TEXT,
		user_agent TEXT,
		created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
		updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
		CONSTRAINT fk_session_user_id FOREIGN KEY (user_id) REFERENCES "user" (id) ON DELETE CASCADE
	);

	-- Create account table
	CREATE TABLE "account" (
		id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
		user_id TEXT NOT NULL,
		account_id TEXT NOT NULL,
		provider_id TEXT NOT NULL,
		access_token TEXT,
		refresh_token TEXT,
		access_token_expires_at TIMESTAMP WITH TIME ZONE,
		refresh_token_expires_at TIMESTAMP WITH TIME ZONE,
		scope TEXT,
		id_token TEXT,
		password TEXT,
		created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
		updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
		CONSTRAINT fk_account_user_id FOREIGN KEY (user_id) REFERENCES "user" (id) ON DELETE CASCADE
	);

	-- Create verification table
	CREATE TABLE "verification" (
		id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
		identifier TEXT NOT NULL,
		value TEXT NOT NULL,
		expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
		created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
		updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
	);

	-- Create function to update updated_at column
	CREATE OR REPLACE FUNCTION update_updated_at_column() RETURNS TRIGGER AS $$
	BEGIN
		NEW.updated_at = now();
		RETURN NEW;
	END;
	$$ language 'plpgsql';

	-- Create triggers for updated_at columns
	CREATE TRIGGER update_user_updated_at
		BEFORE UPDATE ON "user"
		FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

	CREATE TRIGGER update_session_updated_at
		BEFORE UPDATE ON "session"
		FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

	CREATE TRIGGER update_account_updated_at
		BEFORE UPDATE ON "account"
		FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

	CREATE TRIGGER update_verification_updated_at
		BEFORE UPDATE ON "verification"
		FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

	-- Create indexes for performance
	CREATE INDEX idx_user_email ON "user" (email);
	CREATE INDEX idx_session_user_id ON "session" (user_id);
	CREATE INDEX idx_session_token ON "session" (token);
	CREATE INDEX idx_session_expires_at ON "session" (expires_at);
	CREATE INDEX idx_account_user_id ON "account" (user_id);
	CREATE INDEX idx_account_provider_id ON "account" (provider_id);
	CREATE INDEX idx_verification_identifier ON "verification" (identifier);
	CREATE INDEX idx_verification_expires_at ON "verification" (expires_at);
`)
