import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { Lock, Loader2 } from 'lucide-react';
import { loginAdmin, guardarTokenAdmin } from '@/lib/api';
import { useToast } from '@/lib/utils';

export default function AdminLogin() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');

  const mutation = useMutation({
    mutationFn: () => loginAdmin(usuario, password),
    onSuccess: (data) => {
      guardarTokenAdmin(data.token);
      navigate('/admin');
    },
    onError: (error) => {
      toast({
        title: 'No se pudo iniciar sesión',
        description: error?.response?.data?.error || 'Verifica tus credenciales.',
        variant: 'destructive',
      });
    },
  });

  const onSubmit = (e) => {
    e.preventDefault();
    mutation.mutate();
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <form onSubmit={onSubmit} className="glass rounded-2xl p-8 w-full max-w-sm">
        <div className="w-12 h-12 rounded-xl bg-primary/15 flex items-center justify-center mb-4">
          <Lock className="text-primary" size={22} />
        </div>
        <h1 className="text-xl font-bold mb-1">Panel de administración</h1>
        <p className="text-muted text-sm mb-6">Acceso restringido al equipo de RC Arena</p>

        <div className="space-y-4">
          <div>
            <label className="text-sm text-muted mb-1 block">Usuario</label>
            <input
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
              required
              className="w-full glass rounded-xl px-4 py-2.5 bg-transparent outline-none focus:border-primary border border-transparent"
              autoComplete="username"
            />
          </div>
          <div>
            <label className="text-sm text-muted mb-1 block">Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full glass rounded-xl px-4 py-2.5 bg-transparent outline-none focus:border-primary border border-transparent"
              autoComplete="current-password"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={mutation.isPending}
          className="mt-6 w-full bg-primary hover:bg-primary/90 disabled:opacity-60 text-white font-semibold py-2.5 rounded-full flex items-center justify-center gap-2"
        >
          {mutation.isPending && <Loader2 className="animate-spin" size={16} />}
          Ingresar
        </button>
      </form>
    </div>
  );
}
