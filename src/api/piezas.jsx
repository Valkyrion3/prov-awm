import api from './axios';

export const getPiezas = async (page = 1) => {
  try {
    const response = await api.get(`/piezas?page=${page}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};