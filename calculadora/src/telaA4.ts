import { Digito, Sinal, Tela } from ".//calculadora";

export default class TelaA4 implements Tela {
    mostreSeparadorDecimal(): void {
        console.log('exibindo separador')
    }
    mostreSinal(sinal: Sinal): void {
        console.log('exibindo sinal')
    }
    mostreMemoria(): void {
        console.log("M   M\nMM MM\nM M M\nM   M\nM   M\n");
      }
    mostreErro(): void {
        console.log('exibindo erro')
    }
    mostre(digito: Digito): void {

        switch (digito) {

            case Digito.ZERO:
                console.log('0000\n0 0\n0 0\n0 0\n0000\n');
                break;
            case Digito.UM:
                console.log('  1 \n 11 \n  1 \n  1 \n1111\n');
                break;

            case Digito.DOIS:
                console.log('2222\n   2\n2222\n2   \n2222\n');
                break;

            case Digito.TRÊS:
                console.log('3333\n   3\n3333\n   3\n3333\n');
                break;

            case Digito.QUATRO:
                console.log('4  4\n4  4\n4444\n   4\n   4\n');
                break;

            case Digito.CINCO:
                console.log('5555\n5   \n5555\n   5\n5555\n');
                break;

            case Digito.SEIS:
                console.log('6666\n6   \n6666\n6  6\n6666\n');
                break;

            case Digito.SETE:
                console.log('7777\n   7\n   7\n   7\n   7\n');
                break;

            case Digito.OITO:
                console.log('8888\n8  8\n8888\n8  8\n8888\n');
                break;

            case Digito.NOVE:
                console.log('9999\n9  9\n9999\n   9\n   9\n');
                break;
            default:
                console.log("Dígito inválido");

        }
        // console.log(digito)
    }
    limpe(): void {
        console.clear();
        // console.log("tela.limpe")
    }

}