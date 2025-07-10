const { verificationToken } = require("../authentication/auth")

function checkCookie(cookieName){
    return (req,res,next)=>{
        const tokenCookie = req.cookies[cookieName]
        if(!tokenCookie)
           return next();
    
    try{
        const userPayload = verificationToken(tokenCookie)
        req.user = userPayload;
        return next();
    }
    catch(error){}
    next();
}
}

module.exports = { checkCookie };
