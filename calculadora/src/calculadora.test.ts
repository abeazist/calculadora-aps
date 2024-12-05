import { Controle, Digito, Operação, Sinal } from "./calculadora"
import CpuA4 from "./cpuA4"
import TelaX0Teste from "./telaX0Teste"


describe("Testando a calculadora", ()=>{
    let tela: TelaX0Teste = new TelaX0Teste()
    let cpu: CpuA4 = new CpuA4(tela)
    test("testar 123+456", ()=>{
        console.log("= Testando 123 + 456 ===========================");
        [Digito.UM, Digito.DOIS, Digito.TRÊS].forEach((element) => {
          cpu.recebaDigito(element);
        });
        cpu.recebaOperacao(Operação.SOMA);
        [Digito.QUATRO, Digito.CINCO, Digito.SEIS].forEach((element) => {
        cpu.recebaDigito(element);
        });
        cpu.recebaControle(Controle.IGUAL);
        expect (tela.digitos).toBe("579")
        expect (tela.sinal).toBe(Sinal.POSITIVO)
        expect (tela.memoria).toBeFalsy()
        expect (tela.error).toBeFalsy()
        // console.log("= Testando 123 + 456 ===========================");
        // this.assert("579", Sinal.POSITIVO, false, false);

    })
    test("testar 12+34+56", ()=>{
        
    })
    test("testar 12/10", ()=>{
        
    })
})