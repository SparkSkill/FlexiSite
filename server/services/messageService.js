import {
  createMessage,
  getMessages,
  getMessageById,
  markMessageRead,
  deleteMessage,
} from '../repositories/MessageRepository.js';

export const createMessageService = async (data) => {
  return await createMessage(data);
};

export const listMessagesService = async () => {
  return await getMessages();
};

export const getMessageByIdService = async (id) => {
  const message = await getMessageById(id);
  if (!message) throw new Error('Message not found');
  return message;
};

export const markMessageReadService = async (id, isRead = true) => {
  const message = await markMessageRead(id, isRead);
  if (!message) throw new Error('Message not found');
  return message;
};

export const deleteMessageService = async (id) => {
  const message = await deleteMessage(id);
  if (!message) throw new Error('Message not found');
  return { message: 'Message deleted' };
};

