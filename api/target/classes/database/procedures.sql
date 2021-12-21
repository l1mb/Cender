--
--User procedures
----------------------------------------------------------------------------------------------
----------------------------------------------------------------------------------------------

    create or replace procedure GetUserByLogin (userok sys_refcursor,ln in varchar2 default null) as
        begin
            open userok for select *  from users where email = ln;
        end;

	select * from users;



create or replace procedure CreateUser (ln varchar,
                                        fe varchar,
                                         le varchar,
                                          ue varchar)
    as
	    begin
	        insert into users (first_name, last_name, email, username, registration_date)
	            values (fe, le, ln, ue, TO_TIMESTAMP('2014-07-02 06:14:00.742000000', 'YYYY-MM-DD HH24:MI:SS.FF'));
        end;
        commit;

create or replace procedure UpdateUser (ui number, ln varchar,
                                          un varchar)
    as
	    begin
	        update users set email = ln , username = un where id = ui;
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

create or replace procedure CreateAuth (ui varchar,
                                        hh varchar,
                                          st blob,
                                           ted timestamp,
                                            t varchar)
    as
	    begin
	        insert into auth (user_id, salt, hash,  token, token_expires_at, is_confirmed)
	            values (ui, hh, st , t, ted, 0);
        end;

--UpdateAuth

create or replace procedure UpdateAuth (id varchar,
                                         hh varchar,
                                          st blob,
                                           ei number
                                            )
    as
	    begin
	        update  auth set hash = hh, salt = st, is_confirmed= ei where user_id= id;
	    end;

--FindByUserId

create or replace procedure FindAuthByUserId (ui in number, auth_row out auth%rowtype)
    as
        begin
            select * into auth_row from auth where user_id = ui;
        end;

--FindByUserToken

create or replace procedure FindAuthByUserToken (tn in varchar, auth_row out auth%rowtype)
    as
        begin
            select * into auth_row from auth where token = tn;
        end;

----------------------------------------------------------------------------------------------
----------------------------------------------------------------------------------------------

--OrderRepository

--FindOrdersByUserId
create or replace procedure FindOrdersByUserId (ui in number, order_row out orders%rowtype)
    as
        begin
            select * into order_row from orders where user_id = ui;
        end;

--UpdateOrder

--TODO: add order status
create or replace procedure UpdateOrder (
                                          id number,
                                           oc number,
                                            cr timestamp,
                                             ud timestamp
                                              )
    as
        begin
            update orders set
             orders_count = oc, creation_date = cr, update_date = ud
              where id = id;
        end;

create or replace procedure CreateOrder (
                                         p_id number,
                                          uid number,
                                           o_c number,
                                            c_d timestamp,
                                             u_d timestamp
                                              )
    as
        begin
            insert into orders (product_id,user_id, orders_count, creation_date,update_date)
	            values (p_id, uid, o_c, c_d, u_d);
        end;

--CompleteOrders

create or replace procedure CompleteOrders (
                                            u_i number
                                             )
    as
        begin
            update orders set order_status_id =
             (select id from order_status where order_status = 'Complete')
               where user_id = u_i;
        end;

--deleteOrders
create or replace procedure DeleteOrder(
                                        i in number
                                         )
    as
        begin
                delete from orders where id = i;
        end;

--FindCompletedByUserID

create or replace procedure FindCompletedOrdersByUserId(
                                                        u_i in number,
                                                         order_row out orders%rowtype
                                                          )
    as
        begin
            select o.id , product_id, user_id, orders_count, creation_date, update_date, order_status_id
                into order_row
                 from orders o inner join order_status os on o.order_status_id = os.id
                  where os.order_status = 'Complete' and o.USER_ID = u_i;
        end;



----------------------------------------------------------------------------------------------
----------------------------------------------------------------------------------------------
--  Product repository

--GetProductById
create or replace procedure GetProductById(
                                           i in number,
                                            product_row out products%rowtype
                                            )
    as
        begin
            select * into product_row from products where id = i;
        end;

--GetProductList

create or replace procedure GetProductList(
                                            product_row out products%rowtype
                                            )
    as
        begin
            select * into product_row from products;
        end;


--DeleteProduct

create or replace procedure DeleteProduct(
                                           i in number
                                            )
    as
        begin
            delete from products where id = i;
        end;

--UpdateProduct

create or replace procedure UpdateProduct(
                                          i number,
                                           m_i number,
                                            n varchar,
                                             pr decimal ,
                                             lg varchar,
                                              c_d timestamp
                                            )
    as
        begin
            update products set manufacturer_id = m_i, name = n, price = pr, logo = lg,
             creation_date = c_d
              where id = i;
        end;

--CreateProduct

create or replace procedure CreateProduct(
                                            n varchar,
                                             pr decimal,
                                              lg varchar,
                                               c_d timestamp
                                            )
    is
            cur_date TIMESTAMP;
        begin
            select systimestamp into cur_date from DUAL;
            update products set name = n, price = pr, logo = lg,
             creation_date = c_d
              where id = id;
        end;

