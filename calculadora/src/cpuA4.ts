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

    converteNumberToDigit(numero: number): Digito[] {
        // console.log("transformei")
        let digitos: Digito[] = []
        while (numero > 0) {
            let digito = numero % 10
            digitos.push(digito)
            numero -= digito
            numero /= 10
        }
        if (digitos.length === 0) {
            digitos.push(Digito.ZERO)
        }
        return digitos.reverse()
    }

    converteDigitoToNumber(digitos: Digito[]): number {
        let r = 0
        digitos.forEach(digito => {
            r = r * 10 + digito
        });
        return r
        // type Digito = number;

        // const numeroString = this.digitos.join('')


    }

    calcular(): void {
        // this.reinicie()
        
        if (this.operando1.length === 0 || this.operando2.length === 0 || this.operacaoCorrente === undefined) {
            return; // Não pode calcular sem os dois operandos e uma operação
        }

        const valor1 = this.converteDigitoToNumber(this.operando1);  // Junte os dígitos e converta
        // const valor2 = this.converteDigitoToNumber(this.operando2);  // Junte os dígitos e converta
        const valor2 = this.operando2.length > 0 ? this.converteDigitoToNumber(this.operando2) : 0; 
        let resultado: number = 0; // Iniciar como 0

        //se tiver uma operação corrente
        if (this.operacaoCorrente != undefined) {
        // if (this.operacaoCorrente === undefined) {
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
            // console.log(resultado)
            this.tela.limpe();
            this.tela.mostre(resultado);
            // console.log(resultado);
        
            // Armazena o resultado para operações contínuas
            this.operando1 = this.converteNumberToDigit(resultado); // O resultado agora é o próximo operando1
            this.operando2 = []; // Limpa o segundo operando para permitir nova entrada
            this.operacaoCorrente = undefined; // Reseta a operação para receber uma nova
        }
      
        } 

    armazena(digito: Digito) {
        this.digitos.push(digito)
    }

    recebaOperacao(operação: Operação): void {
        // Se já existe uma operação corrente, finalize o cálculo atual antes de continuar
        if (this.operacaoCorrente != undefined && this.operando2.length > 0) {
            this.calcular();
            
            

            // this.controle.IGUAL();  // Execute a operação atual antes de definir a próxima
        }

        // Defina a nova operação corrente
        this.operacaoCorrente = operação;
    }

 
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
        // this.tela.limpe();
        // this.tela.mostre(Digito.ZERO);
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
