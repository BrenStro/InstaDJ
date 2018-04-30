/**
 * Reflect the Users table in the Database.
 *
 * InstaDJ
 * ISTE 432 01
 * Ryan Bower Brendon Strowe, Rana Vemireddy
 * @author Brendon Strowe
 */

const DB = require('./DB');
const Playlist = require('./Playlist');

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
		this.likedPlaylists = [];
	}

	/**
	 * Adds a new User entry to the database
	 * @return {Promise} Whether or not the the addition was successful. A
	 *   successful creation resolves with the number of rows affected.
	 */
	create() {
		let thisUser = this;
		return new Promise(function(resolve, reject) {
			DB.setData(
					"INSERT INTO Users (username, password, email) " +
					"VALUES ($1, $2, $3) RETURNING id",
					[thisUser.username, thisUser.password, thisUser.email]
			).then(function(resultSet) {
				thisUser.id = resultSet.insertId;
				resolve(resultSet.rowCount);
			}).catch(function(error) {
				console.error(error);
				reject("An error occurred trying to insert the new User. Please try again.");
			});
		});
	}

	/**
	 * Reads a User entry from the database based on its ID number.
	 * @return {Promise} Whether or not the read was successful.
	 */
	read() {
		let thisUser = this;
		return new Promise(function(resolve, reject) {
			DB.getData(
					"SELECT * FROM Users WHERE id = $1",
					[thisUser.id]
			).then(function(resultSet) {
				// Check to make sure data was fetched
				if (resultSet.rows.length) {
					thisUser.username = resultSet.rows[0].username;
					thisUser.password = resultSet.rows[0].password;
					thisUser.email = resultSet.rows[0].email;
					//thisUser.confirmationCode = resultSet.rows[0].confirmationCode;
					resolve();
				} else {
					reject(`No User was found with the given id of ${thisUser.id}`);
				}
			}).catch(function(error) {
				console.error(error);
				reject("An error occurred trying to access the Users database. Please try again.");
			});
		});
	}

	/**
	 * Reads a User entry from the database based on its Username.
	 * @return {Promise} Whether or not the read was successful.
	 */
	readByUsername() {
		let thisUser = this;
		return new Promise(function(resolve, reject) {
			DB.getData(
					"SELECT * FROM Users WHERE username = $1",
					[thisUser.username]
			).then(function(resultSet) {
				// Check to make sure data was fetched
				if (resultSet.rows.length) {
					thisUser.id = resultSet.rows[0].id;
					thisUser.password = resultSet.rows[0].password;
					thisUser.email = resultSet.rows[0].email;
					//thisUser.confirmationCode = resultSet.rows[0].confirmationCode;
					resolve();
				} else {
					reject(`No User was found with the given username of ${thisUser.username}`);
				}
			}).catch(function(error) {
				console.error(error);
				reject("An error occurred trying to access the Users database. Please try again.");
			});
		});
	}

	/**
	 * Reads in all of the playlists created by this user and sets the
	 *   `createdPlaylists` property of this User object to an array of
	 *   Playlist objects as described by the database.
	 * @return {Promise} Whether or not the read was successful.
	 */
	readCreatedPlaylists() {
		let thisUser = this;
		return new Promise(function(resolve, reject) {
			DB.getData(
				"SELECT id FROM Playlist WHERE creatorId = $1",
				[thisUser.id]
			).then(function(resultSet) {
				if (resultSet.rows.length) {
					let playlists = [];
					for (let row of resultSet.rows) {
						let playlist = new Playlist(row.id);
						playlists.push(playlist);
						playlist.read()
						.then(function() {
							return playlist.readTracks();
						})
						.then(function() {
							return playlist.readRating();
						});
					}
					thisUser.createdPlaylists = playlists;
				} else {
					console.log("NO PLAYLISTS");
				}
				resolve();
			}).catch(function(error) {
				console.log(error);
				reject("An error occurred trying to read this uesr's created playlists from the database.");
			});
		});
	}

	/**
	 * Reads in all of the playlists liked by this user and sets the
	 *   `likedPlaylists` property of this User object to an array of
	 *   Playlist objects as described by the database.
	 * @return {Promise} Whether or not the read was successful.
	 */
	readLikedPlaylists() {
		let thisUser = this;
		return new Promise(function(resolve, reject) {
			DB.getData(
				"SELECT playlistId FROM PlaylistRating WHERE userId = $1 AND rating = '1'",
				[thisUser.id]
			).then(function(resultSet) {
				if (resultSet.rows.length) {
					let playlists = [];
					for (let row of resultSet.rows) {
						let playlist = new Playlist(row.id);
						playlist.read()
						.then(function() {
							return playlist.readTracks();
						})
						.then(function() {
							return playlist.readRating();
						})
						.then(function() {
							playlists.push(playlist);
						});
					}
					thisUser.likedPlaylists = playlists;
				} else {
					console.log("NO PLAYLISTS");
				}
				resolve();
			}).catch(function(error) {
				console.log(error);
				reject("An error occurred trying to read this uesr's liked playlists from the database.");
			});
		});
	}

	/**
	 * Updates an existing User entry in the database based on its ID number.
	 * @return {Promise} Whether or not the update was successful. A successful
	 *   update resolves with the number of rows affected.
	 */
	update() {
		let thisUser = this;
		return new Promise(function(resolve, reject) {
			DB.setData(
					"UPDATE Users " +
					"SET username = $1, password = $2, email = $3 " +
					"WHERE id = $4",
					[thisUser.username, thisUser.password, thisUser.email, thisUser.id]
			).then(function(resultSet) {
				resolve(resultSet.rowsAffected);
			}).catch(function(error) {
				console.error(error);
				reject("An error occurred trying to update the requested user. Please try again");
			});
		});
	}

	/**
	 * Deletes a User entry from the database based on its ID number.
	 * @return {Promise} Whether or not the deletion was successful. A
	 *   successful deletion resolves with the number of rows affected.
	 */
	delete() {
		let thisUser = this;
		return new Promise(function(resolve, reject) {
			DB.setData(
					"DELETE FROM Users WHERE id = $1",
					[thisUser.id]
			).then(function(resultSet) {
				resolve(resultSet.rowsAffected);
			}).catch(function(error) {
				console.error(error);
				reject("An error occurred trying to delete the requested user. Please try again.");
			});
		});
	}
}

module.exports = User;
