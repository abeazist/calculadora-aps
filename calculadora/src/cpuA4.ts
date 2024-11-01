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
    

    //-------SEPARADOR DECIMAL--------
    //criar uma classe (é preciso mesmo criar uma?) que contenha um atributo posicaoSeparadorDecimal que armazene a posicao da virgula, e inicia em 0 pois não há uma virgula ainda
    // temDecimal: boolean = false; //controlando a virgula


    

    operacaoCorrente: Operação | undefined = undefined; // operação existente depois de se clicar em 
    // reinicie: any;

    constructor(tela: Tela) {
        this.definaTela(tela);
    }
    
    
    //---SEPARADPR DECMAL ---
    //é preciso definir um metodo definaSeparadorDecimalAgora(), Este método verifica se posicaoSeparadorDecimal já foi definido
    //Se não foi, ele define a posição do separador decimal como o comprimento atual da lista de dígitos (this.digitos.length)
    
    // if (posicao)
    //     return (r/10 **20 - 0 )
    // else:
    //     return r





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

        this.historioControle = undefined;
    }

    private converteNumberToDigitos(numero: number): Digito[] {
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

    private converteDigitosToNumber(digitos: Digito[], sinal: Sinal, posicaoSeparadorDecimal:number): number {
        let resultado = 0
        digitos.forEach((digito) => {
            resultado = resultado * 10 + digito; //movimentaçao da casa decimal
          });

          resultado = resultado * (sinal==Sinal.NEGATIVO?-1:1)
          if (posicaoSeparadorDecimal){
              return resultado / (10 ** (digitos.length - posicaoSeparadorDecimal)); //é onde a posição do separador decimal é aplicada
          } else{
              return resultado
          } 
    }

    private calcular(): void {
        // this.reinicie()
        
        if (this.operando1.length === 0 || this.operando2.length === 0 || this.operacaoCorrente === undefined) {
            return; // Não pode calcular sem os dois operandos e uma operação
        }

        const valor1 = this.converteDigitosToNumber(this.operando1, this.operando1Sinal, this.operando1PosicaoSeparadorDecimal);  // Junte os dígitos e converta
        const valor2 = this.converteDigitosToNumber(this.operando2, this.operando2Sinal, this.operando2PosicaoSeparadorDecimal);  // Junte os dígitos e converta
        // const valor2 = this.operando2.length > 0 ? this.converteDigitosToNumber(this.operando2) : 0; 
        let resultado: number = 0; // Iniciar como 0

        //se tiver uma operação corrente
        if (this.operacaoCorrente != undefined) {
        // if (this.operacaoCorrente === undefined) {
            if (this.operacaoCorrente === Operação.SOMA) {
                resultado = valor1 + valor2;

                // this.operando1
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

            this.operando1 = this.converteNumberToDigitos(resultado)
            this.operando1Sinal = resultado>0?Sinal.POSITIVO:Sinal.NEGATIVO;

            this.mostreDigitos(this.operando1, this.operando1Sinal)

            // this.operando1 = this.converteNumberToDigitos(resultado); // O resultado agora é o próximo operando1
            // this.operando2 = []; // Limpa o segundo operando para permitir nova entrada
            // this.operacaoCorrente = undefined; // Reseta a operação para receber uma nova
        
            // console.log(resultado);
        
            // Armazena o resultado para operações contínuas
        }
      
        } 

    private mostreDigitos(digitos: Digito[], sinal: Sinal): void{
        this.tela.limpe()
        digitos.forEach(digito => {
            this.tela.mostre(digito)
        });
        this.tela.mostreSinal(sinal)
    }


    recebaOperacao(operação: Operação): void {
        // Se já existe uma operação corrente, finalize o cálculo atual antes de continuar
        if (this.operacaoCorrente != undefined && this.operando2.length > 0) {
            this.calcular();
            
            

            // this.controle.IGUAL();  // Execute a operação atual antes de definir a próxima
        }

        // Defina a nova operação corrente
        this.operacaoCorrente = operação;
        this.historioControle = undefined;
    }

    recebaControle(controle: Controle): void {
        switch (controle) {
            case Controle.ATIVAÇÃO_LIMPEZA_ERRO:
                this.reinicie();
                break;
                case Controle.IGUAL:
                    this.calcular();
                break;
            case Controle.MEMÓRIA_SOMA:
                this.memoriaMais()
                break;
                case Controle.MEMÓRIA_SUBTRAÇÃO:
                    this.memoriaMenos()
                    break;
                    case Controle.MEMÓRIA_LEITURA_LIMPEZA:
                        if(this.historioControle === Controle.MEMÓRIA_LEITURA_LIMPEZA){
                            this.memoriaLiMpeza()
                        }else{
                            this.memoriaLeitura()
                        }
            case Controle.SEPARADOR_DECIMAL: //aqui tem que usar operando corrente???
                    if (this.operacaoCorrente === undefined){
                        if (!this.operando1PosicaoSeparadorDecimal) {
                            this.operando1PosicaoSeparadorDecimal = this.operando1.length;
                            this.tela.mostreSeparadorDecimal() // Define a posição do decimal
                        }
                    }
                    else{
                        if (this.operando2PosicaoSeparadorDecimal) {
                            this.operando2PosicaoSeparadorDecimal = this.operando2.length;
                            this.tela.mostreSeparadorDecimal() // Define a posição do decimal    
                        }
                        break
                
            }
            
            this.historioControle = controle;
        }
    }
   //não sei se ta certo pq não consigo testar

        percentue(): void {
            if (this.operando1.length === 0 || this.operacaoCorrente === undefined) {
                return; 
            }
        
            let numero1: number = this.converteDigitosToNumber(this.operando1, this.operando1Sinal, this.operando1PosicaoSeparadorDecimal);
            let numero2: number = this.converteDigitosToNumber(this.operando2, this.operando2Sinal, this.operando2PosicaoSeparadorDecimal);
        
            let resultado = (numero1 * numero2) / 100;
        
            this.operando2 = this.converteNumberToDigitos(resultado); 
            this.mostreDigitos(this.operando2, this.operando2Sinal); 
            this.recebaControle(Controle.IGUAL); 
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
            this.recebaControle(Controle.IGUAL)
            const valorAtual = this.converteDigitosToNumber(this.operando1, this.operando1Sinal, this.operando1PosicaoSeparadorDecimal);
            this.memoria += valorAtual;
            this.tela.mostreMemoria()
        }

        private memoriaMenos(): void {
            this.recebaControle(Controle.IGUAL)
            const valorAtual = this.converteDigitosToNumber(this.operando1, this.operando1Sinal, this.operando1PosicaoSeparadorDecimal);
            this.memoria -= valorAtual;
            console.log("M-")
        }

        private memoriaLeitura(): void {
            if (this.operacaoCorrente === undefined) {
                this.operando1 = this.converteNumberToDigitos(this.memoria);
                this.operando1Sinal = this.memoria>=0?Sinal.POSITIVO:Sinal.NEGATIVO;
                this.mostreDigitos(this.operando1, this.operando1Sinal)
            }   else{
                this.operando2 = this.converteNumberToDigitos(this.memoria);
                this.operando2Sinal = this.memoria>=0?Sinal.POSITIVO:Sinal.NEGATIVO
                this.mostreDigitos(this.operando2, this.operando2Sinal)
            }
        } 

    private memoriaLiMpeza(): void {
        this.tela.mostreMemoria();
        this.memoria = 0;
    }
}




