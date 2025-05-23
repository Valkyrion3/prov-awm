import { useQuery, useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { getParts, deletePart } from '../api/piezas';

export default function PartsPage() {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  
  const { data: response, isLoading, isError, refetch } = useQuery({
    queryKey: ['parts', currentPage],
    queryFn: () => getParts(currentPage),
  });

  const deleteMutation = useMutation({
    mutationFn: deletePart,
    onSuccess: () => {
      refetch();
    }
  });

  if (isLoading) return <p>Cargando piezas...</p>;
  if (isError) return <p>Error al cargar las piezas</p>;

  const parts = response?.data || [];
  const pagination = response?.pagination || {
    total: 0,
    pages: 1,
    currentPage: 1,
    perPage: 10
  };

  return (
    <div>
      <div>
        <h2>Piezas</h2>
        <button
          onClick={() => navigate('/piezas/nueva')}
        >
          + Nueva Pieza
        </button>
      </div>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Color</th>
            <th>Precio</th>
            <th>Categoría</th>
            <th>Medida</th>
            <th>Stock</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {parts.map((part) => (
            <tr key={part.idPieza}>
              <td>{part.idPieza}</td>
              <td>{part.nombre}</td>
              <td>{part.color}</td>
              <td>{part.precio}</td>
              <td>{part.categoria?.nombre}</td>
              <td>{part.medida}</td>
              <td>{part.stock}</td>
              <td>
                <span>
                  {part.estado ? 'Activo' : 'Inactivo'}
                </span>
              </td>
              <td>
                <button
                  onClick={() => navigate(`/piezas/editar/${part.idPieza}`)}
                >
                  Editar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
      {pagination.pages > 1 && (
        <div>
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Anterior
          </button>
          
          {Array.from({ length: pagination.pages }, (_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index + 1)}
            >
              {index + 1}
            </button>
          ))}
          
          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, pagination.pages))}
            disabled={currentPage === pagination.pages}
          >
            Siguiente
          </button>
        </div>
      )}
    </div>
  );
}