# API Request

Example JSON Request

POST URL: 
http://localhost:5000/api/users/register?name=Peter

Payload:
{
  "name": "Max",
  "email": "max@example.com",
  "password": "notSoSafe567&"
}

POST URL:
http://localhost:5000/api/users/login

Payload:
{
  "email": "max@example.com",
  "password": "notSoSafe567&"
}

GET URL:
http://localhost:5000/api/users/find/:userId

GET URL:
http://localhost:5000/api/users/