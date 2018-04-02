-- InstaDJ
-- ISTE 432 01
-- Ryan Bower, Thomas Kurien, Brendon Strowe, Rana Vemireddy
-- Script Author: Brendon Strowe


-- Create a fresh Database Schema

DROP DATABASE IF EXISTS InstaDJ;
CREATE DATABASE InstaDJ;
USE InstaDJ;

CREATE TABLE User (
	id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
	username VARCHAR(64) NOT NULL UNIQUE,
	password VARCHAR(256) NOT NULL,
	email VARCHAR(128) NOT NULL UNIQUE
);

CREATE TABLE Playlist (
	id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
	creatorId INT UNSIGNED NOT NULL,
	name VARCHAR(64) NOT NULL,
	public BIT(0) NOT NULL DEFAULT '0',
	CONSTRAINT fk_Playlist_creatorId FOREIGN KEY (creatorId) REFERENCES User(id)
);

CREATE TABLE PlaylistRating (
	userId INT UNSIGNED NOT NULL,
	playlistId INT UNSIGNED NOT NULL,
	rating ENUM('-1', '0', '1'),
	CONSTRAINT pk_PlaylistRating PRIMARY KEY (userId, playlistId),
	CONSTRAINT fk_PlaylistRating_userId FOREIGN KEY (userId) REFERENCES User(id),
	CONSTRAINT fk_PlaylistRating_playlustId FOREIGN KEY (playlistId) REFERENCES Playlist(id)
);

CREATE TABLE PlaylistTrack (
	playlistId INT UNSIGNED NOT NULL,
	trackId INT UNSIGNED NOT NULL,
	CONSTRAINT pk_PlaylistTrack PRIMARY KEY (playlistId, trackid),
	CONSTRAINT fk_PlaylistTrack_playlistId FOREIGN KEY (playlistId) REFERENCES Playlist(id)
);
