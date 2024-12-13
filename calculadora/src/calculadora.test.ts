import { Controle, Digito, Operação, Sinal } from "./calculadora"
import CpuA4 from "./cpuA4"
import TelaX0Teste from "./telaX0Teste"


describe("Testando a calculadora", () => {
  let tela: TelaX0Teste = new TelaX0Teste()
  let cpu: CpuA4 = new CpuA4(tela)

  beforeEach(() => {
    cpu.reinicie()
  })



  test("testar 123+456", () => {
    // console.log("= Testando 123 + 456 ===========================");
    [Digito.UM, Digito.DOIS, Digito.TRÊS].forEach((element) => {
      cpu.recebaDigito(element);
    });
    cpu.recebaOperacao(Operação.SOMA);
    [Digito.QUATRO, Digito.CINCO, Digito.SEIS].forEach((element) => {
      cpu.recebaDigito(element);
    });
    cpu.recebaControle(Controle.IGUAL);
    expect(tela.digitos).toBe("579")
    expect(tela.sinal).toBe(Sinal.POSITIVO)
    expect(tela.memoria).toBeFalsy()
    expect(tela.error).toBeFalsy()
    // console.log("= Testando 123 + 456 ===========================");
    //  .assert("579", Sinal.POSITIVO, false, false);
    
  })
  
  // TESTE GI
  test("testar 12+34+56", () => {
    console.log("= Testando 12 + 34 + 56 ===========================");
    [Digito.UM, Digito.DOIS].forEach((element) => {
      cpu.recebaDigito(element);  
    });
    cpu.recebaOperacao(Operação.SOMA);
    [Digito.TRÊS, Digito.QUATRO].forEach((element) => {
      cpu.recebaDigito(element);  
    });
    cpu.recebaOperacao(Operação.SOMA);  
    [Digito.CINCO, Digito.SEIS].forEach((element) => {
      cpu.recebaDigito(element);  
    });
    cpu.recebaControle(Controle.IGUAL);  
    expect(tela.digitos).toBe("102");  
    expect(tela.sinal).toBe(Sinal.POSITIVO);  
  })
  


  test("testar 12/10", () => {
    console.log("= Testando 12 / 10  ===========================");
    [Digito.UM, Digito.DOIS].forEach((element) => {
      cpu.recebaDigito(element);  
    });
    cpu.recebaOperacao(Operação.DIVISÃO); 
    [Digito.UM, Digito.ZERO].forEach((element) => {
      cpu.recebaDigito(element);  
    });
    cpu.recebaControle(Controle.IGUAL);  
    expect(tela.digitos).toBe("1.2"); 
    expect(tela.sinal).toBe(Sinal.POSITIVO); 
    expect(tela.memoria).toBeFalsy();
    expect(tela.error).toBeFalsy();  
  })
  

  test("testar 1.52", () => {
    console.log("Teste Números Decimais");
    cpu.recebaDigito(Digito.UM);  
    cpu.recebaControle(Controle.SEPARADOR_DECIMAL);  
    cpu.recebaDigito(Digito.CINCO);   
    cpu.recebaDigito(Digito.DOIS);  
    expect(tela.digitos).toBe("1.52");  
    expect(tela.sinal).toBe(Sinal.POSITIVO);  
    expect(tela.memoria).toBeFalsy();  
    expect(tela.error).toBeFalsy();  
  })
  

  test("testar 3 - 5 ", () => {
    console.log("Teste de Números Negativos");
    cpu.recebaDigito(Digito.TRÊS);   
    cpu.recebaOperacao(Operação.SUBTRAÇÃO);  
    cpu.recebaDigito(Digito.CINCO);  
    cpu.recebaControle(Controle.IGUAL);  
    expect(tela.digitos).toBe("2");  
    expect(tela.sinal).toBe(Sinal.NEGATIVO);
    expect(tela.memoria).toBeFalsy();  
    expect(tela.error).toBeFalsy();  
  })
  
  test("teste RAIZ3", ()=>{
     console.log("testando raiz");
     [Digito.NOVE].forEach((element) => {
       cpu.recebaDigito(element);
     });
     cpu.recebaOperacao(Operação.RAIZ_QUADRADA);
     cpu.recebaControle(Controle.IGUAL);
     console.log("passou")
     expect(tela.digitos).toBe("3");  
     expect(tela.sinal).toBe(Sinal.POSITIVO);
     expect(tela.memoria).toBeFalsy();  
     expect(tela.error).toBeFalsy();  

  })

  test("testar 2.3 - 2 ", () => {
    // console.log("=TESTE 2.3 - 1=======");
    // [Digito.DOIS, Controle.SEPARADOR_DECIMAL ,Digito.TRÊS].forEach((element) => {
      // cpu.recebaDigito(element);
  // });
    cpu.recebaDigito(Digito.DOIS)
    cpu.recebaControle(Controle.SEPARADOR_DECIMAL)
    cpu.recebaDigito(Digito.TRÊS)
    cpu.recebaOperacao(Operação.SUBTRAÇÃO)
    cpu.recebaDigito(Digito.DOIS)
    // cpu.recebaControle(Controle.SEPARADOR_DECIMAL)
    // cpu.recebaDigito(Digito.ZERO)
    // [Digito.OITO].forEach((element) => {
      // cpu.recebaDigito(element);
  // })
    cpu.recebaControle(Controle.IGUAL); 
    expect(tela.digitos).toBe("0.3")
    expect(tela.sinal).toBe(Sinal.POSITIVO)
    expect(tela.memoria).toBeFalsy()
    expect(tela.error).toBeFalsy()
})




/// TESTE FERNANDA
//1
  test("testar 4+6-2", () => {
    console.log("=TESTE 4 + 6 - 2=======");
    [Digito.QUATRO].forEach((element) => {
      cpu.recebaDigito(element);
    });
    cpu.recebaOperacao(Operação.SOMA);
    [Digito.SEIS].forEach((element) => {
      cpu.recebaDigito(element);
    });
    cpu.recebaOperacao(Operação.SUBTRAÇÃO);
    [Digito.DOIS].forEach((element) => {
      cpu.recebaDigito(element);
    });
    cpu.recebaControle(Controle.IGUAL);
    expect(tela.digitos).toBe("8")
    expect(tela.sinal).toBe(Sinal.POSITIVO)
    expect(tela.memoria).toBeFalsy()
    expect(tela.error).toBeFalsy()
})

//2
  test("testar 5x9", () => {
    console.log("=TESTE 5x9=======");
    [Digito.CINCO].forEach((element) => {
      cpu.recebaDigito(element);
  });
    cpu.recebaOperacao(Operação.MULTIPLICAÇÃO);
    [Digito.NOVE].forEach((element) => {
      cpu.recebaDigito(element);
  });
   
    cpu.recebaControle(Controle.IGUAL);
    expect(tela.digitos).toBe("45")
    expect(tela.sinal).toBe(Sinal.POSITIVO)
    expect(tela.memoria).toBeFalsy()
    expect(tela.error).toBeFalsy()

})

//3
  test("testar 2.3 - 2 ", () => {
    // console.log("=TESTE 2.3 - 1=======");
    // [Digito.DOIS, Controle.SEPARADOR_DECIMAL ,Digito.TRÊS].forEach((element) => {
      // cpu.recebaDigito(element);
  // });
    cpu.recebaDigito(Digito.DOIS)
    cpu.recebaControle(Controle.SEPARADOR_DECIMAL)
    cpu.recebaDigito(Digito.TRÊS)
    cpu.recebaOperacao(Operação.SUBTRAÇÃO)
    cpu.recebaDigito(Digito.UM)
    // cpu.recebaControle(Controle.SEPARADOR_DECIMAL)
    // cpu.recebaDigito(Digito.ZERO)
    // [Digito.OITO].forEach((element) => {
      // cpu.recebaDigito(element);
  // })
    cpu.recebaControle(Controle.IGUAL);
    expect(tela.digitos).toBe("1.3")
    expect(tela.sinal).toBe(Sinal.POSITIVO)
    expect(tela.memoria).toBeFalsy()
    expect(tela.error).toBeFalsy()
})

//4
  test("testar 7/4", () => {
    console.log("=TESTE 7/4=======");
    [Digito.SETE].forEach((element) => {
      cpu.recebaDigito(element);
  });
    cpu.recebaOperacao(Operação.DIVISÃO);
    [Digito.QUATRO].forEach((element) => {
      cpu.recebaDigito(element);
  })
    cpu.recebaControle(Controle.IGUAL);
    expect(tela.digitos).toBe("1.75")
    expect(tela.sinal).toBe(Sinal.POSITIVO)
    expect(tela.memoria).toBeFalsy()
    expect(tela.error).toBeFalsy()
})

//5
  test("testar 5 - 9 + 1", () => {
    console.log("=TESTE 9-1=======");
    [Digito.CINCO].forEach((element) => {
      cpu.recebaDigito(element);
  });
    cpu.recebaOperacao(Operação.SUBTRAÇÃO);
    [Digito.NOVE].forEach((element) => {
      cpu.recebaDigito(element);
  })
    cpu.recebaOperacao(Operação.SOMA);
    [Digito.UM].forEach((element) => {
      cpu.recebaDigito(element);
    })
    cpu.recebaControle(Controle.IGUAL);
    expect(tela.digitos).toBe("3")
    expect(tela.sinal).toBe(Sinal.NEGATIVO)
    expect(tela.memoria).toBeFalsy()
    expect(tela.error).toBeFalsy()
  })
  
  //6
  test("teste 6/0", ()=>{
    [Digito.SEIS].forEach((element) => {
      cpu.recebaDigito(element);
    });
    cpu.recebaOperacao(Operação.DIVISÃO);
    [Digito.ZERO].forEach((element) => {
      cpu.recebaDigito(element);
    })
    cpu.recebaControle(Controle.IGUAL);
    expect(tela.digitos).toBe("0")
    expect(tela.sinal).toBeFalsy()
    expect(tela.memoria).toBeFalsy()
    expect(tela.error).toBeFalsy()
  })





/// TESTE BEATRIZ 
//1
  test("teste M+ caso a", () => {
    console.log("TESTE 1,2,3,M+,+,1,=    m=123 e resultado=124");
    [Digito.UM, Digito.DOIS, Digito.TRÊS].forEach((element) => {
      cpu.recebaDigito(element);
  });
    cpu.recebaControle(Controle.MEMÓRIA_SOMA)
    cpu.recebaOperacao(Operação.SOMA);
    [Digito.UM].forEach((element) => {
      cpu.recebaDigito(element);
  });
    cpu.recebaControle(Controle.IGUAL);
    expect(tela.digitos).toBe("124")
    expect(tela.sinal).toBe(Sinal.POSITIVO)
    expect(tela.error).toBeFalsy()

})

//2
test("teste M+ caso b", () => {
  console.log(" TESTE 1,2,3,M+,1,=   m=123 e resultado=1");
  [Digito.UM, Digito.DOIS, Digito.TRÊS].forEach((element) => {
      cpu.recebaDigito(element);
    });
    cpu.recebaControle(Controle.MEMÓRIA_SOMA);
    [Digito.UM].forEach((element) =>{
      cpu.recebaDigito(element)
    });
    
    cpu.recebaControle(Controle.IGUAL);
    expect(tela.digitos).toBe("1")
    expect(tela.sinal).toBe(Sinal.POSITIVO)
    expect(tela.error).toBeFalsy()
  })
  
  //3
  test("teste M+ caso c", () => {
    console.log("Teste M+ caso c");
    [Digito.UM, Digito.DOIS, Digito.TRÊS].forEach((element) => {
      cpu.recebaDigito(element);
    });
    cpu.recebaControle(Controle.MEMÓRIA_SOMA);
    [Digito.UM].forEach((element) =>{
      cpu.recebaDigito(element);
    });

    cpu.recebaOperacao(Operação.SOMA);
    [Digito.UM].forEach((element) => {
      cpu.recebaDigito(element);
    });
    cpu.recebaControle(Controle.IGUAL);
    expect(tela.digitos).toBe("2")
  })




  //4
  test("teste MRC caso a ", () =>{
    console.log("teste MRC");
    [Digito.UM, Digito.DOIS, Digito.TRÊS].forEach((element) => {
       cpu.recebaDigito(element);
    });
     cpu.recebaControle(Controle.MEMÓRIA_SOMA);
     cpu.recebaOperacao(Operação.SOMA);
    [Digito.UM].forEach((element) => {
       cpu.recebaDigito(element);
    });
     cpu.recebaControle(Controle.MEMÓRIA_LEITURA_LIMPEZA);
     cpu.recebaControle(Controle.IGUAL);
  })

  //5
  test("teste MRC caso b ", () =>{
    console.log("teste MRC");
    [Digito.UM, Digito.DOIS, Digito.TRÊS].forEach((element) => {
       cpu.recebaDigito(element);
    });
     cpu.recebaControle(Controle.MEMÓRIA_SOMA);
     cpu.recebaOperacao(Operação.SOMA);
    [Digito.UM].forEach((element) => {
       cpu.recebaDigito(element);
    });
     cpu.recebaControle(Controle.MEMÓRIA_LEITURA_LIMPEZA);
     [Digito.UM].forEach((element) =>{
      cpu.recebaDigito(element)
    });
     
     cpu.recebaControle(Controle.IGUAL);
  })

  //6
  test("Teste MRC caso c", () =>{
    console.log("1,2,3,M+,+,1,MRC,MRC,=  m=0 e resultado=246");
    [Digito.UM, Digito.DOIS, Digito.TRÊS].forEach((element) => {
      cpu.recebaDigito(element);
    });
    cpu.recebaControle(Controle.MEMÓRIA_SOMA);
    cpu.recebaOperacao(Operação.SOMA);
    [Digito.UM].forEach((element) => {
      cpu.recebaDigito(element);
    });
    cpu.recebaControle(Controle.MEMÓRIA_LEITURA_LIMPEZA)
    cpu.recebaControle(Controle.MEMÓRIA_LEITURA_LIMPEZA)
    cpu.recebaControle(Controle.IGUAL)

    expect(tela.digitos).toBe("246")
    expect(tela.sinal).toBe(Sinal.POSITIVO)
    expect(tela.error).toBeFalsy()
    
  })


  //7
  test("Teste M- caso que fiz", () =>{
    console.log("TESTE 1,2,3,M+,-,1,=   m=123 e resultado=122");
    [Digito.UM, Digito.DOIS, Digito.TRÊS].forEach((element) => {
      cpu.recebaDigito(element);
    });
     cpu.recebaControle(Controle.MEMÓRIA_SOMA);
     cpu.recebaOperacao(Operação.SUBTRAÇÃO);
    [Digito.UM].forEach((element) => {
      cpu.recebaDigito(element);
    });
     cpu.recebaControle(Controle.IGUAL);
     expect(tela.digitos).toBe("122")
     expect(tela.sinal).toBe(Sinal.POSITIVO)
     expect(tela.error).toBeFalsy()
  })

  
})
