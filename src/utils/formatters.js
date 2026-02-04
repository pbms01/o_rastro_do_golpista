// src/utils/formatters.js

// Formata data para formato brasileiro (dd/mm/aaaa)
export const formatDate = (dateString) => {
  if (!dateString) return '-';

  // Se já está em formato brasileiro
  if (dateString.includes('/')) return dateString;

  // Se está em formato ISO (aaaa-mm-dd)
  const parts = dateString.split('-');
  if (parts.length === 3) {
    return `${parts[2]}/${parts[1]}/${parts[0]}`;
  }

  return dateString;
};

// Formata valor monetário em Real brasileiro
export const formatCurrency = (value) => {
  if (!value) return '-';

  // Se já está formatado
  if (typeof value === 'string' && value.includes('R$')) {
    return value;
  }

  const number = typeof value === 'string' ? parseFloat(value.replace(/[^\d,.-]/g, '').replace(',', '.')) : value;

  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(number);
};

// Formata chave de metadado para exibição
export const formatMetadataKey = (key) => {
  const translations = {
    tipo: 'Tipo',
    delegacia: 'Delegacia',
    dataRegistro: 'Data de Registro',
    tipoCrime: 'Tipo de Crime',
    vitima: 'Vítima',
    prejuizo: 'Prejuízo',
    descricao: 'Descrição',
    dominio: 'Domínio',
    urlCompleta: 'URL Completa',
    fonte: 'Fonte',
    status: 'Status',
    descricaoVisual: 'Descrição Visual',
    email: 'E-mail',
    contexto: 'Contexto',
    registrante: 'Registrante',
    emailRegistrante: 'E-mail do Registrante',
    organizacao: 'Organização',
    registrar: 'Registrar',
    dataCriacao: 'Data de Criação',
    dataExpiracao: 'Data de Expiração',
    dataAtualizacao: 'Data de Atualização',
    nameservers: 'Nameservers',
    pais: 'País',
    estado: 'Estado',
    whoisServer: 'Servidor WHOIS',
    provedor: 'Provedor',
    extraidoDe: 'Extraído de',
    relevancia: 'Relevância',
    nome: 'Nome',
    confiabilidade: 'Confiabilidade',
    observacao: 'Observação',
    bancoImitado: 'Banco Imitado',
    endereco: 'Endereço',
    versao: 'Versão',
    dominiosHospedados: 'Domínios Hospedados',
    isp: 'ISP',
    paisServidor: 'País do Servidor',
    tipoHosting: 'Tipo de Hosting',
    asNumber: 'AS Number',
    valor: 'Valor',
    dominioOrigem: 'Domínio de Origem',
    prioridade: 'Prioridade',
    emissor: 'Emissor',
    dataEmissao: 'Data de Emissão',
    serialNumber: 'Número de Série',
    reputacao: 'Reputação',
    ipAssociado: 'IP Associado',
  };

  return translations[key] || key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1');
};

// Verifica se um valor deve usar fonte monospace
export const shouldUseMono = (key, value) => {
  const monoKeys = ['email', 'emailRegistrante', 'dominio', 'urlCompleta', 'endereco', 'ipAssociado', 'asNumber', 'serialNumber', 'valor', 'nameservers'];

  if (monoKeys.includes(key)) return true;

  // Verifica se o valor parece ser um IP, domínio ou e-mail
  if (typeof value === 'string') {
    if (value.match(/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/)) return true;
    if (value.includes('@')) return true;
    if (value.match(/^[a-z0-9-]+\.[a-z]{2,}/i)) return true;
  }

  return false;
};

// Verifica se um valor é um array
export const isArray = (value) => Array.isArray(value);

// Formata timestamp da volatilidade
export const formatVolatilityTimestamp = (timestamp) => {
  return timestamp;
};
