import type { Post } from "@/types";

export const posts: Post[] = [
  {
    slug: "do-php-ao-go",
    title: "Do PHP ao Go: o que mudou na minha forma de pensar",
    excerpt:
      "Sair do conforto do PHP para escrever Go mudou meu jeito de olhar para tipos, erros, concorrência e desenho de serviços pequenos.",
    date: "29 Abr 2026",
    readingTime: "4 min",
    tags: ["Go", "PHP", "Backend"],
    content: `PHP me acompanhou por bastante tempo, especialmente no ecossistema Laravel, onde muita coisa boa acontece rápido: rotas, filas, validação, jobs, banco, cache. Go entrou por outro caminho. Ele não tenta esconder tanto a infraestrutura da aplicação. O compilador, a tipagem estática e a simplicidade da biblioteca padrão empurram a gente para decisões mais explícitas.

A primeira mudança foi no jeito de modelar dados. Em PHP, é fácil deixar parte do contrato morar em array, request, model ou convenção do framework. Em Go, structs, interfaces pequenas e retornos de erro deixam o contrato mais visível. Isso não torna o código automaticamente melhor, mas torna algumas ambiguidades mais difíceis de ignorar.

Outra virada foi a concorrência. Goroutines são leves, mas não são mágica: ainda é preciso pensar em cancelamento com context.Context, timeouts, limites de paralelismo e vazamento de goroutines. A vantagem é que Go coloca essas peças perto do código de negócio. Para serviços que fazem I/O, APIs internas ou workers, esse modelo fica muito natural.

No fim, a maior diferença não foi sintaxe. Foi postura. PHP continua excelente para produto, painel, CRUD rico e times que precisam entregar rápido. Go me ensinou a gostar de programas menores, binários simples, inicialização previsível e dependências mais contidas. Hoje eu tento levar um pouco dessa clareza de Go para o PHP, e um pouco da produtividade do PHP para o Go.`,
  },
  {
    slug: "rabbitmq-laravel-na-pratica",
    title: "RabbitMQ + Laravel na prática: padrões que funcionam",
    excerpt:
      "Filas ficam muito mais previsíveis quando exchange, routing key, retry, dead letter e idempotência são tratados como parte do desenho.",
    date: "29 Abr 2026",
    readingTime: "5 min",
    tags: ["Laravel", "RabbitMQ", "Queue"],
    content: `RabbitMQ com Laravel funciona melhor quando a fila não é vista apenas como uma forma de "rodar depois". Ela vira um contrato entre partes do sistema. A aplicação publica uma mensagem com intenção clara, e os consumidores processam essa mensagem sabendo que falhas, duplicidades e reentregas fazem parte do jogo.

O primeiro padrão que costuma pagar o investimento é separar exchange, routing key e fila. Em vez de publicar tudo direto em uma fila genérica, uma exchange do tipo direct ou topic permite rotear eventos como pedido.criado, nota.emitida ou email.enviar para consumidores diferentes. Isso reduz acoplamento e facilita crescer sem reescrever o produtor.

O segundo ponto é tratar retry com cuidado. Reprocessar imediatamente pode derrubar um serviço que já está instável. Uma estratégia comum é usar dead-letter exchange com filas de atraso, aumentando o intervalo entre tentativas. Quando a mensagem passa do limite, ela deve ir para uma fila de erro com payload suficiente para diagnóstico.

No Laravel, também é importante que os jobs sejam idempotentes. RabbitMQ, como outros brokers, trabalha muito bem com entrega "ao menos uma vez", então o mesmo job pode chegar mais de uma vez. Usar chaves únicas, status transacionais e operações seguras evita cobrança duplicada, e-mail repetido ou atualização fora de ordem.

Minha regra prática: fila boa é observável e sem surpresa. Nome de fila claro, logs com correlation id, métricas de consumo, prefetch ajustado ao peso do job e mensagens pequenas o bastante para trafegar bem. O resultado é um sistema menos ansioso, que absorve picos sem transformar cada instabilidade em incidente.`,
  },
];

export function getPostBySlug(slug: string) {
  return posts.find((post) => post.slug === slug);
}
