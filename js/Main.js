let assemblyCode;
let machineCode = '';
let code = new Code();
let symbols = new SymbolTable();
let newText = '';


// Funckija koja se poziva klikom na dugme 'Prevedi', gde pocinje izvrsavanje celog programa
function OnTranslate() {

    // Dostupna RAM adresa od koje se dalje dodaju sve promenljive, cijim se dodavanjem na ovu adresu vrsi povecanje adrese za 1. (pocetna vrednost je 16, sve nakon toga su za 1 vece)
    this.nextAvailableAddress = 16;

    document.getElementById("afterAssembling").value = '';
    document.getElementById("errorSection").value = '';
    // Ucitavanje vrednosti iz levog polja TextArea, gde se zatim uklanjaju komentari i prazna polja.
    assemblyCode = document.getElementById("beforeAssembling").value;
    assemblyCode = removeComments();
    assemblyCode = removeBlanks();

    // Poziv resetTable predstavlja fazu inicijalizacije, odnosno ponovno osvezavanje tabele simbola.
    symbols.resetTable();

    let parser = new Parser(assemblyCode, code);
    this.lines = assemblyCode.split('\n');

    // U funkciji addLabelsToSymbolTable se vrsi prva faza prevodjenja, u kojoj se dodaju labele u tabelu simbola.
    
    addLabelsToSymbolTable(parser);

    /* Ova petlja predstavlja drugu fazu prevodjenja i u ovom delu se vrsi generisanje koda.
    *  Za pocetak se vrsi izvlacenje linije nad kojom se vrsi prevodjenje, gde se nakon toga upotrebom parsera pronalazi koji je tip instrukcije.
    *  Ovo se obavlja u funkciji parseInstructions, kojoj se prosledjuje linija koja se odredjuje.
    *  Ova funkcija ce odrediti tip instrukcije, koji se dalje moze dobiti upotrebom funkcije getInstructionType().
    *  Ukoliko je ova vrednost C, A ili Label, instrukcija nema gresku, dok ukoliko se vrati Error, instrukcija ima gresku i izvrsava se else deo.
    */
    let brojac = 1;
    for(let i = 0; i < this.lines.length; i++) {
        machineCode = '';
        let line = lines[i];
        line = line.trim();
        parser.parseInstructions(line);
        if(parser.getInstructionType() === 'C')
            writeC(parser);
        else if(parser.getInstructionType() === 'A') {
            writeA(line);
        }
        else if(parser.getInstructionType() === 'Label') {
             continue;
        }
        else {
            machineCode = "Greska \n";
            errorSection(line, brojac);
        }
        document.getElementById("afterAssembling").value += machineCode;
        brojac++;
    }

}

// Prva faza prolaska kroz kod, gde se dodaje labela u tabelu simbola, zajedno sa brojem linije na kojoj je ta tabela pronadjena.
function addLabelsToSymbolTable(parser) {

    for(let i = 0; i < this.lines.length; i++) {
        let line = this.lines[i];
        parser.parseInstructions(line);
        if(parser.getInstructionType() == 'Label') {
            writeLabel(parser, i);
        }
    }

}

// Funkcija koja se poziva klikom na dugme ukloni fajl, gde se vrsi brisanje levog i desnog polja za unos (TextArea), kao i ucitani fajl u dugmetu za pretragu.
function OnUkloniFile() {
    document.getElementById("beforeAssembling").value = '';
    document.getElementById("afterAssembling").value = '';
    document.getElementById("errorSection").value = '';
    document.getElementById("fileUploadButton").value = '';
}

// Funkcija za uklanjanje komentara iz originalnog koda.
function removeComments(){
    return assemblyCode.replace(/\/\*[\s\S]*?\*\/|\/\/.*/g,'').trim();
}

// Funkcija za uklanjanje praznih polja i redova iz originalnog koda.
function removeBlanks() {
    return assemblyCode.replace(/^\s*\n/gm, '');
}

/* Funkcija koja se poziva kada se odredi da je instrukcija tipa C.
*  Za pocetak se iz parsera dobijaju tri dela instrukcije, dest, comp i jump deo.
*  Nakon cega se ovi delovi prosledjuju klasi code, iz koje dobijaju vrednosti ukoliko oni postoje u predefinisanoj tabeli.
*  Ukoliko ove vrednosti ne postoje u tabeli, vrednosti se postavljaju na 000.
*  Na samom kraju se vrsi dodavanje u machineCode, koji predstavlja prevedenu instrukciju, koja se upisuje u levom polju.
*/
function writeC(_parser) {
        this.dest = _parser.getDest();
        this.comp = _parser.getComp();
        this.jump = _parser.getJump();

        this.dest = code.dest(this.dest);
        this.comp = code.comp(this.comp);
        this.jump = code.jump(this.jump);

        if(this.comp === false)
        this.comp = '0000000';
        if(this.dest === false)
            this.dest = '000';
        if(this.jump === false)
            this.jump = '000';

        machineCode += this.jump;
        machineCode = this.comp + machineCode;
        machineCode = this.dest + machineCode;
        machineCode = '111' + machineCode;
        machineCode += '\n';
}

/* Funkcija koja vrsi prevodjenje kada je tip instrukcije A.
*  Za pocetak se dobija sadrzaj, odnosno content funkcije putem substr, gde se ignorise prvi karakter.
*  Za pocetak se proverava da li je vrednost numericka, gde se ukoliko je uslov ispunjen vrsi jednostavno prevodjenje na binarnu vrednost.
*  Ukoliko je vrednost simbolicka, prvo se proverava da li postoji vrednost u tabeli simbola, gde se uzima vrednost ukoliko postoji u tabeli,
*  a ukoliko vrednost ne postoji, dodaje se nova simbolicka promenljiva u tabelu simbola.
*/
function writeA(line) {

    let content = line.substr(1);
    let address = '';

    if($.isNumeric(content)) {
        let numberPart = parseInt(line.substr(1));

        address = numberPart.toString(2);
        address = addZero(address);

        machineCode += address + '\n';
        return;
    }

    if(symbols.contains(content)) {
        address = symbols.getAddress(content);
        machineCode += address + '\n';
        return;
    }
    
    address = nextAvailableAddress.toString(2);
    address = addZero(address);

    symbols.addSymbol(content, address);

    this.nextAvailableAddress++;

    machineCode += address + '\n';
}

// Funkcija za dodavanje labela, kao i broj linije na kojoj se ona nalazi u tabelu simbola.
function writeLabel(parser, lineNumber) {

    let labelName = parser.getLabelName();

    let value = lineNumber.toString(2);
    value = addZero(value);

    symbols.addSymbol(labelName, value);
}

// Funkcija koja dopunjava vrednost adrese do 16 karaktera, tako sto dodaje 0 ispred vrednosti sve dok vrednost nije ispunjena.
function addZero(address) {
    var len = 16;
    if (address.length < len) {
        address = '0'.concat(address);
        return addZero(address)
    } else {
        return address;
    }
};

function errorSection(line, brojac)
{
    var greska = document.getElementById("errorSection");
    greska.value += "Greska u " + brojac + ". liniji koda: " + line + ". \n";
}