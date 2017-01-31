var idValue;

function Cell(bomb, id) {
  this.isBomb = bomb;
  this.adjValue = 0;
  this.cellId = id;
  this.bombsTouching = 1;
}

var a0 = new Cell(false, 0);
var a1 = new Cell(false, 1);
var a2 = new Cell(true, 2);
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
var bombCellId = bomb[0].cellId;

var a = [a0, a1, a2];
var b = [b0, b1, b2];
var c = [c0, c1, c2];
var gameRows = [a, b, c];
var width = a.length;

// Cell.prototype.getId = function() {
//   var idCell = this.cellId;

function west(obj) {
  var surroundingCells= [];
  surroundingCells.push(obj.cellId == bombCellId-1);
  return surroundingCells;
}
var westCell = cellArray.filter(west);
//
// function west(obj) {
//   return obj.cellId == bombCellId-1;
// }
// var westCell = cellArray.filter(west);
//
// function west(obj) {
//   return obj.cellId == bombCellId-1;
// }
// var westCell = cellArray.filter(west);
// westCell[0].adjValue += 1;

//
// var west = cellArray.filter(function(obj){
//   return obj.cellId == bombCellId-1;
//   return obj.cellId == bombCellId+1;
// });


// var touching = cellArray.filter(function(obj){
//   return obj.cellId == 4;
// });
var westAdder = function() {
  for (i = 0; i <cellArray.length; i++) {
    if (cellArray[i].isBomb === true) {
      cellArray[i-1].adjValue += 1;
    }
  }
}


$(document).ready(function() {
  console.log(westCell);
  var stateOfGame = true;
  // var adjacency;
  $(".minesweeper-game").contextmenu(function() {
    return false;
  });
  // cellArray.forEach(function (i) {
  //   debugger;
  //   westAdder(cellArray.indexOf(i));
  // })
  westAdder()
  $(".cell").mousedown(function(event) {
    if (stateOfGame === true) {
      switch (event.which) {
        case 1:
        //Alt function
        idValue = $(this).attr("id");
        console.log(cellArray[idValue]);
        //Gets object based on ID of div clicked on
        // idValue = $(this).attr("id");
        // adjacency = newArray.filter(function(obj){
        //   return obj.cellId == idValue;
        // });
        // debugger;
        if ($(this).hasClass("has-bomb")){
          $(".flag").removeClass("flag");
          $(".has-bomb").addClass("bomb-clicked");
          stateOfGame = false;
        } else {
          $(this).addClass("clicked-on");
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
