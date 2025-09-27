# Patesian Backend

This repository contains the source code for the backend server that powers the [Patesian iOS app](https://github.com/your-username/patesian-ios-app). It's a RESTful API built to handle user data, social features, and timetable caching for the Patesian school companion app.

## Technology Stack

The server is built with a simple and robust JavaScript-based stack:

* **Runtime**: Node.js
* **Framework**: Express.js for routing and handling API requests.
* **Database**: MongoDB, with Mongoose as the Object Data Modeling (ODM) library to structure data.

## API Functionality

The API provides a set of endpoints for the iOS client to perform CRUD (Create, Read, Update, Delete) operations on several key data models:

* **Users**: Manages user profiles, profile pictures, friends lists, and friend requests.
* **Posts**: Handles the creation and retrieval of posts for the social feed, including text and image content.
* **Timetables**: Caches processed timetable data fetched by the client from the Microsoft Graph API to reduce redundant calls.
* **Groups**: Manages the profiles of school societies and clubs that can create posts.

## Getting Started

To run the server locally, you'll need Node.js and a MongoDB instance.

```bash
# 1. Clone the repository
git clone [https://github.com/your-username/patesian-backend.git](https://github.com/your-username/patesian-backend.git)
cd patesian-backend

# 2. Install dependencies
npm install

# 3. Create a .env file with your MongoDB connection string
# MONGODB_URI=your_mongodb_connection_string

# 4. Start the server
npm start
