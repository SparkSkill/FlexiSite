import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { findByUsername, createUser } from '../repositories/UserRepository.js';

export const registerService = async (username, password) => {
  const existing = await findByUsername(username);
  if (existing) throw new Error('User already exists');

  const hashedPassword = await bcrypt.hash(password, 10);
  await createUser({ username, password: hashedPassword });
  return { message: 'Admin created successfully' };
};

export const loginService = async (username, password) => {
  const user = await findByUsername(username);
  if (!user) throw new Error('Invalid credentials');

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error('Invalid credentials');

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: '1d',
  });
  return { token, user: { id: user._id, username: user.username } };
};
