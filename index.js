//Just a comment to see if push is working
var paragraph = document.getElementById('demo');
var letters = document.getElementsByClassName('letter');
var apostropheMap = new Map();

for(i=0; i<letters.length; i++)
{
    letters[i].onclick = myFunction;
    apostropheMap.set(letters[i], false);
}

function myFunction(event){

    if(apostropheMap.get(event.srcElement) == false){
        
        for(i=0; i<letters.length; i++){
            
            if(letters[i].innerHTML.includes("'"))
               letters[i].innerHTML = letters[i].innerHTML.replace("'", "");
        }

        apostropheMap.forEach(resetApostropheValues);

        event.srcElement.innerHTML += "'";
        apostropheMap.set(event.srcElement, true)
    }   
}


function resetApostropheValues(value, key, map){  
    map.set(key, false);
}
