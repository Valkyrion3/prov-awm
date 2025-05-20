import { Link, Outlet } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getProfile } from '../api/auth';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Layout() {
  const navigate = useNavigate();
  const { data: user, isLoading, isError } = useQuery({
    queryKey: ['profile'],
    queryFn: getProfile,
    retry: false
  });

  useEffect(() => {
    if (isError) {
      navigate('/login');
    }
  }, [isError, navigate]);

  if (isLoading) return <div>Cargando...</div>;

  return (
    <div className="app-layout">
      <nav className="sidebar">
        <div className="user-info">
          <h3>Bienvenido {user?.name}</h3>
          <p>{user?.email}</p>
        </div>
        
        <ul className="nav-links">
          <li>
            <Link to="/dashboard">Inicio</Link>
          </li>
          <li>
            <Link to="/categorias">Categorías</Link>
          </li>
          <li>
            <Link to="/piezas">Piezas</Link>
          </li>
          <li>
            <Link to="/proveedores">Proveedores</Link>
          </li>
          <li>
            <Link to="/suministros">Suministros</Link>
          </li>
          <li>
            <button 
              onClick={() => {
                localStorage.removeItem('auth_token');
                navigate('/login');
              }}
            >
              Cerrar sesión
            </button>
          </li>
        </ul>
      </nav>

      <main className="content">
        <Outlet />
      </main>
    </div>
  );
}