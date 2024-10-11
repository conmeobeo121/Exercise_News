drop database if exists news_db;
create database if not exists news_db;
use news_db;

create table news
(
	news_id int primary key auto_increment,
    title nvarchar(255) not null,
    summary nvarchar(1000) not null,
    content text,
    image_title_url varchar(255)
);

ALTER TABLE news ADD FULLTEXT(title);

-- 'my country'
-- my: 1
-- country: 1

-- 'my country'

-- 'Vietnam is my country'
-- 'Vietnam is country'

-- 'my': 1
-- 'country' : 1, 2

insert into news(title, summary)
values (N'Vietnam is country', N'abc');

insert into news(title, summary)
values (N'Vietnam is my country', N'abc');



SELECT * FROM news 
WHERE MATCH(title) 
AGAINST('my country');


SELECT *,
       MATCH(title) AGAINST('my country') AS relevance
FROM news
WHERE MATCH(title) AGAINST('my country')
ORDER BY relevance DESC;