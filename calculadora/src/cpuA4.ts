import { Controle, Cpu, Digito, Operação, Tela } from "./calculadora";
import TelaA4 from "./telaA4";

export default class CpuA4 implements Cpu {
    tela!: Tela;
    controle!: Controle;
    // digito!: Digito;
    digitos: Digito[] = [];
    operando1: Digito[] = [];
    operando2: Digito[] = [];

    operacaoCorrente: Operação | undefined = undefined; // operação existente depois de se clicar em 
    // reinicie: any;
    temDecimal: boolean = false; //controlando a virgula


    constructor(tela: Tela) {
        this.definaTela(tela);
    }


    recebaDigito(digito: Digito): void {
        // Se não houver operação em andamento, armazena no operando1, caso contrário, no operando2
        if (this.operacaoCorrente === undefined) {
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


    }

    converteNumberToDigit(numero: number): Digito[]{
        // console.log("transformei")
        let digitos:Digito[] = []
        while(numero > 0){
            let digito = numero%10
            digitos.push(digito)
            numero -= digito 
            numero /= 10
        }
        if (digitos.length === 0){
            digitos.push(Digito.ZERO)
        }
        return digitos.reverse()
    }

    converteDigitoToNumber(digitos:Digito[]):number{
        let r = 0
        digitos.forEach(digito => {
            r = r * 10 +digito
        });
        return r
        // type Digito = number;

        // const numeroString = this.digitos.join('')
        

    }

    calcular(): void {
        if (this.operando1.length === 0 || this.operando2.length === 0 || this.operacaoCorrente === undefined) {
            return; // Não pode calcular sem os dois operandos e uma operação
        }

        const valor1 = this.converteDigitoToNumber(this.operando1);  // Junte os dígitos e converta
        const valor2 = this.converteDigitoToNumber(this.operando2);  // Junte os dígitos e converta
        let resultado: number = 0; // Iniciar como 0

        if (this.operacaoCorrente != undefined) {
            if (this.operacaoCorrente === Operação.SOMA) {
                resultado = valor1 + valor2;
            } else if (this.operacaoCorrente === Operação.SUBTRAÇÃO) {
                resultado = valor1 - valor2;
            } else if (this.operacaoCorrente === Operação.MULTIPLICAÇÃO) {
                resultado = valor1 * valor2;
            } else if (this.operacaoCorrente === Operação.DIVISÃO) {
                if (valor2 !== 0) {
                    resultado = valor1 / valor2;
                }
            } else if (this.operacaoCorrente === Operação.RAIZ_QUADRADA) {
                resultado = Math.sqrt(valor1);
            }
        }

        this.tela.limpe();
        this.tela.mostre(resultado);

        //passar o resultado para o op1(q precisa ser numero)
        this.operando1 = this.converteNumberToDigit(resultado)
        console.log(resultado)

        // Reinicia operandos e operação corrente
        this.operando2 = [];
        this.operacaoCorrente = undefined;
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
        if (this.operacaoCorrente != undefined && this.operando2.length > 0) {
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

    //ANOTACOES

    //o operando vai clicar nos digitos e eles seram armazenados na lista1.length
    //quando o operando clicar na virgula a posicao da lista1.length deve ser gravada na lista2
    //se o operando clicar novamente na virgula nao sera possivel adicionar 

    //criar um "for"
    //for(d-> D())
    //r=0
    //r=r.10^3+D
    //r=12346-> 12,356


    //FAZER A SEPARAÇÃOPOR SINAIS TB
    reinicie(): void {
        this.tela.limpe();
        this.tela.mostre(Digito.ZERO);
        this.operando1 = [];
        this.operando2 = [];
        this.operacaoCorrente = undefined;
    }
    definaTela(tela: Tela): void {
        this.tela = tela;
    }
    obtenhaTela(): Tela {
        return this.tela;
    }

}

// console.log(Digito)
// console.log(Controle)
// console.log(TelaA4)
// console.log(Digito.QUATRO)
// console.log(Operação.SOMA)
// console.log(Digito.DOIS)
