const PASSLIST = 'passlist';

let src =[
    
]

function getWinner({src}) {
    const toRandom = new Uint32Array(src.length);
    window.crypto.getRandomValues(toRandom);
    const winningElementIndex = toRandom.reduce((a,v,i)=>{ return v>a[0] ? [v,i] : a }, [Number.NEGATIVE_INFINITY, null])[1];
    return src[winningElementIndex];
}

function getSrcFromUrl(){
    return (new URLSearchParams( (new URL(window.location)).search )).get('src')
}

function getCategoryFromUrl(){
    return (new URLSearchParams( (new URL(window.location)).search )).get('cat') ?? 'None'
}

function assignCategoryToTitle({category}){
    document.getElementById('cat').innerText = category;
}

function assignWinner({winner}){
    document.getElementById('winner').innerText = winner;
}


function assignUrlToLocal(){
    src = JSON.parse( atob( getSrcFromUrl() ) );
}

function addToList({value}) {
    src.push(value);
    const newURL = new URL(window.location.href);
    const newParams = new URLSearchParams(newURL.search);
    newParams.set('src', btoa(JSON.stringify(src)));
    newURL.search = newParams.toString();
    window.location.href = newURL.href;
}

function getPassList(){
    const rawPass = sessionStorage.getItem(PASSLIST);
    let passArray = [];
    try {
        passArray = JSON.parse(rawPass);
        return passArray ?? [];
    }
    catch(e) {
        console.warn('Invalid passlist in sessionStorage at: ', PASSLIST);
        return [];
    }
}

function setPassList({newPassList}){
    if(!newPassList) {
        console.warn('missing newPassList');
        console.trace();
    }
    try{
      const passListJSONString = JSON.stringify(newPassList);
      sessionStorage.setItem(PASSLIST, passListJSONString);  
    }
    catch(e){
        console.warn('error stringifying passlist', e);
        console.trace();
    }
}


function roll({overrideSrc}={}) {
    const localSrc = overrideSrc || src;
    const dismissed = getPassList();
    const validCandidates /*Have not been dismissed*/ = localSrc.filter(
        (v)=>{
            return !(!!(~dismissed.indexOf(v)));
        }
    );
    
    const winner = getWinner({src: validCandidates});
    return winner;
}

assignUrlToLocal();
assignCategoryToTitle({category: getCategoryFromUrl() ?? 'None'});
assignWinner({winner: roll()});
const frag = new DocumentFragment();
src.forEach((v)=>{
    const li = document.createElement('li');
    li.innerText = v;
    frag.append(li);
});
document.getElementById('universe').append(frag);
document.getElementById('newoption').addEventListener('click', (evt)=>{
    evt.preventDefault();
    const {value} = document.getElementById('newtext');
    addToList({value});
});
document.getElementById('reroll').addEventListener('click', (evt)=>{
    evt.preventDefault();
    const {innerText: value} = document.getElementById('winner');
    setPassList({newPassList: [...getPassList(), value]});
    assignWinner({winner: roll()});
});
document.getElementById('reset').addEventListener('click', (evt)=>{
    evt.preventDefault();
    setPassList({newPassList: []});
})
