# InstaDJ

InstaDJ is a web-based application for generating playlists and discovering new music. Whether it's based on answers to a few questions, or a collaborative effort, InstsDJ aims to introduce users to new artists and genres.

## Authors
* Ryan Bower
* Thomas Kurien
* Brendon Strowe
* Rana Vemireddy

## How to Run

1. **Build the database.** From a MySQL prompt, run the `scripts/CreateDatabase.sql` script to build the database and the `scripts/TestData.sql` to populate it with test data.
2. **Configure your environment to connect to the database.** In the root directory of this project, create a new file called `.env`. The contents of the file should look like the following where `username` and `password` are replaced with the credentials needed to log into your local instance of your MySQL Server and `???` is replaced for your custom secret string.
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
4. **Run the server.** Run the command `npm start` to start the server.
5. **Run the client.** In a web browser, navigate to `http://localhost:3001/`.
