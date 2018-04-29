/**
 * Application login using Passport authentication.
 * Set up Passport to authenticate persistent login sessions. Passport needs
 *   the ability to serialize and deserialize users in and out of a session.
 *
 * InstaDJ
 * ISTE 432 01
 * Ryan Bower, Thomas Kurien, Brendon Strowe, Rana Vemireddy
 * @author Brendon Strowe
 */

const LocalStrategy	= require('passport-local').Strategy;
const bcrypt		= require('bcrypt');
const User			= require('../models/User');

module.exports = function(passport) {
	/**
	 * Used to serialize the user for the start of a session.
	 * @param  {User} user User to be serialized.
	 * @param  {Function} done Callback function for completion of user serialization.
	 */
	passport.serializeUser(function(user, done) {
		done(null, user.id);
	});

	/**
	 * Used to deserialize the user at the end of their session.
	 * @param  {string} username Username of the User to be sdeerialized.
	 * @param  {Function} done Callback function for completion of user deserialization.
	 */
	passport.deserializeUser(function(id, done) {
		// Query database with the serialized Id
		let user = new User(id);
		user.read().then(function() {
			done(null, user);
		}).catch(function(error) {
			done(error);
		});
	});

	/**
	 * Local registration setup.
	 */
	passport.use('local-registration', new LocalStrategy (
		{
			usernameField : 'username',
			passwordField : 'password',
			passReqToCallback : true // Allows us to pass back the entire request to the callback/done function
		},
		function (request, username, password, done) {
			// Query database with username
			//  We want to check if the user trying to login already exists
			// Query database with the requested username
			let user = new User(null, username);
			user.readByUsername().then(function() {
				// If no error occurs when reading in a user, then one under
				//   that username exists. Return an error.
				done(null, false, request.flash('registrationErrorMsg', "A user with the username " + username + " already exists."));
			}).catch(function(error) {
				console.error(error);
				// If an error occurs, then the requsted user does not exist.
				//   Register the user.
				// Hash password
				bcrypt.hash(password, 10).then(function(hash) {
					user.password = hash;
					user.email = request.body.email;
					user.confirmationCode = request.confirmationCode;
					user.create().then(function(rowsAffected) {
						console.log(rowsAffected);
						done(null, user);
					}).catch(function(error) {
						console.error("ERROR creating new user: ", user);
						done(error);
					});
				}).catch(function(error){
					console.log("BCRYPT ERROR: " + error);
					done(error);
				});
			});
		}
	));


	// The local strategy requires a `verify` function which receives the
	// credentials ('username' and 'password') submitted by the user. The function
	// must verify that the password is correct and then invoke `done` with a
	// user object, which will be set at `request.user` in route handlers after
	// authentication.
	passport.use('local-login', new LocalStrategy (
		{
			usernameField : 'username',
			passwordField : 'password',
			passReqToCallback : true // Allows us to pass back the entire request to the callback/done function
		},
		function(request, username, password, done) {
			// Query database with username and password.
			//  We want to validate their login credentials.

			let user = new User(null, username);
			user.readByUsername().then(function() {
				// If no error occurs when trying to read in a user from the
				//   database, then continue checking their password.

				// If a user has a confirmation code, they must finish
				//   registering before they can use their account.
				//if (user.confirmationCode) {
				//	done(null, false, request.flash('loginErrorMsg', "You must finish registration before logging in. Please follow the instructions in your email."));
				//}

				// Check password
				bcrypt.compare(password, user.password).then(function(result) {
					if (result) {
						done(null, user);
					} else {
						done(null, false, request.flash('loginErrorMsg', "You have entered an erroneous username or password."));
					}
				}).catch(function(error){
					console.log("BCRYPT ERROR: " + error);
					done(error);
				})

			}).catch(function(error) {
				// If an error is encountered, send error message.
				done(null, false, request.flash('loginErrorMsg', "You have entered an erroneous username or password."));
			});
		}
	));
}
