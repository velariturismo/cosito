
import React from 'react';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import HomePage from './pages/HomePage';
import { Toaster } from '@/components/ui/toaster';
import { AdminDataProvider } from '@/contexts/AdminDataContext';
import AdminLayout from '@/components/admin/AdminLayout';
import DashboardPage from '@/pages/admin/DashboardPage';
import ClientesPage from '@/pages/admin/ClientesPage';
import PaquetesPage from '@/pages/admin/PaquetesPage';
import ReservasPage from '@/pages/admin/ReservasPage';
import ProveedoresPage from '@/pages/admin/ProveedoresPage';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/admin"
          element={
            <AdminDataProvider>
              <AdminLayout />
            </AdminDataProvider>
          }
        >
          <Route index element={<DashboardPage />} />
          <Route path="clientes" element={<ClientesPage />} />
          <Route path="paquetes" element={<PaquetesPage />} />
          <Route path="reservas" element={<ReservasPage />} />
          <Route path="proveedores" element={<ProveedoresPage />} />
        </Route>
      </Routes>
      <Toaster />
    </Router>
  );
}

export default App;
