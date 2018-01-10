'use strict';

const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

module.exports = function(app){
    app.route('/admin/users').get(userController.getUsersForAdmin);

    app.route('/user/me').get(userController.getProfileMe);

    app.route('/user/signup').post(authController.createUser);
};
