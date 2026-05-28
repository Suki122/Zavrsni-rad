let flock=[];
function setup(){
    createCanvas(800,600);
    //spawn Boida odreden svojom grupom
    let centri=[
        createVector(200,200),
        createVector(600,200),
        createVector(400,400)
    ];
    for(let i=0;i<30;i++){
        let g=floor(random(0,3));
        let centar=centri[g];
        let b=new Boid(centar.x+random(-30,30),centar.y+random(-30,30));
        b.grupa=g;
        flock.push(b);
    }
}

function draw(){
    background(30);
    for(let boid of flock){
        boid.rubovi();
        boid.kretanje(flock);
        boid.prikazi();
    }
}