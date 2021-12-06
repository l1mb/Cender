--
--User procedures
----------------------------------------------------------------------------------------------
----------------------------------------------------------------------------------------------

create or replace procedure GetUserByLogin (login in users.login%type,
                                            userok out users%rowtype) as
	begin
	     select * into userok from users where login = login;
	end;

create or replace procedure CreateUser (login varchar,
                                        first_name varchar,
                                         last_name varchar,
                                          username varchar,
                                          registration_date timestamp,
                                            role varchar)
    as
	    begin
	        insert into users (first_name, last_name, email,  registration_date, role)
	            values (first_name, last_name, login , registration_date, role);
        end;

create or replace procedure UpdateUser (user_id number, login varchar,
                                          changed_username varchar)
    as
	    begin
	        update users set email = login , username = changed_username where id = user_id;
        end;

create or replace procedure GrantAdmin (user_id number) as
    begin
	    update users set role='admin' where id = user_id;
    end;

----------------------------------------------------------------------------------------------
----------------------------------------------------------------------------------------------
--
--Auth
----------------------------------------------------------------------------------------------
----------------------------------------------------------------------------------------------

--FindHashByUserId

create or replace procedure FindHashByUserId (id in number, user_hash out varchar) as
    begin
        select hash into user_hash from auth where user_id = id;
    end;

--CreateAuth

create or replace procedure CreateAuth (user_id varchar,
                                        hash varchar,
                                          salt blob,
                                           token_expiration_date timestamp,
                                            token varchar)
    as
	    begin
	        insert into auth (user_id, salt, hash,  token, token_expires_at, is_confirmed)
	            values (user_id, hash, salt , token, token_expiration_date, 0);
        end;

--UpdateAuth

create or replace procedure UpdateAuth (id varchar,
                                        hash varchar,
                                          salt blob,
                                           email_isconfirmed number
                                            )
    as
	    begin
	        update  auth set hash = hash, salt = salt, is_confirmed= email_isconfirmed where user_id= id;
	    end;

--FindByUserId

create or replace procedure FindAuthByUserId (user_id in number, auth_row out auth%rowtype)
    as
        begin
            select * into auth_row from where user_id = user_id;
        end;

--FindByUserToken

create or replace procedure FindAuthByUserToken (token in varchar, auth_row out auth%rowtype)
    as
        begin
            select * into auth_row from auth where token = token;
        end;

----------------------------------------------------------------------------------------------
----------------------------------------------------------------------------------------------

--OrderRepository

--FindOrdersByUserId
create or replace procedure FindOrdersByUserId (user_id in number, order_row out auth%rowtype)
    as
        begin
            select * into order_row from orders where user_id = user_id;
        end;


--UpdateOrder
--CompleteOrders
--FindCompletedByUserID