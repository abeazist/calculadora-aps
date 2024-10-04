import { Controle, Cpu, Digito, Operação, Tela } from "./calculadora";

export default class CpuA4 implements Cpu{
    tela!: Tela;
    controle!: Controle;
    // digito!: Digito;
    digitos: Digito[] = [];
    operacoes: Operação[] = [];
    operacaoCorrente: any; // operação existente depois de se clicar em 

    constructor(tela: Tela){
        this.definaTela(tela);
    }


    recebaDigito(digito: Digito): void {
        // aramazenar o digito
        this.armazena(digito);

        //limpar a tela se for o primeiro digito
        if( this.digitos.length == 0) 
            this.tela.limpe()

        //mostre o digito
        this.tela.mostre(digito)
        
    }
    armazena(digito: Digito) {
        this.digitos.push(digito)
    }
    recebaOperacao(operação: Operação): void {
        //se ja existir uma operação corrente, entao manda o controle igual para a CPU
        if (this.operacoes.length > 1)
            this.controle.IGUAL()

            //se clicar em alguma operaçao ja existindo uma opreação, guardar a operação existente em uma varivel de oiperações correntes. depois fazer a soma de opCorrente + digito3

        // definir a operação corrente com o vaor da operação que esta chegnado (op corrente é tipo 1+2+3, calcula o 1+2 prea ai calcular o +3)
        this.operacaoCorrente = Digito1 + Digito2
        
        
    }
    operacaoCorrente(digito: Digito){
        this
    }
    recebaControle(controle: Controle): void {
        //se o controle for para ligar a calculadora, entao chama o metodo interno que trata ativacao, limpeza e erro(tratar ativaçao)
        //limpe a tela
        //mostre o zero na tela
        if (ligar calculadora)
        this.controle.ATIVAÇÃO_LIMPEZA_ERRO()
            this.tela.limpe()
            this.digito.ZERO()


       
    }
    reinicie(): void {
        this.tela.limpe();
        this.tela.mostre(Digito.ZERO);
    }
    definaTela(tela: Tela): void {
        this.tela = tela;
    }
    obtenhaTela(): Tela {
        return this.tela;
    }

}