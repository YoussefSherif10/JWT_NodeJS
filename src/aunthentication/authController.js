const userService = require('../users/userService')
const authService = require('./authService')

const registerUser = (userDetails, done) => {
    userService.findUser(userDetails.email, (err, found) => {
        if (err)
            return done(err);
        if (found)
            return done('User already exists')
        userService.registerUser(userDetails, done);
    });
}

const loginUser = (userDetails, done) => {
    userService.findUser(userDetails.email, (err, found) => {
        if (err)
            return done(err)

        if (found) {
            const userVerified = authService.verifyUser(userDetails, found);
            if (userVerified) {
                const jwtToken = authService.createToken(found);
                return done(null, jwtToken);
            } else {
                return done('User Not Verified');
            }
        }
        else
            return done('User Not Registered');
    })
}

module.exports = {registerUser, loginUser};