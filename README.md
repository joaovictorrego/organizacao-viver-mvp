# Organização Viver — protótipo da tela inicial

Protótipo web acadêmico para demonstrar uma interface de apoio à rotina de acolhimento da Organização Viver. A tela inicial apresenta o menu e abre uma simulação de registro de entrega de benefício com dados exclusivamente fictícios.

## Tecnologias e requisitos

- Node.js 22.x (`>=22 <23`, conforme `package.json`).
- pnpm 11.25.0, gerenciado pelo Corepack ou instalado no ambiente.
- React 19, TypeScript 5 e Vite 6.

## Executar localmente

Na raiz do repositório:

```bash
pnpm install
pnpm dev -- --port 3000
```

Abra `http://localhost:3000`. O servidor de desenvolvimento também pode escolher outra porta livre se 3000 estiver ocupada.

## Verificação e build

```bash
pnpm test
pnpm build
```

`pnpm test` usa o runner nativo `node:test` para conferir os limites e as mensagens da regra de quantidade; não instala dependências de teste. `pnpm build` executa a verificação TypeScript e gera os arquivos de produção em `dist/`.

Para servir localmente o build, primeiro execute `pnpm build` e depois:

```bash
pnpm preview -- --port 4173
```

## Fluxo demonstrativo

Use **Registrar entrega** para abrir o formulário. É possível selecionar um dos beneficiários fictícios (Ana Exemplo ou João Exemplo), um item (cesta básica, leite integral ou medicamento demonstrativo) e uma quantidade dentro do saldo demonstrativo correspondente. A confirmação mostra as seleções e o saldo calculado para aquela simulação; uma nova simulação retorna aos valores padrão.

## Limites do protótipo

Este projeto é somente uma interface de demonstração. Não possui backend, conexão com banco de dados, autenticação real ou persistência. Nenhuma entrega ou alteração de estoque é gravada; os saldos, nomes e atividades exibidos são fictícios e servem apenas para demonstrar o fluxo. Não use dados reais de pessoas atendidas.
