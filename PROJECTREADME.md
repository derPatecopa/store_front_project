Instructions for setting up project storefront

1. make sure, that all the dependencies from the package.json are installed correctly on you machine. run npm install to do so.

2. in your root folder, you have to create a .env file with the following variables:

POSTGRES_HOST=localhost
POSTGRES_PORT=5433
POSTGRES_TEST_PORT=5434
POSTGRES_DB=
POSTGRES_TEST_DB=
POSTGRES_USER=
POSTGRES_TEST_USER=
POSTGRES_PASSWORD=
POSTGRES_TEST_PASSWORD=
ENV=dev
BCRYPT_PASSWORD=
SALT_ROUNDS=
TOKEN_SECRET=

please fill in the variables according to your needs. If the ports dont fit, you can change them in the docker-compose file AND the env file.

3. There are two databases running in a docker-compose file, one for testing one for develeopment. Docker Desktop should be installed on your machine. To start the databases run docker-compose up in console
You might have to adjust the settings slightly for your system
to login into docker in the vs console use this format: 

psql -U YOUR_USER_NAME -h YOUR_HOST_NAME -d YOUR_DATA_BASE -p YOUR_PORT

4. To run the test created with jasmine, simply type npm run test into your console
The test will then be performed on the test database from the docker file
if a test should fail, the database wont be erased automatically. To reset it simply type npm run reset-test into the console. This will delete all the tables content created from the jasmine test. Note: the randomization with jasmine was turned off, because some tests rely on each other. To turn it back on go to spec/support/jasmine.json and set random to true.

5. you can use the database on your local machine and test it with postman (or a similar program/browser etc.)
type npm run watch into you console to start the server. you can find all the get and post methods in the corresponding handler files at the very bottom (src/handlers)

6. to reset the dev database you can type npm run reset-dev
this will delete all content from the dev database

