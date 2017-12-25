'use strict';

module.exports = {
    /**
     * Get all users
     */
    getUsersForAdmin: asyncWrap(async (req, res) => {
        let users = await User.find({role: 0});
        res.json({error: false, data: users});
    }),

    getProfileMe: asyncWrap(async (req, res) => {
        let userId = req.user._id;
        let user = await User.findOne({_id: userId});
        res.json({error: false, data: user});
    }),

    createUser: asyncWrap(async (req, res) => {
        let email = req.body.email;
        let password = req.body.password;
        let password_confirmation = req.body.password_confirmation;
        let response = {
            error: true,
            message: ''
        };

        // check for existence of email
        let user = await User.find({email: email});
        if (user) {
            response.message = 'Email is already registered.';
            response.code = 409; // Conflict
        }

        // check for password equality
        if (password !== password_confirmation) {
            response.message = 'Password and Password confirmation is not the same.';
            response.code = 400; // Bad request
        }

        res.json(response);

        // let user = new User(req)
        // res.json({error: true, data: 'asdasdasdasd'});
    })
}
