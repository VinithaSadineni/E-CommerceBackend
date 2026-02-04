import jwt from 'jsonwebtoken'

export function verifyToken(req, res, next) {
    //token verification logic
    //1. Get the token  from req
    console.log(req.cookies)
    let signedToken = req.cookies.token;
    if (!signedToken) {
        return res.statuse(401).json({ messge: "Please login first" })
    }
    //2. Verify Token (decode)
    let decodedToken = jwt.verify(signedToken, 'secret')
    console.log("Decoded token:", decodedToken)
    next();

}