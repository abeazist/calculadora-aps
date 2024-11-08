import { Digito, Sinal, Tela } from ".//calculadora";

export default class TelaA4 implements Tela {
    mostreSeparadorDecimal(): void {
        console.log('●')
    }
    mostreSinal(sinal: Sinal): void {
        // console.log('▬')
        switch (sinal){
            case Sinal.NEGATIVO:
                console.log('▬')
                break;
            case Sinal.POSITIVO:
                console.log('➕')
        }
    }
    mostreMemoria(): void {
        console.log("M");
      }
    mostreErro(): void {
        console.log("E")
    }
    mostre(digito: Digito): void {
        console.log(digito)
    }
    limpe(): void {
        console.log("tela.limpe")
    }

}