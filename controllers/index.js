/**
 * Controller for the root endpoint.
 *
 * InstaDJ
 * ISTE 432 01
 * Ryan Bower, Thomas Kurien, Brendon Strowe, Rana Vemireddy
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

});

/**
 * Handle GET request to /login.
 * Render the login page. Include handling of flash-message that may have been
 *   passed from Passport.
 */
router.get('/login', function(request, response) {
	response.render('login', {loginErrorMsg : request.flash('loginErrorMsg'), signupErrorMsg : request.flash('signupErrorMsg')});
});

/**
 * Handle POST request to /login.
 * Have passport handle the credential validation.
 */
router.post('/login', passport.authenticate('local-login',
	{
		successRedirect : '/user/',
		failureRedirect : '/login',
		failureFlash : true //Allow Flash messages
	})
);


/**
 * Handle GET request to /logout.
 * Logout the user and redirect them to the Home (Pages) page.
 */
router.get('/logout', function(request, response) {
	request.logout();
	response.redirect('/');
});

module.exports = router;
