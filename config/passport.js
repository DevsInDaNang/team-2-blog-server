var LocalStrategy = require('passport-local');

var User = require('../api/models/User');

module.exports = function (passport) {
    passport.serializeUser = function (user, done) {
        done(null, user.id);
    }

    passport.deserializeUser = function (id, done) {
        User.findById(id, function (err, user) {
            done(err, user);
        })
    }

    passport.use('local-signup', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    }, function (req, email, password, done) {
        process.nextTick(function () {
            User.findOne({'email': email}, function (err, user) {
                if (err) {
                    return done(err);
                }

                if (user) {
                    let errorData = {
                        code: 409,
                        codeDesc: 'Conflict',
                        message: 'That email is already taken.'
                    }
                    return done(errorData);
                } else {
                    var newUser = new User();
                    newUser.email = email;
                    newUser.password = newUser.generateHash(password);
                    newUser.save(function(err) {
                        if (err)
                            throw err;
                        return done(null, newUser);
                    });
                }
            })
        })
    }))

    passport.use('local-login', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    }, function (req, email, password, done) {
        User.findOne({'email': email}, function (err, user) {
            if (err) {
                return done(err);
            }

            if (!user) {
                let errorData = {
                    code: 404,
                    codeDesc: 'Not Found',
                    message: 'No user found.'
                }
                return done(errorData);
            }

            if (!user.validPassword(password)) {
                let errorData = {
                    code: 400,
                    codeDesc: 'Bad Request',
                    message: 'Oops! Wrong password.'
                }
                return done(errorData);
            }

            return done(null, user);
        })
    }))
}