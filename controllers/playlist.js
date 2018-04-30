/**
 * Controller for the /playlist endpoint.
 *
 * InstaDJ
 * ISTE 432 01
 * Ryan Bower, Brendon Strowe, Rana Vemireddy
 * @author Brendon Strowe
 */

const express		= require('express');
const router 		= express.Router();
const validation	= require('../helpers/validation');
const Playlist		= require('../models/Playlist');

/**
 * Handle POST request to /playlist/create.
 * A new playlist is created based on the input from the user. Data is expected
 *   in JSON format.
 */
router.post('/create', function(request, response) {
	// Validate input
	let newPlaylistName = request.body.name;
	if (!validation.alphabeticNumericPunct(newPlaylistName)) {
		response.send({
			success : false,
			message : "Invalid playlist name"
		});
	}
	let newPlaylistPublic = request.body.public;
	newPlaylistPublic = (newPlaylistPublic == true || newPlaylistPublic == 'true');

	// Create new Playlist
	let newPlaylist = new Playlist();
	newPlaylist.name = newPlaylistName;
	newPlaylist.public = newPlaylistPublic;
	newPlaylist.creatorId = request.user.id;

	// Store newly created playlist
	newPlaylist.create().then(function(rowsAffected) {
		response.send({
			success : true,
			data : newPlaylist
		});
	}).catch(function(error) {
		console.error(error);
		response.send({
			success : false,
			message : "There was an error creating the new Playlist."
		});
	});
});

/**
 * Handle GET request to /playlist/:id.
 * Respond with the requested playlist only if it is publicly listed, or it is
 *   requested by the playlist owber. If no playlist is found, render a
 *   playlistNotFound message.
 */
router.get('/:id', function(request, response) {
	// Validate input ID as number
	let playlistId = request.params.id;
	playlistId = parseInt(playlistId);
	if (isNaN(playlistId)) {
		response.send({
			success : false,
			message : "The requested Playlist does not exist."
		});
	}

	// Get currently logged-in user
	let userId = request.user.id;

	// Get requested playlist
	let requestedPlaylist = new Playlist(playlistId);

	requestedPlaylist.read()
	.then(function() {
		return requestedPlaylist.readTracks();
	})
	.then(function() {
		return requestedPlaylist.readRating();
	})
	.then(function() {
		// Check if the requested playlist is owned by the requesting user
		//   or if it is publicly listed
		if (requestedPlaylist.creatorId == userId || requestedPlaylist.public) {
			response.send({
				success : true,
				data : requestedPlaylist
			});
		} else {
			response.send({
				success : false,
				message : "The requested Playlist is not public."
			});
		}
	}).catch(function(error) {
		console.error(error);
		response.send({
			success : false,
			message : "There was an error retrieving the requested playlist."
		});
	});
});

/**
 * Handle POST request to /playlist/:id/rate.
 * A +1 or -1 rating is provided by the currently logged in user. Only public
 *   playlists can be rated. Data is expected in JSON format.
 */
router.post('/:id/rate', function(request, response) {
	// Get currently logged-in user
	let userId = request.user.id;

	// Validate input
	let newRating = request.body.rating;
	if (isNaN(newRating)) {
		response.send({
			success : false,
			message : "Invalid rating."
		});
	} else if (newRating != -1 && newRating != 0 && newRating != 1) {
		response.send({
			success : false,
			message : "Invalid rating."
		});
	}

	// Get the Playlist requested
	let playlistId = request.params.id;
	playlistId = parseInt(playlistId);
	if (isNaN(playlistId)) {
		response.send({
			success : false,
			message : "The Playlist does not exist."
		});
	}
	let requestedPlaylist = new Playlist(playlistId);

	// Read in the requested playlist
	requestedPlaylist.read().then(function() {
		// Check if the requested playlist is public and is not owned by the requesting user
		if (requestedPlaylist.public && requestedPlaylist.creatorId != userId) {
			// if so, rate the playlist
			requestedPlaylist.setRating(userId, newRating);
			response.send({
				success : true,
				message : `Successfully rated the playlist ${newRating}`
			});
		} else if (!requestedPlaylist.public) {
			// send an error message
			response.send({
				success : false,
				message : "Cannot rate private playlists."
			});
		} else {
			// send an error message
			response.send({
				success : false,
				message : "Creators cannot rate their own playlists."
			});
		}
	}).catch(function(error) {
		console.error(error);
		response.send({
			success : false,
			message : "There was an error retrieving the requested playlist."
		});
	});
});

/**
 * Handle POST request to /playlist/:id/delete.
 * Only the playlist owner can delete a playlist
 */
router.post('/:id/delete', function(request, response) {
	// Validate input ID as number
	let playlistId = request.params.id;
	playlistId = parseInt(playlistId);
	if (isNaN(playlistId)) {
		response.send({
			success : false,
			message : "The requested Playlist does not exist."
		});
	}

	// Get currently logged-in user
	let userId = request.user.id;

	// Get requested playlist
	let requestedPlaylist = new Playlist(request.params.id)
	requestedPlaylist.read().then(function() {
		// Check if the requested playlist is owned by the requesting user
		if (requestedPlaylist.creatorId == userId) {
			// if so, delete the playlist
			requestedPlaylist.delete().then(function() {
				response.send({
					success : true,
					message : "Playlist deleted successfully."
				});
			}).catch(function(error) {
				console.error(error);
				response.send({
					success : false,
					message : "There was an error deleting the requested playlist."
				});
			});
		} else {
			// render an error message
			response.send({
				success : false,
				message : "Only creators can delete their own playlists."
			});
		}
	}).catch(function(error) {
		console.error(error);
		response.send({
			success : false,
			message : "There was an error retrieving the requested playlist."
		});
	});
});

/**
 * Handle POST request to /playlist/:id/addTracks.
 * An array of track IDs is expected. Playlists can only be edited if they are
 *   public or it is done by the playlist owber. Data is expected in JSON format.
 */
router.post('/:id/addTracks', function(request, response) {
	// Validate input ID as number
	let playlistId = request.params.id;
	playlistId = parseInt(playlistId);
	if (isNaN(playlistId)) {
		response.send({
			success : false,
			message : `The requested Playlist ${playlistId} does not exist.`
		});
	}

	// Validate data
	let newTracks = request.body.tracks;
	for (let trackId of newTracks) {
		if (trackId.length != 36) {
			response.send({
				success : false,
				message : `Invalid track provided at ${trackId}.`
			});
		}
	}

	// Get currently logged-in user
	let userId = 1;//request.user.id;

	// Get requested playlist
	let requestedPlaylist = new Playlist(playlistId);
	requestedPlaylist.read().then(function() {
		// Check if the requested playlist is owned by the requesting user
		//   or if it is publicly listed
		if (requestedPlaylist.creatorId == userId || requestedPlaylist.public) {
			// if so, add the songs
			requestedPlaylist.addTracks(newTracks).then(function(trackCount) {
				response.send({
					success : true,
					message : `Tracks added successfully`
				});
			}).catch(function(error) {
				response.send({
					success : false,
					message : error
				});
			});
		} else if (!requestedPlaylist.public) {
			// send an error message
			response.send({
				success : false,
				message : "Only owners can modify their own private playlists."
			});
		} else {
			// send an error message
			response.send({
				success : false,
				message : "Cannot modify the selected playlist."
			});
		}
	}).catch(function(error) {
		// send an error message
		console.log(error);
		response.send({
			success : false,
			message : "The requested playlist does not exist."
		});
	});
});

/**
 * Handle POST request to /playlist/:id/deleteTracks.
 * An array of track IDs is expected. Playlists can only be edited if they are
 *   public or it is done by the playlist owber. Data is expected in JSON format.
 */
router.post('/:id/deleteTracks', function(request, response) {

	// Validate input ID as number
	let playlistId = request.params.id;
	playlistId = parseInt(playlistId);
	if (isNaN(playlistId)) {
		response.send({
			success : false,
			message : "The requested Playlist does not exist."
		});
	}

	// Validate data
	let tracksToDelete = request.body.tracks;
	for (let trackId of tracksToDelete) {
		if (trackId.length != 36) {
			response.send({
				success : false,
				message : `Invalid track provided at ${trackId}.`
			});
		}
	}

	// Get currently logged-in user
	let userId = 1;//request.user.id;

	// Get requested playlist
	let requestedPlaylist = new Playlist(playlistId)
	requestedPlaylist.read().then(function() {
		// Check if the requested playlist is owned by the requesting user
		//   or if it is publicly listed
		if (requestedPlaylist.creatorId == userId || requestedPlaylist.public) {
			// if so, add the songs
			requestedPlaylist.deleteTracks(tracksToDelete).then(function(trackCount) {
				response.send({
					success : true,
					message : `Tracks deleted successfully`
				});
			}).catch(function(error) {
				response.send({
					success : false,
					message : error
				});
			});
		} else if (!requestedPlaylist.public) {
			// send an error message
			response.send({
				success : false,
				message : "Only owners can modify their own private playlists."
			});
		} else {
			// send an error message
			response.send({
				success : false,
				message : "Cannot modify the selected playlist."
			});
		}
	}).catch(function(error) {
		// send an error message
		response.send({
			success : false,
			message : "The requested playlist does not exist."
		});
	});
});

module.exports = router;
