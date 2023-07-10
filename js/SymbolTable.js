class SymbolTable {

    constructor(){
        this.symbolTable=[
          {name:"SP", value:"0000000000000000"},
          {name:"LCL", value:"0000000000000001"},
          {name:"ARG", value:"0000000000000010"},
          {name:"THIS", value:"0000000000000011"},
          {name:"THAT", value:"0000000000000100"},
          {name:"R0", value:"0000000000000000"},
          {name:"R1", value:"0000000000000001"},
          {name:"R2", value:"0000000000000010"},
          {name:"R3", value:"0000000000000011"},
          {name:"R4", value:"0000000000000100"},
          {name:"R5", value:"0000000000000101"},
          {name:"R6", value:"0000000000000110"},
          {name:"R7", value:"0000000000000111"},
          {name:"R8", value:"0000000000001000"},
          {name:"R9", value:"0000000000001001"},
          {name:"R10", value:"0000000000001010"},
          {name:"R11", value:"0000000000001011"},
          {name:"R12", value:"0000000000001100"},
          {name:"R13", value:"0000000000001101"},
          {name:"R14", value:"0000000000001110"},
          {name:"R15", value:"0000000000001111"},
          {name:"SCREEN", value:"0100000000000000"},
          {name:"KBD", value:"0110000000000000"}
          ];
    }

    // Funkcija koja dodaje simbol u tabelu simbola (promenljiva ili labela)
    addSymbol(symbol, address) {
        this.symbolTable.push({name:symbol, value: address});
    }

    // Funkcija koja proverava da li postoji promenljiva ili labela u tabeli simbola.
    contains(symbol) {
        let length = this.symbolTable.length;

        for(let i = 0; i < length; i++) {
            if(this.symbolTable[i].name === symbol)
                return true;
        }

        return false;
    }

    // Funkcija koja vraca vrednost promenljive ili labele iz tabele simbola.
    getAddress(symbol) {
        let length = this.symbolTable.length;

        for(let i = 0; i < length; i++) {
            if(this.symbolTable[i].name === symbol)
                return this.symbolTable[i].value;
        }
    }

    resetTable() {
        this.symbolTable=[
            {name:"SP", value:"0000000000000000"},
            {name:"LCL", value:"0000000000000001"},
            {name:"ARG", value:"0000000000000010"},
            {name:"THIS", value:"0000000000000011"},
            {name:"THAT", value:"0000000000000100"},
            {name:"R0", value:"0000000000000000"},
            {name:"R1", value:"0000000000000001"},
            {name:"R2", value:"0000000000000010"},
            {name:"R3", value:"0000000000000011"},
            {name:"R4", value:"0000000000000100"},
            {name:"R5", value:"0000000000000101"},
            {name:"R6", value:"0000000000000110"},
            {name:"R7", value:"0000000000000111"},
            {name:"R8", value:"0000000000001000"},
            {name:"R9", value:"0000000000001001"},
            {name:"R10", value:"0000000000001010"},
            {name:"R11", value:"0000000000001011"},
            {name:"R12", value:"0000000000001100"},
            {name:"R13", value:"0000000000001101"},
            {name:"R14", value:"0000000000001110"},
            {name:"R15", value:"0000000000001111"},
            {name:"SCREEN", value:"0100000000000000"},
            {name:"KBD", value:"0110000000000000"}
            ];
    }

}