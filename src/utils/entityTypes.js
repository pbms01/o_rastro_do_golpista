// src/utils/entityTypes.js

export const entityTypes = {
  domain: {
    label: 'Domínio',
    color: '#f59e0b',
    shape: 'round-rectangle',
    icon: 'Globe',
    size: 45,
    borderWidth: 2,
    description: 'Nome de domínio da internet (ex: site.com.br)',
  },
  email: {
    label: 'E-mail',
    color: '#3b82f6',
    shape: 'ellipse',
    icon: 'Mail',
    size: 40,
    borderWidth: 2,
    description: 'Endereço de e-mail',
  },
  ip: {
    label: 'Endereço IP',
    color: '#10b981',
    shape: 'diamond',
    icon: 'Cpu',
    size: 50,
    borderWidth: 3,
    description: 'Endereço numérico do servidor na internet',
  },
  whois: {
    label: 'Registro WHOIS',
    color: '#8b5cf6',
    shape: 'round-rectangle',
    icon: 'FileSearch',
    size: 38,
    borderWidth: 2,
    description: 'Registro público de propriedade de domínio',
  },
  dns: {
    label: 'Registro DNS',
    color: '#06b6d4',
    shape: 'round-rectangle',
    icon: 'ArrowRightLeft',
    size: 35,
    borderWidth: 2,
    description: 'Registro do sistema de nomes de domínio',
  },
  server: {
    label: 'Provedor / ISP',
    color: '#ef4444',
    shape: 'hexagon',
    icon: 'Server',
    size: 45,
    borderWidth: 3,
    description: 'Provedor de hospedagem ou serviço de internet',
  },
  certificate: {
    label: 'Certificado SSL',
    color: '#f97316',
    shape: 'round-rectangle',
    icon: 'ShieldCheck',
    size: 35,
    borderWidth: 2,
    description: 'Certificado digital que habilita HTTPS',
  },
  location: {
    label: 'Localização',
    color: '#ec4899',
    shape: 'ellipse',
    icon: 'MapPin',
    size: 35,
    borderWidth: 2,
    description: 'Localização geográfica do servidor',
  },
  person: {
    label: 'Pessoa',
    color: '#a855f7',
    shape: 'ellipse',
    icon: 'User',
    size: 40,
    borderWidth: 2,
    description: 'Pessoa identificada na investigação',
  },
  document: {
    label: 'Documento',
    color: '#64748b',
    shape: 'round-rectangle',
    icon: 'FileText',
    size: 40,
    borderWidth: 2,
    description: 'Documento oficial ou registro',
  },
};

export const getEntityType = (type) => {
  return entityTypes[type] || entityTypes.document;
};

export const getEntityColor = (type) => {
  return entityTypes[type]?.color || '#64748b';
};

export const getEntityIcon = (type) => {
  return entityTypes[type]?.icon || 'File';
};
