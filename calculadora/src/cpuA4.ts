import { Controle, Cpu, Digito, Operação, Sinal, Tela } from "./calculadora";
import TelaA4 from "./telaA4";

export default class CpuA4 implements Cpu {
    tela!: Tela;
    operando1: Digito[] = [];
    operando1Sinal: Sinal = Sinal.POSITIVO;
    operando1PosicaoSeparadorDecimal: number = 0;
    operando2: Digito[] = [];
    operando2Sinal: Sinal = Sinal.POSITIVO;
    operando2PosicaoSeparadorDecimal: number = 0;
    memoria: number = 0;
    historioControle: Controle | undefined = undefined;
    operacaoCorrente: Operação | undefined = undefined;


    constructor(tela: Tela) {
        this.definaTela(tela);
    }


    recebaDigito(digito: Digito): void {

        if (this.operacaoCorrente === undefined) {
            this.operando1.push(digito);
        } else {
            this.operando2.push(digito);
        }


        if (this.operando1.length === 1 || this.operando2.length === 1) {
            this.tela.limpe();
        }
        this.tela.mostre(digito);

        this.historioControle = undefined;
    }

    private converteNumberToDigitos(numero: number): Digito[] {
        let digitos: Digito[] = []
        numero = Math.abs(numero)
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

    private converteDigitosToNumber(digitos: Digito[], sinal: Sinal, posicaoSeparadorDecimal: number): number {
        let resultado = 0
        digitos.forEach((digito) => {
            resultado = resultado * 10 + digito;
        });

        resultado = resultado * (sinal == Sinal.NEGATIVO ? -1 : 1)
        if (posicaoSeparadorDecimal) {
            return resultado / (10 ** (digitos.length - posicaoSeparadorDecimal));
        } else {
            return resultado
        }
    }

    private calcule(): void {
        if (this.operando1.length === 0 || this.operando2.length === 0 || this.operacaoCorrente === undefined) {
            return;
        }

        const valor1 = this.converteDigitosToNumber(this.operando1, this.operando1Sinal, this.operando1PosicaoSeparadorDecimal);
        const valor2 = this.converteDigitosToNumber(this.operando2, this.operando2Sinal, this.operando2PosicaoSeparadorDecimal);
        let resultado: number = 0;

        switch (this.operacaoCorrente) {
            case Operação.SOMA: resultado = valor1 + valor2; break;
            case Operação.SUBTRAÇÃO: resultado = valor1 - valor2; break;
            case Operação.MULTIPLICAÇÃO: resultado = valor1 * valor2; break;
            case Operação.DIVISÃO:
                if (valor2 !== 0) {
                    resultado = valor1 / valor2;
                }
                break;

            default:
        }

        this.operando1 = this.converteNumberToDigitos(resultado);
        this.operando1Sinal = resultado < 0 ? Sinal.NEGATIVO : Sinal.POSITIVO;

        this.mostreDigitos(this.operando1, this.operando1Sinal);
    }


    private calculeRaiz() {
        let numeroRaiz;
        if (this.operacaoCorrente === undefined) {
            numeroRaiz = this.converteDigitosToNumber(this.operando1, this.operando1Sinal, this.operando1PosicaoSeparadorDecimal)
        } else {
            numeroRaiz = this.converteDigitosToNumber(this.operando2, this.operando2Sinal, this.operando2PosicaoSeparadorDecimal)
        }

        if (numeroRaiz >= 0) {
            let resultado = Math.sqrt(numeroRaiz)
            const resultadoRaiz = this.converteNumberToDigitos(resultado)
            if (this.operacaoCorrente === undefined) {
                this.operando1 = resultadoRaiz
                this.operando1Sinal = resultado < 0 ? Sinal.NEGATIVO : Sinal.POSITIVO
                this.mostreDigitos(this.operando1, this.operando1Sinal)
            } else {
                this.operando2 = resultadoRaiz
                this.operando2Sinal = resultado < 0 ? Sinal.NEGATIVO : Sinal.POSITIVO
                this.mostreDigitos(this.operando2, this.operando2Sinal)

            }
        }

    }

    // private mostreDigitos(digitos: Digito[], sinal: Sinal): void {
    //     this.tela.limpe();
    //     this.tela.mostreSinal(sinal); 
    //     digitos.forEach(digito => {
    //         this.tela.mostre(digito); 
    //     });
    // }

    // private mostreDigitos(digitos: Digito[], sinal: Sinal): void{
    //     this.tela.limpe()
    //     digitos.forEach(digito => {
    //         this.tela.mostre(digito)
    //     });
    //     this.tela.mostreSinal(sinal)
    // }

    private mostreDigitos(digitos: Digito[], sinal: Sinal): void {
        this.tela.limpe()
        this.tela.mostreSinal(sinal)
        digitos.forEach(digito => {
            this.tela.mostre(digito)
        });
    }



    recebaOperacao(operação: Operação): void {
        switch (operação) {
            case Operação.RAIZ_QUADRADA:
                this.calculeRaiz();
                break;
                case Operação.PERCENTUAL:
                    this.calculePorcentagem();
                    break;
                    default:
                        if (this.operacaoCorrente != undefined && this.operando2.length > 0) {
                            this.calcule();
                        }
                        this.operacaoCorrente = operação;
                        break;
                    }
                    
                    this.historioControle = undefined;
                }

    recebaControle(controle: Controle): void {
        switch (controle) {
            case Controle.ATIVAÇÃO_LIMPEZA_ERRO:
                this.reinicie();
                break;
            case Controle.IGUAL:
                this.calcule();
                break;
            case Controle.MEMÓRIA_SOMA:
                this.memoriaMais()
                break;
            case Controle.MEMÓRIA_SUBTRAÇÃO:
                this.memoriaMenos()
                break;
            case Controle.MEMÓRIA_LEITURA_LIMPEZA:
                if (this.historioControle === Controle.MEMÓRIA_LEITURA_LIMPEZA) {
                    this.memoriaLiMpeza()
                } else {
                    this.memoriaLeitura()
                }
                break;
            case Controle.SEPARADOR_DECIMAL:
                if (this.operacaoCorrente === undefined) {
                    if (!this.operando1PosicaoSeparadorDecimal) {
                        this.operando1PosicaoSeparadorDecimal = this.operando1.length;
                        this.tela.mostreSeparadorDecimal()
                    }
                }
                else {
                    if (this.operando2PosicaoSeparadorDecimal) {
                        this.operando2PosicaoSeparadorDecimal = this.operando2.length;
                        this.tela.mostreSeparadorDecimal()
                    }
                    break;

                }

                this.historioControle = controle;
        }
    }

    // Implementação da operação de porcentagem

    private calculePorcentagem(): void {
        const numero1 = this.converteDigitosToNumber(this.operando1, this.operando1Sinal, this.operando1PosicaoSeparadorDecimal);
        const numero2 = this.converteDigitosToNumber(this.operando2, this.operando2Sinal, this.operando2PosicaoSeparadorDecimal);
        let resultado: number;


        if (this.operando2.length === 0) {
            this.reinicie();
        }

        switch (this.operacaoCorrente) {
            case Operação.SOMA:
            case Operação.SUBTRAÇÃO:
                console.log("R=", this.operando1, this.operando2, numero1, numero2);
                let porcentagem = numero1 * (numero2 / 100);
                resultado = this.operacaoCorrente === Operação.SOMA ? numero1 + porcentagem : numero1 - porcentagem;
                console.log('R2=',resultado,porcentagem)
                this.operando1 = this.converteNumberToDigitos(resultado);
                this.operando1Sinal = resultado < 0 ? Sinal.NEGATIVO : Sinal.POSITIVO;
                console.log("R="+resultado);
                
                this.mostreDigitos(this.operando1, this.operando1Sinal);
                    
            break;
            case Operação.MULTIPLICAÇÃO:
                resultado = (numero1 * numero2) / 100;
    
                this.operando2 = this.converteNumberToDigitos(resultado);
                this.operando2Sinal = resultado < 0 ? Sinal.NEGATIVO : Sinal.POSITIVO;
                this.mostreDigitos(this.operando2, this.operando2Sinal);
            break;
            case Operação.DIVISÃO:

                if (numero2 !== 0) {
                    resultado = numero1 / (numero2 / 100);
        
                    this.operando1 = this.converteNumberToDigitos(resultado);
                    this.operando1Sinal = resultado < 0 ? Sinal.NEGATIVO : Sinal.POSITIVO;
                    this.mostreDigitos(this.operando1, this.operando1Sinal);
                }
            break;
        
            default:
                break;
        }
    }

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

    private memoriaMais(): void {
        const valorAtual = this.converteDigitosToNumber(this.operando1, this.operando1Sinal, this.operando1PosicaoSeparadorDecimal);
        this.memoria += valorAtual;
        this.tela.mostreMemoria()
        this.recebaControle(Controle.IGUAL)
    }

    private memoriaMenos(): void {
        const valorAtual = this.converteDigitosToNumber(this.operando1, this.operando1Sinal, this.operando1PosicaoSeparadorDecimal);
        this.memoria -= valorAtual;
        console.log("M-")
        this.recebaControle(Controle.IGUAL)
    }

    private memoriaLeitura(): void {
        if (this.operacaoCorrente === undefined) {
            this.operando1 = this.converteNumberToDigitos(this.memoria);
            this.operando1Sinal = this.memoria >= 0 ? Sinal.POSITIVO : Sinal.NEGATIVO;
            this.mostreDigitos(this.operando1, this.operando1Sinal)
        } else {
            this.operando2 = this.converteNumberToDigitos(this.memoria);
            this.operando2Sinal = this.memoria >= 0 ? Sinal.POSITIVO : Sinal.NEGATIVO
            this.mostreDigitos(this.operando2, this.operando2Sinal)
        }
        
    }

    private memoriaLiMpeza(): void {
        this.tela.mostreMemoria();
        this.memoria = 0;
    }
}




