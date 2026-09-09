import { whatsapp } from './data/links.js';
export function validateAddress({cep, street, number}) {
  if (!/^\d{5}-?\d{3}$/.test(cep.trim())) return 'Informe um CEP válido com 8 números.';
  if (street.trim().length < 3 || street.trim().length > 150) return 'Informe o nome da rua (entre 3 e 150 caracteres).';
  if (!number.trim() || number.trim().length > 20) return 'Informe o número ou S/N.';
  return '';
}
// Adaptador: substituir por integração real de cobertura quando disponibilizada.
export function coverageLink(address) {
  const error = validateAddress(address);
  if (error) throw new Error(error);
  return whatsapp(`Olá! Gostaria de consultar disponibilidade da Fly para:\nCEP: ${address.cep.trim()}\nRua: ${address.street.trim()}\nNúmero: ${address.number.trim()}`);
}
