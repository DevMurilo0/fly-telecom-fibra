import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { Script, createContext } from 'node:vm';
import { resolve } from 'node:path';
import { pathToFileURL, fileURLToPath } from 'node:url';
import { render } from '../src/render.js';

const html = await readFile('index.html', 'utf8');
const css = await readFile('css/style.css', 'utf8');
const js = await readFile('js/main.js', 'utf8');

test('entrypoint abre com recursos locais tanto em file:// quanto no subdiretório do Pages', async () => {
  const fileBase = pathToFileURL(resolve('index.html'));
  const pagesBase = new URL('https://usuario.github.io/fly-telecom-fibra/');
  const paths = [...html.matchAll(/(?:src|href)="(\.\/[^"#]+)"/g)].map(m => m[1]);
  assert.ok(paths.includes('./css/style.css'));
  assert.ok(paths.includes('./js/main.js'));
  for (const path of paths) {
    assert.ok((await readFile(fileURLToPath(new URL(path, fileBase)))).length, path);
    assert.ok(new URL(path, pagesBase).pathname.startsWith('/fly-telecom-fibra/'), path);
  }
  for (const match of css.matchAll(/url\(['"]?([^)'"\s]+)['"]?\)/g)) {
    const file = new URL(match[1], pathToFileURL(resolve('css/style.css')));
    assert.ok((await readFile(fileURLToPath(file))).length);
    assert.ok(new URL(match[1], new URL('css/style.css', pagesBase)).pathname.startsWith('/fly-telecom-fibra/'));
  }
  assert.doesNotMatch(html, /(?:src|href)="\/(?!\/)/);
  assert.doesNotMatch(html, /type="module"|rel="manifest"/);
  assert.doesNotMatch(js, /^\s*(?:import|export)\s|\bfetch\s*\(/m);
  new Script(js);
});

test('metadados podem apontar para GitHub Pages sem alterar links oficiais de atendimento', () => {
  const page = render({ siteUrl: 'https://usuario.github.io/fly-telecom-fibra' });
  assert.ok(page.includes('rel="canonical" href="https://usuario.github.io/fly-telecom-fibra/"'));
  assert.ok(page.includes('https://usuario.github.io/fly-telecom-fibra/assets/logo.png'));
  assert.ok(page.includes('https://flytelecom.sgp.tsmx.com.br/accounts/central/login'));
});

test('distribuição corresponde à versão aberta na raiz', async () => {
  for (const file of ['index.html','js/main.js','css/style.css','robots.txt','sitemap.xml','.nojekyll']) {
    assert.deepEqual(await readFile(file), await readFile(`dist/${file}`), file);
  }
});

// DOM event fixtures, not a browser. Exercise the exact classic script under a file URL.
class Element {
  constructor() { this.attrs = {}; this.handlers = {}; this.children = []; this.textContent = ''; this.style = {}; this.classes = new Set(); this.entries = {}; }
  classList = {
    add: (...names) => names.forEach(n => this.classes.add(n)),
    remove: (...names) => names.forEach(n => this.classes.delete(n)),
    contains: name => this.classes.has(name),
    toggle: (name, force) => { const add = force ?? !this.classes.has(name); add ? this.classes.add(name) : this.classes.delete(name); return add; },
  };
  setAttribute(k,v) { this.attrs[k] = v; }
  getAttribute(k) { return this.attrs[k]; }
  addEventListener(type,fn) { (this.handlers[type] ??= []).push(fn); }
  emit(type, extras={}) { for (const fn of this.handlers[type] || []) fn({target:this,currentTarget:this,preventDefault(){},...extras}); }
  append(...children) { this.children.push(...children); }
  replaceChildren(...children) { this.children = children; }
  focus() { this.focused = true; }
  contains(target) { return target === this; }
  querySelector() { return this.closeButton ??= new Element(); }
  showModal() { this.open = true; }
  close() { this.open = false; this.emit('close'); }
}
function setup() {
  const elements = new Map();
  const get = selector => { if (!elements.has(selector)) elements.set(selector,new Element()); return elements.get(selector); };
  const steps = Array.from({length:5},()=>new Element());
  const document = new Element();
  document.querySelector = get;
  document.querySelectorAll = selector => selector === 'dialog' ? [get('#compare-dialog'), get('#legal-dialog')] : selector === '.step-track span' ? steps : [];
  document.createElement = () => new Element();
  document.body = new Element(); document.documentElement = new Element();
  const location = {protocol:'file:',hash:'',href:'file:///website/index.html',assign(url){this.href=url;}};
  const window = new Element(); window.scrollY = 0; window.location = location;
  const context = createContext({document,window,location,URL,Date,encodeURIComponent,decodeURIComponent,requestAnimationFrame:fn=>fn(),matchMedia:()=>({matches:true,addEventListener(){}}),FormData:class {constructor(form){this.values=Object.entries(form.entries);} [Symbol.iterator](){return this.values[Symbol.iterator]();}}});
  new Script(js).runInContext(context);
  return {get,location,document};
}
test('JavaScript clássico inicia sem erro e mantém menu, modal e foco em ambiente file://', () => {
  const {get,document} = setup();
  get('.menu-toggle').emit('click');
  assert.equal(get('.menu-toggle').getAttribute('aria-expanded'),'true');
  assert.ok(get('#navigation').classList.contains('open'));
  document.emit('keydown',{key:'Escape'});
  assert.equal(get('.menu-toggle').getAttribute('aria-expanded'),'false');
  assert.ok(get('.menu-toggle').focused);
  get('#compare-open').emit('click');
  assert.equal(get('#compare-dialog').open,true);
  assert.equal(document.body.style.overflow,'hidden');
  get('#compare-dialog').querySelector('.close-dialog').emit('click');
  assert.equal(get('#compare-dialog').open,false);
  assert.equal(document.body.style.overflow,'');
  assert.ok(get('#compare-open').focused);
});
test('seletor, cobertura e assistente mantêm interações sem módulo HTTP', () => {
  const {get,location} = setup();
  get('#finder-form').entries = {people:'3–4',usage:'Tudo isso',devices:'6–10'};
  get('#finder-form').emit('change');
  assert.equal(get('#finder-progress').textContent,'3 de 3 respostas');
  assert.equal(get('#finder-result').children[1].href,'#plano-premium');
  get('#coverage-form').entries = {cep:'123',street:'Rua Teste',number:'10'};
  get('#coverage-form').emit('submit');
  assert.ok(get('#coverage-error').textContent);
  assert.equal(location.href,'file:///website/index.html');
  get('#coverage-form').entries.cep = '55640-000';
  get('#coverage-form').emit('submit');
  assert.equal(new URL(location.href).hostname,'wa.me');
  assert.ok(new URL(location.href).searchParams.get('text').includes('Rua Teste'));
  for (let i=0;i<4;i++) get('#step-next').emit('click');
  assert.equal(get('#step-count').textContent,'05 / 05');
  assert.ok(get('#step-next').classList.contains('hidden'));
  assert.ok(get('.step-contact').focused);
  get('#step-back').emit('click');
  assert.equal(get('#step-count').textContent,'04 / 05');
});
