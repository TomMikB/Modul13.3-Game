'use strict';

(function(){
  
  var params = {
    howManyRounds: document.getElementById('startGame'), 
    roundsMessage: document.getElementById('roundsNo'), 
    gameScore: document.getElementById('result'), 
    message: document.getElementById('output'), 
    playerScore: 0, 
    computerScore: 0, 
    noOfRounds: 0, 
    startGame: false
  };
  var playerChoice = document.querySelectorAll('.player-move');

//  var abc = document.getElementById('testtxt'); // do testów
  
  params.message.innerHTML = 'Welcome! Press NEW GAME to start game.';
  
/*computer move*/
  var computerMoveGenerator = function () {
    var computerMove = Math.floor(Math.random() * 3 + 1);
    if (computerMove == 1) {
      return 'PAPER';
    } else if (computerMove == 2) {
      return 'ROCK';
    }
    return 'SCISSORS';
  };
  
/*round winner*/
  var playerResult = function (playerMove, computerMove) {
    if (computerMove == playerMove) {
      return 'DRAW:';
    } else if (
      (computerMove === 'PAPER' && playerMove === 'ROCK') ||
      (computerMove === 'ROCK' && playerMove === 'SCISSORS') ||
      (computerMove === 'SCISSORS' && playerMove === 'PAPER')
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
      params.startGame = false;
      params.message.innerHTML += '<br> CONGRATULATIONS! YOU WON THE ENTIRE GAME!!!';
    } else if (params.computerScore == params.noOfRounds) {
      params.startGame = false;
      params.message.innerHTML += '<br> SORRY! YOU LOST THE ENTIRE GAME!!!';
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

})();