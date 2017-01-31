var idValue;

function Cell(bomb, id) {
  this.isBomb = bomb;
  this.adjValue = 0;
  this.cellId = id;
  this.bombsTouching = 1;
}

var cell0 = new Cell(false, 0);
var cell1 = new Cell(false, 1);
var cell2 = new Cell(false, 2);
var cell3 = new Cell(false, 3);
var cell4 = new Cell(true, 4);
var cell5 = new Cell(false, 5);
var cell6 = new Cell(false, 6);
var cell7 = new Cell(false, 7);
var cell8 = new Cell(false, 8);
var cell9 = new Cell(false, 9);
var cell10 = new Cell(false, 10);
var cell11 = new Cell(false, 11);
var cell12 = new Cell(false, 12);
var cell13 = new Cell(true, 13);
var cell14 = new Cell(false, 14);
var cell15 = new Cell(false, 15);
var cell16 = new Cell(false, 16);
var cell17 = new Cell(false, 17);
var cell18 = new Cell(false, 18);
var cell19 = new Cell(false, 19);
var cell20 = new Cell(false, 20);
var cell21 = new Cell(false, 21);
var cell22 = new Cell(false, 22);
var cell23 = new Cell(false, 23);
var cell24 = new Cell(false, 24);
var cell25 = new Cell(false, 25);
var cell26 = new Cell(false, 26);
var cell27 = new Cell(false, 27);
var cell28 = new Cell(false, 28);
var cell29 = new Cell(false, 29);
var cell30 = new Cell(false, 30);
var cell31 = new Cell(false, 31);
var cell32 = new Cell(false, 32);
var cell33 = new Cell(false, 33);
var cell34 = new Cell(false, 34);
var cell35 = new Cell(false, 35);

var cellArray = [cell0, cell1, cell2, cell3, cell4, cell5, cell6, cell7, cell8, cell9, cell10, cell11, cell12, cell13, cell14, cell15, cell16, cell17, cell18, cell19, cell20, cell21, cell22, cell23, cell24, cell25, cell26, cell27, cell28, cell29, cell30, cell31, cell32, cell33, cell34, cell35];

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
