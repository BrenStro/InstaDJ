/**
 * Controller for the /register endpoint.
 *
 * InstaDJ
 * ISTE 432 01
 * Ryan Bower, Thomas Kurien, Brendon Strowe, Rana Vemireddy
 * @author Brendon Strowe
 */

const express				= require('express');
const router 				= express.Router();
const passport				= require('passport');
const isLoggedIn			= require('../middleware/isLoggedIn');
const isNotLoggedIn			= require('../middleware/isNotLoggedIn');
const generateRandomCode	= require('../middleware/generateRandomCode');
const validation			= require('../helpers/validation');

/**
 * Handle GET request to /register.

router.get('/', function(request, response) {

});
 */
/**
 * Handle POST request to /register.
 * Registers the user
 */
router.post('/', generateRandomCode, passport.authenticate('local-registration',
	{
		successRedirect : 'index.html#!/user',
		failureRedirect : 'index.html#!/login',
		failureFlash : true //Allow Flash messages
	})
);

/**
 * Handle GET request to /register/sendConfirmation.
 * Renders the confirmation sent page if the has just completed the registration.
 *  The registration email is sent and the newly registered user is logged out.

router.get('/sendConfirmation', function(request, response) {

});
 */

/**
 * Handle POST request to /register/sendConfirmation.
 * Generates random verification code, registers the user in the database, and
 *   then sends them to the confirmation page.
 */
router.post('/sendConfirmation', function(request, response) {

});

/**
 * Handle GET request to /register/verifyConfirmation.
 * Renders the page to enter the cofirmation code.

router.get('/verifyConfirmation', function(request, response) {

});
 */

/**
 * Handle POST request to /register/verifyConfirmation.
 * Checks whether the entered confirmation code is valid.
 */
router.post('/verifyConfirmation', function(request, response) {

});

module.exports = router;
