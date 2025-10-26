import { getSettings, upsertSettings } from '../repositories/SettingsRepository.js';

export const getSettingsService = async () => {
  const settings = await getSettings();
  return settings;
};

export const updateSettingsService = async (data) => {
  const updated = await upsertSettings(data);
  return updated;
};

