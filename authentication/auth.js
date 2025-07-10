const jwt = require('jsonwebtoken');
const secrate = "$ouMItA:$ecratE"

async function tokenGenerator(user){
    const paylod = {
        _id: user._id,
        name : user.name,
        email : user.email,
        profileImage : user.profileImage,
        role : user.role
    }

    const token = jwt.sign(paylod,secrate)
    return token
}

function verificationToken (token){
    const verify = jwt.verify(token,secrate)
    return verify
}

module.exports = {tokenGenerator, verificationToken}