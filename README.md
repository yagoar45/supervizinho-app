# Vizinho — preview para pitch

Micro-marketplace de serviços entre vizinhos. **Este repositório é um preview de
interface**, não um produto: não há backend, autenticação nem pagamento real.
Todos os dados vêm de [`src/lib/mock.ts`](src/lib/mock.ts) e as cidades, bairros
e faixas de preço são de Betim/MG de propósito.

## Rodar

```bash
npm install
npm run dev
```

## Telas

| Rota | O que mostra |
| --- | --- |
| `/` | Categorias, pedidos em aberto no bairro, vizinhos por perto |
| `/buscar` | Busca com ordenação por distância, nota, preço e verificação |
| `/profissional/[id]` | Habilidades com preço próprio, fotos do trabalho, certificados, avaliações |
| `/contratar/[id]` | Pagamento retido — o mecanismo central da proposta |
| `/pedidos` | Pedidos por estado, com o total retido em destaque |
| `/perfil` | Perfil do contratante e convite para virar prestador |
| `/cadastrar` | Cadastro de habilidade com foto e certificado |

## O que a demo defende

**Direto, não intermediado.** O contraste com o GetNinjas é proposital: aqui se
vê o vizinho, o preço e a distância antes de falar com alguém, e o contato é
direto. Não existe "a plataforma procura um profissional para te retornar".

**Pagamento retido.** Em `/contratar/[id]` dá para percorrer os quatro estados:
combinar, pagar (o dinheiro fica com a plataforma), liberar após o "ok", ou
abrir problema (o dinheiro não é transferido). A taxa de 10% aparece explícita
na conta.

**Várias habilidades por pessoa.** O perfil lista serviços com preço próprio,
em vez de encaixar a pessoa numa profissão só — a mesma vizinha faz bolo de
pote e doce de festa, com preços diferentes.

## Decisões de design

O conceito é **"a rua"**: o chrome do app é quase monocromático (tinta escura,
branco, um verde) e toda a cor vive nas oito fachadas de categoria, como uma
fileira de casas pintadas. Os números nas fachadas são demanda em aberto —
informação, não enfeite.

Tipografia: Bricolage Grotesque nos títulos, Figtree no corpo.

A partir de `sm` o app vira um aparelho centralizado sobre fundo escuro, para
apresentar no notebook sem parecer um site esticado.

## Stack

Next.js 16 (App Router) · React 19 · Tailwind 4 · shadcn/ui · Framer Motion.

A navegação inferior é adaptada do componente
[Bottom Nav Bar](https://21st.dev/@arunachalam/components/bottom-nav-bar) do
21st.dev, trocando estado local por rotas reais do App Router.
