/**
 * Generate a random 5-character confirmation code.
 *
 * @param request - HTTP Request received.
 * @param response - HTTP Response to eventually send
 * @param  {Function} next - To be called once this Middleware function is finished executing.
 */
module.exports = function(request, response, next) {
	let chars = "123456789ABCDEFGHIJKLMNPQRSTUVWXTZ";
	let codeLength = 5;
	var generatedCode = "";
	for (let i = 0; i < codeLength; i++) {
		var randomNum = Math.floor(Math.random() * chars.length);
		generatedCode += chars.substring(randomNum, randomNum + 1);
	}
	request.generatedCode = generatedCode;
	next();
}
