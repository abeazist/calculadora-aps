import { Digito, Tela } from ".//calculadora";

export default class TelaA4 implements Tela{
    mostre(digito: Digito): void {
        switch (digito){
            case Digito.ZERO: console.log('0000\n0 0\n0 0\n0 0\n0000\n')
        }
        console.log(digito)
    }
    limpe(): void {
        console.clear();
    }

}