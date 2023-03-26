const users = require('./users.json')
const fs = require('fs')

function findUser(email, done) {
    const user = users.find(u => u.email === email);
    return done(null, user);
}

function registerUser(userDetails, done) {
    users.push(userDetails);
    fs.writeFileSync('src/Users/users.json', JSON.stringify(users));
    done(null, userDetails);
}

module.exports = {findUser, registerUser}