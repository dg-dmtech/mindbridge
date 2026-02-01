import { Interaction, Intervention, InterventionResponse, Patient, Provocation } from '@/types';

export const mockPatients: Patient[] = [
  {
    id: '1',
    name: 'Maria Silva',
    email: 'maria.silva@email.com',
    phone: '(11) 98765-4321',
    lastSession: '2025-01-03',
    nextSession: '2025-01-10',
    status: 'active',
    sessionCount: 12,
    createdAt: '2024-10-15',
  },
  {
    id: '2',
    name: 'João Santos',
    email: 'joao.santos@email.com',
    phone: '(11) 91234-5678',
    lastSession: '2025-01-02',
    nextSession: '2025-01-09',
    status: 'active',
    sessionCount: 8,
    createdAt: '2024-11-20',
    startDate: '2024-11-25'

  },
  {
    id: '3',
    name: 'Ana Oliveira',
    email: 'ana.oliveira@email.com',
    phone: '(11) 99876-5432',
    lastSession: '2024-12-28',
    status: 'pending',
    sessionCount: 3,
    createdAt: '2024-12-10',
    startDate: '2024-11-25'
  },
  {
    id: '4',
    name: 'Carlos Pereira',
    email: 'carlos.pereira@email.com',
    phone: '(11) 92345-6789',
    lastSession: '2024-12-15',
    status: 'inactive',
    sessionCount: 15,
    createdAt: '2024-06-05',
  },
  {
    id: '5',
    name: 'Beatriz Costa',
    email: 'beatriz.costa@email.com',
    phone: '(11) 93456-7890',
    lastSession: '2025-01-04',
    nextSession: '2025-01-11',
    status: 'active',
    sessionCount: 6,
    createdAt: '2024-11-01',
  },
];

export const mockProvocations: Provocation[] = [
  {
    id: 'p1',
    patientId: '1',
    theme: 'Autoconhecimento',
    prompt: 'Pergunte sobre momentos do dia em que ela se sentiu mais presente e consciente de suas emoções',
    frequency: 'daily',
    timeOfDay: '09:00',
    isActive: true,
    createdAt: '2024-12-01',
  },
  {
    id: 'p2',
    patientId: '1',
    theme: 'Relacionamentos',
    prompt: 'Explore como foram as interações sociais e se houve algum conflito ou momento de conexão significativo',
    frequency: 'every_2_days',
    timeOfDay: '18:00',
    isActive: true,
    createdAt: '2024-12-15',
  },
  {
    id: 'p3',
    patientId: '2',
    theme: 'Ansiedade',
    prompt: 'Pergunte sobre os níveis de ansiedade ao longo do dia e quais situações provocaram maior desconforto',
    frequency: 'daily',
    timeOfDay: '20:00',
    isActive: true,
    createdAt: '2024-12-10',
  },
];

export const mockInteractions: Interaction[] = [
  {
    id: 'i1',
    patientId: '1',
    provocationId: 'p1',
    sentAt: '2025-01-04T09:00:00',
    respondedAt: '2025-01-04T10:30:00',
    provocationText: 'Bom dia, Maria! Hoje gostaria de saber: em que momento do dia você se sentiu mais presente e consciente das suas emoções?',
    response: 'Bom dia! Acho que foi durante a caminhada matinal. Consegui prestar atenção nos sons ao redor e me senti mais calma.',
    sentiment: 'positive',
  },
  {
    id: 'i2',
    patientId: '1',
    provocationId: 'p2',
    sentAt: '2025-01-03T18:00:00',
    respondedAt: '2025-01-03T19:15:00',
    provocationText: 'Boa tarde, Maria! Como foram suas interações sociais hoje? Houve algum momento de conexão especial ou algum conflito?',
    response: 'Tive uma conversa difícil com minha mãe sobre as festas. Me senti frustrada porque ela não entende minhas escolhas.',
    sentiment: 'negative',
    notes: 'Importante explorar relação com a mãe na próxima sessão',
  },
  {
    id: 'i3',
    patientId: '2',
    provocationId: 'p3',
    sentAt: '2025-01-04T20:00:00',
    provocationText: 'Boa noite, João! Como você avaliaria seus níveis de ansiedade hoje? Houve alguma situação que provocou maior desconforto?',
    sentiment: undefined,
  },
  {
    id: 'i4',
    patientId: '1',
    provocationId: 'p1',
    sentAt: '2025-01-03T09:00:00',
    respondedAt: '2025-01-03T09:45:00',
    provocationText: 'Bom dia, Maria! Hoje gostaria de saber: em que momento do dia você se sentiu mais presente e consciente das suas emoções?',
    response: 'Ontem não consegui ter muitos momentos assim. Estava muito preocupada com o trabalho.',
    sentiment: 'neutral',
  },
];



export const mockInterventions: Intervention[] = [
  {
    id: '1',
    patientId: '1',
    title: 'Reflexão Matinal',
    prompt: 'Pergunte ao paciente como ele se sente ao acordar e quais pensamentos aparecem primeiro. Incentive a identificar padrões de ansiedade.',
    frequency: 'daily',
    timeOfDay: '08:00',
    isActive: true,
    createdAt: '2024-12-01',
    category: 'emotion',
  },
  {
    id: '2',
    patientId: '1',
    title: 'Check-in de Ansiedade',
    prompt: 'Pergunte sobre situações que geraram ansiedade durante o dia. Peça para classificar a intensidade de 1 a 10.',
    frequency: 'daily',
    timeOfDay: '20:00',
    isActive: true,
    createdAt: '2024-12-01',
    category: 'emotion',
  },
  {
    id: '3',
    patientId: '2',
    title: 'Diário de Conquistas',
    prompt: 'Peça ao paciente para listar 3 coisas que fez bem hoje, por menores que sejam. Reforce a importância de reconhecer suas qualidades.',
    frequency: 'daily',
    timeOfDay: '21:00',
    isActive: true,
    createdAt: '2024-12-15',
    category: 'reflection',
  },
  {
    id: '4',
    patientId: '3',
    title: 'Pausas Conscientes',
    prompt: 'Pergunte se o paciente fez pausas durante o trabalho hoje. Sugira um exercício de respiração se não tiver feito.',
    frequency: 'weekly',
    customDays: [1, 3, 5],
    timeOfDay: '15:00',
    isActive: true,
    createdAt: '2024-12-20',
    category: 'behavior',
  },
];



export const mockResponses: InterventionResponse[] = [
  {
    id: '1',
    interventionId: '1',
    patientId: '1',
    response: 'Acordei me sentindo um pouco ansiosa pensando nas tarefas do dia. Mas tentei respirar fundo antes de levantar.',
    sentiment: 'neutral',
    createdAt: '2025-01-05T08:30:00',
  },
  {
    id: '2',
    interventionId: '2',
    patientId: '1',
    response: 'Hoje a ansiedade estava em 4. A reunião do trabalho me deixou nervosa mas consegui me controlar.',
    sentiment: 'positive',
    createdAt: '2025-01-04T20:15:00',
  },
  {
    id: '3',
    interventionId: '3',
    patientId: '2',
    response: '1. Terminei um relatório importante. 2. Fiz exercício pela manhã. 3. Ajudei um colega com uma dúvida.',
    sentiment: 'positive',
    createdAt: '2025-01-04T21:30:00',
  },
];