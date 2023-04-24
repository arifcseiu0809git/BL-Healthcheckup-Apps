
# Django API Server

Simple starter built with Python / Django Rest / Sqlite3 and JWT Auth. The authentication flow is built with [json web tokens](https://jwt.io).

<br />

> Features:

- `Up-to-date dependencies` 
- [API Definition](https://docs.appseed.us/boilerplate-code/api-unified-definition) - the unified API structure implemented by this server
- Simple, intuitive codebase - can be extended with ease 
- Django / DRF / SQLite3 - a simple, easy to use backend
- Authentication with JWT (login, logout, register)
- Docker, Unitary tests

<br />

## ✨ Quick Start in `Docker`

> Get the code

```bash
$ git clone https://github.com/arifcseiu0809git/BL-Healthcheckup-Apps.git
$ cd api-server-django
```

> Start the app in Docker

```bash
$ docker-compose up --build  
```

The API server will start using the PORT `5000`.

<br />

## ✨ How to use the code

> **Step #1** -  Clone the sources

```bash
$ git clone https://github.com/arifcseiu0809git/BL-Healthcheckup-Apps.git
$ cd api-server-django
```
<br />

> **Step #2** - Create a virtual environment

```bash
$ # Virtualenv modules installation (Unix based systems)
$ virtualenv env
$ source env/bin/activate
$
$ # Virtualenv modules installation (Windows based systems)
$ # virtualenv env
$ # .\env\Scripts\activate
```

<br />

> **Step #3** - Install dependencies using PIP

```bash
$ pip install -r requirements.txt
```

<br />

> **Step #4** - Start the API server

```bash
$ python manage.py migrate
$ python manage.py runserver
```

The API server will start using the default port `8000`.

<br />

## ✨ Tests

```bash 
$ python manage.py test
```

<br />

## ✨ API

For a fast set up, use this POSTMAN file: [api_sample](https://github.com/arifcseiu0809git/BL-Healthcheckup-Apps.git/blob/master/media/api.postman_collection.json)

> **Register** - `api/users/signup`

```
POST api/users/signup
Content-Type: application/json

{
    "username":"test",
    "password":"pass", 
    "email":"test@appseed.us"
}
```

<br />

> **Login** - `api/users/login`

```
POST /api/users/login
Content-Type: application/json

{
    "password":"pass", 
    "email":"test@appseed.us"
}
```

<br />

> **Logout** - `api/users/logout`

```
POST api/users/logout
Content-Type: application/json
authorization: JWT_TOKEN (returned by Login request)

{
    "token":"JWT_TOKEN"
}
```

<br />

---
**Django API Server** - provided by AppSeed [App Generator](https://appseed.us)


**Deployment guide**
https://www.mattwoodward.com/2016/07/23/running-a-django-application-on-windows-server-2012-with-iis/
<br/>
effective guides: https://chasesawyer.dev/post/2020/03/django-api-apps-on-windows-iis/
<br/>
sqllite 3 write permission issue: 
<br/>
https://stackoverflow.com/questions/46415515/django-login-error-attempt-to-write-a-readonly-database-in-iis
<br/>
https://i.stack.imgur.com/1EkJb.png
<br/>
For react application deployment:
<br/>
https://www.letsreact.org/deploy-react-application-on-iis-server/