/**
 * Controller for the root endpoint.
 *
 * InstaDJ
 * ISTE 432 01
 * Ryan Bower, Brendon Strowe, Rana Vemireddy
 * @author Brendon Strowe
 */

const express		= require('express');
const router 		= express.Router();
const passport		= require('passport');

/**
 * Handle GET request to /.
 * Render the homepage
 */
router.get('/', function(request, response) {
	response.redirect('index.html');
});

/**
 * Handle GET request to /login.
 * Render the login page. Include handling of flash-message that may have been
 *   passed from Passport.

router.get('/login', function(request, response) {
	response.render('login', {loginErrorMsg : request.flash('loginErrorMsg'), signupErrorMsg : request.flash('signupErrorMsg')});
});
 */

/**
 * Handle POST request to /login.
 * Have passport handle the credential validation.
 */
router.post('/login', passport.authenticate('local-login'),
function(request, response) {

	request.user.read()
	.then(function() {
		return request.user.readCreatedPlaylists();
	})
	.then(function() {
		return request.user.readLikedPlaylists();
	})
	.then(function() {
		// Send the User in the response.
		response.send({
			success : true,
			user : request.user
		});
	}).catch(function(error) {
		// Respond with an error message.
		console.error({
			success : false,
			message : error
		});
	});
}
);


/**
 * Handle GET request to /logout.
 * Logout the user and redirect them to the Home (Pages) page.
 */
router.post('/logout', function(request, response) {
	request.logout();
	response.send({});
});


module.exports = router;
