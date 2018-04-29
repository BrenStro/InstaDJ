-- InstaDJ
-- ISTE 432 01
-- Ryan Bower, Thomas Kurien, Brendon Strowe, Rana Vemireddy
-- Script Author: Brendon Strowe


-- Create a fresh Database Schema

DROP DATABASE IF EXISTS InstaDJ;
CREATE DATABASE InstaDJ;

CREATE TABLE Users (
	id SERIAL PRIMARY KEY,
	username VARCHAR(64) NOT NULL UNIQUE,
	password VARCHAR(256) NOT NULL,
	email VARCHAR(128) NOT NULL UNIQUE
);

CREATE TABLE Playlist (
	id SERIAL PRIMARY KEY,
	creatorId INT NOT NULL,
	name VARCHAR(64) NOT NULL,
	public CHAR(1) NOT NULL DEFAULT '1',
	CONSTRAINT fk_Playlist_creatorId FOREIGN KEY (creatorId) REFERENCES Users(id) ON DELETE CASCADE
);

CREATE TYPE RATING AS ENUM('-1', '0', '1');
CREATE TABLE PlaylistRating (
	userId INT NOT NULL,
	playlistId INT NOT NULL,
	rating RATING,
	CONSTRAINT pk_PlaylistRating PRIMARY KEY (userId, playlistId),
	CONSTRAINT fk_PlaylistRating_userId FOREIGN KEY (userId) REFERENCES Users(id) ON DELETE CASCADE,
	CONSTRAINT fk_PlaylistRating_playlistId FOREIGN KEY (playlistId) REFERENCES Playlist(id) ON DELETE CASCADE
);

CREATE TABLE PlaylistTrack (
	playlistId INT NOT NULL,
	trackId CHAR(37) NOT NULL,
	CONSTRAINT pk_PlaylistTrack PRIMARY KEY (playlistId, trackid),
	CONSTRAINT fk_PlaylistTrack_playlistId FOREIGN KEY (playlistId) REFERENCES Playlist(id) ON DELETE CASCADE
);
