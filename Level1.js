function nacrtajLevel1(){
    
    //oznacavamo koji tile iz pozadine zelimo 
    travaKvadrat1=pozadina.get(0,0,16,16);
    let travaKvadrat2=pozadina.get(0,64,16,16);
    let travaKvadrat3=pozadina.get(32,0,16,16);
    let cvjece=pozadina.get(80,160,16,16);
    noSmooth();  //da bi p5.js prikazao pozadinu ostro, inace bi bila mutna
    let brojac=0;
    for(let x=0;x<mapSirina;x+=16*2){ //ide po x-u
        for(let y=0;y<mapVisina;y+=16*2){ //ide po y
            if(brojac%7==0){
                image(travaKvadrat2,x,y,16*2,16*2);
            }
            else if(brojac%12==0){
                image(travaKvadrat3,x,y,16*2,16*2);
            }
            else{
                image(travaKvadrat1,x,y,16*2,16*2); //na svaku koordinatu postavlja tile pozadine koji smo prije odabrali
            }
            brojac++;
           
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

    //spawn Boida odreden svojom grupom u centru veceg svijeta
    for(let i=0;i<30;i++){
        let centar=createVector(mapSirina/2, mapVisina/2);
        let b=new Boid(centar.x+random(-100,100),centar.y+random(-100,100),slikaOvce,zvukOvce);
        flock.push(b);
    }
    
    
    let o1=new Ograda(510,600,22,"h",ograda);
    ograde.push(o1);
    let o4=new Ograda(510,900,22,"h",ograda);
    ograde.push(o4);
    let o2=new Ograda(500,600,13,"v",ograda);
    ograde.push(o2);
    let o3=new Ograda(1200,600,13,"v",ograda);
    ograde.push(o3);
    
}