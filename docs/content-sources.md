# Fontes e decisões de conteúdo

Consulta das informações comerciais: 8 de setembro de 2026.
Refinamento e preparação estática: 9 de setembro de 2026.

- https://flytelecomfibra.com.br/ — contato, endereço, planos, app, Casa Conectada, promoção, FAQ e links. Snapshot preservado localmente em `source-official.html`, ignorado pelo Git.
- https://flytelecomfibra.com.br/planos-empresariais/ — fibra empresarial, simetria, prioridade, monitoramento, IP fixo, internet dedicada e SLA. Nenhum prazo empresarial numérico foi reproduzido devido a variações entre as ofertas.
- https://www.instagram.com/fly.telecomfibra/ — link oficial mantido; a ferramenta de consulta não conseguiu obter seu conteúdo. Nenhuma foto ou informação foi inferida desse perfil.

Assets baixados sem redesenho:

- `/wp-content/uploads/2026/02/logo-Fly-Telecom-Fibra-BRANCO-1024x682.png`
- `/wp-content/uploads/2025/11/Watch.svg`
- `/wp-content/uploads/2026/03/Logotipo_Zapping.png`
- `/wp-content/uploads/2026/03/Aplicativo-Tela-Inicial.png`
- `/wp-content/uploads/2026/03/cropped-FAVICON-Fly-Telecom-Fibra-192x192.png`

Todos pertencem ao domínio oficial. A imagem do aplicativo é o material promocional original; não foi inventada uma interface. O gráfico de fibra e a planta de Wi-Fi são elementos vetoriais de apresentação, não mapas de cobertura nem indicadores medidos.

## Decisões

- Instalação: a página menciona 24h e 48h; usado texto neutro para consulta por endereço.
- Velocidade residencial: a home e o FAQ divergem sobre simetria; não prometida simetria nos planos residenciais.
- Premium: destacado como sugestão editorial, sem alegar ser mais vendido.
- Watch e Zapping: aparecem nos quatro planos da fonte. Catálogo e condições de acesso devem ser confirmados na contratação.
- Mesh: mantida observação de taxa para segundo ponto e equipamentos em comodato.
- Indicação: desconto de 50% em uma mensalidade, condicionado ao primeiro pagamento do indicado, contato financeiro em até 30 dias e mensalidade sem pendências. Condições disponíveis no accordion da seção.
- Depoimentos: nenhum inventado ou publicado.
- Carreiras e avaliação: atalhos para atendimento, sem simular submissão de currículos ou pesquisa.
- Políticas jurídicas: documentos oficiais não encontrados. Interface informa o tratamento efetivo do website e oferece canal para solicitação, sem alegar ser uma política jurídica aprovada pela empresa.

## Atualização

Confirmar preços e condições com a Fly antes da publicação. Atualizar os módulos em `src/data/` e executar o build. Não há API de cobertura, de velocidade ou coleta de dados pessoal neste website.

## Refinamento estático

A identidade e o conteúdo comercial foram preservados. Os assets agora ficam em `assets/`; estilos em `css/style.css`. `index.html` e `js/main.js` são gerados na raiz e versionados. Não há módulos ES ou manifest exigindo HTTP na página entregue. Dados editáveis continuam centralizados em `src/data/`.
