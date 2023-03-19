# NTask-API
NTASK IS A NODE JS API BUILD IN TYPESCRIPT MADE USING THE BEST PRATICS TO CREATE A SCALABLE AND EASY TO MANTAIN SOFTWARE.

RUN NPM I TO INSTALL THE DEPENDENCIES.

RUN NPM TEST TO RUN THE TESTS.

RUN NPM START TO RUN THE APP.

THE APP NEED THE ENV .env CONFIGS TO START.

dev.env: DEVELOPMENT EVERYMENT VARIABLES.

test.env TEST ENVERIOMENT VARIABLES.

THOSES TWO FILES NEED TO BE PLACED IN THE APPLICATION ROOT INSIDE "env" FOLDER.

.dev config
example: 
port=5000
jwtSecret=$SOM3_SECRET
database=mylocaldb
dialect=sqlite
storage=./src/database/mylocaldb.sqlite

.test config
example: 
port=3000
jwtSecret=$TEST_SECRET
database=mytestdb
dialect=sqlite
storage=./src/database/mytestdb.sqlite
clearDB=true

