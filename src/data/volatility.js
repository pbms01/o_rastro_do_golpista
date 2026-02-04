// src/data/volatility.js

export const volatilityConfig = {
  timerDuration: 8000,  // 8 segundos de animação total

  degradationSequence: [
    {
      timestamp: '0h',
      delay: 0,
      description: 'Investigação concluída. Grafo completo.',
      degradations: [],
    },
    {
      timestamp: '6h',
      delay: 1000,
      description: 'Provedor de hospedagem recebe notificação de abuso.',
      degradations: [],
    },
    {
      timestamp: '24h',
      delay: 2500,
      description: '4 domínios derrubados pelo registrar (NameCheap abuse report).',
      degradations: [
        { type: 'node', ids: ['domain-03', 'domain-06', 'domain-09', 'domain-11'], effect: 'takenDown', label: 'DOMÍNIO REMOVIDO' },
      ],
    },
    {
      timestamp: '48h',
      delay: 4000,
      description: 'WHOIS anonimizado (GDPR). Mais 4 domínios derrubados.',
      degradations: [
        { type: 'node', ids: ['domain-04', 'domain-07', 'domain-10', 'domain-12'], effect: 'takenDown', label: 'DOMÍNIO REMOVIDO' },
        { type: 'node', ids: ['whois-principal', 'person-registrante'], effect: 'redacted', label: 'REDACTED (GDPR)' },
        { type: 'node', ids: ['email-registrante'], effect: 'disconnected', label: 'VÍNCULO PERDIDO' },
      ],
    },
    {
      timestamp: '72h',
      delay: 6000,
      description: 'IPs reatribuídos. Certificados revogados. MX alterado.',
      degradations: [
        { type: 'node', ids: ['ip-01', 'ip-02'], effect: 'reassigned', label: 'IP REATRIBUÍDO' },
        { type: 'node', ids: ['cert-ssl'], effect: 'revoked', label: 'REVOGADO' },
        { type: 'node', ids: ['mx-record'], effect: 'changed', label: 'ALTERADO' },
      ],
    },
  ],

  finalMessage: {
    titulo: 'Tudo que resta é este grafo.',
    pergunta: 'É prova — ou alegação?',
    subtexto: 'Qual a diferença entre um grafo de investigação e um desenho feito à mão no PowerPoint, se nenhum dos dois tem hash, timestamp forense, ou cadeia de custódia documentada?',
  },
};
