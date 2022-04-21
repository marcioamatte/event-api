-- Database creation

-- EXTENSIONS
CREATE EXTENSION IF NOT EXISTS pgcrypto SCHEMA public;
CREATE EXTENSION IF NOT EXISTS "uuid-ossp" SCHEMA public;

-- TABLES
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


CREATE TABLE authenticator (
    id uuid not null default uuid_generate_v4() primary key,
    user_email varchar(100) not null,
    user_password varchar(100) not null,
    created_at timestamp with time zone not null default CURRENT_TIMESTAMP,
    updated_at timestamp with time zone not null default CURRENT_TIMESTAMP
);

CREATE UNIQUE INDEX authenticator_user_email_uk ON authenticator(user_email);

CREATE OR REPLACE FUNCTION fn_before_update_authenticator()
RETURNS trigger
LANGUAGE plpgsql
AS $function$
    declare passwd varchar(255);
    begin
        new.updated_at := CURRENT_TIMESTAMP;
        if new.user_password <> old.user_password then
            select crypt(new.user_password, gen_salt('bf', 10)) into passwd;
            new.user_password := passwd;
        end if;
        return new;
        exception when others then
            raise exception '% %', SQLERRM, SQLSTATE;
    end;
$function$;

CREATE OR REPLACE FUNCTION fn_before_insert_authenticator()
RETURNS trigger
LANGUAGE plpgsql
AS $function$
    declare passwd varchar(255);
    begin
        select crypt(new.user_password, gen_salt('bf', 10)) into passwd;
          new.user_password := passwd;
          return new;
        exception when others then
          raise notice 'Erro ao criar autenticador. Erro: % %', SQLERRM, SQLSTATE;
          return new;
    end;
$function$;

CREATE TRIGGER tg_before_update_authenticator BEFORE UPDATE ON authenticator FOR EACH ROW EXECUTE PROCEDURE fn_before_update_authenticator(); 
CREATE TRIGGER tg_before_insert_authenticator BEFORE INSERT ON authenticator FOR EACH ROW EXECUTE PROCEDURE fn_before_insert_authenticator();

CREATE TABLE events (
    id uuid not null default uuid_generate_v4() primary key,
    event_description text not null,
    event_start timestamp with time zone not null default CURRENT_TIMESTAMP,
    event_end timestamp with time zone not null default CURRENT_TIMESTAMP,
    user_id uuid not null,
    created_at timestamp with time zone not null default CURRENT_TIMESTAMP,
    updated_at timestamp with time zone not null default CURRENT_TIMESTAMP,
    CONSTRAINT user_envent_fk foreign key (user_id) references users(id)
);

CREATE OR REPLACE FUNCTION fn_before_update_events()
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

CREATE TRIGGER tg_before_update_events BEFORE UPDATE ON events FOR EACH ROW EXECUTE PROCEDURE fn_before_update_events(); 

CREATE TABLE subscriber (
    id uuid not null default uuid_generate_v4() primary key,
    subscriber_name varchar(100) not null,
    subscriber_email varchar(100) not null,
    event_id uuid not null,
    CONSTRAINT subscriber_event_fk foreign key (event_id) references events(id)
);

CREATE UNIQUE INDEX subscribers_event_uk ON subscriber(subscriber_email, event_id);

-- INSERTS
INSERT INTO public.users (id, user_name, user_email) VALUES('4f4ff96f-c156-4798-a19d-4f100edaa681', 'Jack Bauer', 'bauer@ctu.us');
INSERT INTO public.authenticator (user_email, user_password) VALUES('bauer@ctu.us', '123456789');
INSERT INTO public.events (id, event_description, event_start, event_end, user_id)VALUES('11f2050b-53ed-4bfe-a33e-db8e2421772d', 'Event Test','2022-05-01 10:00:00','2022-05-01 12:00:00','4f4ff96f-c156-4798-a19d-4f100edaa681');
INSERT INTO public.subscriber (subscriber_email, subscriber_name, event_id)VALUES('john.doe@mail.net', 'John Doe', '11f2050b-53ed-4bfe-a33e-db8e2421772d');
INSERT INTO public.subscriber (subscriber_email, subscriber_name, event_id)VALUES('john.wick@wick.net', 'John Wick', '11f2050b-53ed-4bfe-a33e-db8e2421772d');

SELECT * FROM users u;
SELECT * FROM authenticator a;
SELECT * FROM events e;
SELECT * FROM subscriber s;