let levelZavrsen=false;
function krajLevel(ciljX,ciljY,ciljSirina,ciljVisina){
    if(levelZavrsen){
        return;
    }
    let sveUcilju=flock.every(ovca=>{
        if(!ovca || !ovca.pozicija) return false;
        let x=ovca.pozicija.x;
        let y=ovca.pozicija.y;

        // Provjera je li ovca unutar pravokutnika
        return (x>ciljX && x<(ciljX+ciljSirina) && 
                y>ciljY && y<(ciljY+ciljVisina));
        });
        if (sveUcilju && flock.length>0) {
            zavrsiLevel();
            levelZavrsen=true;
        }
}

function zavrsiLevel(){
    
    trenutniLevel++;
    if (trenutniLevel>2) { 
        obavijestDivKraj.html("<h1>CONGRATULATIONS!</h1><p>You have successfully guided all sheep home!</p>");
        obavijestDivKraj.show();
        
    }
    else{
        obavijestDivKraj.show();
    }
}