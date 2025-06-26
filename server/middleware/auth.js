const jwt = require("jsonwebtoken");


// Checks token and sets req.user
exports.protect = (req, res, next) => {
    const auth = req.headers.authorization;// blocks un authenticated users from accessing protected routes
    if(!auth || !auth.startsWith("Bearer ")) return res.status(401).json({ message: "No Token Provided"});


    const token = auth.split(" ")[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // {id, role} //attaching token to user ,role separates permissions
        next();
    } catch (error) {
        return res.status(403).json({ message: "invalid token"});
    }
};

// Checks roles
exports.authorize = (roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) return res.status(403).json({ message: "Forbidden"});
        next();
    };
};