import { Controle, Cpu, Digito, Operação, Sinal, Tela } from "./calculadora";

export class TestadorTela {
  private tela: Tela;

  constructor(tela: Tela) {
    this.tela = tela;
  }

  // testeTodosNúmeros() {
  //   this.tela.limpe();
  //   console.log("= Testando todos os dígitos ===========================");
  //   Object.keys(Digito).forEach((element) => {
  //     if (Number(element)) this.tela.mostre(Number(element));
  //   });
  // }

  // testeTodosSímbolo() {
  //   this.tela.limpe();
  //   console.log("= Testando todos os símbolos ===========================");
  //   for (let i = 0; i < 8; i++) {
  //     this.tela.mostre(Digito.OITO);
  //     this.tela.mostreSeparadorDecimal();
  //   }
  //   this.tela.mostreMemoria();
  //   this.tela.mostreSinal(Sinal.NEGATIVO);
  //   this.tela.mostreErro();
  // }
}

export class TestadorCpu {
  private cpu: Cpu;

  constructor(cpu: Cpu) {
    this.cpu = cpu;
  }

  teste123Soma456() {
    console.log("= Testando 123 + 456 ===========================");
    [Digito.UM, Digito.DOIS, Digito.TRÊS].forEach((element) => {
      this.cpu.recebaDigito(element);
    });
    this.cpu.recebaOperacao(Operação.SOMA);
    [Digito.QUATRO, Digito.CINCO, Digito.SEIS].forEach((element) => {
      this.cpu.recebaDigito(element);
    });
    this.cpu.recebaControle(Controle.IGUAL);

  }


//MEMÓRIA

  testeMemoria() {
    console.log("teste memória");
    [Digito.UM, Digito.DOIS, Digito.TRÊS].forEach((element) => {
      this.cpu.recebaDigito(element);
    });
    this.cpu.recebaControle(Controle.MEMÓRIA_SOMA);
    this.cpu.recebaOperacao(Operação.SOMA);
    [Digito.UM].forEach((element) => {
      this.cpu.recebaDigito(element);
    });
    this.cpu.recebaControle(Controle.IGUAL);
  }

  testeMemoriaMenos() {
    console.log("teste memória menos");
    [Digito.UM, Digito.DOIS, Digito.TRÊS].forEach((element) => {
      this.cpu.recebaDigito(element);
    });
    this.cpu.recebaControle(Controle.MEMÓRIA_SOMA);
    this.cpu.recebaOperacao(Operação.SUBTRAÇÃO);
    [Digito.UM].forEach((element) => {
      this.cpu.recebaDigito(element);
    });
    this.cpu.recebaControle(Controle.IGUAL);
  }
  testeMemoriaMais2() {
    console.log("teste memória mais 2");
    [Digito.UM, Digito.DOIS, Digito.TRÊS].forEach((element) => {
      this.cpu.recebaDigito(element);
    });
    this.cpu.recebaControle(Controle.IGUAL);
    [Digito.UM].forEach((element) =>{
      this.cpu.recebaDigito(element)
    });
    this.cpu.recebaControle(Controle.IGUAL)
  }



  // NUMERO DECIMAL

  testeNumeroDecimal() {
    console.log("Teste Números Decimais");
    this.cpu.recebaDigito(Digito.UM); // 1
    this.cpu.recebaControle(Controle.SEPARADOR_DECIMAL); // Adiciona separador decimal
    this.cpu.recebaDigito(Digito.CINCO);
    this.cpu.recebaDigito(Digito.DOIS) // 5


  }



  // TESTE SOMA

  teste12Soma34Soma56() {
     console.log("= Testando 12 + 34 + 56 ===========================");
   [Digito.UM, Digito.DOIS].forEach((element) => {
     this.cpu.recebaDigito(element);
   });
   [Digito.TRÊS, Digito.QUATRO].forEach((element) => {
       this.cpu.recebaDigito(element);
     });
     this.cpu.recebaOperacao(Operação.SOMA);
     [Digito.CINCO, Digito.SEIS].forEach((element) => {
         this.cpu.recebaDigito(element);
       });
       this.cpu.recebaControle(Controle.IGUAL);
       // this.cpu.recebaControle(Controle.IGUAL);
      }

  // TESTE RAIZ

  testeRaiz(){
    console.log("testando raiz");
    [Digito.NOVE].forEach((element) => {
      this.cpu.recebaDigito(element);
    });
    this.cpu.recebaOperacao(Operação.RAIZ_QUADRADA);
    this.cpu.recebaControle(Controle.IGUAL);
    console.log("passou")
  }


  testePorcentagem() {
    console.log("= Testando operação de porcentagem ===========================");

    console.log("Entrada: 100 + 10%");

    this.cpu.recebaDigito(Digito.UM);  // 5
    this.cpu.recebaDigito(Digito.ZERO);   // 0
    this.cpu.recebaDigito(Digito.ZERO);   // 0

    this.cpu.recebaOperacao(Operação.SOMA);
    
    this.cpu.recebaDigito(Digito.UM);  // 5
    this.cpu.recebaDigito(Digito.ZERO);   // 0
   this.cpu.recebaOperacao(Operação.PERCENTUAL);

  
  //  this.cpu.recebaControle(Controle.IGUAL);

    
    console.log("Resultado esperado: 110");
    // console.log("Resultado obtido: ", this.cpu.obtenhaTela().toString());  
  }

  testeNumeroNegativo() {
    console.log("Teste de Números Negativos")

    
    this.cpu.recebaDigito(Digito.TRÊS); // 3
    this.cpu.recebaOperacao(Operação.SUBTRAÇÃO); 
   
    this.cpu.recebaDigito(Digito.CINCO); // 5

    
    this.cpu.recebaControle(Controle.IGUAL);

    // Esperado: 3 - 5 = -2
  }



}

