class Code {

    constructor() {
        this.destTable = [
            {name:"M", value:"001"},
            {name:"D", value:"010"},
            {name:"MD", value:"011"},
            {name:"A", value:"100"},
            {name:"AM", value:"101"},
            {name:"AD", value:"110"},
            {name:"AMD", value:"111"}];
      
        this.compTable = [
            {name:"0", value:"0101010"},
            {name:"1", value:"0111111"},
            {name:"-1", value:"0111010"},
            {name:"D", value:"0001100"},
            {name:"A", value:"0110000"},
            {name:"!D", value:"0001101"},
            {name:"!A", value:"0110001"},
            {name:"-D", value:"0001111"},
            {name:"-A", value:"0110011"},
            {name:"D+1", value:"0011111"},
            {name:"A+1", value:"0110111"},
            {name:"D-1", value:"0001110"},
            {name:"A-1", value:"0110010"},
            {name:"D+A", value:"0000010"},
            {name:"D-A", value:"0010011"},
            {name:"A-D", value:"0000111"},
            {name:"D&A", value:"0000000"},
            {name:"D|A", value:"0010101"},
            {name:"M", value:"1110000"},
            {name:"!M", value:"1110001"},
            {name:"-M", value:"1110011"},
            {name:"M+1", value:"1110111"},
            {name:"M-1", value:"1110010"},
            {name:"D+M", value:"1000010"},
            {name:"D-M", value:"1010011"},
            {name:"M-D", value:"1000111"},
            {name:"D&M", value:"1000000"},
            {name:"D|M", value:"1010101"}];
      
        this.jumpTable = [
            {name:"JGT", value:"001"},
            {name:"JEQ", value:"010"},
            {name:"JGE", value:"011"},
            {name:"JLT", value:"100"},
            {name:"JNE", value:"101"},
            {name:"JLE", value:"110"},
            {name:"JMP", value:"111"}];
    }

  // Funkcija koja ce vratiti dest deo ukoliko postoji u tabeli, dok ce vratiti false ukoliko vrednost ne postoji u tabeli.
  dest(mnemonic){
    if(this.destTable.find(x => x.name === mnemonic)){
      return this.destTable.find(x => x.name === mnemonic).value;
    }
    else{
      return false;
    }

  }

  // Kao i za dest, samo sto se proverava i vraca vrednost za comp deo.
  comp(mnemonic){
      if(this.compTable.find(x => x.name == mnemonic)){
        return this.compTable.find(x => x.name == mnemonic).value;
      }
      else{
        return false;
      }

  }

  // Takodje, kao i u prethodne dve funkcije, vraca vrednost jump dela ukoliko postoji u tabeli.
  jump(mnemonic){
    if(this.jumpTable.find(x => x.name === mnemonic)){
      return this.jumpTable.find(x => x.name === mnemonic).value;
    }
    else{
      return false;
    }
  }
}