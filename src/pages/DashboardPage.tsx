import { Users, DollarSign, Calendar, AlertTriangle } from 'lucide-react';
import { MetricCard } from '@/components/MetricCard';
import { ClientAvatar } from '@/components/ClientAvatar';
import { StatusBadge } from '@/components/StatusBadge';
import { Button } from '@/components/ui/button';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { MessageSquare } from 'lucide-react';

const chartData = [
  { month: 'Out', clientes: 8 },
  { month: 'Nov', clientes: 12 },
  { month: 'Dez', clientes: 15 },
  { month: 'Jan', clientes: 10 },
  { month: 'Fev', clientes: 18 },
  { month: 'Mar', clientes: 22 },
];

const upcomingAppointments = [
  { id: 1, client: 'Maria Silva', service: 'Coloração', time: '09:00', status: 'confirmado' as const },
  { id: 2, client: 'Ana Souza', service: 'Corte + Escova', time: '10:30', status: 'pendente' as const },
  { id: 3, client: 'Juliana Costa', service: 'Manicure', time: '14:00', status: 'confirmado' as const },
  { id: 4, client: 'Fernanda Lima', service: 'Progressiva', time: '15:30', status: 'pendente' as const },
];

const inactiveClients = [
  { id: 1, name: 'Carla Mendes', lastVisit: '15/01/2026', phone: '11999887766' },
  { id: 2, name: 'Patrícia Rocha', lastVisit: '02/01/2026', phone: '11998776655' },
  { id: 3, name: 'Renata Dias', lastVisit: '20/12/2025', phone: '11997665544' },
];

function openWhatsApp(phone: string, name: string) {
  const message = encodeURIComponent(
    `Oi ${name.split(' ')[0]}, tudo bem? Faz um tempo que não te vemos por aqui! Que tal agendar um horário? Estamos com agenda aberta essa semana. 😊`
  );
  window.open(`https://wa.me/55${phone}?text=${message}`, '_blank');
}

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-display font-bold text-foreground">Dashboard</h1>
        <p className="text-sm font-body text-muted-foreground mt-1">Visão geral do seu salão</p>
      </div>

      {/* Metric cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard title="Clientes ativos" value={47} icon={Users} variant="success" />
        <MetricCard title="Faturamento do mês" value="R$ 12.450,00" icon={DollarSign} />
        <MetricCard title="Agendamentos hoje" value={6} icon={Calendar} />
        <MetricCard title="Clientes sem retorno" value={8} icon={AlertTriangle} variant="danger" description="Sem visita há 60+ dias" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart */}
        <div className="lg:col-span-2 bg-card rounded-lg p-6 card-shadow">
          <h3 className="font-display text-lg font-semibold text-foreground mb-4">Novos clientes por mês</h3>
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(0 0% 0% / 0.05)" />
              <XAxis dataKey="month" tick={{ fontSize: 12, fontFamily: 'DM Sans' }} stroke="hsl(43 6% 47%)" />
              <YAxis tick={{ fontSize: 12, fontFamily: 'DM Sans' }} stroke="hsl(43 6% 47%)" />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'hsl(0 0% 100%)',
                  border: '1px solid hsl(0 0% 0% / 0.07)',
                  borderRadius: '8px',
                  fontFamily: 'DM Sans',
                  fontSize: '13px',
                }}
              />
              <Line
                type="monotone"
                dataKey="clientes"
                stroke="hsl(28 42% 60%)"
                strokeWidth={2.5}
                dot={{ fill: 'hsl(28 42% 60%)', strokeWidth: 0, r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Upcoming appointments */}
        <div className="bg-card rounded-lg p-6 card-shadow">
          <h3 className="font-display text-lg font-semibold text-foreground mb-4">Próximos agendamentos</h3>
          <div className="space-y-4">
            {upcomingAppointments.map((apt) => (
              <div key={apt.id} className="flex items-center gap-3">
                <ClientAvatar name={apt.client} size="sm" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-body font-medium text-foreground truncate">{apt.client}</p>
                  <p className="text-xs font-body text-muted-foreground">{apt.service}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-data text-foreground">{apt.time}</p>
                  <StatusBadge status={apt.status} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Inactive clients */}
      <div className="bg-card rounded-lg p-6 card-shadow">
        <h3 className="font-display text-lg font-semibold text-foreground mb-1">Clientes para contatar</h3>
        <p className="text-sm font-body text-muted-foreground mb-4">Sem visita há mais de 60 dias</p>
        <div className="space-y-3">
          {inactiveClients.map((client) => (
            <div key={client.id} className="flex items-center gap-4 p-3 rounded-lg hover:bg-accent transition-colors">
              <ClientAvatar name={client.name} size="sm" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-body font-medium text-foreground">{client.name}</p>
                <p className="text-xs font-body text-muted-foreground">Última visita: {client.lastVisit}</p>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() => openWhatsApp(client.phone, client.name)}
                className="font-body text-xs gap-1.5"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                WhatsApp
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
