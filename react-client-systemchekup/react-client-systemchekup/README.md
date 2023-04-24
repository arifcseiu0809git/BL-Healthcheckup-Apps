# [react-client-systemchekup](https://github.com/arifcseiu0809git/BL-Healthcheckup-Apps.git/)

**react-client-systemchekup** is an open-source **React Dashboard** that provides a colorful and modern design. react-client-systemchekup React Free is the most stylised React Free Admin Template, around all other admin templates in the market. It comes with high feature-rich pages and components with fully developer-centric code. The product comes with a simple JWT authentication flow: login/register/logout.

<br />

> Features

- Modern aesthetics UI design - Designed by [CodedThemes](https://bit.ly/37fF9RT)
- React, Redux, Redux-persist
- Authentication: JWT Login/Register/Logout
  - Features: Typescript / SQLite / TypeORM / Joy (validation) / Passport library - `passport-jwt` strategy.

<br >

## ✨ Quick Start in `Docker`

> Get the code

```bash
$ git clone https://github.com/arifcseiu0809git/BL-Healthcheckup-Apps.git
$ cd react-client-systemchekup
```

> Start the app in Docker

```bash
$ docker-compose up --build 
```

The React UI starts on port `3000` and expects an API server on port `5000` (saved in configuration).

<br /> 

## ✨ How to use it

To use the product Node JS (>= 12.x) is required and GIT to clone/download the project from the public repository.

**Step #1** - Clone the project

```bash
$ git clone https://github.com/arifcseiu0809git/BL-Healthcheckup-Apps.git
$ cd react-client-systemchekup
```

<br >

**Step #2** - Install dependencies via NPM or yarn

```bash
$ npm i
// OR
$ yarn
```

<br />

**Step #3** - Start in development mode

```bash
$ npm run start 
// OR
$ yarn start
```

<br />

## ✨ Configure the backend server

The product comes with a usable JWT Authentication flow that provides only the basic requests: login/logout/register. 

**API Server URL** - `src/config/constant.js` 

```javascript
const config = {
    ...
    API_SERVER: 'http://localhost:6000/api/'  // <-- The magic line
};
```

<br />

## ✨ Node JS API Server

The product is also open-source and is already configured to work with Berry Dashboard Template - product features:

- Typescript / Node js / Express server
- JWT authentication (`passport-jwt` strategy)
- Persistence: SQLite 


<br />

### Compile the API Server

**Step #1** - Clone the project

```bash
$ git clone https://github.com/arifcseiu0809git/BL-Healthcheckup-Apps.git
$ cd api-server-nodejs
```

**Step #2** - Install dependencies via NPM or Yarn

```bash
$ npm i
// OR
$ yarn
```

**Step #3** - Run the SQLite migration via TypeORM

```
$ yarn typeorm migration:run
```

**Step #4** - Start the API server (development mode)

```bash
$ npm dev
// OR
$ yarn dev
```

The API server will start using the `PORT` specified in `.env` file (default 5000).
