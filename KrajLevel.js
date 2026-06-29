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
    obavijestDivKraj.show();
}