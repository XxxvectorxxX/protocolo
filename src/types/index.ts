export interface Chamado {
  id: string
  protocolo: string
  clienteId: string
  cliente: Cliente
  atendenteId?: string
  atendente?: Atendente
  assunto: string
  descricao: string
  status: "aberto" | "em_andamento" | "aguardando_cliente" | "finalizado" | "cancelado"
  prioridade: "baixa" | "media" | "alta" | "urgente"
  categoria: string
  dataAbertura: string
  dataUltimaInteracao: string
  dataFinalizacao?: string
  tempoSemAtendimento: number // em minutos
  conversas: Conversa[]
  anexos: Anexo[]
  tags: string[]
  informacoesCliente: InformacoesCliente
}

export interface Cliente {
  id: string
  nome: string
  email: string
  telefone: string
  empresa?: string
  documento: string
  endereco?: Endereco
  dataCadastro: string
  ativo: boolean
}

export interface Atendente {
  id: string
  nome: string
  email: string
  perfil: "atendente" | "supervisor" | "admin"
  departamento: string
  ativo: boolean
  chamadosAtivos: number
}

export interface Conversa {
  id: string
  chamadoId: string
  autorId: string
  autorTipo: "cliente" | "atendente" | "sistema"
  mensagem: string
  dataEnvio: string
  lida: boolean
  tipoMensagem: "texto" | "arquivo" | "imagem" | "audio"
  anexos?: Anexo[]
}

export interface Anexo {
  id: string
  nome: string
  tipo: string
  tamanho: number
  url: string
  dataUpload: string
}

export interface InformacoesCliente {
  tipoSistema?: string
  versaoSistema?: string
  tipoErro?: string
  configuracaoMaquina?: ConfiguracaoMaquina
  observacoes?: string
  historicoProblemas?: string[]
}

export interface ConfiguracaoMaquina {
  sistemaOperacional: string
  versaoSO: string
  memoria: string
  processador: string
  espacoDisco: string
  resolucaoTela: string
}

export interface Endereco {
  cep: string
  logradouro: string
  numero: string
  complemento?: string
  bairro: string
  cidade: string
  estado: string
}

export interface Task {
  id: string
  titulo: string
  descricao: string
  responsavelId: string
  responsavel: Atendente
  status: "pendente" | "em_andamento" | "concluida" | "cancelada"
  prioridade: "baixa" | "media" | "alta"
  dataVencimento: string
  dataCriacao: string
  dataConclusao?: string
  chamadoId?: string
  tags: string[]
}

export interface RelatorioConversa {
  chamadoId: string
  protocolo: string
  cliente: Cliente
  atendente?: Atendente
  dataInicio: string
  dataFim?: string
  conversas: Conversa[]
  resumo: string
  tempoTotalAtendimento: number
  satisfacaoCliente?: number
}

export interface ChamadoFilters {
  status?: string
  clienteId?: string
  atendenteId?: string
  prioridade?: string
  categoria?: string
  dataInicio?: string
  dataFim?: string
  tempoSemAtendimento?: number
  // Adicionando novos filtros avançados
  searchTerm?: string
  semAtendente?: boolean
  altaPrioridade?: boolean
  departamento?: string
  tipoSistema?: string
  tags?: string
}

export interface CreateChamadoData {
  clienteId: string
  assunto: string
  descricao: string
  prioridade: "baixa" | "media" | "alta" | "urgente"
  categoria: string
  informacoesCliente?: Partial<InformacoesCliente>
}

export interface UpdateChamadoData {
  atendenteId?: string
  status?: "aberto" | "em_andamento" | "aguardando_cliente" | "finalizado" | "cancelado"
  prioridade?: "baixa" | "media" | "alta" | "urgente"
  categoria?: string
  informacoesCliente?: Partial<InformacoesCliente>
}

export interface AlertaAtendimento {
  id: string
  chamadoId: string
  protocolo: string
  cliente: string
  tempoSemAtendimento: number
  prioridade: "baixa" | "media" | "alta" | "urgente"
  tipo: "tempo_limite" | "sem_atendente" | "cliente_aguardando"
  dataAlerta: string
}

export interface DashboardStats {
  totalChamados: number
  chamadosAbertos: number
  chamadosEmAndamento: number
  chamadosFinalizados: number
  tempoMedioAtendimento: number
  satisfacaoMedia: number
  alertasAtivos: number
  atendentesMaisAtivos: Atendente[]
}
