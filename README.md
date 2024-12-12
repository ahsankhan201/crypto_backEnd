Backend (Node.js with TypeScript)

## Overview

The backend of this application is built using Node.js with TypeScript, Express.js, and MongoDB. It provides robust APIs for user authentication, coin data fetching, and managing user favorites. The backend integrates with a third-party coin market API to fetch real-time coin data.

## Features

1. Authentication & Authorization
2. Login and registration functionality.
3. Secure authentication using JWT tokens.
4. Coin Data Fetching
5. Fetches the latest coin data from a third-party coin market API using Axios.


## Controllers

1. Auth Controller: Manages user authentication (login and registration).
2. Coins Controller: Fetches and returns coin data from the marketplace.
3. Favorite Controller: Handles adding and retrieving users' favorite coins.


## RESTful API

Provides endpoints for:

1. User registration and login.
2. Fetching coin data.
3. Managing favorite coins (add/remove).


## Technologies Used

1. Runtime Environment: Node.js
2. Language: TypeScript
3. Framework: Express.js
4. Database: MongoDB
5. Authentication: JSON Web Tokens (JWT)
6. API Integration: Axios


## Prerequisites

Before you start, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (version 20)
- [npm](https://www.npmjs.com/) (comes with Node.js)

## Installation

1. npm install

## Start the server

1. npm start
