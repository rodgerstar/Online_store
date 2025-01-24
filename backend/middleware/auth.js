import jwt from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {
    const token = req.headers.token; // Get the token from headers
    if (!token) { // If token is missing
        return res.json({ success: false, message: "Not authorized" });
    }

    try {
        // Verify the token
        const token_decode = jwt.verify(token, process.env.JWT_SECRET);
        req.body.userId = token_decode.id; // Attach userId to the request body
        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        console.log("Token verification error:", error.message);
        res.json({ success: false, message: "Invalid or expired token" });
    }
};

export default authMiddleware;
