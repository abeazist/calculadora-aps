import { Controle, Cpu, Digito, Operação, Sinal, Tela } from "./calculadora";
import TelaA4 from "./telaA4";

export default class CpuA4 implements Cpu {
    tela!: Tela;
    operando1: Digito[] = [];
    operando1Sinal: Sinal = Sinal.POSITIVO;
    operando2: Digito[] = [];
    operando2Sinal: Sinal = Sinal.POSITIVO;
    memoria: number = 0;
    historioControle: Controle | undefined = undefined;

    operacaoCorrente: Operação | undefined = undefined; // operação existente depois de se clicar em 
    // reinicie: any;
    temDecimal: boolean = false; //controlando a virgula

    //SEPARADOR_DECIMAL------------------------------------------------------------------------------------------
    // private operando1SeparadorDecimal : number =0
    // private operando2SeparadorDecimal : number =0
    // private operando2:Operando =new Operando()
    // private operando1: Operando =new Operando()
    // private operacaoCorrente: Operacao


    constructor(tela: Tela) {
        this.definaTela(tela);
    }

    //SEPARADOR_DECIMAL ------------------------------------------------------------------------------------------
    // class Operando{
    //     digitos:Digitos[]=[]
    //     sinal: Sinal
    // }


    recebaDigito(digito: Digito): void {

        //SEPARADOR DECIMAL------------------------------------------------------------

        // if (digito === Controle.SEPARADOR_DECIMAL) {
        //     if (this.temDecimal) {
        //         return; // Não permite adicionar mais de um separador decimal
        //     }
        //     this.temDecimal = true; // Marque que o separador decimal foi usado






    
 
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

    private converteDigitosToNumber(digitos: Digito[], sinal: Sinal): number {
        let r = 0
        digitos.forEach(digito => {
            r = r * 10 + digito
        });
        return r * (sinal==Sinal.NEGATIVO?-1:1);
    }

    private calcular(): void {
        // this.reinicie()
        
        if (this.operando1.length === 0 || this.operando2.length === 0 || this.operacaoCorrente === undefined) {
            return; // Não pode calcular sem os dois operandos e uma operação
        }

        const valor1 = this.converteDigitosToNumber(this.operando1, this.operando1Sinal);  // Junte os dígitos e converta
        const valor2 = this.converteDigitosToNumber(this.operando2, this.operando2Sinal);  // Junte os dígitos e converta
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
            case Controle.MEMÓRIA_SOMA:
                this.memoriaMais()
                if (this.operacaoCorrente!= undefined) {
                    
                    this.memoria = this.converteDigitosToNumber(this.operando1,this.operando1Sinal)
                    this.tela.limpe()
                    this.mostreDigitos(this.operando1,this.operando1Sinal)
                 //   resultado = this.operando1
    
                }
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
                break;
                
            }
            
            this.historioControle = controle;

        switch (controle) {
            case Controle.IGUAL:
                this.igual()
                break
            case Controle.SEPARADOR_DECIMAL:
                
              if (this.operacaoCorrente === undefined) {
                 if(this.operando1.posicaoSeparadorDecimal===0)
                     this.operando1.posicaoSeparadorDecimal = this.operando1.digitos.length
 
                //this.operando1.definaSeparadorDecimalAgora(); ta no do profess
              } else {
                 if(this.operando2.posicaoSeparadorDecimal===0)
                     this.operando2.posicaoSeparadorDecimal = this.operando2.digitos.length
                 
                //this.operando2.definaSeparadorDecimalAgora(); ta no do professor
              }
              break;
        }

   //não sei se ta certo pq não consigo testar

        percentue(): void {
            if (this.operando1.length === 0 || this.operacaoCorrente === undefined) {
                return; 
            }
        
            let numero1: number = this.converteDigitosToNumber(this.operando1, this.operando1Sinal);
            let numero2: number = this.converteDigitosToNumber(this.operando2, this.operando2Sinal);
        
            let resultado = (numero1 * numero2) / 100;
        
            this.operando2 = this.converteNumberToDigitos(resultado); 
            this.mostreDigitos(this.operando2, this.operando2Sinal); 
            this.recebaControle(Controle.IGUAL); 
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
    
    private memoriaMais(): void {
        this.recebaControle(Controle.IGUAL)
        const valorAtual = this.converteDigitosToNumber(this.operando1, this.operando1Sinal);
        this.memoria += valorAtual;
        console.log('M+')
    }

    private memoriaMenos(): void {
        this.recebaControle(Controle.IGUAL)
        const valorAtual = this.converteDigitosToNumber(this.operando1, this.operando1Sinal);
        this.memoria -= valorAtual;
        console.log("M-")
    }

    private memoriaLeitura(): void {
        if (this.operacaoCorrente === undefined) {
            this.operando1 = this.converteNumberToDigitos(this.memoria);
            this.operando1Sinal = this.memoria>=0?Sinal.POSITIVO:Sinal.NEGATIVO;
            this.mostreDigitos(this.operando1, this.operando1Sinal)
        } else {
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



// console.log(Digito)
// console.log(Controle)
// console.log(TelaA4)
// console.log(Digito.QUATRO)
// console.log(Operação.SOMA)
// console.log(Digito.DOIS)

