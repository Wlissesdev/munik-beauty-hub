import { useState } from 'react';
import { Plus, AlertTriangle, Pencil, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { toast } from 'sonner';

interface Product {
  id: string;
  name: string;
  brand: string;
  category: string;
  stock: number;
  minStock: number;
  costPrice: number;
}

const mockProducts: Product[] = [
  { id: '1', name: 'Loreal Inoa 6.0', brand: 'Loreal', category: 'Coloração', stock: 3, minStock: 5, costPrice: 45 },
  { id: '2', name: 'Oxidante 20vol', brand: 'Wella', category: 'Coloração', stock: 8, minStock: 3, costPrice: 18 },
  { id: '3', name: 'Máscara Nutritiva 500g', brand: 'Kerastase', category: 'Tratamento', stock: 2, minStock: 2, costPrice: 89 },
  { id: '4', name: 'Spray Fixador', brand: 'Redken', category: 'Finalização', stock: 12, minStock: 4, costPrice: 55 },
  { id: '5', name: 'Shampoo Matizador', brand: 'Loreal', category: 'Tratamento', stock: 1, minStock: 3, costPrice: 32 },
];

function formatCurrency(value: number) {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

export default function ProdutosPage() {
  const [sheetOpen, setSheetOpen] = useState(false);
  const lowStock = mockProducts.filter((p) => p.stock <= p.minStock);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold text-foreground">Produtos</h1>
          <p className="text-sm font-body text-muted-foreground mt-1">{mockProducts.length} produtos cadastrados</p>
        </div>
        <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
          <SheetTrigger asChild>
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-body gap-2">
              <Plus className="w-4 h-4" />
              Novo produto
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle className="font-display text-xl">Novo produto</SheetTitle>
            </SheetHeader>
            <form onSubmit={(e) => { e.preventDefault(); toast.success('Produto salvo! ✓'); setSheetOpen(false); }} className="space-y-4 mt-6">
              <div className="space-y-2">
                <Label className="font-body text-sm">Nome *</Label>
                <Input required className="font-body" placeholder="Ex: Loreal Inoa 6.0" />
              </div>
              <div className="space-y-2">
                <Label className="font-body text-sm">Marca</Label>
                <Input className="font-body" placeholder="Ex: Loreal" />
              </div>
              <div className="space-y-2">
                <Label className="font-body text-sm">Categoria</Label>
                <Select>
                  <SelectTrigger className="font-body"><SelectValue placeholder="Selecione..." /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="coloracao">Coloração</SelectItem>
                    <SelectItem value="tratamento">Tratamento</SelectItem>
                    <SelectItem value="finalizacao">Finalização</SelectItem>
                    <SelectItem value="outro">Outro</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div className="space-y-2">
                  <Label className="font-body text-sm">Estoque</Label>
                  <Input type="number" min={0} className="font-body font-data" placeholder="0" />
                </div>
                <div className="space-y-2">
                  <Label className="font-body text-sm">Mín.</Label>
                  <Input type="number" min={0} className="font-body font-data" placeholder="3" />
                </div>
                <div className="space-y-2">
                  <Label className="font-body text-sm">Custo (R$)</Label>
                  <Input type="number" min={0} step={0.01} className="font-body font-data" placeholder="45" />
                </div>
              </div>
              <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-body">Salvar produto</Button>
            </form>
          </SheetContent>
        </Sheet>
      </div>

      {/* Low stock alert */}
      {lowStock.length > 0 && (
        <div className="bg-destructive/5 border border-destructive/20 rounded-lg p-4 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-destructive mt-0.5" strokeWidth={1.5} />
          <div>
            <p className="text-sm font-body font-semibold text-foreground">Estoque baixo</p>
            <p className="text-sm font-body text-muted-foreground">
              {lowStock.map((p) => p.name).join(', ')} — abaixo do estoque mínimo.
            </p>
          </div>
        </div>
      )}

      <div className="bg-card rounded-lg card-shadow overflow-hidden">
        <div className="hidden sm:grid grid-cols-6 gap-4 px-6 py-3 border-b border-border">
          <p className="text-xs font-body font-medium text-muted-foreground uppercase tracking-wide col-span-2">Produto</p>
          <p className="text-xs font-body font-medium text-muted-foreground uppercase tracking-wide">Categoria</p>
          <p className="text-xs font-body font-medium text-muted-foreground uppercase tracking-wide">Estoque</p>
          <p className="text-xs font-body font-medium text-muted-foreground uppercase tracking-wide">Custo</p>
          <p className="text-xs font-body font-medium text-muted-foreground uppercase tracking-wide text-right">Ações</p>
        </div>
        {mockProducts.map((product) => (
          <div key={product.id} className="grid grid-cols-1 sm:grid-cols-6 gap-2 sm:gap-4 px-6 py-4 border-b border-border last:border-0 items-center hover:bg-accent/50 transition-colors">
            <div className="col-span-2">
              <span className="font-body font-medium text-sm text-foreground">{product.name}</span>
              <p className="text-xs font-body text-muted-foreground">{product.brand}</p>
            </div>
            <span className="text-sm font-body text-muted-foreground">{product.category}</span>
            <div className="flex items-center gap-2">
              <span className={`text-sm font-data ${product.stock <= product.minStock ? 'text-destructive font-medium' : 'text-foreground'}`}>
                {product.stock} un.
              </span>
              {product.stock <= product.minStock && (
                <AlertTriangle className="w-3.5 h-3.5 text-destructive" strokeWidth={1.5} />
              )}
            </div>
            <span className="text-sm font-data text-foreground">{formatCurrency(product.costPrice)}</span>
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
                    <AlertDialogAction onClick={() => toast.success('Produto removido')} className="bg-destructive hover:bg-destructive/90 font-body">Excluir</AlertDialogAction>
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
