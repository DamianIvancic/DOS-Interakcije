
let correctApostropheIdxs = new Map();
let currentApostropheIdxs = new Map();

setup();

function setup(){

    let sentences = textData;
    for(i=0; i<sentences.length; i++){

        let apostropheIdx = sentences[i].indexOf("'");
        correctApostropheIdxs.set(fileID+"sentence"+i, apostropheIdx);
        sentences[i] = sentences[i].replace("'", "");
  
        let parent = document.createElement("p");

        let ordinal = document.createElement("span");
        ordinal.innerHTML = i+1 +") ";
        parent.appendChild(ordinal);

        let characters = sentences[i].split("");
        for(let char of characters){
            let element = document.createElement("span");
            element.className = fileID + "sentence"+ i;
            element.innerHTML = char;
            element.onclick = insertApostrophe;
            parent.appendChild(element);
        }
      
        document.body.appendChild(parent);
    } 


    let buttonParent = document.createElement('span');
    let checkButton = document.createElement('button');
    checkButton.setAttribute("id", fileID+"check");
    checkButton.innerHTML = "Check";
    checkButton.onclick = verifyResult;
    buttonParent.appendChild(checkButton);
    let resetButton = document.createElement('button');
    resetButton.setAttribute("id", fileID+"reset");
    resetButton.innerHTML = "Reset";
    resetButton.onclick = reset;
    buttonParent.appendChild(resetButton);
    document.body.appendChild(buttonParent);

    let result = document.createElement('p');
    result.setAttribute("id", fileID+"result");
    document.body.appendChild(result);
}

function insertApostrophe(event){
   
    let spans = document.getElementsByClassName(event.srcElement.className);

    for(i=0; i<spans.length; i++){

        if(spans[i].innerHTML.includes("'"))
           spans[i].innerHTML = spans[i].innerHTML.replace("'", "");

        if(spans[i] == event.srcElement)
            currentApostropheIdxs.set(event.srcElement.className, i+1);
            
    }

    event.srcElement.innerHTML += "'";
}

function verifyResult(){

    let result = document.getElementById(fileID+'result');
    
    if(currentApostropheIdxs.size == correctApostropheIdxs.size){

        for(let key of currentApostropheIdxs.keys()){

            if(currentApostropheIdxs.get(key) != correctApostropheIdxs.get(key)){
                result.innerHTML = "One or more apostrophes are placed in the wrong position.";
                return;
            }            
        }

        result.innerHTML = "Correct! Good job.";
    }
    else{
        result.innerHTML = "You need to place an apostrophe into each of the sentences.";
    }
}

function reset(){

    currentApostropheIdxs.clear();

    let sentences = textData;
    for(i=0; i<sentences.length; i++){

        let characters = document.getElementsByClassName(fileID+"sentence"+i);
        for(let char of characters){

            if(char.innerHTML.includes("'")){
                char.innerHTML = char.innerHTML.replace("'", "");
            }
        }  
    } 

    let result = document.getElementById(fileID+'result');
    result.innerHTML = "You need to place an apostrophe into each of the sentences.";
}
