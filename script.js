document.querySelector('button').addEventListener('click', drawCard)
const url = 'https://deckofcardsapi.com/api/deck/new/shuffle/'
dealerHand = []
playerHand = []
deck = ''
fetch(url)
.then(res => res.json()) // parse response as JSON
.then(data => {
  console.log(data)
  deck = data.deck_id
  console.log(deck)
})
.catch(err => {
    console.log(`error ${err}`)
})

function drawCard(){
    fetch(`https://deckofcardsapi.com/api/deck/${deck}/draw/?count=1`)
    .then(res => res.json()) 
    .then(data => {
        playerHand.push(data.cards[0].code)
        console.log(playerHand)

    })
    .catch(err => {
        console.log(`error ${err}`)
    })
}