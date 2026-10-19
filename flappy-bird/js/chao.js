// O chão ocupa 14% da altura da tela
function alturaDoChao(context) {
   return Math.round(context.canvas.height * 0.14);
}

function Chao(context, mundo) {
   this.context = context;
   this.mundo = mundo;
   this.rolando = false;
   this.deslocamento = 0;
}
Chao.prototype = {
   atualizar: function() {
      if (this.rolando) {
         this.deslocamento += 
            this.mundo.velocidade * this.animacao.decorrido / 1000;
      }
   },
   desenhar: function() {
      var ctx = this.context;
      var mundo = this.mundo;
      
      if (mundo.fade < 1) {
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
   // O tile é espelhado (sem emenda) e se repete enquanto rola
   desenharMundo: function(indice) {
      var ctx = this.context;
      var canvas = ctx.canvas;
      var img = TEMAS[indice].imgChao;
      var altura = alturaDoChao(ctx);
      var y = canvas.height - altura;
      
      ctx.save();
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
      
      if (! (img.complete && img.naturalWidth)) {
         ctx.fillStyle = '#6b4423';
         ctx.fillRect(0, y, canvas.width, altura);
      }
      else {
         var largura = img.naturalWidth * altura / img.naturalHeight;
         var inicio = -(this.deslocamento % largura);
         
         for (var x = inicio; x < canvas.width; x += largura) {
            // +1px de sobreposição evita fresta entre as repetições
            ctx.drawImage(img, Math.floor(x), y, 
                          Math.ceil(largura) + 1, altura);
         }
      }
      
      ctx.restore();
   },
   retangulosColisao: function() {
      var canvas = this.context.canvas;
      var altura = alturaDoChao(this.context);
      
      return [ {x: 0, y: canvas.height - altura, 
                largura: canvas.width, altura: altura} ];
   },
   colidiuCom: function(outro) {
      
   }
}
