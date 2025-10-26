import { getSettingsService, updateSettingsService } from '../services/settingsService.js';

export const getSettings = async (_req, res) => {
  try {
    const settings = await getSettingsService();
    res.json(settings || {});
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const updateSettings = async (req, res) => {
  try {
    const settings = await updateSettingsService(req.body);
    res.json(settings);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

