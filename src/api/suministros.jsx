import api from './axios';

export const getSuministros = async (page = 1) => {
  try {
    const response = await api.get(`/suministros?page=${page}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};