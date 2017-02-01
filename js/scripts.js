var idValue;

function Cell(bomb, id) {
  this.isBomb = bomb;
  this.adjValue = 0;
  this.cellId = id;
}

var cellArray = [];

var createObjects = function() {
  for (q = 0; q < 36; q++) {
    var newCell = new Cell(false, q);
    cellArray.push(newCell);
  }
}
createObjects();

var base = Math.sqrt(cellArray.length);
var numberOfBombs = Math.round(cellArray.length / 4);
console.log(base);

//creates random numbers for bomb objects' cell ids
function getRandomBombs() {
  var randomNumbers = [];
  for(m = 0; randomNumbers.length < numberOfBombs; m++) {
    var oneRandomBomb = Math.floor(Math.random() * cellArray.length);
    if(randomNumbers.indexOf(oneRandomBomb) == -1) {
      randomNumbers.push(oneRandomBomb);
    }
  }
  return randomNumbers;
}
var randomBombs = getRandomBombs();

//changes isBomb to true for objects with cellId equal to random number
var bombCells = function() {
  for (k = 0; k < randomBombs.length; k++) {
    for (n = 0; n < cellArray.length; n++) {
      if(cellArray[n].cellId === randomBombs[k]) {
        cellArray[n].isBomb = true;
      }
    }
  }
  return randomBombs;
}
var bId = bombCells();

//calculates how many bombs a cell is touching
var touch = function() {
  var allCells = [];
  for (l = 0; l < bId.length; l++) {
    var z = bId[l];
    var nw = z - (base + 1);
    var n = z - base;
    var ne = z - (base - 1);
    var w = z - 1;
    var e = z + 1;
    var sw = z + (base - 1);
    var s = z + base;
    var se = z + (base + 1);
    allCells.push(nw);
    allCells.push(n);
    allCells.push(ne);
    allCells.push(w);
    allCells.push(e);
    allCells.push(sw);
    allCells.push(s);
    allCells.push(se);
    if (z < base) {
      allCells.splice(allCells.indexOf(nw), 1);
      allCells.splice(allCells.indexOf(n), 1);
      allCells.splice(allCells.indexOf(ne), 1);
    }
    if (z >= base * (base - 1)) {
      allCells.splice(allCells.indexOf(sw), 1);
      allCells.splice(allCells.indexOf(s), 1);
      allCells.splice(allCells.indexOf(se), 1);
    }
    if (z % base === base - 1) {
      if (allCells.indexOf(ne) !== -1) {
        allCells.splice(allCells.indexOf(ne), 1);
      }
      allCells.splice(allCells.indexOf(e), 1);
      if (allCells.indexOf(se) !== -1) {
        allCells.splice(allCells.indexOf(se), 1);
      }
    }
    if (z % base === 0) {
      if (allCells.indexOf(nw) !== -1) {
        allCells.splice(allCells.indexOf(nw), 1);
      }
      allCells.splice(allCells.indexOf(w), 1);
      if (allCells.indexOf(sw) !== -1) {
        allCells.splice(allCells.indexOf(sw), 1);
      }
    }
  }
  return allCells;
}
var touchCells = touch();

//adds 1 to adjacency value for each bomb a cell is touching
var surroundingCells = function() {
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
  console.log(bId);
//these two for loops make the grid
  for(var x = 0; x < 6; x++) {
    var row = $("<div class='row'></div>");
    $(".container").append(row);
  }
  for(var y = 0; y < 6; y++) {
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

  var array = surroundingCells();
  //Adds "has-bomb" class to cells
  for (i = 0; i < cellArray.length; i++) {
    if (cellArray[i].isBomb) {
      $("#" + cellArray[i].cellId).addClass("has-bomb");
    }
  }
  var stateOfGame = true;
  //Removes right-click context menu on game
  $(".minesweeper-game").contextmenu(function() {
    return false;
  });
  //click listener
  $(".cell").mousedown(function(event) {
    if (stateOfGame === true) {
      switch (event.which) {

        //On left click
        case 1:
        idValue = $(this).attr("id");
        //If you left-click on a bomb, they all show up and game over
        if ($(this).hasClass("has-bomb")){
          $(".flag").removeClass("flag");
          $(".has-bomb").addClass("bomb-clicked");
          stateOfGame = false;
          //If you left-click on a flag, nothing happens
        } else if ($(this).hasClass("flag")) {
          break;
          //If you click on an empty space, it gains class "clicked-on"
        } else {
          //Down
          for (i = parseInt($(this).attr("id")); i < cellArray.length; i += base) {
            if (cellArray[i].adjValue === 0) {
              $("#" + i).addClass("clicked-on");
            } else {
              $("#" + i).addClass("clicked-on");
              $("#" + i).text(cellArray[i].adjValue);
              break;
            }
          }
          // $(this).addClass("clicked-on");
          //shows the adjacency value when a cell is clicked on
          if (cellArray[idValue].adjValue > 0) {
            $(this).text(cellArray[idValue].adjValue);
          }
        }
        break;

        //On Right click
        case 3:
        //Flag toggling
        if ($(this).hasClass("flag")) {
          $(this).removeClass("flag")
        } else if ($(this).hasClass("clicked-on")){
          break;
        } else {
          $(this).addClass("flag");
        }
      }
    }
  });
});
