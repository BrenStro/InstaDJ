-- InstaDJ
-- ISTE 432 01
-- Ryan Bower, Brendon Strowe, Rana Vemireddy
-- Script Author: Brendon Strowe

INSERT INTO Users (id, username, password, email)
VALUES	(1, 'bes1830', '$2a$10$nCrh3vBlsb8lgCvm.68cKOLB1X/F.dMw95Zi2MPBIYBwRGLb8ePAO', 'bes1830@rit.edu'),
		(2, 'rxv4834', '$2a$10$ejAGc77s6XyOU2qJGQITwOsfuAmu72Da8qjE5wOR/icn2WAFFkRwu', 'rxv4834@rit.edu');

INSERT INTO Playlist (id, creatorId, name, public)
VALUES	(1, 1, 'Jamz', 1),
		(2, 2, 'Playlist of user 2', 0);

INSERT INTO PlaylistTrack (playlistId, trackId)
VALUES	(1, '1b60a734-79a7-4f7c-baa3-4ec637fa0729'),
		(1, '6e6053d6-6f4b-49b1-8a34-04875106345f'),
		(1, '0191dcb7-6d32-48ad-bd9f-88372832b458'),
		(1, '97c05d07-00d6-4d55-bbb8-b14321d2e4d4');
