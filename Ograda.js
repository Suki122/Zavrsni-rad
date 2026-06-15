const OGRADA_DIJELOVI = {
    pocetak_h:    [32, 64, 32, 32],
    kraj_h:  [0, 64, 32, 32], 
    sredina_h_spoj:     [32, 32, 32, 32],
    pocetak_v:     [64, 0, 32, 32],
    kraj_v:     [64, 64, 32, 32],
    sredina_v_spoj:     [64, 32, 32, 32]
};
class Ograda{
    constructor(x,y,duljina,smjer,ograda,tip="pocetak"){
        this.x=x;
        this.y=y;
        this.duljina=duljina;
        this.smjer=smjer;
        this.ograda=ograda;
        this.tip=tip;

    }
    prikazi(){
        let [sx, sy, sw, sh] = OGRADA_DIJELOVI[this.tip];
        let segmentW=32;
        let segmentH=32;
        for(let i=0;i<this.duljina;i++){
            let px=this.smjer==="h"?this.x+i*segmentW:this.x;
            let py=this.smjer==="v"?this.y+i*segmentH:this.y;
            image(this.ograda,px,py,segmentW,segmentH,sx,sy,sw,sh);
        }
    }
}