import api from './axios';

export const getProveedores = async (page = 1) => {
  try {
    const response = await api.get(`/proveedores?page=${page}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};