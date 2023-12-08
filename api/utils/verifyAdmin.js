import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export const verifyAdminToken = (req, res, next) => {
    
    const adminToken = req.cookies.admin_token;

    if (!adminToken) return res.status(403).json({ message: 'Admin token not found' });

    jwt.verify(adminToken, process.env.JWT_SECRET, (err, admin) => {
        if (err) {
            return res.status(404).json({ errortype: 'No admin' });
        }

        req.admin = admin;
        console.log('Next from verify admin token');

        // Extract the role from the decoded JWT token
        const adminRole = admin.role;

        // Attach the role to the request object for further use in route handlers
        req.role = adminRole;

        next();
    });
};
