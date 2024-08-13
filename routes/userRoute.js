const express = require('express')
const UserRouter = express.Router();
const { getUsers } = require('../controllers/userController');
const redisCache = require('../middlewares/redisCache')


UserRouter.route('/').get(redisCache(300), getUsers)


module.exports = UserRouter