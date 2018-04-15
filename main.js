#!/usr/bin/env node

/**
 * Runner class for starting the application.
 *
 * InstaDJ
 * ISTE 432 01
 * Ryan Bower, Thomas Kurien, Brendon Strowe, Rana Vemireddy
 * @author Brendon Strowe
 */

require('dotenv').config();

const express				= require('express');
const bodyParser			= require('body-parser');
const cookieParser			= require('cookie-parser');
const passport				= require('passport');
const session				= require('express-session');
const flashMessage			= require('connect-flash');

const loginController		= require("./controllers/login");
const indexController		= require("./controllers/index");
const playlistController	= require("./controllers/playlist");
const userController		= require("./controllers/user");
const registerController	= require("./controllers/register");


let expressApp = express();

// Configure app to use bodyParser()
//   as this will let us get the data from a POST
expressApp.use(bodyParser.json());
expressApp.use(bodyParser.json({type : "application/vnd.api+json"})); // parse application/vnd.api+json as json
expressApp.use(bodyParser.urlencoded({extended : true}));
expressApp.use(cookieParser());

// Configure login sessions and Passport.
expressApp.use(session({
	secret : process.env.EXPRESS_SECRET,
	resave : true,
	saveUninitialized : true
}));
expressApp.use(passport.initialize());
expressApp.use(passport.session()); // Persistant sessions for logged-in users.
loginController(passport);

// Enable flash messages
expressApp.use(flashMessage());

// Endpoint setup
expressApp.use("/", indexController);
expressApp.use("/playlist", playlistController);
expressApp.use("/user", userController);
expressApp.use("/register", registerController);

// View engine setup
expressApp.set("views", "./views");
//expressApp.set("view engine", "pug");

// Makes the generated html easier to read
expressApp.locals.pretty = true;

// Make resources available to views (i.e. css, client-side js, images, etc.)
expressApp.use(express.static(__dirname + "/resource"));

// Catch 404 and forward to error handler
expressApp.use(function(request, response, next) {
	let error = new Error("Not Found");
	error.status = 404;
	next(error);
});

// Error handler
expressApp.use(function(error, request, response, next) {
	// Set locals, only providing error in development
	response.locals.message = error.message;
	response.locals.error = error;

	// Render the error page
	response.status(error.status || 500);
	//response.render("error");
});

// Begin the app
expressApp.listen(process.env.APP_PORT || 3000, function() {
	console.log("Starting InstaDJ app on port " + (process.env.APP_PORT || 3000));
});
