# TensorGo CSP APP

A customer service platform app, integrated with Google OAuth 2.0 for user authentication and Intercom.com for handling customer queries.


## Installation

- To run this app on your local machine install the code files from the repo and navigate to server directory

```bash
  cd server
```
- Install all the dependencies using

```bash
  npm install
```

- Create a .env file on the root directory of your server and following details accordingly

```bash
  CLIENT_URL =
  GOOGLE_CLIENT_ID =
  GOOGLE_CLIENT_SECRET =
  GOOGLE_CLIENT_URL =
  INTERCOM_ACCESS_TOKEN =
  INTERCOM_API_URL = 'https://api.intercom.io'
```

- Then start the server using

```bash
  npm start
```

- Similarly go through following steps for client directory:

```bash
  cd client
```
```bash
  npm install
```
- Create a .env file on the root directory of your client
```bash
  REACT_APP_API_URL = {Your server URL}
```
```bash
  npm start
```

Your app should now be running on localhost:3000