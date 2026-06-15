let flock=[];
let zidovi=[];
let slikaOvce;
let pozadina;
let travaKvadrat;
let ograda;
let ograde=[];
function preload(){
    slikaOvce=loadImage("resursi/sheep_walk.png");
    pozadina=loadImage("resursi/GRASS+.png");
    ograda=loadImage("resursi/fence.png");
}
function setup(){
    createCanvas(800,600);
    travaKvadrat=pozadina.get(0,0,16,16);
    //spawn Boida odreden svojom grupom
    // let centri=[
    //     createVector(200,200),
    //     createVector(600,200),
    //     createVector(400,400)
    // ];
    for(let i=0;i<30;i++){
        // let g=floor(random(0,3));
        // let centar=centri[g];
        let centar=createVector(200,200);
        let b=new Boid(centar.x+random(-30,30),centar.y+random(-30,30),slikaOvce);
        // b.grupa=g;
        flock.push(b);
    }
    for(let j=0;j<5;j++){
        //let z=new Zid(random(0,800),random(0,600),random(0,150),random(0,150));
        //let o1=new Ograda(random(0,800),random(0,600),5,"h",ograda,"pocetak_h");
        let o2=new Ograda(random(0,800),random(0,600),5,"v",ograda,"sredina_v_spoj");
        //zidovi.push(z);
        //ograde.push(o1);
        ograde.push(o2);
    }
}

function draw(){
    noSmooth();
    for(let x=0;x<width;x+=16*2){
        for(let y=0;y<height;y+=16*2){
            image(travaKvadrat,x,y,16*2,16*2);
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