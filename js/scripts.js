var idValue;

function Cell(bomb, id) {
  this.isBomb = bomb;
  this.adjValue = 0;
  this.cellId = id;
  this.bombsTouching = 1;
}

var a0 = new Cell(true, 0);
var a1 = new Cell(false, 1);
var a2 = new Cell(true, 2);
var b0 = new Cell(false, 3);
var b1 = new Cell(false, 4);
var b2 = new Cell(false, 5);
var c0 = new Cell(true, 6);
var c1 = new Cell(false, 7);
var c2 = new Cell(true, 8);
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
    var nw = x - (base + 1);
    var n = x - base;
    var ne = x - (base - 1);
    var w = x - 1;
    var e = x + 1;
    var sw = x + (base - 1);
    var s = x + base;
    var se = x + (base + 1);
    allCells.push(nw);
    allCells.push(n);
    allCells.push(ne);
    allCells.push(w);
    allCells.push(e);
    allCells.push(sw);
    allCells.push(s);
    allCells.push(se);
    console.log(allCells);
    if (x < base) {
      allCells.splice(allCells.indexOf(nw), 1);
      allCells.splice(allCells.indexOf(n), 1);
      allCells.splice(allCells.indexOf(ne), 1);
      console.log(allCells);
    }
    if (x >= base * (base - 1)) {
      allCells.splice(allCells.indexOf(sw), 1);
      allCells.splice(allCells.indexOf(s), 1);
      allCells.splice(allCells.indexOf(se), 1);
    }
    if (x % base === base - 1) {
      if (allCells.indexOf(ne) !== -1) {
        allCells.splice(allCells.indexOf(ne), 1);
      }
      allCells.splice(allCells.indexOf(e), 1);
      if (allCells.indexOf(se) !== -1) {
        allCells.splice(allCells.indexOf(se), 1);
      }
      console.log(allCells);
    }
    if (x % base === 0) {
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

$(document).ready(function() {
  console.log(touchCells);
  var array = surroundingCells();
  console.log(array);
  for (i = 0; i < cellArray.length; i++) {
    if (cellArray[i].isBomb) {
      $("#" + cellArray[i].cellId).addClass("has-bomb");
    }
  }
  var stateOfGame = true;
  $(".minesweeper-game").contextmenu(function() {
    return false;
  });
  $(".cell").mousedown(function(event) {
    if (stateOfGame === true) {
      switch (event.which) {
        case 1:
        //Alt function
        idValue = $(this).attr("id");
        if ($(this).hasClass("has-bomb")){
          $(".flag").removeClass("flag");
          $(".has-bomb").addClass("bomb-clicked");
          stateOfGame = false;
        } else if ($(this).hasClass("flag")) {
          break;
        } else {
          $(this).addClass("clicked-on");
          //shows the adjacency value when a cell is clicked on
          if (cellArray[idValue].adjValue > 0) {
            $(this).text(cellArray[idValue].adjValue);
          }
        }
        break;

        case 3:
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
