const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
    let token = req.cookies.jwt;

    if(token){
        jwt.verify(token, "secure_secret", (error, truetoken) => {
            if(error){
                console.log(error);
                res.redirect("login.html");
            }else{
                console.log(truetoken);
                next();
            }
        });
    }else{
        res.redirect("login.html");
    }
}