import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/Login';
import CategoriesPage from './pages/Categorias';
import PiezasPage from './pages/PiezasPage';
import SuministrosPage from './pages/SuministrosPage';
import ProveedoresPage from './pages/ProveedoresPage';
import DashboardPage from './pages/DashboardPage';
import Layout from './components/Layout';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<Layout />}>
          <Route path="/categorias" element={<CategoriesPage />} />
          <Route path="/piezas" element={<PiezasPage />} />
          <Route path="/proveedores" element={<ProveedoresPage />} />
          <Route path="/suministros" element={<SuministrosPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;