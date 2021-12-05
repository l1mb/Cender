--Here you can see list of procedures
create or replace procedure create_users is
    begin
        execute immediate 'drop table users';
        execute immediate '
            create table users
                (
                	id int identity(1, 1),
	                first_name varchar(255),
	                last_name varchar(255),
	                username varchar(15),
	                email varchar(255),
	                registration_date date,
                    constraint PK_users primary key (id)
                );
        ';
        commit;
    end;


select * from auth;


select *  from user_tab_columns where table_name = 'auth' order by column_id;

create or replace procedure create_auth is
    begin
        execute immediate 'drop table auth';
        execute immediate '
            create table auth
                (
                	id int identity(1, 1),
                    foreign key (user_id) references users(id),
                	salt varbinary(255),
                    hash varchar(255),
                    token varchar(255),
                    tokenExpirationDate datetime,
                    isEmailConfirmed boolean,
	                constraint PK_auth primary key (id)
                )
        ';
        commit;
    end;



