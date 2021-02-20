DROP TABLE IF EXISTS "pups";

CREATE TABLE "pups" (
  id SERIAL PRIMARY KEY,
  name varchar(255) default NULL,
  breed varchar(255),
  age integer NULL,
  sex varchar(255) default NULL
);

INSERT INTO "pups" (name,breed,age,sex) VALUES ('Gil','Sapien Molestie Inc.',18,''),('Sydney','Suspendisse Corp.',8,''),('Selma','Mollis Phasellus Ltd',8,''),('Camden','Consequat PC',2,'M'),('Lewis','Elementum Lorem Ut Ltd',18,'M'),('Kaden','Tortor LLP',13,''),('Colorado','Nulla Integer Vulputate Institute',13,'F'),('Lilah','Purus PC',3,'M'),('Roary','Libero Consulting',7,''),('Gavin','Per Conubia Nostra Corporation',1,'F'),('Lesley','Sit Amet Limited',1,'M'),('Moana','Nec Malesuada Ut Corp.',7,'F'),('Rebecca','Sodales Corp.',7,'M'),('Teegan','Luctus Lobortis LLC',4,''),('Shana','Magna Sed Dui LLP',17,''),('Odessa','Donec Vitae LLP',6,'M'),('Jeanette','Ipsum Inc.',18,'F'),('Fatima','Ornare Corporation',3,''),('Galvin','Nulla Corporation',2,'F'),('Blythe','Nunc Corp.',2,'M'),('Kimberly','Montes Nascetur Consulting',5,'F'),('Unity','Ultricies Foundation',1,'M'),('Isabelle','Pharetra Nam Inc.',11,''),('Priscilla','Neque Incorporated',7,'M'),('Wallace','Mi Lacinia Mattis Incorporated',7,'M'),('Kaitlin','Sem Consequat Inc.',9,''),('Camden','Sit Associates',3,''),('Idola','Arcu Incorporated',12,'M'),('Ross','Gravida Associates',16,'F'),('Kiayada','Amet LLP',18,'M'),('Madeson','Volutpat Nunc Associates',10,'F'),('Bo','Dictum Eleifend Corporation',11,''),('Amal','Vitae Nibh Donec Corporation',8,'M'),('Kaseem','Phasellus At Augue Corporation',1,'M'),('Sean','Eu Augue Company',1,'M'),('Rana','Per Conubia Associates',18,'F'),('Cade','Eu PC',18,'M'),('Addison','Phasellus Fermentum Consulting',14,'F'),('Nomlanga','Vestibulum Accumsan Institute',12,'F'),('Tanisha','Tincidunt Nibh Company',7,''),('Nomlanga','Non Cursus Non Inc.',8,'M'),('Rafael','Molestie Orci Incorporated',1,'F'),('Camille','Aliquet Company',3,'M'),('Vincent','Imperdiet Inc.',9,'F'),('Ryder','Donec At Arcu Incorporated',10,''),('Ian','Ac Limited',3,'M'),('Addison','Eu Dui Cum Associates',16,'M'),('Malcolm','Consectetuer Corporation',5,''),('April','Vulputate Mauris Sagittis Associates',8,'M'),('Cooper','Purus Gravida Corp.',15,''),('Adam','Sem Vitae LLP',18,''),('Meghan','Odio Nam Interdum Incorporated',11,'F'),('Dora','Ut PC',13,''),('Xaviera','Vitae Posuere At Foundation',18,''),('Heidi','Nulla Eu Neque Corp.',15,''),('Micah','Praesent Eu Incorporated',16,''),('Rebecca','Diam Dictum Sapien Corp.',3,''),('Alden','Eu Company',11,''),('Barry','Tristique Pharetra Consulting',17,'F'),('David','Quam Elementum Inc.',9,'F'),('Nash','Dis Parturient PC',1,'M'),('Amal','Ipsum Nunc Limited',15,''),('Brian','Mi Associates',6,''),('Mercedes','Sem Institute',10,'F'),('Keegan','Commodo LLC',17,'F'),('Ezra','Habitant Morbi Tristique Foundation',11,'F'),('Clinton','Vitae Ltd',10,''),('Basil','Ipsum Non Ltd',5,''),('Gabriel','Mi Institute',7,'M'),('Wylie','At Augue Id PC',8,'M'),('Walter','Non Lorem Inc.',1,'F'),('Oscar','Donec Est Nunc Company',4,'F'),('Ethan','Sem Eget Associates',18,'F'),('Cherokee','Commodo Consulting',12,'F'),('Brody','Vel Faucibus Id LLC',7,''),('Jemima','Elit Erat PC',12,''),('Sade','Mattis Velit Justo Limited',13,'M'),('Galvin','Dolor Dolor Limited',17,'F'),('Kermit','Pede Suspendisse Corp.',3,''),('Hayden','Libero Integer Industries',13,''),('Ava','Sit Amet Nulla Foundation',14,'F'),('Merritt','Sem Egestas LLP',14,'M'),('Willow','In Magna Consulting',9,'F'),('Danielle','Aliquet Phasellus Industries',9,''),('Maia','Ligula Nullam Enim Foundation',10,'F'),('Kasper','Litora Torquent Per Incorporated',14,'F'),('Lester','Ac Company',13,'M'),('Nelle','In Incorporated',9,'F'),('Laith','Facilisis Magna LLP',2,'F'),('Veda','Fermentum Convallis Ligula Ltd',7,'F'),('Adena','Odio Phasellus At Corp.',4,'M'),('Kaseem','Integer Tincidunt Aliquam Ltd',16,'F'),('Maile','Ridiculus Mus Proin Associates',16,''),('Omar','Risus A Corporation',13,'M'),('Lael','Orci Luctus Et Corp.',16,'F'),('Jamalia','Sapien Cursus In LLP',15,'F'),('Dieter','Urna Et PC',18,''),('Demetrius','Feugiat Nec Diam Associates',13,'F'),('Drake','Eu Tellus Eu Associates',17,'F'),('Chastity','Malesuada Associates',15,'F');