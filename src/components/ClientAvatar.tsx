import { cn } from '@/lib/utils';

interface ClientAvatarProps {
  name: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const colors = [
  'bg-primary',
  'bg-success',
  'bg-warning',
  'bg-destructive',
];

function getColorForName(name: string) {
  const index = name.charCodeAt(0) % colors.length;
  return colors[index];
}

export function ClientAvatar({ name, size = 'md', className }: ClientAvatarProps) {
  const initials = name
    .split(' ')
    .map((n) => n.charAt(0))
    .slice(0, 2)
    .join('')
    .toUpperCase();

  const sizeClasses = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-14 h-14 text-lg',
  };

  return (
    <div className={cn(
      'rounded-full flex items-center justify-center font-body font-semibold text-primary-foreground',
      getColorForName(name),
      sizeClasses[size],
      className
    )}>
      {initials}
    </div>
  );
}
