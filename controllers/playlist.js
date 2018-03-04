/**
 * Controller for the /playlist endpoint.
 *
 * InstaDJ
 * ISTE 432 01
 * Ryan Bower, Thomas Kurien, Brendon Strowe, Rana Vemireddy
 * @author Brendon Strowe
 */

const express		= require('express');
const router 		= express.Router();
const validation	= require('../helpers/validation');
const Playlist		= require('../controllers/Playlist');

/**
 * Handle GET request to /playlist.
 */
router.get('/', function(request, response) {

});

/**
 * Handle GET request to /playlist/create.
 * Renders the Create Playlist page.
 */
router.get('/create', function(request, response) {

});

/**
 * Handle POST request to /playlist/create.
 * A new playlist is created based on the input from the user. Data is expected
 *   in JSON format.
 */
router.post('/create', function(request, response) {
	// Validate JSON

	// Get info out of JSON

	// Sanitize input

	// Create new Playlist
	let newPlaylist = new Playlist();

	// Store newly created playlist
	newPlaylist.create().then(function() {


	}).catch(function(error) {

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

	// Get currently logged-in user
	let userId = request.user.id;

	// Get requested playlist
	let requestedPlaylist = new Playlist(request.params.id)
	requestedPlaylist.read().then(function() {
		// Check if the requested playlist is owned by the requesting user
		//   or if it is publicly listed
		if (requestedPlaylist.creatorId == userId || requestedPlaylist.public) {
			// render the playlist page
			response.send(requestedPlaylist);
		} else {
			// render a playlistNotPublic message

		}
	}).catch(function(error) {
		// render a playlistNotFound page

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
	// Validate JSON

	// Get info out of JSON

	// Sanitize input

	// Get the Playlist requested
	let requestedPlaylist = new Playlist(request.params.id);

	// Read in the requested playlist
	requestedPlaylist.read().then(function() {
		// Check if the requested playlist is owned by the requesting user
		if (requestedPlaylist.creatorId == userId) {
			// if so, delete the playlist
			requestedPlaylist.delete();
		} else {
			// render an error message

		}
	}).catch(function(error) {

	});
});

/**
 * Handle POST request to /playlist/:id/delete.
 * Only the playlist owner can delete a playlist
 */
router.post('/:id/delete', function(request, response) {
	// Validate input ID as number

	// Get currently logged-in user
	let userId = request.user.id;

	// Get requested playlist
	let requestedPlaylist = new Playlist(request.params.id)
	requestedPlaylist.read().then(function() {
		// Check if the requested playlist is owned by the requesting user
		if (requestedPlaylist.creatorId == userId) {
			// if so, delete the playlist
			requestedPlaylist.delete();
		} else {
			// render an error message

		}
	}).catch(function(error) {

	});
});

/**
 * Handle POST request to /playlist/:id/addTracks.
 * An array of track IDs is expected. Playlists can only be edited if they are
 *   public or it is done by the playlist owber. Data is expected in JSON format.
 */
router.post('/:id/addTracks', function(request, response) {
	// Validate input ID as number

	// Validate JSON

	// Get info out of JSON

	// Sanitize input

	// Get currently logged-in user
	let userId = request.user.id;

	// Get requested playlist
	let requestedPlaylist = new Playlist(request.params.id)
	requestedPlaylist.read().then(function() {
		// Check if the requested playlist is owned by the requesting user
		//   or if it is publicly listed
		if (requestedPlaylist.creatorId == userId || requestedPlaylist.public) {
			// if so, add the songs

		} else {
			// render an error message

		}
	}).catch(function(error) {

	});
});

/**
 * Handle POST request to /playlist/:id/deleteTracks.
 * An array of track IDs is expected. Playlists can only be edited if they are
 *   public or it is done by the playlist owber. Data is expected in JSON format.
 */
router.post('/:id/deleteTracks', function(request, response) {
	// Validate input ID as number

	// Validate JSON

	// Get info out of JSON

	// Sanitize input

	// Get currently logged-in user
	let userId = request.user.id;

	// Get requested playlist
	let requestedPlaylist = new Playlist(request.params.id)
	requestedPlaylist.read().then(function() {
		// Check if the requested playlist is owned by the requesting user
		//   or if it is publicly listed
		if (requestedPlaylist.creatorId == userId || requestedPlaylist.public) {
			// if so, add the songs

		} else {
			// render an error message

		}
	}).catch(function(error) {

	});
});

module.exports = router;
