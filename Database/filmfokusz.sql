-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2025. Feb 11. 08:54
-- Kiszolgáló verziója: 10.4.28-MariaDB
-- PHP verzió: 8.2.4

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
(1, 'aerererer', 'rerwer', '2025-02-11', 'erer', 'ererer', 'ererer', 5, 'werwrwrw');

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

--
-- A tábla adatainak kiíratása `film_velemenyek`
--

INSERT INTO `film_velemenyek` (`velemeny_id`, `felhasznalo_id`, `film_id`, `velemeny_szoveg`, `ertekeles`, `hozzaszolas_datum`) VALUES
(1, 9, 1, 'dtzdfzdr', 1, '0000-00-00 00:00:00');

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
(1, 'hjh', 'hjhj', '2025-02-04', 'hjh', 'jhjh', 'jhjhj', 1, 'rtrtrtr', 1);

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

--
-- A tábla adatainak kiíratása `sorozat_velemenyek`
--

INSERT INTO `sorozat_velemenyek` (`velemeny_id`, `felhasznalo_id`, `sorozat_id`, `velemeny_szoveg`, `ertekeles`, `hozzaszolas_datum`) VALUES
(1, 9, 1, 'tsetsretartaert', 4, '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `user`
--

CREATE TABLE `user` (
  `Id` int(11) NOT NULL,
  `LoginNev` varchar(16) NOT NULL,
  `HASH` varchar(64) NOT NULL,
  `SALT` varchar(64) NOT NULL,
  `Name` varchar(64) NOT NULL,
  `PermissionId` int(11) NOT NULL,
  `Active` tinyint(1) NOT NULL,
  `Email` varchar(64) NOT NULL,
  `ProfilePicturePath` varchar(64) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- A tábla adatainak kiíratása `user`
--

INSERT INTO `user` (`Id`, `LoginNev`, `HASH`, `SALT`, `Name`, `PermissionId`, `Active`, `Email`, `ProfilePicturePath`) VALUES
(9, 'kerenyir', 'd5fe0e517520122f1ab363b6b7ee9ae616e7ad393693ef00d81a7f287a79931a', 'Gm63C4jiWnYvfZfiKUu2cu8AHPNDj8NoHhtQn88yiJhyOunBNSd7tRoWo5wwqg9X', 'Kerényi Róbert', 2, 1, 'kerenyir@kkszki.hu', 'franciabulldog.jpg');

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
  MODIFY `film_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT a táblához `film_velemenyek`
--
ALTER TABLE `film_velemenyek`
  MODIFY `velemeny_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT a táblához `sorozatok`
--
ALTER TABLE `sorozatok`
  MODIFY `sorozat_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT a táblához `sorozat_velemenyek`
--
ALTER TABLE `sorozat_velemenyek`
  MODIFY `velemeny_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT a táblához `user`
--
ALTER TABLE `user`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

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
