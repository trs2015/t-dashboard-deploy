// Middleware to authorize specific roles
export const authorize = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ msg: 'Access denied. Insufficient permissions.' });
        }
        next();
    };
}
