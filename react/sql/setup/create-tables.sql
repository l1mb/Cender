drop table "users";
create table "users" (
	"id" number generated always as identity,
	"username" varchar2(50 char) unique not null,
	"email" varchar2(50 char) not null,
	"passwordHash" varchar2(100) not null,
	constraint users_pk primary key ("id")
);
