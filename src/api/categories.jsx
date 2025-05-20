import api from './axios';

export const getCategories = async () => {
  const response = await api.get('/categorias');
  return response.data.data; // Extraemos el array de categorías de data.data
};

export const createCategory = async (categoryData) => {
  try {
    const response = await api.post('/categorias', {
      nombre: categoryData.nombre,
      estado: categoryData.estado || 1 // Valor por defecto
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const updateCategory = async (id, categoryData) => {
  try {
    const response = await api.put(`/categorias/${id}`, {
      nombre: categoryData.nombre,
      estado: categoryData.estado
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};