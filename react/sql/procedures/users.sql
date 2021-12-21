create or replace package rent_users as
    procedure AddUser(
        username "users"."username"%type,
        email "users"."email"%type,
        password_hash "users"."passwordHash"%type
    );
    procedure GetAllUsers(out_users out sys_refcursor);
    procedure GetUserByUsername(
        username "users"."username"%type,
        user out sys_refcursor
    );
end;
/

create or replace package body rent_users as
    procedure AddUser(
        username "users"."username"%type,
        email "users"."email"%type,
        password_hash "users"."passwordHash"%type
    )
    is begin
        insert into "users"("username", "email", "passwordHash") 
            values(username, email, password_hash);
        commit;
    exception
        when others then
            rollback;
            raise;
    end;
    --
    procedure GetAllUsers(out_users out sys_refcursor)
    is begin
        open out_users for
            select "id", "username", "email", "passwordHash"
            from "users";
    end;
    --
    procedure GetUserByUsername(
        username "users"."username"%type,
        user out sys_refcursor
    )
    is begin
        open user for
            select "id", "username", "email", "passwordHash"
            from "users" where username = "username";
    end;
end;
/
