'use strict';

(function(){
  
  var params = {
    howManyRounds: document.getElementById('startGame'), 
    roundsMessage: document.getElementById('roundsNo'), 
    gameScore: document.getElementById('result'), 
    message: document.getElementById('output'), 
    scoreMessage: document.getElementById('scoreOutput'), 
    playerScore: 0, 
    computerScore: 0, 
    noOfRounds: 0, 
    startGame: false
  };
  var playerChoice = document.querySelectorAll('.player-move');
  var overlayShow = document.getElementById('modal-overlay');
  var scoreShow = document.getElementById('modal-score');
  var closeButtons = document.querySelectorAll('.modal .close');
  var modals = document.querySelectorAll('.modal');
  
  params.message.innerHTML = 'Welcome! Press NEW GAME to start game.';
  
/*computer move*/
  var computerMoveGenerator = function () {
    var computerMove = Math.floor(Math.random() * 5 + 1);
    if (computerMove == 1) {
      return 'PAPER';
    } else if (computerMove == 2) {
      return 'ROCK';
    } else if (computerMove == 3) {
      return 'SCISSORS';
    } else if (computerMove == 4) {
      return 'LIZARD';
    }
    return 'SPOCK';
  };
  
/*round winner*/
  var playerResult = function (playerMove, computerMove) {
    if (computerMove == playerMove) {
      return 'DRAW:';
    } else if (
      (computerMove === 'PAPER' && (playerMove === 'ROCK' || playerMove === 'SPOCK')) ||
      (computerMove === 'ROCK' && (playerMove === 'SCISSORS' || playerMove === 'LIZARD')) ||
      (computerMove === 'SCISSORS' && (playerMove === 'PAPER' || playerMove === 'LIZARD')) ||
      (computerMove === 'LIZARD' && (playerMove === 'SPOCK' || playerMove === 'PAPER')) ||
      (computerMove === 'SPOCK' && (playerMove === 'SCISSORS' || playerMove === 'ROCK'))
    ) {
      params.computerScore++;
      return 'YOU LOST:';
    }
    params.playerScore++;
    return 'YOU WON:';
  };
  
/*win message*/
  var printResult = function (playerMove, computerMove, playerRoundResult) {
    params.message.innerHTML = playerRoundResult + ' you played ' + playerMove + ', computer played ' + computerMove + '.';
    params.gameScore.innerHTML = params.playerScore + ' - ' + params.computerScore;
    if (params.playerScore == params.noOfRounds) {
      overlayShow.classList.add('show');
      scoreShow.classList.add('show');
      params.startGame = false;
      params.scoreMessage.innerHTML += '<br> CONGRATULATIONS! YOU WON THE GAME!!!';
    } else if (params.computerScore == params.noOfRounds) {
      overlayShow.classList.add('show');
      scoreShow.classList.add('show');
      params.startGame = false;
      params.scoreMessage.innerHTML += '<br> SORRY! YOU LOST THE GAME!!!';
    }
  };

/*player move*/
  var playerDecision = function (playerMove) {
    var computerMove = computerMoveGenerator();
    var playerRoundResult = playerResult(playerMove, computerMove);
    printResult(playerMove, computerMove, playerRoundResult);
  };
  
/*game not started*/
  var notStarted = function () {
    var startMessage = '<br>GAME OVER! Please press the NEW GAME button!'
    if (params.message.innerHTML.indexOf('GAME OVER') === -1) {
      params.message.innerHTML += startMessage;
    };
  };
  
/*player play*/
  for(var i = 0; i < playerChoice.length; i++){
    playerChoice[i].addEventListener('click', function(event) {
      if (params.startGame) {
        playerDecision(event.target.getAttribute('data-move'));
      } else if (params.message.innerHTML.indexOf('Welcome') === -1) {
        notStarted();
      }
    });
  };
  
/*number of rounds*/
  params.howManyRounds.addEventListener('click', function() {
    params.playerScore = 0;
    params.computerScore = 0;
    overlayShow.classList.remove('show');
    scoreShow.classList.remove('show');
    params.scoreMessage.innerHTML = '';
    params.noOfRounds = window.prompt('How many rounds to win?');
    if (params.noOfRounds == parseInt(params.noOfRounds, 10) && params.noOfRounds > 0) {
      params.startGame = true;
      params.roundsMessage.innerHTML = 'Rounds to win game: ' + params.noOfRounds;
      params.gameScore.innerHTML = params.playerScore + ' - ' + params.computerScore;
    } else {
      alert('Please use natural number (greater than 0)!');
      params.startGame = false;
    }
  });

/*close modal*/
  var hideModal = function(event) {
    event.preventDefault();
    document.querySelector('#modal-overlay').classList.remove('show');
  };
  for(var i = 0; i < closeButtons.length; i++) {
    closeButtons[i].addEventListener('click', hideModal);
  };
  document.querySelector('#modal-overlay').addEventListener('click', hideModal);
  for(var i = 0; i < modals.length; i++) {
    modals[i].addEventListener('click', function(event) {
      event.stopPropagation();
    })};

})();