export enum Digito {
  ZERO = 0,
  UM = 1,
  DOIS = 2,
  TRÊS = 3,
  QUATRO = 4,
  CINCO = 5,
  SEIS = 6,
  SETE = 7,
  OITO = 8, 
  NOVE = 9,
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

export enum Sinal {
  POSITIVO,
  NEGATIVO,
}


export interface Tela {
  mostre(digito: Digito): void;
  mostreSeparadorDecimal(): void;
  mostreSinal(sinal: Sinal): void;
  mostreMemoria(): void;
  mostreErro(): void;
  limpe(): void;
}

export interface Teclado {
  digiteDigito(digito: Digito): void;
  digiteOperacao(operação: Operação): void;
  digiteControle(controle: Controle): void;

  definaCpu(cpu: Cpu): void;
  obtenhaCpu(): Cpu  | undefined;
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


