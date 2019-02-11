'use strict';

(function(){
  
  var buttonPaper = document.getElementById('paperButton');
  var buttonRock = document.getElementById('rockButton');
  var buttonScissors = document.getElementById('scissorsButton');
  var howManyRounds = document.getElementById('startGame');
  var roundsMessage = document.getElementById('roundsNo');
  var gameScore = document.getElementById('result');
  var message = document.getElementById('output');
  var playerScore = 0;
  var computerScore = 0;
  var noOfRounds = 0;
  var startGame = false;
  
  message.innerHTML = 'Welcome! Press NEW GAME to start game.';
  
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
      computerScore++;
      return 'YOU LOST:';
    }
    playerScore++;
    return 'YOU WON:';
  };
  
/*win message*/
  var printResult = function (playerMove, computerMove, playerRoundResult) {
    message.innerHTML = playerRoundResult + ' you played ' + playerMove + ', computer played ' + computerMove + '.';
    gameScore.innerHTML = playerScore + ' - ' + computerScore;
    if (playerScore == noOfRounds) {
      startGame = false;
      message.innerHTML += '<br> CONGRATULATIONS! YOU WON THE ENTIRE GAME!!!';
    } else if (computerScore == noOfRounds) {
      startGame = false;
      message.innerHTML += '<br> SORRY! YOU LOST THE ENTIRE GAME!!!';
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
    if (message.innerHTML.indexOf('GAME OVER') === -1) {
      message.innerHTML += startMessage;
    };
  };
  
/*player play paper*/
  buttonPaper.addEventListener('click', function() {
    if (startGame) {
      playerDecision('PAPER');
    } else if (message.innerHTML.indexOf('Welcome') === -1) {
      notStarted();
    }
  });
  
/*player play rock*/
  buttonRock.addEventListener('click', function() {
    if (startGame) {
      playerDecision('ROCK');
    } else if (message.innerHTML.indexOf('Welcome') === -1) {
      notStarted();
    }
  });
  
/*player play scissors*/
  buttonScissors.addEventListener('click', function() {
    if (startGame) {
      playerDecision('SCISSORS');
    } else if (message.innerHTML.indexOf('Welcome') === -1) {
      notStarted();
    }
  });
  
/*number of rounds*/
  howManyRounds.addEventListener('click', function() {
    playerScore = 0;
    computerScore = 0;
    noOfRounds = window.prompt('How many rounds to win?');
    if (noOfRounds == parseInt(noOfRounds, 10) && noOfRounds > 0) {
      startGame = true;
      roundsMessage.innerHTML = 'Rounds to win game: ' + noOfRounds;
      gameScore.innerHTML = playerScore + ' - ' + computerScore;
    } else {
      alert('Please use natural number (greater than 0)!');
      startGame = false;
    }
  });

})();