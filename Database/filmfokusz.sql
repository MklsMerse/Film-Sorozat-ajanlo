-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2025. Feb 27. 21:09
-- Kiszolgáló verziója: 10.4.32-MariaDB
-- PHP verzió: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Adatbázis: `filmfokusz`
--

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `filmek`
--

CREATE TABLE `filmek` (
  `film_id` int(11) NOT NULL,
  `cim` varchar(64) NOT NULL,
  `leiras` text NOT NULL,
  `megjelenesi_datum` date NOT NULL,
  `mufaj` varchar(16) NOT NULL,
  `rendezo` varchar(64) NOT NULL,
  `szereplok` text NOT NULL,
  `ertekeles` decimal(10,0) NOT NULL,
  `film_url` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `filmek`
--

INSERT INTO `filmek` (`film_id`, `cim`, `leiras`, `megjelenesi_datum`, `mufaj`, `rendezo`, `szereplok`, `ertekeles`, `film_url`) VALUES
(8, 'Eredet', 'A film egy izgalmas sci-fi, ahol a főszereplő egy álommanipulátor, aki különleges küldetést vállal.', '2010-07-16', 'Sci-Fi', 'Christopher Nolan', 'Leonardo DiCaprio, Joseph Gordon-Levitt, Ellen Page', 0, 'https://www.imdb.com/title/tt1375666/'),
(9, 'Titanic', 'A híres szerelmi történet a Titanic katasztrófájáról, amely egy fiatal pár szenvedéseit meséli el.', '1997-12-19', 'Romantikus', 'James Cameron', 'Leonardo DiCaprio, Kate Winslet', 0, 'https://www.imdb.com/title/tt0120338/'),
(10, 'A sötét lovag', 'Batman a Gotham városát fenyegető Joker ellen harcol, miközben a törvény és igazságosság határait feszegeti.', '2008-07-18', 'Akció', 'Christopher Nolan', 'Christian Bale, Heath Ledger', 0, 'https://www.imdb.com/title/tt0468569/'),
(11, 'Testről és lélekről', 'Két ember próbálja megérteni egymást, miközben különböző kihívásokkal szembesülnek a mindennapi életben.', '2017-02-10', 'Dráma', 'Ildikó Enyedi', 'Alexandra Borbély, Morcsányi Géza', 0, 'https://www.imdb.com/title/tt5762634/'),
(12, 'Kis város', 'Egy kisváros mindennapi életét követhetjük, ahol a helyi közösség tagjai különféle problémákkal küzdenek.', '2007-03-14', 'Vígjáték', 'Krisztina Goda', 'Károly Eperjes, Anna Kovalik', 0, 'https://www.imdb.com/title/tt0981307/'),
(13, 'A Viszkis', 'A történet egy híres magyar bankrabló életét meséli el, aki a bűnözés világában próbálja meg találni a helyét.', '2017-11-30', 'Bűnügyi', 'Nemes Jeles László', 'Benedek Miklós, Zoltán Hegedüs', 0, 'https://www.imdb.com/title/tt7556932/'),
(14, 'Interstellar', 'Egy csapat űrhajós egy féreglyukon áthaladva próbálja megmenteni az emberiséget.', '2014-11-07', 'sci-fi', 'Christopher Nolan', 'Matthew McConaughey, Anne Hathaway, Jessica Chastain', 0, 'https://www.imdb.com/title/tt0816692/'),
(16, 'Blade Runner 2049', 'Egy replikáns nyomozó felfedez egy titkot, amely megváltoztathatja a világot.', '2017-10-06', 'sci-fi', 'Denis Villeneuve', 'Ryan Gosling, Harrison Ford, Ana de Armas', 0, 'https://www.imdb.com/title/tt1856101/'),
(17, 'Inception', 'Egy csapat bűnöző belép mások álmaiba, hogy információkat lopjon.', '2010-07-16', 'sci-fi', 'Christopher Nolan', 'Leonardo DiCaprio, Joseph Gordon-Levitt, Ellen Page', 0, 'https://www.imdb.com/title/tt1375666/'),
(18, 'Dune: Part One', 'Egy fiatal herceg sorsa összefonódik egy sivatagi bolygóval és annak rejtélyeivel.', '2021-10-22', 'sci-fi', 'Denis Villeneuve', 'Timothée Chalamet, Zendaya, Oscar Isaac', 0, 'https://www.imdb.com/title/tt1160419/'),
(19, 'The Martian', 'Egy asztronauta a Marson reked és megpróbál túlélni.', '2015-10-02', 'sci-fi', 'Ridley Scott', 'Matt Damon, Jessica Chastain, Kristen Wiig', 0, 'https://www.imdb.com/title/tt3659388/'),
(20, 'Edge of Tomorrow', 'Egy katona újra és újra meghal egy földönkívüli invázió során.', '2014-06-06', 'sci-fi', 'Doug Liman', 'Tom Cruise, Emily Blunt, Bill Paxton', 0, 'https://www.imdb.com/title/tt1631867/'),
(21, 'Arrival', 'Egy nyelvész próbál kommunikálni földönkívüliekkel.', '2016-11-11', 'sci-fi', 'Denis Villeneuve', 'Amy Adams, Jeremy Renner, Forest Whitaker', 0, 'https://www.imdb.com/title/tt2543164/'),
(22, 'Ex Machina', 'Egy programozó egy mesterséges intelligenciával rendelkező robotot tesztel.', '2015-04-10', 'sci-fi', 'Alex Garland', 'Alicia Vikander, Domhnall Gleeson, Oscar Isaac', 0, 'https://www.imdb.com/title/tt0470752/'),
(23, 'Gravity', 'Két űrhajós küzd a túlélésért az űrben egy katasztrófa után.', '2013-10-04', 'sci-fi', 'Alfonso Cuarón', 'Sandra Bullock, George Clooney', 0, 'https://www.imdb.com/title/tt1454468/'),
(24, 'The Conjuring', 'Egy házaspár paranormális eseményeket kutat egy rémisztő házban.', '2013-07-19', 'horror', 'James Wan', 'Vera Farmiga, Patrick Wilson, Lili Taylor', 0, 'https://www.imdb.com/title/tt1457767/'),
(25, 'Hereditary', 'Egy család szörnyű titkai lassan napvilágra kerülnek.', '2018-06-08', 'horror', 'Ari Aster', 'Toni Collette, Milly Shapiro, Gabriel Byrne', 0, 'https://www.imdb.com/title/tt7784604/'),
(26, 'Get Out', 'Egy afroamerikai férfi megdöbbentő felfedezést tesz barátnője családjáról.', '2017-02-24', 'horror', 'Jordan Peele', 'Daniel Kaluuya, Allison Williams, Bradley Whitford', 0, 'https://www.imdb.com/title/tt5052448/'),
(27, 'A Quiet Place', 'Egy család csendben próbál túlélni a zajra érzékeny szörnyek világában.', '2018-04-06', 'horror', 'John Krasinski', 'Emily Blunt, John Krasinski, Millicent Simmonds', 0, 'https://www.imdb.com/title/tt6644200/'),
(28, 'It Follows', 'Egy természetfeletti lény követi az áldozatait.', '2014-11-13', 'horror', 'David Robert Mitchell', 'Maika Monroe, Keir Gilchrist, Olivia Luccardi', 0, 'https://www.imdb.com/title/tt3235888/'),
(29, 'The Babadook', 'Egy anya és fia életét felforgatja egy rémisztő könyv.', '2014-05-22', 'horror', 'Jennifer Kent', 'Essie Davis, Noah Wiseman, Daniel Henshall', 0, 'https://www.imdb.com/title/tt2321549/'),
(30, 'Midsommar', 'Egy nyári fesztivál borzalmas rémálommá válik.', '2019-07-03', 'horror', 'Ari Aster', 'Florence Pugh, Jack Reynor, Vilhelm Blomgren', 0, 'https://www.imdb.com/title/tt8772262/'),
(31, 'The Witch', 'Egy 17. századi család boszorkányokkal találkozik az erdőben.', '2016-02-19', 'horror', 'Robert Eggers', 'Anya Taylor-Joy, Ralph Ineson, Kate Dickie', 0, 'https://www.imdb.com/title/tt4263482/'),
(32, 'The Lighthouse', 'Két világítótoronyőr lassan megőrül az elszigeteltség miatt.', '2019-10-18', 'horror', 'Robert Eggers', 'Robert Pattinson, Willem Dafoe', 0, 'https://www.imdb.com/title/tt7984734/'),
(33, 'The Texas Chainsaw Massacre', 'Egy csoport fiatal brutális gyilkosságok áldozatává válik.', '1974-10-01', 'horror', 'Tobe Hooper', 'Marilyn Burns, Edwin Neal, Allen Danziger', 0, 'https://www.imdb.com/title/tt0072271/'),
(34, 'Mad Max: Fury Road', 'Posztapokaliptikus világban Max és Furiosa harcol a túlélésért.', '2015-05-15', 'akció', 'George Miller', 'Tom Hardy, Charlize Theron, Nicholas Hoult', 0, 'https://www.imdb.com/title/tt1392190/'),
(35, 'John Wick', 'Egy visszavonult bérgyilkos bosszút áll kutyája meggyilkolásáért.', '2014-10-24', 'akció', 'Chad Stahelski', 'Keanu Reeves, Michael Nyqvist, Alfie Allen', 0, 'https://www.imdb.com/title/tt2911666/'),
(36, 'Die Hard', 'Egy rendőr próbálja megmenteni a túszokat egy karácsonyi partin.', '1988-07-20', 'akció', 'John McTiernan', 'Bruce Willis, Alan Rickman, Bonnie Bedelia', 0, 'https://www.imdb.com/title/tt0095016/'),
(37, 'The Dark Knight', 'Batman szembeszáll a bűnöző Jokerrrel Gotham Cityben.', '2008-07-18', 'akció', 'Christopher Nolan', 'Christian Bale, Heath Ledger, Aaron Eckhart', 0, 'https://www.imdb.com/title/tt0468569/'),
(38, 'Gladiator', 'Egy római tábornok bosszút áll a császáron.', '2000-05-05', 'akció', 'Ridley Scott', 'Russell Crowe, Joaquin Phoenix, Connie Nielsen', 0, 'https://www.imdb.com/title/tt0172495/'),
(39, 'The Matrix', 'Egy hacker felfedezi a valóság szörnyű igazságát.', '1999-03-31', 'akció', 'The Wachowskis', 'Keanu Reeves, Laurence Fishburne, Carrie-Anne Moss', 0, 'https://www.imdb.com/title/tt0133093/'),
(40, 'Terminator 2: Judgment Day', 'A jövőből érkező robot megvédi Sarah és John Connort.', '1991-07-03', 'akció', 'James Cameron', 'Arnold Schwarzenegger, Linda Hamilton, Edward Furlong', 0, 'https://www.imdb.com/title/tt0103064/'),
(41, 'The Bourne Identity', 'Egy amnéziás férfi próbálja visszaszerezni emlékeit.', '2002-06-14', 'akció', 'Doug Liman', 'Matt Damon, Franka Potente, Chris Cooper', 0, 'https://www.imdb.com/title/tt0258463/'),
(42, 'Casino Royale', 'James Bond megpróbálja megállítani Le Chiffre-t.', '2006-11-17', 'akció', 'Martin Campbell', 'Daniel Craig, Eva Green, Judi Dench', 0, 'https://www.imdb.com/title/tt0381061/'),
(43, 'Avengers: Endgame', 'A Bosszúállók harcolnak Thanos ellen, hogy megmentsék az univerzumot.', '2019-04-26', 'akció', 'Anthony Russo, Joe Russo', 'Robert Downey Jr., Chris Evans, Mark Ruffalo', 0, 'https://www.imdb.com/title/tt4154796/'),
(44, 'Se7en', 'Két nyomozó egy sorozatgyilkos nyomában, aki a hét főbűn alapján választ áldozatokat.', '1995-09-22', 'thriller', 'David Fincher', 'Brad Pitt, Morgan Freeman, Kevin Spacey', 0, 'https://www.imdb.com/title/tt0114369/'),
(45, 'Gone Girl', 'Egy nő eltűnése után a férjét gyanúsítják gyilkossággal.', '2014-10-03', 'thriller', 'David Fincher', 'Ben Affleck, Rosamund Pike, Neil Patrick Harris', 0, 'https://www.imdb.com/title/tt2267998/'),
(46, 'Fight Club', 'Egy irodai dolgozó csatlakozik egy titkos harci klubhoz.', '1999-10-15', 'thriller', 'David Fincher', 'Brad Pitt, Edward Norton, Helena Bonham Carter', 0, 'https://www.imdb.com/title/tt0137523/'),
(47, 'The Girl with the Dragon Tattoo', 'Egy újságíró és egy hacker egy eltűnt lányt keresnek.', '2011-12-21', 'thriller', 'David Fincher', 'Daniel Craig, Rooney Mara, Christopher Plummer', 0, 'https://www.imdb.com/title/tt1568346/'),
(48, 'Zodiac', 'Egy újságíró és egy nyomozó a hírhedt Zodiákus gyilkos után kutat.', '2007-03-02', 'thriller', 'David Fincher', 'Jake Gyllenhaal, Robert Downey Jr., Mark Ruffalo', 0, 'https://www.imdb.com/title/tt0443706/'),
(49, 'Shutter Island', 'Egy nyomozó egy elmegyógyintézetben eltűnt beteg után kutat.', '2010-02-19', 'thriller', 'Martin Scorsese', 'Leonardo DiCaprio, Emily Mortimer, Mark Ruffalo', 0, 'https://www.imdb.com/title/tt1130884/'),
(50, 'The Silence of the Lambs', 'Egy fiatal FBI-ügynök segítséget kér egy bebörtönzött pszichopatától egy sorozatgyilkos elkapásában.', '1991-02-14', 'thriller', 'Jonathan Demme', 'Jodie Foster, Anthony Hopkins, Lawrence A. Bonney', 0, 'https://www.imdb.com/title/tt0102926/'),
(51, 'Prisoners', 'Egy apa kétségbeesetten próbálja megtalálni eltűnt lányát.', '2013-09-20', 'thriller', 'Denis Villeneuve', 'Hugh Jackman, Jake Gyllenhaal, Viola Davis', 0, 'https://www.imdb.com/title/tt1392214/'),
(52, 'The Sixth Sense', 'Egy fiú, aki látja a halottakat, segítséget kér egy pszichológustól.', '1999-08-06', 'thriller', 'M. Night Shyamalan', 'Bruce Willis, Haley Joel Osment, Toni Collette', 0, 'https://www.imdb.com/title/tt0167404/'),
(53, 'Oldboy', 'Egy férfit 15 évig fogva tartanak, majd hirtelen szabadon engednek, és megpróbálja kideríteni, miért.', '2003-11-21', 'thriller', 'Park Chan-wook', 'Choi Min-sik, Yoo Ji-tae, Kang Hye-jeong', 0, 'https://www.imdb.com/title/tt0364569/'),
(54, 'The Notebook', 'Egy szenvedélyes szerelmi történet két fiatal között, amely évtizedeken át tart.', '2004-06-25', 'romantikus', 'Nick Cassavetes', 'Ryan Gosling, Rachel McAdams, James Garner', 0, 'https://www.imdb.com/title/tt0332280/'),
(55, 'Pride and Prejudice', 'Elizabeth Bennet és Mr. Darcy szerelme a társadalmi osztályok között.', '2005-09-16', 'romantikus', 'Joe Wright', 'Keira Knightley, Matthew Macfadyen, Brenda Blethyn', 0, 'https://www.imdb.com/title/tt0414387/'),
(56, 'La La Land', 'Egy színésznő és egy zenész szerelmi története Los Angelesben.', '2016-12-09', 'romantikus', 'Damien Chazelle', 'Ryan Gosling, Emma Stone, Rosemarie DeWitt', 0, 'https://www.imdb.com/title/tt3783958/'),
(57, 'A Walk to Remember', 'Egy lázadó fiatal és egy vallásos lány szerelme egy kisvárosban.', '2002-01-25', 'romantikus', 'Adam Shankman', 'Mandy Moore, Shane West, Peter Coyote', 0, 'https://www.imdb.com/title/tt0281358/'),
(58, '500 Days of Summer', 'Egy kapcsolat története, amely nem hagyományos módon alakul.', '2009-08-07', 'romantikus', 'Marc Webb', 'Joseph Gordon-Levitt, Zooey Deschanel, Geoffrey Arend', 0, 'https://www.imdb.com/title/tt1022603/'),
(59, 'Titanic', 'Jack és Rose szerelme a Titanic fedélzetén.', '1997-12-19', 'romantikus', 'James Cameron', 'Leonardo DiCaprio, Kate Winslet, Billy Zane', 0, 'https://www.imdb.com/title/tt0120338/'),
(60, 'The Fault in Our Stars', 'Két rákbeteg tinédzser szerelmi története.', '2014-06-06', 'romantikus', 'Josh Boone', 'Shailene Woodley, Ansel Elgort, Nat Wolff', 0, 'https://www.imdb.com/title/tt2582846/'),
(61, 'Notting Hill', 'Egy könyvesbolti tulajdonos és egy híres színésznő váratlan szerelme.', '1999-05-28', 'romantikus', 'Roger Michell', 'Hugh Grant, Julia Roberts, Richard McCabe', 0, 'https://www.imdb.com/title/tt0125439/'),
(62, 'Love Actually', 'Több szerelmi történet fonódik össze karácsonykor Londonban.', '2003-11-14', 'romantikus', 'Richard Curtis', 'Hugh Grant, Martine McCutcheon, Liam Neeson', 0, 'https://www.imdb.com/title/tt0314331/'),
(63, 'The Holiday', 'Két nő otthont cserél, hogy újra megtalálják önmagukat és a szerelmet.', '2006-12-08', 'romantikus', 'Nancy Meyers', 'Kate Winslet, Cameron Diaz, Jude Law', 0, 'https://www.imdb.com/title/tt0457939/'),
(64, 'The Lord of the Rings: The Fellowship of the Ring', 'Frodó és társai útnak indulnak, hogy elpusztítsák az Egy Gyűrűt.', '2001-12-19', 'kaland', 'Peter Jackson', 'Elijah Wood, Ian McKellen, Orlando Bloom', 0, 'https://www.imdb.com/title/tt0120737/'),
(65, 'Pirates of the Caribbean: The Curse of the Black Pearl', 'Jack Sparrow kapitány és Will Turner megmentenek egy elrabolt nőt.', '2003-07-09', 'kaland', 'Gore Verbinski', 'Johnny Depp, Orlando Bloom, Keira Knightley', 0, 'https://www.imdb.com/title/tt0325980/'),
(66, 'Indiana Jones and the Last Crusade', 'Indiana Jones és apja a Szent Grált keresik.', '1989-05-24', 'kaland', 'Steven Spielberg', 'Harrison Ford, Sean Connery, Alison Doody', 0, 'https://www.imdb.com/title/tt0097576/'),
(67, 'Jurassic Park', 'Egy dinoszauruszokkal teli park elszabadul.', '1993-06-11', 'kaland', 'Steven Spielberg', 'Sam Neill, Laura Dern, Jeff Goldblum', 0, 'https://www.imdb.com/title/tt0107290/'),
(68, 'Harry Potter and the Sorcerer\'s Stone', 'Harry Potter felfedezi varázsló mivoltát és elkezd tanulni a Roxfortban.', '2001-11-16', 'kaland', 'Chris Columbus', 'Daniel Radcliffe, Rupert Grint, Emma Watson', 0, 'https://www.imdb.com/title/tt0241527/'),
(69, 'The Chronicles of Narnia: The Lion, the Witch and the Wardrobe', 'Négy testvér felfedez egy varázslatos világot egy szekrényen keresztül.', '2005-12-09', 'kaland', 'Andrew Adamson', 'Tilda Swinton, Georgie Henley, William Moseley', 0, 'https://www.imdb.com/title/tt0363771/'),
(70, 'The Hobbit: An Unexpected Journey', 'Bilbó útnak indul a törpökkel, hogy visszaszerezzék Erebor királyságát.', '2012-12-14', 'kaland', 'Peter Jackson', 'Martin Freeman, Ian McKellen, Richard Armitage', 0, 'https://www.imdb.com/title/tt0903624/'),
(71, 'King Kong', 'Egy filmes expedíció egy óriási gorillát fedez fel egy szigeten.', '2005-12-14', 'kaland', 'Peter Jackson', 'Naomi Watts, Jack Black, Adrien Brody', 0, 'https://www.imdb.com/title/tt0360717/'),
(72, 'Avatar', 'Egy ember avatárként felfedezi a Pandora bolygót.', '2009-12-18', 'kaland', 'James Cameron', 'Sam Worthington, Zoe Saldana, Sigourney Weaver', 0, 'https://www.imdb.com/title/tt0499549/'),
(73, 'The Revenant', 'Egy prémvadász túlélési története a vadonban.', '2015-12-25', 'kaland', 'Alejandro G. Iñárritu', 'Leonardo DiCaprio, Tom Hardy, Will Poulter', 0, 'https://www.imdb.com/title/tt1663202/'),
(74, 'The Shawshank Redemption', 'Egy ártatlanul elítélt férfi barátságot köt a börtönben és reményt talál.', '1994-09-23', 'dráma', 'Frank Darabont', 'Tim Robbins, Morgan Freeman, Bob Gunton', 0, 'https://www.imdb.com/title/tt0111161/'),
(75, 'Forrest Gump', 'Egy egyszerű férfi elképesztő életutat jár be.', '1994-07-06', 'dráma', 'Robert Zemeckis', 'Tom Hanks, Robin Wright, Gary Sinise', 0, 'https://www.imdb.com/title/tt0109830/'),
(76, 'Schindler\'s List', 'Egy német üzletember több ezer zsidó életét menti meg a holokauszt alatt.', '1993-12-15', 'dráma', 'Steven Spielberg', 'Liam Neeson, Ralph Fiennes, Ben Kingsley', 0, 'https://www.imdb.com/title/tt0108052/'),
(77, 'Good Will Hunting', 'Egy fiatal zseni útkeresése és terápia révén történő fejlődése.', '1997-12-05', 'dráma', 'Gus Van Sant', 'Matt Damon, Robin Williams, Ben Affleck', 0, 'https://www.imdb.com/title/tt0119217/'),
(78, 'A Beautiful Mind', 'John Nash matematikus életének és mentális betegségének története.', '2001-12-21', 'dráma', 'Ron Howard', 'Russell Crowe, Ed Harris, Jennifer Connelly', 0, 'https://www.imdb.com/title/tt0268978/'),
(79, 'The Pursuit of Happyness', 'Egy apa küzd az élet nehézségeivel, miközben egyedül neveli fiát.', '2006-12-15', 'dráma', 'Gabriele Muccino', 'Will Smith, Thandiwe Newton, Jaden Smith', 0, 'https://www.imdb.com/title/tt0454921/'),
(80, 'Requiem for a Dream', 'Négy ember élete szétesik a drogfüggőség miatt.', '2000-10-27', 'dráma', 'Darren Aronofsky', 'Ellen Burstyn, Jared Leto, Jennifer Connelly', 0, 'https://www.imdb.com/title/tt0180093/'),
(81, 'The Green Mile', 'Egy halálsoron dolgozó őr felfedezi, hogy az egyik elítélt természetfeletti képességekkel rendelkezik.', '1999-12-10', 'dráma', 'Frank Darabont', 'Tom Hanks, Michael Clarke Duncan, David Morse', 0, 'https://www.imdb.com/title/tt0120689/'),
(82, '12 Years a Slave', 'Egy szabad fekete férfit elrabolnak és rabszolgasorba kényszerítenek.', '2013-10-18', 'dráma', 'Steve McQueen', 'Chiwetel Ejiofor, Michael Fassbender, Lupita Nyong\'o', 0, 'https://www.imdb.com/title/tt2024544/'),
(83, 'Moonlight', 'Egy fiatal afroamerikai férfi felnövésének és identitáskeresésének története.', '2016-10-21', 'dráma', 'Barry Jenkins', 'Mahershala Ali, Naomie Harris, Trevante Rhodes', 0, 'https://www.imdb.com/title/tt4975722/'),
(84, 'Planet Earth II', 'Sir David Attenborough bemutatja a természet csodáit modern technológiával.', '2016-11-06', 'dokumentumfilm', 'David Attenborough', 'David Attenborough', 0, 'https://www.imdb.com/title/tt5491994/'),
(85, 'The Last Dance', 'Michael Jordan és a Chicago Bulls története az 1997-98-as szezonban.', '2020-04-19', 'dokumentumfilm', 'Jason Hehir', 'Michael Jordan, Scottie Pippen, Dennis Rodman', 0, 'https://www.imdb.com/title/tt8420184/'),
(86, '13th', 'A dokumentumfilm az amerikai börtönrendszert és a faji megkülönböztetést vizsgálja.', '2016-10-07', 'dokumentumfilm', 'Ava DuVernay', 'Angela Davis, Michelle Alexander, Jelani Cobb', 0, 'https://www.imdb.com/title/tt5895028/'),
(87, 'Free Solo', 'Alex Honnold hegymászó lenyűgöző szóló mászása a Yosemite Nemzeti Parkban.', '2018-09-28', 'dokumentumfilm', 'Elizabeth Chai Vasarhelyi, Jimmy Chin', 'Alex Honnold', 0, 'https://www.imdb.com/title/tt7775622/'),
(88, 'Making a Murderer', 'Steven Avery története, aki kétszer is gyilkosságért állt bíróság elé.', '2015-12-18', 'dokumentumfilm', 'Moira Demos, Laura Ricciardi', 'Steven Avery, Dolores Avery, Laura Nirider', 0, 'https://www.imdb.com/title/tt5189670/'),
(89, 'The Social Dilemma', 'A közösségi média sötét oldalának feltárása, szakértők és alkotók segítségével.', '2020-01-26', 'dokumentumfilm', 'Jeff Orlowski', 'Tristan Harris, Aza Raskin, Justin Rosenstein', 0, 'https://www.imdb.com/title/tt11464826/'),
(90, 'Won\'t You Be My Neighbor?', 'Fred Rogers életét és örökségét bemutató megható dokumentumfilm.', '2018-06-08', 'dokumentumfilm', 'Morgan Neville', 'Fred Rogers, Joanne Rogers, John Rogers', 0, 'https://www.imdb.com/title/tt7681902/'),
(91, 'The Act of Killing', 'Indonéz paramilitáris vezetők újrajátsszák múltbeli bűntetteiket.', '2012-11-01', 'dokumentumfilm', 'Joshua Oppenheimer', 'Anwar Congo, Herman Koto, Syamsul Arifin', 0, 'https://www.imdb.com/title/tt2375605/'),
(92, 'Fahrenheit 9/11', 'Michael Moore elemzi az Egyesült Államok eseményeit a szeptember 11-ei támadások után.', '2004-06-25', 'dokumentumfilm', 'Michael Moore', 'Michael Moore, George W. Bush, Ben Affleck', 0, 'https://www.imdb.com/title/tt0361596/'),
(93, 'Inside Job', 'A dokumentumfilm a 2008-as gazdasági válság okait és következményeit vizsgálja.', '2010-10-08', 'dokumentumfilm', 'Charles Ferguson', 'Matt Damon, William Ackman, Daniel Alpert', 0, 'https://www.imdb.com/title/tt1645089/'),
(94, 'Superbad', 'Két barát próbál bulit szervezni és alkoholt szerezni, mielőtt elválnak útjaik.', '2007-08-17', 'vígjáték', 'Greg Mottola', 'Jonah Hill, Michael Cera, Christopher Mintz-Plasse', 0, 'https://www.imdb.com/title/tt0829482/'),
(95, 'The Hangover', 'Három barát próbálja felidézni az előző esti bulit és megtalálni az eltűnt vőlegényt.', '2009-06-05', 'vígjáték', 'Todd Phillips', 'Bradley Cooper, Ed Helms, Zach Galifianakis', 0, 'https://www.imdb.com/title/tt1119646/'),
(96, 'Mean Girls', 'Egy középiskolás lány beilleszkedik az iskolai hierarchiába, de összetűzésbe kerül a népszerű lányokkal.', '2004-04-30', 'vígjáték', 'Mark Waters', 'Lindsay Lohan, Rachel McAdams, Tina Fey', 0, 'https://www.imdb.com/title/tt0377092/'),
(97, 'Groundhog Day', 'Egy időjós újra és újra átéli ugyanazt a napot.', '1993-02-12', 'vígjáték', 'Harold Ramis', 'Bill Murray, Andie MacDowell, Chris Elliott', 0, 'https://www.imdb.com/title/tt0107048/'),
(98, 'Bridesmaids', 'Egy nő próbál megbirkózni azzal, hogy legjobb barátnője férjhez megy.', '2011-05-13', 'vígjáték', 'Paul Feig', 'Kristen Wiig, Maya Rudolph, Rose Byrne', 0, 'https://www.imdb.com/title/tt1478338/'),
(99, 'Ferris Bueller\'s Day Off', 'Egy középiskolás fiú egy napra otthagyja az iskolát és izgalmas kalandba keveredik.', '1986-06-11', 'vígjáték', 'John Hughes', 'Matthew Broderick, Alan Ruck, Mia Sara', 0, 'https://www.imdb.com/title/tt0091042/'),
(100, 'Anchorman: The Legend of Ron Burgundy', 'Ron Burgundy, San Diego híres hírbemondója versenybe száll egy női hírolvasóval.', '2004-07-09', 'vígjáték', 'Adam McKay', 'Will Ferrell, Christina Applegate, Steve Carell', 0, 'https://www.imdb.com/title/tt0357413/'),
(101, 'Tropic Thunder', 'Egy háborús filmet forgató színészek valódi háborús helyzetbe kerülnek.', '2008-08-13', 'vígjáték', 'Ben Stiller', 'Ben Stiller, Jack Black, Robert Downey Jr.', 0, 'https://www.imdb.com/title/tt0942385/'),
(102, 'The Grand Budapest Hotel', 'Egy híres európai szálloda portásának kalandjai a két világháború között.', '2014-03-28', 'vígjáték', 'Wes Anderson', 'Ralph Fiennes, F. Murray Abraham, Mathieu Amalric', 0, 'https://www.imdb.com/title/tt2278388/'),
(103, 'Dumb and Dumber', 'Két egyszerű barát vicces kalandokba keveredik, miközben visszajuttatnak egy táskát.', '1994-12-16', 'vígjáték', 'Peter Farrelly', 'Jim Carrey, Jeff Daniels, Lauren Holly', 0, 'https://www.imdb.com/title/tt0109686/'),
(104, 'Toy Story', 'Egy játékokkal teli szoba életre kel, amikor senki sem figyel.', '1995-11-22', 'animáció', 'John Lasseter', 'Tom Hanks, Tim Allen, Don Rickles', 0, 'https://www.imdb.com/title/tt0114709/'),
(105, 'Finding Nemo', 'Egy kis bohóchal eltűnik, és apja elindul megkeresni.', '2003-05-30', 'animáció', 'Andrew Stanton, Lee Unkrich', 'Albert Brooks, Ellen DeGeneres, Alexander Gould', 0, 'https://www.imdb.com/title/tt0266543/'),
(106, 'Shrek', 'Egy ogre megmenti a hercegnőt, hogy visszaszerezze mocsarát.', '2001-05-18', 'animáció', 'Andrew Adamson, Vicky Jenson', 'Mike Myers, Eddie Murphy, Cameron Diaz', 0, 'https://www.imdb.com/title/tt0126029/'),
(107, 'The Lion King', 'Simba, egy oroszlánkölyök, megtanulja elfogadni sorsát.', '1994-06-24', 'animáció', 'Roger Allers, Rob Minkoff', 'Matthew Broderick, Jeremy Irons, James Earl Jones', 0, 'https://www.imdb.com/title/tt0110357/'),
(108, 'Spirited Away', 'Egy fiatal lány egy varázslatos világba kerül, ahol szüleit disznókká változtatják.', '2001-07-20', 'animáció', 'Hayao Miyazaki', 'Rumi Hiiragi, Miyu Irino, Mari Natsuki', 0, 'https://www.imdb.com/title/tt0245429/'),
(109, 'The Incredibles', 'Egy szuperhős család megpróbál normális életet élni, de újra visszatérnek a hősködéshez.', '2004-11-05', 'animáció', 'Brad Bird', 'Craig T. Nelson, Holly Hunter, Samuel L. Jackson', 0, 'https://www.imdb.com/title/tt0317705/'),
(110, 'Up', 'Egy idős férfi és egy kisfiú egy léggömbökkel felszerelt házban indul kalandra.', '2009-05-29', 'animáció', 'Pete Docter, Bob Peterson', 'Edward Asner, Jordan Nagai, John Ratzenberger', 0, 'https://www.imdb.com/title/tt1049413/'),
(111, 'Coco', 'Egy fiú felfedezi családja titkait a holtak világában.', '2017-11-22', 'animáció', 'Lee Unkrich, Adrian Molina', 'Anthony Gonzalez, Gael García Bernal, Benjamin Bratt', 0, 'https://www.imdb.com/title/tt2380307/'),
(112, 'Zootopia', 'Egy nyúl rendőr és egy ravasz róka együtt próbálnak megoldani egy rejtélyt.', '2016-03-04', 'animáció', 'Byron Howard, Rich Moore, Jared Bush', 'Ginnifer Goodwin, Jason Bateman, Idris Elba', 0, 'https://www.imdb.com/title/tt2948356/'),
(113, 'Frozen', 'Egy hercegnő varázsereje fagyba borítja a királyságot.', '2013-11-27', 'animáció', 'Chris Buck, Jennifer Lee', 'Kristen Bell, Idina Menzel, Jonathan Groff', 0, 'https://www.imdb.com/title/tt2294629/');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `film_velemenyek`
--

CREATE TABLE `film_velemenyek` (
  `velemeny_id` int(11) NOT NULL,
  `felhasznalo_id` int(11) NOT NULL,
  `film_id` int(11) DEFAULT NULL,
  `velemeny_szoveg` text NOT NULL,
  `ertekeles` decimal(10,0) NOT NULL,
  `hozzaszolas_datum` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `sorozatok`
--

CREATE TABLE `sorozatok` (
  `sorozat_id` int(11) NOT NULL,
  `cim` varchar(64) NOT NULL,
  `leiras` text NOT NULL,
  `megjelenesi_datum` date NOT NULL,
  `mufaj` varchar(16) NOT NULL,
  `rendezo` varchar(64) NOT NULL,
  `szereplok` text NOT NULL,
  `ertekeles` decimal(10,0) NOT NULL,
  `sorozat_url` varchar(255) NOT NULL,
  `evadok_szama` int(2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `sorozatok`
--

INSERT INTO `sorozatok` (`sorozat_id`, `cim`, `leiras`, `megjelenesi_datum`, `mufaj`, `rendezo`, `szereplok`, `ertekeles`, `sorozat_url`, `evadok_szama`) VALUES
(9, 'A varázsló', 'A történet egy fiatal mágusról szól, aki megpróbálja elsajátítani a varázslást, miközben különféle kihívásokkal küzd.', '2015-12-25', 'Fantasy', 'Michael Spierig, Peter Spierig', 'Matthew McConaughey, Idris Elba', 0, 'https://www.imdb.com/title/tt1355642/', 1),
(10, 'Terápia', 'A sorozat egy pszichológus életét követi, aki próbálja kezelni a különböző pszichológiai problémákkal küzdő pácienseit, miközben saját problémáival is szembesül.', '2011-03-28', 'Dráma', 'Gábor Zsigmond Papp', 'József Kállai, Eszter Németh', 0, 'https://www.imdb.com/title/tt1787063/', 1),
(11, 'A mi kis falunk', 'Egy kis magyar faluban élő emberek mindennapi élete, tele humorral és szórakoztató eseményekkel, amelyek próbára teszik a közösségi életet.', '2017-01-01', 'Vígjáték', 'Péter Kerekes', 'Zoltán Mucsi, Károly Gesztesi', 0, 'https://www.imdb.com/title/tt5815516/', 7),
(12, 'Stranger Things', 'Egy kisvárosban furcsa események történnek egy fiú eltűnése után.', '2016-07-15', 'sci-fi', 'The Duffer Brothers', 'Millie Bobby Brown, Finn Wolfhard, David Harbour', 0, 'https://www.imdb.com/title/tt4574334/', 4),
(13, 'The Expanse', 'Egy jövőbeli konfliktus a Föld, Mars és az Aszteroidaöv között.', '2015-12-14', 'sci-fi', 'Mark Fergus, Hawk Ostby', 'Steven Strait, Dominique Tipper, Wes Chatham', 0, 'https://www.imdb.com/title/tt3230854/', 6),
(14, 'Westworld', 'Egy futurisztikus vidámpark, ahol a mesterséges intelligenciák fellázadnak.', '2016-10-02', 'sci-fi', 'Jonathan Nolan, Lisa Joy', 'Evan Rachel Wood, Thandiwe Newton, Jeffrey Wright', 0, 'https://www.imdb.com/title/tt0475784/', 4),
(15, 'Black Mirror', 'Egy antológia, amely a modern technológia sötét oldalát mutatja be.', '2011-12-04', 'sci-fi', 'Charlie Brooker', 'Bryce Dallas Howard, Daniel Lapaine, Michaela Coel', 0, 'https://www.imdb.com/title/tt2085059/', 5),
(16, 'The Mandalorian', 'Egy magányos fejvadász kalandjai a Csillagok háborúja világában.', '2019-11-12', 'sci-fi', 'Jon Favreau', 'Pedro Pascal, Carl Weathers, Gina Carano', 0, 'https://www.imdb.com/title/tt8111088/', 3),
(17, 'The 100', 'Fiatal túlélők térnek vissza a Földre egy nukleáris apokalipszis után.', '2014-03-19', 'sci-fi', 'Jason Rothenberg', 'Eliza Taylor, Bob Morley, Marie Avgeropoulos', 0, 'https://www.imdb.com/title/tt2661044/', 7),
(18, 'Altered Carbon', 'Egy olyan világban játszódik, ahol a tudat áthelyezhető más testekbe.', '2018-02-02', 'sci-fi', 'Laeta Kalogridis', 'Joel Kinnaman, James Purefoy, Martha Higareda', 0, 'https://www.imdb.com/title/tt2261227/', 2),
(19, 'Doctor Who', 'Egy időutazó földönkívüli kalandjai az univerzumban.', '2005-03-26', 'sci-fi', 'Russell T Davies', 'Jodie Whittaker, David Tennant, Peter Capaldi', 0, 'https://www.imdb.com/title/tt0436992/', 13),
(20, 'Star Trek: Discovery', 'Az USS Discovery űrhajó kalandjai az űr felfedezése során.', '2017-09-24', 'sci-fi', 'Bryan Fuller, Alex Kurtzman', 'Sonequa Martin-Green, Doug Jones, Anthony Rapp', 0, 'https://www.imdb.com/title/tt5171438/', 4),
(21, 'Fringe', 'Egy különleges FBI egység paranormális események után nyomoz.', '2008-09-09', 'sci-fi', 'J.J. Abrams, Alex Kurtzman, Roberto Orci', 'Anna Torv, Joshua Jackson, John Noble', 0, 'https://www.imdb.com/title/tt1119644/', 5),
(22, 'The Haunting of Hill House', 'Egy család szembesül a múlt kísérteteivel a Hill House-ban.', '2018-10-12', 'horror', 'Mike Flanagan', 'Michiel Huisman, Carla Gugino, Henry Thomas', 0, 'https://www.imdb.com/title/tt6763664/', 1),
(23, 'American Horror Story', 'Antológia sorozat különböző horror történetekkel minden évadban.', '2011-10-05', 'horror', 'Ryan Murphy, Brad Falchuk', 'Evan Peters, Sarah Paulson, Jessica Lange', 0, 'https://www.imdb.com/title/tt1844624/', 11),
(24, 'The Walking Dead', 'Túlélők próbálnak életben maradni egy zombi apokalipszis után.', '2010-10-31', 'horror', 'Frank Darabont', 'Andrew Lincoln, Norman Reedus, Melissa McBride', 0, 'https://www.imdb.com/title/tt1520211/', 11),
(25, 'Penny Dreadful', 'Klasszikus horror karakterek egy sötét viktoriánus világban.', '2014-05-11', 'horror', 'John Logan', 'Eva Green, Josh Hartnett, Timothy Dalton', 0, 'https://www.imdb.com/title/tt2628232/', 3),
(26, 'Bates Motel', 'A fiatal Norman Bates és anyja közötti baljós kapcsolat története.', '2013-03-18', 'horror', 'Carlton Cuse, Kerry Ehrin', 'Vera Farmiga, Freddie Highmore, Max Thieriot', 0, 'https://www.imdb.com/title/tt2188671/', 5),
(27, 'Marianne', 'Egy horror írónőt régi démonai kísértenek a szülővárosában.', '2019-09-13', 'horror', 'Samuel Bodin', 'Victoire Du Bois, Lucie Boujenah, Tiphaine Daviot', 0, 'https://www.imdb.com/title/tt10875696/', 1),
(28, 'Castle Rock', 'Stephen King történeteinek sötét világát fedezi fel.', '2018-07-25', 'horror', 'Sam Shaw, Dustin Thomason', 'Bill Skarsgård, André Holland, Lizzy Caplan', 0, 'https://www.imdb.com/title/tt6548228/', 2),
(29, 'Slasher', 'Egy sorozatgyilkos terrorizál egy kisvárost.', '2016-03-04', 'horror', 'Aaron Martin', 'Katie McGrath, Brandon Jay McLaren, Steve Byers', 0, 'https://www.imdb.com/title/tt4667888/', 4),
(30, 'The Terror', 'Egy sarkvidéki expedíciót természetfeletti erők üldöznek.', '2018-03-25', 'horror', 'David Kajganich, Max Borenstein', 'Jared Harris, Tobias Menzies, Paul Ready', 0, 'https://www.imdb.com/title/tt2708480/', 2),
(31, 'Servant', 'Egy házaspár titokzatos dadát fogad fel elhunyt gyermekük pótlására.', '2019-11-28', 'horror', 'Tony Basgallop', 'Lauren Ambrose, Toby Kebbell, Rupert Grint', 0, 'https://www.imdb.com/title/tt8068860/', 4),
(32, '24', 'Egy nap története Jack Bauerrel, aki terrorista fenyegetések ellen küzd.', '2001-11-06', 'akció', 'Robert Cochran, Joel Surnow', 'Kiefer Sutherland, Mary Lynn Rajskub, Carlos Bernard', 0, 'https://www.imdb.com/title/tt0285331/', 9),
(33, 'Prison Break', 'Egy férfi elítélt bátyját próbálja megszöktetni a börtönből.', '2005-08-29', 'akció', 'Paul Scheuring', 'Dominic Purcell, Wentworth Miller, Amaury Nolasco', 0, 'https://www.imdb.com/title/tt0455275/', 5),
(34, 'Arrow', 'Egy milliárdos éjszaka igazságot szolgáltat szuperhősként.', '2012-10-10', 'akció', 'Greg Berlanti, Marc Guggenheim, Andrew Kreisberg', 'Stephen Amell, Katie Cassidy, David Ramsey', 0, 'https://www.imdb.com/title/tt2193021/', 8),
(35, 'The Punisher', 'Egy férfi bosszút áll családja haláláért.', '2017-11-17', 'akció', 'Steve Lightfoot', 'Jon Bernthal, Amber Rose Revah, Ben Barnes', 0, 'https://www.imdb.com/title/tt5675620/', 2),
(36, 'Jack Ryan', 'Egy CIA-elemző terepen találja magát veszélyes küldetések során.', '2018-08-31', 'akció', 'Carlton Cuse, Graham Roland', 'John Krasinski, Wendell Pierce, Abbie Cornish', 0, 'https://www.imdb.com/title/tt5057054/', 3),
(37, 'Vikings', 'Ragnar Lothbrok, a híres viking harcos kalandjai.', '2013-03-03', 'akció', 'Michael Hirst', 'Travis Fimmel, Katheryn Winnick, Clive Standen', 0, 'https://www.imdb.com/title/tt2306299/', 6),
(38, 'The Witcher', 'Egy szörnyvadász kalandjai egy misztikus világban.', '2019-12-20', 'akció', 'Lauren Schmidt Hissrich', 'Henry Cavill, Anya Chalotra, Freya Allan', 0, 'https://www.imdb.com/title/tt5180504/', 3),
(39, 'Spartacus', 'A legendás gladiátor története, aki fellázadt a Római Birodalom ellen.', '2010-01-22', 'akció', 'Steven S. DeKnight', 'Andy Whitfield, Lucy Lawless, Manu Bennett', 0, 'https://www.imdb.com/title/tt1442449/', 4),
(40, 'Lethal Weapon', 'Egy nyomozópáros Los Angeles utcáin veszi fel a harcot a bűnözőkkel.', '2016-09-21', 'akció', 'Matthew Miller', 'Damon Wayans, Clayne Crawford, Keesha Sharp', 0, 'https://www.imdb.com/title/tt5164196/', 3),
(41, 'Hanna', 'Egy fiatal lány, akit bérgyilkossá képeztek ki, menekülni kényszerül.', '2019-03-28', 'akció', 'David Farr', 'Esme Creed-Miles, Mireille Enos, Joel Kinnaman', 0, 'https://www.imdb.com/title/tt6932244/', 3),
(42, 'Mindhunter', 'Két FBI ügynök sorozatgyilkosok pszichológiáját kutatja.', '2017-10-13', 'thriller', 'Joe Penhall', 'Jonathan Groff, Holt McCallany, Anna Torv', 0, 'https://www.imdb.com/title/tt5290382/', 2),
(43, 'True Detective', 'Egy antológiasorozat, amely különböző bűnügyeket mutat be.', '2014-01-12', 'thriller', 'Nic Pizzolatto', 'Matthew McConaughey, Woody Harrelson, Michelle Monaghan', 0, 'https://www.imdb.com/title/tt2356777/', 3),
(44, 'The Night Of', 'Egy férfit gyilkossággal vádolnak egy éjszaka után, amelyre nem emlékszik.', '2016-07-10', 'thriller', 'Steven Zaillian, Richard Price', 'Riz Ahmed, John Turturro, Bill Camp', 0, 'https://www.imdb.com/title/tt2401256/', 1),
(45, 'You', 'Egy könyvesbolt tulajdonos megszállottá válik egy nő iránt.', '2018-09-09', 'thriller', 'Greg Berlanti, Sera Gamble', 'Penn Badgley, Victoria Pedretti, Elizabeth Lail', 0, 'https://www.imdb.com/title/tt7335184/', 4),
(46, 'Ozark', 'Egy pénzmosó család új életet kezd a Missouri tóvidéken.', '2017-07-21', 'thriller', 'Bill Dubuque, Mark Williams', 'Jason Bateman, Laura Linney, Julia Garner', 0, 'https://www.imdb.com/title/tt5071412/', 4),
(47, 'Broadchurch', 'Egy kisvárosi gyilkossági ügy feltárása.', '2013-03-04', 'thriller', 'Chris Chibnall', 'David Tennant, Olivia Colman, Jodie Whittaker', 0, 'https://www.imdb.com/title/tt2249364/', 3),
(48, 'Bodyguard', 'Egy háborús veterán politikai összeesküvésbe keveredik.', '2018-08-26', 'thriller', 'Jed Mercurio', 'Richard Madden, Keeley Hawes, Sophie Rundle', 0, 'https://www.imdb.com/title/tt7493974/', 1),
(49, 'The Killing', 'Egy fiatal lány meggyilkolásának nyomozása.', '2011-04-03', 'thriller', 'Veena Sud', 'Mireille Enos, Joel Kinnaman, Billy Campbell', 0, 'https://www.imdb.com/title/tt1637727/', 4),
(50, 'Hannibal', 'Egy FBI-profiler különleges kapcsolatot alakít ki egy sorozatgyilkossal.', '2013-04-04', 'thriller', 'Bryan Fuller', 'Mads Mikkelsen, Hugh Dancy, Caroline Dhavernas', 0, 'https://www.imdb.com/title/tt2243973/', 3),
(51, 'The Sinner', 'Egy nő váratlanul gyilkosságot követ el, de senki sem érti, miért.', '2017-08-02', 'thriller', 'Derek Simonds', 'Jessica Biel, Bill Pullman, Christopher Abbott', 0, 'https://www.imdb.com/title/tt6048596/', 4),
(52, 'Outlander', 'Egy időutazó nő két korszak között találja magát, és két férfi között őrlődik.', '2014-08-09', 'romantikus', 'Ronald D. Moore', 'Caitríona Balfe, Sam Heughan, Tobias Menzies', 0, 'https://www.imdb.com/title/tt3006802/', 7),
(53, 'Bridgerton', 'A Bridgerton család történetei a 19. századi London társadalmi életében.', '2020-12-25', 'romantikus', 'Chris Van Dusen', 'Phoebe Dynevor, Regé-Jean Page, Nicola Coughlan', 0, 'https://www.imdb.com/title/tt8740790/', 2),
(54, 'The Vampire Diaries', 'Egy tinédzser lány két vámpír testvér között találja magát.', '2009-09-10', 'romantikus', 'Julie Plec, Kevin Williamson', 'Nina Dobrev, Paul Wesley, Ian Somerhalder', 0, 'https://www.imdb.com/title/tt1405406/', 8),
(55, 'Grey\'s Anatomy', 'Egy seattle-i kórház sebészeinek életét és szerelmeit követi.', '2005-03-27', 'romantikus', 'Shonda Rhimes', 'Ellen Pompeo, Sandra Oh, Justin Chambers', 0, 'https://www.imdb.com/title/tt0413573/', 19),
(56, 'Normal People', 'Egy ír pár kapcsolatának története több év alatt.', '2020-04-26', 'romantikus', 'Lenny Abrahamson, Hettie Macdonald', 'Daisy Edgar-Jones, Paul Mescal, Eliot Salt', 0, 'https://www.imdb.com/title/tt9059760/', 1),
(57, 'Gossip Girl', 'Egy elit manhattani magániskola diákjai és botrányaik.', '2007-09-19', 'romantikus', 'Stephanie Savage, Josh Schwartz', 'Blake Lively, Leighton Meester, Penn Badgley', 0, 'https://www.imdb.com/title/tt0397442/', 6),
(58, 'Love', 'Egy bonyolult párkapcsolat története Los Angelesben.', '2016-02-19', 'romantikus', 'Judd Apatow, Lesley Arfin, Paul Rust', 'Gillian Jacobs, Paul Rust, Claudia O\'Doherty', 0, 'https://www.imdb.com/title/tt4061080/', 3),
(59, 'Jane the Virgin', 'Egy fiatal nő véletlenül teherbe esik mesterséges megtermékenyítés miatt.', '2014-10-13', 'romantikus', 'Jennie Snyder Urman', 'Gina Rodriguez, Andrea Navedo, Yael Grobglas', 0, 'https://www.imdb.com/title/tt3566726/', 5),
(60, 'Sweet Magnolias', 'Három barátnő életének és kapcsolatainak története egy déli kisvárosban.', '2020-05-19', 'romantikus', 'Sheryl J. Anderson', 'JoAnna Garcia Swisher, Brooke Elliott, Heather Headley', 0, 'https://www.imdb.com/title/tt9077540/', 3),
(61, 'Poldark', 'Egy brit katonatiszt visszatér hazájába és újjáépíti életét.', '2015-03-08', 'romantikus', 'Debbie Horsfield', 'Aidan Turner, Eleanor Tomlinson, Jack Farthing', 0, 'https://www.imdb.com/title/tt3636060/', 5),
(62, 'Game of Thrones', 'Kilenc nemesi család harcol a Westeros trónjáért.', '2011-04-17', 'kaland', 'David Benioff, D.B. Weiss', 'Emilia Clarke, Peter Dinklage, Kit Harington', 0, 'https://www.imdb.com/title/tt0944947/', 8),
(63, 'The Witcher', 'Egy szörnyvadász kalandjai egy misztikus világban.', '2019-12-20', 'kaland', 'Lauren Schmidt Hissrich', 'Henry Cavill, Anya Chalotra, Freya Allan', 0, 'https://www.imdb.com/title/tt5180504/', 3),
(64, 'The Mandalorian', 'Egy fejvadász kalandjai a Csillagok háborúja világában.', '2019-11-12', 'kaland', 'Jon Favreau', 'Pedro Pascal, Carl Weathers, Gina Carano', 0, 'https://www.imdb.com/title/tt8111088/', 3),
(65, 'Vikings', 'Ragnar Lothbrok, a híres viking harcos története.', '2013-03-03', 'kaland', 'Michael Hirst', 'Travis Fimmel, Katheryn Winnick, Clive Standen', 0, 'https://www.imdb.com/title/tt2306299/', 6),
(66, 'Merlin', 'Arthur király és Merlin varázsló története.', '2008-09-20', 'kaland', 'Johnny Capps, Julian Jones', 'Colin Morgan, Bradley James, Katie McGrath', 0, 'https://www.imdb.com/title/tt1199099/', 5),
(67, 'Black Sails', 'A kalózok aranykorában játszódó sorozat.', '2014-01-25', 'kaland', 'Jonathan E. Steinberg, Robert Levine', 'Toby Stephens, Hannah New, Luke Arnold', 0, 'https://www.imdb.com/title/tt2375692/', 4),
(68, 'The Expanse', 'A Föld és a Mars közötti konfliktus egy űrhajó legénységének szemszögéből.', '2015-12-14', 'kaland', 'Mark Fergus, Hawk Ostby', 'Steven Strait, Dominique Tipper, Wes Chatham', 0, 'https://www.imdb.com/title/tt3230854/', 6),
(69, 'His Dark Materials', 'Egy fiatal lány kalandjai párhuzamos világokban.', '2019-11-03', 'kaland', 'Jack Thorne', 'Dafne Keen, Ruth Wilson, Amir Wilson', 0, 'https://www.imdb.com/title/tt5607976/', 3),
(70, 'The 100', 'Fiatal túlélők térnek vissza a Földre egy nukleáris apokalipszis után.', '2014-03-19', 'kaland', 'Jason Rothenberg', 'Eliza Taylor, Bob Morley, Marie Avgeropoulos', 0, 'https://www.imdb.com/title/tt2661044/', 7),
(71, 'Legend of the Seeker', 'Egy varázsló és egy harcos kalandjai a gonosz ellen.', '2008-11-01', 'kaland', 'Kenneth Biller, Stephen Tolkin', 'Craig Horner, Bridget Regan, Bruce Spence', 0, 'https://www.imdb.com/title/tt0844653/', 2),
(72, 'Breaking Bad', 'Egy kémiatanár metamfetamin-gyártóvá válik, hogy biztosítsa családja jövőjét.', '2008-01-20', 'dráma', 'Vince Gilligan', 'Bryan Cranston, Aaron Paul, Anna Gunn', 0, 'https://www.imdb.com/title/tt0903747/', 5),
(73, 'The Sopranos', 'Egy New Jersey-i maffiavezér próbálja egyensúlyban tartani családját és bűnszervezetét.', '1999-01-10', 'dráma', 'David Chase', 'James Gandolfini, Lorraine Bracco, Edie Falco', 0, 'https://www.imdb.com/title/tt0141842/', 6),
(74, 'The Crown', 'A brit királyi család történetét követi II. Erzsébet uralkodása alatt.', '2016-11-04', 'dráma', 'Peter Morgan', 'Claire Foy, Olivia Colman, Imelda Staunton', 0, 'https://www.imdb.com/title/tt4786824/', 6),
(75, 'Euphoria', 'Egy tinédzser küzdelmei a drogfüggőség és identitás keresése közepette.', '2019-06-16', 'dráma', 'Sam Levinson', 'Zendaya, Hunter Schafer, Jacob Elordi', 0, 'https://www.imdb.com/title/tt8772296/', 2),
(76, 'Succession', 'Egy médiaóriás családjának harca a vállalat feletti irányításért.', '2018-06-03', 'dráma', 'Jesse Armstrong', 'Brian Cox, Jeremy Strong, Sarah Snook', 0, 'https://www.imdb.com/title/tt7660850/', 4),
(77, 'The Handmaid\'s Tale', 'Egy disztópikus világban a nők alávetett szerepet töltenek be.', '2017-04-26', 'dráma', 'Bruce Miller', 'Elisabeth Moss, Yvonne Strahovski, Joseph Fiennes', 0, 'https://www.imdb.com/title/tt5834204/', 5),
(78, 'Big Little Lies', 'Egy kaliforniai város női titkokat őriznek, amely végül gyilkosságba torkollik.', '2017-02-19', 'dráma', 'David E. Kelley', 'Reese Witherspoon, Nicole Kidman, Shailene Woodley', 0, 'https://www.imdb.com/title/tt3920596/', 2),
(79, 'The West Wing', 'Az amerikai elnök és stábja politikai és személyes drámái.', '1999-09-22', 'dráma', 'Aaron Sorkin', 'Martin Sheen, Rob Lowe, Allison Janney', 0, 'https://www.imdb.com/title/tt0200276/', 7),
(80, 'This Is Us', 'Egy család három generációjának élettörténete.', '2016-09-20', 'dráma', 'Dan Fogelman', 'Milo Ventimiglia, Mandy Moore, Sterling K. Brown', 0, 'https://www.imdb.com/title/tt5555260/', 6),
(81, 'Mad Men', 'Egy reklámügynökség dolgozóinak élete a 60-as években.', '2007-07-19', 'dráma', 'Matthew Weiner', 'Jon Hamm, Elisabeth Moss, Vincent Kartheiser', 0, 'https://www.imdb.com/title/tt0804503/', 7),
(82, 'Friends', 'Hat barát mindennapjai és szerelmi élete New Yorkban.', '1994-09-22', 'vígjáték', 'David Crane, Marta Kauffman', 'Jennifer Aniston, Courteney Cox, Lisa Kudrow', 0, 'https://www.imdb.com/title/tt0108778/', 10),
(83, 'The Office', 'Egy pennsylvaniai papírgyártó cég mindennapjai.', '2005-03-24', 'vígjáték', 'Greg Daniels', 'Steve Carell, Rainn Wilson, John Krasinski', 0, 'https://www.imdb.com/title/tt0386676/', 9),
(84, 'Brooklyn Nine-Nine', 'Egy brooklyni rendőrőrs vicces mindennapjai.', '2013-09-17', 'vígjáték', 'Michael Schur, Dan Goor', 'Andy Samberg, Terry Crews, Stephanie Beatriz', 0, 'https://www.imdb.com/title/tt2467372/', 8),
(85, 'Parks and Recreation', 'Egy kisvárosi köztisztviselő és csapata vicces kalandjai.', '2009-04-09', 'vígjáték', 'Greg Daniels, Michael Schur', 'Amy Poehler, Rashida Jones, Nick Offerman', 0, 'https://www.imdb.com/title/tt1266020/', 7),
(86, 'How I Met Your Mother', 'Egy férfi elmeséli, hogyan találkozott gyerekei anyjával.', '2005-09-19', 'vígjáték', 'Carter Bays, Craig Thomas', 'Josh Radnor, Jason Segel, Cobie Smulders', 0, 'https://www.imdb.com/title/tt0460649/', 9),
(87, 'Modern Family', 'Egy család három generációjának vicces és megható élete.', '2009-09-23', 'vígjáték', 'Steven Levitan, Christopher Lloyd', 'Ed O\'Neill, Sofía Vergara, Julie Bowen', 0, 'https://www.imdb.com/title/tt1442437/', 11),
(88, 'The Big Bang Theory', 'Egy társaság zseniális, de szociálisan ügyetlen fiataljainak története.', '2007-09-24', 'vígjáték', 'Chuck Lorre, Bill Prady', 'Johnny Galecki, Jim Parsons, Kaley Cuoco', 0, 'https://www.imdb.com/title/tt0898266/', 12),
(89, 'Scrubs', 'Egy kórházban dolgozó fiatal orvosok humoros és megható pillanatai.', '2001-10-02', 'vígjáték', 'Bill Lawrence', 'Zach Braff, Donald Faison, Sarah Chalke', 0, 'https://www.imdb.com/title/tt0285403/', 9),
(90, 'Arrested Development', 'Egy diszfunkcionális család próbálja egyben tartani életét.', '2003-11-02', 'vígjáték', 'Mitchell Hurwitz', 'Jason Bateman, Michael Cera, Portia de Rossi', 0, 'https://www.imdb.com/title/tt0367279/', 5),
(91, 'It\'s Always Sunny in Philadelphia', 'Egy baráti társaság egy ír kocsmát üzemeltet, miközben zűrös kalandokba keveredik.', '2005-08-04', 'vígjáték', 'Rob McElhenney', 'Charlie Day, Glenn Howerton, Rob McElhenney', 0, 'https://www.imdb.com/title/tt0472954/', 15),
(92, 'Rick and Morty', 'Egy zseniális, de alkoholista tudós és unokája interdimenzionális kalandjai.', '2013-12-02', 'animáció', 'Dan Harmon, Justin Roiland', 'Justin Roiland, Chris Parnell, Spencer Grammer', 0, 'https://www.imdb.com/title/tt2861424/', 6),
(93, 'BoJack Horseman', 'Egy kiégett szitkomsztár ló küzdelmei a visszatéréssel és saját démonaival.', '2014-08-22', 'animáció', 'Raphael Bob-Waksberg', 'Will Arnett, Amy Sedaris, Alison Brie', 0, 'https://www.imdb.com/title/tt3398228/', 6),
(94, 'The Simpsons', 'Springfield város lakóinak humoros mindennapjai.', '1989-12-17', 'animáció', 'Matt Groening', 'Dan Castellaneta, Julie Kavner, Nancy Cartwright', 0, 'https://www.imdb.com/title/tt0096697/', 34),
(95, 'Family Guy', 'Griffinék őrült kalandjai Quahog városában.', '1999-01-31', 'animáció', 'Seth MacFarlane', 'Seth MacFarlane, Alex Borstein, Seth Green', 0, 'https://www.imdb.com/title/tt0182576/', 21),
(96, 'Futurama', 'Egy pizzafutár 1000 évre lefagyasztva egy futurisztikus világban találja magát.', '1999-03-28', 'animáció', 'Matt Groening, David X. Cohen', 'Billy West, John DiMaggio, Katey Sagal', 0, 'https://www.imdb.com/title/tt0149460/', 8),
(97, 'South Park', 'Négy fiú szatirikus és provokatív kalandjai egy coloradói kisvárosban.', '1997-08-13', 'animáció', 'Trey Parker, Matt Stone', 'Trey Parker, Matt Stone, Isaac Hayes', 0, 'https://www.imdb.com/title/tt0121955/', 26),
(98, 'Avatar: The Last Airbender', 'Egy fiatal avatar küldetése, hogy visszaállítsa a békét a világban.', '2005-02-21', 'animáció', 'Michael Dante DiMartino, Bryan Konietzko', 'Zach Tyler, Mae Whitman, Jack De Sena', 0, 'https://www.imdb.com/title/tt0417299/', 3),
(99, 'Gravity Falls', 'Két testvér nyári kalandjai egy rejtélyekkel teli városban.', '2012-06-15', 'animáció', 'Alex Hirsch', 'Jason Ritter, Alex Hirsch, Kristen Schaal', 0, 'https://www.imdb.com/title/tt1865718/', 2),
(100, 'Archer', 'Egy titkosügynök és csapata vicces kémkalandjai.', '2009-09-17', 'animáció', 'Adam Reed', 'H. Jon Benjamin, Judy Greer, Amber Nash', 0, 'https://www.imdb.com/title/tt1486217/', 14),
(101, 'The Legend of Korra', 'Egy új avatar kalandjai a modernizálódó világban.', '2012-04-14', 'animáció', 'Michael Dante DiMartino, Bryan Konietzko', 'Janet Varney, P.J. Byrne, David Faustino', 0, 'https://www.imdb.com/title/tt1695360/', 4);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `sorozat_velemenyek`
--

CREATE TABLE `sorozat_velemenyek` (
  `velemeny_id` int(11) NOT NULL,
  `felhasznalo_id` int(11) NOT NULL,
  `sorozat_id` int(11) DEFAULT NULL,
  `velemeny_szoveg` text NOT NULL,
  `ertekeles` decimal(10,0) NOT NULL,
  `hozzaszolas_datum` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `user`
--

CREATE TABLE `user` (
  `Id` int(11) NOT NULL,
  `LoginNev` varchar(255) DEFAULT NULL,
  `Hash` varchar(255) DEFAULT NULL,
  `Salt` varchar(255) DEFAULT NULL,
  `Name` varchar(255) DEFAULT NULL,
  `PermissionId` int(11) NOT NULL,
  `Active` tinyint(1) NOT NULL,
  `Email` varchar(64) NOT NULL,
  `ProfilePicturePath` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- A tábla adatainak kiíratása `user`
--

INSERT INTO `user` (`Id`, `LoginNev`, `Hash`, `Salt`, `Name`, `PermissionId`, `Active`, `Email`, `ProfilePicturePath`) VALUES
(9, 'kerenyir', 'd5fe0e517520122f1ab363b6b7ee9ae616e7ad393693ef00d81a7f287a79931a', 'Gm63C4jiWnYvfZfiKUu2cu8AHPNDj8NoHhtQn88yiJhyOunBNSd7tRoWo5wwqg9X', 'Kerényi Róbert', 2, 1, 'kerenyir@kkszki.hu', 'franciabulldog.jpg'),
(23, 'Szita', 'a34c3f1044ede88415cfaa0360cef9d1879f42a21b3a0097bb24831de57d2313', 'XMdgieKGPUGaFOyfHCvicGUbRmWfkzSyT9TrRCQiflxOSUOgcpQ3ND1LNKqZQoug', 'Szitai Bence', 1, 1, 'szitaibence1@gmail.com', 'defaultuser.png'),
(27, 'Mkls', '7a0c47969a7f341766d04147fbf3cd4c24b9de51752aa6a8e29cc6ea1b027bcc', 'cyPlPrxMEcLNLguKiAurirqOv1XjJ7EShqnA3x1GxnSf2aOhXPskuauCKBNX9vVK', 'Miklós Merse', 1, 1, 'mkls@gmail.com', 'defaultuser.png'),
(28, 'Brendon', '73b1f7ac1a2310c85362c467b3b9d62aec84a1cbb9be43a5bc5540c959025911', 'pc2Sxsub0lSSnK6ULbJZdFrVn2iwRihHH3ViQCwdd3rDOXtG9YgNaiJGscbWv8QL', 'Lakatos Brendon', 1, 1, 'lakatos@gmail.com', 'brendon.jpg'),
(29, 'vmi', 'fabdeacdc07a2cc06d466f032e2b7fad73cc0f6fc2505a5acd3074e9e94d7617', 'J1d8BO0f0kLMMVjCP5hZIKCtMxWoQj1N0hb07TO5WA4kfwX1azTwUlw7JrFFmiiF', 'Valami', 1, 1, 'vmi@gmail.com', 'data:image/webp;base64,UklGRvgsAABXRUJQVlA4WAoAAAAQAAAAPwEAPwEAQUxQSAIOAAABn6e4bSRlh/pv+hj+EZGFK0QbDIg9gugk/M9w3LaRJIn5hz2z297zHRET0L9v4IH7O62hyrU9ehIzOsQEnbNpyRltz2jlKDbxHM03Jk3Gz1F23qUD79K7vsgn5BV6l0Ne4OJBstIhjT2nYtX5yMRCU45ozVPohbijlxN6e2/zB1rb/k99E2tS');

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `filmek`
--
ALTER TABLE `filmek`
  ADD PRIMARY KEY (`film_id`);

--
-- A tábla indexei `film_velemenyek`
--
ALTER TABLE `film_velemenyek`
  ADD PRIMARY KEY (`velemeny_id`),
  ADD KEY `felhasznalo_id` (`felhasznalo_id`),
  ADD KEY `film_id` (`film_id`);

--
-- A tábla indexei `sorozatok`
--
ALTER TABLE `sorozatok`
  ADD PRIMARY KEY (`sorozat_id`);

--
-- A tábla indexei `sorozat_velemenyek`
--
ALTER TABLE `sorozat_velemenyek`
  ADD PRIMARY KEY (`velemeny_id`),
  ADD KEY `felhasznalo_id` (`felhasznalo_id`),
  ADD KEY `sorozat_id` (`sorozat_id`);

--
-- A tábla indexei `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`Id`),
  ADD UNIQUE KEY `LoginNev` (`LoginNev`),
  ADD UNIQUE KEY `Email` (`Email`),
  ADD KEY `Jog` (`PermissionId`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `filmek`
--
ALTER TABLE `filmek`
  MODIFY `film_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=131;

--
-- AUTO_INCREMENT a táblához `film_velemenyek`
--
ALTER TABLE `film_velemenyek`
  MODIFY `velemeny_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT a táblához `sorozatok`
--
ALTER TABLE `sorozatok`
  MODIFY `sorozat_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=102;

--
-- AUTO_INCREMENT a táblához `sorozat_velemenyek`
--
ALTER TABLE `sorozat_velemenyek`
  MODIFY `velemeny_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT a táblához `user`
--
ALTER TABLE `user`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- Megkötések a kiírt táblákhoz
--

--
-- Megkötések a táblához `film_velemenyek`
--
ALTER TABLE `film_velemenyek`
  ADD CONSTRAINT `film_velemenyek_ibfk_1` FOREIGN KEY (`felhasznalo_id`) REFERENCES `user` (`Id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `film_velemenyek_ibfk_2` FOREIGN KEY (`film_id`) REFERENCES `filmek` (`film_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Megkötések a táblához `sorozat_velemenyek`
--
ALTER TABLE `sorozat_velemenyek`
  ADD CONSTRAINT `sorozat_velemenyek_ibfk_1` FOREIGN KEY (`felhasznalo_id`) REFERENCES `user` (`Id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `sorozat_velemenyek_ibfk_2` FOREIGN KEY (`sorozat_id`) REFERENCES `sorozatok` (`sorozat_id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
