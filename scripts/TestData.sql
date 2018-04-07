-- InstaDJ
-- ISTE 432 01
-- Ryan Bower, Thomas Kurien, Brendon Strowe, Rana Vemireddy
-- Script Author: Brendon Strowe

INSERT INTO Users (id, username, password, email)
VALUES	(1, 'testUser1', 'h@$H3d P@$$w0rD', 'testUser1@test.com'),
		(2, 'testUser2', 'h@$H3d P@$$w0rD', 'testUser2@test.com');

INSERT INTO Playlist (id, creatorId, name, public)
VALUES	(1, 1, 'Playlist of User 1', 0),
		(2, 2, 'Playlist of user 2', 1);

INSERT INTO PlaylistTrack (playlistId, trackId)
VALUES	(1, 1),
		(1, 2),
		(2, 2),
		(2, 3);
