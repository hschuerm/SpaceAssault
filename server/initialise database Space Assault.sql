-- phpMyAdmin SQL Dump
-- version 5.1.3
-- https://www.phpmyadmin.net/
--
-- Host: database
-- Erstellungszeit: 22. Mrz 2022 um 20:47
-- Server-Version: 10.7.3-MariaDB-1:10.7.3+maria~focal
-- PHP-Version: 8.0.16

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Datenbank: `SpaceAssault`
--

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `equipment`
--

CREATE TABLE `equipment` (
  `equipment_id` int(10) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `equipment_type` enum('weapon','shield','extra','') DEFAULT NULL,
  `weapon_damage_points` int(11) DEFAULT NULL,
  `weapon_attack_speed` int(11) DEFAULT NULL,
  `shield_points` int(11) DEFAULT NULL,
  `shield_regeneration_points` int(11) DEFAULT NULL,
  `shield_regeneration_interval` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `equipment_npc`
--

CREATE TABLE `equipment_npc` (
  `equipment_id` int(10) UNSIGNED NOT NULL,
  `npc_id` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `game_character`
--

CREATE TABLE `game_character` (
  `game_character_id` int(10) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `race_id` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `inventory`
--

CREATE TABLE `inventory` (
  `spaceship_id` int(10) UNSIGNED NOT NULL,
  `equipment_id` int(10) UNSIGNED NOT NULL,
  `amount` decimal(10,3) NOT NULL DEFAULT 1.000
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `npc`
--

CREATE TABLE `npc` (
  `npc_id` int(10) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `race_id` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `planet_orbit`
--

CREATE TABLE `planet_orbit` (
  `planet_orbit_id` int(10) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `position_x` int(11) NOT NULL,
  `position_y` int(11) NOT NULL,
  `solar_system_id` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Daten für Tabelle `planet_orbit`
--

INSERT INTO `planet_orbit` (`planet_orbit_id`, `name`, `position_x`, `position_y`, `solar_system_id`) VALUES
(1, 'Erde', 100, 100, 1),
(2, 'Saturn', 1000, 500, 1);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `quest`
--

CREATE TABLE `quest` (
  `quest_id` int(10) UNSIGNED NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `reward` int(11) NOT NULL DEFAULT 0,
  `station_administrator_id` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Daten für Tabelle `quest`
--

INSERT INTO `quest` (`quest_id`, `title`, `description`, `reward`, `station_administrator_id`) VALUES
(1, 'Rohstoff-Lieferung', 'Bringe 25T Iridium zur Station Terra 5 im Orbit des Planeten Erde.', 5, 3),
(2, 'Rohstoff-Lieferung', 'Bringe 35T Iridium zur Station RWQ im Orbit des Planeten Erde.', 7, 2);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `race`
--

CREATE TABLE `race` (
  `race_id` int(10) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `reputation`
--

CREATE TABLE `reputation` (
  `race_id` int(10) UNSIGNED NOT NULL,
  `user_id` int(10) UNSIGNED NOT NULL,
  `points` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `shop`
--

CREATE TABLE `shop` (
  `station_id` int(10) UNSIGNED NOT NULL,
  `equipment_id` int(10) UNSIGNED NOT NULL,
  `price` decimal(10,3) NOT NULL DEFAULT 0.000,
  `amount` decimal(10,3) NOT NULL DEFAULT 1.000
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `solar_system`
--

CREATE TABLE `solar_system` (
  `solar_system_id` int(10) UNSIGNED NOT NULL,
  `name` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Daten für Tabelle `solar_system`
--

INSERT INTO `solar_system` (`solar_system_id`, `name`) VALUES
(1, 'Sol');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `spaceship`
--

CREATE TABLE `spaceship` (
  `spaceship_id` int(10) UNSIGNED NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `hitpoints` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `weapon_slots` int(11) NOT NULL DEFAULT 0,
  `shield_slots` int(11) NOT NULL DEFAULT 0,
  `extra_slots` int(11) NOT NULL DEFAULT 0,
  `user_id` int(10) UNSIGNED DEFAULT NULL,
  `npc_id` int(10) UNSIGNED DEFAULT NULL,
  `station_id` int(10) UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Daten für Tabelle `spaceship`
--

INSERT INTO `spaceship` (`spaceship_id`, `name`, `hitpoints`, `weapon_slots`, `shield_slots`, `extra_slots`, `user_id`, `npc_id`, `station_id`) VALUES
(1, 'Space Raider von Hendrik', 0, 0, 0, 0, 1, NULL, 2),
(2, 'Space Raider von Louisa', 0, 0, 0, 0, 2, NULL, 1);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `station`
--

CREATE TABLE `station` (
  `station_id` int(10) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `position_x` int(11) NOT NULL,
  `position_y` int(11) NOT NULL,
  `planet_orbit_id` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Daten für Tabelle `station`
--

INSERT INTO `station` (`station_id`, `name`, `position_x`, `position_y`, `planet_orbit_id`) VALUES
(1, 'RWQ', 300, 50, 1),
(2, 'Zeus', 20, 100, 1),
(3, 'Tera 5', 290, 273, 1),
(4, 'ISS', 100, 300, 1),
(5, 'Gtte', 1150, 429, 2),
(6, 'Saturn 1', 990, 627, 2);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `station_administrator`
--

CREATE TABLE `station_administrator` (
  `station_administrator_id` int(10) UNSIGNED NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `station_id` int(10) UNSIGNED NOT NULL,
  `race_id` int(10) UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Daten für Tabelle `station_administrator`
--

INSERT INTO `station_administrator` (`station_administrator_id`, `name`, `station_id`, `race_id`) VALUES
(1, 'Ralf', 1, NULL),
(2, 'Vanessa', 2, NULL),
(3, 'Klaus', 3, NULL),
(4, 'Sara', 4, NULL);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `user`
--

CREATE TABLE `user` (
  `user_id` int(10) UNSIGNED NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `game_character_id` int(10) UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Daten für Tabelle `user`
--

INSERT INTO `user` (`user_id`, `username`, `password`, `email`, `game_character_id`) VALUES
(1, 'Hendrik', '12345', 'undefined', NULL),
(2, 'Louisa', '1', 'undefined', NULL);

--
-- Trigger `user`
--
DELIMITER $$
CREATE TRIGGER `create spaceship after register` AFTER INSERT ON `user` FOR EACH ROW INSERT INTO spaceship (name, station_id, user_id) VALUES 
(CONCAT('Space Raider von ', NEW.username), 1, NEW.user_id)
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `user_quest`
--

CREATE TABLE `user_quest` (
  `user_id` int(10) UNSIGNED NOT NULL,
  `quest_id` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Indizes der exportierten Tabellen
--

--
-- Indizes für die Tabelle `equipment`
--
ALTER TABLE `equipment`
  ADD PRIMARY KEY (`equipment_id`);

--
-- Indizes für die Tabelle `equipment_npc`
--
ALTER TABLE `equipment_npc`
  ADD PRIMARY KEY (`equipment_id`,`npc_id`),
  ADD KEY `FK_npc_equipment` (`npc_id`);

--
-- Indizes für die Tabelle `game_character`
--
ALTER TABLE `game_character`
  ADD PRIMARY KEY (`game_character_id`),
  ADD KEY `FK_race_game_character` (`race_id`);

--
-- Indizes für die Tabelle `inventory`
--
ALTER TABLE `inventory`
  ADD PRIMARY KEY (`spaceship_id`,`equipment_id`),
  ADD KEY `FK_equipment_inventory` (`equipment_id`);

--
-- Indizes für die Tabelle `npc`
--
ALTER TABLE `npc`
  ADD PRIMARY KEY (`npc_id`),
  ADD KEY `FK_race_npc` (`race_id`);

--
-- Indizes für die Tabelle `planet_orbit`
--
ALTER TABLE `planet_orbit`
  ADD PRIMARY KEY (`planet_orbit_id`),
  ADD KEY `FK_solar_system_planet_orbit` (`solar_system_id`);

--
-- Indizes für die Tabelle `quest`
--
ALTER TABLE `quest`
  ADD PRIMARY KEY (`quest_id`),
  ADD KEY `FK_station_administrator_quest` (`station_administrator_id`);

--
-- Indizes für die Tabelle `race`
--
ALTER TABLE `race`
  ADD PRIMARY KEY (`race_id`);

--
-- Indizes für die Tabelle `reputation`
--
ALTER TABLE `reputation`
  ADD PRIMARY KEY (`race_id`,`user_id`),
  ADD KEY `FK_user_reputation` (`user_id`);

--
-- Indizes für die Tabelle `shop`
--
ALTER TABLE `shop`
  ADD PRIMARY KEY (`station_id`,`equipment_id`),
  ADD KEY `FK_equipment_shop` (`equipment_id`);

--
-- Indizes für die Tabelle `solar_system`
--
ALTER TABLE `solar_system`
  ADD PRIMARY KEY (`solar_system_id`);

--
-- Indizes für die Tabelle `spaceship`
--
ALTER TABLE `spaceship`
  ADD PRIMARY KEY (`spaceship_id`),
  ADD KEY `FK_station_spaceship` (`station_id`),
  ADD KEY `FK_user_spaceship` (`user_id`),
  ADD KEY `FK_npc_spaceship` (`npc_id`);

--
-- Indizes für die Tabelle `station`
--
ALTER TABLE `station`
  ADD PRIMARY KEY (`station_id`),
  ADD KEY `FK_planet_orbit_station` (`planet_orbit_id`);

--
-- Indizes für die Tabelle `station_administrator`
--
ALTER TABLE `station_administrator`
  ADD PRIMARY KEY (`station_administrator_id`),
  ADD KEY `FK_station_station_administrator` (`station_id`),
  ADD KEY `FK_race_station_administrator` (`race_id`);

--
-- Indizes für die Tabelle `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD KEY `FK_game_character_user` (`game_character_id`);

--
-- Indizes für die Tabelle `user_quest`
--
ALTER TABLE `user_quest`
  ADD PRIMARY KEY (`user_id`,`quest_id`),
  ADD KEY `FK_quest_user` (`quest_id`);

--
-- AUTO_INCREMENT für exportierte Tabellen
--

--
-- AUTO_INCREMENT für Tabelle `equipment`
--
ALTER TABLE `equipment`
  MODIFY `equipment_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT für Tabelle `game_character`
--
ALTER TABLE `game_character`
  MODIFY `game_character_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT für Tabelle `npc`
--
ALTER TABLE `npc`
  MODIFY `npc_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT für Tabelle `planet_orbit`
--
ALTER TABLE `planet_orbit`
  MODIFY `planet_orbit_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT für Tabelle `quest`
--
ALTER TABLE `quest`
  MODIFY `quest_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT für Tabelle `race`
--
ALTER TABLE `race`
  MODIFY `race_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT für Tabelle `solar_system`
--
ALTER TABLE `solar_system`
  MODIFY `solar_system_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT für Tabelle `spaceship`
--
ALTER TABLE `spaceship`
  MODIFY `spaceship_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT für Tabelle `station`
--
ALTER TABLE `station`
  MODIFY `station_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT für Tabelle `station_administrator`
--
ALTER TABLE `station_administrator`
  MODIFY `station_administrator_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT für Tabelle `user`
--
ALTER TABLE `user`
  MODIFY `user_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Constraints der exportierten Tabellen
--

--
-- Constraints der Tabelle `equipment_npc`
--
ALTER TABLE `equipment_npc`
  ADD CONSTRAINT `FK_equipment_npc` FOREIGN KEY (`equipment_id`) REFERENCES `equipment` (`equipment_id`),
  ADD CONSTRAINT `FK_npc_equipment` FOREIGN KEY (`npc_id`) REFERENCES `npc` (`npc_id`);

--
-- Constraints der Tabelle `game_character`
--
ALTER TABLE `game_character`
  ADD CONSTRAINT `FK_race_game_character` FOREIGN KEY (`race_id`) REFERENCES `race` (`race_id`);

--
-- Constraints der Tabelle `inventory`
--
ALTER TABLE `inventory`
  ADD CONSTRAINT `FK_equipment_inventory` FOREIGN KEY (`equipment_id`) REFERENCES `equipment` (`equipment_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `FK_spaceship_inventory` FOREIGN KEY (`spaceship_id`) REFERENCES `spaceship` (`spaceship_id`) ON DELETE CASCADE;

--
-- Constraints der Tabelle `npc`
--
ALTER TABLE `npc`
  ADD CONSTRAINT `FK_race_npc` FOREIGN KEY (`race_id`) REFERENCES `race` (`race_id`);

--
-- Constraints der Tabelle `planet_orbit`
--
ALTER TABLE `planet_orbit`
  ADD CONSTRAINT `FK_solar_system_planet_orbit` FOREIGN KEY (`solar_system_id`) REFERENCES `solar_system` (`solar_system_id`);

--
-- Constraints der Tabelle `quest`
--
ALTER TABLE `quest`
  ADD CONSTRAINT `FK_station_administrator_quest` FOREIGN KEY (`station_administrator_id`) REFERENCES `station_administrator` (`station_administrator_id`) ON DELETE CASCADE;

--
-- Constraints der Tabelle `reputation`
--
ALTER TABLE `reputation`
  ADD CONSTRAINT `FK_race_reputation` FOREIGN KEY (`race_id`) REFERENCES `race` (`race_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `FK_user_reputation` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE;

--
-- Constraints der Tabelle `shop`
--
ALTER TABLE `shop`
  ADD CONSTRAINT `FK_equipment_shop` FOREIGN KEY (`equipment_id`) REFERENCES `equipment` (`equipment_id`),
  ADD CONSTRAINT `FK_station_shop` FOREIGN KEY (`station_id`) REFERENCES `station` (`station_id`);

--
-- Constraints der Tabelle `spaceship`
--
ALTER TABLE `spaceship`
  ADD CONSTRAINT `FK_npc_spaceship` FOREIGN KEY (`npc_id`) REFERENCES `npc` (`npc_id`),
  ADD CONSTRAINT `FK_station_spaceship` FOREIGN KEY (`station_id`) REFERENCES `station` (`station_id`),
  ADD CONSTRAINT `FK_user_spaceship` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE;

--
-- Constraints der Tabelle `station`
--
ALTER TABLE `station`
  ADD CONSTRAINT `FK_planet_orbit_station` FOREIGN KEY (`planet_orbit_id`) REFERENCES `planet_orbit` (`planet_orbit_id`);

--
-- Constraints der Tabelle `station_administrator`
--
ALTER TABLE `station_administrator`
  ADD CONSTRAINT `FK_race_station_administrator` FOREIGN KEY (`race_id`) REFERENCES `race` (`race_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `FK_station_station_administrator` FOREIGN KEY (`station_id`) REFERENCES `station` (`station_id`);

--
-- Constraints der Tabelle `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `FK_game_character_user` FOREIGN KEY (`game_character_id`) REFERENCES `game_character` (`game_character_id`);

--
-- Constraints der Tabelle `user_quest`
--
ALTER TABLE `user_quest`
  ADD CONSTRAINT `FK_quest_user` FOREIGN KEY (`quest_id`) REFERENCES `quest` (`quest_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `FK_user_quest` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
