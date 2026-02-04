// src/data/nodes.js
// TODOS OS DADOS SÃO FICTÍCIOS - para fins educacionais

export const nodes = [

  // ================================================================
  // ETAPA 0: PONTO DE PARTIDA — BOLETIM DE OCORRÊNCIA
  // ================================================================

  {
    id: 'bo-001',
    type: 'document',
    label: 'B.O. nº 2025/123456',
    appearsInStep: 0,
    metadata: {
      tipo: 'Boletim de Ocorrência',
      delegacia: 'Delegacia de Crimes Cibernéticos',
      dataRegistro: '2025-11-15',
      tipoCrime: 'Estelionato Digital (Art. 171, §2º-A, CP)',
      vitima: 'Maria da Silva Santos (nome fictício)',
      prejuizo: 'R$ 12.450,00',
      descricao: 'Vítima acessou site que imitava interface de instituição financeira, inseriu credenciais bancárias e sofreu 3 transferências não autorizadas.',
    },
    position: { x: 0, y: 0 },
    custodyStatus: 'preserved',
    custodyDetail: 'Documento oficial registrado em sistema da Polícia Civil. Número de protocolo, assinatura digital do escrivão, timestamp do sistema.',
    vulnerabilities: [],
  },

  {
    id: 'domain-principal',
    type: 'domain',
    label: 'segurobancodigital.com.br',
    appearsInStep: 0,
    metadata: {
      dominio: 'segurobancodigital.com.br',
      urlCompleta: 'https://segurobancodigital.com.br',
      fonte: 'Informado pela vítima no B.O.',
      status: 'Ativo no momento da denúncia',
      descricaoVisual: 'Site imitava interface de internet banking com logotipo e cores de instituição financeira conhecida',
    },
    position: { x: 200, y: 0 },
    custodyStatus: 'notPreserved',
    custodyDetail: 'Domínio informado verbalmente pela vítima. Nenhuma captura forense do site foi realizada no momento do registro do B.O.',
    vulnerabilities: [
      {
        id: 'v-dom-01',
        titulo: 'Site não preservado no momento da denúncia',
        descricao: 'O conteúdo do site fraudulento não foi capturado com hash e timestamp no ato do B.O. Se o site for derrubado antes da coleta forense, o conteúdo se perde.',
        severidade: 'critica',
        consequenciaProcessual: 'Sem captura forense, a defesa pode alegar que o site acessado pela vítima era legítimo e que o investigador acessou site diverso.',
      }
    ],
  },

  {
    id: 'email-contato',
    type: 'email',
    label: 'contato@segurobancodigital.com.br',
    appearsInStep: 0,
    metadata: {
      email: 'contato@segurobancodigital.com.br',
      fonte: 'Informado pela vítima no B.O.',
      contexto: 'E-mail recebido pela vítima com link para o site fraudulento',
    },
    position: { x: 200, y: 150 },
    custodyStatus: 'notPreserved',
    custodyDetail: 'E-mail informado verbalmente. Cabeçalhos (headers) do e-mail original não foram preservados — impossível verificar remetente real, IP de origem, rota SMTP.',
    vulnerabilities: [
      {
        id: 'v-email-01',
        titulo: 'Headers do e-mail não preservados',
        descricao: 'Os cabeçalhos técnicos do e-mail (Received, Return-Path, DKIM, SPF) contêm informações cruciais sobre a infraestrutura do remetente. Sem eles, o e-mail é apenas um endereço textual.',
        severidade: 'alta',
        consequenciaProcessual: 'Sem headers, não é possível provar que o e-mail efetivamente partiu da infraestrutura do golpista. Defesa alega spoofing.',
      }
    ],
  },

  // ================================================================
  // ETAPA 1: DOMÍNIO → WHOIS
  // ================================================================

  {
    id: 'whois-principal',
    type: 'whois',
    label: 'WHOIS Record',
    appearsInStep: 1,
    metadata: {
      dominio: 'segurobancodigital.com.br',
      registrante: 'Carlos Eduardo Mendes',
      emailRegistrante: 'carlos.registro2024@proton.me',
      organizacao: '(vazio)',
      registrar: 'NameCheap, Inc.',
      dataCriacao: '2025-11-03',
      dataExpiracao: '2026-11-03',
      dataAtualizacao: '2025-11-03',
      nameservers: ['ns1.hostinger.com', 'ns2.hostinger.com'],
      status: 'clientTransferProhibited',
      pais: 'BR',
      estado: 'SP',
      whoisServer: 'whois.registro.br',
    },
    position: { x: 450, y: -50 },
    custodyStatus: 'notPreserved',
    custodyDetail: 'Consulta WHOIS realizada sem ferramenta de preservação. O resultado é uma consulta em tempo real — se o registro for alterado ou anonimizado, o dado original se perde.',
    vulnerabilities: [
      {
        id: 'v-whois-01',
        titulo: 'WHOIS Privacy / GDPR Redaction',
        descricao: 'Registros WHOIS estão cada vez mais sujeitos a anonimização por GDPR (Europa) e políticas de privacidade dos registrars. A qualquer momento, os campos de registrante, e-mail e telefone podem ser substituídos por "REDACTED FOR PRIVACY".',
        severidade: 'critica',
        consequenciaProcessual: 'Dado que aparece no grafo pode não ser mais acessível para verificação judicial. A defesa argumenta que o investigador não pode provar que o registro continha aqueles dados.',
      },
      {
        id: 'v-whois-02',
        titulo: 'Dados do registrante frequentemente falsos',
        descricao: 'O nome "Carlos Eduardo Mendes" pode ser inteiramente fictício. WHOIS não exige verificação de identidade. O dado relevante é o e-mail de registro (necessário para confirmação do domínio), não o nome.',
        severidade: 'media',
        consequenciaProcessual: 'O nome no WHOIS não identifica o criminoso por si só — mas o e-mail de registro pode ser real por necessidade operacional.',
      }
    ],
  },

  {
    id: 'email-registrante',
    type: 'email',
    label: 'carlos.registro2024@proton.me',
    appearsInStep: 1,
    metadata: {
      email: 'carlos.registro2024@proton.me',
      provedor: 'ProtonMail (Suíça — criptografia end-to-end, sem cooperação judicial facilitada)',
      extraidoDe: 'Registro WHOIS do domínio segurobancodigital.com.br',
      relevancia: 'E-mail usado para registrar domínios — necessariamente funcional (confirmação de registro exige acesso ao e-mail)',
    },
    position: { x: 450, y: 100 },
    custodyStatus: 'notPreserved',
    custodyDetail: 'E-mail extraído de consulta WHOIS sem preservação. Se o WHOIS for anonimizado, a ligação entre o e-mail e o domínio desaparece.',
    vulnerabilities: [
      {
        id: 'v-emailreg-01',
        titulo: 'ProtonMail — jurisdição e criptografia',
        descricao: 'ProtonMail opera sob jurisdição suíça e criptografia end-to-end. Cooperação judicial requer carta rogatória via MLAT (Mutual Legal Assistance Treaty), processo que leva meses.',
        severidade: 'alta',
        consequenciaProcessual: 'Identificação do titular do e-mail depende de cooperação internacional. Enquanto isso, evidências digitais vinculadas continuam se degradando.',
      }
    ],
  },

  {
    id: 'person-registrante',
    type: 'person',
    label: 'Carlos Eduardo Mendes',
    appearsInStep: 1,
    metadata: {
      nome: 'Carlos Eduardo Mendes',
      fonte: 'Campo "Registrant Name" do WHOIS',
      confiabilidade: 'BAIXA — WHOIS não verifica identidade',
      observacao: 'Nome possivelmente fictício. Relevância investigativa limitada sem corroboração por outras fontes.',
    },
    position: { x: 650, y: -50 },
    custodyStatus: 'notPreserved',
    custodyDetail: 'Dado extraído de WHOIS sem preservação.',
    vulnerabilities: [],
  },

  // ================================================================
  // ETAPA 2: E-MAIL DO REGISTRANTE → OUTROS DOMÍNIOS (REVERSE WHOIS)
  // ================================================================

  {
    id: 'domain-02',
    type: 'domain',
    label: 'atendimento-bancobr.com',
    appearsInStep: 2,
    metadata: {
      dominio: 'atendimento-bancobr.com',
      registrante: 'carlos.registro2024@proton.me',
      dataCriacao: '2025-10-28',
      registrar: 'NameCheap, Inc.',
      bancoImitado: 'Genérico ("Banco BR")',
      status: 'Ativo',
    },
    custodyStatus: 'notPreserved',
    custodyDetail: 'Identificado via Reverse WHOIS sem preservação.',
    vulnerabilities: [],
  },

  {
    id: 'domain-03',
    type: 'domain',
    label: 'caixa-atualizacao.com.br',
    appearsInStep: 2,
    metadata: {
      dominio: 'caixa-atualizacao.com.br',
      registrante: 'carlos.registro2024@proton.me',
      dataCriacao: '2025-10-30',
      registrar: 'NameCheap, Inc.',
      bancoImitado: 'Caixa Econômica Federal',
      status: 'Ativo',
    },
    custodyStatus: 'notPreserved',
    custodyDetail: 'Identificado via Reverse WHOIS sem preservação.',
    vulnerabilities: [],
  },

  {
    id: 'domain-04',
    type: 'domain',
    label: 'itau-seguranca2025.com',
    appearsInStep: 2,
    metadata: {
      dominio: 'itau-seguranca2025.com',
      registrante: 'carlos.registro2024@proton.me',
      dataCriacao: '2025-10-30',
      registrar: 'NameCheap, Inc.',
      bancoImitado: 'Itaú Unibanco',
      status: 'Ativo',
    },
    custodyStatus: 'notPreserved',
    custodyDetail: 'Identificado via Reverse WHOIS sem preservação.',
    vulnerabilities: [],
  },

  {
    id: 'domain-05',
    type: 'domain',
    label: 'bradesco-verificacao.net',
    appearsInStep: 2,
    metadata: {
      dominio: 'bradesco-verificacao.net',
      registrante: 'carlos.registro2024@proton.me',
      dataCriacao: '2025-11-01',
      registrar: 'NameCheap, Inc.',
      bancoImitado: 'Bradesco',
      status: 'Ativo',
    },
    custodyStatus: 'notPreserved',
    custodyDetail: 'Identificado via Reverse WHOIS sem preservação.',
    vulnerabilities: [],
  },

  {
    id: 'domain-06',
    type: 'domain',
    label: 'nubank-confirmacao.com',
    appearsInStep: 2,
    metadata: {
      dominio: 'nubank-confirmacao.com',
      registrante: 'carlos.registro2024@proton.me',
      dataCriacao: '2025-11-01',
      registrar: 'NameCheap, Inc.',
      bancoImitado: 'Nubank',
      status: 'Ativo',
    },
    custodyStatus: 'notPreserved',
    custodyDetail: 'Identificado via Reverse WHOIS sem preservação.',
    vulnerabilities: [],
  },

  {
    id: 'domain-07',
    type: 'domain',
    label: 'bancodobrasil-token.com',
    appearsInStep: 2,
    metadata: {
      dominio: 'bancodobrasil-token.com',
      registrante: 'carlos.registro2024@proton.me',
      dataCriacao: '2025-11-03',
      registrar: 'NameCheap, Inc.',
      bancoImitado: 'Banco do Brasil',
      status: 'Ativo',
    },
    custodyStatus: 'notPreserved',
    custodyDetail: 'Identificado via Reverse WHOIS sem preservação.',
    vulnerabilities: [],
  },

  {
    id: 'domain-08',
    type: 'domain',
    label: 'santander-autenticacao.net',
    appearsInStep: 2,
    metadata: {
      dominio: 'santander-autenticacao.net',
      registrante: 'carlos.registro2024@proton.me',
      dataCriacao: '2025-11-05',
      registrar: 'NameCheap, Inc.',
      bancoImitado: 'Santander',
      status: 'Ativo',
    },
    custodyStatus: 'notPreserved',
    custodyDetail: 'Identificado via Reverse WHOIS sem preservação.',
    vulnerabilities: [],
  },

  {
    id: 'domain-09',
    type: 'domain',
    label: 'inter-atualizacao.com',
    appearsInStep: 2,
    metadata: {
      dominio: 'inter-atualizacao.com',
      registrante: 'carlos.registro2024@proton.me',
      dataCriacao: '2025-11-07',
      registrar: 'NameCheap, Inc.',
      bancoImitado: 'Banco Inter',
      status: 'Ativo',
    },
    custodyStatus: 'notPreserved',
    custodyDetail: 'Identificado via Reverse WHOIS sem preservação.',
    vulnerabilities: [],
  },

  {
    id: 'domain-10',
    type: 'domain',
    label: 'c6bank-verificar.com',
    appearsInStep: 2,
    metadata: {
      dominio: 'c6bank-verificar.com',
      registrante: 'carlos.registro2024@proton.me',
      dataCriacao: '2025-11-08',
      registrar: 'NameCheap, Inc.',
      bancoImitado: 'C6 Bank',
      status: 'Ativo',
    },
    custodyStatus: 'notPreserved',
    custodyDetail: 'Identificado via Reverse WHOIS sem preservação.',
    vulnerabilities: [],
  },

  {
    id: 'domain-11',
    type: 'domain',
    label: 'pagseguro-confirmar.com',
    appearsInStep: 2,
    metadata: {
      dominio: 'pagseguro-confirmar.com',
      registrante: 'carlos.registro2024@proton.me',
      dataCriacao: '2025-11-09',
      registrar: 'NameCheap, Inc.',
      bancoImitado: 'PagSeguro',
      status: 'Ativo',
    },
    custodyStatus: 'notPreserved',
    custodyDetail: 'Identificado via Reverse WHOIS sem preservação.',
    vulnerabilities: [],
  },

  {
    id: 'domain-12',
    type: 'domain',
    label: 'mercadopago-validar.net',
    appearsInStep: 2,
    metadata: {
      dominio: 'mercadopago-validar.net',
      registrante: 'carlos.registro2024@proton.me',
      dataCriacao: '2025-11-10',
      registrar: 'NameCheap, Inc.',
      bancoImitado: 'Mercado Pago',
      status: 'Ativo',
    },
    custodyStatus: 'notPreserved',
    custodyDetail: 'Identificado via Reverse WHOIS sem preservação.',
    vulnerabilities: [],
  },

  // ================================================================
  // ETAPA 3: DOMÍNIOS → DNS → ENDEREÇOS IP
  // ================================================================

  {
    id: 'ip-01',
    type: 'ip',
    label: '185.193.125.41',
    appearsInStep: 3,
    metadata: {
      endereco: '185.193.125.41',
      versao: 'IPv4',
      dominiosHospedados: [
        'segurobancodigital.com.br',
        'atendimento-bancobr.com',
        'caixa-atualizacao.com.br',
        'itau-seguranca2025.com',
      ],
      isp: 'FlokiNET ehf',
      paisServidor: 'Islândia',
      tipoHosting: 'Bulletproof Hosting — provedor conhecido por resistir a takedown requests',
      asNumber: 'AS200651',
    },
    position: { x: -200, y: -250 },
    custodyStatus: 'notPreserved',
    custodyDetail: 'Resolução DNS realizada sem preservação. IP pode mudar a qualquer momento (DNS é dinâmico).',
    vulnerabilities: [
      {
        id: 'v-ip-01',
        titulo: 'Hosting compartilhado — IP não prova vínculo isoladamente',
        descricao: 'Milhares de sites podem compartilhar o mesmo endereço IP em hosting compartilhado. A mera coincidência de IP, sem outros indicadores convergentes, não prova que os domínios são operados pela mesma pessoa.',
        severidade: 'media',
        consequenciaProcessual: 'A defesa argumenta que compartilhar IP é circunstância comum e não demonstra coordenação. É a CONVERGÊNCIA de múltiplos indicadores (mesmo registrante + mesmo IP + mesmas datas) que constrói a prova.',
      },
      {
        id: 'v-ip-02',
        titulo: 'Bulletproof hosting — jurisdição não cooperativa',
        descricao: 'FlokiNET (Islândia) é reconhecido como provedor de "bulletproof hosting" — serviços que deliberadamente resistem a ordens judiciais e pedidos de takedown. Cooperação internacional para obter logs é extremamente difícil.',
        severidade: 'alta',
        consequenciaProcessual: 'Logs de acesso ao servidor (que poderiam identificar o administrador) provavelmente não serão obtidos via cooperação judicial.',
      }
    ],
  },

  {
    id: 'ip-02',
    type: 'ip',
    label: '91.215.85.17',
    appearsInStep: 3,
    metadata: {
      endereco: '91.215.85.17',
      versao: 'IPv4',
      dominiosHospedados: [
        'bradesco-verificacao.net',
        'nubank-confirmacao.com',
        'bancodobrasil-token.com',
        'santander-autenticacao.net',
      ],
      isp: 'Stark Industries Solutions',
      paisServidor: 'Moldávia',
      tipoHosting: 'Bulletproof Hosting — empresa associada a operações de cibercrime por múltiplos relatórios de threat intelligence',
      asNumber: 'AS44477',
    },
    position: { x: 0, y: -350 },
    custodyStatus: 'notPreserved',
    custodyDetail: 'Resolução DNS realizada sem preservação.',
    vulnerabilities: [
      {
        id: 'v-ip-03',
        titulo: 'Jurisdição moldava — cooperação extremamente limitada',
        descricao: 'Moldávia não é signatária efetiva de tratados de cooperação em cibercrime com o Brasil. Obtenção de dados do provedor é virtualmente impossível por vias judiciais.',
        severidade: 'critica',
        consequenciaProcessual: 'Impossibilidade prática de obter logs do servidor, identificar administrador ou realizar apreensão remota.',
      }
    ],
  },

  {
    id: 'ip-03',
    type: 'ip',
    label: '194.32.79.103',
    appearsInStep: 3,
    metadata: {
      endereco: '194.32.79.103',
      versao: 'IPv4',
      dominiosHospedados: [
        'inter-atualizacao.com',
        'c6bank-verificar.com',
        'pagseguro-confirmar.com',
        'mercadopago-validar.net',
      ],
      isp: 'Chang Way Technologies',
      paisServidor: 'Hong Kong',
      tipoHosting: 'Bulletproof Hosting — provedor frequentemente citado em relatórios de abuso',
      asNumber: 'AS57523',
    },
    position: { x: 200, y: -350 },
    custodyStatus: 'notPreserved',
    custodyDetail: 'Resolução DNS realizada sem preservação.',
    vulnerabilities: [],
  },

  {
    id: 'mx-record',
    type: 'dns',
    label: 'MX: mx.yandex.net',
    appearsInStep: 3,
    metadata: {
      tipo: 'MX Record (servidor de e-mail)',
      valor: 'mx.yandex.net',
      dominioOrigem: 'segurobancodigital.com.br',
      relevancia: 'Servidor de e-mail russo (Yandex) para domínio brasileiro — forte indicador de fraude. Instituições financeiras brasileiras nunca usariam servidor de e-mail russo.',
      prioridade: 10,
    },
    position: { x: -100, y: 100 },
    custodyStatus: 'notPreserved',
    custodyDetail: 'Consulta DNS em tempo real sem preservação.',
    vulnerabilities: [
      {
        id: 'v-mx-01',
        titulo: 'Registro DNS é dinâmico',
        descricao: 'Registros MX podem ser alterados a qualquer momento pelo controlador do domínio. O registro "mx.yandex.net" pode ser substituído em segundos.',
        severidade: 'alta',
        consequenciaProcessual: 'Sem captura com timestamp e hash, não é possível provar qual era o registro MX no momento da investigação.',
      }
    ],
  },

  {
    id: 'cert-ssl',
    type: 'certificate',
    label: "SSL: Let's Encrypt",
    appearsInStep: 3,
    metadata: {
      tipo: 'Certificado SSL/TLS',
      emissor: "Let's Encrypt Authority X3",
      dominio: 'segurobancodigital.com.br',
      dataEmissao: '2025-11-03',
      dataExpiracao: '2026-02-01',
      serialNumber: '04:8A:3C:F1:...',
      relevancia: 'Data de emissão (03/11/2025) coincide com data de criação do domínio — indica que a infraestrutura foi montada toda de uma vez.',
    },
    position: { x: -300, y: 50 },
    custodyStatus: 'notPreserved',
    custodyDetail: 'Certificado obtido via consulta em tempo real.',
    vulnerabilities: [
      {
        id: 'v-cert-01',
        titulo: 'Certificado pode ser revogado',
        descricao: "Certificados Let's Encrypt podem ser revogados pelo emissor ou expirar. Após revogação, não é possível verificar as datas de emissão sem registros de Certificate Transparency Logs.",
        severidade: 'media',
        consequenciaProcessual: 'A correlação temporal (data de emissão = data de registro do domínio) se perde se o certificado for revogado antes da preservação.',
      }
    ],
  },

  // ================================================================
  // ETAPA 4: IP → REVERSE DNS → CONFIRMAÇÃO + ISP/GEOLOCALIZAÇÃO
  // ================================================================

  {
    id: 'isp-01',
    type: 'server',
    label: 'FlokiNET ehf',
    appearsInStep: 4,
    metadata: {
      nome: 'FlokiNET ehf',
      tipo: 'Internet Service Provider / Hosting',
      pais: 'Islândia',
      asNumber: 'AS200651',
      reputacao: 'Frequentemente associado a bulletproof hosting. Política declarada de resistência a takedowns.',
      ipAssociado: '185.193.125.41',
    },
    position: { x: -350, y: -300 },
    custodyStatus: 'notPreserved',
    custodyDetail: 'Informação obtida via Shodan/WHOIS de IP.',
    vulnerabilities: [],
  },

  {
    id: 'isp-02',
    type: 'server',
    label: 'Stark Industries Solutions',
    appearsInStep: 4,
    metadata: {
      nome: 'Stark Industries Solutions',
      tipo: 'Internet Service Provider / Hosting',
      pais: 'Moldávia',
      asNumber: 'AS44477',
      reputacao: 'Múltiplos relatórios de threat intelligence associam este provedor a operações de cibercrime, incluindo ransomware e phishing em escala.',
      ipAssociado: '91.215.85.17',
    },
    position: { x: 0, y: -500 },
    custodyStatus: 'notPreserved',
    custodyDetail: 'Informação obtida via Shodan/WHOIS de IP.',
    vulnerabilities: [],
  },

  {
    id: 'isp-03',
    type: 'server',
    label: 'Chang Way Technologies',
    appearsInStep: 4,
    metadata: {
      nome: 'Chang Way Technologies',
      tipo: 'Internet Service Provider / Hosting',
      pais: 'Hong Kong',
      asNumber: 'AS57523',
      reputacao: 'Provedor frequentemente citado em relatórios de abuso por hospedar conteúdo malicioso.',
      ipAssociado: '194.32.79.103',
    },
    position: { x: 350, y: -500 },
    custodyStatus: 'notPreserved',
    custodyDetail: 'Informação obtida via Shodan/WHOIS de IP.',
    vulnerabilities: [],
  },

  {
    id: 'loc-01',
    type: 'location',
    label: '🇮🇸 Islândia',
    appearsInStep: 4,
    metadata: {
      pais: 'Islândia',
      relevancia: 'Jurisdição europeia, mas com políticas favoráveis a privacidade digital.',
    },
    position: { x: -500, y: -350 },
    custodyStatus: 'notPreserved',
    custodyDetail: 'Geolocalização de IP — aproximada, não forense.',
    vulnerabilities: [],
  },

  {
    id: 'loc-02',
    type: 'location',
    label: '🇲🇩 Moldávia',
    appearsInStep: 4,
    metadata: {
      pais: 'Moldávia',
      relevancia: 'Fora dos principais tratados de cooperação em cibercrime com o Brasil. Cooperação judicial extremamente difícil.',
    },
    position: { x: -50, y: -600 },
    custodyStatus: 'notPreserved',
    custodyDetail: 'Geolocalização de IP — aproximada, não forense.',
    vulnerabilities: [],
  },

  {
    id: 'loc-03',
    type: 'location',
    label: '🇭🇰 Hong Kong',
    appearsInStep: 4,
    metadata: {
      pais: 'Hong Kong (RAE China)',
      relevancia: 'Jurisdição com limitações práticas significativas para cooperação judicial com o Brasil em matéria de cibercrime.',
    },
    position: { x: 400, y: -600 },
    custodyStatus: 'notPreserved',
    custodyDetail: 'Geolocalização de IP — aproximada, não forense.',
    vulnerabilities: [],
  },

];
