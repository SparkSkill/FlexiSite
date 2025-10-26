import User from '../models/User.js';

export const findByUsername = async (username) => {
  return await User.findOne({ username });
};

export const createUser = async (data) => {
  const user = new User(data);
  return await user.save();
};
