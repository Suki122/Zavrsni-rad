function ucitajMenuLevel(){
    flock=[];
    ograde=[];

    //spawn Boida 
    for(let i=0;i<30;i++){
        let b=new Boid(random(50,800),random(50,800),slikaOvceBijela,zvukOvceBijele);
        flock.push(b);
    }
    
    
    ograde.push(new Ograda(20,0,220,"h",ograda));
    ograde.push(new Ograda(110,300,15,"h",ograda));
    ograde.push(new Ograda(10,0,220,"v",ograda));
    ograde.push(new Ograda(347,10,10,"v",ograda));
    ograde.push(new Ograda(100,300,15,"v",ograda));
    ograde.push(new Ograda(120,748,15,"h",ograda));
    ograde.push(new Ograda(120,900,35,"h",ograda));
    ograde.push(new Ograda(110,900,5,"v",ograda));
    ograde.push(new Ograda(30,1055,20,"h",ograda));
    ograde.push(new Ograda(1000,20,28,"v",ograda));
    ograde.push(new Ograda(700,300,10,"h",ograda));
    
    
}