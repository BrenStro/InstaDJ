/**
 * Controller for the /user endpoint.
 *
 * InstaDJ
 * ISTE 432 01
 * Ryan Bower, Thomas Kurien, Brendon Strowe, Rana Vemireddy
 * @author Brendon Strowe
 */

const express		= require('express');
const router 		= express.Router();
const isLoggedIn	= require('../middleware/isLoggedIn');
const validation	= require('../helpers/validation');
const User			= require('../models/User');

/**
 * Handle all requests to the /user route.
 * All requests to this route must go through the isLoggedIn middleware, first.

router.all('/*', isLoggedIn, function(request, response) {
	next('route');
});
*/

/**
 * Handle GET request to /user.

router.get('/', function(request, response) {

});
 */

/**
 * Handle GET request to /user/forgotUsername.
 * Renders the ForgotUsername page.

router.get('/forgotUsername', function(request, response) {

});
*/

/**
 * Handle POST request to /user/forgotUsername.
 * Tries to look up the user from the provided email. Data is expected in JSON
 *   format.
*/
router.post('/forgotUsername', function(request, response) {
	// Validate JSON

	// Get email out of JSON
	let email = request.body.email;
	// Sanitize email input

	// Get requested user
	let requestedUser = new User(email)
	requestedUser.read().then(function() {
		// Send email with username

	});
});

/**
 * Handle GET request to /user/forgotPassword.
 * Renders the ForgotPassword page.

router.get('/forgotPassword', function(request, response) {

});
 */

/**
 * Handle POST request to /user/forgotPassword.
 * Tries to look up the user from the provided username. Data is expected in
 *   JSON format.
 */
router.post('/forgotPassword', function(request, response) {
	// Validate JSON

	// Get username out of JSON
	let username = request.body.username;
	// Sanitize username input

	// Get requested user
	let requestedUser = new User(username)
	requestedUser.read().then(function() {
		// Send password reset email

	});
});

/**
 * Handle GET request to /user/:id.
 * Respond with either the userpage with the requested user's information, or
 * 	the noUserFound page.
 */
router.get('/:id', function(request, response) {
	// Validate input ID as number
	console.log(request.params.id);
	// Get requested user
	let requestedUser = new User(request.params.id)
	requestedUser.read()
	.then(function() {
		return requestedUser.readCreatedPlaylists();
	})
	.then(function() {
		return requestedUser.readLikedPlaylists();
	})
	.then(function() {
		// Render the Userpage.
		response.send({
			success : true,
			user : requestedUser
		});
	}).catch(function(error) {
		// Render the noUserFound page.
		console.error({
			success : false,
			message : error
		});
	});
});

module.exports = router;
