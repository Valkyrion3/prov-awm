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
            <th>Descripción</th>
            <th>Precio</th>
            <th>Stock</th>
          </tr>
        </thead>
        <tbody>
          {data.data.map(pieza => (
            <tr key={pieza.idPieza}>
              <td>{pieza.idPieza}</td>
              <td>{pieza.nombre}</td>
              <td>{pieza.categoria}</td>
              <td>{pieza.descripcion}</td>
              <td>${pieza.precio.toFixed(2)}</td>
              <td>{pieza.stock}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Paginación */}
      {data.pagination && (
        <div className="pagination">
          <button 
            onClick={() => setPage(p => Math.max(1, p - 1))} 
            disabled={page === 1}
          >
            Anterior
          </button>
          
          <span>Página {data.pagination.current_page} de {data.pagination.last_page}</span>
          
          <button 
            onClick={() => setPage(p => p + 1)} 
            disabled={page === data.pagination.last_page}
          >
            Siguiente
          </button>
        </div>
      )}
    </div>
  );
}