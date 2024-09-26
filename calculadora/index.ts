export interface IDisplay {
    showNumber(value: number): void;
    clear(): void;
}

export default class Display implements IDisplay {
    showNumber(value: number): void {
        console.log(value);
    }

    clear(): void {

    }

}
class MinhaDisplay extends Display {
    showAlpha(value: string): void {
        console.log("[a]" + value)
    }

    // sobrescreve Display.showNumber()
    override showNumber(value: number): void {
        console.log("[n]" + value)
    }
}

//tipo inferido
const d = new Display();
d.showNumber(123.45);

var d1 = new MinhaDisplay();
d1.showNumber(123.45);

//new display é um construtor
//cria uma variavel d2 do tipo display que possui uma MinhaDisplay
//minhaDisplay é metodo enquanto display é classe(tipo)
var d2: Display = new MinhaDisplay() //tipo explicito
d2 = d1
d1 = d2 as MinhaDisplay