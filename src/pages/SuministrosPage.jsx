import { useQuery } from '@tanstack/react-query';
import { getSuministros } from '../api/suministros';
import { useState } from 'react';
import { es } from 'date-fns/locale';
import { format } from 'date-fns';

export default function SuministrosPage() {
  const [page, setPage] = useState(1);
  const { data, isLoading, isError } = useQuery({
    queryKey: ['suministros', page],
    queryFn: () => getSuministros(page),
  });

  if (isLoading) return <div className="loading">Cargando suministros...</div>;
  if (isError) return <div className="error">Error al cargar suministros</div>;

  const formatFecha = (fecha) => {
    return format(new Date(fecha), 'PPP', { locale: es });
  };

  return (
    <div className="suministros-container">
      <h1>Gestión de Suministros</h1>
      
      <div className="table-responsive">
        <table className="suministros-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Proveedor</th>
              <th>Fecha</th>
              <th>Monto</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {data.data.map(suministro => (
              <tr key={suministro.id}>
                <td>{suministro.id}</td>
                <td>{suministro.proveedor}</td>
                <td>{formatFecha(suministro.fecha)}</td>
                <td>${suministro.monto}</td>
                <td>
                  <span className={`status-badge ${suministro.estado_raw === 1 ? 'active' : 'completed'}`}>
                    {suministro.estado}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

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