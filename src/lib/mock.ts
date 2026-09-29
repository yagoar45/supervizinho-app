/**
 * Dados de demonstração. Nada aqui bate em API — é um preview para pitch.
 * Bairros, faixas de preço e distâncias são de Betim/MG de propósito: o
 * prospect reconhece os lugares, e isso vale mais que um dado genérico.
 */

export type Categoria = {
  slug: string
  nome: string
  emoji: string
  /** Classe Tailwind da cor de fachada. Ver --color-fachada-* em globals.css. */
  fachada: string
  pedidosAbertos: number
}

export const categorias: Categoria[] = [
  { slug: "alimentacao", nome: "Alimentação", emoji: "🍰", fachada: "bg-fachada-alimentacao", pedidosAbertos: 14 },
  { slug: "artes", nome: "Artes", emoji: "🎨", fachada: "bg-fachada-artes", pedidosAbertos: 6 },
  { slug: "beleza", nome: "Beleza", emoji: "💇", fachada: "bg-fachada-beleza", pedidosAbertos: 11 },
  { slug: "criancas", nome: "Crianças", emoji: "👶", fachada: "bg-fachada-criancas", pedidosAbertos: 5 },
  { slug: "aulas", nome: "Aulas", emoji: "📚", fachada: "bg-fachada-aulas", pedidosAbertos: 9 },
  { slug: "tecnologia", nome: "Tecnologia", emoji: "💻", fachada: "bg-fachada-tecnologia", pedidosAbertos: 7 },
  { slug: "celulares", nome: "Celulares", emoji: "📱", fachada: "bg-fachada-celulares", pedidosAbertos: 12 },
  { slug: "casa", nome: "Casa", emoji: "🏠", fachada: "bg-fachada-casa", pedidosAbertos: 21 },
]

export type Habilidade = {
  nome: string
  precoDe: number
  precoAte: number
  unidade: string
}

export type Certificado = {
  nome: string
  emissor: string
  ano: number
}

export type Trabalho = {
  titulo: string
  /** Gradiente que representa a foto do trabalho — sem asset externo no demo. */
  cor: string
}

export type Avaliacao = {
  autor: string
  nota: number
  quando: string
  texto: string
}

export type Prestador = {
  id: string
  nome: string
  iniciais: string
  categoria: string
  bairro: string
  distanciaKm: number
  nota: number
  avaliacoes: number
  verificacao: "documentos" | "verificada" | "nenhuma"
  respondeEm: string
  atendeHoje: boolean
  resumo: string
  habilidades: Habilidade[]
  certificados: Certificado[]
  trabalhos: Trabalho[]
  comentarios: Avaliacao[]
  /** Cor de fachada da categoria principal, para amarrar card e perfil. */
  fachada: string
}

export const prestadores: Prestador[] = [
  {
    id: "maria-aparecida",
    nome: "Maria Aparecida",
    iniciais: "MA",
    categoria: "Confeitaria",
    bairro: "Imbiruçu",
    distanciaKm: 2.1,
    nota: 4.9,
    avaliacoes: 214,
    verificacao: "verificada",
    respondeEm: "responde em ~8 min",
    atendeHoje: true,
    resumo:
      "Faço bolo de pote e doce de festa há onze anos, aqui em casa mesmo. Encomenda de bolo grande precisa de dois dias; doce pequeno saio no mesmo dia.",
    habilidades: [
      { nome: "Bolo de aniversário", precoDe: 300, precoAte: 500, unidade: "por bolo" },
      { nome: "Bolo de pote", precoDe: 12, precoAte: 18, unidade: "a unidade" },
      { nome: "Doces para festa", precoDe: 2, precoAte: 4, unidade: "a unidade" },
    ],
    certificados: [
      { nome: "Boas Práticas de Manipulação de Alimentos", emissor: "SENAC Betim", ano: 2023 },
      { nome: "Confeitaria Profissional", emissor: "SENAI", ano: 2019 },
    ],
    trabalhos: [
      { titulo: "Bolo de 15 anos", cor: "from-fachada-artes to-fachada-alimentacao" },
      { titulo: "Mesa de doces", cor: "from-fachada-alimentacao to-fachada-criancas" },
      { titulo: "Bolo de pote", cor: "from-fachada-criancas to-fachada-artes" },
    ],
    comentarios: [
      {
        autor: "Juliana R.",
        nota: 5,
        quando: "há 3 dias",
        texto: "Encomendei na quinta e ela entregou no sábado cedo. O bolo tinha o gosto certo, não aquele de cobertura pronta.",
      },
      {
        autor: "Carlos E.",
        nota: 5,
        quando: "há 2 semanas",
        texto: "Mora a quatro quarteirões de mim e eu não sabia. Peguei em casa e ainda conversamos.",
      },
    ],
    fachada: "bg-fachada-alimentacao",
  },
  {
    id: "rodrigo-mendes",
    nome: "Rodrigo Mendes",
    iniciais: "RM",
    categoria: "Eletricista",
    bairro: "Jardim Teresópolis",
    distanciaKm: 0.8,
    nota: 4.7,
    avaliacoes: 98,
    verificacao: "documentos",
    respondeEm: "responde em ~15 min",
    atendeHoje: true,
    resumo:
      "Trabalho com elétrica residencial. Chuveiro, tomada e disjuntor eu resolvo no mesmo dia se você chamar até as 16h.",
    habilidades: [
      { nome: "Trocar chuveiro", precoDe: 120, precoAte: 180, unidade: "o serviço" },
      { nome: "Instalar tomadas", precoDe: 60, precoAte: 90, unidade: "por ponto" },
      { nome: "Troca de disjuntor", precoDe: 90, precoAte: 140, unidade: "o serviço" },
    ],
    certificados: [
      { nome: "NR-10 — Segurança em Instalações Elétricas", emissor: "SENAI Betim", ano: 2024 },
      { nome: "Eletricista Instalador Predial", emissor: "SENAI", ano: 2016 },
    ],
    trabalhos: [
      { titulo: "Quadro reorganizado", cor: "from-fachada-aulas to-fachada-tecnologia" },
      { titulo: "Chuveiro novo", cor: "from-fachada-tecnologia to-fachada-celulares" },
    ],
    comentarios: [
      {
        autor: "Fernanda L.",
        nota: 5,
        quando: "há 5 dias",
        texto: "Chuveiro queimou no domingo de manhã. Mandei mensagem, ele veio antes do meio-dia. Moro sozinha e não saberia fazer.",
      },
      {
        autor: "Paulo S.",
        nota: 4,
        quando: "há 1 mês",
        texto: "Serviço bem feito. Atrasou meia hora e avisou, então tudo certo.",
      },
    ],
    fachada: "bg-fachada-casa",
  },
  {
    id: "tatiane-souza",
    nome: "Tatiane Souza",
    iniciais: "TS",
    categoria: "Decoração",
    bairro: "Bandeirinhas",
    distanciaKm: 4.2,
    nota: 4.8,
    avaliacoes: 143,
    verificacao: "verificada",
    respondeEm: "responde em ~25 min",
    atendeHoje: false,
    resumo:
      "Monto decoração de festa infantil e chá de bebê. Levo o material, monto e desmonto no fim.",
    habilidades: [
      { nome: "Decoração de festa infantil", precoDe: 300, precoAte: 500, unidade: "a festa" },
      { nome: "Painel de balões", precoDe: 150, precoAte: 250, unidade: "o painel" },
    ],
    certificados: [{ nome: "Design de Festas e Eventos", emissor: "SENAC", ano: 2021 }],
    trabalhos: [
      { titulo: "Festa safári", cor: "from-fachada-tecnologia to-fachada-aulas" },
      { titulo: "Chá de bebê", cor: "from-fachada-beleza to-fachada-artes" },
    ],
    comentarios: [
      {
        autor: "Aline M.",
        nota: 5,
        quando: "há 1 semana",
        texto: "Montou tudo em duas horas e desmontou no fim da festa. Eu não precisei encostar em nada.",
      },
    ],
    fachada: "bg-fachada-criancas",
  },
  {
    id: "wesley-dias",
    nome: "Wesley Dias",
    iniciais: "WD",
    categoria: "Assistência de celular",
    bairro: "Centro",
    distanciaKm: 1.5,
    nota: 4.6,
    avaliacoes: 76,
    verificacao: "documentos",
    respondeEm: "responde em ~5 min",
    atendeHoje: true,
    resumo:
      "Troco tela e bateria de celular. Faço na hora, você espera ou eu busco e levo no seu endereço.",
    habilidades: [
      { nome: "Troca de tela", precoDe: 180, precoAte: 420, unidade: "depende do modelo" },
      { nome: "Troca de bateria", precoDe: 90, precoAte: 160, unidade: "o serviço" },
    ],
    certificados: [{ nome: "Manutenção de Smartphones", emissor: "SENAI", ano: 2022 }],
    trabalhos: [{ titulo: "Bancada", cor: "from-fachada-celulares to-fachada-tecnologia" }],
    comentarios: [
      {
        autor: "Diego A.",
        nota: 5,
        quando: "há 4 dias",
        texto: "Buscou o aparelho no meu trabalho e devolveu no fim do dia com a tela nova.",
      },
    ],
    fachada: "bg-fachada-celulares",
  },
  {
    id: "sandra-vieira",
    nome: "Sandra Vieira",
    iniciais: "SV",
    categoria: "Cabelo",
    bairro: "Niterói",
    distanciaKm: 1.9,
    nota: 4.9,
    avaliacoes: 187,
    verificacao: "verificada",
    respondeEm: "responde em ~12 min",
    atendeHoje: true,
    resumo: "Atendo em casa, com hora marcada. Corte, escova e coloração.",
    habilidades: [
      { nome: "Corte feminino", precoDe: 50, precoAte: 80, unidade: "o corte" },
      { nome: "Coloração", precoDe: 120, precoAte: 220, unidade: "depende do cabelo" },
    ],
    certificados: [{ nome: "Cabeleireira Profissional", emissor: "SENAC Betim", ano: 2018 }],
    trabalhos: [{ titulo: "Antes e depois", cor: "from-fachada-beleza to-fachada-artes" }],
    comentarios: [
      {
        autor: "Rita C.",
        nota: 5,
        quando: "há 6 dias",
        texto: "Atende em casa e cobra menos que salão. Marquei pelo app e ela confirmou na hora.",
      },
    ],
    fachada: "bg-fachada-beleza",
  },
]

export type Oportunidade = {
  id: string
  categoria: string
  titulo: string
  precoDe: number
  precoAte: number
  distanciaKm: number
  quando: string
  autor: string
  fachada: string
}

export const oportunidades: Oportunidade[] = [
  {
    id: "op-1",
    categoria: "Confeitaria",
    titulo: "Bolo de aniversário, 15 pessoas",
    precoDe: 300,
    precoAte: 500,
    distanciaKm: 1.2,
    quando: "para sábado",
    autor: "Juliana R.",
    fachada: "bg-fachada-alimentacao",
  },
  {
    id: "op-2",
    categoria: "Eletricista",
    titulo: "Trocar chuveiro e tomadas",
    precoDe: 120,
    precoAte: 180,
    distanciaKm: 0.8,
    quando: "hoje",
    autor: "Fernanda L.",
    fachada: "bg-fachada-casa",
  },
  {
    id: "op-3",
    categoria: "Decoração",
    titulo: "Decoração de festa infantil",
    precoDe: 300,
    precoAte: 500,
    distanciaKm: 4.2,
    quando: "em duas semanas",
    autor: "Aline M.",
    fachada: "bg-fachada-criancas",
  },
  {
    id: "op-4",
    categoria: "Aulas",
    titulo: "Reforço de matemática, 7º ano",
    precoDe: 60,
    precoAte: 90,
    distanciaKm: 2.6,
    quando: "duas vezes na semana",
    autor: "Marcos P.",
    fachada: "bg-fachada-aulas",
  },
]

/**
 * Estados do pagamento retido. É o coração da proposta: o dinheiro sai do
 * contratante na contratação, fica com a plataforma, e só chega ao prestador
 * depois do "ok" de quem contratou.
 */
export type EstadoPedido = "combinando" | "retido" | "concluido" | "disputa"

export const rotuloEstado: Record<EstadoPedido, string> = {
  combinando: "Combinando",
  retido: "Pagamento retido",
  concluido: "Pago ao prestador",
  disputa: "Em análise",
}

export type Pedido = {
  id: string
  prestadorId: string
  prestador: string
  iniciais: string
  servico: string
  valor: number
  taxa: number
  estado: EstadoPedido
  quando: string
  fachada: string
}

export const pedidos: Pedido[] = [
  {
    id: "ped-1",
    prestadorId: "rodrigo-mendes",
    prestador: "Rodrigo Mendes",
    iniciais: "RM",
    servico: "Trocar chuveiro",
    valor: 150,
    taxa: 15,
    estado: "retido",
    quando: "hoje, 14h",
    fachada: "bg-fachada-casa",
  },
  {
    id: "ped-2",
    prestadorId: "maria-aparecida",
    prestador: "Maria Aparecida",
    iniciais: "MA",
    servico: "Bolo de aniversário, 15 pessoas",
    valor: 380,
    taxa: 38,
    estado: "combinando",
    quando: "sábado, 10h",
    fachada: "bg-fachada-alimentacao",
  },
  {
    id: "ped-3",
    prestadorId: "sandra-vieira",
    prestador: "Sandra Vieira",
    iniciais: "SV",
    servico: "Corte e escova",
    valor: 70,
    taxa: 7,
    estado: "concluido",
    quando: "semana passada",
    fachada: "bg-fachada-beleza",
  },
  {
    id: "ped-4",
    prestadorId: "wesley-dias",
    prestador: "Wesley Dias",
    iniciais: "WD",
    servico: "Troca de tela",
    valor: 260,
    taxa: 26,
    estado: "disputa",
    quando: "há 4 dias",
    fachada: "bg-fachada-celulares",
  },
]

export const usuario = {
  nome: "Você",
  bairro: "Vianópolis",
  cidade: "Betim",
  uf: "MG",
  habilidadesCadastradas: 0,
}

export function moeda(valor: number): string {
  return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL", minimumFractionDigits: 0 })
}

/** "R$ 300–500", não "R$ 300–R$ 500": o símbolo aparece uma vez só na faixa. */
export function faixa(de: number, ate: number): string {
  return `${moeda(de)}–${ate.toLocaleString("pt-BR")}`
}

export function acharPrestador(id: string): Prestador | undefined {
  return prestadores.find((p) => p.id === id)
}

// ── Painel do prestador ─────────────────────────────────────
// O prestador é o mesmo tipo de pessoa do outro lado do app: alguém do bairro
// com duas ou três habilidades, não uma empresa.

export type PedidoRecebido = {
  id: string
  contratante: string
  iniciais: string
  servico: string
  valor: number
  distanciaKm: number
  quando: string
  respondido: boolean
  fachada: string
}

export const pedidosRecebidos: PedidoRecebido[] = [
  {
    id: "rec-1",
    contratante: "Fernanda L.",
    iniciais: "FL",
    servico: "Trocar chuveiro e tomadas",
    valor: 150,
    distanciaKm: 0.8,
    quando: "hoje",
    respondido: false,
    fachada: "bg-fachada-casa",
  },
  {
    id: "rec-2",
    contratante: "Marcos P.",
    iniciais: "MP",
    servico: "Instalar 3 tomadas na cozinha",
    valor: 210,
    distanciaKm: 1.4,
    quando: "amanhã de manhã",
    respondido: false,
    fachada: "bg-fachada-casa",
  },
  {
    id: "rec-3",
    contratante: "Aline M.",
    iniciais: "AM",
    servico: "Troca de disjuntor queimado",
    valor: 120,
    distanciaKm: 2.2,
    quando: "quinta",
    respondido: true,
    fachada: "bg-fachada-casa",
  },
]

export const ganhosPrestador = {
  mes: 2840,
  aReceber: 480,
  servicosNoMes: 19,
  nota: 4.7,
  avaliacoes: 98,
}

// ── Painel do admin ─────────────────────────────────────────
// A operação da plataforma: quanto está retido, quanto a taxa rendeu, e o que
// precisa de gente olhando (as disputas).

export const metricasPlataforma = {
  retidoAgora: 18470,
  taxaNoMes: 4210,
  usuarios: 1284,
  prestadoresAtivos: 213,
  servicosNoMes: 476,
  disputasAbertas: 3,
}

export type Transacao = {
  id: string
  contratante: string
  prestador: string
  servico: string
  valor: number
  taxa: number
  estado: EstadoPedido
  quando: string
}

export const transacoes: Transacao[] = [
  { id: "tx-1", contratante: "Fernanda L.", prestador: "Rodrigo Mendes", servico: "Trocar chuveiro", valor: 150, taxa: 15, estado: "retido", quando: "há 2 h" },
  { id: "tx-2", contratante: "Juliana R.", prestador: "Maria Aparecida", servico: "Bolo de aniversário", valor: 380, taxa: 38, estado: "combinando", quando: "há 5 h" },
  { id: "tx-3", contratante: "Rita C.", prestador: "Sandra Vieira", servico: "Corte e escova", valor: 70, taxa: 7, estado: "concluido", quando: "ontem" },
  { id: "tx-4", contratante: "Diego A.", prestador: "Wesley Dias", servico: "Troca de tela", valor: 260, taxa: 26, estado: "disputa", quando: "há 4 dias" },
  { id: "tx-5", contratante: "Aline M.", prestador: "Tatiane Souza", servico: "Festa infantil", valor: 420, taxa: 42, estado: "retido", quando: "há 1 dia" },
  { id: "tx-6", contratante: "Paulo S.", prestador: "Rodrigo Mendes", servico: "Instalar tomadas", valor: 90, taxa: 9, estado: "concluido", quando: "há 3 dias" },
]

export type Disputa = {
  id: string
  contratante: string
  prestador: string
  servico: string
  valor: number
  motivo: string
  abertaHa: string
  prazo: string
}

export const disputas: Disputa[] = [
  {
    id: "dis-1",
    contratante: "Diego A.",
    prestador: "Wesley Dias",
    servico: "Troca de tela",
    valor: 260,
    motivo: "Tela apresentou falha de toque dois dias depois do serviço.",
    abertaHa: "há 4 dias",
    prazo: "vence em 8 h",
  },
  {
    id: "dis-2",
    contratante: "Carlos E.",
    prestador: "Tatiane Souza",
    servico: "Painel de balões",
    valor: 180,
    motivo: "Prestadora não compareceu na data combinada.",
    abertaHa: "há 1 dia",
    prazo: "vence em 32 h",
  },
  {
    id: "dis-3",
    contratante: "Rita C.",
    prestador: "Maria Aparecida",
    servico: "Doces para festa",
    valor: 240,
    motivo: "Quantidade entregue menor que a combinada.",
    abertaHa: "há 6 h",
    prazo: "vence em 42 h",
  },
]
