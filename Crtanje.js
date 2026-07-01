let flock=[];
let zidovi=[];
let slikaOvceBijela;
let pozadina;
let travaKvadrat1;
let ograda;
let ograde=[];
let zvukOvceBijele;
let zvukOvceCrne;
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
let obavijestDiv;
let obavijestDivKraj;
let flag=true;
let gumbPonovno;
let gameOverDiv;
let zvukGubitak;
let gumbNext;
let levelUcitan=false; //provjera je li level ucitan, da ne javi odmah da smo izgubili
// Globalne varijable za pomicnu kameru i velicinu svijeta
let kameraX = 0;
let kameraY = 0;
let mapSirina = 2000;
let mapVisina = 1500;


//osiguranje da se slike i  zvukovi ucitaju prvi
function preload(){
    slikaOvceBijela=loadImage("resursi/sheep_walk.png");
    slikaOvceCrna=loadImage("resursi/sheep_walk_black.png");
    pozadina=loadImage("resursi/GRASS+.png");
    ograda=loadImage("resursi/fence.png");
    zvukOvceBijele=new Audio("resursi/zvukovcebijele.wav"); //p5.js iz nekog razloga ne radi za zvuk pa koristimo ovaj nacin
    zvukOvceCrne=new Audio("resursi/zvukovcecrne.mp3");
    introGlazba=new Audio("resursi/glazba_uvod.mp3");
    introGlazba.loop=true;
    slikaPsa=loadImage("resursi/pas.png");
    zvukPsa=new Audio("resursi/dogBark.mp3");
    zvukGubitak=new Audio("resursi/fail.mp3");
}

function setup(){
    let canvas = createCanvas(800,600);
    canvas.parent("canvas-kontejner");

    obavijestDiv=createDiv("");
    obavijestDiv.html("<h1>Level 1</h1><p>Easy</p><p>Get the sheep to yellow grass!</p>");
    obavijestDiv.class("obavijest-box");
    obavijestDiv.parent("canvas-kontejner");
    obavijestDiv.hide();
    

    obavijestDivKraj=createDiv("");
    obavijestDivKraj.html("<h1>Great job!</h1><p>Continue to next level!</p>");
    obavijestDivKraj.class("obavijest-box");
    obavijestDivKraj.parent("canvas-kontejner");
    gumbNext=createButton("Next Level");
    gumbNext.class("play-gumb");
    gumbNext.parent(obavijestDivKraj); 
    gumbNext.mousePressed(sljedeciLevel);
    obavijestDivKraj.hide();

    

    panel=createDiv("");
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

    createLabel("Music", panel);

    izbornikDiv=createDiv("");
    izbornikDiv.class("izbornik-container");
    izbornikDiv.html("<h1>Sheep Scramble</h1><p>Get the sheep!</p>");
    
    gumbIgraj=createButton("Play");
    gumbIgraj.class("play-gumb");
    gumbIgraj.parent(izbornikDiv); 
    gumbIgraj.mousePressed(pokreniIgru);

    gumbZvuk=createImg(slikaOff,"Zvuk");
    gumbZvuk.class("zvuk-gumb");
    gumbZvuk.parent(izbornikDiv);
    gumbZvuk.mousePressed(sound);

    //GameOver panel koji sadrži poruku i gumb za ponovni pokušaj
    gameOverDiv=createDiv("");
    gameOverDiv.class("izbornik-container");
    gameOverDiv.html("<h1>Sheep got away!</h1><p>Don't lose the sheep out of the sight</p>");
    gameOverDiv.hide();

    gumbPonovno=createButton("Try Again");
    gumbPonovno.class("play-gumb");
    gumbPonovno.parent(gameOverDiv); 
    gumbPonovno.mousePressed(pokreniIgru);
    
    
    ucitajLevel1();
}
function sljedeciLevel(){
        obavijestDivKraj.hide();
        levelZavrsen=false;
        levelUcitan=false; //postavi da level nije ucitan
        if(trenutniLevel<2){
            trenutniLevel++;
        }
        if(trenutniLevel==2){
            ucitajLevel2();
        }
        else{
            console.log("kraj");
        }
        
    }
function createLabel(tekst, roditelj) {
    let lbl=createDiv(tekst);
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
    // Racunanje kamere prema prosjecnom centru boida
    if (flock.length > 0) {
        let centarStada=createVector(0, 0);
        for (let boid of flock) {
            centarStada.add(boid.pozicija);
            //ako je pozicija ovce van kamere,level je ucitan, onda igra daje obavijest i igrac moze pokusati ponovno
            if (stanje==="igra" && levelUcitan==true && (boid.pozicija.x<kameraX || boid.pozicija.x > kameraX + width || boid.pozicija.y < kameraY || boid.pozicija.y > kameraY + height)) {
                zvukGubitak.currentTime=0;
                zvukGubitak.play();
                stanje="gameOver";
                gameOverDiv.show();
            }
        }
        centarStada.div(flock.length);
        
        let ciljX=centarStada.x-width / 2; //cilj do kojeg kamera zeli doci
        let ciljY=centarStada.y-height / 2;
        //lerp->linear interpolation, omogucuje da kamera prijede 5% do cilja u svakom frameu (omogucuje sporije kretanje kamere)
        kameraX=lerp(kameraX, constrain(ciljX, 0, mapSirina-width), 0.05); //constraint sprjecava kameru da izade van granica mape
        kameraY=lerp(kameraY, constrain(ciljY, 0, mapVisina-height), 0.05);
    }
    krajLevel(ciljX1,ciljY1,ciljSirina1,ciljVisina1);
    crtaIgru(); 
    cursor();


    //azuriraj vrijednosti slidera
    tekstKoh.html(sliderKoh.value());
    tekstSep.html(sliderSep.value());
    tekstAli.html(sliderAli.value());
    
    if (stanje==="igra" && !igraUpravoPokrenuta) {
        izbornikDiv.hide();
        panel.show();
        gumbZvuk.parent(panel); //gumb se prebacuje u panel, a labela se vec tamo  nalazi
        gumbZvuk.show();
        
        if(mouseIsPressed){
            nacrtajPsa();
        }
    }
    else{
        panel.hide();
    }

    
}

function crtaIgru() {
    push(); //sprema trenutne postavke kooridinatnog sustava
    //translate sluzi za stvaranje osjecaja da se mice kamera, a pomice se svijet
    translate(-kameraX, -kameraY); //ako se kamera pomakne npr. desno, svijet se pomakne lijevo za isto
    switch(trenutniLevel){
        case 1:
            nacrtajLevel1();
            break;
        case 2:
            nacrtajLevel2();
            break;
    }
    pop(); //vraca koordinatni sustav na sta je bio prije
}


function pokreniIgru() {
    stanje="igra";

    if (gameOverDiv) {
        gameOverDiv.hide();
    }

    // Ponovno učitaj level 1 da resetiramo ovce i ograde na početne pozicije
    ucitajLevel1();

    // Resetiraj poziciju kamere
    kameraX=0;
    kameraY=0;

    izbornikDiv.hide(); // Sakrij izbornik kad igra krene
    obavijestDiv.show();

    // Sakrij ga nakon 2 sekunde
    setTimeout(() => {
        obavijestDiv.hide();
    }, 2000);


    

    igraUpravoPokrenuta=true;
    setTimeout(()=>{
        igraUpravoPokrenuta=false;
    },70);
}


function nacrtajPsa() {
    let frameW=slikaPsa.width / 3; //sirina ovira jedne slicice
    let frameH=slikaPsa.height / 4 +50; //visina okvira + 50 jer prelaze jedna slika u drugu
    
    let dx=mouseX-pmouseX; //promjena pozicije misa, pmouseX je pozicija misa u prethodnome frameu, a mouseX u trenutnom
    let dy=mouseY-pmouseY;
    
    if (dy>2) { //ako se mis pomaknu vise od 2px prema dolje
        pasSmjer=1; // uzimamo red 1 jer se u njemu nalazi slicica psa prema dolje
    } else if (dy<-2) {
        pasSmjer=3; // u redu 3 se nalazi slicica psa prema gore
    }
    
    let brzina=dist(0, 0, dx, dy); //euklidska udaljenost od tocke (0,0)
    if (brzina>0.1) { //ako se mis krece
        pasAnimacijaVrijeme+=0.2; //povecaj brzinu animacije
    }
    //odreduje koja slicica (od 3) ce se prikazati, ovisi o brzini
    let stupac=floor(pasAnimacijaVrijeme)%3;
    //podesavanje koordinatnog sustava
    push();
    translate(mouseX, mouseY); //pomakni tocku crtanja na trenutnu poziciju misa
    imageMode(CENTER); //slikas se crta iz centra umjesto gornjeg lijevog kuta 
    noCursor(); //sakrij kursor
    
    image(slikaPsa, 0, 0, 40, 40, //slika,x,y,velicina na ekranu x, velicina na ekranu y
          (stupac*frameW)+1, (pasSmjer*frameH) + 1, //x i y pozicija izrezavanja
          frameW-2, frameH-2); //sirina i visina isjecka
    pop(); //vrati postavke na staro
    
    //lajanje psa je izvedeno na ovaj način zbog problema gdje bi pas jednom zalajao kada bismo pritisnuli gumb play
    if(zvukPsa.paused && mouseIsPressed && millis()-zadnjeLajanje>3000 ){ //je li zvuk pauziran, mis pritisnut i je li proslo 3 sekunde od zadnjeg lajanja
        zvukPsa.currentTime=0;
        zvukPsa.play();
    
        zadnjeLajanje=millis(); //zabiljezi zadnje lajanje
    
        }
}