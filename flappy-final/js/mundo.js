// Controla em qual mundo (tema) estamos: troca com transição suave
// e entrega aos demais objetos a velocidade e as cores dos canos atuais.
function Mundo() {
   this.indice = 0;
   this.anterior = 0;
   this.fade = 1;             // 0 = começando a trocar; 1 = troca concluída
   this.duracaoFade = 750;    // milissegundos
   this.velocidade = TEMAS[0].velocidade;
   this.coresCano = misturarCores(TEMAS[0].cano, TEMAS[0].cano, 1);
}
Mundo.prototype = {
   trocar: function(indice, instantaneo) {
      var novo = indice % TEMAS.length;
      
      if (instantaneo) {
         this.anterior = novo;
         this.indice = novo;
         this.fade = 1;
      }
      else {
         if (novo == this.indice) return;
         this.anterior = this.indice;
         this.indice = novo;
         this.fade = 0;
      }
      
      this.atualizarValores();
   },
   processar: function() {
      if (this.fade < 1) {
         this.fade = Math.min(1, 
            this.fade + this.animacao.decorrido / this.duracaoFade);
         this.atualizarValores();
      }
   },
   atualizarValores: function() {
      var de = TEMAS[this.anterior];
      var para = TEMAS[this.indice];
      
      this.coresCano = misturarCores(de.cano, para.cano, this.fade);
      this.velocidade = 
         de.velocidade + (para.velocidade - de.velocidade) * this.fade;
   }
}

// Mistura duas cores hexadecimais (t = 0 devolve a, t = 1 devolve b)
function misturarHex(a, b, t) {
   var ler = function(hex) {
      return [1, 3, 5].map(function(i) {
         return parseInt(hex.slice(i, i + 2), 16);
      });
   };
   var c1 = ler(a);
   var c2 = ler(b);
   var canal = function(i) {
      return Math.round(c1[i] + (c2[i] - c1[i]) * t);
   };
   return 'rgb(' + canal(0) + ', ' + canal(1) + ', ' + canal(2) + ')';
}

// Mistura todas as cores de dois objetos de cores
function misturarCores(a, b, t) {
   var resultado = {};
   for (var chave in a)
      resultado[chave] = misturarHex(a[chave], b[chave], t);
   return resultado;
}
