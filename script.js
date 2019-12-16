document.addEventListener("DOMContentLoaded", setSessionStorage());
document.addEventListener("DOMContentLoaded", setCards());


function setSessionStorage(){
    sessionStorage.setItem('cardsChecked', '[]');
}

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
            card.setAttribute('hiddenno', deck[randNo]);
            deck.splice(randNo, 1);
            card.setAttribute("id", "card" + i);
            card.setAttribute("onclick", "revealCard(" + i + ")");
            card.setAttribute("locked", "false");
        }
        card.classList.add("card", "card-hidden"); 
        rowItem.appendChild(card);
    }
    
}

function revealCard(cardNo){
    var card = document.getElementById("card" + cardNo);
    if (card.getAttribute("locked") === "false"){
        card.setAttribute("locked", "true");
        card.classList.add("card-revealed");
        card.classList.remove("card-hidden");
        var cardsChecked = JSON.parse(sessionStorage.getItem('cardsChecked'));
        cardsChecked.push(cardNo);
        sessionStorage.setItem('cardsChecked', JSON.stringify(cardsChecked));
        if (cardsChecked.length === 2){
            var card1 =  cardsChecked[0];
            var card2 = cardsChecked[1];
            window.setTimeout(checkMatch, 1000, card1, card2);
        }
    }
}

function checkMatch(card1,card2){
    console.log('1: ' + card1 + ' 2: ' + card2)
    var card1Item = document.getElementById('card' + card1);
    card1Number = card1Item.getAttribute('hiddenno');
    var card2Item = document.getElementById('card' + card2);
    card2Number = card2Item.getAttribute('hiddenno');
    if(card1Number !== card2Number){
        card1Item.setAttribute("locked", "false");
        card2Item.setAttribute("locked", "false");
        hideCard(card1);
        hideCard(card2);
    }
    sessionStorage.setItem('cardsChecked', '[]');
}



function hideCard(cardNo) {
    
    var card = document.getElementById("card" + cardNo);
    card.classList.add("card-hidden");
    card.classList.remove("card-revealed");
    card.setAttribute("onclick", "revealCard(" + cardNo + ")");
}