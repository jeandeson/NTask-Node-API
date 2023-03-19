"NTASK is a Node.js API built in TypeScript, made using the best practices to create scalable and easy-to-maintain software.

To install the dependencies, run 'npm i'.

To run the tests, run 'npm test'.

To run the app, run 'npm start'.

The app requires the environment configurations to be set up in the .env file.

The 'dev.env' file contains development environment variables, and the 'test.env' file contains test environment variables. These two files need to be placed in the application root inside an 'env' folder.

An example of the '.dev' configuration is as follows:
port=5000
jwtSecret=$SOM3_SECRET
database=mylocaldb
dialect=sqlite
storage=./src/database/mylocaldb.sqlite

An example of the '.test' configuration is as follows:
port=3000
jwtSecret=$TEST_SECRET
database=mytestdb
dialect=sqlite
storage=./src/database/mytestdb.sqlite
clearDB=true."
