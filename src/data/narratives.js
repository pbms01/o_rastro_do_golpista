// src/data/narratives.js

export const narratives = {
  0: {
    titulo: 'O Início: Um B.O. Como Qualquer Outro',
    corpo: 'Uma vítima chega à delegacia. Acessou um site que parecia ser seu banco, inseriu suas credenciais, e perdeu R$ 12.450. Tudo que ela tem é uma URL e um e-mail. Para o investigador, esses dois dados são sementes — e com as ferramentas certas, sementes crescem.',
    destaque: null,
  },
  1: {
    titulo: 'Quem Está Por Trás Deste Domínio?',
    corpo: 'A consulta WHOIS é o primeiro "puxão de fio" da investigação. Todo domínio registrado na internet tem um registro público de propriedade — o WHOIS. Aqui descobrimos quem registrou o domínio, quando, e com qual e-mail. O nome pode ser falso, mas o e-mail de registro precisa funcionar — o registrar envia confirmação.',
    destaque: 'Atenção: este registro WHOIS não foi preservado com hash ou timestamp. Se for anonimizado amanhã, perdemos o vínculo.',
  },
  2: {
    titulo: 'Um Golpe Isolado? Não Exatamente.',
    corpo: 'O WHOIS Reverso busca TODOS os domínios já registrados com este e-mail. O resultado transforma a investigação: não é um golpe isolado — são 12 domínios, cada um imitando uma instituição financeira brasileira diferente. Mesmo registrante, mesmo registrar, mesmas datas. Estamos diante de uma operação organizada.',
    destaque: 'Este é o momento mais valioso da investigação — e o mais frágil. Se o e-mail do registrante for desvinculado do WHOIS antes de ser preservado, a conexão entre os 12 domínios desaparece.',
  },
  3: {
    titulo: 'A Infraestrutura Física da Fraude',
    corpo: 'DNS traduz nomes de domínio em endereços IP — os "endereços físicos" dos servidores na internet. Resultado: 12 domínios, apenas 3 servidores. A concentração da infraestrutura é mais um indicador de operação coordenada. Detalhe revelador: o servidor de e-mail do domínio principal é o Yandex (Rússia) — nenhuma instituição financeira brasileira usaria servidor russo.',
    destaque: 'Compartilhar IP NÃO prova vínculo isoladamente — milhares de sites podem usar o mesmo servidor. É a CONVERGÊNCIA de indicadores (mesmo registrante + mesmo IP + mesma data) que constrói a prova circunstancial.',
  },
  4: {
    titulo: 'Três Servidores, Três Países, Zero Cooperação',
    corpo: 'Os 3 IPs estão hospedados em provedores de "bulletproof hosting" — serviços que deliberadamente resistem a ordens judiciais. Islândia, Moldávia, Hong Kong: três jurisdições com cooperação judicial difícil ou inexistente com o Brasil. A escolha não é acidental — é arquitetura de impunidade.',
    destaque: 'Logs de acesso ao servidor — que poderiam identificar quem administra os sites — provavelmente nunca serão obtidos por via judicial.',
  },
  5: {
    titulo: 'A Rede Revelada',
    corpo: 'Vamos reorganizar o grafo para que os padrões emergentes fiquem visíveis. Observe os 3 clusters que se formam ao redor dos IPs — e como todos convergem para um único e-mail de registrante no centro. Este é o "raio-X" da operação: 12 domínios fraudulentos, 1 operador, 3 servidores blindados, 3 jurisdições não cooperativas.',
    destaque: '12 domínios • 1 registrante • 3 servidores • 3 países • 13 dias de operação',
  },
  6: {
    titulo: 'A Cadeia de Custódia que Não Existe',
    corpo: 'Vamos agora olhar para este grafo com outros olhos — não os olhos do investigador, mas os olhos do juiz, do promotor, do advogado de defesa. Para cada nó deste grafo, a pergunta é: este dado foi preservado com integridade verificável? Tem hash? Tem timestamp forense? Tem cadeia de custódia documentada?',
    destaque: 'Resultado: 1 de 28 evidências tem cadeia de custódia. Apenas o B.O. — que é um documento da própria polícia. Todas as 27 evidências digitais obtidas pela investigação estão desprotegidas.',
  },
  7: {
    titulo: '72 Horas Depois',
    corpo: 'O tempo é o inimigo da evidência digital. Veja o que acontece nas próximas 72 horas após a investigação...',
    destaque: null,
    perguntaFinal: 'Tudo que o investigador tem é este grafo. Agora: é prova? Ou é uma alegação de que estas conexões existiram? Qual a diferença entre um grafo de investigação e um desenho feito à mão no PowerPoint, se nenhum dos dois tem hash, timestamp forense, ou cadeia de custódia documentada?',
  },
};
