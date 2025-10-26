import Message from '../models/Message.js';

export const createMessage = async (data) => {
  const message = new Message(data);
  return await message.save();
};

export const getMessages = async () => {
  return await Message.find().sort({ createdAt: -1 });
};

export const getMessageById = async (id) => {
  return await Message.findById(id);
};

export const markMessageRead = async (id, isRead = true) => {
  return await Message.findByIdAndUpdate(
    id,
    { isRead },
    { new: true }
  );
};

export const deleteMessage = async (id) => {
  return await Message.findByIdAndDelete(id);
};

