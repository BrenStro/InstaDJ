# InstaDJ

InstaDJ is a web-based application for generating playlists and discovering new music. Whether it's based on answers to a few questions, or a collaborative effort, InstsDJ aims to introduce users to new artists and genres.

## Authors
* Ryan Bower
* Brendon Strowe
* Rana Vemireddy

## How to Run

**Prerequisites** \
It is assumed that PostgreSQL, Node.JS with NPM, and the Bower package manager are all installed on your system before proceeding with the steps below.

1. **Build the database.** From a PostgreSQL prompt, run the `scripts/CreateDatabase.sql` script to build the database. Test data is also available. Use the script located in `scripts/TestData.sql` to populate the database with test data.
2. **Configure your environment to connect to the database.** In the root directory of this project, create a new file called `.env`. The contents of the file should look like the following where `username` and `password` are replaced with the credentials needed to log into your local instance of your PostgreSQL Server and `???` is replaced for your custom secret string.
```
APP_PORT=3001
EXPRESS_SECRET=???

DB_HOST=localhost
DB_USERNAME=username
DB_PASSWORD=password
DB_DATABASE=InstaDJ
```
3. **Install the dependent Node.js packages.** In a Terminal or Command Prompt window, change the working directory to the root directory of the local copy of this project. Run the command `npm install`.
4. **Install the dependent front-end packages.** Run the command `bower install`.
4. **Start the server.** Run the command `npm start` to start the server.
5. **Run the client.** In a web browser, navigate to `http://localhost:3001/` (if you change the `APP_PORT` in the environment variables in step 2, you then instead specify that new port number in the address in this step).
