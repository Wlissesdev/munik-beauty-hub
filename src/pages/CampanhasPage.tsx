import { Gift, UserX, MessageSquare, Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ClientAvatar } from '@/components/ClientAvatar';
import { toast } from 'sonner';

const birthdayClients = [
  { id: '1', name: 'Maria Silva', phone: '11999998888', birthDate: '22/03' },
  { id: '2', name: 'Juliana Costa', phone: '21977776666', birthDate: '05/03' },
  { id: '3', name: 'Amanda Ferreira', phone: '11988887777', birthDate: '28/03' },
];

const inactiveClients = [
  { id: '1', name: 'Carla Mendes', phone: '11966665555', lastVisit: '15/01/2026', daysAway: 62 },
  { id: '2', name: 'Patrícia Rocha', phone: '11955554444', lastVisit: '02/01/2026', daysAway: 75 },
  { id: '3', name: 'Renata Dias', phone: '11944443333', lastVisit: '20/12/2025', daysAway: 88 },
  { id: '4', name: 'Luciana Santos', phone: '11933332222', lastVisit: '10/01/2026', daysAway: 67 },
];

const salonName = 'Meu Salão';

function getBirthdayMessage(name: string) {
  return `Oi ${name.split(' ')[0]}! 🎉 A equipe do ${salonName} deseja um feliz aniversário! Como presente especial, você tem 20% de desconto em qualquer serviço este mês. Que tal agendar? 💖`;
}

function getReengagementMessage(name: string) {
  return `Oi ${name.split(' ')[0]}, tudo bem? Faz um tempo que não te vemos por aqui! Que tal agendar um horário? Estamos com agenda aberta essa semana. 😊`;
}

function openWhatsApp(phone: string, message: string) {
  window.open(`https://wa.me/55${phone}?text=${encodeURIComponent(message)}`, '_blank');
}

function copyAll(clients: { name: string; phone: string }[], getMsg: (name: string) => string) {
  const all = clients.map((c) => `${c.name} (${c.phone}):\n${getMsg(c.name)}`).join('\n\n---\n\n');
  navigator.clipboard.writeText(all);
  toast.success('Mensagens copiadas! ✓');
}

export default function CampanhasPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-display font-bold text-foreground">Campanhas</h1>
        <p className="text-sm font-body text-muted-foreground mt-1">Engaje seus clientes automaticamente</p>
      </div>

      {/* Birthday campaign */}
      <div className="bg-card rounded-lg p-6 card-shadow space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <Gift className="w-5 h-5 text-primary" strokeWidth={1.5} />
          </div>
          <div>
            <h3 className="font-display text-lg font-semibold text-foreground">Aniversariantes do mês</h3>
            <p className="text-sm font-body text-muted-foreground">
              {birthdayClients.length} clientes fazem aniversário em março
            </p>
          </div>
        </div>

        <div className="space-y-3">
          {birthdayClients.map((client) => (
            <div key={client.id} className="flex items-center gap-4 p-3 rounded-lg hover:bg-accent transition-colors">
              <ClientAvatar name={client.name} size="sm" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-body font-medium text-foreground">{client.name}</p>
                <p className="text-xs font-body text-muted-foreground">🎂 {client.birthDate}</p>
              </div>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => toast.success('Mensagem copiada!')}
                  className="font-body text-xs"
                >
                  Copiar mensagem
                </Button>
                <Button
                  size="sm"
                  onClick={() => openWhatsApp(client.phone, getBirthdayMessage(client.name))}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground font-body text-xs gap-1.5"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  WhatsApp
                </Button>
              </div>
            </div>
          ))}
        </div>

        <p className="text-xs font-body text-muted-foreground">
          💰 Se cada aniversariante retornar uma vez, estimativa de receita: <span className="font-data font-medium text-foreground">R$ 750,00</span>
        </p>
      </div>

      {/* Inactive clients campaign */}
      <div className="bg-card rounded-lg p-6 card-shadow space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-destructive/10 flex items-center justify-center">
              <UserX className="w-5 h-5 text-destructive" strokeWidth={1.5} />
            </div>
            <div>
              <h3 className="font-display text-lg font-semibold text-foreground">Clientes inativos</h3>
              <p className="text-sm font-body text-muted-foreground">
                {inactiveClients.length} clientes há 45+ dias sem visita
              </p>
            </div>
          </div>
          <Button
            variant="outline"
            onClick={() => copyAll(inactiveClients, getReengagementMessage)}
            className="font-body text-xs gap-1.5"
          >
            <Copy className="w-3.5 h-3.5" />
            Copiar todas
          </Button>
        </div>

        <div className="space-y-3">
          {inactiveClients.map((client) => (
            <div key={client.id} className="flex items-center gap-4 p-3 rounded-lg hover:bg-accent transition-colors">
              <ClientAvatar name={client.name} size="sm" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-body font-medium text-foreground">{client.name}</p>
                <p className="text-xs font-body text-muted-foreground">Última visita: {client.lastVisit} · há {client.daysAway} dias</p>
              </div>
              <Button
                size="sm"
                onClick={() => openWhatsApp(client.phone, getReengagementMessage(client.name))}
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-body text-xs gap-1.5"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                WhatsApp
              </Button>
            </div>
          ))}
        </div>

        <p className="text-xs font-body text-muted-foreground">
          💰 Se cada cliente retornar uma vez, estimativa de receita: <span className="font-data font-medium text-foreground">R$ 1.200,00</span>
        </p>
      </div>
    </div>
  );
}
