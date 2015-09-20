function Space(x,y) {
  this.x = x;
  this.y = y;
  this.value = "";
  this.isWinner = false;
  this.isOnDiagonal = function() {
    return ((this.x + this.y) % 2 ==0);
  };
  this.markBy = function(player) {
    this.value = player.mark;
  };
  this.clear = function() {
    this.value = "";
    this.isWinner = false;
  };
};

function Board() {
  this.spaces = [];
  for (var x = 0; x < 3; x++) {
    for (var y = 0; y< 3; y++){
      var newSpace = new Space(x,y);
      this.spaces.push(newSpace);
    }
  }
  this.space = function(x,y) {
    if (x == 1) {x=3};
    if (x == 2) {x=6};
    return this.spaces[x+y];
  };

  this.clear = function() {
    for (var s = 0; s < this.spaces.length; s++){
      this.spaces[s].clear();
    }
  };

  this.checkForWin = function(spacePlayed) {
    //check its row
    var x = spacePlayed.x;
    var val = spacePlayed.value;
    if (this.space(x,0).value == val && this.space(x,1).value == val && this.space(x,2).value == val) {
      this.space(x,0).isWinner = true;
      this.space(x,1).isWinner = true;
      this.space(x,2).isWinner = true;
      return true;
    } else {
      //check its column
      var y = spacePlayed.y;
      if ((this.space(0,y).value) == val && (this.space(1,y).value == val) &&  (this.space(2,y).value == val)) {
        this.space(0,y).isWinner = true;
        this.space(1,y).isWinner = true;
        this.space(2,y).isWinner = true;
        return true;
      } else {
        //check if on diagonal
        if (spacePlayed.isOnDiagonal()) {
          if ((this.space(0,0).value == val) && (this.space(1,1).value == val) && (this.space(2,2).value == val)) {
            this.space(0,0).isWinner = true;
            this.space(1,1).isWinner = true;
            this.space(2,2).isWinner = true;
            return true;
          } else if
          ((this.space(0,2).value == val) && (this.space(1,1).value == val) && (this.space(2,0).value == val)) {
            this.space(0,2).isWinner = true;
            this.space(1,1).isWinner = true;
            this.space(2,0).isWinner = true;
            return true;
        }
        else {
          return false;
        }
      }
    }
  }
  };
};

function Player(mark) {
  this.mark = mark;
  this.score = 0;
};

function Game() {
  this.board = new Board();
  this.player1 = new Player("X");
  this.player2 = new Player("O");
  this.players = [this.player1, this.player2];
  this.hasWinner = false;
  this.nextPlayer = this.player1;
  this.clearBoard = function() {
    this.board.clear();
    this.hasWinner = false;
  };
  this.changePlayers = function() {
    if (this.nextPlayer == this.player1) {
      this.nextPlayer = this.player2;
    } else {
      this.nextPlayer = this.player1;
    }
  };


    this.playSpace = function(player, x, y) {
      if (this.hasWinner == true) {
        return false;
      }
        var spacePlayed = this.board.space(x,y);
        if ((spacePlayed.value == "")) {
          spacePlayed.markBy(player);
          this.hasWinner = this.board.checkForWin(spacePlayed);
          if (this.hasWinner) {
            player.score += 1;
          }
          this.changePlayers();
          return true;
        } else {
          return false;
        }

    };
};




$(document).ready(function() {

  var game = new Game();
  var p1 = game.player1;
  var p2 = game.player2;
  clearBoard();
  showScore();

  function newMatch() {
    p1.score = 0;
    p2.score = 0;
    game.hasWinner = false;
    clearBoard();
    showScore();

  };

  function clearBoard() {
    game.clearBoard();
    $('#board td').each (function() {
      $(this).text("");
      $(this).removeClass("winner");
    });
    $("#next-player").html(game.nextPlayer.mark);
  };

  function showScore() {
    $('#score-X').text(p1.score);
    $('#score-O').text(p2.score);
  };

  //start new match - initialize vars
  $('#new-match').click( function() {
     newMatch();
  });

  $("#new-game").click( function() {
     clearBoard();
  });

  //play space - check for winner
  $('#board td').click(function() {
   var spaceName = this.id;
   var x = parseInt(spaceName[0]);
   var y = parseInt(spaceName[1]);
   var thisPlayer = game.nextPlayer;
   if (game.playSpace(thisPlayer,x,y)) {
    $(this).text(thisPlayer.mark);
    $("#next-player").html(game.nextPlayer.mark);
    if (game.board.checkForWin) {
      //show green for win
      game.board.spaces.forEach(function (space) {
        if (space.isWinner) {
          var spaceName = space.x.toString() + space.y.toString();
          $('td#'+ spaceName).addClass("winner");
        }
      });
      showScore();
    }
   }
  });


});
