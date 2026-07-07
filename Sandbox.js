
function nacrtajSandbox(){
    
    //dohvat tekstura trave se od sada nalazi u setupu zvog optimizacije

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
            else if(brojac%9==0){
                image(travaKvadrat5,x,y,16*2,16*2);
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
        if (sliderSep1 && sliderAli1 && sliderKoh1 && sliderSep2 && sliderAli2 && sliderKoh2) {
            let s1=sliderSep1.value();
            let a1=sliderAli1.value();
            let c1=sliderKoh1.value();
            //slideri crnih ovaca
            let s2=sliderSep2.value();
            let a2=sliderAli2.value();
            let c2=sliderKoh2.value();

            for(let boid of flock){
                boid.rubovi();
                boid.kretanje(flock,zidovi,ograde,c1,s1,a1,c2,s2,a2);
                boid.glasajSe();
                boid.prikazi();
            }
        } else {
            // Ako slideri još ne postoje, boidovi se kreću sa zadanim vrijednostima
            for(let boid of flock){
                boid.rubovi();
                boid.kretanje(flock,zidovi,ograde,0.1,0.1,0.05); 
                boid.glasajSe();
                boid.prikazi();
            }
        }
}

function ucitajSandbox(){
    trenutniLevel=3;
    stanje="sandbox";
    izbornikDiv.hide();
    panelSandbox.show();
    ograde=[];
    panel1.show();
    panel2.show();
    
    
    
    ograde.push(new Ograda(7, 1, 80, "h", ograda));
    ograde.push(new Ograda(1, 1, 50, "v", ograda));
    ograde.push(new Ograda(7, 1200, 80, "h", ograda));
    ograde.push(new Ograda(1500, 1, 50, "v", ograda));
    
    
    
    setTimeout(()=>{
        levelUcitan=true;
    },500);  //odgoda kako bi se stiglo obraditi, bez nje ne radi
    
}

function pokreniSandboxPostavke() {
    panelSandbox.hide();
    flock=[];
    let brBijelih=sliderBrojBijelih.value();
    let brCrnih=sliderBrojCrnih.value();
    let doseg=sliderPercepcija.value();
    let brzina=sliderMaxBrzina.value();
    let sila=sliderMaxSila.value();
    let velicina=sliderVelicina.value();
    let snaga=sliderSnagaPsa.value();

    for(let i=0; i<brBijelih; i++) {
        let b=new Boid(random(100,700), random(100,700), slikaOvceBijela, zvukOvceBijele);
        b.percepcija=doseg;
        b.maxBrzina=brzina;
        b.maxSila=sila;
        b.r=velicina;
        b.pasSila=snaga;
        flock.push(b);
    }
    for(let i=0; i<brCrnih; i++) {
        let b=new Boid(random(100,700), random(100,700), slikaOvceCrna, zvukOvceCrne, true);
        b.percepcija=doseg;
        b.maxBrzina=brzina;
        b.maxSila=sila;
        b.r=velicina;
        b.pasSila=snaga;
        flock.push(b);
    }
}