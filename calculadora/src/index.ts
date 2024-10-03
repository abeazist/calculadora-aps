// import { Digito } from "./calculadora";
// import TelaA4 from "./telaA4";

// const tela = new TelaA4();
// tela.mostre(Digito.ZERO);

import { Controle, Digito, Operação } from "./calculadora";
import CpuA4 from "./cpuA4";
import TelaA4 from "./telaA4";
 
const tela = new TelaA4()
tela.mostre(Digito.ZERO)
tela.limpe()
tela.mostre(Digito.UM)

const cpu = new CpuA4(tela)

cpu.reinicie()