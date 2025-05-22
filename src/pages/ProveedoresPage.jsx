import { useQuery } from '@tanstack/react-query';
import { getProveedores } from '../api/proveedores';
import { useState } from 'react';

export default function ProveedoresPage() {
  const [page, setPage] = useState(1);
  const { data, isLoading, isError } = useQuery({
    queryKey: ['proveedores', page],
    queryFn: () => getProveedores(page),
  });

  if (isLoading) return <div>Cargando proveedores...</div>;
  if (isError) return <div>Error al cargar proveedores</div>;

  return (
    <div className="proveedores-container">
      <h1>Listado de Proveedores</h1>
      
      <table className="proveedores-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Dirección</th>
            <th>Número</th>
            <th>Ciudad</th>
            <th>Provincia</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          {data.data.map(proveedor => (
            <tr key={proveedor.idProveedor}>
              <td>{proveedor.idProveedor}</td>
              <td>{proveedor.nombre}</td>
              <td>{proveedor.direccion}</td>
              <td>{proveedor.numero}</td>
              <td>{proveedor.ciudad}</td>
              <td>{proveedor.provincia}</td>
              <td>
                <span className={`status-badge ${proveedor.estado === 1 ? 'active' : 'completed'}`}>
                    {proveedor.estado ? 'Activo' : 'Inactivo'}
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