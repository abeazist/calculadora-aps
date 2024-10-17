export enum Digito {
  ZERO = 0,
  UM,
  DOIS,
  TRÊS,
  QUATRO,
  CINCO,
  SEIS,
  SETE,
  OITO,
  NOVE,
}

export enum Operação {
  SOMA,
  SUBTRAÇÃO,
  MULTIPLICAÇÃO,
  DIVISÃO,
  RAIZ_QUADRADA,
  PERCENTUAL,
}

export enum Controle {
  DESATIVAÇÃO,
  ATIVAÇÃO_LIMPEZA_ERRO,
  MEMÓRIA_LEITURA_LIMPEZA,
  MEMÓRIA_SOMA,
  MEMÓRIA_SUBTRAÇÃO,
  SEPARADOR_DECIMAL,
  IGUAL,
}

export interface Tela {
  mostre(digito: Digito): void;
  limpe(): void;
}

export interface Teclado {
  digiteDigito(digito: Digito): void;
  digiteOperacao(operação: Operação): void;
  digiteControle(controle: Controle): void;

  definaCpu(cpu: Cpu): void;
  obtenhaCpu(): Cpu;
}

export interface Cpu {
  recebaDigito(digito: Digito): void;
  recebaOperacao(operação: Operação): void;
  recebaControle(controle: Controle): void;
  reinicie(): void;

  definaTela(tela: Tela): void;
  obtenhaTela(): Tela;
}

export interface Calculadora {
  definaTela(tela: Tela): void;
  obtenhaTela(): Tela;

  definaCpu(cpu: Cpu): void;
  obtenhaCpu(): Cpu;

  definaTeclado(teclado: Teclado): void;
  obtenhaTeclado(): Teclado;
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
