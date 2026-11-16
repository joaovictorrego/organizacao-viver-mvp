# Plano — Protótipo da tela inicial da Organização Viver

## Escopo e implementação

Construir uma única tela web responsiva de entrada/menu inicial para apresentar o propósito do MVP da Organização Viver, as ações do menu e o acesso destacado ao fluxo central de registro de entrega de benefício. Usar somente dados demonstrativos fictícios, sem backend, autenticação real ou persistência. O botão “Registrar entrega” abre uma simulação local com beneficiário, item e quantidade fictícios; confirmação apresenta resultado demonstrativo sem salvar dados. Itens de menu adicionais permanecem como affordances acessíveis, com retorno informativo de que outras telas não fazem parte deste protótipo.

O pacote Figma fornecido foi inspecionado antes da implementação: `frame.webp` é um quadro branco sem conteúdo visual e `code.jsx` contém apenas um `div` vazio; nenhum `setup-figma.py` ou asset de imagem/fontes veio no ZIP. Portanto, não há elementos, cores, tipografia ou componentes substantivos que possam ser reproduzidos literalmente. O protótipo usará o frame como referência em branco e dará forma à tela pedida no contexto aprovado anteriormente.

### Design escolhido

- **Possíveis direções exploradas (probabilidades baixas por falta de estilo de referência):** painel cívico editorial — 0,07; console institucional de serviço — 0,06; cartão de atendimento acolhedor — 0,05.
- **Direção escolhida:** painel cívico editorial, priorizando identificação rápida de tarefas e clareza operacional.
- **Princípios:** hierarquia simples; linguagem direta; interações demonstráveis; interface acessível em desktop e celular.
- **Paleta:** fundo marfim muito claro e superfícies brancas para reduzir ruído; azul-petróleo escuro para navegação e confiança; verde folha como acento para cuidado e ações positivas; tons âmbar e coral somente como alertas acompanhados por texto/símbolo.
- **Layout:** barra lateral fixa em desktop e menu compacto em telas estreitas; área principal com saudação/contexto, ação central de registrar entrega e resumo visual fictício de rotinas.
- **Elementos distintivos:** marca abstrata de duas folhas em traço simples; cartões de resumo com bordas suaves; chip “Ambiente de demonstração — dados fictícios”.
- **Interação:** transições explícitas, foco visível, respostas curtas após ações, sem persistir entradas.
- **Animação:** transições discretas de opacidade/elevação (150–200 ms), respeitando `prefers-reduced-motion`.
- **Tipografia:** família sans-serif de sistema, com títulos de peso 650–700 e corpo de 15–16 px; import externo de fontes não necessário.
- **Essência/voz:** painel de apoio operacional para equipe da Organização Viver; claro, acolhedor e confiável. Microcopy objetiva, por exemplo “Registrar entrega” e “Confira o saldo antes de confirmar”.
- **Marca:** não criar denominação nova para o software; identificar a instituição como “Organização Viver” e o propósito como “Gestão do acolhimento”. Marca gráfica abstrata sem alegar ser logotipo oficial.

## Tecnologia e estrutura

React com Vite e TypeScript/JavaScript mínimo, sem serviços de backend. Estrutura esperada: `src/App` para tela e estados da simulação; `src/styles` para tokens e layout responsivo; `public/manus-routes.json` para declarar a rota única; `public/` para ícone/artefatos locais. Os controles usarão elementos semânticos nativos, labels associados, estados acessíveis e foco visível. O formulário demonstrativo valida campos básicos e apresenta um resultado fictício; não grava entradas nem chama APIs.

## Restrições

Manter uma tela inicial principal, sem implementar painel de produção, autenticação verdadeira, cadastros persistentes ou indicadores analíticos. Não usar nomes, contatos ou qualquer dado real de beneficiários. O botão central poderá abrir diálogo de protótipo, mas não deverá sugerir que uma entrega real foi efetuada. A captura de entrega será da tela inicial, não da tela modal.