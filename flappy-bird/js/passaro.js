function Passaro(context) {
   this.context = context;
   this.raio = 18;
   this.x = 0;
   this.y = 0;
   this.velocidade = 0;      // velocidade vertical (px/s; positivo = descendo)
   this.gravidade = 1368;    // px/s²
   this.forcaPulo = -450;    // px/s
   this.rotacao = 0;
   this.voando = false;      // false = balançando na tela inicial
   this.morto = false;
   this.morreu = null;       // função chamada quando o pássaro morre
}
Passaro.prototype = {
   atualizar: function() {
      var canvas = this.context.canvas;
      
      // Na tela inicial o pássaro só balança
      if (! this.voando) {
         this.y = canvas.height / 2 + Math.sin(Date.now() / 200) * 10;
         return;
      }
      
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

      // Asa
      ctx.fillStyle = '#fde047';
      ctx.beginPath();
      ctx.ellipse(-4, 2, 8, 5, Math.PI / 6, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#ca8a04';
      ctx.lineWidth = 1.5;
      ctx.stroke();

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
   pular: function() {
      if (! this.voando || this.morto) return;
      this.velocidade = this.forcaPulo;
      sons.tocarPulo();
   },
   posicionar: function() {
      var canvas = this.context.canvas;
      this.x = canvas.width * 0.25;
      this.y = canvas.height / 2;
      this.velocidade = 0;
      this.rotacao = 0;
      this.morto = false;
   },
   retangulosColisao: function() {
      return [ {x: this.x - this.raio, y: this.y - this.raio, 
                largura: this.raio * 2, altura: this.raio * 2} ];
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
