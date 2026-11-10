// Contagem regressiva (3, 2, 1) antes de a partida começar
function Contagem(context) {
   this.context = context;
   this.duracao = 3000;     // milissegundos
   this.tempo = 0;          // quanto ainda falta
   this.ativa = false;
   this.aoTerminar = null;  // função chamada quando a contagem acaba
}
Contagem.prototype = {
   iniciar: function() {
      this.tempo = this.duracao;
      this.ativa = true;
   },
   parar: function() {
      this.tempo = 0;
      this.ativa = false;
   },
   atualizar: function() {
      if (! this.ativa) return;
      
      this.tempo -= this.animacao.decorrido;
      
      if (this.tempo <= 0) {
         this.parar();
         if (this.aoTerminar) this.aoTerminar();
      }
   },
   desenhar: function() {
      if (! this.ativa) return;
      
      var ctx = this.context;
      var canvas = ctx.canvas;
      var numero = Math.ceil(this.tempo / 1000);               // 3, 2, 1
      var restante = this.tempo - (numero - 1) * 1000;         // 1000 -> 0
      var progresso = 1 - restante / 1000;                     // 0 -> 1
      
      // Cada número chega grande, encolhe e some no final do segundo
      var escala = 1.5 - 0.5 * Math.min(1, progresso * 3);
      var alfa = progresso > 0.75 ? (1 - progresso) / 0.25 : 1;
      var tamanho = Math.round(larguraTela(canvas) * 0.22 * escala);
      
      ctx.save();
      ctx.globalAlpha = alfa;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.font = tamanho + 'px "Press Start 2P", monospace';
      ctx.lineWidth = 10;
      ctx.strokeStyle = 'rgba(0, 0, 0, 0.8)';
      ctx.fillStyle = '#facc15';
      ctx.strokeText(numero, larguraTela(canvas) / 2, alturaTela(canvas) * 0.32);
      ctx.fillText(numero, larguraTela(canvas) / 2, alturaTela(canvas) * 0.32);
      ctx.restore();
   }
}
