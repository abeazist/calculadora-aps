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

  //teste123Soma456() {
  //  console.log("= Testando 123 + 456 ===========================");
  //  [Digito.UM, Digito.DOIS, Digito.TRÊS].forEach((element) => {
  //    this.cpu.recebaDigito(element);
  //  });
  //  this.cpu.recebaOperacao(Operação.SOMA);
  //  [Digito.QUATRO, Digito.CINCO, Digito.SEIS].forEach((element) => {
  //    this.cpu.recebaDigito(element);
  //  });
  //  this.cpu.recebaControle(Controle.IGUAL);
  //  
  //}

  testeMemoria(){
    console.log("Teste Negativo");
    [Digito.UM, Digito.DOIS, Digito.TRÊS].forEach((element) => {
      this.cpu.recebaDigito(element);
      // console.log(Digito)
    })
    this.cpu.recebaControle(Controle.MEMÓRIA_SOMA);

/*    1,2,3,M+,+,1,=    m=123 e resultado=124
b) 1,2,3,M+,1,=      m=123 e resultado=1
c) 1,2,3,M+,1,+,1,=  m=123 e resuiltado=2
d) 1,2,3,M+,+,1,M+,=  m=247 e resuiltado=124
e) 1,2,3,=,1,=       m=0 e resultado=1
  */
   }

  testeNumeroNegativo(){
    console.log("Teste Negativo");
    [Digito.UM, Digito.ZERO].forEach((element) => {
      this.cpu.recebaDigito(element);
      // console.log(Digito)
    })
    this.cpu.recebaOperacao(Operação.SUBTRAÇÃO);
    [Digito.UM, Digito.DOIS].forEach((element) => {
      this.cpu.recebaDigito(element);
    });
    this.cpu.recebaControle(Controle.IGUAL)
  }

  //teste12Soma34Soma56() {
  //  console.log("= Testando 12 + 34 + 56 ===========================");
  //  [Digito.UM, Digito.DOIS].forEach((element) => {
  //    this.cpu.recebaDigito(element);
  //  });
  //  this.cpu.recebaOperacao(Operação.SOMA);
  //  [Digito.TRÊS, Digito.QUATRO].forEach((element) => {
  //    this.cpu.recebaDigito(element);
  //  });
  //  this.cpu.recebaOperacao(Operação.SOMA);
  //  [Digito.CINCO, Digito.SEIS].forEach((element) => {
  //    this.cpu.recebaDigito(element);
  //  });
  //  this.cpu.recebaControle(Controle.IGUAL);
  //  // this.cpu.recebaControle(Controle.IGUAL);
  //  console.log('passando para teste 4')
  //  this.cpu.recebaControle(Controle.MEMÓRIA_SOMA);
  //}
  

  }

