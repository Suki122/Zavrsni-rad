class Zid{
    constructor(x,y,w,h){
        this.x=x;
        this.y=y;
        this.w=w;
        this.h=h;
    }
    //funkcija za prikazivanje zidova koja sadrzi funkcije biblioteke p5.js
    prikazi(){
        fill(150);  //ispuna oblika bojom
        noStroke(); //ne iscrtavaj rubove oblika
        rect(this.x,this.y,this.w,this.h); //nacrtaj pravokutnik s tim dimenzijama
    }
}