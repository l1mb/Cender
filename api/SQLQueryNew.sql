CREATE TABLE vendors
(
	id int identity(1, 1),
	vendor_name varchar(255) default('Undefined'),
	constraint PK_vendors primary key (id)
)

CREATE TABLE products
(
	id int identity(1, 1),
	product_description varchar(4000) not null,
	price float default(0),
	rating varchar(255) default('0+'),
	title varchar(255) default('Undefined'),
	publisher_id int not null,
	constraint PK_products primary key (id),
	foreign key (publisher_id) references vendors(id),
	constraint ratingCHK check(rating like '%+')
);

CREATE TABLE users
(
	id int identity(1, 1),
	name varchar(255),
	login varchar(255),
	password varchar(255),
	salt varbinary(255)
	constraint PK_users primary key (id)
);

CREATE TABLE user_order
(
	id int identity(1, 1),
	total_amount float(10, 2) default(0),
	user_id int,
	constraint PK_user_order primary key (id),
	foreign key (user_id) references users(id)
);

CREATE TABLE order_products
(
	product_id int,
	order_id int,
	foreign key (product_id) references products(id),
	foreign key (order_id) references user_order(id)
);

CREATE TABLE roles(
	id int identity(1, 1),
	name varchar(10),
	constraint roles_PK primary key(id)
);

CREATE TABLE users_roles(
	user_id int,
	role_id int,
	foreign key (user_id) references users(id),
	foreign key (role_id) references roles(id)
)


SELECT * FROM vendors;
SELECT * FROM products;
SELECT * FROM user_order;
SELECT * FROM order_products;
SELECT * FROM users;