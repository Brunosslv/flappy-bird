function Passaro(context) {
   this.context = context;
   this.raio = 18;
   this.margemColisao = 4;   // o pássaro é redondo: tira as quinas do quadrado
   this.x = 0;
   this.y = 0;
   this.velocidade = 0;      // velocidade vertical (px/s; positivo = descendo)
   this.gravidade = 1368;    // px/s²
   this.forcaPulo = -450;    // px/s
   this.rotacao = 0;
   this.voando = false;      // false = balançando na tela inicial
   this.morto = false;
   this.morreu = null;       // função chamada quando o pássaro morre
   this.duracaoAsa = 350;    // quanto tempo a asa bate depois de um pulo (ms)
   this.tempoAsa = 0;
}
Passaro.prototype = {
   atualizar: function() {
      var canvas = this.context.canvas;
      
      // Na tela inicial o pássaro só balança
      if (! this.voando) {
         this.y = alturaTela(canvas) / 2 + Math.sin(Date.now() / 200) * 10;
         return;
      }
      
      if (this.tempoAsa > 0)
         this.tempoAsa = Math.max(0, this.tempoAsa - this.animacao.decorrido);
      
      var decorrido = this.animacao.decorrido / 1000;
      this.velocidade += this.gravidade * decorrido;
      this.y += this.velocidade * decorrido;
      
      // Bateu no teto da tela
      if (this.y - this.raio <= 0) {
         this.y = this.raio;
         this.velocidade = 0;
      }
   },
   desenhar: function() {
      var ctx = this.context;
      
      if (! this.voando)
         this.rotacao = Math.sin(Date.now() / 150) * 0.15;
      else
         this.rotacao = Math.min(Math.PI / 4, 
                        Math.max(-Math.PI / 4, this.velocidade / 600));
      
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.rotacao);

      // Corpo
      ctx.fillStyle = '#facc15';
      ctx.beginPath();
      ctx.arc(0, 0, this.raio, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#ca8a04';
      ctx.lineWidth = 2.5;
      ctx.stroke();

      // Barriga
      ctx.fillStyle = '#f97316';
      ctx.beginPath();
      ctx.arc(4, 4, this.raio * 0.6, 0, Math.PI);
      ctx.fill();

      // Asa: gira em torno do "ombro" para bater
      ctx.save();
      ctx.translate(-1, 2);
      ctx.rotate(this.anguloAsa());
      ctx.fillStyle = '#fde047';
      ctx.beginPath();
      ctx.ellipse(-3, 0, 8, 5, Math.PI / 6, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#ca8a04';
      ctx.lineWidth = 1.5;
      ctx.stroke();
      ctx.restore();

      // Olho
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(6, -6, 6, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#1e293b';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      ctx.fillStyle = '#0f172a';
      ctx.beginPath();
      ctx.arc(8, -6, 2.5, 0, Math.PI * 2);
      ctx.fill();

      // Bico
      ctx.fillStyle = '#ea580c';
      ctx.beginPath();
      ctx.moveTo(12, -2);
      ctx.lineTo(22, 2);
      ctx.lineTo(12, 6);
      ctx.closePath();
      ctx.fill();
      ctx.strokeStyle = '#9a3412';
      ctx.lineWidth = 1.5;
      ctx.stroke();
      
      ctx.restore();
   },
   // Ângulo da asa (positivo = para cima)
   anguloAsa: function() {
      // Na tela inicial a asa tremula devagar
      if (! this.voando)
         return Math.sin(Date.now() / 90) * 0.5;
      
      // Depois de um pulo bate duas vezes, cada vez mais fraco
      if (this.tempoAsa > 0) {
         var progresso = 1 - this.tempoAsa / this.duracaoAsa;
         return Math.sin(progresso * Math.PI * 4) * 0.9 * (1 - progresso * 0.5);
      }
      
      return 0;
   },
   pular: function() {
      if (! this.voando || this.morto) return;
      this.tempoAsa = this.duracaoAsa;
      this.velocidade = this.forcaPulo;
      sons.tocarPulo();
   },
   posicionar: function() {
      var canvas = this.context.canvas;
      this.x = larguraTela(canvas) * 0.25;
      this.y = alturaTela(canvas) / 2;
      this.velocidade = 0;
      this.rotacao = 0;
      this.tempoAsa = 0;
      this.morto = false;
   },
   retangulosColisao: function() {
      var m = this.margemColisao;
      
      return [ {x: this.x - this.raio + m, y: this.y - this.raio + m, 
                largura: (this.raio - m) * 2, altura: (this.raio - m) * 2} ];
   },
   colidiuCom: function(outro) {
      if (this.morto) return;
      
      // Bateu num cano ou no chão
      if (outro instanceof Cano || outro instanceof Chao) {
         this.morto = true;
         if (this.morreu) this.morreu();
      }
   }
}
