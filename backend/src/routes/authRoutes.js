import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { pool } from '../config/db.js';

const router = Router();

router.post('/login', async (req, res) => {
  const { email, password, role } = req.body;

  if (!email || !password || !['student', 'admin'].includes(role)) {
    return res.status(400).json({ message: 'Email, password and a valid role are required.' });
  }

  try {
    const table = role === 'student' ? 'students' : 'admins';
    const [rows] = await pool.query(`SELECT id, name, email, password_hash, role FROM ${table} WHERE email = ? LIMIT 1`, [email]);
    const user = rows[0];

    if (!user || !(await bcrypt.compare(password, user.password_hash))) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }

    const token = jwt.sign({ id: user.id, name: user.name, email: user.email, role: user.role }, process.env.JWT_SECRET, { expiresIn: '2h' });

    return res.json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role } });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Unable to process login.' });
  }
});

export default router;
