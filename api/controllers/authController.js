'use strict';

module.exports = {
    createUser: function (passport) {
        return asyncWrap(async(req, res) => {
            passport.authenticate('local-signup', function (err, user) {
                if (err) {
                    return res.json({
                        error: true,
                        code: err.code,
                        codeDesc: err.codeDesc,
                        message: err.message
                    });
                }
                if (user) {
                    return res.json({
                        error: false,
                        code: 201,
                        codeDesc: 'Created',
                        message: 'User is signed up successfully.'
                    })
                }
            })(req, res)
        })
    }
};