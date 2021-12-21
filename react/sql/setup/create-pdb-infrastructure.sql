create tablespace rent_ts
    datafile 'rent_ts.dbf'
    size 1G
    offline;
alter tablespace rent_ts online;
select tablespace_name, online_status from dba_data_files;

create role rl_rent;
grant create session,
    create table,
    create view,
    create procedure 
    to rl_rent;
create profile pf_rent limit
    password_life_time 180
    sessions_per_user unlimited
    failed_login_attempts 7
    password_lock_time 1
    password_reuse_time 10
    password_grace_time default
    connect_time 180
    idle_time 30;
create user rent identified by 11
    default tablespace rent_ts
    quota unlimited on rent_ts
    profile pf_rent
    account unlock;
grant rl_rent to rent;

select * from dba_ts_quotas 
    where username = 'RENT' 
    and tablespace_name = 'RENT_TS';
