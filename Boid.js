class Boid{
    constructor(x,y){
        this.pozicija=createVector(x,y); //kreiramo instancu klase p5.Vector koja prima koordinate 
        this.brzina=p5.Vector.random2D(); //bira nasumican kut i racuna x i y
        this.brzina.setMag(random(2,4)); //racuna broj piksela koje treba proci po frameu
        this.ubrzanje=createVector(0,0);
        this.maxSila=0.2; //maksimalna promjena brzine po frameu
        this.maxBrzina=4;  //maksimalna brzina koju Boid nikada nece prijeci
        this.r=4; //velicina Boida 
    }
    //funkcija za vracanje Boida u Canvas
    rubovi(){
       if(this.pozicija.x>width+this.r){  //provjera desnog ruba
        this.pozicija.x=-this.r;
       } 
       else if(this.pozicija.x<-this.r){ //provjera lijevog ruba
        this.pozicija.x=width+this.r;
       }

       if(this.pozicija.y>height+this.r){  //provjera vrha
        this.pozicija.y=-this.r;
       } 
       else if(this.pozicija.y<-this.r){ //provjera dna
        this.pozicija.y=height+this.r;
       }
    }

    kretanje(){
        this.brzina.add(this.ubrzanje);  //dodaje ubrzanje na brzinu
        this.pozicija.add(this.brzina);  //ovisno o brzini, boid mijenja poziciju
        this.brzina.limit(this.maxBrzina); //Boid nikada ne prelazi maksimalnu zadanu brzinu
        this.ubrzanje.mult(0); //resetira ubrzanje da ne dode do zbrajanja sila i nekontroliranog ubrzavanja
    }
    //Reynold's flocking rules
    separacija(boidi){
        let percepcija=50; //vidno polje Boida
        let upravljanje=createVector(0,0); //vektor na koji se spremaju sve sile koje utjecu na Boid
        let ukupno=0; //broj Boidova koji su unutar vidnog polja Boida
        for(let boid of boidi){
            let d=dist(this.pozicija.x,this.pozicija.y,boid.pozicija.x,boid.pozicija.y); //udaljenost izmedu Boidova
            if(boid!=this && d<percepcija){ //ako nije on sam taj Boid i susjedni Boid je u vidnom polju
                let razlika=p5.Vector.sub(this.pozicija,boid.pozicija); //izracun smjera za bijeg
                razlika.div(d*d); //sto je susjed blize sila odgurivanja je jaca i obrnuto
                upravljanje.add(razlika);
                ukupno++;
            }
        }
        if(ukupno>0){
            upravljanje.div(ukupno); //izracun prosjecne sile (do sada imamo samo zbroj sila)
            upravljanje.setMag(this.maxBrzina); //postavlja zeljenu brzinu na maksimalnu dopustenu vrijednost
            upravljanje.sub(this.brzina); //racuna koliko ubrzanje treba imati do maksimalne dopustene brzine
            upravljanje.limit(this.maxSila); //ogranicava naglu promjenu smjera Boida
        }
        return upravljanje;
    }

    poravnanje(boidi){
        let percepcija=50; 
        let upravljanje=createVector(0,0); 
        let ukupno=0; 
        for(let boid of boidi){
            let d=dist(this.pozicija.x,this.pozicija.y,boid.pozicija.x,boid.pozicija.y); 
            if(boid!=this && d<percepcija){ 
                upravljanje.add(boid.brzina); //zbrajamo brzine svih Boidova u vidnom polju
                ukupno++;
            }
        }
        if(ukupno>0){
            upravljanje.div(ukupno); //racunamo prosjecnu brzinu
            upravljanje.setMag(this.maxBrzina); 
            upravljanje.sub(this.brzina); 
            upravljanje.limit(this.maxSila);
        }
        return upravljanje;
    }

    kohezija(boidi){
        let percepcija=50; 
        let upravljanje=createVector(0,0); 
        let ukupno=0; 
        for(let boid of boidi){
            let d=dist(this.pozicija.x,this.pozicija.y,boid.pozicija.x,boid.pozicija.y); 
            if(boid!=this && d<percepcija){ 
                upravljanje.add(boid.pozicija); //zbrajamo pozicije svih Boidova u vidnom polju
                ukupno++;
            }
        }
        if(ukupno>0){
            upravljanje.div(ukupno); //racunamo prosjecnu poziciju
            upravljanje.sub(this.pozicija); //izracun smjera prema kojem se Boid treba kretati
            upravljanje.setMag(this.maxBrzina); 
            upravljanje.sub(this.brzina); 
            upravljanje.limit(this.maxSila);
        }
        return upravljanje;
    }
    prikazi(){
        push(); //sprema transformacijske matrice i stilove
        translate(this.pozicija.x,this.pozicija.y); //mijenja ishodiste koordinatnog sustava na koordinate Boida
        rotate(this.brzina.heading()); //heading vraca kut vektora u radijanima i rotate rotira koordinatni sustav
        fill(255);
        noStroke();
        triangle(this.r * 2, 0, -this.r, this.r, -this.r, -this.r);
        pop(); //izbacuje promijenjenu transformacijsku matricu i vraca se na izvornu 
    }
}