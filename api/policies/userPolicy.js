'use strict'

module.exports = function(app){
    app.get('/userPolicy/me', (req, res, next) => {
        if(!req.user) {
            return res.status(401).json({error: true, data: 'unauthorized', code: 401});
        }
        next();
    });
};
