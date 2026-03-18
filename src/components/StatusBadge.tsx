import { cn } from '@/lib/utils';

interface StatusBadgeProps {
  status: 'ativo' | 'em_risco' | 'inativo' | 'pendente' | 'confirmado' | 'concluido' | 'cancelado';
  className?: string;
}

const statusConfig: Record<string, { label: string; className: string }> = {
  ativo: { label: 'Ativo', className: 'bg-success/10 text-success' },
  em_risco: { label: 'Em risco', className: 'bg-warning/10 text-warning' },
  inativo: { label: 'Inativo', className: 'bg-destructive/10 text-destructive' },
  pendente: { label: 'Pendente', className: 'bg-warning/10 text-warning' },
  confirmado: { label: 'Confirmado', className: 'bg-success/10 text-success' },
  concluido: { label: 'Concluído', className: 'bg-primary/10 text-primary' },
  cancelado: { label: 'Cancelado', className: 'bg-destructive/10 text-destructive' },
};

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = statusConfig[status] || statusConfig.ativo;
  return (
    <span className={cn(
      'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-body font-medium',
      config.className,
      className
    )}>
      {config.label}
    </span>
  );
}
