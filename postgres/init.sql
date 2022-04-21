-- Database starts

CREATE EXTENSION IF NOT EXISTS pgcrypto SCHEMA public;
CREATE EXTENSION IF NOT EXISTS "uuid-ossp" SCHEMA public;


CREATE TABLE users (
    id uuid not null default uuid_generate_v4() primary key,
    user_name varchar(100) not null,
    user_email varchar(100) not null,
    created_at timestamp with time zone not null default CURRENT_TIMESTAMP,
    updated_at timestamp with time zone not null default CURRENT_TIMESTAMP
);

CREATE UNIQUE INDEX users_user_email_uk ON users(user_email);

CREATE OR REPLACE FUNCTION fn_before_update_users()
RETURNS trigger
LANGUAGE plpgsql
AS $function$
    begin
        new.updated_at := CURRENT_TIMESTAMP;
        return new;
        exception when others then
            raise exception '% %', SQLERRM, SQLSTATE;
    end;
$function$;

CREATE TRIGGER tg_before_update_users BEFORE UPDATE ON users FOR EACH ROW EXECUTE PROCEDURE fn_before_update_users(); 