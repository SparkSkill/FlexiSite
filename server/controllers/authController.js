import { registerService, loginService } from '../services/authService.js';

export const register = async (req, res) => {
  try {
    const { username, password } = req.body;
    const result = await registerService(username, password);
    res.status(201).json(result);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const result = await loginService(username, password);
    res.json(result);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
