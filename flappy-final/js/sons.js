// Efeitos sonoros gerados pelo navegador (Web Audio), sem arquivos de som
function Sons() {
   this.context = null;
}
Sons.prototype = {
   // Precisa ser chamado depois de um clique/tecla do jogador
   iniciar: function() {
      if (! this.context) {
         var ClasseAudio = window.AudioContext || window.webkitAudioContext;
         this.context = new ClasseAudio();
      }
      if (this.context.state == 'suspended') this.context.resume();
   },
   tocarTom: function(tipo, freqInicial, freqFinal, duracao, volume, rampa) {
      this.iniciar();
      var ctx = this.context;
      var oscilador = ctx.createOscillator();
      var ganho = ctx.createGain();
      
      oscilador.type = tipo;
      oscilador.frequency.setValueAtTime(freqInicial, ctx.currentTime);
      
      if (rampa == 'linear')
         oscilador.frequency.linearRampToValueAtTime(freqFinal, 
            ctx.currentTime + duracao);
      else if (freqFinal != freqInicial)
         oscilador.frequency.exponentialRampToValueAtTime(freqFinal, 
            ctx.currentTime + duracao);
      
      ganho.gain.setValueAtTime(volume, ctx.currentTime);
      ganho.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duracao);
      
      oscilador.connect(ganho);
      ganho.connect(ctx.destination);
      oscilador.start();
      oscilador.stop(ctx.currentTime + duracao);
   },
   tocarPulo: function() {
      this.tocarTom('square', 300, 600, 0.1, 0.15);
   },
   tocarPonto: function() {
      this.iniciar();
      var ctx = this.context;
      var oscilador = ctx.createOscillator();
      var ganho = ctx.createGain();
      
      oscilador.type = 'triangle';
      oscilador.frequency.setValueAtTime(500, ctx.currentTime);
      oscilador.frequency.setValueAtTime(800, ctx.currentTime + 0.08);
      ganho.gain.setValueAtTime(0.2, ctx.currentTime);
      ganho.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.2);
      
      oscilador.connect(ganho);
      ganho.connect(ctx.destination);
      oscilador.start();
      oscilador.stop(ctx.currentTime + 0.2);
   },
   tocarBatida: function() {
      this.tocarTom('sawtooth', 150, 40, 0.3, 0.3, 'linear');
   }
}
