import { company } from './company.js';
export const links = {
  central: 'https://flytelecom.sgp.tsmx.com.br/accounts/central/login',
  instagram: 'https://www.instagram.com/fly.telecomfibra/',
  apple: 'https://apps.apple.com/br/app/fly-telecom/id6758914646',
  google: 'https://play.google.com/store/apps/details?id=flytel.app.quark.flytelecom',
  speedtest: 'https://www.speedtest.net/pt', connection: 'https://www.minhaconexao.com.br/', nperf: 'https://www.nperf.com/pt/',
  original: company.domain,
};
export const whatsapp = (message = 'Olá! Vim pelo site da Fly Telecom Fibra e gostaria de atendimento.') => `https://wa.me/${company.whatsapp}?text=${encodeURIComponent(message)}`;
