// Mostra a pontuação no HUD (elemento HTML por cima do canvas)
function Painel(elemento) {
   this.elemento = elemento;
   this.pontuacao = 0;
   this.mostrada = -1;
}
Painel.prototype = {
   atualizar: function() {
      
   },
   desenhar: function() {
      // Só mexe no HTML quando a pontuação muda
      if (this.pontuacao != this.mostrada) {
         this.elemento.textContent = this.pontuacao;
         this.mostrada = this.pontuacao;
      }
   },
   zerar: function() {
      this.pontuacao = 0;
      this.desenhar();
   }
}
