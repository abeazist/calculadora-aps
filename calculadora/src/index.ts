// import { Digito } from "./calculadora";
// import TelaA4 from "./telaA4";

// const tela = new TelaA4();
// tela.mostre(Digito.ZERO);

import { Controle, Digito, Operação } from "./calculadora";

import {TestadorTela } from "./calculadoraTestes"; //TESTE

import { TestadorCpu } from "./calculadoraTestes"; //TESTE

import CpuA4 from "./cpuA4";
import TelaA4 from "./telaA4";
 
const tela = new TelaA4()


// Testando a TELA
// new TestadorTela(tela).testeTodosNúmeros(); //TESTE
// new TestadorTela(tela).testeTodosSímbolo(); //TESTE

// tela.mostre(Digito.ZERO)
// tela.limpe()
// tela.mostre(Digito.UM)

const cpu = new CpuA4(tela)

// new TestadorCpu(cpu).testeNumeroNegativo();
cpu.reinicie()

// Testando a CPU
cpu.definaTela(tela);
new TestadorCpu(cpu).teste123Soma456(); //TESTE
// new TestadorCpu(cpu).teste12Soma34Soma56(); //TESTE
// new TestadorCpu(cpu).testeNumeroNegativo();
// new TestadorCpu(cpu).testeMemoria();
// new TestadorCpu(cpu).testeNumeroDecimal();
// new TestadorCpu(cpu).testeRaiz(); descomentarei dps
//new TestadorCpu(cpu).testePorcentagem();



