var idValue;

function Cell(bomb, id) {
  this.isBomb = bomb;
  this.adjValue = 0;
  this.cellId = id;
  this.bombsTouching = 1;
}

var a0 = new Cell(false, 0);
var a1 = new Cell(false, 1);
var a2 = new Cell(false, 2);
var b0 = new Cell(false, 3);
var b1 = new Cell(true, 4);
var b2 = new Cell(false, 5);
var c0 = new Cell(false, 6);
var c1 = new Cell(false, 7);
var c2 = new Cell(false, 8);
var cellArray = [a0, a1, a2, b0, b1, b2, c0, c1, c2];

function cellIsBomb(obj) {
  return obj.isBomb == true;
}
var bomb = cellArray.filter(cellIsBomb);
var base = Math.sqrt(cellArray.length);

var bombCells = function() {
  var bId = [];
  for (k = 0; k < cellArray.length; k++) {
    if(cellArray[k].isBomb === true) {
      bId.push(cellArray[k].cellId);
    }
  }
  return bId;
}
var bId = bombCells();

var touch = function() {
  var allCells = [];
  for (l = 0; l < bId.length; l++) {
    var x = bId[l];
    allCells.push(bId[l] - base);
    allCells.push(bId[l] + base);
    allCells.push(bId[l] +1);
    allCells.push(bId[l] -1);
    allCells.push(bId[l] - (base + 1));
    allCells.push(bId[l] + (base+1));
    allCells.push(bId[l] - (base-1));
    allCells.push(bId[l] + (base-1));
    }
  return allCells;
}
var touchCells = touch();

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
  var array = surroundingCells();
  console.log(array);
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
          $(this).addClass("clicked-on");
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
