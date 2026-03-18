import { useState } from 'react';
import { Search, Plus, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ClientAvatar } from '@/components/ClientAvatar';
import { StatusBadge } from '@/components/StatusBadge';
import { EmptyState } from '@/components/EmptyState';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';

interface Client {
  id: string;
  name: string;
  phone: string;
  email?: string;
  lastService?: string;
  lastVisitDate?: string;
  totalSpent: number;
  status: 'ativo' | 'em_risco' | 'inativo';
}

const mockClients: Client[] = [
  { id: '1', name: 'Maria Silva', phone: '(11) 99999-8888', email: 'maria@email.com', lastService: 'Coloração', lastVisitDate: '10/03/2026', totalSpent: 2450, status: 'ativo' },
  { id: '2', name: 'Ana Souza', phone: '(11) 98888-7777', lastService: 'Corte + Escova', lastVisitDate: '05/03/2026', totalSpent: 1890, status: 'ativo' },
  { id: '3', name: 'Juliana Costa', phone: '(21) 97777-6666', lastService: 'Manicure', lastVisitDate: '15/02/2026', totalSpent: 980, status: 'em_risco' },
  { id: '4', name: 'Carla Mendes', phone: '(11) 96666-5555', lastService: 'Progressiva', lastVisitDate: '15/01/2026', totalSpent: 3200, status: 'inativo' },
  { id: '5', name: 'Fernanda Lima', phone: '(31) 95555-4444', lastService: 'Escova', lastVisitDate: '01/03/2026', totalSpent: 560, status: 'ativo' },
];

function formatCurrency(value: number) {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function openWhatsApp(phone: string) {
  const digits = phone.replace(/\D/g, '');
  window.open(`https://wa.me/55${digits}`, '_blank');
}

export default function ClientesPage() {
  const [search, setSearch] = useState('');
  const [sheetOpen, setSheetOpen] = useState(false);

  const filtered = mockClients.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.phone.includes(search)
  );

  const handleNewClient = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast.success('Cliente salvo! ✓');
    setSheetOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold text-foreground">Clientes</h1>
          <p className="text-sm font-body text-muted-foreground mt-1">{mockClients.length} clientes cadastrados</p>
        </div>

        <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
          <SheetTrigger asChild>
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-body gap-2">
              <Plus className="w-4 h-4" />
              Novo cliente
            </Button>
          </SheetTrigger>
          <SheetContent className="overflow-y-auto">
            <SheetHeader>
              <SheetTitle className="font-display text-xl">Novo cliente</SheetTitle>
            </SheetHeader>
            <form onSubmit={handleNewClient} className="space-y-4 mt-6">
              <div className="space-y-2">
                <Label className="font-body text-sm">Nome completo *</Label>
                <Input required className="font-body" placeholder="Ex: Maria Silva" />
              </div>
              <div className="space-y-2">
                <Label className="font-body text-sm">Telefone com DDD *</Label>
                <Input required className="font-body" placeholder="(11) 99999-9999" />
              </div>
              <div className="space-y-2">
                <Label className="font-body text-sm">E-mail</Label>
                <Input type="email" className="font-body" placeholder="maria@email.com" />
              </div>
              <div className="space-y-2">
                <Label className="font-body text-sm">Data de nascimento</Label>
                <Input type="date" className="font-body font-data" />
              </div>
              <div className="space-y-2">
                <Label className="font-body text-sm">Como nos conheceu?</Label>
                <Select>
                  <SelectTrigger className="font-body">
                    <SelectValue placeholder="Selecione..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="instagram">Instagram</SelectItem>
                    <SelectItem value="indicacao">Indicação</SelectItem>
                    <SelectItem value="google">Google</SelectItem>
                    <SelectItem value="passando">Passando na rua</SelectItem>
                    <SelectItem value="outro">Outro</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="font-body text-sm">Observações</Label>
                <Textarea className="font-body" placeholder="Alergias, preferências, notas..." rows={3} />
              </div>
              <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-body">
                Salvar cliente
              </Button>
            </form>
          </SheetContent>
        </Sheet>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Buscar por nome ou telefone..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10 font-body"
        />
      </div>

      {/* Client list */}
      {filtered.length === 0 ? (
        <EmptyState
          title="Nenhum cliente encontrado"
          description="Cadastre seu primeiro cliente e comece a construir seu histórico."
          actionLabel="Adicionar cliente"
          onAction={() => setSheetOpen(true)}
        />
      ) : (
        <div className="space-y-2">
          {filtered.map((client) => (
            <div
              key={client.id}
              className="bg-card rounded-lg p-4 card-shadow flex items-center gap-4 transition-all duration-200 hover:card-shadow-hover hover:-translate-y-0.5 cursor-pointer"
            >
              <ClientAvatar name={client.name} />
              <div className="flex-1 min-w-0 grid grid-cols-1 sm:grid-cols-4 gap-1 sm:gap-4 sm:items-center">
                <div>
                  <p className="text-sm font-body font-semibold text-foreground truncate">{client.name}</p>
                  <p className="text-xs font-body text-muted-foreground">{client.phone}</p>
                </div>
                <div className="hidden sm:block">
                  <p className="text-xs font-body text-muted-foreground">Último serviço</p>
                  <p className="text-sm font-body text-foreground">{client.lastService}</p>
                </div>
                <div className="hidden sm:block">
                  <p className="text-xs font-body text-muted-foreground">Total gasto</p>
                  <p className="text-sm font-data text-foreground">{formatCurrency(client.totalSpent)}</p>
                </div>
                <div className="flex items-center gap-2 justify-end">
                  <StatusBadge status={client.status} />
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={(e) => { e.stopPropagation(); openWhatsApp(client.phone); }}
                    className="text-muted-foreground hover:text-success"
                  >
                    <MessageSquare className="w-4 h-4" strokeWidth={1.5} />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
