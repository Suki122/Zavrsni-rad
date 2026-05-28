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

    prikazi(){
        fill(255);
        noStroke();
        circle(this.pozicija.x,this.pozicija.y,this.r*2);
    }
}