'use strict';

module.exports = {
    createUser: function (passport) {
        return asyncWrap(async(req, res) => {
            passport.authenticate('local-signup', function (err, user) {
                if (err) {
                    return res.json(returnedErrorData(err));
                }
                if (user) {
                    return res.json({
                        error: false,
                        code: 201,
                        codeDesc: 'Created',
                        message: 'User is signed up successfully.',
                        data: {
                            user: user
                        }
                    })
                }
            })(req, res);
        })
    },

    userLogin: function (passport) {
        return asyncWrap(async(req, res) => {
            passport.authenticate('local-login', function (err, user) {
                if (err) {
                    return res.json(returnedErrorData(err));
                }
                if (user) {
                    return res.json({
                        error: false,
                        code: 200,
                        codeDesc: 'Ok',
                        data: {
                            user: user
                        }
                    })
                }
            })(req, res);
        })
    }
};

function returnedErrorData(data) {
    return {
        error: true,
        code: data.code,
        codeDesc: data.codeDesc,
        message: data.message
    }
}