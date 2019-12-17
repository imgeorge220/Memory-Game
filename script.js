document.addEventListener("DOMContentLoaded", setSessionStorage());
document.addEventListener("DOMContentLoaded", setCards());


function setSessionStorage(){
    sessionStorage.setItem('cardsChecked', '[]');
    sessionStorage.setItem('guesses', '0');
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
            var container = document.createElement("div");
            container.setAttribute("id", "middle-card");
            container.innerText = 0;
        } else {
            console.log("i: " + i + " row: " + row)
            var container = document.createElement("div");
            var card = document.createElement("div");
            var randNo = Math.floor(Math.random() * (25 - i));
            container.classList.add("card-container")
            card.setAttribute('hiddenid', deck[randNo]);
            card.setAttribute("id", "card" + i);
            card.setAttribute("onclick", "revealCard(" + i + ")");
            card.setAttribute("locked", "false");
            card.classList.add("card");
            var cardFront = document.createElement("div");
            var cardBack = document.createElement("div");
            // var icon = document.createElement("img");
            // var srcNo = Math.floor(deck[randNo]) + ".png";
            // icon.setAttribute("src", srcNo);
            // icon.classList.add("card-image")
            cardFront.classList.add("card-hidden", "card-flipping");
            cardBack.classList.add("card-revealed", "card-flipping");
            // cardBack.appendChild(icon);
            cardBack.innerText = "FLIPPED!";
            card.appendChild(cardFront);
            card.appendChild(cardBack);
            deck.splice(randNo, 1);
            container.appendChild(card);
        }
        rowItem.appendChild(container);
    }
    
}

function revealCard(cardNo){
    var card = document.getElementById("card" + cardNo);
    if (card.getAttribute("locked") === "false"){
        card.setAttribute("locked", "true");
        card.classList.add("flipped");
        var cardsChecked = JSON.parse(sessionStorage.getItem('cardsChecked'));
        cardsChecked.push(cardNo);
        sessionStorage.setItem('cardsChecked', JSON.stringify(cardsChecked));
        if (cardsChecked.length % 2 === 0){
            var card1 =  cardsChecked[cardsChecked.length-2];
            var card2 = cardsChecked[cardsChecked.length-1];
            sessionStorage.setItem('guesses', Number(sessionStorage.getItem('guesses')) + 1);
            document.getElementById('middle-card').innerText = sessionStorage.getItem('guesses');
            window.setTimeout(checkMatch, 1200, card1, card2);
        }
    }
}

function checkMatch(card1,card2){
    var card1Item = document.getElementById('card' + card1);
    card1Number = card1Item.getAttribute('hiddenid');
    var card2Item = document.getElementById('card' + card2);
    card2Number = card2Item.getAttribute('hiddenid');
    if(card1Number !== card2Number){
        card1Item.setAttribute("locked", "false");
        card2Item.setAttribute("locked", "false");
        hideCard(card1);
        hideCard(card2);
    }
}

function hideCard(cardNo) {
    var card = document.getElementById("card" + cardNo);
    card.classList.remove("flipped");
}