import { useState } from 'react';
import { Plus, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ClientAvatar } from '@/components/ClientAvatar';
import { StatusBadge } from '@/components/StatusBadge';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';

interface Appointment {
  id: string;
  client: string;
  service: string;
  professional: string;
  date: string;
  time: string;
  status: 'pendente' | 'confirmado' | 'concluido' | 'cancelado';
}

const mockAppointments: Appointment[] = [
  { id: '1', client: 'Maria Silva', service: 'Coloração', professional: 'Camila', date: '18/03/2026', time: '09:00', status: 'confirmado' },
  { id: '2', client: 'Ana Souza', service: 'Corte + Escova', professional: 'Juliana', date: '18/03/2026', time: '10:30', status: 'pendente' },
  { id: '3', client: 'Juliana Costa', service: 'Manicure', professional: 'Patrícia', date: '18/03/2026', time: '14:00', status: 'confirmado' },
  { id: '4', client: 'Fernanda Lima', service: 'Progressiva', professional: 'Camila', date: '18/03/2026', time: '15:30', status: 'pendente' },
  { id: '5', client: 'Carla Mendes', service: 'Escova', professional: 'Juliana', date: '19/03/2026', time: '09:00', status: 'pendente' },
  { id: '6', client: 'Patrícia Rocha', service: 'Corte feminino', professional: 'Camila', date: '19/03/2026', time: '11:00', status: 'confirmado' },
];

const timeSlots = ['08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '12:00', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30', '18:00'];

export default function AgendamentosPage() {
  const [sheetOpen, setSheetOpen] = useState(false);
  const [view, setView] = useState<'list' | 'week'>('list');

  const today = mockAppointments.filter((a) => a.date === '18/03/2026');
  const tomorrow = mockAppointments.filter((a) => a.date === '19/03/2026');

  const markComplete = (id: string) => {
    toast.success('Agendamento marcado como concluído! ✓');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold text-foreground">Agendamentos</h1>
          <p className="text-sm font-body text-muted-foreground mt-1">Gerencie sua agenda</p>
        </div>
        <div className="flex gap-2">
          <div className="flex bg-muted rounded-lg p-0.5">
            <button
              onClick={() => setView('list')}
              className={`px-3 py-1.5 rounded-md text-sm font-body transition-colors ${view === 'list' ? 'bg-card text-foreground card-shadow' : 'text-muted-foreground'}`}
            >
              Lista
            </button>
            <button
              onClick={() => setView('week')}
              className={`px-3 py-1.5 rounded-md text-sm font-body transition-colors ${view === 'week' ? 'bg-card text-foreground card-shadow' : 'text-muted-foreground'}`}
            >
              Semana
            </button>
          </div>
          <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
            <SheetTrigger asChild>
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-body gap-2">
                <Plus className="w-4 h-4" />
                Novo agendamento
              </Button>
            </SheetTrigger>
            <SheetContent className="overflow-y-auto">
              <SheetHeader>
                <SheetTitle className="font-display text-xl">Novo agendamento</SheetTitle>
              </SheetHeader>
              <form onSubmit={(e) => { e.preventDefault(); toast.success('Agendamento criado! ✓'); setSheetOpen(false); }} className="space-y-4 mt-6">
                <div className="space-y-2">
                  <Label className="font-body text-sm">Cliente *</Label>
                  <Input required className="font-body" placeholder="Buscar cliente..." />
                </div>
                <div className="space-y-2">
                  <Label className="font-body text-sm">Serviço *</Label>
                  <Select>
                    <SelectTrigger className="font-body"><SelectValue placeholder="Selecione..." /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="corte">Corte feminino</SelectItem>
                      <SelectItem value="coloracao">Coloração</SelectItem>
                      <SelectItem value="escova">Escova</SelectItem>
                      <SelectItem value="progressiva">Progressiva</SelectItem>
                      <SelectItem value="manicure">Manicure</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="font-body text-sm">Profissional</Label>
                  <Input className="font-body" placeholder="Nome do profissional" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <Label className="font-body text-sm">Data *</Label>
                    <Input type="date" required className="font-body font-data" />
                  </div>
                  <div className="space-y-2">
                    <Label className="font-body text-sm">Hora *</Label>
                    <Select>
                      <SelectTrigger className="font-body font-data"><SelectValue placeholder="Hora" /></SelectTrigger>
                      <SelectContent>
                        {timeSlots.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="font-body text-sm">Observações</Label>
                  <Textarea className="font-body" placeholder="Notas sobre o agendamento..." rows={3} />
                </div>
                <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-body">Criar agendamento</Button>
              </form>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* List view */}
      {view === 'list' && (
        <div className="space-y-6">
          {[{ label: 'Hoje — 18/03', items: today }, { label: 'Amanhã — 19/03', items: tomorrow }].map((group) => (
            <div key={group.label}>
              <h3 className="font-display text-lg font-semibold text-foreground mb-3">{group.label}</h3>
              <div className="space-y-2">
                {group.items.map((apt) => (
                  <div key={apt.id} className="bg-card rounded-lg p-4 card-shadow flex items-center gap-4 transition-all duration-200 hover:card-shadow-hover">
                    <ClientAvatar name={apt.client} size="sm" />
                    <div className="flex-1 min-w-0 grid grid-cols-1 sm:grid-cols-4 gap-1 sm:gap-4 sm:items-center">
                      <div>
                        <p className="text-sm font-body font-semibold text-foreground">{apt.client}</p>
                        <p className="text-xs font-body text-muted-foreground">{apt.service}</p>
                      </div>
                      <div className="flex items-center gap-1.5 text-muted-foreground">
                        <Clock className="w-3.5 h-3.5" strokeWidth={1.5} />
                        <span className="text-sm font-data">{apt.time}</span>
                      </div>
                      <p className="text-sm font-body text-muted-foreground hidden sm:block">{apt.professional}</p>
                      <div className="flex items-center gap-2 justify-end">
                        <StatusBadge status={apt.status} />
                        {apt.status !== 'concluido' && (
                          <Button size="sm" variant="outline" onClick={() => markComplete(apt.id)} className="font-body text-xs">
                            Concluir
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Week view placeholder */}
      {view === 'week' && (
        <div className="bg-card rounded-lg p-8 card-shadow">
          <div className="grid grid-cols-7 gap-2 mb-4">
            {['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'].map((day) => (
              <div key={day} className="text-center text-xs font-body font-medium text-muted-foreground uppercase tracking-wide py-2">
                {day}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-2">
            {Array.from({ length: 7 }, (_, i) => (
              <div key={i} className="min-h-[120px] border border-border rounded-lg p-2">
                <span className="text-xs font-data text-muted-foreground">{16 + i}</span>
                {i === 2 && (
                  <div className="mt-1 space-y-1">
                    <div className="bg-primary/10 text-primary text-[10px] font-body px-1.5 py-1 rounded">09:00 Coloração</div>
                    <div className="bg-primary/10 text-primary text-[10px] font-body px-1.5 py-1 rounded">10:30 Corte</div>
                  </div>
                )}
                {i === 3 && (
                  <div className="mt-1">
                    <div className="bg-primary/10 text-primary text-[10px] font-body px-1.5 py-1 rounded">09:00 Escova</div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
