# ZipZap
ZipZap is a messaging app made in React, utilizing the [Messenger API](https://github.com/gustydev/messenger-api). Create a custom user profile, private and public chats, DM chats, send messages and files to others!

## Features
1. Custom user profiles with profile picture uploading
2. Creation of public and private chats to exchange text messages on
3. Sending DMs (direct messages) to other users
4. Uploading attachments in chat (images and more)
5. Real time updates to user status (on or offline) and chat messages using Socket.io
6. Demo account to try out the website with limited features

## Installation

1. **Clone the repository**:
    ```bash
    git clone https://github.com/gustydev/zipzap.git
    ```

2. **Navigate to the project directory**:
    ```bash
    cd zipzap
    ```

3. **Install dependencies and run the app**:
    ```bash
    npm install
    npm run dev
    ```

## Setup
The app requires the [Messenger API](https://github.com/gustydev/messenger-api) to function, so make sure it is up and running.

### Environment Variables
The app requires some environment variables set on a .env file on the root directory:

```plaintext
VITE_API_URL=http://localhost:3000 # API URL
VITE_DEMO_PASS=demo_password       # Password of the demo user
VITE_DEMO_USERNAME=demo_user       # Username of demo user