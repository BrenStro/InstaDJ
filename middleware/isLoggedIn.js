/**
 * Verify if the request is coming from a logged-in user.
 *
 * @param request - HTTP Request received.
 * @param response - HTTP Response to eventually send
 * @param {Function} next - To be called once this Middleware function is finished executing.
 */
module.exports = function(request, response, next) {
	// if user is authenticated in the session, carry on
	if (request.isAuthenticated()) {
		return next();
	}
	// if they aren't redirect them to the home page
	response.redirect('/login');
}
