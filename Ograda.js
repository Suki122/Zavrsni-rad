//izresci ograde is slike fence.png
const OGRADA_DIJELOVI={
    pocetak_h:    [32, 64, 32, 32],
    kraj_h:  [0, 64, 32, 32], 
    sredina_h:     [32, 32, 32, 32],
    pocetak_v:     [64, 0, 32, 32],
    kraj_v:     [64, 64, 32, 32],
    sredina_v:     [64, 32, 32, 32]
};
class Ograda{
    constructor(x,y,duljina,smjer,ograda,tip=null){
        this.x=x;
        this.y=y;
        this.duljina=duljina; //duljina ograde
        this.smjer=smjer; //horizontalno ili vertikalno
        this.ograda=ograda; //slika
        this.tip=tip; //koristimo za postavljanje spojeva koje ne mozemo automatizirati

    }
    prikazi(){
        
        let segmentW=32;
        let segmentH=32; //dimenzije komada ograde
        for(let i=0;i<this.duljina;i++){
            let kljuc;
            if(this.tip){  //ako je tip zadan, crtaj samo njega
                kljuc=this.tip;
            }
            else{ //ovisno o mjestu u nizu gdje se nalazi, dio neka postane taj
                let dio=(i==0)?"pocetak":(i===this.duljina-1)?"kraj":"sredina";
                kljuc=dio + "_" + this.smjer; //spoji dio i smjer kako bi dobio ime komada ograde
            }
            let [sx, sy, sw, sh]=OGRADA_DIJELOVI[kljuc]; //dohvati zadanu ogradu iz matrice
            let px=this.smjer==="h"?this.x+i*segmentW:this.x; //ako je zadano h, crtaj po x osi
            let py=this.smjer==="v"?this.y+i*segmentH:this.y; //ako je zadano v, crtaj po y osi
            image(this.ograda,px,py,segmentW,segmentH,sx,sy,sw,sh); //prva 4 govore gdje na ekranu crtamo, zadnja 4 sto izrezati iz slike
        }
    }
    //pretvaramo ogradu u listu zidova kako bismo mogli koristiti metodu za izbjegavanje zidova definiranu u klasi Boid
    pretvoriOgradu(){
        let ograde=[];
        let segmentW=32; //sirina hit-boxa (slicice)
        let segmentH=32; //visina hit-boxa (slicice)
        for (let i=0; i < this.duljina; i++) {
            let px=this.smjer==="h"?this.x+i*segmentW:this.x;
            let py=this.smjer==="v"?this.y+i*segmentH:this.y;
            zidovi.push({srediste:createVector(px+segmentW/2,py+segmentH/2),w:segmentW,h:segmentH}); //saljemo srediste, sirinu i visinu svakog dijela ograde
        }
        return ograde;
    }
}