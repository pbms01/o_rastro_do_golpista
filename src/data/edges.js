// src/data/edges.js

export const edges = [

  // ================================================================
  // ETAPA 0: B.O. → Domínio + E-mail (dados da denúncia)
  // ================================================================
  { id: 'e-bo-domain', source: 'bo-001', target: 'domain-principal', label: 'menciona domínio', appearsInStep: 0 },
  { id: 'e-bo-email', source: 'bo-001', target: 'email-contato', label: 'menciona e-mail', appearsInStep: 0 },
  { id: 'e-domain-email-contato', source: 'domain-principal', target: 'email-contato', label: 'e-mail de contato', appearsInStep: 0 },

  // ================================================================
  // ETAPA 1: Domínio → WHOIS → Registrante + E-mail
  // ================================================================
  { id: 'e-domain-whois', source: 'domain-principal', target: 'whois-principal', label: 'To WHOIS Records', appearsInStep: 1, isTransform: true },
  { id: 'e-whois-email', source: 'whois-principal', target: 'email-registrante', label: 'registrant email', appearsInStep: 1 },
  { id: 'e-whois-person', source: 'whois-principal', target: 'person-registrante', label: 'registrant name', appearsInStep: 1 },

  // ================================================================
  // ETAPA 2: E-mail registrante → Outros domínios (Reverse WHOIS)
  // ================================================================
  { id: 'e-email-dom02', source: 'email-registrante', target: 'domain-02', label: 'registrou', appearsInStep: 2 },
  { id: 'e-email-dom03', source: 'email-registrante', target: 'domain-03', label: 'registrou', appearsInStep: 2 },
  { id: 'e-email-dom04', source: 'email-registrante', target: 'domain-04', label: 'registrou', appearsInStep: 2 },
  { id: 'e-email-dom05', source: 'email-registrante', target: 'domain-05', label: 'registrou', appearsInStep: 2 },
  { id: 'e-email-dom06', source: 'email-registrante', target: 'domain-06', label: 'registrou', appearsInStep: 2 },
  { id: 'e-email-dom07', source: 'email-registrante', target: 'domain-07', label: 'registrou', appearsInStep: 2 },
  { id: 'e-email-dom08', source: 'email-registrante', target: 'domain-08', label: 'registrou', appearsInStep: 2 },
  { id: 'e-email-dom09', source: 'email-registrante', target: 'domain-09', label: 'registrou', appearsInStep: 2 },
  { id: 'e-email-dom10', source: 'email-registrante', target: 'domain-10', label: 'registrou', appearsInStep: 2 },
  { id: 'e-email-dom11', source: 'email-registrante', target: 'domain-11', label: 'registrou', appearsInStep: 2 },
  { id: 'e-email-dom12', source: 'email-registrante', target: 'domain-12', label: 'registrou', appearsInStep: 2 },
  { id: 'e-email-dom01', source: 'email-registrante', target: 'domain-principal', label: 'registrou', appearsInStep: 2 },

  // ================================================================
  // ETAPA 3: Domínios → DNS → IPs (resolução DNS)
  // ================================================================
  // Cluster 1: IP 185.193.125.41 (Islândia)
  { id: 'e-dom01-ip01', source: 'domain-principal', target: 'ip-01', label: 'A record → IP', appearsInStep: 3 },
  { id: 'e-dom02-ip01', source: 'domain-02', target: 'ip-01', label: 'A record → IP', appearsInStep: 3 },
  { id: 'e-dom03-ip01', source: 'domain-03', target: 'ip-01', label: 'A record → IP', appearsInStep: 3 },
  { id: 'e-dom04-ip01', source: 'domain-04', target: 'ip-01', label: 'A record → IP', appearsInStep: 3 },

  // Cluster 2: IP 91.215.85.17 (Moldávia)
  { id: 'e-dom05-ip02', source: 'domain-05', target: 'ip-02', label: 'A record → IP', appearsInStep: 3 },
  { id: 'e-dom06-ip02', source: 'domain-06', target: 'ip-02', label: 'A record → IP', appearsInStep: 3 },
  { id: 'e-dom07-ip02', source: 'domain-07', target: 'ip-02', label: 'A record → IP', appearsInStep: 3 },
  { id: 'e-dom08-ip02', source: 'domain-08', target: 'ip-02', label: 'A record → IP', appearsInStep: 3 },

  // Cluster 3: IP 194.32.79.103 (Hong Kong)
  { id: 'e-dom09-ip03', source: 'domain-09', target: 'ip-03', label: 'A record → IP', appearsInStep: 3 },
  { id: 'e-dom10-ip03', source: 'domain-10', target: 'ip-03', label: 'A record → IP', appearsInStep: 3 },
  { id: 'e-dom11-ip03', source: 'domain-11', target: 'ip-03', label: 'A record → IP', appearsInStep: 3 },
  { id: 'e-dom12-ip03', source: 'domain-12', target: 'ip-03', label: 'A record → IP', appearsInStep: 3 },

  // DNS auxiliares
  { id: 'e-dom01-mx', source: 'domain-principal', target: 'mx-record', label: 'MX Record', appearsInStep: 3 },
  { id: 'e-dom01-cert', source: 'domain-principal', target: 'cert-ssl', label: 'SSL Certificate', appearsInStep: 3 },

  // ================================================================
  // ETAPA 4: IPs → ISP + Geolocalização
  // ================================================================
  { id: 'e-ip01-isp01', source: 'ip-01', target: 'isp-01', label: 'hospedado em', appearsInStep: 4 },
  { id: 'e-ip02-isp02', source: 'ip-02', target: 'isp-02', label: 'hospedado em', appearsInStep: 4 },
  { id: 'e-ip03-isp03', source: 'ip-03', target: 'isp-03', label: 'hospedado em', appearsInStep: 4 },
  { id: 'e-isp01-loc01', source: 'isp-01', target: 'loc-01', label: 'localizado em', appearsInStep: 4 },
  { id: 'e-isp02-loc02', source: 'isp-02', target: 'loc-02', label: 'localizado em', appearsInStep: 4 },
  { id: 'e-isp03-loc03', source: 'isp-03', target: 'loc-03', label: 'localizado em', appearsInStep: 4 },

];
