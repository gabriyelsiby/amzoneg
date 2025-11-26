import jwt from 'jsonwebtoken';
import User from '../models/User.js';


export const authMiddleware = async (req, res, next) => {
try {
const auth = req.headers.authorization || '';
const token = auth.startsWith('Bearer ') ? auth.split(' ')[1] : null;
if (!token) return res.status(401).json({ message: 'Unauthorized' });
const payload = jwt.verify(token, process.env.JWT_SECRET);
req.userId = payload.id;
const user = await User.findById(req.userId);
req.userName = user?.name;
next();
} catch (err) { res.status(401).json({ message: 'Unauthorized' }); }
};