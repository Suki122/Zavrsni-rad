
function krajLevel(ciljX,ciljY,ciljSirina,ciljVisina){
    let sveUcilju=flock.every(ovca=>{
        if(!ovca || !ovca.pozicija) return false;
        let x=ovca.pozicija.x;
        let y=ovca.pozicija.y;

        // Provjera je li ovca unutar pravokutnika
        return (x>ciljX && x<(ciljX+ciljSirina) && 
                y>ciljY && y<(ciljY+ciljVisina));
        });
        console.log(sveUcilju);
        if (sveUcilju && flock.length > 0) {
            zavrsiLevel();
        }
}

function zavrsiLevel(){
    console.log("zavrsi");
    obavijestDivKraj.show();
}