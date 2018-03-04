/**
 * Reflect the Playlists table in the Database.
 *
 * InstaDJ
 * ISTE 432 01
 * Ryan Bower, Thomas Kurien, Brendon Strowe, Rana Vemireddy
 * @author Brendon Strowe
 */

const DB = require('./DB');

class Playlist {

	/**
	 * Creates a new Playlist object with the specidied ID.
	 * @param {Number} id — ID number of the Playlist from the Playlist table.
	 */
	constructor(id=-1) {
		this.id = id;
		this.creatorId = 0;
		this.name = "";
		this.public = false;
	}

	/**
	 * Adds a new Playlist entry to the database
	 * @return {Promise} Whether or not the the addition was successful. A
	 *   successful creation resolves with the number of rows affected.
	 */
	create() {
		return new Promise(function(resolve, reject) {

		});
	}

	/**
	 * Reads a Playlist entry from the database based on its ID number.
	 * @return {Promise} Whether or not the read was successful.
	 */
	read() {
		return new Promise(function(resolve, reject) {

		});
	}

	/**
	 * Updates an existing Playlist entry in the database based on its ID number.
	 * @return {Promise} Whether or not the update was successful. A successful
	 *   update resolves with the number of rows affected.
	 */
	update() {
		return new Promise(function(resolve, reject) {

		});
	}

	/**
	 * Deletes a Playlist entry from the database based on its ID number.
	 * @return {Promise} Whether or not the deletion was successful. A
	 *   successful deletion resolves with the number of rows affected.
	 */
	delete() {
		return new Promise(function(resolve, reject) {

		});
	}

	/**
	 * Sets a user's rating for this playlist.
	 * @param {Number} userId — ID number of the user who is rating this playlist.
	 * @param {Number} rating — The rating value given by the user (either +1 or -1).
	 * @return {Promise} Whether or not the rating was set successfully.
	 */
	setRating(userId, rating) {
		return new Promise(function(resolve, reject) {

		});
	}

	/**
	 * Gets the average rating for this playlist.
	 * @return {Number} Average rating between -1 and 1.
	 */
	getRating() {

	}

	/**
	 * Gets multiple Playlists as specified by an array of Playlist ID numbers.
	 * @param  {Number[]} ids — Array of Playlist ID numbers to be retrieved
	 *   from the database
	 * @return {Promise} Whether or not the fetch was succeessful. A successful
	 *   fetch will resolve with an array of Playlist objects.
	 */
	static getMultiple(ids) {
		return new Promise(function(resolve, reject) {

		});
	}

	/**
	 * Gets multiple Playlists as specified by the creatorId of the playlist.
	 * @param  {Number} creator — ID of creator by which to get playlists
	 * @return {Promise} Whether or not the fetch was succeessful. A successful
	 *   fetch will resolve with an array of Playlist objects.
	 */
	static getByCreatorId(creatorId) {
		return new Promise(function(resolve, reject) {

		});
	}
}

module.exports = Playlist;
