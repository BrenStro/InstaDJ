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

router.post('/login', passport.authenticate('local-login'),
function(request, response) {


}
);
*/

router.post('/login', function(request, response, next) {
	passport.authenticate('local-login', function(error, user, info) {
		if (error) {
			response.send({
				success : false,
				message : error
			});
		}
		if (!user) {
			response.send({
				success : false,
				message : "Invalid login credentials."
			});
		}
		request.logIn(user, function(error) {
			if (error) {
				response.send({
					success : false,
					message : error
				});
			}
			user.read()
			.then(function() {
				return user.readCreatedPlaylists();
			})
			.then(function() {
				return user.readLikedPlaylists();
			})
			.then(function() {
				// Send the User in the response.
				response.send({
					success : true,
					user : user
				});
			}).catch(function(error) {
				// Respond with an error message.
				response.send({
					success : false,
					message : error
				});
			});
		});
	})(request, response, next);
});


/**
 * Handle GET request to /logout.
 * Logout the user and redirect them to the Home (Pages) page.
 */
router.post('/logout', function(request, response) {
	request.logout();
	response.send({});
});


module.exports = router;
