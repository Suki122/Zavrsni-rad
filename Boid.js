class Boid{
    constructor(x,y){
        this.pozicija=createVector(x,y);
        this.brzina=p5.Vector.random2D();
        this.brzina.setMag(random(2,4));
        this.ubrzanje=createVector(0,0);
        this.maxSila=0.2;
        this.maxBrzina=4;
        this.r=4;
    }

    rubovi(){
       if(this.pozicija.x>width+this.r){
        this.pozicija.x=-this.r;
       } 
       else if(this.pozicija.x<-this.r){
        this.pozicija.x=width+this.r;
       }

       if(this.pozicija.y>height+this.r){
        this.pozicija.y=-this.r;
       } 
       else if(this.pozicija.y<-this.r){
        this.pozicija.y=height+this.r;
       }
    }

    kretanje(){
        this.brzina.add(this.ubrzanje);
        this.pozicija.add(this.brzina);
        this.brzina.limit(this.maxBrzina);
        this.ubrzanje.mult(0);
    }

    prikazi(){
        push();
        translate(this.pozicija.x,this.pozicija.y);
        rotate(this.brzina.heading);
        fill(255);
        noStroke();
        triangle(10, 0, -7, 5, -7, -5);
        pop();
    }
}