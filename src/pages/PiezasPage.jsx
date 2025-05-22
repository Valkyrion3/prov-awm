import { useQuery } from '@tanstack/react-query';
import { getPiezas } from '../api/piezas';
import { useState } from 'react';

export default function PiezasPage() {
  const [page, setPage] = useState(1);
  const { data, isLoading, isError } = useQuery({
    queryKey: ['piezas', page],
    queryFn: () => getPiezas(page),
  });

  if (isLoading) return <div>Cargando piezas...</div>;
  if (isError) return <div>Error al cargar piezas</div>;

  return (
    <div className="piezas-container">
      <h1>Listado de Piezas</h1>
      
      <table className="piezas-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Categoría</th>
            <th>Precio</th>
            <th>Stock</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          {data.data.map(pieza => (
            <tr key={pieza.idPieza}>
              <td>{pieza.idPieza}</td>
              <td>{pieza.nombre}</td>
              <td>{pieza.categoria}</td>
              <td>${pieza.precio.toFixed(2)}</td>
              <td>{pieza.stock}</td>
              <td>
                <span className={`status-badge ${pieza.estado === 1 ? 'active' : 'completed'}`}>
                    {pieza.estado ? 'Activo' : 'Inactivo'}
                  </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Paginación */}
      {data.pagination && (
        <div className="pagination-controls">
          <button 
            onClick={() => setPage(p => Math.max(1, p - 1))} 
            disabled={page === 1}
            className="pagination-btn"
          >
            &laquo; Anterior
          </button>
          
          <span className="page-info">
            Página {data.pagination.current_page} de {data.pagination.last_page}
          </span>
          
          <button 
            onClick={() => setPage(p => p + 1)} 
            disabled={page === data.pagination.last_page}
            className="pagination-btn"
          >
            Siguiente &raquo;
          </button>
        </div>
      )}
    </div>
  );
}