var jwt = require("jsonwebtoken")
var config = require("../config")
module.exports = middleware

function middleware(req,res,next){
    var token = req.body.token || req.query.token || req.headers["x-access-token"]
    if(token) {
        jwt.verify(token, config.secret, function(err,decoded){
            if(err) return res.json({
                success: false,
                message: "Failed to authenticate token."
            })
            req.user = decoded
            return next()
        })
    } else {
        return res.status("403").json({
            success: false,
            message: "No token provided."
        })
    }
}
