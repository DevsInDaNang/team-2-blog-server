'use strict';

const bcryptService = require('../services/bcryptService');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

module.exports = {
    createUser: asyncWrap(async(req, res) => {

        passport.authenticate('signup', {
            successRedirect: '/home',
            failureRedirect: '/signup',
            failureFlash : true
        })


        console.log('asdasssssssssssssssssssss');
        passport.use('signup', new LocalStrategy({
                usernameField: 'email',
                passReqToCallback: true
            },
            function (req, username, password, done) {
                findOrCreateUser = function () {
                    // find a user in Mongo with provided username
                    User.findOne({
                        'email': username
                    }, function (err, user) {
                        // In case of any error return
                        if (err) {
                            console.log('Error in SignUp: ' + err);
                            return done(err);
                        }
                        // already exists
                        if (user) {
                            console.log('User already exists');
                            return done(null, false, req.flash('message', 'User Already Exists'));
                        } else {
                            // if there is no user with that email create the user
                            var newUser = new User();
                            // set the user's local credentials
                            newUser.email = req.body.email;
                            newUser.password = bcryptService.hash(password);

                            // save the user
                            newUser.save(function (err) {
                                if (err) {
                                    console.log('Error in Saving user: ' + err);
                                    throw err;
                                }
                                console.log('User Registration succesful');
                                return done(null, newUser);
                            });
                        }
                    });
                };

                // Delay the execution of findOrCreateUser and execute
                // the method in the next tick of the event loop
                process.nextTick(findOrCreateUser);
            }));
    })
};
