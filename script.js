document.addEventListener("DOMContentLoaded", setSessionStorage());
document.addEventListener("DOMContentLoaded", setCards());
document.getElementById('reset-button').addEventListener("click", function () {location.reload();});

function setSessionStorage(){
    sessionStorage.setItem('cardsChecked', '[]');
    sessionStorage.setItem('guesses', '0');
    sessionStorage.setItem('matches', '0');
    if (localStorage.getItem('max') === null){
        localStorage.setItem("max", "100");
    }
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
            var counter = document.createElement("div");
            var max = document.createElement("div");
            var reset = document.createElement("button");
            container.setAttribute("id", "middle-card");
            counter.innerText = 0;
            counter.setAttribute("id", "counter");
            reset.innerText = "Reset";
            reset.setAttribute("id", "reset-button");
            max.innerText = "High Score: " + localStorage.getItem("max");
            max.setAttribute("id", "high-score");
            container.appendChild(reset);
            container.appendChild(counter);
            container.appendChild(max);
        } else {
            var container = document.createElement("div");
            container.classList.add("card-container");
            var card = document.createElement("div");
            var randNo = Math.floor(Math.random() * (25 - i));
            card.setAttribute('hiddenid', deck[randNo]);
            card.setAttribute("id", "card" + i);
            card.setAttribute("onclick", "revealCard(" + i + ")");
            card.setAttribute("locked", "false");
            card.classList.add("card");
            var cardFront = document.createElement("div");
            var cardBack = document.createElement("div");
            var icon = document.createElement("img");
            var srcNo = "/" + Math.floor(+ deck[randNo]) + ".png";
            icon.setAttribute("src", srcNo);
            icon.classList.add("card-image")
            cardFront.classList.add("card-hidden", "card-flipping");
            cardFront.innerText = deck[randNo];
            cardBack.classList.add("card-revealed", "card-flipping");
            cardBack.appendChild(icon);
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
            document.getElementById('counter').innerText = sessionStorage.getItem('guesses');
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
    } else {
        var matches = Number(sessionStorage.getItem("matches")) + 1;
        sessionStorage.setItem("matches", matches);
        var max = Number(localStorage.getItem("max"));
        var guesses = Number(sessionStorage.getItem("guesses"));
        if (matches === 12){
            var highScore = '';
            if(guesses < max){
                localStorage.setItem("max", guesses);
                document.getElementById("high-score").innerText = "High Score: " + guesses;
                highScore = " You got the new High Score!"
            }
            window.alert("Congratulations! It only took you " + guesses + " tries!" + highScore)
        }
    }

}

function hideCard(cardNo) {
    var card = document.getElementById("card" + cardNo);
    card.classList.remove("flipped");
}