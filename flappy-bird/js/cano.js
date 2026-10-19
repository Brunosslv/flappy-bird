// Um Cano é o par de canos (de cima e de baixo) com a abertura no meio
function Cano(context, mundo, passaro) {
   this.context = context;
   this.mundo = mundo;
   this.passaro = passaro;
   this.x = 0;
   this.topo = 0;         // altura do cano de cima
   this.largura = 65;
   this.abertura = 160;   // espaço para o pássaro passar
   this.passou = false;
   this.aoPassar = null;
}
Cano.prototype = {
   atualizar: function() {
      this.x -= this.mundo.velocidade * this.animacao.decorrido / 1000;
      
      // O pássaro passou pelo cano: um ponto!
      if (! this.passou && this.x + this.largura < this.passaro.x) {
         this.passou = true;
         if (this.aoPassar) this.aoPassar();
      }
      
      // Excluir o cano quando sumir da tela
      if (this.x + this.largura < 0) {
         this.animacao.excluirSprite(this);
         this.colisor.excluirSprite(this);
      }
   },
   desenhar: function() {
      var ctx = this.context;
      var canvas = ctx.canvas;
      var cores = this.mundo.coresCano;
      var alturaCap = 22;
      var yChao = canvas.height - alturaDoChao(ctx);
      var yBaixo = this.topo + this.abertura;
      
      var segmento = function(x, y, largura, altura) {
         ctx.fillStyle = cores.borda;
         ctx.fillRect(x - 3, y, largura + 6, altura);
         ctx.fillStyle = cores.principal;
         ctx.fillRect(x, y, largura, altura);
         ctx.fillStyle = cores.luz;
         ctx.fillRect(x + 4, y, largura * 0.28, altura);
         ctx.fillStyle = cores.sombra;
         ctx.fillRect(x + largura - largura * 0.22, y, 
                      largura * 0.22, altura);
      };
      
      ctx.save();
      
      // Cano de cima
      segmento(this.x, 0, this.largura, this.topo - alturaCap);
      segmento(this.x - 5, this.topo - alturaCap, 
               this.largura + 10, alturaCap);
      
      // Cano de baixo
      segmento(this.x, yBaixo + alturaCap, this.largura, 
               yChao - yBaixo - alturaCap);
      segmento(this.x - 5, yBaixo, this.largura + 10, alturaCap);
      
      ctx.restore();
   },
   retangulosColisao: function() {
      var canvas = this.context.canvas;
      var yChao = canvas.height - alturaDoChao(this.context);
      var yBaixo = this.topo + this.abertura;
      
      return [
         {x: this.x, y: 0, largura: this.largura, altura: this.topo},
         {x: this.x, y: yBaixo, largura: this.largura, 
          altura: yChao - yBaixo}
      ];
   },
   colidiuCom: function(outro) {
      
   }
}
