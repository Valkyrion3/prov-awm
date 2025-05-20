import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getCategories, createCategory, updateCategory } from '../api/categories';
import { useForm } from 'react-hook-form';
import { useState } from 'react';

export default function CategoriesPage() {
  const queryClient = useQueryClient();
  const [editingId, setEditingId] = useState(null);
  
  // Formulario para creación/edición
  const { 
    register, 
    handleSubmit, 
    reset,
    setValue,
    formState: { errors } 
  } = useForm();
  
  // Obtener categorías
  const { data: categories, isLoading, isError } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories
  });
  
  // Mutación para crear categoría
  const createMutation = useMutation({
    mutationFn: createCategory,
    onSuccess: () => {
      reset();
      queryClient.invalidateQueries(['categories']);
    }
  });
  
  // Mutación para actualizar categoría
  const updateMutation = useMutation({
    mutationFn: ({ idCategoria, data }) => updateCategory(idCategoria, data),
    onSuccess: () => {
      reset();
      setEditingId(null);
      queryClient.invalidateQueries(['categories']);
    }
  });
  
  // Manejar edición
  const handleEdit = (category) => {
    setEditingId(category.idCategoria);
    setValue('nombre', category.nombre);
    setValue('estado', category.estado);
  };
  
  // Enviar formulario
  const onSubmit = (data) => {
    if (editingId) {
      updateMutation.mutate({ idCategoria: editingId, data });
    } else {
      createMutation.mutate(data);
    }
  };
  
  if (isLoading) return <div>Cargando categorías...</div>;
  if (isError) return <div>Error al cargar categorías</div>;

  return (
    <div className="categories-page">
      <h1>Gestión de Categorías</h1>
      
      {/* Formulario */}
      <form onSubmit={handleSubmit(onSubmit)} className="category-form">
        <div className="form-group">
          <label>Nombre</label>
          <input 
            {...register('nombre', { required: 'Nombre es requerido' })}
            className={errors.nombre ? 'error' : ''}
          />
          {errors.nombre && <span className="error-message">{errors.nombre.message}</span>}
        </div>
        
        <div className="form-group">
          <label>Estado</label>
          <select {...register('estado')}>
            <option value={1}>Activo</option>
            <option value={0}>Inactivo</option>
          </select>
        </div>
        
        <button type="submit" disabled={createMutation.isLoading || updateMutation.isLoading}>
          {editingId ? 'Actualizar' : 'Crear'} Categoría
        </button>
        
        {editingId && (
          <button 
            type="button" 
            onClick={() => {
              setEditingId(null);
              reset();
            }}
            className="cancel-button"
          >
            Cancelar
          </button>
        )}
        
        {(createMutation.isError || updateMutation.isError) && (
          <div className="error-message">
            {createMutation.error?.message || updateMutation.error?.message}
          </div>
        )}
        
        {(createMutation.isSuccess || updateMutation.isSuccess) && (
          <div className="success-message">
            {createMutation.isSuccess ? 'Categoría creada!' : 'Categoría actualizada!'}
          </div>
        )}
      </form>
      
      {/* Tabla de categorías */}
      <div className="categories-table">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {categories
            .filter(category => category.estado === 1)
            .map(category => (
              <tr key={category.idCategoria}>
                <td>{category.idCategoria}</td>
                <td>{category.nombre}</td>
                <td>
                  <span className={`status ${category.estado ? 'active' : 'inactive'}`}>
                    {category.estado ? 'Activo' : 'Inactivo'}
                  </span>
                </td>
                <td>
                  <button 
                    onClick={() => handleEdit(category)}
                    className="edit-button"
                  >
                    Editar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}