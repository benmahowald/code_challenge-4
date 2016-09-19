CREATE TABLE goodies (
	id SERIAL PRIMARY KEY,
	name VARCHAR(30),
	description TEXT,
	pic TEXT
);

INSERT INTO goodies (name, description, pic) VALUES ('cupcake', 'it is cupcakey goodness', 'cupcake.jpg');
INSERT INTO goodies (name, description, pic) VALUES ('doughnuts', 'lions and tigers and bear claws', 'doughnuts.jpg');
INSERT INTO goodies (name, description, pic) VALUES ('goldfish', 'cause they are so delicious', 'goldfish.jpg');
INSERT INTO goodies (name, description, pic) VALUES ('icecream', 'rocky road is the best by far', 'icecream.jpg');
INSERT INTO goodies (name, description, pic) VALUES ('potato', 'it is cupcakey goodness', 'potato.jpg');