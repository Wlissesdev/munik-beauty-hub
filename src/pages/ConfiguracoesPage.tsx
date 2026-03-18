import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

export default function ConfiguracoesPage() {
  const { signOut, user } = useAuth();

  return (
    <div className="space-y-8 max-w-2xl">
      <div>
        <h1 className="text-3xl font-display font-bold text-foreground">Configurações</h1>
        <p className="text-sm font-body text-muted-foreground mt-1">Gerencie seu salão e perfil</p>
      </div>

      {/* Salon settings */}
      <div className="bg-card rounded-lg p-6 card-shadow space-y-4">
        <h3 className="font-display text-lg font-semibold text-foreground">Meu salão</h3>
        <div className="grid gap-4">
          <div className="space-y-2">
            <Label className="font-body text-sm">Nome do salão</Label>
            <Input className="font-body" defaultValue="Meu Salão" />
          </div>
          <div className="space-y-2">
            <Label className="font-body text-sm">Endereço</Label>
            <Input className="font-body" placeholder="Rua, número, bairro..." />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label className="font-body text-sm">Telefone</Label>
              <Input className="font-body" placeholder="(11) 99999-9999" />
            </div>
            <div className="space-y-2">
              <Label className="font-body text-sm">Instagram</Label>
              <Input className="font-body" placeholder="@meusalao" />
            </div>
          </div>
        </div>
        <Button onClick={() => toast.success('Salão atualizado! ✓')} className="bg-primary hover:bg-primary/90 text-primary-foreground font-body">
          Salvar
        </Button>
      </div>

      {/* Profile */}
      <div className="bg-card rounded-lg p-6 card-shadow space-y-4">
        <h3 className="font-display text-lg font-semibold text-foreground">Meu perfil</h3>
        <div className="grid gap-4">
          <div className="space-y-2">
            <Label className="font-body text-sm">Nome</Label>
            <Input className="font-body" defaultValue="" />
          </div>
          <div className="space-y-2">
            <Label className="font-body text-sm">E-mail</Label>
            <Input className="font-body" disabled value={user?.email || ''} />
          </div>
        </div>
        <Button onClick={() => toast.success('Perfil atualizado! ✓')} className="bg-primary hover:bg-primary/90 text-primary-foreground font-body">
          Salvar
        </Button>
      </div>

      {/* Notifications */}
      <div className="bg-card rounded-lg p-6 card-shadow space-y-4">
        <h3 className="font-display text-lg font-semibold text-foreground">Notificações</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-body font-medium text-foreground">Estoque baixo</p>
              <p className="text-xs font-body text-muted-foreground">Receber alerta quando produtos atingirem estoque mínimo</p>
            </div>
            <Switch defaultChecked />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-body font-medium text-foreground">Clientes inativos</p>
              <p className="text-xs font-body text-muted-foreground">Resumo semanal de clientes sem retorno</p>
            </div>
            <Switch defaultChecked />
          </div>
        </div>
      </div>

      {/* Logout */}
      <Button variant="outline" onClick={signOut} className="font-body text-destructive border-destructive/30 hover:bg-destructive/5">
        Sair da conta
      </Button>
    </div>
  );
}
