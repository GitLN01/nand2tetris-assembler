/* Funkcija koja vrsi ucitavanje fajl nakon izbora fajla u dugmetu. 
*  Kada je fajl izabran, vrsi se ucitavanje rezultata i dodavanje u levo polje gde se ucitava originalni kod.
*/
function onLoadFile() {
    var content = document.getElementById("beforeAssembling");
    var [file] = document.querySelector('input[type=file]').files;
    var reader = new FileReader();

    reader.onload = function (progressEvent) {
        console.log(reader.result);
        content.value = reader.result;
    };

    if (file) {
        reader.readAsText(file);
    }
}

/* Funkcija koja vrsi ucitavanje lokalnih predefinisanih fajlova: Add.asm, Max.asm, Rect.asm i Pong.asm
*  Ovo ucitavanje se vrsi upotrebom Ajax-a, kako bi se izbegao problem prilikom ucitavanja lokalnih fajlova.
*  U HTML kodu se poziva funkcija kojoj se prosledjuje naziv lokalnog fajla, koji se u ovoj funkciji ucitava.
*/
function loadLocalFile(file) {
    var content = document.getElementById("beforeAssembling");
    var txt = '';
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function(){
        if(xmlhttp.status == 200 && xmlhttp.readyState == 4) {
            txt = xmlhttp.responseText;
            content.value = txt;
        }
    };

    xmlhttp.open("GET","predefinedPrograms/" + file,true);
    xmlhttp.send();

}
