import {
  createMessageService,
  listMessagesService,
  getMessageByIdService,
  markMessageReadService,
  deleteMessageService,
} from '../services/messageService.js';

export const submitMessage = async (req, res) => {
  try {
    const msg = await createMessageService(req.body);
    res.status(201).json(msg);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const getMessages = async (_req, res) => {
  try {
    const messages = await listMessagesService();
    res.json(messages);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const getMessageById = async (req, res) => {
  try {
    const message = await getMessageByIdService(req.params.id);
    res.json(message);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const markRead = async (req, res) => {
  try {
    const { isRead } = req.body;
    const message = await markMessageReadService(req.params.id, isRead ?? true);
    res.json(message);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const deleteMessage = async (req, res) => {
  try {
    const result = await deleteMessageService(req.params.id);
    res.json(result);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

