document.querySelector('#firstDraw').addEventListener('click', firstDraw)
document.querySelector('#hitMe').addEventListener('click', hitMe)
document.querySelector('#stand').addEventListener('click', stand)
document.querySelector('#doubleDown').addEventListener('click', doubleDown)

const url = 'https://deckofcardsapi.com/api/deck/new/shuffle/'

deck = ''
playerScore = 0
dealerScore = 0
map = new Map([['1',1],['2',2],['3',3],['4',4],['5',5],['6',6],['7',7],['8',8],['9',9],['10',10],['JACK',10],['QUEEN',10],['KING',10],['ACE',11]])

fetch(url)
.then(res => res.json()) // parse response as JSON
.then(data => {
  //console.log(data)
  deck = data.deck_id
  console.log(deck)
  document.querySelector('#remainingCards').innerText = data.remaining
})
.catch(err => {
    console.log(`error ${err}`)
})

function firstDraw(){
    fetch(`https://deckofcardsapi.com/api/deck/${deck}/draw/?count=4`)
    .then(res => res.json()) 
    .then(data => {
        dealerHand = []
        playerHand = []
        eraseCards()
        playerHand.push(map.get(data.cards[0].value))
        playerHand.push(map.get(data.cards[1].value))
        playerScore = playerHand.reduce((a,b)=>a+b)
        dealerHand.push(map.get(data.cards[2].value))
        dealerHand.push(map.get(data.cards[3].value))
        dealerScore = dealerHand.reduce((a,b)=>a+b)

        document.querySelector('#playerCardOne').src = data.cards[0].image
        document.querySelector('#playerCardTwo').src = data.cards[1].image
        document.querySelector('#dealerCardOne').src = data.cards[2].image
        document.querySelector('#dealerCardTwo').src = data.cards[3].image

        document.querySelector('#playButtons').style.display = 'flex'

        document.querySelector('#remainingCards').innerText = data.remaining
        if(playerScore == 21)  document.querySelector('#playerScore').innerText = 'BLACKJACK'
        else document.querySelector('#playerScore').innerText = playerScore
        if(dealerScore == 21)  document.querySelector('#dealerScore').innerText = 'BLACKJACK'
        else document.querySelector('#dealerScore').innerText = dealerScore
    })
    .catch(err => {
        console.log(`error ${err}`)
    })
}

function hitMe(){
    fetch(`https://deckofcardsapi.com/api/deck/${deck}/draw/?count=1`)
    .then(res => res.json()) 
    .then(data => {
        playerHand.push(map.get(data.cards[0].value))
        playerScore = playerHand.reduce((a,b)=>a+b)
        document.querySelector('#playerScore').innerText = playerScore
        
        if(playerHand.length == 3){
            document.querySelector('#playerCardThree').src = data.cards[0].image
            document.querySelector('#playerCardThree').style.display = 'block'
        }
        if(playerHand.length == 4){
            document.querySelector('#playerCardFour').src = data.cards[0].image
            document.querySelector('#playerCardFour').style.display = 'block'
        }
        if(playerHand.length == 5){
            document.querySelector('#playerCardFive').src = data.cards[0].image
            document.querySelector('#playerCardFive').style.display = 'block'
        }
        if(playerScore > 21){
            if(playerHand.includes(11)) {
                playerScore -= 10
                playerHand[playerHand.indexOf(11)] = 1
            }
            else {
                document.querySelector('#playerScore').innerText = playerScore + ' BUSTED!'
                document.querySelector('#playButtons').style.display = 'none'
            }
        }
        
        document.querySelector('#remainingCards').innerText = data.remaining
    })
    .catch(err => {
        console.log(`error ${err}`)
    })
}
i = 0
function stand(){
    fetch(`https://deckofcardsapi.com/api/deck/${deck}/draw/?count=1`)
    .then(res => res.json()) 
    .then(data => {
        dealerHand.push(map.get(data.cards[0].value))
        console.log(dealerScore < 21, i)
        document.querySelector('#remainingCards').innerText = data.remaining
        dealerScore = dealerHand.reduce((a,b)=>a+b)
        document.querySelector('#dealerScore').innerText = dealerScore
        if(dealerHand.length == 3){
            document.querySelector('#dealerCardThree').src = data.cards[0].image
            document.querySelector('#dealerCardThree').style.display = 'block'
        }
        if(dealerHand.length == 4){
            document.querySelector('#dealerCardFour').src = data.cards[0].image
            document.querySelector('#dealerCardFour').style.display = 'block'
        }
        if(dealerHand.length == 5){
            document.querySelector('#dealerCardFive').src = data.cards[0].image
            document.querySelector('#dealerCardFive').style.display = 'block'
        }
    })
    .catch(err => {
        console.log(`error ${err}`)
    })
    
}
function eraseCards(){
    document.querySelector('#playerCardThree').style.display = 'none'
    document.querySelector('#playerCardFour').style.display = 'none'
    document.querySelector('#playerCardFive').style.display = 'none'
    document.querySelector('#dealerCardThree').style.display = 'none'
    document.querySelector('#dealerCardFour').style.display = 'none'
    document.querySelector('#dealerCardFive').style.display = 'none'
}