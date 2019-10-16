

let correctApostropheIdxs = new Map();
let currentApostropheIdxs = new Map();

let checkButton = document.getElementById('check');
checkButton.onclick = verifyCorrectness;

document.getElementById('title').innerHTML = '<img src="Images\\checkmark.jpg">';

setup();

function setup(){

    let sentences = Object.keys(data);
    let apostropheValues = Object.values(data);

    for(i=0; i<sentences.length; i++){

        let parent = document.createElement("p");
        let characters = sentences[i].split("");

        for(let char of characters){
            let element = document.createElement("span");
            element.className = "sentence"+ i;
            element.innerHTML = char;
            element.onclick = placeApostrophe;
            parent.appendChild(element);
        }
    
        correctApostropheIdxs.set("sentence"+i, apostropheValues[i]);
        document.body.appendChild(parent);
    } 
}

function placeApostrophe(event){
   
    let spans = document.getElementsByClassName(event.srcElement.className);

    for(i=0; i<spans.length; i++){

        if(spans[i].innerHTML.includes("'"))
           spans[i].innerHTML = spans[i].innerHTML.replace("'", "");

        if(spans[i] == event.srcElement)
            currentApostropheIdxs.set(event.srcElement.className, i+1);
            
    }

    event.srcElement.innerHTML += "'";
}

function verifyCorrectness(){

    let result = document.getElementById('result');
    
    if(currentApostropheIdxs.size == correctApostropheIdxs.size){

        for(let key of currentApostropheIdxs.keys()){

            if(currentApostropheIdxs.get(key) != correctApostropheIdxs.get(key)){
                result.innerHTML = "Wrong";
                return;
            }            
        }

        result.innerHTML = "Correct";
    }
    else{
        result.innerHTML = "Wrong";
    }
}
