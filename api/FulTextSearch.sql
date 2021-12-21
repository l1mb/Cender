CREATE FULLTEXT CATALOG FullTextCatalog;

CREATE FULLTEXT INDEX ON dbo.products
(
	product_description Language 1049
)
KEY INDEX PK_products on FullTextCatalog
WITH CHANGE_TRACKING AUTO;

SELECT product_description FROM products WHERE contains(product_description, 'near(������������, ���������������)');