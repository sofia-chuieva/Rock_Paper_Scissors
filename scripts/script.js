
const buttons = document.querySelectorAll('.btn-circle');
const main = document.getElementById('main');
const selection = document.getElementById('selection');
const playAgain = document.getElementById('play-again');
const userSelect = document.getElementById('user-select');
const computerSelect = document.getElementById('computer-select');
const winner = document.getElementById('win');
const resetScoreBtn = document.getElementById('btn-reset-score');
const btnRules = document.getElementById('btn-rules');
const changeModeBtn = document.querySelector('.btn-advanced');
const image = document.getElementById('rules-img');
const container = document.querySelector('.container');
const modalBackground = document.getElementById('modal_bg');
const modal = document.getElementById('modal');
const closeModal = document.getElementById('close-modal');
let userChoice;
let score = 0;
const scoreElement = document.getElementById('score');


buttons.forEach(button => {
    button.addEventListener('click', () => {
         userChoice = button.getAttribute('data-choice');
         checkWinner();
    });

});

resetScoreBtn.addEventListener('click', () => {
    score = 0;
    scoreElement.innerText = score;
});

playAgain.addEventListener('click', () => {
    main.style.display = 'flex';
    selection.style.display = 'none';
});


changeModeBtn.addEventListener('click', () => {
    if(!main.classList.contains('advanced-playground')){
        changeModeBtn.innerText = 'Normal'
        container.classList.toggle('advanced');
        scoreElement.innerText = 0;

        main.classList.toggle('advanced-playground');
            
    }
    else {
        
        changeModeBtn.innerText = 'Advanced'
        container.classList.toggle('advanced');
        scoreElement.innerText = 0;
        
        main.classList.toggle('advanced-playground');
    }
      
});

function pickRandom(){
    let choices = [];
    if(!main.classList.contains('advanced-playground')){
        choices = ['paper','scissors','rock'];
    }
    else {
        choices = ['paper','scissors','rock','lizard','spock'];
    }
    return choices[Math.floor(Math.random() * choices.length)];
}

function checkWinner(){
    const computerChoice = pickRandom();

    //update the view
    updateSelection(userSelect,userChoice);
    updateSelection(computerSelect,computerChoice);

    if(userChoice == computerChoice){
        winner.innerText = 'Draw';
    } 
    else if ( (userChoice === 'rock' && computerChoice === 'scissors')
    || (userChoice === 'scissors' && computerChoice === 'paper')
    || (userChoice === 'paper' && computerChoice === 'rock')
    || (userChoice === 'rock' && computerChoice === 'lizard')
    || (userChoice === 'lizard' && computerChoice === 'spock')
    || (userChoice === 'spock' && computerChoice === 'scissors')
    || (userChoice === 'spock' && computerChoice === 'rock')
    || (userChoice === 'scissors' && computerChoice === 'lizard')
    || (userChoice === 'lizard' && computerChoice === 'paper')
    || (userChoice === 'paper' && computerChoice === 'spock'))
    {
      updateScore(1);
      winner.innerText = 'win';
    }
      
    else {
      winner.innerText = 'lost';
    }

    /*when we click on the button we hide main and display selection*/
    main.style.display = 'none';
    selection.style.display = 'flex';

}

function updateScore(value){
    score += value;
    scoreElement.innerText = score;

}

function updateSelection(selectionElement,choice){
    selectionElement.classList.remove('btn-paper');
    selectionElement.classList.remove('btn-rock');
    selectionElement.classList.remove('btn-scissors');
    selectionElement.classList.remove('btn-spock');
    selectionElement.classList.remove('btn-lizard');

    const img = selectionElement.querySelector('img');
    selectionElement.classList.add(`btn-${choice}`);
    img.src = `./images/icon-${choice}.svg`;

}

//popup
btnRules.addEventListener('click', (e) => {
     e.preventDefault();
     if(!main.classList.contains('advanced-playground')){
        image.src = './images/image-rules.svg';
     } else {
        image.src = './images/image-rules-bonus.svg';
     }
    
     modalBackground.classList.add('active');
     modal.classList.add('active');
});

closeModal.addEventListener('click', () => {
     modalBackground.classList.remove('active');
     modal.classList.remove('active');
});