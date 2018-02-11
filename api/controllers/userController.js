'use strict';

module.exports = {
    /**
     * Get all users
     */
    getUsersForAdmin: asyncWrap(async (req, res) => {
        let users = await User.find({
            role: 0
        });
        res.json({
            error: false,
            data: users
        });
    }),

    getProfileMe: asyncWrap(async (req, res) => {
        userService.jwtVerify(req.query.token).then(
            (success) => {
                res.status(200).send(success)
            },
            (failure) => {
                res.status(400).send(failure);
            });
    })
}