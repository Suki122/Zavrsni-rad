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

//osiguranje da se slike i  zvukovi ucitaju prvi
function preload(){
    slikaOvce=loadImage("resursi/sheep_walk.png");
    pozadina=loadImage("resursi/GRASS+.png");
    ograda=loadImage("resursi/fence.png");
    zvukOvce = new Audio("resursi/test1.wav"); //p5.js iz nekog razloga ne radi za zvuk pa koristimo ovaj nacin
}

function setup(){
    createCanvas(800,600);
    gumbIgraj=createButton("IGRAJ");
    gumbIgraj.class('play-gumb');
    gumbIgraj.position(width/2-50,height/2+50);
    gumbIgraj.mousePressed(pokreniIgru);
    
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

function draw() {
    crtaIgru(); 
    
    if (stanje === "izbornik") {
        push();
        fill(255, 255, 255, 200); // Bijela s prozirnošću (200 od 255)
        rect(150, 100, 500, 400, 20); // Pravokutnik izbornika
        
        fill(255, 152, 0); // Narančasta za naslov
        textAlign(CENTER);
        textSize(48);
        text("MOJA FARMA", width/2, height/2 - 50);
        
        fill(255, 235, 59); // Žuta za podnaslov
        textSize(24);
        text("Pomozi ovcama da izbjegnu ogradu!", width/2, height/2 - 10);
        pop();
    } else {
        gumbIgraj.hide();
    }
}

function crtaIgru() {
    // Tvoja postojeća logika za crtanje trave i ovaca ide ovdje
    background(100, 200, 100); 
    // ... ostatak crtanja boida ...
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

function prikaziIzbornik() {
    background(50);
    textAlign(CENTER);
    fill(255);
    textSize(50);
    text("MOJA OVCA IGRA", width/2, height/2 - 50);
}

function pokreniIgru() {
    stanje = "igra";
    gumbIgraj.hide(); // Sakrij gumb kad igra krene
}