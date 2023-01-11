const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    let token = req.cookies['app_token'];

    if (!token) {
        return next();

    }

    jwt.verify(token, 'ASDPI-93KLASJD02', function (err, decodedToken) {
        if (err) {
            res.status(401).redirect('/login');
        }

        req.user = decodedToken;
        res.locals.user = decodedToken;
        // console.log(decodedToken);
        next();
    });
};

module.exports = authMiddleware;