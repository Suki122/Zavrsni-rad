let ciljX2=1310;
let ciljY2=460;
let ciljSirina2=290;
let ciljVisina2=240;
function nacrtajLevel2(){
    
    krajLevel(ciljX2,ciljY2,ciljSirina2,ciljVisina2);
    //oznacavamo koji tile iz pozadine zelimo 
    travaKvadrat1=pozadina.get(0,0,16,16);
    let travaKvadrat2=pozadina.get(0,64,16,16);
    let travaKvadrat3=pozadina.get(32,0,16,16);
    let travaKvadrat4=pozadina.get(16,16,16,16);
    //dekoracije
    let cvjece1=pozadina.get(96,192,16,16);
    let cvjece2=pozadina.get(80,192,16,16);
    let panj1=pozadina.get(160,192,16,16);
    let panj2=pozadina.get(192,192,16,16);
    let grm1=pozadina.get(288,192,16,16);
    let grm2=pozadina.get(304,192,16,16);
    let grm3=pozadina.get(320,192,16,16);
    let grm4=pozadina.get(336,192,16,16);
    let ograda1=pozadina.get(336,208,16,16);
    let ograda2=pozadina.get(352,208,16,16);
    let ograda3=pozadina.get(368,208,16,16);
    let bus=pozadina.get(160,176,16,16);
    let kamen=pozadina.get(32,208,16,16);
    let gljiva1=pozadina.get(192,208,16,16);
    let gljiva2=pozadina.get(208,208,16,16);
    let sas=pozadina.get(256,192,16,16);
    



    noSmooth();  //da bi p5.js prikazao pozadinu ostro, inace bi bila mutna
    let brojac=0;
    for(let x=0;x<mapSirina;x+=16*2){ //ide po x-u
        for(let y=0;y<mapVisina;y+=16*2){ //ide po y
            if(x>1310 && x<1600 && y>460 && y<700){
            
                image(travaKvadrat4,x,y,16*2,16*2);
            
            }
            else if(brojac%7==0){
                image(travaKvadrat3,x,y,16*2,16*2);
            }
            else if(brojac%12==0){
                image(travaKvadrat2,x,y,16*2,16*2);
            }
            else{
                image(travaKvadrat1,x,y,16*2,16*2); //na svaku koordinatu postavlja tile pozadine koji smo prije odabrali
            }
            brojac++;
           
        }
    }
    //grid ukrasa
    let ukrasi = [
    {x:100, y:80, img:cvjece1},
    {x:450, y:250, img:cvjece1},
    {x:300, y:850, img:cvjece1},
    {x:950, y:300, img:cvjece1},
    {x:1100, y:150, img:cvjece1},

    {x:120, y:50, img:cvjece2},
    {x:550, y:400, img:cvjece2},
    {x:400, y:900, img:cvjece2},
    {x:650, y:150, img:cvjece2},
    {x:1100, y:750, img:cvjece2},
    {x:350, y:1250, img:cvjece2},
    {x:1350, y:1100, img:cvjece2},

    {x:420, y:500, img:panj1},
    {x:1120, y:500, img:panj1},
    {x:520, y:1200, img:panj1},

    {x:500, y:700, img:panj2},
    {x:1200, y:900, img:panj2},

    {x:900, y:600, img:cvjece1}, 
    {x:930, y:600, img:cvjece1},
    {x:900, y:630, img:cvjece1}, 
    {x:930, y:630, img:cvjece1},
    {x:600, y:1100, img:cvjece1}, 
    {x:630, y:1100, img:cvjece1},

    {x:250, y:350, img:grm1}, 
    {x:280, y:350, img:grm2}, 
    {x:310, y:350, img:grm3}, 
    {x:340, y:350, img:grm4},
    {x:900, y:350, img:grm1}, 
    {x:930, y:350, img:grm2}, 
    {x:960, y:350, img:grm3}, 
    {x:990, y:350, img:grm4},
    {x:700, y:950, img:grm1}, 
    {x:730, y:950, img:grm2}, 
    {x:760, y:950, img:grm3}, 
    {x:790, y:950, img:grm4},
    {x:500, y:80, img:grm1}, 
    {x:530, y:80, img:grm2}, 
    {x:560, y:80, img:grm3}, 
    {x:590, y:80, img:grm4},

    {x:750, y:1200, img:ograda1}, 
    {x:782, y:1200, img:ograda2}, 
    {x:814, y:1200, img:ograda3},
    {x:1250, y:800, img:ograda1}, 
    {x:1282, y:800, img:ograda2}, 
    {x:1314, y:800, img:ograda3},

    {x:800, y:800, img:bus}, 
    {x:600, y:450, img:bus}, 
    {x:630, y:450, img:bus},

    {x:50, y:450, img:kamen}, 
    {x:250, y:1050, img:kamen}, 
    {x:1100, y:1050, img:kamen},

    {x:200, y:200, img:gljiva1}, 
    {x:700, y:600, img:gljiva1}, 
    {x:1000, y:200, img:gljiva1},
    {x:230, y:220, img:gljiva2}, 
    {x:1030, y:220, img:gljiva2},

    {x:930, y:1050, img:sas}, 
    {x:960, y:1050, img:sas}, 
    {x:990, y:1050, img:sas},
    {x:200, y:600, img:sas}, 
    {x:200, y:630, img:sas}, 
    {x:200, y:660, img:sas},
    {x:530, y:1350, img:sas}, 
    {x:560, y:1350, img:sas}, 
    {x:590, y:1350, img:sas}
];

    //petlja za crtanje ukrasa
    for (let u of ukrasi) {
        image(u.img, u.x, u.y, 32, 32);
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

function ucitajLevel2(){
    if(trenutniLevel>1){
        obavijestDiv.html("<h1>Level 2</h1><p>Hard</p><p>Get the sheep to yellow grass!</p>")
        obavijestDiv.show();
    }
    // Sakrij ga nakon 2 sekunde
    setTimeout(() => {
        obavijestDiv.hide();
    }, 2000);

    flock=[];
    ograde=[];

    //Resetiraj slidere na početne postavke 
    if (sliderKoh1) sliderKoh1.value(1.0);
    if (sliderSep1) sliderSep1.value(1.2);
    if (sliderAli1) sliderAli1.value(1.0);
    if (sliderKoh2) sliderKoh2.value(0.9);
    if (sliderSep2) sliderSep2.value(1.2);
    if (sliderAli2) sliderAli2.value(0.9);

    panel2.show();

    //spawn Boida 
    for(let i=0;i<10;i++){
        let b=new Boid(200,200,slikaOvceBijela,zvukOvceBijele);
        flock.push(b);
    }
    for(let i=0;i<5;i++){
        let b=new Boid(200,200,slikaOvceCrna,zvukOvceCrne,true);
        flock.push(b);
    }
    
    
    ograde.push(new Ograda(0, 0, 150, "h", ograda));
    ograde.push(new Ograda(0, 0, 100, "v", ograda)); 
    ograde.push(new Ograda(0, 800, 150, "h", ograda)); 
    ograde.push(new Ograda(1700, 0, 100, "v", ograda));
    ograde.push(new Ograda(400, 200, 30, "v", ograda)); 
    ograde.push(new Ograda(1150, 650, 10, "v", ograda));
    ograde.push(new Ograda(550, 200, 20, "h", ograda));
    ograde.push(new Ograda(790, 340, 30, "v", ograda));
    ograde.push(new Ograda(600, 100, 19, "v", ograda));
    ograde.push(new Ograda(1000, 100, 20, "v", ograda));
    ograde.push(new Ograda(1000, 100, 15, "h", ograda));
    ograde.push(new Ograda(1150, 300, 20, "h", ograda));
    ograde.push(new Ograda(1000, 450, 15, "h", ograda));
    ograde.push(new Ograda(1300, 200, 4, "v", ograda));
    ograde.push(new Ograda(1300, 400, 10, "v", ograda));
    
    setTimeout(()=>{
        levelUcitan=true;
    },500);  //odgoda kako bi se stiglo obraditi, bez nje ne radi
    
}