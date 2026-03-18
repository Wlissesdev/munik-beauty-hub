import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  description?: string;
  variant?: 'default' | 'danger' | 'success';
}

export function MetricCard({ title, value, icon: Icon, description, variant = 'default' }: MetricCardProps) {
  return (
    <div className="bg-card rounded-lg p-6 card-shadow transition-all duration-200 hover:card-shadow-hover hover:-translate-y-0.5">
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <p className="text-sm font-body text-muted-foreground">{title}</p>
          <p className={cn(
            "text-2xl font-display font-semibold",
            variant === 'danger' && 'text-destructive',
            variant === 'success' && 'text-success',
            variant === 'default' && 'text-foreground'
          )}>
            {value}
          </p>
          {description && (
            <p className="text-xs font-body text-muted-foreground">{description}</p>
          )}
        </div>
        <div className={cn(
          "w-10 h-10 rounded-lg flex items-center justify-center",
          variant === 'danger' && 'bg-destructive/10',
          variant === 'success' && 'bg-success/10',
          variant === 'default' && 'bg-primary/10'
        )}>
          <Icon className={cn(
            "w-5 h-5",
            variant === 'danger' && 'text-destructive',
            variant === 'success' && 'text-success',
            variant === 'default' && 'text-primary'
          )} strokeWidth={1.5} />
        </div>
      </div>
    </div>
  );
}
