const express = require("express");
const routes = express.Router();
const middleware = require('../middleware/auth');
const controller = require("../controller/userController");

routes.post('/signup', middleware.myMiddlewareFunSignUp, controller.signUp);
routes.post('/login',middleware.myMiddlewareFunLogin, controller.logIn);


module.exports = routes;
