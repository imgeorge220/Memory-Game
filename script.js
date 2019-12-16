document.addEventListener("DOMContentLoaded", setCards());


function setCards(){
    var deck = [];
    for (var a = 1; a <= 12; a++){
        deck.push(a);
        deck.push(a);
    }
    for (var i = 1; i <=25; i++){
       var row = "row" + (Math.floor((i-1)/5) + 1);
       var rowItem = document.getElementById(row);
        if (i === 13) {
            var card = document.createElement("button");
            card.setAttribute("id", "middle-card");
            card.innerHTML = "MIDDLE BUTTON"
        } else {
            var card = document.createElement("button");
            var randNo = Math.floor(Math.random() * (25 - i));
            card.innerText = deck[randNo];
            deck.splice(randNo, 1);
            card.setAttribute("id", "card" + i);
            card.setAttribute("onclick", "revealCard(" + i + ")");
        }
        card.classList.add("card", "card-hidden"); 
        rowItem.appendChild(card);
    }
    
}

function revealCard(cardNo){
    var card = document.getElementById("card" + cardNo);
    card.classList.add("card-revealed");
    card.classList.remove("card-hidden");
    card.setAttribute("onclick", "hideCard(" + cardNo + ")");
}

function hideCard(cardNo) {
    var card = document.getElementById("card" + cardNo);
    card.classList.add("card-hidden");
    card.classList.remove("card-revealed");
    card.setAttribute("onclick", "revealCard(" + cardNo + ")");
}