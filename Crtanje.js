let flock=[];
function setup(){
    createCanvas(800,600);
    flock.push(new Boid(width/2,height/2));
}

function draw(){
    background(30);
    for(let boid of flock){
        boid.prikazi();
    }
}