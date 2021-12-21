CREATE FULLTEXT CATALOG FullTextCatalog;

CREATE FULLTEXT INDEX ON dbo.games
(
	game_description Language 1049
)
KEY INDEX PK_games on FullTextCatalog
WITH CHANGE_TRACKING AUTO;

SELECT game_description FROM games WHERE contains(game_description, 'near(преимущество, осведомленности)');