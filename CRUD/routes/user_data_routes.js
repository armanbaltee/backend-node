const express = require("express");
const routes = express.Router();
const middleware = require('../middleware/auth');
const controller = require("../controllers/userController");

routes.post('/send', middleware.submitData, controller.createUser);
routes.get('/get', controller.viewUser);
routes.delete('/delete', middleware.deleteData, controller.deleteUser);
routes.patch('/update', middleware.updateUser, controller.updateUser);

module.exports = routes;
