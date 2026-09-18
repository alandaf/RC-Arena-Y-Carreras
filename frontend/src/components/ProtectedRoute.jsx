import { Navigate } from 'react-router-dom';
import { obtenerTokenAdmin } from '@/lib/api';

export default function ProtectedRoute({ children }) {
  const token = obtenerTokenAdmin();

  if (!token) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
}
