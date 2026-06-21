let flock=[];
let zidovi=[];
let slikaOvce;
let pozadina;
let travaKvadrat;
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
//osiguranje da se slike i  zvukovi ucitaju prvi
function preload(){
    slikaOvce=loadImage("resursi/sheep_walk.png");
    pozadina=loadImage("resursi/GRASS+.png");
    ograda=loadImage("resursi/fence.png");
    zvukOvce=new Audio("resursi/test1.wav"); //p5.js iz nekog razloga ne radi za zvuk pa koristimo ovaj nacin
    introGlazba=new Audio("resursi/glazba_uvod.mp3");
    introGlazba.loop=true;
    
}

function setup(){
    createCanvas(800,600);
    
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
    
    //oznacavamo koji tile iz pozadine zelimo 
    travaKvadrat=pozadina.get(0,0,16,16);

    //spawn Boida odreden svojom grupom
    for(let i=0;i<30;i++){
        let centar=createVector(200,200);
        let b=new Boid(centar.x+random(-30,30),centar.y+random(-30,30),slikaOvce,zvukOvce);
        flock.push(b);
    }
    for(let j=0;j<5;j++){
        let o2=new Ograda(random(0,800),random(0,600),5,"v",ograda);
        ograde.push(o2);
    }
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
    
    if (stanje==="igra") {
        izbornikDiv.hide();
    }
}

function crtaIgru() {
    background(100,200,100); 
    noSmooth();  //da bi p5.js prikazao pozadinu ostro, inace bi bila mutna
    for(let x=0;x<width;x+=16*2){ //ide po x-u
        for(let y=0;y<height;y+=16*2){ //ide po y
            image(travaKvadrat,x,y,16*2,16*2); //na svaku koordinatu postavlja tile pozadine koji smo prije odabrali
        }
    }
    
    for(let zid of zidovi){
        zid.prikazi();
    }
    for(let ograda of ograde){
        ograda.prikazi();
    }
    for(let boid of flock){
        boid.rubovi();
        boid.kretanje(flock,zidovi,ograde);
        boid.prikazi();
    }
}

function pokreniIgru() {
    stanje="igra";
    
    izbornikDiv.hide(); // Sakrij izbornik kad igra krene
}