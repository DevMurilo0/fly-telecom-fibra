import { whatsapp } from './links.js';
export const plans = [
  { id: 'essencial', name: 'Fly Essencial', speed: '300', unit: 'Mega', price: 69.90, wifi: 'Wi-Fi Básico', home: false, streaming: 'Watch + Zapping', support: 'Atendimento local', benefits: ['Wi-Fi Básico', 'Stream filmes e séries', 'Atendimento local'], caption: 'Para o seu dia a dia.' },
  { id: 'familia', name: 'Fly Família', speed: '500', unit: 'Mega', price: 74.90, wifi: 'Wi-Fi Premium', home: true, streaming: 'Watch + Zapping', support: 'Atendimento local', benefits: ['Wi-Fi Premium', 'Casa Conectada', 'Stream filmes e séries'], caption: 'Mais conexão para compartilhar.' },
  { id: 'premium', name: 'Fly Premium', speed: '700', unit: 'Mega', price: 79.90, wifi: 'Wi-Fi Premium', home: true, streaming: 'Watch + Zapping', support: 'Atendimento prioritário', benefits: ['Wi-Fi Premium + Casa Conectada', 'Stream filmes e séries', 'Atendimento prioritário'], caption: 'Para viver todas as possibilidades.', featured: true },
  { id: 'black', name: 'Fly Black', speed: '1', unit: 'Giga', price: 119.90, wifi: 'Wi-Fi Black', home: true, streaming: 'Watch + Zapping', support: 'Suporte em até 1 hora', benefits: ['Wi-Fi Black + Casa Conectada', 'Stream filmes e séries', 'Suporte em até 1 hora', 'Instalação prioritária'], caption: 'Sua conexão em outro nível.' },
];
export const money = value => value.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
export const planLink = plan => whatsapp(`Olá! Vim pelo site da Fly Telecom Fibra e gostaria de saber sobre o plano ${plan.name} de ${plan.speed} ${plan.unit}.`);
export function recommendPlan({people, usage, devices}) {
  if (!['1–2', '3–4', '5+'].includes(people) || !['Streaming', 'Jogos', 'Home office', 'Redes sociais', 'Tudo isso'].includes(usage) || !['Até 5', '6–10', '10+'].includes(devices)) return null;
  if (people === '5+' && devices === '10+' && usage === 'Tudo isso') return plans[3];
  if (people === '5+' || devices === '10+' || usage === 'Tudo isso') return plans[2];
  if (people === '3–4' || devices === '6–10' || ['Jogos', 'Home office'].includes(usage)) return plans[1];
  return plans[0];
}
