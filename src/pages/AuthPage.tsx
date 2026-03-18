import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        navigate('/dashboard');
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: window.location.origin },
        });
        if (error) throw error;
        toast.success('Conta criada! Verifique seu e-mail para confirmar.');
      }
    } catch (error: any) {
      toast.error(error.message || 'Ocorreu um erro');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-background">
      {/* Left branding panel */}
      <div className="hidden lg:flex flex-1 items-center justify-center bg-primary/5 relative overflow-hidden">
        <div className="text-center space-y-6 p-12 animate-fade-in">
          <h1 className="font-display text-6xl font-bold text-foreground tracking-tight">munik</h1>
          <p className="font-body text-lg text-muted-foreground max-w-md">
            O CRM feito para salões de beleza, clínicas de estética e barbearias.
          </p>
          <div className="flex gap-3 justify-center mt-8">
            {['Clientes', 'Agendamentos', 'Campanhas'].map((item) => (
              <span key={item} className="px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-body font-medium">
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Right form panel */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-sm space-y-8 animate-fade-in">
          <div className="text-center lg:text-left">
            <h2 className="font-display text-3xl font-bold text-foreground lg:hidden mb-2">munik</h2>
            <h3 className="font-display text-2xl font-semibold text-foreground">
              {isLogin ? 'Bem-vindo de volta' : 'Crie sua conta'}
            </h3>
            <p className="font-body text-sm text-muted-foreground mt-1">
              {isLogin ? 'Entre na sua conta para continuar' : 'Comece a organizar seu salão'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="font-body text-sm">E-mail</Label>
              <Input
                id="email"
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="font-body"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="font-body text-sm">Senha</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                className="font-body"
              />
            </div>
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-body font-semibold"
            >
              {loading ? 'Aguarde...' : isLogin ? 'Entrar' : 'Criar conta'}
            </Button>
          </form>

          <p className="text-center font-body text-sm text-muted-foreground">
            {isLogin ? 'Não tem conta?' : 'Já tem conta?'}{' '}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-primary font-medium hover:underline"
            >
              {isLogin ? 'Cadastre-se' : 'Fazer login'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
