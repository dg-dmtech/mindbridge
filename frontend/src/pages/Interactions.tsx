import { useState } from 'react';
import { Link } from 'react-router-dom';
import { MainLayout } from '@/components/layout/MainLayout';
import { mockInteractions, mockPatients, mockProvocations } from '@/data/mockData';
import { formatDistanceToNow, format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { 
  MessageCircle, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  Filter,
  ChevronRight
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const sentimentConfig = {
  positive: { label: 'Positivo', color: 'bg-success/10 text-success' },
  neutral: { label: 'Neutro', color: 'bg-muted text-muted-foreground' },
  negative: { label: 'Atenção', color: 'bg-warning/10 text-warning' },
  concerning: { label: 'Crítico', color: 'bg-destructive/10 text-destructive' },
};

const Interactions = () => {
  const [filter, setFilter] = useState<'all' | 'pending' | 'responded'>('all');

  const sortedInteractions = [...mockInteractions]
    .sort((a, b) => new Date(b.sentAt).getTime() - new Date(a.sentAt).getTime());

  const filteredInteractions = sortedInteractions.filter((interaction) => {
    if (filter === 'pending') return !interaction.respondedAt;
    if (filter === 'responded') return !!interaction.respondedAt;
    return true;
  });

  const pendingCount = mockInteractions.filter((i) => !i.respondedAt).length;
  const respondedCount = mockInteractions.filter((i) => i.respondedAt).length;

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="animate-fade-in">
          <h1 className="font-serif text-3xl font-semibold text-foreground">
            Interações
          </h1>
          <p className="mt-1 text-muted-foreground">
            Acompanhe todas as provocações enviadas e respostas recebidas
          </p>
        </div>

        {/* Stats */}
        <div className="flex gap-4 animate-slide-up">
          <div className="flex items-center gap-2 rounded-full bg-card border border-border px-4 py-2">
            <Clock className="h-4 w-4 text-warning" />
            <span className="text-sm font-medium">{pendingCount} pendentes</span>
          </div>
          <div className="flex items-center gap-2 rounded-full bg-card border border-border px-4 py-2">
            <CheckCircle2 className="h-4 w-4 text-success" />
            <span className="text-sm font-medium">{respondedCount} respondidas</span>
          </div>
        </div>

        {/* Filters */}
        <div className="flex gap-2 animate-slide-up [animation-delay:50ms]">
          <Button
            variant={filter === 'all' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter('all')}
          >
            Todas
          </Button>
          <Button
            variant={filter === 'pending' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter('pending')}
          >
            Pendentes
          </Button>
          <Button
            variant={filter === 'responded' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter('responded')}
          >
            Respondidas
          </Button>
        </div>

        {/* Interactions List */}
        <div className="space-y-4">
          {filteredInteractions.map((interaction, index) => {
            const patient = mockPatients.find((p) => p.id === interaction.patientId);
            const provocation = mockProvocations.find((p) => p.id === interaction.provocationId);
            const hasResponse = !!interaction.respondedAt;

            return (
              <Link
                key={interaction.id}
                to={`/patients/${interaction.patientId}`}
                className={cn(
                  'block rounded-2xl border border-border bg-card p-6 shadow-sm transition-all duration-300',
                  'hover:border-primary/20 hover:shadow-md',
                  'animate-scale-in'
                )}
                style={{ animationDelay: `${index * 30}ms` }}
              >
                <div className="flex items-start gap-4">
                  {/* Avatar */}
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary/20 to-primary/5 text-sm font-semibold text-primary">
                    {patient?.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
                  </div>

                  <div className="flex-1 min-w-0">
                    {/* Header */}
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <h3 className="font-medium text-card-foreground">
                          {patient?.name}
                        </h3>
                        <Badge variant="outline">{provocation?.theme}</Badge>
                      </div>
                      <div className="flex items-center gap-3">
                        {hasResponse ? (
                          <span className="flex items-center gap-1.5 text-xs text-success">
                            <CheckCircle2 className="h-3 w-3" />
                            Respondido
                          </span>
                        ) : (
                          <span className="flex items-center gap-1.5 text-xs text-muted-foreground animate-pulse-soft">
                            <Clock className="h-3 w-3" />
                            Aguardando
                          </span>
                        )}
                        <ChevronRight className="h-5 w-5 text-muted-foreground" />
                      </div>
                    </div>

                    {/* Timestamp */}
                    <p className="mt-1 text-xs text-muted-foreground">
                      Enviado {formatDistanceToNow(new Date(interaction.sentAt), {
                        addSuffix: true,
                        locale: ptBR,
                      })}
                      {' • '}
                      {format(new Date(interaction.sentAt), "dd/MM 'às' HH:mm", { locale: ptBR })}
                    </p>

                    {/* Provocation */}
                    <div className="mt-3 rounded-lg bg-accent/30 p-3">
                      <p className="text-sm text-card-foreground line-clamp-2">
                        {interaction.provocationText}
                      </p>
                    </div>

                    {/* Response */}
                    {interaction.response && (
                      <div className="mt-3 rounded-lg bg-primary/5 p-3 border-l-4 border-primary">
                        <p className="text-sm text-card-foreground line-clamp-2">
                          "{interaction.response}"
                        </p>
                        {interaction.sentiment && (
                          <span className={cn(
                            'mt-2 inline-block rounded-full px-2 py-0.5 text-xs font-medium',
                            sentimentConfig[interaction.sentiment].color
                          )}>
                            {sentimentConfig[interaction.sentiment].label}
                          </span>
                        )}
                      </div>
                    )}

                    {/* Notes Alert */}
                    {interaction.notes && (
                      <div className="mt-3 flex items-center gap-2 text-xs text-warning">
                        <AlertCircle className="h-3 w-3" />
                        <span className="font-medium">Nota:</span>
                        <span className="truncate">{interaction.notes}</span>
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {filteredInteractions.length === 0 && (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border py-16">
            <MessageCircle className="h-12 w-12 text-muted-foreground/50" />
            <h3 className="mt-4 font-medium text-foreground">Nenhuma interação encontrada</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Ajuste os filtros para ver outras interações
            </p>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default Interactions;
