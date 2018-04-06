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
	 * Creates a new Playlist object with the specified ID.
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
		let thisPlaylist = this;
		return new Promise(function(resolve, reject) {
			DB.setData(
					"INSERT INTO Playlist (creatorId, name, public) " +
					"VALUES (?, ?, ?)",
					[thisPlaylist.creatorId, thisPlaylist.name, (thisPlaylist.public ? 1 : 0)]
			).then(function(resultSet) {
				resolve(resultSet.rowsAffected);
			}).catch(function(error) {
				console.error(error);
				reject("An error occurred trying to insert the new Playlist. Please try again.");
			});
		});
	}

	/**
	 * Reads a Playlist entry from the database based on its ID number.
	 * @return {Promise} Whether or not the read was successful.
	 */
	read() {
		let thisPlaylist = this;
		return new Promise(function(resolve, reject) {
			DB.getData(
					"SELECT * FROM Playlist WHERE id = ?",
					[thisPlaylist.id]
			).then(function(resultSet) {
				// Check to make sure data was fetched
				if (resultSet.rows.length) {
					thisPlaylist.creatorId = resultSet.rows[0].creatorId;
					thisPlaylist.name = resultSet.rows[0].name;
					thisPlaylist.public = resultSet.rows[0].public ? true : false;
					resolve();
				} else {
					reject(`No Playlist was found with the given ID of ${thisPlaylist.id}`);
				}
			}).catch(function(error) {
				console.error(error);
				reject("An error occurred trying to access the Playlists database. Please try again.");
			});
		});
	}

	/**
	 * Updates an existing Playlist entry in the database based on its ID number.
	 * @return {Promise} Whether or not the update was successful. A successful
	 *   update resolves with the number of rows affected.
	 */
	update() {
		let thisPlaylist = this;
		return new Promise(function(resolve, reject) {
			DB.setData(
					"UPDATE Playlist " +
					"SET creatorId = ?, name = ?, public = ? " +
					"WHERE id = ?",
					[thisPlaylist.creatorId, thisPlaylist.name, (thisPlaylist.public ? 1 : 0)]
			).then(function(resultSet) {
				resolve(resultSet.rowsAffected);
			}).catch(function(error) {
				console.error(error);
				reject("An error occurred trying to update the requested playlist. Please try again");
			});
		});
	}

	/**
	 * Deletes a Playlist entry from the database based on its ID number.
	 * @return {Promise} Whether or not the deletion was successful. A
	 *   successful deletion resolves with the number of rows affected.
	 */
	delete() {
		let thisPlaylist = this;
		return new Promise(function(resolve, reject) {
			DB.setData(
					"DELETE FROM Playlist WHERE id = ?",
					[thisPlaylist.id]
			).then(function(resultSet) {
				resolve(resultSet.rowsAffected);
			}).catch(function(error) {
				console.error(error);
				reject("An error occurred trying to delete the requested playlist. Please try again.");
			});
		});
	}

	/**
	 * Sets a user's rating for this playlist.
	 * @param {Number} userId — ID number of the user who is rating this playlist.
	 * @param {Number} rating — The rating value given by the user (either +1 or -1).
	 * @return {Promise} Whether or not the rating was set successfully.
	 */
	setRating(userId, rating) {
		let thisPlaylist = this;
		return new Promise(function(resolve, reject) {
			DB.setData(
					"UPDATE PlaylistRating SET rating = ? WHERE userId = ? AND playlistId = ?",
					[rating, userId, thisPlaylist.id]
			).then(function(resultSet) {
				// Check to see whether or not any data was updated
				if (resultSet.rowsAffected < 1) {
					DB.setData(
							"INSERT INTO PlaylistRating (userId, playlistId, rating) " +
							"VALUES (?, ?, ?)",
							[userId, thisPlaylist.id, rating]
					).then(function(resultSet) {
						resolve(resultSet.rowsAffected)
					}).catch(function(error) {
						reject("Unable to insert a new rating. Please try again.");
					});
				} else {
					resolve(resultSet.rowsAffected);
				}
			}).catch(function(error) {
				console.error(error);
				reject("Unable to update the existing rating. Please try again.");
			});
		});
	}

	/**
	 * Gets the average rating for this playlist.
	 * @return {Number} Average rating between -1 and 1.
	 */
	getRating() {
		return DB.getData(
				"SELECT rating FROM PlaylistRating WHERE playlistId = ?",
				[this.id]
		).then(function(resultSet) {
			if (!resultSet.rows.length) {
				return 0;
			}
			let averageRating = 0;
			for (let row of resultSet.rows) {
				averageRating += parseInt(row.rating);
			}
			return (averageRating / resultSet.rows.length);
		}).catch(function(error) {
			console.error(error);
			return 0;
		});
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
			let arrayString = [];
			for (let id of ids) {
				arrayString += `${id}, `;
			}
			arrayString = arrayString.substring(0, arrayString.length-2);
			DB.getData(
					"SELECT id FROM Playlist WHERE id IN (?)",
					[arrayString]
			).then(function(resultSet) {
				let playlists = [];
				for (let row of resultSet.rows) {
					let playlist = new Playlist(row.id)
					playlist.read().then(function(resultSet) {
						if (resultSet.rows.length) {
							playlists.push(playlist)
						} else {
							reject("Erroneous playlist id specified.");
						}
					}).catch(function(error) {
						console.error(error);
						reject(`Error reading playlist with the specified ID ${playlist.id}`);
					});
				}
				resolve(playlists);
			}).catch(function(error) {
				console.error(error);
				reject("Unable to fetch the playlists requested. Please try again");
			});
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
			DB.getData(
					"SELECT id FROM Playlist WHERE creatorId = ?",
					[creatorId]
			).then(function(resultSet) {
				let playlists = [];
				for (let row of resultSet.rows) {
					let playlist = new Playlist(row.id)
					playlist.read().then(function(resultSet) {
						if (resultSet.rows.length) {
							playlists.push(playlist)
						} else {
							reject("Erroneous playlist id specified.");
						}
					}).catch(function(error) {
						console.error(error);
						reject(`Error reading playlist with the specified ID ${playlist.id}`);
					});
				}
				resolve(playlists);
			}).catch(function(error) {
				console.error(error);
				reject("Unable to fetch the playlists requested. Please try again");
			});
		});
	}
}

module.exports = Playlist;
