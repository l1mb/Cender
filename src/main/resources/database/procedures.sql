
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

------------------------------------------------------------------------------------------
-- Users
------------------------------------------------------------------------------------------

------------------------------------------------------------------------------------------
-- Order
------------------------------------------------------------------------------------------

go
CREATE PROCEDURE GetLastOrderId @user_id int as
	SELECT TOP 1 id FROM user_order WHERE user_id = @user_id ORDER BY id desc;
go

go
CREATE PROCEDURE CreateOrder @user_id int, @total float as
	INSERT INTO user_order (user_id, total_amount) values (@user_id, @total);
go

go
CREATE PROCEDURE AddGameToOrder @order_id int, @game_id int as
	INSERT INTO order_games (game_id, order_id) values (@game_id, @order_id);
go

------------------------------------------------------------------------------------------
-- Order
------------------------------------------------------------------------------------------

------------------------------------------------------------------------------------------
-- Publishers
------------------------------------------------------------------------------------------

go
CREATE PROCEDURE GetPublishers as
	SELECT * FROM publishers;
go

go
CREATE PROCEDURE GetPublishersByPageNumber @page_number int, @page_size int as
	declare @start_point int = 0;
	declare @end_point int = 0;
	set @start_point = ((@page_number - 1) * @page_size) + 1;
	set @end_point = @start_point + @page_size - 1;
	SELECT *
	FROM (SELECT ROW_NUMBER() OVER(ORDER BY (select NULL as noorder)) AS RowNum, *
			FROM publishers) as alias
	WHERE RowNum BETWEEN @start_point AND @end_point;
go

go
CREATE PROCEDURE GetPublisherByName @name varchar(255) as
	SELECT * FROM publishers WHERE publisher_name = @name;
go

go
CREATE PROCEDURE GetPublisherById @id int as
	SELECT * FROM publishers WHERE id = @id;
go

go
CREATE PROCEDURE GetPublishersCount as
	SELECT COUNT(*) FROM publishers;
go

go
CREATE PROCEDURE AddPublisher @name varchar(255) as
	INSERT INTO publishers (publisher_name) values (@name);
go

go
CREATE PROCEDURE DeletePublisher @id int as
	DELETE FROM publishers WHERE id = @id;
go

go
CREATE PROCEDURE EditPublisher @id int, @name varchar(255) as
	UPDATE publishers set publisher_name = @name WHERE id = @id;
go

------------------------------------------------------------------------------------------
-- Publishers
------------------------------------------------------------------------------------------

------------------------------------------------------------------------------------------
-- Games
------------------------------------------------------------------------------------------

go
CREATE PROCEDURE GetGames as
	SELECT * FROM games;
go

go
CREATE PROCEDURE GetGamesCount as
	SELECT count(*) FROM games;
go

go
CREATE PROCEDURE GetGamesByTitleCount @title varchar(255) as
	SELECT count(*) FROM games WHERE title like '%' + @title + '%';
go

go
CREATE PROCEDURE GetGameById @id int as
	SELECT * FROM games where id = @id;
go

go
CREATE PROCEDURE GetGamesByPageNumber @page_number int, @page_size int, @title varchar(255) = null as
	declare @start_point int = 0;
	declare @end_point int = 0;
	set @start_point = ((@page_number - 1) * @page_size) + 1;
	set @end_point = @start_point + @page_size - 1;
	if (@title is null)
		SELECT *
		FROM (SELECT ROW_NUMBER() OVER(ORDER BY (select NULL as noorder)) AS RowNum, *
			  FROM games) as alias
		WHERE RowNum BETWEEN @start_point AND @end_point;
	else
		SELECT *
		FROM (SELECT ROW_NUMBER() OVER(ORDER BY (select NULL as noorder)) AS RowNum, *
			  FROM games) as alias
		WHERE RowNum BETWEEN @start_point AND @end_point AND title like '%' + @title + '%';
go

go
CREATE PROCEDURE DeleteGame @gameId int as 
begin
	DELETE FROM order_games WHERE game_id = @gameId;
	DELETE FROM games WHERE id = @gameId;
end;
go

go
CREATE PROCEDURE AddGame @publisher_id int, @title varchar(255), @rating varchar(3), @price float, @game_description varchar(4000) as
begin
	INSERT INTO games (publisher_id, title, rating, price, game_description) values (@publisher_id, @title, @rating, @price, @game_description);
end;
go

go
CREATE PROCEDURE UpdateGameInfo @id int, @publisher_id int, @title varchar(255), @rating varchar(3), @price float, @game_description varchar(4000) as
begin
	UPDATE games SET publisher_id = @publisher_id, title = @title, rating = @rating, price = @price, game_description = @game_description where id = @id;
end;
go

------------------------------------------------------------------------------------------
-- Games
------------------------------------------------------------------------------------------