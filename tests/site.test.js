import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { plans, planLink, recommendPlan, money } from '../src/data/plans.js';
import { company } from '../src/data/company.js';
import { links, whatsapp } from '../src/data/links.js';
import { coverageLink, validateAddress } from '../src/coverage.js';
import { render } from '../src/render.js';

test('mensagens de contratação correspondem a cada plano e ao número oficial', () => {
  for (const plan of plans) {
    const url = new URL(planLink(plan));
    assert.equal(url.pathname, `/${company.whatsapp}`);
    assert.ok(url.searchParams.get('text').includes(`${plan.name} de ${plan.speed} ${plan.unit}`));
    assert.match(money(plan.price), /^\d+,\d{2}$/);
  }
});
test('todas as combinações válidas recebem uma sugestão, sem recomendar com dados incompletos', () => {
  assert.equal(recommendPlan({people:'1–2'}), null);
  assert.equal(recommendPlan({people:'invalid',usage:'Jogos',devices:'Até 5'}), null);
  for (const people of ['1–2','3–4','5+']) for (const usage of ['Streaming','Jogos','Home office','Redes sociais','Tudo isso']) for (const devices of ['Até 5','6–10','10+']) assert.ok(plans.includes(recommendPlan({people,usage,devices})));
  assert.equal(recommendPlan({people:'1–2',usage:'Redes sociais',devices:'Até 5'}).id,'essencial');
  assert.equal(recommendPlan({people:'3–4',usage:'Home office',devices:'6–10'}).id,'familia');
  assert.equal(recommendPlan({people:'3–4',usage:'Tudo isso',devices:'6–10'}).id,'premium');
  assert.equal(recommendPlan({people:'5+',usage:'Tudo isso',devices:'10+'}).id,'black');
});
test('cobertura rejeita endereços incompletos e preserva acentos, número e quebras de linha', () => {
  const valid = {cep:'55640-000',street:'Rua São José & Câmara',number:'S/N'};
  assert.equal(validateAddress(valid), '');
  for (const invalid of [{...valid,cep:'123'}, {...valid,street:'  '}, {...valid,number:''}]) {
    assert.ok(validateAddress(invalid));
    assert.throws(() => coverageLink(invalid));
  }
  const url = new URL(coverageLink(valid));
  assert.equal(url.searchParams.get('text'), 'Olá! Gostaria de consultar disponibilidade da Fly para:\nCEP: 55640-000\nRua: Rua São José & Câmara\nNúmero: S/N');
});
test('links externos usam HTTPS e configuração comercial é consistente', () => {
  Object.values(links).forEach(link => assert.equal(new URL(link).protocol,'https:'));
  assert.equal(new URL(whatsapp()).hostname,'wa.me');
  assert.equal(new Set(plans.map(p=>p.id)).size,plans.length);
});
test('HTML tem âncoras válidas, IDs únicos e assets existentes', async () => {
  const html = render();
  const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);
  assert.equal(new Set(ids).size,ids.length);
  for (const match of html.matchAll(/href="#([^"]+)"/g)) assert.ok(ids.includes(match[1]),`Âncora inexistente: ${match[1]}`);
  for (const match of html.matchAll(/(?:src|href)="(\.\/assets\/[^"#]+)"/g)) assert.ok((await readFile(match[1])).length);
  assert.ok(html.includes('<html lang="pt-BR">'));
  assert.ok(html.includes('application/ld+json'));
  assert.ok(html.includes('aria-live="polite"'));
  assert.ok(!html.includes('href="#"'));
  for (const plan of plans) assert.ok(html.includes(`id="plano-${plan.id}"`));
});
test('documento estruturado não inventa avaliações e repete endereço oficial', () => {
  const html = render();
  const data = JSON.parse(html.match(/<script type="application\/ld\+json">(.*?)<\/script>/s)[1]);
  assert.equal(data.telephone, company.phoneRaw);
  assert.equal(data.address.addressLocality,company.city);
  assert.equal(data.aggregateRating,undefined);
});
