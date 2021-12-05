create table users(
                	id number generated always as identity,
	                first_name varchar(255),
	                last_name varchar(255),
	                username varchar(15) not null,
	                email varchar(255),
	                registration_date date,
                    role varchar(15) default 'user',
                    constraint PK_users primary key (id)
                );

                commit;



create table products (
    id number generated always as identity,
    name varchar(32) not null,
    price decimal not null,
    foreign key (manufacturer_id) references manufacturers(id)
    creation_date date,
    constraint PK_products primary key (id)
)



create table manufacturers(
    id number generated always as identity,
    company_name varchar(32) not null,
    contact_number varchar(12),
    contact_email varchar(32),
    description varchar(128)
    constraint PK_manufacturers primary key (id)
)

 create table auth
                (
                	id number generated always as identity,
                	salt varbinary(255),
                    hash varchar(255),
                    token varchar(255),
                    token_expires_at timestamp,
                    is_confirmed number(1) check (is_confirmed in (0,1)),
	                constraint FK_auth_user foreign key (user_id) references users(id),
	                constraint PK_auth primary key (id)

                );

create table orders(
    id number generated always as identity,
    foreign key (product_id) references products(id)
    foreign key (user_id) references users(id),
    count number,
    creation_date timestamp,
    update_date timestamp,
)


select * from users;
drop table users;

