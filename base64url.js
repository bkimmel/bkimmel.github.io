function exampleTemplate({content=''}={}){
    document.body.innerHTML = `
        <style>
            
        </style>
        <header>
            <h1>Roll For: </h1>
        </header>
        <main>
        </main>
    `
}

let src =[
    "Mini Golf",
    "Animal Farm",
    "Hike Around Lake",
    "Old Mill",
    "Riverbend Park",
    "Glade Stream Valley",
    "Shaky Bridge",
    "Reston Town Center",
    "Pinball",
    "RC Racing",
    "USGS Hike",
    "Meadowlark Garden",
    "Sully Historical Site",
    "Vienna Caboose",
    "Great Falls",
    "Occoquan Village",
    "Blooms Park"
]

function getWinner({src}) {
    const toRandom = new Uint32Array(src.length);
    window.crypto.getRandomValues(toRandom);
    const winningElementIndex = toRandom.reduce((a,v,i)=>{ return v>a[0] ? [v,i] : a }, [Number.NEGATIVE_INFINITY, null])[1];
    return src[winningElementIndex];
}

function getSrc(){
    return (new URLSearchParams( (new URL(window.location)).search )).get('src')
}

// TESTS
console.log(getWinner({src}));
