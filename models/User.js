/**
 * Reflect the Users table in the Database.
 *
 * InstaDJ
 * ISTE 432 01
 * Ryan Bower, Thomas Kurien, Brendon Strowe, Rana Vemireddy
 * @author Brendon Strowe
 */

const DB = require('./DB');

class User {

	/**
	 * Creates a new User object with the specified crieteria.
	 * @param  {number} id — ID number of the User from the User table.
	 *   Default value is 0;
	 * @param  {string} username — Username of the User from the User table.
	 *   Default value is an empty string.
	 * @param  {string} email — Email address of the User from the User table.
	 *   Default value is an empty string.
	 */
	constructor(id=-1, username="", email="") {
		this.id = id;
		this.username = username;
		this.password = "";
		this.email = email;
		this.confirmationCode = "";
		this.createdPlaylists = [];
		this.likedPlaylists0 = [];
	}

	/**
	 * Adds a new User entry to the database
	 * @return {Promise} Whether or not the the addition was successful. A
	 *   successful creation resolves with the number of rows affected.
	 */
	create() {
		return new Promise(function(resolve, reject) {

		});
	}

	/**
	 * Reads a User entry from the database based on its ID number.
	 * @return {Promise} Whether or not the read was successful.
	 */
	read() {
		return new Promise(function(resolve, reject) {

		});
	}

	/**
	 * Updates an existing User entry in the database based on its ID number.
	 * @return {Promise} Whether or not the update was successful. A successful
	 *   update resolves with the number of rows affected.
	 */
	update() {
		return new Promise(function(resolve, reject) {

		});
	}

	/**
	 * Deletes a User entry from the database based on its ID number.
	 * @return {Promise} Whether or not the deletion was successful. A
	 *   successful deletion resolves with the number of rows affected.
	 */
	delete() {
		return new Promise(function(resolve, reject) {

		});
	}
}

module.exports = User;
