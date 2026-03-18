import { useState } from 'react';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { toast } from 'sonner';

interface Service {
  id: string;
  name: string;
  category: string;
  duration: number;
  price: number;
  active: boolean;
}

const mockServices: Service[] = [
  { id: '1', name: 'Corte feminino', category: 'Cabelo', duration: 45, price: 85, active: true },
  { id: '2', name: 'Coloração', category: 'Cabelo', duration: 120, price: 250, active: true },
  { id: '3', name: 'Escova progressiva', category: 'Cabelo', duration: 180, price: 350, active: true },
  { id: '4', name: 'Manicure', category: 'Unhas', duration: 45, price: 45, active: true },
  { id: '5', name: 'Pedicure', category: 'Unhas', duration: 50, price: 55, active: true },
  { id: '6', name: 'Limpeza de pele', category: 'Estética', duration: 60, price: 120, active: false },
  { id: '7', name: 'Design de sobrancelhas', category: 'Estética', duration: 30, price: 40, active: true },
  { id: '8', name: 'Corte masculino', category: 'Barba', duration: 30, price: 55, active: true },
];

function formatCurrency(value: number) {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

const categories = ['Cabelo', 'Estética', 'Unhas', 'Barba', 'Outro'];

export default function ServicosPage() {
  const [sheetOpen, setSheetOpen] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold text-foreground">Serviços</h1>
          <p className="text-sm font-body text-muted-foreground mt-1">{mockServices.length} serviços cadastrados</p>
        </div>
        <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
          <SheetTrigger asChild>
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-body gap-2">
              <Plus className="w-4 h-4" />
              Novo serviço
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle className="font-display text-xl">Novo serviço</SheetTitle>
            </SheetHeader>
            <form onSubmit={(e) => { e.preventDefault(); toast.success('Serviço salvo! ✓'); setSheetOpen(false); }} className="space-y-4 mt-6">
              <div className="space-y-2">
                <Label className="font-body text-sm">Nome do serviço *</Label>
                <Input required className="font-body" placeholder="Ex: Corte feminino" />
              </div>
              <div className="space-y-2">
                <Label className="font-body text-sm">Categoria *</Label>
                <Select>
                  <SelectTrigger className="font-body"><SelectValue placeholder="Selecione..." /></SelectTrigger>
                  <SelectContent>
                    {categories.map((c) => <SelectItem key={c} value={c.toLowerCase()}>{c}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label className="font-body text-sm">Duração (min) *</Label>
                  <Input type="number" required min={5} className="font-body font-data" placeholder="45" />
                </div>
                <div className="space-y-2">
                  <Label className="font-body text-sm">Preço (R$) *</Label>
                  <Input type="number" required min={0} step={0.01} className="font-body font-data" placeholder="85,00" />
                </div>
              </div>
              <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-body">Salvar serviço</Button>
            </form>
          </SheetContent>
        </Sheet>
      </div>

      <div className="bg-card rounded-lg card-shadow overflow-hidden">
        <div className="hidden sm:grid grid-cols-6 gap-4 px-6 py-3 border-b border-border">
          <p className="text-xs font-body font-medium text-muted-foreground uppercase tracking-wide col-span-2">Serviço</p>
          <p className="text-xs font-body font-medium text-muted-foreground uppercase tracking-wide">Categoria</p>
          <p className="text-xs font-body font-medium text-muted-foreground uppercase tracking-wide">Duração</p>
          <p className="text-xs font-body font-medium text-muted-foreground uppercase tracking-wide">Preço</p>
          <p className="text-xs font-body font-medium text-muted-foreground uppercase tracking-wide text-right">Ações</p>
        </div>
        {mockServices.map((service) => (
          <div key={service.id} className="grid grid-cols-1 sm:grid-cols-6 gap-2 sm:gap-4 px-6 py-4 border-b border-border last:border-0 items-center hover:bg-accent/50 transition-colors">
            <div className="col-span-2 flex items-center gap-3">
              <div className={`w-2 h-2 rounded-full ${service.active ? 'bg-success' : 'bg-muted-foreground'}`} />
              <span className="font-body font-medium text-sm text-foreground">{service.name}</span>
            </div>
            <span className="text-sm font-body text-muted-foreground">{service.category}</span>
            <span className="text-sm font-data text-muted-foreground">{service.duration} min</span>
            <span className="text-sm font-data text-foreground font-medium">{formatCurrency(service.price)}</span>
            <div className="flex items-center gap-1 justify-end">
              <Button size="icon" variant="ghost" className="h-8 w-8 text-muted-foreground hover:text-foreground">
                <Pencil className="w-3.5 h-3.5" strokeWidth={1.5} />
              </Button>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button size="icon" variant="ghost" className="h-8 w-8 text-muted-foreground hover:text-destructive">
                    <Trash2 className="w-3.5 h-3.5" strokeWidth={1.5} />
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle className="font-display">Tem certeza?</AlertDialogTitle>
                    <AlertDialogDescription className="font-body">Esta ação não pode ser desfeita.</AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel className="font-body">Cancelar</AlertDialogCancel>
                    <AlertDialogAction onClick={() => toast.success('Serviço removido')} className="bg-destructive hover:bg-destructive/90 font-body">Excluir</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
