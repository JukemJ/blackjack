document.querySelector('button').addEventListener('click', drawCard)
const url = 'https://deckofcardsapi.com/api/deck/new/shuffle/'
dealerHand = []
playerHand = []
deck = ''
fetch(url)
.then(res => res.json()) // parse response as JSON
.then(data => {
  //console.log(data)
  deck = data.deck_id
  console.log(deck)
})
.catch(err => {
    console.log(`error ${err}`)
})

function drawCard(){
    fetch(`https://deckofcardsapi.com/api/deck/${deck}/draw/?count=4`)
    .then(res => res.json()) 
    .then(data => {
        playerHand.push(data.cards[0].value)
        playerHand.push(data.cards[1].value)
        document.querySelector('#dealerCardOne').src = data.cards[0].image
        document.querySelector('#dealerCardTwo').src = data.cards[1].image
        document.querySelector('#remainingCards').innerText = data.remaining

        dealerHand.push(data.cards[2].code)
        dealerHand.push(data.cards[3].code)
        console.log(playerHand)
        console.log(playerHand.reduce((a,b)=>Number(a) + Number(b)))

    })
    .catch(err => {
        console.log(`error ${err}`)
    })
}