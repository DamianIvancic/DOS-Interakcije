

let check = document.createElement('button');
check.setAttribute("id", fileID+"check");
check.innerHTML = "Check";
check.onclick = verifyResult;

let result = document.createElement("p");
result.setAttribute("id", fileID +"result");
result.innerHTML = "The result will be displayed here.";

document.body.appendChild(check);
document.body.appendChild(result);

function select(){

    if(!event.srcElement.selected){
        event.srcElement.style.backgroundColor = "#7FFFD4";
        event.srcElement.selected = true;
    }
    else{
        event.srcElement.style.backgroundColor = "#FFFFFF"
        event.srcElement.selected = false;
    } 
}

function verifyResult(){

    let sentences = document.getElementsByClassName("sentence");
    let selected = [];

    for(i=0; i<sentences.length; i++){

        if(sentences[i].selected == true) {
            selected.push(i);
        }
    }

    if(selected.length == correctIdxs.length){

        for(i=0; i<selected.length; i++){
            if(selected[i] != correctIdxs[i]){
                result.innerHTML = "Some of the sentences you picked are not correct!";
                return;
            }
        }
        result.innerHTML = "Correct!";
    } 
    else if(selected.length == 0) { 
        result.innerHTML = "You need to select the correct sentences by clicking on them!";
    } 
    else  {
        result.innerHTML = "That's not it!";
    }
}