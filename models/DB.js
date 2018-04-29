/**
 * Allows for a connection to be made to a MySQL Database.
 *
 * InstaDJ
 * ISTE 432 01
 * Ryan Bower, Thomas Kurien, Brendon Strowe, Rana Vemireddy
 * @author Brendon Strowe
 */

const {Pool} = require("pg");

/**
 * Connection pool object
 * @type {Pool}
 */
const pool = new Pool({
	host	 : process.env.DB_HOST,
	user	 : process.env.DB_USERNAME,
	password : process.env.DB_PASSWORD,
	database : process.env.DB_DATABASE,
	port	 : process.env.DB_PORT
});

/**
 * This method will query the database using a precompiled SQL Statement.
 *  The SQL statement provided should include '$#' where data values are to be
 *  inserted. '#' is replaced with a numerical value of the index of the
 *  parameter starting at 1. An array of values to be inserted should also be provided.
 *
 * @param {string} sql - A string of precompiled SQL.
 * @param {array} values - A list of values to be bound to the precompiled SQL Statement.
 * @return {Promise} Whether or not establishing a connection and retrieving the data was successful or not.
 */
exports.getData = function(sql, values) {
	// If an error is encountered, the Promise will be rejected with an explanatory error.
	//  Else, it will be resolved with the resulting data from the database query.
	return new Promise(function(resolve, reject) {
		// Perform SQL query.
		pool.query(sql, values).then(function(response) {
			//console.log(response);
			resolve(response);
		}).catch(function(error) {
			console.error(error);
			reject("Error querying the database.");
		});
	});
};

/**
 * This method will update the database using a precompiled SQL Statement.
 *
 * @param {string} sql - A string of precompiled SQL.
 * @param {array} values - A list of values to be bound to the precompiled SQL Statement.
 * @return {Promise} whether or not the command execution was successful.
 */
exports.setData = function(sql, values) {
	// If an error is encountered, the Promise will be rejected with an explanatory error.
	//  Else, it will be resolved with the resulting data from the database query.
	return new Promise(function(resolve, reject) {
		// Perform SQL query.
		pool.query(sql, values).then(function(results) {
			//console.log(results);
			let resultSet = {
				insertId : results.rows[0] ? results.rows[0].id : -1,
				rowsAffected : results.rowCount
			};
			resolve(resultSet);
		}).catch(function(error) {
			console.error(error);
			reject("Error querying the database.");
		});
	});
};
