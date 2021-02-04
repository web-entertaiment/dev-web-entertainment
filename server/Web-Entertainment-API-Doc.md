# Web Entertainment Server

Aplikasi web yang membantu dalam mencari referensi movie, anime movie dan komik.

&nbsp;

## List of Endpoints
```
- POST /user/register
- POST /user/login
- POST /user/loginGoogle
- GET /entertainment/animeMovie
- GET /entertainment/movie
- GET /entertainment/comic
```

&nbsp;

## RESTfull Endpoint

### POST /user/register
> Create a new user

_Request Header_
```
{
  not needed
}
```

_Request Body_
```
{
  "fullname": "<fullname get from insert into>",
  "email": "<email get from insert into>",
  "password": "<password get from insert into>"
}
```

_Response (201 - Created)_
```
{
  "id": <given id by system>,
  "fullname": "<posted fullname>",
  "email": "<posted email>",
  "password": "<posted password>"
  "createdAt": "<given createdAt by system>",
  "updatedAt": "<given updatedAt by system>",
}
```

_Response (400 - Bad Request)_
```
{
  "message": "fullname tidak boleh kosong"
  "message": "email tidak boleh kosong"
  "message": "password tidak boleh kosong"
}
```

_Response (500 - Internal Server Error)_
```
{
  "message": "Internal Server Error"
}
```
---

### POST /user/login
> for user login and get access token

_Request Header_
```
{
  not needed
}
```

_Request Body_
```
{
  "email": "<email get from insert into>",
  "password": "<password get from insert into>"
}
```

_Response (200 - Ok)_
```
{
  "access_token": <given access_token by system>,
}
```

_Response (401 - Unautorized)_
```
{
  "message": "Invalid Email or Password"
}
```
_Response (404 - Not Found)_
```
{
  "message": "Invalid Email or Password"
}
```

_Response (500 - Internal Server Error)_
```
{
  "message": "Internal Server Error"
}
```
---