'use strict';

const userService = require('../services/userService');

module.exports = {
    createUser: (passport) => {
        return asyncWrap(async(req, res) => {
            passport.authenticate('local-signup', (err, user) => {
                if (err) {
                    return res.status(err.code).send(err.codeDesc);
                }
                if (user) {
                    return res.sendStatus(201);
                }
            })(req, res);
        })
    },

    userLogin: (passport) => {
        return asyncWrap(async(req, res) => {
            passport.authenticate('local-login', (err, user) => {
                if (err) {
                    return res.status(err.code).send(err.codeDesc);
                }
                if (user) {
                    return res.status(200).send({
                        user: user,
                        token: userService.generateUserToken(user)
                    })
                }
            })(req, res);
        })
    }
};
