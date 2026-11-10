// Tamanho "lógico" da tela, em pixels de CSS. O canvas pode ter mais pixels
// de verdade (telas de alta densidade), mas o jogo calcula tudo com estes valores.
function larguraTela(canvas) {
   return canvas.clientWidth;
}

function alturaTela(canvas) {
   return canvas.clientHeight;
}
