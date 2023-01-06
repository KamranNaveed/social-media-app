# KamiSocial

This is a Facebook Clone social media app, developed using the MERN stack (MongoDB, Express, React, and Node.js). The following features are included in the app:

- User authentication: Users can create accounts and log in to the app securely using email and password. Passwords are hashed and salted for added security.
- Post creation: Users can create and share posts with their followers. Posts are stored in a MongoDB database..
- View feed: Users can view a feed of posts from the people they follow and their own posts. The feed is generated by querying the database for posts from followed users.
- View profiles: Users can view the profiles of other users and see their posts and information. Profie information is also stored in the database..
- Follow other users: Users can follow other users and see their posts in their feed. Follow relationships are stored in the database and the feed is updated in real-time.

<br>

A live deployment is available to test [here](https://kamisocial.onrender.com)

<hr>

## To Do:

- [ ] Fix Bugs


<hr>

## Getting started

To get the app up and running on your local machine, follow these steps:

- Clone the repository to your local machine:

```
git clone https://github.com/KamranNaveed/kamisocial.git
```
- Navigate to the api directory:
```
cd api
```
- Install the dependencies:
```
npm install
```
- Set up the environment variables:

Create a ```.env``` file with the necessary values for the environment variables. These include the database URI, alias ```MONGO```, and server port for development.

- Start the development server:
```
npm start
```
You can change the dev commands to reflect your development environment by going to ```package.json``` and updating ```scripts```

The server should start running in your selected port

- Navigate to the client directory:
```
cd client
```
- Install the dependencies:
```
npm install
```
- Start the development server:
```
npm start
```
You can change the dev commands to reflect your development environment by going to ```package.json``` and updating ```scripts```
The app should now be running on http://localhost:3000.

Thank you for checking out the project! If you have any questions or suggestions, please don't hesitate to reach out.
