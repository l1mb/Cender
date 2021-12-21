create table users(
                	id number generated always as identity,
	                first_name varchar(255),
	                last_name varchar(255),
	                username varchar(15) not null,
	                email varchar2(255),
	                registration_date date,
                    role varchar(15) default 'user',
                    constraint PK_users primary key (id)
                );
commit;


 create table auth
                (
                	id number generated always as identity,
                    user_id number,
                	salt blob,
                    hash varchar(255),
                    token varchar(255),
                    token_expires_at timestamp,
                    is_confirmed number(1) check (is_confirmed in (0,1)),
	                constraint FK_auth_user foreign key (user_id) references users(id),
	                constraint PK_auth primary key (id)
                );

commit;



create table manufacturers(
    id number generated always as identity,
    name varchar(32) not null,
    contact_number varchar(12),
    contact_email varchar(32),
    description varchar(128),
    constraint PK_manufacturers primary key (id)
);
commit;

create table products (
    id number generated always as identity,
    manufacturer_id number,
    name varchar(32) not null,
    price decimal not null,
    creation_date timestamp,
    update_date
    constraint FK_manufacturer_id foreign key (manufacturer_id) references manufacturers(id),
    constraint PK_products primary key (id)
);
commit;

create table orders(
    id number generated always as identity,
    product_id number,
    user_id number,
    orders_count number,
    creation_date timestamp,
    update_date timestamp,
    order_status_id number,
    constraint FK_product_id foreign key (product_id) references products(id),
    constraint FK_order_status foreign key (order_status_id) references order_status(id),
    constraint FK_user_id foreign key (user_id) references users(id)
);

create table order_status(
    id number generated always as idenitity,
    order_status varchar(32),
    constraint PK_order_status primary key (id)
);

commit;


drop table auth;
drop table orders;
drop table users;
drop table products;
drop table manufacturers;