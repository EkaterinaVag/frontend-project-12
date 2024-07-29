### Hexlet tests and linter status:
[![Actions Status](https://github.com/EkaterinaVag/frontend-project-12/actions/workflows/hexlet-check.yml/badge.svg)](https://github.com/EkaterinaVag/frontend-project-12/actions)

# Real-Time Chat Application with React/Redux

## Description

This is a real-time chat application built with React and Redux, allowing users to register, authenticate, create channels, and exchange messages in real time. The application use AJAX, REST API, and websockets for communication with the server.

## Demo
Check out the live demo of the Chat application [here](https://frontend-project-12-3hic.onrender.com/)

## Features

* *Registration and Authentication:* Users can create accounts and log in to the system.
* *Channel Creation:* Users can create new channels for communication.
* *Real-Time Chat:* New messages are displayed in the chat instantly.
* *Sending and Receiving Messages:* Users can send and receive messages within channels.
* *Channel List:* A list of available channels is displayed.
* *Profanity Filter*:  The application filters out offensive language, creating a safer and more welcoming environment for all users.

## Usage

* *Registration:* Fill out the registration form to create an account.
* *Authentication:* Log in to the system using your created credentials.
* *Creating a Channel:* Click on the "+" button and enter a channel name.
* *Joining a Channel:* Select a channel from the list of available channels.
* *Sending Messages:* Enter a message in the input field and press Enter.
* *Reading Messages:* View messages from other users in the channel.

## Installation and Running

1. *Install Node.js and npm*
2. *Clone the repository:* 

``` 
git clone https://github.com/EkaterinaVag/frontend-project-12.git
```

3. *Change directory:*

```
cd frontend-project-12
```

3. *Install dependencies:*

```
npm install
```

4. *Start the frontend and backend servers:*

```
make start
```