// Mostra o nome do mundo por um instante quando a fase muda
function Aviso(context) {
   this.context = context;
   this.texto = '';
   this.duracao = 1800;   // milissegundos
   this.tempo = 0;        // quanto ainda falta para sumir
}
Aviso.prototype = {
   mostrar: function(texto) {
      this.texto = texto;
      this.tempo = this.duracao;
   },
   limpar: function() {
      this.tempo = 0;
   },
   atualizar: function() {
      if (this.tempo > 0)
         this.tempo = Math.max(0, this.tempo - this.animacao.decorrido);
   },
   desenhar: function() {
      if (this.tempo <= 0) return;
      
      var ctx = this.context;
      var canvas = ctx.canvas;
      var restante = this.tempo / this.duracao;   // 1 -> 0
      var passado = 1 - restante;                 // 0 -> 1
      
      // Aparece rápido e some devagar
      var alfa = 1;
      if (passado < 0.15) alfa = passado / 0.15;
      else if (restante < 0.3) alfa = restante / 0.3;
      
      ctx.save();
      ctx.globalAlpha = alfa;
      ctx.textAlign = 'center';
      ctx.font = Math.round(larguraTela(canvas) * 0.058) + 
                 'px "Press Start 2P", monospace';
      ctx.lineWidth = 6;
      ctx.strokeStyle = 'rgba(0, 0, 0, 0.8)';
      ctx.fillStyle = '#facc15';
      ctx.strokeText(this.texto, larguraTela(canvas) / 2, 
                     alturaTela(canvas) * 0.28);
      ctx.fillText(this.texto, larguraTela(canvas) / 2, 
                   alturaTela(canvas) * 0.28);
      ctx.restore();
   }
}
