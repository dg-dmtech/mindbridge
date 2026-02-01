import { mockInteractions, mockPatients, mockProvocations } from '@/data/mockData';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { MessageCircle, Clock, CheckCircle2, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

const sentimentConfig = {
  positive: { label: 'Positivo', color: 'bg-success/10 text-success' },
  neutral: { label: 'Neutro', color: 'bg-muted text-muted-foreground' },
  negative: { label: 'Negativo', color: 'bg-warning/10 text-warning' },
  concerning: { label: 'Atenção', color: 'bg-destructive/10 text-destructive' },
};

export function RecentInteractions() {
  const recentInteractions = mockInteractions
    .sort((a, b) => new Date(b.sentAt).getTime() - new Date(a.sentAt).getTime())
    .slice(0, 5);

  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="font-serif text-xl font-semibold text-card-foreground">
            Interações Recentes
          </h2>
          <p className="text-sm text-muted-foreground">
            Últimas provocações enviadas e respostas recebidas
          </p>
        </div>
        <MessageCircle className="h-5 w-5 text-primary" />
      </div>

      <div className="space-y-4">
        {recentInteractions.map((interaction) => {
          const patient = mockPatients.find((p) => p.id === interaction.patientId);
          const provocation = mockProvocations.find((p) => p.id === interaction.provocationId);
          const hasResponse = !!interaction.respondedAt;

          return (
            <div
              key={interaction.id}
              className="group rounded-xl border border-border/50 bg-background/50 p-4 transition-all duration-200 hover:border-primary/20 hover:shadow-sm"
            >
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-medium text-primary">
                  {patient?.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="font-medium text-card-foreground truncate">
                      {patient?.name}
                    </h3>
                    <div className="flex items-center gap-2">
                      {hasResponse ? (
                        <span className="flex items-center gap-1 text-xs text-success">
                          <CheckCircle2 className="h-3 w-3" />
                          Respondido
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          Aguardando
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <p className="mt-1 text-xs text-muted-foreground">
                    Tema: {provocation?.theme}
                  </p>
                  
                  <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                    {interaction.provocationText}
                  </p>

                  {interaction.response && (
                    <div className="mt-3 rounded-lg bg-accent/50 p-3">
                      <p className="text-sm text-accent-foreground line-clamp-2">
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

                  {interaction.notes && (
                    <div className="mt-2 flex items-start gap-2 text-xs text-warning">
                      <AlertCircle className="h-3 w-3 mt-0.5 flex-shrink-0" />
                      <span>{interaction.notes}</span>
                    </div>
                  )}

                  <p className="mt-2 text-xs text-muted-foreground">
                    {formatDistanceToNow(new Date(interaction.sentAt), {
                      addSuffix: true,
                      locale: ptBR,
                    })}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
