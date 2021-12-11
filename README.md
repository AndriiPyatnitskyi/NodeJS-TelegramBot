# NodeJS Telegram bot log consumer

This is the final project of NodeJS backend development course provided by https://robotdreams.cc/

The main idea of this project is consume and display logs in telegram bot, thah ware produced by some system. 

Producing logs emulated by sending them via http request, for example postman.

Only authorized users or admins can send log message requests.

You can find all required documentation in swagger docs by following link http://localhost:6062/api-docs/.
 
---

Run project - npm run dev

Run DB - docker run --name LocalMono -d -it -p 27017:27017 mongo:4.4.10-rc0-focal
