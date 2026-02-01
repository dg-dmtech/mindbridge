import { useState } from 'react';
import { Link } from 'react-router-dom';
import { MainLayout } from '@/components/layout/MainLayout';
import { mockPatients } from '@/data/mockData';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Search, Plus, Calendar, Users, ChevronRight, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

const statusConfig = {
  active: { label: 'Ativo', variant: 'default' as const },
  inactive: { label: 'Inativo', variant: 'secondary' as const },
  pending: { label: 'Pendente', variant: 'outline' as const },
};

const Patients = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string | null>(null);

  const filteredPatients = mockPatients.filter((patient) => {
    const matchesSearch = patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = !statusFilter || patient.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between animate-fade-in">
          <div>
            <h1 className="font-serif text-3xl font-semibold text-foreground">
              Pacientes
            </h1>
            <p className="mt-1 text-muted-foreground">
              Gerencie seus pacientes e configure as provocações da IA
            </p>
          </div>
          <Button className="gap-2 shadow-glow">
            <Plus className="h-4 w-4" />
            Novo Paciente
          </Button>
        </div>

        {/* Filters */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center animate-slide-up">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Buscar pacientes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            <Button
              variant={statusFilter === null ? 'default' : 'outline'}
              size="sm"
              onClick={() => setStatusFilter(null)}
            >
              Todos
            </Button>
            <Button
              variant={statusFilter === 'active' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setStatusFilter('active')}
            >
              Ativos
            </Button>
            <Button
              variant={statusFilter === 'pending' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setStatusFilter('pending')}
            >
              Pendentes
            </Button>
            <Button
              variant={statusFilter === 'inactive' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setStatusFilter('inactive')}
            >
              Inativos
            </Button>
          </div>
        </div>

        {/* Patients Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredPatients.map((patient, index) => (
            <Link
              key={patient.id}
              to={`/patients/${patient.id}`}
              className={cn(
                'group rounded-2xl border border-border bg-card p-6 shadow-sm transition-all duration-300',
                'hover:border-primary/20 hover:shadow-md hover:-translate-y-1',
                'animate-scale-in'
              )}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-primary/20 to-primary/5 text-lg font-semibold text-primary transition-transform duration-300 group-hover:scale-110">
                    {patient.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
                  </div>
                  <div>
                    <h3 className="font-medium text-card-foreground">
                      {patient.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {patient.email}
                    </p>
                  </div>
                </div>
                <Badge variant={statusConfig[patient.status].variant}>
                  {statusConfig[patient.status].label}
                </Badge>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-4 border-t border-border pt-4">
                <div>
                  <p className="text-xs text-muted-foreground">Última Sessão</p>
                  <p className="mt-1 text-sm font-medium text-card-foreground">
                    {format(new Date(patient.lastSession), "dd 'de' MMM", { locale: ptBR })}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Total Sessões</p>
                  <p className="mt-1 text-sm font-medium text-card-foreground">
                    {patient.sessionCount}
                  </p>
                </div>
              </div>

              {patient.nextSession && (
                <div className="mt-4 flex items-center gap-2 rounded-lg bg-accent/50 px-3 py-2 text-xs text-accent-foreground">
                  <Calendar className="h-3 w-3" />
                  Próxima: {format(new Date(patient.nextSession), "dd/MM 'às' HH:mm", { locale: ptBR })}
                </div>
              )}

              <div className="mt-4 flex items-center justify-end text-sm font-medium text-primary opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                Ver perfil
                <ChevronRight className="ml-1 h-4 w-4" />
              </div>
            </Link>
          ))}
        </div>

        {filteredPatients.length === 0 && (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border py-16">
            <Users className="h-12 w-12 text-muted-foreground/50" />
            <h3 className="mt-4 font-medium text-foreground">Nenhum paciente encontrado</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Tente ajustar os filtros ou adicione um novo paciente
            </p>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default Patients;
