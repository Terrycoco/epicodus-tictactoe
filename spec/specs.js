
describe('Space', function() {
  it("returns x and y coordinates", function() {
    var newSpace = new Space(0,1);
    expect(newSpace.x).to.equal(0);
    expect(newSpace.y).to.equal(1);
  });
  it("returns whether space is on Diagonal", function() {
    var newSpace = new Space(0,1);
    expect(newSpace.isOnDiagonal()).to.equal(false);
  });
});

describe("Board", function() {
  it("returns new board with 9 spaces", function() {
    var newBoard = new Board();
    expect(newBoard.spaces.length).to.equal(9);
  });
  it("returns a particular space from board", function() {
    var newBoard = new Board();
    var thisSpace = newBoard.space(0,0);
    expect(thisSpace.x).to.equal(0);
  });
});

describe("Player", function() {
  it("returns a new player either X or O", function() {
    var newPlayer = new Player("X");
    expect(newPlayer.mark).to.equal("X");
  });
});

describe("Game", function() {
  it("returns a new game with 2 players",function() {
    var newGame = new Game();
    expect(newGame.player1.mark).to.equal("X");
  });

  it("marks a specific space by a player", function() {
    var newGame = new Game();
    var player1 = newGame.player1;
    newGame.board.space(0,0).markBy(player1);
    expect(newGame.board.space(0,0).value).to.equal("X");
  });

  it("returns the score", function() {
    var newGame = new Game();
    expect(newGame.score).to.equal("0 0");
  });

  it("clears the board", function() {
    var newGame = new Game();
    var player1 = newGame.player1;
    newGame.board.space(0,0).markBy(player1);
    newGame.board.clear();
    expect(newGame.board.space(0,0).value).to.equal("");
  });

  it("starts game with no winner", function() {
    var newGame = new Game();
    var player1 = newGame.player1;
    expect(newGame.hasWinner).to.equal(false);
  });

  it("checks for win after each play", function() {
    var newGame = new Game();
    var player1 = newGame.player1;
    newGame.playSpace(player1, 0,0);
    newGame.playSpace(player1, 0,1);
    newGame.playSpace(player1, 0,2);
    expect(newGame.hasWinner).to.equal(true);
  });

});
