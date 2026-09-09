import { company } from './company.js';
export const faq = [
  ['Qual plano escolher?', 'Considere as pessoas, os dispositivos e os usos simultâneos da sua casa. Nosso seletor oferece uma sugestão inicial; a equipe Fly pode ajudar a confirmar a escolha.'],
  ['O que é download e upload?', 'Download é receber dados, como assistir a um vídeo. Upload é enviar dados, como compartilhar arquivos ou participar de uma videochamada. Consulte as velocidades de cada modalidade na contratação.'],
  ['Quanto tempo demora a instalação?', company.installation],
  ['Existe taxa de instalação?', 'O site oficial informa instalação gratuita nos planos residenciais e equipamento em comodato. Confirme as condições para o seu endereço. Pontos adicionais de Wi-Fi têm condições próprias.'],
  ['Como solicitar a segunda via?', 'Acesse a Central do Assinante ou o aplicativo Fly Telecom com seus dados de acesso para consultar as faturas. Se precisar, fale com nossa equipe.'],
  ['Como falar com o suporte?', `Você pode usar o WhatsApp, o aplicativo ou ligar para ${company.phone}. O atendimento é local, com uma equipe que conhece Gravatá.`],
  ['Como melhorar o Wi-Fi em outros cômodos?', `A Casa Conectada combina posicionamento estratégico e soluções Wi-Fi 6 e Mesh, conforme disponibilidade. ${company.meshTerms}`],
  ['É possível mudar o plano?', 'Fale com o atendimento para solicitar uma análise de mudança e conhecer as condições do plano desejado.'],
  ['Posso transferir para outro endereço?', 'A transferência depende da cobertura no novo endereço. Entre em contato com antecedência para confirmar viabilidade, agendamento e condições.'],
];
export const connectionSteps = [
  { title: 'Confira cabos e energia', text: 'Veja se o roteador está ligado e se os cabos estão bem encaixados. Não desconecte nem dobre o cabo de fibra óptica.' },
  { title: 'Reinicie o equipamento', text: 'Desligue o roteador da tomada, aguarde 30 segundos e ligue novamente. Não pressione o botão Reset: ele pode apagar as configurações.' },
  { title: 'Aguarde alguns minutos', text: 'Espere o equipamento iniciar e as luzes estabilizarem antes de tentar conectar novamente.' },
  { title: 'Teste sua conexão', text: 'Abra um site e tente conectar outro dispositivo. Se apenas um aparelho não conecta, confira o Wi-Fi dele.' },
  { title: 'Vamos resolver juntos', text: 'Ainda sem conexão? Fale com o suporte Fly e informe quais verificações você já fez.' },
];
