# Flappy Bird com mundos

Jogo estilo Flappy Bird feito em HTML5 Canvas e JavaScript puro (sem bibliotecas).
A cada **10 pontos** o jogo muda de mundo: o cenário, o chão, a cor dos canos e a
velocidade mudam, com uma transição suave. São 10 mundos: Dia, Noite, Pôr do sol,
Vulcão, Gelo, Selva, Deserto, Submarino, Espaço e Sakura.

O código segue a mesma arquitetura do jogo da nave usado nas aulas: funções
construtoras com `prototype`, um motor (`Animacao`, `Colisor`, `Teclado`) e sprites
com `atualizar`, `desenhar`, `retangulosColisao` e `colidiuCom`.

## Como jogar

Abra o arquivo `Flappy-Bird.html` no navegador.

| Ação | Controle |
|---|---|
| Começar / pular / jogar de novo | `Espaço` ou `Seta para cima` |
| Pular | Clique ou toque na tela |

O recorde fica salvo no navegador (`localStorage`).

## Estrutura

```
Flappy-Bird.html      página, telas (início, HUD, fim de jogo) e script principal
css/flappy.css        estilo das telas
js/
  animacao.js         motor: laço de animação, sprites e processamentos
  colisor.js          detecção de colisão entre retângulos
  teclado.js          teclas
  passaro.js          sprite do pássaro (gravidade e pulo)
  cano.js             sprite do par de canos
  chao.js             sprite do chão que rola
  cenario.js          desenha o fundo do mundo atual
  mundo.js            troca de mundo, velocidade e cores dos canos
  painel.js           pontuação no HUD
  sons.js             efeitos sonoros gerados pelo navegador
  temas.js            dados dos 10 mundos
imagens/
  cenarios/           fundos de cada mundo
  chaos/              chão de cada mundo
```

## Personalizar

- **Velocidade, cores e imagens de cada mundo:** `js/temas.js` (velocidade em px/s).
- **Pontos para trocar de mundo:** `pontosPorMundo` no script do `Flappy-Bird.html`.
- **Dificuldade:** `gravidade` e `forcaPulo` em `js/passaro.js`; `abertura` em
  `js/cano.js`; `intervalo` do `criadorCanos` no `Flappy-Bird.html`.
