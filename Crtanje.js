let flock=[];
function setup(){
    createCanvas(800,600);
    for(let i=0;i<20;i++){
        flock.push(new Boid(random(width), random(height)));
    }
}

function draw(){
    background(30);
    for(let boid of flock){
        boid.rubovi();
        boid.kretanje();
        boid.prikazi();
    }
}