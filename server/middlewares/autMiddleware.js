const jwt = require('jsonwebtoken');
module.exports = (req, res, next) => {
    try {
        //get the token from header
        const token = req.header('authorization').split(" ")[1];
        console.log(token)
        const decryptedToken = jwt.verify(token, process.env.jwt_secret);
        req.body.userId = decryptedToken.userId;
        console.log(req.body.userId)
        next();
    } catch (error) {
        res.send({
            success: false,
            message: error.message,
          })
    }
}