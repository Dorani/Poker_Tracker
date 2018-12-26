-- Initialization of DB schematics
DROP DATABASE IF EXISTS playerStatsDB;
CREATE DATABASE playerStatsDB;
USE playerStatsDB;



-- Initial Table Creation with properties
CREATE TABLE poker_stats (
  id INT NOT NULL AUTO_INCREMENT,
  player_name VARCHAR(100) NOT NULL,
  player_type VARCHAR(100) NOT NULL,
  player_aggression DECIMAL(10,2),
  player_winRate DECIMAL(10,2),
  player_bb_per100 DECIMAL(10,2),
  games_played INT(11),
  PRIMARY KEY(id)
);


-- Initial Data Injection
INSERT INTO poker_stats
(player_name, player_type, player_aggression, player_winRate, player_bb_per100, games_played)
VALUES("waveGOD1", "passive aggressive", 0.40, 0.74, 9.2, 1200);


-- View table STATS
SELECT * from poker_stats;
