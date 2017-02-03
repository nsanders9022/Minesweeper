var idValue;
var cellArray = [];
var difficulty;
var base;
var numberOfBombs;
var bombCount;

//Object constructor for cell objects
function Cell(bomb, id) {
  this.isBomb = bomb;
  this.adjValue = 0;
  this.cellId = id;
  this.iterator = 0;
}

Cell.prototype.neighborhood = function() {
  var neighbors = [];
    var cell = this.cellId;
    var nw = cell - (base + 1);
    var n = cell - base;
    var ne = cell - (base - 1);
    var w = cell - 1;
    var e = cell + 1;
    var sw = cell + (base - 1);
    var s = cell + base;
    var se = cell + (base + 1);
    neighbors.push(nw);
    neighbors.push(n);
    neighbors.push(ne);
    neighbors.push(w);
    neighbors.push(e);
    neighbors.push(sw);
    neighbors.push(s);
    neighbors.push(se);
    if (cell < base) {
      neighbors.splice(neighbors.indexOf(nw), 1);
      neighbors.splice(neighbors.indexOf(n), 1);
      neighbors.splice(neighbors.indexOf(ne), 1);
    }
    if (cell >= base * (base - 1)) {
      neighbors.splice(neighbors.indexOf(sw), 1);
      neighbors.splice(neighbors.indexOf(s), 1);
      neighbors.splice(neighbors.indexOf(se), 1);
    }
    if (cell % base === base - 1) {
      if (neighbors.indexOf(ne) !== -1) {
        neighbors.splice(neighbors.indexOf(ne), 1);
      }
      neighbors.splice(neighbors.indexOf(e), 1);
      if (neighbors.indexOf(se) !== -1) {
        neighbors.splice(neighbors.indexOf(se), 1);
      }
    }
    if (cell % base === 0) {
      if (neighbors.indexOf(nw) !== -1) {
        neighbors.splice(neighbors.indexOf(nw), 1);
      }
      neighbors.splice(neighbors.indexOf(w), 1);
      if (neighbors.indexOf(sw) !== -1) {
        neighbors.splice(neighbors.indexOf(sw), 1);
      }
    }
    return neighbors;
  }

//Object constructor for difficulty levels
function Level(cells, bombs) {
  this.cellCount = cells;
  this.bombs = bombs;
}

var beginner = new Level(81, 10);
var intermediate = new Level(256, 40);
var expert = new Level(484, 99);

//function to create new Cell objects
var createObjects = function(userNumber) {
  for (q = 0; q < userNumber; q++) {
    var newCell = new Cell(false, q);
    cellArray.push(newCell);
  }
  base = Math.sqrt(cellArray.length);
}

//creates random numbers for bomb objects' cell ids
function getRandomBombs() {
  var randomNumbers = [];
  // numberOfBombs = Math.round(cellArray.length / 6);
  bombCount = numberOfBombs;
  for(m = 0; randomNumbers.length < numberOfBombs; m++) {
    var oneRandomBomb = Math.floor(Math.random() * cellArray.length);
    if(randomNumbers.indexOf(oneRandomBomb) == -1) {
      randomNumbers.push(oneRandomBomb);
    }
  }
  console.log(randomNumbers);
  return randomNumbers;
}

//changes isBomb to true for objects with cellId equal to random number
var bombCells = function() {
  var randomBombs = getRandomBombs();
  for (k = 0; k < randomBombs.length; k++) {
    for (n = 0; n < cellArray.length; n++) {
      if(cellArray[n].cellId === randomBombs[k]) {
        cellArray[n].isBomb = true;
      }
    }
  }
  return randomBombs;
}

//Finds cell ids of each of the cells neighboring a bomb
var touch = function() {
  var bId = bombCells();
  var bombNeighbors = [];
  for (l = 0; l < bId.length; l++) {
    var oneBomb = bId[l];
    var oneBombNeighbors = cellArray[oneBomb].neighborhood();
    for (r = 0; r < oneBombNeighbors.length; r++) {
      bombNeighbors.push(oneBombNeighbors[r]);
    }
  }
  return bombNeighbors;
}

//adds 1 to adjacency value for each bomb a cell is touching
var surroundingCells = function() {
  var touchCells = touch();
  var array = [];
  for (i = 0; i < cellArray.length; i++) {
    for (j = 0; j < touchCells.length; j++) {
      if(cellArray[i].cellId === touchCells[j]) {
        cellArray[i].adjValue +=1;
        array.push(cellArray[i]);
      }
    }
  }
  return array;
}

//User Interface Logic
$(document).ready(function() {
  $("#beginner").click(function(){
    createGame(beginner);
    $("#screen-overlay").hide();
    $(".container").show();
    $("#final").show();
    $(".minesweeper-game, .bomb-count, #reload-page").addClass("beginner");
  })

  $("#intermediate").click(function(){
    createGame(intermediate);
    $("#screen-overlay").hide();
    $(".container").show();
    $("#final").show();
        $(".minesweeper-game, .bomb-count, #reload-page").addClass("intermediate");
  })

  $("#expert").click(function(){
    createGame(expert);
    $("#screen-overlay").hide();
    $(".container").show();
    $("#final").show();
        $(".minesweeper-game, .bomb-count, #reload-page").addClass("expert");
  })

  var createGame = function(mode) {
    numberOfBombs = mode.bombs;
    difficulty = mode.cellCount;
    createObjects(difficulty);
    surroundingCells();

    $("#reload-page").click(function(){
      location.reload();
    })

    //Shows bomb counter
    $("#show-bomb-count").text(bombCount);

    //these two for loops make the grid
    for(var x = 0; x < base; x++) {
      var row = $("<div class='row'></div>");
      $(".minesweeper-game").append(row);
    }
    for(var y = 0; y < base; y++) {
      var cell = $("<div class='cell'></div>");
      $(".row").append(cell);
    }

    //gives each cell div an id of 0 incremented by 1
    function setIDs() {
      var divs = document.getElementsByClassName('cell');
      for(var p=0; p<divs.length; p++) {
        divs[p].id = p;
      }
    }
    setIDs();

    //Adds "has-bomb" class to cells
    for (i = 0; i < cellArray.length; i++) {
      if (cellArray[i].isBomb) {
        $("#" + cellArray[i].cellId).addClass("has-bomb");
      }
    }

    //Not game over
    var stateOfGame = true;

    //Removes right-click context menu on game
    $(".minesweeper-game").contextmenu(function() {
      return false;
    });

    /////////////////////////////////////////////////////////////////////////////////////

    var clickExpander = function(clickedOn) {
      var clickedOnNeighborhoods = [];
      clickedOnNeighborhoods.push(clickedOn);

      for (r = 0; r < clickedOnNeighborhoods.length; r++) {
        var cellClicked = cellArray[clickedOnNeighborhoods[r]];
        if (cellClicked.adjValue === 0) {
          var neighbor = cellClicked.neighborhood();
          for (s = 0; s < neighbor.length; s++) {
            if (clickedOnNeighborhoods.indexOf(neighbor[s]) === -1) {
              clickedOnNeighborhoods.push(neighbor[s]);
            }
          }
        }
      }

      for (t = 0; t < clickedOnNeighborhoods.length; t++) {
        var revealCell = cellArray[clickedOnNeighborhoods[t]];
        $("#" + revealCell.cellId).addClass("clicked-on");
        if (revealCell.adjValue > 0) {
          $("#" + revealCell.cellId).text(revealCell.adjValue);
        }
      }
      console.log(clickedOnNeighborhoods);
      return clickedOnNeighborhoods;
    }

    //click listener
    $(".cell").mousedown(function(event) {
      if (stateOfGame === true) {
        switch (event.which) {

          //On left click
          case 1:
          idValue = parseInt($(this).attr("id"));
          //If you left-click on a bomb, they all show up and game over
          if ($(this).hasClass("flag")){
            break;
            //If you left-click on a flag, nothing happens
          } else if ($(this).hasClass("has-bomb")) {
            $(".flag").removeClass("flag");
            $(".has-bomb").addClass("bomb-clicked");
            $("#win-lose").show();
            $("#win-lose").text("You lose");
            stateOfGame = false;
            //If you click on an empty space, it gains class "clicked-on"
          } else {
            //Down
            if (cellArray[idValue].adjValue > 0) {
              $(this).addClass("clicked-on");
              //shows the adjacency value when a cell is clicked on
              $(this).text(cellArray[idValue].adjValue);
            } else {
              clickExpander(idValue);
            }
          }
          if (cellArray.length - numberOfBombs === $(".clicked-on").length) {
            $("#win-lose").show();
            $("#win-lose").text("You win");
          }

          break;

          //On Right click
          case 3:
          //Flag toggling
          if ($(this).hasClass("flag")) {
            $(this).removeClass("flag")
            bombCount += 1;
            $("#show-bomb-count").text(bombCount);
          } else if ($(this).hasClass("clicked-on")){
            break;
          } else {
            bombCount -= 1;
            $("#show-bomb-count").text(bombCount);
            $(this).addClass("flag");
          }
        }
      }
    });
  }
});
