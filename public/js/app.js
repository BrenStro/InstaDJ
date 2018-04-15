angular.module('instaDJ', ['ui.router']).config(function($stateProvider, $urlRouterProvider) {

	$urlRouterProvider.otherwise('/');

	$stateProvider

		//landing page
		.state('home', {
			url: '/',
			templateUrl: 'views/home.html',
			controller: 'LoginCtrl'
		})

		//login page
		.state('login', {
			url: '/login',
			templateUrl: 'views/login.html',
			controller: 'LoginCtrl'
		})

		//register page
		.state('register', {
			url: '/register',
			templateUrl: 'views/register.html',
			controller: 'RegisterCtrl'
		})

		//user page
		.state('user', {
			url: '/user',
			templateUrl: 'views/user.html',
			controller: 'UserCtrl'
		})

		//playlist page
		.state('playlist', {
			url: '/playlist',
			templateUrl: 'views/playlist.html',
			controller: 'PlaylistCtrl'
		});
});
