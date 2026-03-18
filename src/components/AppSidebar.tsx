import { useNavigate } from 'react-router-dom';
import { Home, Users, Calendar, Scissors, Package, Megaphone, Settings } from 'lucide-react';
import { NavLink } from '@/components/NavLink';

const navItems = [
  { title: 'Dashboard', url: '/dashboard', icon: Home },
  { title: 'Clientes', url: '/clientes', icon: Users },
  { title: 'Agendamentos', url: '/agendamentos', icon: Calendar },
  { title: 'Serviços', url: '/servicos', icon: Scissors },
  { title: 'Produtos', url: '/produtos', icon: Package },
  { title: 'Campanhas', url: '/campanhas', icon: Megaphone },
  { title: 'Configurações', url: '/configuracoes', icon: Settings },
];

const mobileNavItems = navItems.slice(0, 5);

interface AppSidebarProps {
  salonName?: string;
  ownerName?: string;
}

export function AppSidebar({ salonName = 'Meu Salão', ownerName = 'Proprietário' }: AppSidebarProps) {
  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex flex-col w-64 border-r border-border bg-card h-screen sticky top-0">
        <div className="p-6 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-body font-semibold text-sm">
                {ownerName.charAt(0)}
              </span>
            </div>
            <div className="min-w-0">
              <p className="font-body font-semibold text-sm text-foreground truncate">{salonName}</p>
              <p className="font-body text-xs text-muted-foreground truncate">{ownerName}</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.url}
              to={item.url}
              end={item.url === '/dashboard'}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-body text-muted-foreground transition-all duration-200 hover:bg-accent hover:text-foreground"
              activeClassName="bg-primary/10 text-primary font-medium"
            >
              <item.icon className="w-5 h-5" strokeWidth={1.5} />
              <span>{item.title}</span>
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-border">
          <p className="font-display text-lg text-primary text-center tracking-tight">munik</p>
        </div>
      </aside>

      {/* Mobile bottom nav */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border flex justify-around items-center h-16 px-2">
        {mobileNavItems.map((item) => (
          <NavLink
            key={item.url}
            to={item.url}
            end={item.url === '/dashboard'}
            className="flex flex-col items-center gap-1 px-2 py-1.5 text-muted-foreground transition-colors"
            activeClassName="text-primary"
          >
            <item.icon className="w-5 h-5" strokeWidth={1.5} />
            <span className="text-[10px] font-body">{item.title}</span>
          </NavLink>
        ))}
      </nav>
    </>
  );
}
