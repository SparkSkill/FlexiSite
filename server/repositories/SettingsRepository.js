import Settings from '../models/Settings.js';

export const getSettings = async () => {
  return await Settings.findOne();
};

export const upsertSettings = async (data) => {
  return await Settings.findOneAndUpdate({}, data, { new: true, upsert: true });
};

