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
let gumbSandbox;
let izbornikDiv; 
let introGlazba;
let gumbZvuk;
let zvukAktivan=false;
let slikaOn="resursi/sound_onn.png";
let slikaOff="resursi/sound_offf.png";
let sliderKoh1, sliderSep1, sliderAli1;
let panel1;
let sliderKoh2, sliderSep2, sliderAli2;
let panel2;
let panel3;
let panel_kontejner;
let panelGornjiRed;
let sliderBrojBijelih, sliderBrojCrnih, sliderPercepcija, sliderMaxBrzina, sliderMaxSila, sliderVelicina, sliderSnagaPsa;
let tekstBrBijelih, tekstBrCrnih, tekstPercepcija, tekstMaxBrzina, tekstMaxSila, tekstVelicina, tekstSnagaPsa;
let panelSandbox;
let tekstKoh1, tekstSep1, tekstAli1;
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
let pravilaDiv;
let gumbZatvori;
let gumbPravila;
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
    let canvas=createCanvas(800,600);
    canvas.parent("canvas-kontejner");

    obavijestDiv=createDiv("");
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

    
    //panel za bijele ovce
    panel1=createDiv("");
    panel1.id("kontrole-panel"); 
    
    let zaglavlje1=createDiv("");
    zaglavlje1.class("panel-zaglavlje");
    zaglavlje1.parent(panel1);
    
    let ikona1=createDiv("");
    ikona1.class("sheep-icon sheep-white");
    ikona1.parent(zaglavlje1);
    
    let naslov1=createDiv("White sheep");
    naslov1.class("panel-naslov");
    naslov1.parent(zaglavlje1);
    
    createLabel("Cohesion", panel1);
    tekstKoh1=createDiv("1.0").parent(panel1);
    sliderKoh1=createSlider(0, 2.0, 1.0, 0.1).parent(panel1);
    
    createLabel("Separation", panel1);
    tekstSep1=createDiv("1.0").parent(panel1);
    sliderSep1=createSlider(0, 2.0, 1.2, 0.1).parent(panel1);
    
    createLabel("Alignment", panel1);
    tekstAli1=createDiv("1.0").parent(panel1);
    sliderAli1=createSlider(0, 2.0, 1.0, 0.1).parent(panel1);

    
    //panel za crne ovce
    panel2=createDiv("");
    panel2.id("kontrole-panel"); 
    
    let zaglavlje2=createDiv("");
    zaglavlje2.class("panel-zaglavlje");
    zaglavlje2.parent(panel2);
    
    let ikona2=createDiv("");
    ikona2.class("sheep-icon sheep-black");
    ikona2.parent(zaglavlje2);
    
    let naslov2=createDiv("Black sheep");
    naslov2.class("panel-naslov");
    naslov2.parent(zaglavlje2);
    
    createLabel("Cohesion", panel2);
    tekstKoh2=createDiv("1.0").parent(panel2);
    sliderKoh2=createSlider(0, 2.0, 0.9, 0.1).parent(panel2);
    
    createLabel("Separation", panel2);
    tekstSep2=createDiv("1.0").parent(panel2);
    sliderSep2=createSlider(0, 2.0, 1.2, 0.1).parent(panel2);
    
    createLabel("Alignment", panel2);
    tekstAli2=createDiv("1.0").parent(panel2);
    sliderAli2=createSlider(0, 2.0, 0.9, 0.1).parent(panel2);

    panel2.hide();
    
    //panel za postavke
    panel3=createDiv("");
    panel3.id("kontrole-panel");
    panel3.hide();

    gumbVrati=createButton("Main Menu");
    gumbVrati.class("return");
    gumbVrati.parent(panel3); 
    gumbVrati.mousePressed(vratiNaMainMenu);

    

    createLabel("Music", panel3);

    panelGornjiRed=createDiv("");
    panelGornjiRed.id("panel-gornji-red");

    panel_kontejner=createDiv("");
    panel_kontejner.id("panel-kontejner");
    
    panel1.parent(panelGornjiRed);
    panel2.parent(panelGornjiRed);
    panelGornjiRed.parent(panel_kontejner);
    panel3.parent(panel_kontejner);

    izbornikDiv=createDiv("");
    izbornikDiv.class("izbornik-container");
    izbornikDiv.parent("canvas-kontejner");
    izbornikDiv.html("<h1>Sheep Scramble</h1><p>Get the sheep!</p>");
    
    gumbIgraj=createButton("Play");
    gumbIgraj.class("play-gumb");
    gumbIgraj.parent(izbornikDiv); 
    gumbIgraj.mousePressed(pokreniIgru);

    gumbSandbox=createButton("Sandbox");
    gumbSandbox.class("play-gumb");
    gumbSandbox.parent(izbornikDiv); 
    gumbSandbox.mousePressed(ucitajSandbox);

    gumbZvuk=createImg(slikaOff,"Zvuk");
    gumbZvuk.class("zvuk-gumb");
    gumbZvuk.parent(izbornikDiv);
    gumbZvuk.mousePressed(sound);

    //GameOver panel koji sadrži poruku i gumb za ponovni pokušaj
    gameOverDiv=createDiv("");
    gameOverDiv.class("obavijest-box");
    gameOverDiv.parent("canvas-kontejner");
    gameOverDiv.html("<h1>Sheep got away!</h1><p>Don't lose the sheep out of the sight</p>");
    gameOverDiv.hide();

    gumbPonovno=createButton("Try Again");
    gumbPonovno.class("play-gumb");
    gumbPonovno.parent(gameOverDiv); 
    gumbPonovno.mousePressed(pokreniIgru);
    
    //panel s postavakama sandbox moda
    panelSandbox=createDiv("");
    panelSandbox.id("sandbox-overlay");
    panelSandbox.parent("canvas-kontejner");
    panelSandbox.hide();
    createLabel("Number of white sheep", panelSandbox);
    tekstBrBijelih=createDiv("0").parent(panelSandbox);
    sliderBrojBijelih=createSlider(0, 100, 30).parent(panelSandbox);
    createLabel("Number of black sheep", panelSandbox);
    tekstBrCrnih=createDiv("0").parent(panelSandbox);
    sliderBrojCrnih=createSlider(0, 50, 10).parent(panelSandbox);
    createLabel("Perception", panelSandbox);
    tekstPercepcija=createDiv("0").parent(panelSandbox);
    sliderPercepcija=createSlider(1, 300, 100).parent(panelSandbox);
    createLabel("Max Speed", panelSandbox);
    tekstMaxBrzina=createDiv("3.0").parent(panelSandbox);
    sliderMaxBrzina=createSlider(1, 10, 3, 0.5).parent(panelSandbox);
    createLabel("Max Force", panelSandbox);
    tekstMaxSila=createDiv("0.1").parent(panelSandbox);
    sliderMaxSila=createSlider(0.01, 0.5, 0.2, 0.01).parent(panelSandbox);
    createLabel("Sheep Size", panelSandbox);
    tekstVelicina=createDiv("50").parent(panelSandbox);
    sliderVelicina=createSlider(1, 20, 7).parent(panelSandbox);
    createLabel("Dog Strength", panelSandbox);
    tekstSnagaPsa=createDiv("2.0").parent(panelSandbox);
    sliderSnagaPsa=createSlider(0, 5, 2, 0.1).parent(panelSandbox);
    panelSandbox.hide();

    // Gumb za primjenu postavki
    gumbPrimjeni=createButton("Apply");
    gumbPrimjeni.class("return");
    gumbPrimjeni.parent(panelSandbox);
    gumbPrimjeni.mousePressed(pokreniSandboxPostavke);

    gumbPravila=createButton("Rules");
    gumbPravila.class("play-gumb");
    gumbPravila.parent(izbornikDiv);
    gumbPravila.mousePressed(()=>pravilaDiv.show());

    pravilaDiv=createDiv("");
    pravilaDiv.id("rules-overlay");
    pravilaDiv.parent("canvas-kontejner");
    pravilaDiv.hide();

    pravilaDiv.html("<h1>How to Play</h1>" +
    "<div class='rules-text'>" +
    "<b>Goal:</b> Guide the sheep to the yellow grass area!<br>" +
    "<b>Controls:</b> Move your mouse to control the dog.<br>" +
    "<b>Rules:</b><br>• <b>Don't lose the sheep out of sight!</b> If they wander too far from your dog, you might lose them and have to restart a level.<br><br>" +
    "<b>Settings Explained:</b><br>" +
    "• <b>Cohesion:</b> Sheep want to stay together.<br>" +
    "• <b>Separation:</b> Sheep want personal space.<br>" +
    "• <b>Alignment:</b> Sheep want to follow the same direction.<br>" +
    "• <b>Number of white/black sheep:</b> Total count of each type of sheep in the field.<br>" +
    "• <b>Perception:</b> How far away a sheep can 'see' its neighbors. Higher values make them react to distant sheep.<br>" +
    "• <b>Max Speed:</b> The maximum velocity a sheep can reach when moving.<br>" +
    "• <b>Max Force:</b> How sharply a sheep can turn. Lower values make movement smoother and more realistic.<br>" +
    "• <b>Sheep Size:</b> The visual scale of the sheep on the screen.<br>" +
    "• <b>Dog Strength:</b> How powerfully the sheep are pushed away when the dog (mouse) gets close." +
    "</div>");
    gumbZatvori=createButton("Close");
    gumbZatvori.class("play-gumb");
    gumbZatvori.parent(pravilaDiv);
    gumbZatvori.mousePressed(()=>pravilaDiv.hide());

    
    ucitajMenuLevel();
}
function sljedeciLevel(){
        obavijestDivKraj.hide();
        levelZavrsen=false;
        levelUcitan=false; //postavi da level nije ucitan
        if(trenutniLevel<2){
            trenutniLevel++;
            console.log(trenutniLevel);
        }
        if(trenutniLevel==2){
            console.log(trenutniLevel);
            ucitajLevel2();
        }
        else{
            console.log(trenutniLevel);
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
    
    crtaIgru(); 
    cursor();


    //azuriraj vrijednosti slidera
    tekstKoh1.html(sliderKoh1.value());
    tekstSep1.html(sliderSep1.value());
    tekstAli1.html(sliderAli1.value());

    tekstKoh2.html(sliderKoh2.value());
    tekstSep2.html(sliderSep2.value());
    tekstAli2.html(sliderAli2.value());

    tekstBrBijelih.html(sliderBrojBijelih.value());
    tekstBrCrnih.html(sliderBrojCrnih.value());
    tekstPercepcija.html(sliderPercepcija.value());

    tekstMaxBrzina.html(sliderMaxBrzina.value());
    tekstMaxSila.html(sliderMaxSila.value());
    tekstVelicina.html(sliderVelicina.value());
    tekstSnagaPsa.html(sliderSnagaPsa.value());

    
    if ((stanje==="igra" && !igraUpravoPokrenuta) || stanje=="sandbox" ) {
        izbornikDiv.hide();
        panel1.show();
        panel3.show();
        gumbZvuk.parent(panel3); //gumb se prebacuje u panel, a labela se vec tamo  nalazi
        gumbZvuk.show();
        
        if(mouseIsPressed){
            nacrtajPsa();
        }
    }
    else{
        panel1.hide();
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
        case 3:
            nacrtajSandbox();
            break;
    }
    pop(); //vraca koordinatni sustav na sta je bio prije
}


function pokreniIgru() {
    obavijestDivKraj.hide();
    stanje="igra";
    trenutniLevel=1; // Resetiranje na level 1
    panelSandbox.hide();
    panel2.hide(); 
    
    if (gameOverDiv) {
        gameOverDiv.hide();
    }

    // Ponovno učitaj level 1 da resetiramo ovce i ograde na početne pozicije

    ucitajLevel1();

    // Resetiraj poziciju kamere
    kameraX=0;
    kameraY=0;

    izbornikDiv.hide(); // Sakrij izbornik kad igra krene
    
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


function vratiNaMainMenu(){  //funkcija za vracanje na main menu pomocu gumba return
    stanje="izbornik";
    gumbZvuk.parent(izbornikDiv);
    izbornikDiv.show();
    izbornikDiv.style("display", "flex");
    panel1.hide();
    panel2.hide();
    panel3.hide();
    panelSandbox.hide();
    obavijestDiv.hide();
    ucitajMenuLevel()
}