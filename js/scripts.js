function Space(x,y) {
  this.x = x;
  this.y = y;
  this.value = "";
  this.isOnDiagonal = function() {
    return ((this.x + this.y) % 2 ==0);
  };
  this.markBy = function(player) {
    this.value = player.mark;
  };
  this.clear = function() {
    this.value = "";
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
    return this.spaces[x,y];
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
    if (this.spaces[x,0].value == val && this.spaces[x,1].value == val && this.spaces[x,2].value == val) {
      return true;
    } else {
      //check its column
      var y = spacePlayed.y;
      if ((this.spaces[0,y].value) == val && (this.spaces[1,y].value == val) &&  (this.spaces[2,y].value == val)) {
        return true;
      } else {
        //check if on diagonal
        if (spacePlayed.isOnDiagonal()) {
          if (((this.spaces[0,0].value == val) && (this.spaces[1,1].value == val) && (this.spaces[2,2].value == val)) ||
          ((this.spaces[0,2].value == val) && (this.spaces[1,1].value == val) && (this.spaces[2,0].value == val)))
          return true;
        }
        else {
          return false;
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
  this.score = this.player1.score + " " + this.player2.score;
  this.clearBoard = this.board.clear();
  this.hasWinner = false;
  this.playSpace = function(player, x, y) {
    var spacePlayed = this.board.space(x,y);
    spacePlayed.markBy(player);
    this.hasWinner = this.board.checkForWin(spacePlayed);
  };
};
