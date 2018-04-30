/**
 * Reflect the Playlists table in the Database.
 *
 * InstaDJ
 * ISTE 432 01
 * Ryan Bower, Brendon Strowe, Rana Vemireddy
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
		this.tracks = [];
		this.rating = 0;
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
					"VALUES ($1, $2, $3) RETURNING id",
					[thisPlaylist.creatorId, thisPlaylist.name, (thisPlaylist.public ? '1' : '0')]
			).then(function(resultSet) {
				thisPlaylist.id = resultSet.insertId;
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
					"SELECT * FROM Playlist WHERE id = $1",
					[thisPlaylist.id]
			).then(function(resultSet) {
				// Check to make sure data was fetched
				if (resultSet.rows.length) {
					thisPlaylist.creatorId = resultSet.rows[0].creatorid;
					thisPlaylist.name = resultSet.rows[0].name;
					thisPlaylist.public = resultSet.rows[0].public == 1 ? true : false;
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
	 * Reads the tracks in a playlist. Sets the `tracks` property of this
	 *   Playlist to an array of trackIds as described by the database.
	 * @return {Promise} Whether or not the read was successful.
	 */
	readTracks() {
		let thisPlaylist = this;
		return new Promise(function(resolve, reject) {
			DB.getData(
				"SELECT trackId FROM PlaylistTrack WHERE playlistId = $1",
				[thisPlaylist.id]
			).then(function(resultSet) {
				if (resultSet.rows.length) {
					let tracks = [];
					for (let row of resultSet.rows) {
						tracks.push(row.trackid.trim())
					}
					thisPlaylist.tracks = tracks;
				} else {
					//console.log("NO TRACKS");
				}
				//console.log("TRACKS ", thisPlaylist);
				resolve();
			}).catch(function(error) {
				console.error(error);
				reject("An error occurred trying to read in the tracks for the requested Playlist.")
			});
		});
	}

	readRating() {
		let thisPlaylist = this;
		return new Promise(function(resolve, reject) {
			DB.getData(
					"SELECT rating FROM PlaylistRating WHERE playlistId = $1",
					[thisPlaylist.id]
			).then(function(resultSet) {
				if (resultSet.rows.length < 1) {
					thisPlaylist.rating = 0;
					resolve();
					return;
				}
				let averageRating = 0;
				for (let row of resultSet.rows) {
					averageRating += parseInt(row.rating);
				}
				thisPlaylist.rating = (averageRating / resultSet.rows.length);
				//console.log("RATING ", thisPlaylist);
				resolve();
			}).catch(function(error) {
				console.error(error);
				thisPlaylist.rating = 0;
				resolve();
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
					"SET creatorId = $1, name = $2, public = $3 " +
					"WHERE id = $4",
					[thisPlaylist.creatorId, thisPlaylist.name, (thisPlaylist.public ? 1 : 0), thisPlaylist.id]
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
					"DELETE FROM Playlist WHERE id = $1",
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
					"UPDATE PlaylistRating SET rating = $1 WHERE userId = $2 AND playlistId = $3",
					[rating, userId, thisPlaylist.id]
			).then(function(resultSet) {
				// Check to see whether or not any data was updated
				if (resultSet.rowsAffected < 1) {
					DB.setData(
							"INSERT INTO PlaylistRating (userId, playlistId, rating) " +
							"VALUES ($1, $2, $3)",
							[userId, thisPlaylist.id, rating]
					).then(function(resultSet) {
						resolve(resultSet.rowsAffected);
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
	 * Adds a set of specified tracks to this Playlist. Tracks are specified by
	 *   their MusicBrainz ID as stored in the LastFM API Database.
	 * @param {String[]} tracks Array of trackIds to be added.
	 */
	addTracks(tracks) {
		let thisPlaylist = this;
		return new Promise(function(resolve, reject) {
			let trackCount = 0;
			for (let trackId of tracks) {
				DB.setData(
						"INSERT INTO PlaylistTrack (playlistId, trackId) " +
						"VALUES ($1, $2)",
						[thisPlaylist.id, trackId]
				).then(function(resultSet) {
					trackCount++;
					//continue;
				}).catch(function(error) {
					console.error(error);
					//continue;
				});
			}
			resolve(trackCount);
		});
	}

	/**
	 * Deletes a set of specified tracks from this Playlist. Tracks are
	 *   specified by their MusicBrainz ID as stored in the LastFM API Database.
	 * @param {String[]} tracks Array of trackIds to be deleted.
	 */
	deleteTracks(tracks) {
		let thisPlaylist = this;
		return new Promise(function(resolve, reject) {
			let trackCount = 0;
			for (let trackId of tracks) {
				DB.setData(
						"DELETE FROM PlaylistTrack " +
						"WHERE playlistId = $1 AND trackId = $2",
						[thisPlaylist.id, trackId]
				).then(function(resultSet) {
					trackCount++;
					//continue;
				}).catch(function(error) {
					console.error(error);
					//continue;
				});
			}
			resolve(trackCount);
		});
	}
}

module.exports = Playlist;
