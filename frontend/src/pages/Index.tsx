import { MainLayout } from '@/components/layout/MainLayout';
import { StatsCard } from '@/components/dashboard/StatsCard';
import { RecentInteractions } from '@/components/dashboard/RecentInteractions';
import { PatientsList } from '@/components/dashboard/PatientsList';
import { mockPatients, mockInteractions, mockProvocations } from '@/data/mockData';
import { Users, MessageCircle, Brain, TrendingUp } from 'lucide-react';

const Index = () => {
  const activePatients = mockPatients.filter((p) => p.status === 'active').length;
  const pendingResponses = mockInteractions.filter((i) => !i.respondedAt).length;
  const activeProvocations = mockProvocations.filter((p) => p.isActive).length;
  const responseRate = Math.round(
    (mockInteractions.filter((i) => i.respondedAt).length / mockInteractions.length) * 100
  );

  return (
    <MainLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="animate-fade-in">
          <h1 className="font-serif text-3xl font-semibold text-foreground">
            Bom dia, Dr. Rafael
          </h1>
          <p className="mt-2 text-muted-foreground">
            Aqui está o resumo das suas atividades terapêuticas
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <StatsCard
            title="Pacientes Ativos"
            value={activePatients}
            subtitle={`de ${mockPatients.length} total`}
            icon={<Users className="h-6 w-6" />}
            trend={{ value: 12, isPositive: true }}
            className="animate-slide-up"
          />
          <StatsCard
            title="Respostas Pendentes"
            value={pendingResponses}
            subtitle="aguardando resposta"
            icon={<MessageCircle className="h-6 w-6" />}
            className="animate-slide-up [animation-delay:100ms]"
          />
          <StatsCard
            title="Provocações Ativas"
            value={activeProvocations}
            subtitle="configuradas"
            icon={<Brain className="h-6 w-6" />}
            className="animate-slide-up [animation-delay:200ms]"
          />
          <StatsCard
            title="Taxa de Resposta"
            value={`${responseRate}%`}
            subtitle="dos pacientes"
            icon={<TrendingUp className="h-6 w-6" />}
            trend={{ value: 5, isPositive: true }}
            className="animate-slide-up [animation-delay:300ms]"
          />
        </div>

        {/* Main Content */}
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="animate-slide-up [animation-delay:400ms]">
            <PatientsList />
          </div>
          <div className="animate-slide-up [animation-delay:500ms]">
            <RecentInteractions />
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Index;
