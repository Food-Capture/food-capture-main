# Dev Setup

1. Ensure npm is installed on the computer
2. In this directory (server), run `npm install` to install all necessary node packages
3. Run `npm start` to start the server. If you would like to start the server with nodemon (which enables hot reloading), run `npm run dev` instead.
4. IMPORTANT: An environment (.env) file with the following variables are required to run the server on your local machine - JWT_KEY (jwt secret key), MDB_KEY (mongodb key), CLOUDINARY_URL (cloudinary connection). Please contact the dev team if you are a TA and require these keys as we do not want to expose these sensitive keys on the github repo.
5. Alternatively, there is already a deployed server on heroku that you can use to demo. It runs the same exact code that you see here. You may send requests to endpoints at https://food-capture.herokuapp.com
