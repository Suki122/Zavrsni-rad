let flock=[];
let zidovi=[];
let slikaOvce;
let pozadina;
let travaKvadrat1;
let ograda;
let ograde=[];
let zvukOvce;
let stanje="izbornik";
let gumbIgraj;
let izbornikDiv; 
let introGlazba;
let gumbZvuk;
let zvukAktivan=false;
let slikaOn="resursi/sound_onn.png";
let slikaOff="resursi/sound_offf.png";
let sliderKoh, sliderSep, sliderAli;
let panel;
let tekstKoh, tekstSep, tekstAli;
let slikaPsa;
let zvukPsa;
let igraUpravoPokrenuta;
let pasSmjer = 1; 
let zadnjeLajanje=-3000;
let pasAnimacijaVrijeme = 0;
let trenutniLevel=1;

//osiguranje da se slike i  zvukovi ucitaju prvi
function preload(){
    slikaOvce=loadImage("resursi/sheep_walk.png");
    pozadina=loadImage("resursi/GRASS+.png");
    ograda=loadImage("resursi/fence.png");
    zvukOvce=new Audio("resursi/test1.wav"); //p5.js iz nekog razloga ne radi za zvuk pa koristimo ovaj nacin
    introGlazba=new Audio("resursi/glazba_uvod.mp3");
    introGlazba.loop=true;
    slikaPsa=loadImage("resursi/pas.png");
    zvukPsa=new Audio("resursi/dogBark.mp3");
}

function setup(){
    createCanvas(800,600);
    panel = createDiv('');
    panel.id("kontrole-panel"); 
    createLabel("Cohesion", panel);
    tekstKoh=createDiv("1.0").parent(panel);
    sliderKoh = createSlider(0, 2.0, 1.0, 0.1).parent(panel);
    
    createLabel("Separation", panel);
    tekstSep=createDiv("1.0").parent(panel);
    sliderSep=createSlider(0, 2.0, 1.2, 0.1).parent(panel);
    
    createLabel("Alignment", panel);
    tekstAli=createDiv("1.0").parent(panel);
    sliderAli=createSlider(0, 2.0, 1.0, 0.1).parent(panel);
    
    // Kreiraj HTML kontejner za izbornik
    izbornikDiv=createDiv('');
    izbornikDiv.class('izbornik-container');
    izbornikDiv.html('<h1>Sheep Scramble</h1><p>Get the sheeps!</p>');
    
    gumbIgraj=createButton("IGRAJ");
    gumbIgraj.class('play-gumb');
    gumbIgraj.parent(izbornikDiv); // Stavi gumb unutar izbornika
    gumbIgraj.mousePressed(pokreniIgru);

    gumbZvuk=createImg(slikaOff,"Zvuk");
    gumbZvuk.class("zvuk-gumb");
    gumbZvuk.parent(izbornikDiv);
    gumbZvuk.mousePressed(sound);
    
    ucitajLevel1();
}
function createLabel(tekst, roditelj) {
    let lbl = createDiv(tekst);
    lbl.parent(roditelj);
    lbl.style('font-size', '14px');
    lbl.style('margin-top', '10px');
}
function sound(){
    zvukAktivan=!zvukAktivan;
    if(zvukAktivan){
        introGlazba.currentTime=0;
        introGlazba.play();
        gumbZvuk.attribute("src",slikaOn);
    }
    else{
        introGlazba.pause();
        gumbZvuk.attribute("src",slikaOff);
    }
}

function draw() {
    crtaIgru(); 
    cursor();


    //azuriraj vrijednosti slidera
    tekstKoh.html(sliderKoh.value());
    tekstSep.html(sliderSep.value());
    tekstAli.html(sliderAli.value());
    
    if (stanje==="igra" && !igraUpravoPokrenuta) {
        izbornikDiv.hide();
        panel.show();
        if(mouseIsPressed){
            nacrtajPsa();
        }
    }
    else{
        panel.hide();
    }

    
}

function crtaIgru() {

    switch(trenutniLevel){
        case 1:
            nacrtajLevel1();
            break;
        case 2:
            nacrtajLevel2();
            break;
        case 3:
            nacrtajLevel3();
            break
    }
    
}


function pokreniIgru() {
    stanje="igra";
    
    izbornikDiv.hide(); // Sakrij izbornik kad igra krene
    //zvuk se crta i dok je stanje jednako igra, kako bismo mogli ugasiti glazbu ako je pokrenuta u menu-u
    createLabel("Music", panel);
    gumbZvuk.show();
    gumbZvuk.parent(panel);

    igraUpravoPokrenuta=true;
    setTimeout(()=>{
        igraUpravoPokrenuta=false;
    },70);
}


function nacrtajPsa() {
    let frameW = slikaPsa.width / 3; //sirina ovira jedne slicice
    let frameH = slikaPsa.height / 4 +50; //visina okvira + 50 jer prelaze jedna slika u drugu
    
    let dx = mouseX - pmouseX; //promjena pozicije misa, pmouseX je pozicija misa u prethodnome frameu, a mouseX u trenutnom
    let dy = mouseY - pmouseY;
    
    if (dy > 2) { //ako se mis pomaknu vise od 2px prema dolje
        pasSmjer = 1; // uzimamo red 1 jer se u njemu nalazi slicica psa prema dolje
    } else if (dy < -2) {
        pasSmjer = 3; // u redu 3 se nalazi slicica psa prema gore
    }
    
    let brzina = dist(0, 0, dx, dy); //euklidska udaljenost od tocke (0,0)
    if (brzina > 0.1) { //ako se mis krece
        pasAnimacijaVrijeme += 0.2; //povecaj brzinu animacije
    }
    //odreduje koja slicica (od 3) ce se prikazati, ovisi o brzini
    let stupac = floor(pasAnimacijaVrijeme) % 3;
    //podesavanje koordinatnog sustava
    push();
    translate(mouseX, mouseY); //pomakni tocku crtanja na trenutnu poziciju misa
    imageMode(CENTER); //slikas se crta iz centra umjesto gornjeg lijevog kuta 
    noCursor(); //sakrij kursor
    
    image(slikaPsa, 0, 0, 40, 40, //slika,x,y,velicina na ekranu x, velicina na ekranu y
          (stupac * frameW) + 1, (pasSmjer * frameH) + 1, //x i y pozicija izrezavanja
          frameW - 2, frameH - 2); //sirina i visina isjecka
    pop(); //vrati postavke na staro
    
    //lajanje psa je izvedeno na ovaj način zbog problema gdje bi pas jednom zalajao kada bismo pritisnuli gumb play
    if(zvukPsa.paused && mouseIsPressed && millis()-zadnjeLajanje>3000 ){ //je li zvuk pauziran, mis pritisnut i je li proslo 3 sekunde od zadnjeg lajanja
        zvukPsa.currentTime=0;
        zvukPsa.play();
    
        zadnjeLajanje=millis(); //zabiljezi zadnje lajanje
    
        }
}