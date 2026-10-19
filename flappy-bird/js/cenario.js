function Cenario(context, mundo) {
   this.context = context;
   this.mundo = mundo;
}
Cenario.prototype = {
   atualizar: function() {
      
   },
   desenhar: function() {
      var ctx = this.context;
      var mundo = this.mundo;
      
      if (mundo.fade < 1) {
         // Transição: desenha o mundo antigo e o novo por cima
         this.desenharMundo(mundo.anterior);
         ctx.save();
         ctx.globalAlpha = mundo.fade;
         this.desenharMundo(mundo.indice);
         ctx.restore();
      }
      else {
         this.desenharMundo(mundo.indice);
      }
   },
   // Desenha só o cenário (do topo até a linha do chão da imagem),
   // encaixado exatamente acima do chão do jogo
   desenharMundo: function(indice) {
      var ctx = this.context;
      var canvas = ctx.canvas;
      var img = TEMAS[indice].imgFundo;
      var yChao = canvas.height - alturaDoChao(ctx);
      
      ctx.save();
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
      
      if (! (img.complete && img.naturalWidth)) {
         var gradiente = ctx.createLinearGradient(0, 0, 0, yChao);
         gradiente.addColorStop(0, '#38bdf8');
         gradiente.addColorStop(1, '#bae6fd');
         ctx.fillStyle = gradiente;
         ctx.fillRect(0, 0, canvas.width, yChao);
      }
      else {
         var proporcao = canvas.width / yChao;
         var base = TEMAS[indice].chaoInicio * img.naturalHeight;
         var origemAltura = base;
         var origemLargura = origemAltura * proporcao;
         var origemY = 0;
         
         // Tela muito larga: usamos a largura toda da imagem
         if (origemLargura > img.naturalWidth) {
            origemLargura = img.naturalWidth;
            origemAltura = origemLargura / proporcao;
            origemY = base - origemAltura;
         }
         
         var origemX = (img.naturalWidth - origemLargura) / 2;
         
         ctx.drawImage(img, origemX, origemY, origemLargura, 
                       origemAltura, 0, 0, canvas.width, yChao);
      }
      
      ctx.restore();
   }
}
