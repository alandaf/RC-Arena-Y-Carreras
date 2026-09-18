import { Routes, Route } from 'react-router-dom';
import { ToastProvider } from '@/lib/utils';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppFAB from '@/components/WhatsAppFAB';
import Home from '@/pages/Home';
import Reservas from '@/pages/Reservas';
import Experiencia from '@/pages/Experiencia';
import Contacto from '@/pages/Contacto';
import AdminLogin from '@/pages/AdminLogin';
import AdminDashboard from '@/pages/AdminDashboard';
import ProtectedRoute from '@/components/ProtectedRoute';

export default function App() {
  return (
    <ToastProvider>
      <div className="min-h-screen bg-dark flex flex-col">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/reservas" element={<Reservas />} />
            <Route path="/experiencia" element={<Experiencia />} />
            <Route path="/contacto" element={<Contacto />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>
        <Footer />
        <WhatsAppFAB />
      </div>
    </ToastProvider>
  );
}
