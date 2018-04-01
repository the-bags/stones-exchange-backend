# Stones exchange backend

It is server for stones. It use data bases **mongodb**.

#### Install and use

```bash
$ npm install
$ node server.js
```
So, same requests 

* **GET**
    * http://localhost:3001/user - show array of users from DB
    * http://localhost:3001/user/**id** - show user by **id**
* **POST**
    * http://localhost:3001/register - create new user
    * http://localhost:3001/login - check if user can login