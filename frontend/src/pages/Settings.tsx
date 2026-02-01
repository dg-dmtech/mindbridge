import { MainLayout } from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { 
  User, 
  Bell, 
  Brain, 
  Shield, 
  Save,
  MessageCircle
} from 'lucide-react';

const Settings = () => {
  return (
    <MainLayout>
      <div className="max-w-3xl space-y-8">
        {/* Header */}
        <div className="animate-fade-in">
          <h1 className="font-serif text-3xl font-semibold text-foreground">
            Configurações
          </h1>
          <p className="mt-1 text-muted-foreground">
            Gerencie suas preferências e configurações da plataforma
          </p>
        </div>

        {/* Profile Section */}
        <section className="rounded-2xl border border-border bg-card p-6 shadow-sm animate-slide-up">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <User className="h-5 w-5" />
            </div>
            <div>
              <h2 className="font-serif text-xl font-semibold text-card-foreground">
                Perfil Profissional
              </h2>
              <p className="text-sm text-muted-foreground">
                Informações exibidas aos pacientes
              </p>
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">Nome Completo</Label>
              <Input id="name" defaultValue="Dr. Rafael Mendes" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="crp">CRP</Label>
              <Input id="crp" defaultValue="06/123456" />
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" defaultValue="rafael.mendes@clinica.com" />
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="bio">Apresentação</Label>
              <Textarea 
                id="bio" 
                rows={3}
                defaultValue="Psicólogo clínico com especialização em terapia cognitivo-comportamental..."
              />
            </div>
          </div>
        </section>

        {/* AI Configuration */}
        <section className="rounded-2xl border border-border bg-card p-6 shadow-sm animate-slide-up [animation-delay:100ms]">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Brain className="h-5 w-5" />
            </div>
            <div>
              <h2 className="font-serif text-xl font-semibold text-card-foreground">
                Configuração da IA
              </h2>
              <p className="text-sm text-muted-foreground">
                Personalize o comportamento da IA nas interações
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="tone">Tom de Comunicação</Label>
              <Textarea 
                id="tone" 
                rows={3}
                placeholder="Descreva o tom que a IA deve usar nas mensagens..."
                defaultValue="Empático e acolhedor, mas mantendo profissionalismo. Evite ser excessivamente formal. Use linguagem acessível."
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="instructions">Instruções Gerais</Label>
              <Textarea 
                id="instructions" 
                rows={4}
                placeholder="Instruções adicionais para a IA..."
                defaultValue="Sempre encerre as mensagens com uma pergunta reflexiva. Evite julgamentos. Se o paciente demonstrar sinais de crise, oriente a entrar em contato imediatamente."
              />
            </div>

            <div className="flex items-center justify-between rounded-lg bg-accent/50 p-4">
              <div>
                <p className="font-medium text-card-foreground">Análise de Sentimento</p>
                <p className="text-sm text-muted-foreground">
                  A IA analisa o tom emocional das respostas
                </p>
              </div>
              <Switch defaultChecked />
            </div>
          </div>
        </section>

        {/* Notifications */}
        <section className="rounded-2xl border border-border bg-card p-6 shadow-sm animate-slide-up [animation-delay:200ms]">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Bell className="h-5 w-5" />
            </div>
            <div>
              <h2 className="font-serif text-xl font-semibold text-card-foreground">
                Notificações
              </h2>
              <p className="text-sm text-muted-foreground">
                Configure quando deseja ser notificado
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between rounded-lg bg-background p-4 border border-border">
              <div>
                <p className="font-medium text-card-foreground">Nova resposta recebida</p>
                <p className="text-sm text-muted-foreground">
                  Quando um paciente responde a uma provocação
                </p>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between rounded-lg bg-background p-4 border border-border">
              <div>
                <p className="font-medium text-card-foreground">Sentimento negativo detectado</p>
                <p className="text-sm text-muted-foreground">
                  Alerta quando a IA detecta tom preocupante
                </p>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between rounded-lg bg-background p-4 border border-border">
              <div>
                <p className="font-medium text-card-foreground">Paciente sem resposta há 3 dias</p>
                <p className="text-sm text-muted-foreground">
                  Lembrete sobre pacientes inativos
                </p>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between rounded-lg bg-background p-4 border border-border">
              <div>
                <p className="font-medium text-card-foreground">Resumo semanal</p>
                <p className="text-sm text-muted-foreground">
                  Relatório com insights das interações
                </p>
              </div>
              <Switch />
            </div>
          </div>
        </section>

        {/* Save Button */}
        <div className="flex justify-end animate-slide-up [animation-delay:300ms]">
          <Button className="gap-2 shadow-glow">
            <Save className="h-4 w-4" />
            Salvar Alterações
          </Button>
        </div>
      </div>
    </MainLayout>
  );
};

export default Settings;
