import { recommendPlan } from './data/plans.js';
import { whatsapp } from './data/links.js';
import { company } from './data/company.js';
import { connectionSteps } from './data/faq.js';
import { coverageLink, validateAddress } from './coverage.js';
const $ = selector => document.querySelector(selector);
const header = $('#header');
const menuButton = $('.menu-toggle');
const nav = $('#navigation');
function closeMenu(returnFocus = false) {
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Abrir menu');
  nav.classList.remove('open');
  if (returnFocus) menuButton.focus();
}
menuButton.addEventListener('click', () => {
  const isOpen = menuButton.getAttribute('aria-expanded') !== 'true';
  menuButton.setAttribute('aria-expanded', String(isOpen));
  menuButton.setAttribute('aria-label', isOpen ? 'Fechar menu' : 'Abrir menu');
  nav.classList.toggle('open', isOpen);
});
nav.addEventListener('click', event => { if (event.target.closest('a')) closeMenu(); });
document.addEventListener('keydown', event => { if (event.key === 'Escape' && nav.classList.contains('open')) closeMenu(true); });
document.addEventListener('click', event => { if (!header.contains(event.target)) closeMenu(); });
matchMedia('(min-width: 1241px)').addEventListener('change', event => { if (event.matches) closeMenu(); });
let scheduled = false;
const updateHeader = () => { header.classList.toggle('scrolled', window.scrollY > 35); scheduled = false; };
window.addEventListener('scroll', () => { if (!scheduled) { scheduled = true; requestAnimationFrame(updateHeader); } }, { passive: true });
updateHeader();
const motion = matchMedia('(prefers-reduced-motion: reduce)');
if (!motion.matches && 'IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
  }), { threshold: 0.06 });
  document.querySelectorAll('.reveal').forEach(node => observer.observe(node));
  document.documentElement.classList.add('js-motion');
  // Ensure in-page navigation reveals the destination immediately.
  const revealAnchor = () => {
    let id;
    try { id = decodeURIComponent(location.hash.slice(1)); } catch { return; }
    const target = document.getElementById(id);
    if (!target) return;
    target.closest('.reveal')?.classList.add('visible');
    target.querySelectorAll('.reveal').forEach(node => node.classList.add('visible'));
  };
  window.addEventListener('hashchange', revealAnchor);
  revealAnchor();
}
let lastDialogTrigger;
function openDialog(dialog, trigger) {
  lastDialogTrigger = trigger;
  dialog.showModal();
  document.body.style.overflow = 'hidden';
  dialog.querySelector('.close-dialog').focus();
}
document.querySelectorAll('dialog').forEach(dialog => {
  dialog.querySelector('.close-dialog').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => {
    const rect = dialog.getBoundingClientRect();
    if (event.target === dialog && (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom)) dialog.close();
  });
  dialog.addEventListener('close', () => { document.body.style.overflow = ''; lastDialogTrigger?.focus(); });
});
$('#compare-open').addEventListener('click', event => openDialog($('#compare-dialog'), event.currentTarget));
const finderForm = $('#finder-form');
function showRecommendation() {
  const values = Object.fromEntries(new FormData(finderForm));
  const answered = Object.keys(values).length;
  $('#finder-progress').textContent = `${answered} de 3 respostas`;
  const plan = recommendPlan(values);
  const result = $('#finder-result');
  if (!plan) return;
  result.replaceChildren();
  const label = document.createElement('span');
  label.append('Para o seu perfil, sugerimos ');
  const strong = document.createElement('strong');
  strong.textContent = plan.name;
  label.append(strong, '.');
  const link = document.createElement('a');
  link.href = `#plano-${plan.id}`;
  link.className = 'text-button';
  link.textContent = 'Conhecer plano →';
  result.append(label, link);
}
finderForm.addEventListener('change', showRecommendation);
finderForm.addEventListener('submit', event => { event.preventDefault(); showRecommendation(); });
const coverageForm = $('#coverage-form');
$('#cep').addEventListener('input', event => {
  const value = event.target.value.replace(/\D/g, '').slice(0, 8);
  event.target.value = value.length > 5 ? `${value.slice(0, 5)}-${value.slice(5)}` : value;
});
coverageForm.addEventListener('input', () => { $('#coverage-error').textContent = ''; });
coverageForm.addEventListener('submit', event => {
  event.preventDefault();
  const address = Object.fromEntries(new FormData(coverageForm));
  const error = validateAddress(address);
  $('#coverage-error').textContent = error;
  if (error) return;
  // Same-tab navigation avoids popup blockers and never claims coverage was checked.
  window.location.assign(coverageLink(address));
});
let step = 0;
function updateStep() {
  const current = connectionSteps[step];
  $('#step-count').textContent = `${String(step + 1).padStart(2, '0')} / 05`;
  $('#step-content h4').textContent = current.title;
  $('#step-content p').textContent = current.text;
  $('#step-back').disabled = step === 0;
  const finalStep = step === connectionSteps.length - 1;
  $('#step-next').classList.toggle('hidden', finalStep);
  $('.step-contact').classList.toggle('hidden', !finalStep);
  document.querySelectorAll('.step-track span').forEach((node, i) => node.classList.toggle('active', i <= step));
  if (finalStep) $('.step-contact').focus();
}
$('#step-back').addEventListener('click', () => { step = Math.max(0, step - 1); updateStep(); if (step === 0) $('#step-next').focus(); });
$('#step-next').addEventListener('click', () => { step = Math.min(connectionSteps.length - 1, step + 1); updateStep(); });
const legalContent = {
  privacy: { title: 'Privacidade', paragraphs: [
    'Este website não usa cookies de publicidade ou ferramentas de rastreamento. As respostas do seletor de planos são processadas no seu navegador, sem envio a um servidor.',
    'Na consulta de cobertura, o endereço preenchido é incluído em uma mensagem no WhatsApp. Você decide se deseja enviá-la à Fly. O WhatsApp, a Central do Assinante, as lojas de aplicativos e os testes de velocidade possuem suas próprias políticas de privacidade.',
    'Para obter a política oficial da empresa ou informações sobre o tratamento dos seus dados, solicite atendimento à Fly.'
  ] },
  terms: { title: 'Informações e condições', paragraphs: [
    company.residentialTerms, company.meshTerms,
    'O seletor de planos oferece uma sugestão baseada nas respostas informadas, sem garantir desempenho. A consulta de cobertura é encaminhada ao atendimento e não constitui confirmação de disponibilidade.',
    'A contratação e as condições de prestação do serviço são formalizadas diretamente com a Fly. Solicite o contrato e os termos oficiais antes de contratar.'
  ] },
  lgpd: { title: 'Seus dados pessoais', paragraphs: [
    'Para solicitar informações, acesso, correção ou exclusão de dados pessoais mantidos pela Fly, entre em contato com a equipe e informe a natureza da sua solicitação.',
    'Não envie senhas, documentos ou outros dados sensíveis na mensagem inicial. A equipe deve orientar a identificação e o canal adequado para atender seu pedido.'
  ] },
};
document.querySelectorAll('[data-legal]').forEach(button => button.addEventListener('click', () => {
  const content = legalContent[button.dataset.legal];
  $('#legal-title').textContent = content.title;
  const paragraphs = content.paragraphs.map(text => { const p = document.createElement('p'); p.textContent = text; return p; });
  const contact = document.createElement('a');
  contact.href = whatsapp('Olá! Gostaria de informações sobre privacidade, dados pessoais e documentos oficiais da Fly.');
  contact.target = '_blank'; contact.rel = 'noopener noreferrer'; contact.textContent = 'Solicitar informações à Fly (nova aba)';
  $('#legal-content').replaceChildren(...paragraphs, contact);
  openDialog($('#legal-dialog'), button);
}));
$('#year').textContent = new Date().getFullYear();
