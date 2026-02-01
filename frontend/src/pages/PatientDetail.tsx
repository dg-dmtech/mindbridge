import { CreateInterventionDialog } from '@/components/interventions/CreateIntervationDialog';
import { InterventionCard } from '@/components/interventions/IntervationCard';
import { MainLayout } from '@/components/layout/MainLayout';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { mockInterventions, mockPatients, mockResponses } from '@/data/mockData';
import { toast } from '@/hooks/use-toast';
import { Intervention } from '@/types';
import {
  ArrowLeft,
  Calendar,
  Clock,
  FileText,
  Mail,
  MessageSquare,
  Phone,
  TrendingUp
} from 'lucide-react';
import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';

const statusLabels = {
  active: 'Ativo',
  paused: 'Pausado',
  completed: 'Concluído',
};

const statusColors = {
  active: 'bg-success/10 text-success border-success/20',
  paused: 'bg-warning/10 text-warning border-warning/20',
  completed: 'bg-muted text-muted-foreground border-border',
};

export default function PatientDetail() {
  const { id } = useParams<{ id: string }>();
  const patient = mockPatients.find((p) => p.id === id);
  
  const [interventions, setInterventions] = useState(
    mockInterventions.filter((i) => i.patientId === id)
  );
  
  const responses = mockResponses.filter((r) => r.patientId === id);

  if (!patient) {
    return (
      <MainLayout>
        <div className="flex h-full items-center justify-center p-8">
          <p className="text-muted-foreground">Paciente não encontrado</p>
        </div>
      </MainLayout>
    );
  }

  const initials = patient.name
    .split(' ')
    .map((n) => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  const handleCreateIntervention = (intervention: Omit<Intervention, 'id' | 'createdAt'>) => {
    const newIntervention: Intervention = {
      ...intervention,
      id: String(Date.now()),
      createdAt: new Date().toISOString(),
    };
    setInterventions([...interventions, newIntervention]);
    toast({
      title: 'Intervenção criada',
      description: 'A nova intervenção foi adicionada com sucesso.',
    });
  };

  const handleToggleIntervention = (interventionId: string) => {
    setInterventions(interventions.map((i) => 
      i.id === interventionId ? { ...i, isActive: !i.isActive } : i
    ));
  };

  const handleDeleteIntervention = (interventionId: string) => {
    setInterventions(interventions.filter((i) => i.id !== interventionId));
    toast({
      title: 'Intervenção excluída',
      description: 'A intervenção foi removida com sucesso.',
    });
  };

  return (
    <MainLayout>
      <div className="p-8">
        {/* Back Button */}
        <Link
          to="/patients"
          className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors animate-fade-in"
        >
          <ArrowLeft className="h-4 w-4" />
          Voltar para pacientes
        </Link>

        {/* Patient Header */}
        <div className="mb-8 flex flex-col gap-6 rounded-xl border border-border bg-card p-6 shadow-sm-custom sm:flex-row sm:items-start animate-slide-up">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-primary/20 to-primary/5 text-2xl font-bold text-primary ring-4 ring-primary/10">
            {initials}
          </div>
          
          <div className="flex-1">
            <div className="flex items-center gap-3 flex-wrap">
              <h1 className="text-2xl font-bold text-foreground">{patient.name}</h1>
              <Badge variant="outline" className={statusColors[patient.status]}>
                {statusLabels[patient.status]}
              </Badge>
            </div>
            
            <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="h-4 w-4" />
                {patient.email}
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="h-4 w-4" />
                {patient.phone}
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                Próxima: {new Date(patient.nextSession).toLocaleDateString('pt-BR')}
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                Início: {new Date(patient.startDate).toLocaleDateString('pt-BR')}
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="interventions" className="animate-slide-up" style={{ animationDelay: '100ms' }}>
          <TabsList className="mb-6">
            <TabsTrigger value="interventions" className="gap-2">
              <MessageSquare className="h-4 w-4" />
              Intervenções
            </TabsTrigger>
            <TabsTrigger value="responses" className="gap-2">
              <TrendingUp className="h-4 w-4" />
              Respostas
            </TabsTrigger>
            <TabsTrigger value="notes" className="gap-2">
              <FileText className="h-4 w-4" />
              Anotações
            </TabsTrigger>
          </TabsList>

          <TabsContent value="interventions">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                {interventions.length} intervenção(ões) configurada(s)
              </p>
              <CreateInterventionDialog
                patientId={patient.id}
                onSave={handleCreateIntervention}
              />
            </div>
            
            <div className="grid gap-4">
              {interventions.map((intervention, index) => (
                <InterventionCard
                  key={intervention.id}
                  intervention={intervention}
                  onToggle={handleToggleIntervention}
                  onDelete={handleDeleteIntervention}
                  delay={index * 50}
                />
              ))}
              
              {interventions.length === 0 && (
                <div className="rounded-xl border border-dashed border-border bg-muted/30 p-12 text-center">
                  <MessageSquare className="mx-auto h-12 w-12 text-muted-foreground/50" />
                  <h3 className="mt-4 font-medium text-foreground">Nenhuma intervenção</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Crie uma intervenção para a IA interagir com o paciente
                  </p>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="responses">
            <div className="space-y-4">
              {responses.map((response) => {
                const intervention = mockInterventions.find((i) => i.id === response.interventionId);
                return (
                  <div key={response.id} className="rounded-xl border border-border bg-card p-5">
                    <div className="mb-2 flex items-center justify-between">
                      <span className="font-medium text-foreground">{intervention?.title}</span>
                      <span className="text-sm text-muted-foreground">
                        {new Date(response.createdAt).toLocaleDateString('pt-BR', {
                          day: '2-digit',
                          month: 'short',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </span>
                    </div>
                    <p className="text-sm text-foreground">{response.response}</p>
                  </div>
                );
              })}
              
              {responses.length === 0 && (
                <div className="rounded-xl border border-dashed border-border bg-muted/30 p-12 text-center">
                  <TrendingUp className="mx-auto h-12 w-12 text-muted-foreground/50" />
                  <h3 className="mt-4 font-medium text-foreground">Nenhuma resposta</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    As respostas do paciente aparecerão aqui
                  </p>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="notes">
            <div className="rounded-xl border border-border bg-card p-6">
              <h3 className="mb-4 font-medium text-foreground">Notas do Paciente</h3>
              <p className="text-sm text-muted-foreground">{patient.notes}</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
}
