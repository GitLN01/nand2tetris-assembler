class Parser {
    
    constructor(assemblyCode, code) {
        this.lines = assemblyCode.split('\n');
        this.instructionPosition = 0;
        this.labelName = '';
        this.error = false;
        this.code = code;
    }

    // Funkcija koja vrsi osnovno proveravanje tipa instrukcije, iz koje se dalje prosledjuju u posebne funkcije u kojima se vrsi detaljana provera da li je tip instrukcije validan.
    parseInstructions(line) {
            this.error = false;

            if(line[0] == '@') {
                this.parseA(line);
                this.instructionPosition++;
            }
            else if(line[0] == '(') {
                this.parseLabel(line);
            }
            else if(line[0]=='D' || line[0]=='M' || line[0]=='A' || line[0]=='0' || line[0]=='=' || line[0]=='1' || (line[0]=='-' && line[1]=='1')) {
                this.parseC(line);
            }
            else {
                this.error = true;
            }
    }

    // Funkcija u kojoj se proverava da li je A instrukcija tacno napisana.
    parseA(line) {
        let checkA = line.substr(1);
        let symbols =  /[ `!#%^&*+\=\[\]{};':"\\|,<>\/?~]/;
        if($.isNumeric(checkA) && (parseInt(checkA) < 0 || parseInt(checkA) > 32767)) {
            this.error = true;
        }
        else if(line.length == 1 || line.match(symbols)){
            this.error = true;
        }
        this.commandType = 'A';
    }

    /* Funkcija u kojoj se proverava da li je C instrukcija tacno napisana. 
    *  Deli se na dve metode, kada instrukcija poseduje i kada instrukcija ne poseduje skok.
    */
    parseC(line) {
        this.dest = this.comp = this.jmp = '';

        if(this.includesJump(line)) {
            this.parseWithJump(line);
            return;
        }

        this.parseWithoutJump(line);
    }

    /* Funkcija koja vrsi parsiranje instrukcije C tipa koja poseduje skok.
    *  Ukoliko je deo skoka validan, prelazi se na dalje parsiranje dest i comp delova,
    *  dok ce se vratiti greska ukoliko jump nije validan.
    */
    parseWithJump(_line) {
        let instructionParts = String(_line).split(';');
        let compAndDest = instructionParts[0];
        let jumpPart = instructionParts[1];

        if(!this.isJumpValid(jumpPart)) {
            this.error = true;
            return;
        }

        this.jmp = jumpPart;

        this.parseDestAndComp(compAndDest);
    }

    // Ukoliko nema skok, poziva se funkcija u kojoj se parsiraju druga dva dela, comp i dest.
    parseWithoutJump(_line) {
        this.parseDestAndComp(_line);
    }

    /* Funkcija u kojoj se vrsi parsiranje C tipa instrukcije sa dest i comp delovima.
    *  Za pocetak se vrsi podela dest i comp delova, nakon cega se proverava da li su vrednosti validne i prisutne u tabeli code.
    *  Ukoliko su vrednosti validne, vratice tip instrukciju C, kao i postaviti vrednosti za comp ukoliko nema dest deo, ili i komp i dest deo ukoliko ispunjavaju prvi uslov.
    */
    parseDestAndComp(_line) {
        if(_line.includes('=')) {
            let compAndDestParts = String(_line).split('=');
            this.dest = compAndDestParts[0];
            this.comp = compAndDestParts[1];

            if(!this.isCompValid(this.comp) || !this.isDestValid(this.dest)) {
                this.error = true;
                return;
            }

            this.commandType = 'C';
            return;
        }

        if(!this.isCompValid(_line)) {
            this.error = true;
            return;
        }

        this.comp = _line;

        this.commandType = 'C';
    }

    // Provera da li jump vrednost postoji u tabeli code.
    isJumpValid(_jumpPart) {
        let jumpPart = String(_jumpPart).toUpperCase();
        if(this.code.jump(jumpPart) === false)
            return false;
        else
            return true;
    }

    // Provera da li comp vrednost postoji u tabeli code.
    isCompValid(_compPart) {
        let compPart = String(_compPart).toUpperCase();
        if(this.code.comp(compPart) === false)
            return false;
        else
            return true;
    }

    // Provera da li dest vrednost postoji u tabeli code.
    isDestValid(_destPart) {
        let destPart = String(_destPart).toUpperCase();
        if(this.code.dest(destPart) === false)
            return false;
        else
            return true;
    }

    // Provera da li instrukcija sadrzi skok, tako sto se proverava da li sadrzi znak ;.
    includesJump(_line) {
        if(_line.includes(';')) {
            return true;
        } else {
            return false;
        }
    }

    // Funkcija koja vrsi parsiranje labele, gde se proverava da li su karakteri u labeli validni, kao i gde se proverava da li je zadnji karakter ).
    parseLabel(_line) {
        let symbols =  '^[a-zA-Z_.$:][a-zA-Z0-9_.$:]*$';
        if(!(_line[_line.length-1] === ')')) {     
            this.error = true;
            return;
        }

        let content = _line.slice(1, -1);
        if(!content.match(symbols)) {
            this.error = true;
            return;
        }

        this.labelName = content;

        this.commandType = 'Label';
    }

    is_numeric(str) {
        return /^\d+$/.test(str);
    }

    getInstructionType() {
        if(this.error) {
            this.commandType = 'ERROR';
            return this.commandType;
        }
        return this.commandType;
    }

    getComp() {
        return this.comp;
    }

    getDest() {
        return this.dest;
    }

    getJump() {
        return this.jmp;
    }

    getLabelName() {
        return this.labelName;
    }
}