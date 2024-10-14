import { Controle, Cpu, Digito, Operação, Tela } from "./calculadora";

export default class CpuA4 implements Cpu {
    tela!: Tela;
    controle!: Controle;
    // digito!: Digito;
    digitos: Digito[] = [];
    // operacoes: Operação[] = [];
    operando1: Digito[] = [];
    operando2: Digito[] = [];
    operacaoCorrente: any; // operação existente depois de se clicar em 
    // reinicie: any;

    constructor(tela: Tela) {
        this.definaTela(tela);
    }

    //CÓDIGO NOSSO COMENTADO
    // recebaDigito(digito: Digito): void {
    //     // aramazenar o digito
    //     this.armazena(digito);

    //     //limpar a tela se for o primeiro digito
    //     if( this.digitos.length == 0) 
    //         this.tela.limpe()

    //     //mostre o digito
    //     this.tela.mostre(digito)


    //     if(this.recebaOperacao != '')
    //         this.digitos.push(operando1)

    // }

    recebaDigito(digito: Digito): void {
        // Se não houver operação em andamento, armazena no operando1, caso contrário, no operando2
        if (!this.operacaoCorrente) {
            this.operando1.push(digito);
        } else {
            this.operando2.push(digito);
        }

        // Limpa a tela na primeira digitação
        if (this.operando1.length === 1 || this.operando2.length === 1) {
            this.tela.limpe();
        }

        // Mostra o dígito na tela
        this.tela.mostre(digito);

        // Armazena o dígito na lista de dígitos geral
        // this.armazena(digito);
    }

    calcular(): void {
        if (this.operando1.length === 0 || this.operando2.length === 0 || !this.operacaoCorrente) {
            return; // Não pode calcular sem os dois operandos e uma operação
        }
        
        const valor1 = Number(this.operando1)
        const valor2 = Number(this.operando2)
        let resultado = Digito.ZERO

        if (this.operacaoCorrente) {
            if (Operação.SOMA)
                resultado = valor1 + valor2;

            else if (Operação.SUBTRAÇÃO)
                resultado = valor1 - valor2;

            else if (Operação.MULTIPLICAÇÃO)
                resultado = valor1 * valor2;
            else if (Operação.DIVISÃO)
                if (valor2 !== 0) {
                    resultado = valor1 / valor2;
                }
        }
        this.tela.limpe();
        this.tela.mostre(resultado);

        // Reinicia operandos e operação corrente
        this.operando1 = [];
        this.operando2 = [];
        this.operacaoCorrente = null;

    }

    armazena(digito: Digito) {
        this.digitos.push(digito)
    }

    //codigo comentado
    // recebaOperacao(operação: Operação): void {
    //     //se ja existir uma operação corrente, entao manda o controle igual para a CPU
    //     if (this.operacoes.length > 1)
    //         this.controle.IGUAL()

    //         //se clicar em alguma operaçao ja existindo uma operação, guardar a operação existente em uma varivel de operações correntes. depois fazer a soma de opCorrente + digito3

    //     // definir a operação corrente com o vaor da operação que esta chegnado (op corrente é tipo 1+2+3, calcula o 1+2 prea ai calcular o +3)
    //     this.operacaoCorrente = Digito1 + Digito2


    // }
    recebaOperacao(operação: Operação): void {
        // Se já existe uma operação corrente, finalize o cálculo atual antes de continuar
        if (this.operacaoCorrente && this.operando2.length > 0) {
            this.calcular();
            // this.controle.IGUAL();  // Execute a operação atual antes de definir a próxima
        }

        // Defina a nova operação corrente
        this.operacaoCorrente = operação;
    }

    // operacaoCorrente(digito: Digito){
    //     this
    // }
    recebaControle(controle: Controle): void {
        //se o controle for para ligar a calculadora, entao chama o metodo interno que trata ativacao, limpeza e erro(tratar ativaçao)
        //limpe a tela
        //mostre o zero na tela
        // if (ligar calculadora)
        // this.controle.ATIVAÇÃO_LIMPEZA_ERRO()
        // this.tela.limpe()
        // this.digito.ZERO()
        switch (controle) {
            case Controle.ATIVAÇÃO_LIMPEZA_ERRO:
                this.reinicie();
                break;
            case Controle.IGUAL:
                this.calcular();
                break;
            }



    }
    reinicie(): void {
        this.tela.limpe();
        this.tela.mostre(Digito.ZERO);
        this.operando1 = [];
        this.operando2 = [];
        this.operacaoCorrente = null;
    }
    definaTela(tela: Tela): void {
        this.tela = tela;
    }
    obtenhaTela(): Tela {
        return this.tela;
    }

}