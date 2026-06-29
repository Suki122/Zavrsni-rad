let ciljX1=360;
let ciljY1=20;
let ciljSirina1=340;
let ciljVisina1=260;
function nacrtajLevel1(){
    
    
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
            if(x>360 && x<700 && y>20 && y<280){
                image(travaKvadrat4,x,y,16*2,16*2);
            }
            else if(brojac%7==0){
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
    //grid ukrasa
    let ukrasi = [
        {x:64, y:50, img:cvjece1},
        {x:300, y:200, img:cvjece1},
        {x:250, y:700, img:cvjece1},
        {x:700, y:200, img:cvjece1},
        {x:1200, y:200, img:cvjece1},

        {x:800, y:570, img:cvjece1},
        {x:830, y:570, img:cvjece1},
        {x:800, y:600, img:cvjece1},
        {x:830, y:600, img:cvjece1},

        {x:500, y:1000, img:cvjece1},
        {x:530, y:1000, img:cvjece1},

        {x:80, y:32, img:cvjece2},
        {x:400, y:300, img:cvjece2},
        {x:500, y:800, img:cvjece2},
        {x:500, y:222, img:cvjece2},
        {x:970, y:655, img:cvjece2},
        {x:200, y:1200, img:cvjece2},
        {x:1202, y:1130, img:cvjece2},

        {x:200, y:400, img:panj1},
        {x:900, y:400, img:panj1},
        {x:300, y:1100, img:panj1},

        {x:370, y:600, img:panj2},
        {x:1030, y:800, img:panj2},

        {x:100, y:280, img:grm1},
        {x:130, y:280, img:grm2},
        {x:160, y:280, img:grm3},
        {x:190, y:280, img:grm4},

        {x:800, y:280, img:grm1},
        {x:830, y:280, img:grm2},
        {x:860, y:280, img:grm3},
        {x:890, y:280, img:grm4},

        {x:600, y:880, img:grm1},
        {x:630, y:880, img:grm2},
        {x:660, y:880, img:grm3},
        {x:690, y:880, img:grm4},

        {x:400, y:30, img:grm1},
        {x:430, y:30, img:grm2},
        {x:460, y:30, img:grm3},
        {x:490, y:30, img:grm4},

        {x:635, y:1100, img:ograda1},
        {x:667, y:1100, img:ograda2},
        {x:699, y:1100, img:ograda3},

        {x:1135, y:700, img:ograda1},
        {x:1167, y:700, img:ograda2},
        {x:1199, y:700, img:ograda3},

        {x:700, y:700, img:bus},
        {x:500, y:350, img:bus},
        {x:530, y:350, img:bus},

        {x:-15, y:350, img:kamen},
        {x:150, y:950, img:kamen},
        {x:1000, y:950, img:kamen},

        {x:100, y:100, img:gljiva1},
        {x:600, y:530, img:gljiva1},
        {x:900, y:100, img:gljiva1},

        {x:130, y:120, img:gljiva2},
        {x:930, y:120, img:gljiva2},

        {x:830, y:970, img:sas},
        {x:860, y:970, img:sas},
        {x:890, y:970, img:sas},

        {x:130, y:500, img:sas},
        {x:130, y:530, img:sas},
        {x:130, y:560, img:sas},

        {x:430, y:1250, img:sas},
        {x:460, y:1250, img:sas},
        {x:490, y:1250, img:sas},
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

    //spawn Boida 
    for(let i=0;i<30;i++){
        let b=new Boid(100,100,slikaOvce,zvukOvce);
        flock.push(b);
    }
    
    
    let o1=new Ograda(20,0,220,"h",ograda);
    ograde.push(o1);
    let o4=new Ograda(110,300,15,"h",ograda);
    ograde.push(o4);
    let o2=new Ograda(10,0,220,"v",ograda);
    ograde.push(o2);
    let o3=new Ograda(347,10,10,"v",ograda);
    ograde.push(o3);
    let o5=new Ograda(100,300,15,"v",ograda);
    ograde.push(o5);
    let o6=new Ograda(120,748,15,"h",ograda);
    ograde.push(o6);
    let o7=new Ograda(120,900,35,"h",ograda);
    ograde.push(o7);
    let o8=new Ograda(110,900,5,"v",ograda);
    ograde.push(o8);
    let o9=new Ograda(30,1055,20,"h",ograda);
    ograde.push(o9);
    let o10=new Ograda(1000,20,28,"v",ograda);
    ograde.push(o10);
    let o11=new Ograda(700,300,10,"h",ograda);
    ograde.push(o11);
    
}