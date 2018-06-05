# Worksample
## Simple fullstack project with React-Node.js-Firebase

This project was a really fast timed (~1 day) boot camp to create a basic fullstack implementation with React as a frontend and Node.js as a backend. Communication is done with REST commands.
This project introduced some new technologies to me and gave me a chance to grasp the fundamentals of the React.js and the related technologies (Webpack,Babel,etc.).

The final goal for this project was to deploy the created fullstack into some SaaP. The frontend and the backend was deployed into Google Cloud and the database is handled by Firebase (also by Google).

As a result I grasped the basic aspects of React & Webpack & Koa & Babel + other related technologies. The Google Cloud was also a new area for me and it took some try&error to get frontend and backend to run in there correctly.

## Project files
**Frontend (a really simple one)**
https://simple-react-nodejs-frontend.appspot.com/

**Backend (Node.js)**
https://simple-react-nodejs-fullstack.appspot.com/

**Github**
https://github.com/stompuri/worksample

## Running development environment
> git clone https://github.com/stompuri/worksample.git

**Frontend**
```
cd frontend
npm install
start-dev": "webpack-dev-server --config ./webpack.config.js --mode development
```

**Backend**
```
cd backend
npm install
node server.js
```
