
class Boid{
    constructor(x,y,slika,zvuk,jeCrna=false){
        this.pozicija=createVector(x,y); //kreiramo instancu klase p5.Vector koja prima koordinate 
        this.brzina=p5.Vector.random2D(); //bira nasumican kut i racuna x i y
        this.brzina.setMag(random(2,4)); //racuna broj piksela koje treba proci po frameu
        this.ubrzanje=createVector(0,0);
        this.maxSila=0.2; //maksimalna promjena brzine po frameu
        this.maxBrzina=2.5;  //maksimalna brzina koju Boid nikada nece prijeci
        this.r=7; //velicina Boida 
        this.frame=0;
        this.slika=slika; //slika koju boid prima
        this.zvuk=zvuk; //zvuk koji boid prima
        this.jeCrna=jeCrna; //ako je ovca crna
        this.zadnjiGlas=millis();  //spremi trenutno vrijeme pri stvaranju
        this.percepcija=100; // defaultni doseg percepcije (vidnog polja)
        this.pasSila=1; //sila s kojom se mnozi this.masSila u traziMis funkciji, dodana kako bismo utjecali na silu bjezanja ovce od psa
    }

    
    //funkcija za vracanje Boida u Canvas
    rubovi(){
       if(this.pozicija.x>mapSirina+this.r){  //provjera desnog ruba
        this.pozicija.x=-this.r;
       } 
       else if(this.pozicija.x<-this.r){ //provjera lijevog ruba
        this.pozicija.x=mapSirina+this.r;
       }

       if(this.pozicija.y>mapVisina+this.r){  //provjera vrha
        this.pozicija.y=-this.r;
       } 
       else if(this.pozicija.y<-this.r){ //provjera dna
        this.pozicija.y=mapVisina+this.r;
       }
    }

    kretanje(boidi,zidovi,ograde,KOH1,SEP1,ALI1,KOH2,SEP2,ALI2){
        let sep=this.separacija(boidi);
        let ali=this.poravnanje(boidi);
        let coh=this.kohezija(boidi);


        let svePrepreke=[...zidovi]; //prepisi zidove u niz svePrepreke
        for(let o of ograde){
            svePrepreke.push(...o.pretvoriOgradu());    //nad svakom ogradom pozov funkciju i stavi ju u niz svePrepreke
        }
        let prepreka=this.izbjegavanjeZida(svePrepreke);
        
        if(this.jeCrna){
            sep.mult(SEP2); 
            ali.mult(ALI2); 
            coh.mult(KOH2);
        }
        else{
            sep.mult(SEP1); 
            ali.mult(ALI1); 
            coh.mult(KOH1);
        }
        
        
        

        this.ubrzanje.add(sep);
        this.ubrzanje.add(ali);
        this.ubrzanje.add(coh);
        this.ubrzanje.add(prepreka);
        if(prepreka.mag()===0 && mouseIsPressed){ //boid prati mis samo ako nema prepreku
            let misSila=this.traziMis();
            misSila.mult(1.0);
            this.ubrzanje.add(misSila);
        }
        
        

        this.brzina.add(this.ubrzanje);  //dodaje ubrzanje na brzinu
        this.brzina.limit(this.maxBrzina); //Boid nikada ne prelazi maksimalnu zadanu brzinu
        this.pozicija.add(this.brzina);  //ovisno o brzini, boid mijenja poziciju
        this.ubrzanje.mult(0); //resetira ubrzanje da ne dode do zbrajanja sila i nekontroliranog ubrzavanja
    }
    //Reynold's flocking rules
    separacija(boidi){
        let percepcija=this.percepcija; //vidno polje Boida
        let upravljanje=createVector(0,0); //vektor na koji se spremaju sve sile koje utjecu na Boid
        let ukupno=0; //broj Boidova koji su unutar vidnog polja Boida
        for(let boid of boidi){
            let d=dist(this.pozicija.x,this.pozicija.y,boid.pozicija.x,boid.pozicija.y); //udaljenost izmedu Boidova
            if(boid!=this && d<percepcija && d>0){ //ako nije on sam taj Boid i susjedni Boid je u vidnom polju, d>0 sprjecava dijeljenje s nulom u slucaju da se boidovi nalaze na istoj lokaciji
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
        let percepcija=this.percepcija; 
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
        let percepcija=this.percepcija * 1.5; 
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

    traziMis(){
        if (mouseX>=0 && mouseX<width && mouseY>=0 && mouseY<=height){
            let mis=createVector(mouseX+kameraX, mouseY+kameraY); //hvata koordinate misa u svijetu, dodaju se koordinate kamere kako bi se ponistio translate svijeta
            let zeljeniSmjer=this.pozicija.copy().sub(mis); //racuna smjer od misa prema boidu, copy koristi da se ne uniste izvorne koordinate pozicije
            let d=zeljeniSmjer.mag(); //racuna udaljenost od misa do boida
            if (d>200) {
                return createVector(0, 0);
                
            } 
            zeljeniSmjer.setMag(map(d, 0, 200, this.maxBrzina*2, 2)); //mapiramo prema udaljenosti boida od misa
            let upravljanje=zeljeniSmjer.copy().sub(this.brzina); //racuna ispravak putanje boida
            upravljanje.limit(this.maxSila*this.pasSila); //maksimalna snaga kojom boid smije promijeniti smjer u 1 frameu
            
            return upravljanje;

        }
        //ako je mis izvan canvasa, nije potrebno bjezati
        return createVector(0, 0);
    }

    glasajSe() {
        let trenutnoVrijeme=millis();
        if(trenutnoVrijeme-this.zadnjiGlas>5000){ //provjeri je li proslo 10 sekundi
                // Provjeri zvuk, status reprodukcije i stanje igre
            if (this.zvuk && (stanje==="igra" || stanje=="sandbox")) {
                this.zvuk.currentTime = 0; // Vrati na početak
                this.zvuk.play();          // pokreni zvuk
                this.zadnjiGlas=trenutnoVrijeme; //resetiraj timer
            }
        }
        
    }

    izbjegavanjeZida(zidovi){
            let upravljanje = createVector(0, 0);

        for (let zid of zidovi) {
            let doBoida=p5.Vector.sub(this.pozicija, zid.srediste); //kreira vektor koji ide od sredista zida ka boidu (ako je boid desno od zida x je pozitivan, ako je boid iznad zida y je negativan)
            if (abs(doBoida.x)<zid.w/2+0 && abs(doBoida.y)<zid.h/2+15) { //provjera je li boid unutar zida
                let silaOdbijanja = doBoida.copy();
                silaOdbijanja.setMag(this.maxBrzina * 2); //postavlja silu i i osigurava da je 2 puta jaca od svih ostalih
                this.brzina.mult(-0.5); //okrece smjer brzine za 180 i smanjuje jakost za pola
                upravljanje.add(silaOdbijanja);
            }
        }
        return upravljanje;
        }
    

    prikazi(){
        push(); //sprema transformacijske matrice i stilove
        translate(this.pozicija.x,this.pozicija.y); //mijenja ishodiste koordinatnog sustava na koordinate Boida
        rotate(this.brzina.heading()+PI/2); //heading vraca kut vektora u radijanima i rotate rotira koordinatni sustav, pomocu Pi okrecemo sprite ovce u smjeru kretanja
        this.frame=this.frame+(this.brzina.mag()*0.15);//brzina animacije uskladena s brzinom boida
        let col=floor(this.frame)%4; //pretvara decimalni frame u stupac koji odgovara slicici animacije, %4 osigurava da se slicice vrte u krug (0-1-2-3-0)
        let frameW=this.slika.width/4; //sirina spritea ovce
        let frameH=this.slika.height/4; //visina spritea ovce
        imageMode(CENTER); //x i y koordinate postaju srediste slike a ne gornji lijevi kut (idealno za rotaciju spritea)
        image(this.slika,0,0,this.r*8,this.r*8,col*frameW,0,frameW,frameH); //slika,koordinate x i y na ekranu, velicina na ekranu, gdje pocinje rezanje slike, dimenzije reza
        pop(); //izbacuje promijenjenu transformacijsku matricu i vraca se na izvornu 
    }
}