import { Link } from 'react-router-dom';
import { mockPatients } from '@/data/mockData';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { ChevronRight, Calendar, Users } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

const statusConfig = {
  active: { label: 'Ativo', variant: 'default' as const },
  inactive: { label: 'Inativo', variant: 'secondary' as const },
  pending: { label: 'Pendente', variant: 'outline' as const },
};

export function PatientsList() {
  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="font-serif text-xl font-semibold text-card-foreground">
            Pacientes
          </h2>
          <p className="text-sm text-muted-foreground">
            Visão geral dos seus pacientes ativos
          </p>
        </div>
        <Link
          to="/patients"
          className="flex items-center gap-1 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
        >
          Ver todos
          <ChevronRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="space-y-3">
        {mockPatients.slice(0, 5).map((patient, index) => (
          <Link
            key={patient.id}
            to={`/patients/${patient.id}`}
            className={cn(
              'group flex items-center gap-4 rounded-xl border border-transparent p-4 transition-all duration-200',
              'hover:border-primary/20 hover:bg-accent/30 hover:shadow-sm',
              'animate-slide-up'
            )}
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary/20 to-primary/5 text-sm font-semibold text-primary transition-transform duration-200 group-hover:scale-105">
              {patient.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="font-medium text-card-foreground truncate">
                  {patient.name}
                </h3>
                <Badge variant={statusConfig[patient.status].variant} className="text-xs">
                  {statusConfig[patient.status].label}
                </Badge>
              </div>
              
              <div className="mt-1 flex items-center gap-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  Última: {format(new Date(patient.lastSession), 'dd MMM', { locale: ptBR })}
                </span>
                <span className="flex items-center gap-1">
                  <Users className="h-3 w-3" />
                  {patient.sessionCount} sessões
                </span>
              </div>
            </div>

            <ChevronRight className="h-5 w-5 text-muted-foreground transition-transform duration-200 group-hover:translate-x-1 group-hover:text-primary" />
          </Link>
        ))}
      </div>
    </div>
  );
}
