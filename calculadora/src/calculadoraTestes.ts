// import { Controle, Cpu, Digito, Operação, Sinal, Tela } from "./calculadora";

// export class TestadorTela {
//   private tela: Tela;

//   constructor(tela: Tela) {
//     this.tela = tela;
//   }

//   // testeTodosNúmeros() {
//   //   this.tela.limpe();
//   //   console.log("= Testando todos os dígitos ===========================");
//   //   Object.keys(Digito).forEach((element) => {
//   //     if (Number(element)) this.tela.mostre(Number(element));
//   //   });
//   // }

//   // testeTodosSímbolo() {
//   //   this.tela.limpe();
//   //   console.log("= Testando todos os símbolos ===========================");
//   //   for (let i = 0; i < 8; i++) {
//   //     this.tela.mostre(Digito.OITO);
//   //     this.tela.mostreSeparadorDecimal();
//   //   }
//   //   this.tela.mostreMemoria();
//   //   this.tela.mostreSinal(Sinal.NEGATIVO);
//   //   this.tela.mostreErro();
//   // }
// }

// export class TestadorCpu {
//   private cpu: Cpu;

//   constructor(cpu: Cpu) {
//     this.cpu = cpu;
//   }

//   teste123Soma456() {
//     console.log("= Testando 123 + 456 ===========================");
//     [Digito.UM, Digito.DOIS, Digito.TRÊS].forEach((element) => {
//       this.cpu.recebaDigito(element);
//     });
//     this.cpu.recebaOperacao(Operação.SOMA);
//     [Digito.QUATRO, Digito.CINCO, Digito.SEIS].forEach((element) => {
//       this.cpu.recebaDigito(element);
//     });
//     this.cpu.recebaControle(Controle.IGUAL);

//   }


// //MEMÓRIA+

//   testeMemoria() {
//     console.log("teste memória");
//     [Digito.UM, Digito.DOIS, Digito.TRÊS].forEach((element) => {
//       this.cpu.recebaDigito(element);
//     });
//     this.cpu.recebaControle(Controle.MEMÓRIA_SOMA);
//     this.cpu.recebaOperacao(Operação.SOMA);
//     [Digito.UM].forEach((element) => {
//       this.cpu.recebaDigito(element);
//     });
//     this.cpu.recebaControle(Controle.IGUAL);
//   }

//   testeMemoriaMais2caso() {
//     console.log("teste memória mais 2caso");
//     [Digito.UM, Digito.DOIS, Digito.TRÊS].forEach((element) => {
//       this.cpu.recebaDigito(element);
//     });
//     this.cpu.recebaControle(Controle.IGUAL);
//     [Digito.UM].forEach((element) =>{
//       this.cpu.recebaDigito(element)
//     });
//     this.cpu.recebaControle(Controle.IGUAL)
//   }


// //MEMORIA -
//   testeMemoriaMenos() {
//     console.log("teste memória menos");
//     [Digito.UM, Digito.DOIS, Digito.TRÊS].forEach((element) => {
//       this.cpu.recebaDigito(element);
//     });
//     this.cpu.recebaControle(Controle.MEMÓRIA_SOMA);
//     this.cpu.recebaOperacao(Operação.SUBTRAÇÃO);
//     [Digito.UM].forEach((element) => {
//       this.cpu.recebaDigito(element);
//     });
//     this.cpu.recebaControle(Controle.IGUAL);
//   }

//   //MRC
  
//   testeMrc(){
//     console.log("teste MRC");
//     [Digito.UM, Digito.DOIS, Digito.TRÊS].forEach((element) => {
//       this.cpu.recebaDigito(element);
//     });
//     this.cpu.recebaControle(Controle.MEMÓRIA_SOMA);
//     this.cpu.recebaOperacao(Operação.SOMA);
//     [Digito.UM].forEach((element) => {
//       this.cpu.recebaDigito(element);
//     });
//     this.cpu.recebaControle(Controle.MEMÓRIA_LEITURA_LIMPEZA);
//     this.cpu.recebaControle(Controle.IGUAL);
  
//   }


//   // NUMERO DECIMAL

//   testeNumeroDecimal() {
//     console.log("Teste Números Decimais");
//     this.cpu.recebaDigito(Digito.UM); // 1
//     this.cpu.recebaControle(Controle.SEPARADOR_DECIMAL); // Adiciona separador decimal
//     this.cpu.recebaDigito(Digito.CINCO);
//     this.cpu.recebaDigito(Digito.DOIS) // 5


//   }



//   // TESTE SOMA

//   teste12Soma34Soma56() {
//      console.log("= Testando 12 + 34 + 56 ===========================");
//    [Digito.UM, Digito.DOIS].forEach((element) => {
//      this.cpu.recebaDigito(element);
//    });
//    [Digito.TRÊS, Digito.QUATRO].forEach((element) => {
//        this.cpu.recebaDigito(element);
//      });
//      this.cpu.recebaOperacao(Operação.SOMA);
//      [Digito.CINCO, Digito.SEIS].forEach((element) => {
//          this.cpu.recebaDigito(element);
//        });
//        this.cpu.recebaControle(Controle.IGUAL);
//        // this.cpu.recebaControle(Controle.IGUAL);
//       }

//   // TESTE RAIZ

//   testeRaiz(){
//     console.log("testando raiz");
//     [Digito.NOVE].forEach((element) => {
//       this.cpu.recebaDigito(element);
//     });
//     this.cpu.recebaOperacao(Operação.RAIZ_QUADRADA);
//     this.cpu.recebaControle(Controle.IGUAL);
//     console.log("passou")
//   }


//   testePorcentagem() {
//     console.log("= Testando operação de porcentagem ===========================");

//     console.log("Entrada: 100 + 10%");

//     this.cpu.recebaDigito(Digito.UM);  // 5
//     this.cpu.recebaDigito(Digito.ZERO);   // 0
//     this.cpu.recebaDigito(Digito.ZERO);   // 0

//     this.cpu.recebaOperacao(Operação.SOMA);
    
//     this.cpu.recebaDigito(Digito.UM);  // 5
//     this.cpu.recebaDigito(Digito.ZERO);   // 0
//    this.cpu.recebaOperacao(Operação.PERCENTUAL);

  
//   //  this.cpu.recebaControle(Controle.IGUAL);

    
//     console.log("Resultado esperado: 110");
//     // console.log("Resultado obtido: ", this.cpu.obtenhaTela().toString());  
//   }

//   testeNumeroNegativo() {
//     console.log("Teste de Números Negativos")

    
//     this.cpu.recebaDigito(Digito.TRÊS); // 3
//     this.cpu.recebaOperacao(Operação.SUBTRAÇÃO); 
   
//     this.cpu.recebaDigito(Digito.CINCO); // 5

    
//     this.cpu.recebaControle(Controle.IGUAL);

//     // Esperado: 3 - 5 = -2
//   }


// }

import { Controle, Cpu, Digito, Operação, Sinal, Tela } from "./calculadora";

import TelaX0Teste from "./telaX0Teste";

export class TestadorTela {
  private tela: Tela;

  constructor(tela: Tela) {
    this.tela = tela;
  }

  testeTodosNúmeros() {
    this.tela.limpe();
    console.log("= Testando todos os dígitos ===========================");
    Object.keys(Digito).forEach((element) => {
      if (Number(element)) this.tela.mostre(Number(element));
    });
  }

  testeTodosSímbolo() {
    this.tela.limpe();
    console.log("= Testando todos os símbolos ===========================");
    for (let i = 0; i < 8; i++) {
      this.tela.mostre(Digito.OITO);
      this.tela.mostreSeparadorDecimal();
    }
    this.tela.mostreMemoria();
    this.tela.mostreSinal(Sinal.NEGATIVO);
    this.tela.mostreErro();
  }
}

export class TestadorCpu {
  private cpu: Cpu;
  private tela: TelaX0Teste = new TelaX0Teste();
  private reinicieEntreTestes: boolean = true;

  constructor(
    cpu: Cpu,
    debug: boolean = false,
    reinicieEntreTestes: boolean = true
  ) {
    this.cpu = cpu;
    this.cpu.definaTela(this.tela);
    this.tela.debug = debug;
    this.reinicieEntreTestes = reinicieEntreTestes;
  }

  executeTodosTestes(): void {
    if (this.reinicieEntreTestes) this.cpu.reinicie();
    this.teste123Soma456();
    if (this.reinicieEntreTestes) this.cpu.reinicie();
    this.teste12Divisão10();
    if (this.reinicieEntreTestes) this.cpu.reinicie();
    this.teste12Soma34Soma56();
  }

  private assert(
    esperado: string,
    sinal: Sinal,
    memoria: boolean,
    erro: boolean
  ) {
    const resultado: string = this.tela.digitos;
    if (resultado == esperado) console.log("OK");
    else console.log("ERROR: esperado=" + esperado + " resultado=" + resultado);
    if (this.tela.sinal != sinal)
      console.log("ERROR: sinal=" + sinal + " resultado=" + this.tela.sinal);
    if (this.tela.memoria != memoria)
      console.log(
        "ERROR: memoria=" + memoria + " resultado=" + this.tela.memoria
      );
    if (this.tela.error != erro)
      console.log("ERROR: erro=" + erro + " resultado=" + this.tela.error);
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
    console.log("= Testando 123 + 456 ===========================");
    this.assert("579", Sinal.POSITIVO, false, false);
  }

  teste12Soma34Soma56() {
    console.log("= Testando 12 + 34 + 56 ===========================");
    [Digito.UM, Digito.DOIS].forEach((element) => {
      this.cpu.recebaDigito(element);
    });
    this.cpu.recebaOperacao(Operação.SOMA);
    [Digito.TRÊS, Digito.QUATRO].forEach((element) => {
      this.cpu.recebaDigito(element);
    });
    this.cpu.recebaOperacao(Operação.SOMA);
    [Digito.CINCO, Digito.SEIS].forEach((element) => {
      this.cpu.recebaDigito(element);
    });
    this.cpu.recebaControle(Controle.IGUAL);
    this.assert("102", Sinal.POSITIVO, false, false);
  }

  teste12Divisão10() {
    console.log("= Testando 12 / 10  ===========================");
    [Digito.UM, Digito.DOIS].forEach((element) => {
      this.cpu.recebaDigito(element);
    });
    this.cpu.recebaOperacao(Operação.DIVISÃO);
    [Digito.UM, Digito.ZERO].forEach((element) => {
      this.cpu.recebaDigito(element);
    });
    this.cpu.recebaControle(Controle.IGUAL);
    this.assert("1.2", Sinal.POSITIVO, false, false);
  }
}