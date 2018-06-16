# Stones exchange backend

It is server for stones. It use data bases **mongodb**.

#### Install and use

```bash
$ sudo npm install gulp -g
$ npm install
$ npm start
```
So, same requests 

* **GET**
    * http://localhost:3001/user - show array of users from DB
    * http://localhost:3001/user/**id** - show user by **id**
* **POST**
    * http://localhost:3001/register - create new user
    * http://localhost:3001/login - check if user can login

#### Use ESLint

ESLint is pluggable linting utility for JavaScript.

**Check to errors**

```bash
$  ./node_modules/.bin/eslint .
```

 **Automatically fix problems** (Magic button)

 ```bash
 $ ./node_modules/.bin/eslint . --fix
 ```

 #### PS

 If you see problem such as ...
 
 ```
 Error: watch  .../acorn-jsx/ ENOSPC
    at FSWatcher.start (fs.js:1402:19)
***
 ```

For fix 

```bash
echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p
```

Solution from https://gist.github.com/brunoleles/ee689cac84599ab78e415748c241ccfc