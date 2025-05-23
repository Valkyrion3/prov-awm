import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { getSupplies } from '../api/suministros';

export default function SuppliesPage() {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  
  const { data: response, isLoading, isError } = useQuery({
    queryKey: ['supplies', currentPage],
    queryFn: () => getSupplies(currentPage),
  });

  if (isLoading) return <p>Cargando suministros...</p>;
  if (isError) return <p>Error al cargar los suministros</p>;

  const supplies = response?.data || [];
  const pagination = response?.pagination || {
    total: 0,
    pages: 1,
    currentPage: 1,
    perPage: 10
  };

  return (
    <div>
      <div>
        <h2>Suministros</h2>
        <button
          onClick={() => navigate('/suministros/nuevo')}
        >
          + Nuevo Suministro
        </button>
      </div>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Proveedor</th>
            <th>Fecha</th>
            <th>Monto</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {supplies.map((supply) => (
            <tr key={supply.idSuministro}>
              <td>{supply.idSuministro}</td>
              <td>{supply.proveedor?.nombre}</td>
              <td>{new Date(supply.fecha).toLocaleDateString()}</td>
              <td>{supply.monto}</td>
              <td>
                <span>
                  {supply.estado ? 'Activo' : 'Inactivo'}
                </span>
              </td>
              <td>
                <button
                  onClick={() => navigate(`/suministros/editar/${supply.idSuministro}`)}
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