function nacrtajLevel1(){
    //oznacavamo koji tile iz pozadine zelimo 
    travaKvadrat=pozadina.get(0,0,16,16);
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
    //kako se kod ne bi srusio jer se prije izvrsi draw nego sto se slideri ucitaju
    if (sliderSep && sliderAli && sliderKoh) {
        let s=sliderSep.value();
        let a=sliderAli.value();
        let c=sliderKoh.value();

        for(let boid of flock){
            boid.rubovi();
            boid.kretanje(flock,zidovi,ograde,c,s,a);
            boid.prikazi();
        }
    } else {
        // Ako slideri još ne postoje, boidovi se kreću sa zadanim vrijednostima
        for(let boid of flock){
            boid.rubovi();
            boid.kretanje(flock,zidovi,ograde,0.1,0.1,0.05); 
            boid.prikazi();
        }
    }
}

function ucitajLevel1(){
    flock=[];
    ograde=[];

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