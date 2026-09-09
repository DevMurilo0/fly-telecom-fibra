# Fly Telecom Fibra — Website

Website institucional da Fly Telecom Fibra, em Gravatá — PE. Design em azul profundo, composição gráfica de fibra, planos residenciais, Casa Conectada, serviços empresariais e atendimento local. HTML, CSS e JavaScript nativos, com assets oficiais e fonte hospedada no projeto. Sem dependências npm, backend ou ferramentas de rastreamento.

## Visualização

**O arquivo principal é `index.html`, na raiz. Abra-o diretamente com um duplo clique.**

Não é necessário instalar Node.js, executar comandos ou iniciar um servidor para visualizar o site. CSS, imagens, fonte e JavaScript usam caminhos relativos. Menu, comparador, seletor, FAQ, animações e assistente de conexão funcionam localmente em navegadores modernos. O JavaScript entregue é um script convencional, sem importações de módulos, requisições locais ou dependência de HTTP.

WhatsApp, Central do Assinante, Instagram, lojas de aplicativos e testes de velocidade são serviços externos e exigem internet. A consulta de cobertura prepara uma mensagem para a equipe no WhatsApp; não simula uma resposta de disponibilidade.

## Estrutura

```text
index.html              Página principal, pronta para abrir ou publicar
assets/                 Logos, imagem oficial do app, favicon e fonte local
css/style.css           Identidade, proporções, animações e responsividade
js/main.js              JavaScript convencional gerado, compatível com file://
src/data/               Dados comerciais centralizados e editáveis
src/render.js           Componentes que geram o HTML
src/app.js              Interações editáveis do website
src/coverage.js         Validação e encaminhamento da consulta de cobertura
scripts/                Geração estática e servidor opcional
tests/                 Testes de conteúdo, caminhos e interações
docs/                  Fontes de conteúdo e licença da fonte
robots.txt              Orientações de indexação
sitemap.xml             URL pública principal
.nojekyll               Publicação estática direta no GitHub Pages
```

`dist/` é uma cópia gerada dos arquivos necessários para hospedagem. Não precisa ser versionada. O website pronto também fica na raiz, de forma que clonar o repositório já permite abrir `index.html`.

## Alterando planos

Edite **`src/data/plans.js`**, no array `plans`:

- `name`: nome do plano;
- `speed` e `unit`: velocidade e unidade;
- `price`: preço mensal numérico, com ponto decimal (ex.: `74.90`);
- `benefits`: lista de benefícios;
- `wifi`, `home`, `streaming` e `support`: informações do comparador;
- `featured`: destaque editorial do plano;
- `caption`: descrição curta.

Nesse mesmo arquivo estão `recommendPlan`, que sugere um perfil, e `planLink`, que monta a mensagem de contratação. A recomendação não calcula desempenho técnico.

Após alterar dados ou arquivos de `src/`, execute **`npm run build`** com Node.js 22 ou superior. Esse comando atualiza `index.html`, `js/main.js` e a cópia `dist/`. Não há instalação de dependências. Evite editar o HTML e o JavaScript gerados: uma geração posterior substitui essas alterações. O CSS em `css/style.css` é editável diretamente.

## Informações da empresa

- **`src/data/company.js`**: telefone formatado (`phone`), telefone para ligação (`phoneRaw`), número do WhatsApp (`whatsapp`), endereço, domínio oficial e condições comerciais.
- **`src/data/links.js`**: Instagram, Central do Assinante, App Store, Google Play e testes de velocidade.
- **`src/data/faq.js`**: perguntas frequentes e etapas de orientação de conexão.

Não inclua tokens, credenciais ou chaves privadas nesses arquivos: todo o código entregue é público. Nenhuma integração privada é necessária.

## Deploy

Compatível com **GitHub Pages, Netlify, Vercel e outras hospedagens estáticas**. Não há servidor de aplicação ou regra de fallback de SPA. Os arquivos carregam tanto em domínio próprio quanto em um subdiretório, como `https://usuario.github.io/fly-telecom-fibra/`.

### GitHub Pages

Os arquivos prontos estão versionados na raiz. No repositório, selecione **Settings → Pages → Deploy from a branch → main → / (root)**. O arquivo `.nojekyll` preserva a publicação estática. Não é necessário configurar Actions ou executar um build no GitHub.

O repositório local usa a branch `main`. Para publicar um repositório novo com o GitHub CLI instalado e autenticado, execute:

```sh
gh repo create fly-telecom-fibra --public --source=. --remote=origin --push
```

Esse comando é para um repositório ainda sem `origin`. Se um remote já estiver configurado, confira-o com `git remote -v` e use `git push -u origin main`, sem force push.

### Netlify e Vercel

Selecione um projeto estático, sem framework. Use `npm run build` como comando de build e `dist` como diretório de saída. O Netlify também permite enviar diretamente a pasta `dist/`.

### Domínio e SEO

Os metadados mantêm o domínio oficial da Fly por padrão. Para publicar definitivamente em outro endereço, gere com a URL completa, incluindo o subdiretório quando houver:

```sh
SITE_URL=https://usuario.github.io/fly-telecom-fibra npm run build
```

Isso atualiza canonical, Open Graph, dados estruturados, robots e sitemap, sem alterar os links oficiais de atendimento. Para o Pages publicar essa atualização, inclua os arquivos gerados no próximo commit e push. A navegação visual já funciona em subdiretórios mesmo sem essa alteração de SEO.

## Verificação e manutenção

```sh
npm run check
```

Verifica sintaxe, gera o website e executa testes de regras comerciais, 45 perfis de recomendação, validação de endereço, âncoras, assets, metadados, resolução de caminhos `file://` e GitHub Pages, paridade da distribuição e eventos de menu, modal, seletor, cobertura e assistente. Os testes de interação usam um DOM simulado no Node.js; não substituem uma conferência visual em navegador.

A revisão de layout considera 360, 390, 430, 768, 1024, 1366, 1440 e 1920px. Textos principais usam aproximadamente 16–18px; informações secundárias usam 14px. Apenas anotações gráficas decorativas usam 12px. Títulos e destaques usam escalas fluidas. `prefers-reduced-motion`, teclado e foco são preservados.

Por solicitação, não são executados navegador, automação de screenshots ou Lighthouse. Não há pontuação de performance presumida. Um servidor de prévia continua disponível opcionalmente com `npm run dev`, mas **não é necessário para abrir o site**.

As divergências comerciais identificadas e as fontes estão em `docs/content-sources.md`. Não foram inventados depoimentos, indicadores de cobertura ou prazos conflitantes. Os textos de privacidade explicam o comportamento do website e oferecem contato para solicitar os documentos oficiais da empresa.
