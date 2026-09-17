import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { createElement, createContext, useCallback, useContext, useState } from 'react';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const ToastContext = createContext(null);

let toastId = 0;

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const toast = useCallback(({ title, description, variant = 'default' }) => {
    const id = ++toastId;
    setToasts((prev) => [...prev, { id, title, description, variant }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4500);
  }, []);

  const toastNodes = toasts.map((t) =>
    createElement(
      'div',
      {
        key: t.id,
        className: cn(
          'glass rounded-lg p-4 shadow-lg animate-fade-up border-l-4',
          t.variant === 'destructive' ? 'border-l-primary' : 'border-l-green'
        ),
      },
      t.title && createElement('p', { className: 'font-semibold text-sm' }, t.title),
      t.description && createElement('p', { className: 'text-xs text-muted mt-1' }, t.description)
    )
  );

  const container = createElement(
    'div',
    { className: 'fixed bottom-4 right-4 z-[100] flex flex-col gap-2 w-[calc(100vw-2rem)] max-w-sm' },
    toastNodes
  );

  return createElement(ToastContext.Provider, { value: { toast } }, children, container);
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast debe usarse dentro de ToastProvider');
  return ctx;
}
