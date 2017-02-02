var idValue; //placeholder to get the id of the cell that's clicked on
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
  numberOfBombs = Math.round(cellArray.length / 6);
  bombCount = numberOfBombs;
  for(m = 0; randomNumbers.length < numberOfBombs; m++) {
    var oneRandomBomb = Math.floor(Math.random() * cellArray.length);
    if(randomNumbers.indexOf(oneRandomBomb) == -1) {
      randomNumbers.push(oneRandomBomb);
    }
  }
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

//creates an array full of cell id numbers that are next to bombs
var touch = function() {
  var cellsNextToBombs = [];
  var bId = bombCells();
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
    cellsNextToBombs.push(nw);
    cellsNextToBombs.push(n);
    cellsNextToBombs.push(ne);
    cellsNextToBombs.push(w);
    cellsNextToBombs.push(e);
    cellsNextToBombs.push(sw);
    cellsNextToBombs.push(s);
    cellsNextToBombs.push(se);
    if (z < base) {
      cellsNextToBombs.splice(cellsNextToBombs.indexOf(nw), 1);
      cellsNextToBombs.splice(cellsNextToBombs.indexOf(n), 1);
      cellsNextToBombs.splice(cellsNextToBombs.indexOf(ne), 1);
    }
    if (z >= base * (base - 1)) {
      cellsNextToBombs.splice(cellsNextToBombs.indexOf(sw), 1);
      cellsNextToBombs.splice(cellsNextToBombs.indexOf(s), 1);
      cellsNextToBombs.splice(cellsNextToBombs.indexOf(se), 1);
    }
    if (z % base === base - 1) {
      if (cellsNextToBombs.indexOf(ne) !== -1) {
        cellsNextToBombs.splice(cellsNextToBombs.indexOf(ne), 1);
      }
      cellsNextToBombs.splice(cellsNextToBombs.indexOf(e), 1);
      if (cellsNextToBombs.indexOf(se) !== -1) {
        cellsNextToBombs.splice(cellsNextToBombs.indexOf(se), 1);
      }
    }
    if (z % base === 0) {
      if (cellsNextToBombs.indexOf(nw) !== -1) {
        cellsNextToBombs.splice(cellsNextToBombs.indexOf(nw), 1);
      }
      cellsNextToBombs.splice(cellsNextToBombs.indexOf(w), 1);
      if (cellsNextToBombs.indexOf(sw) !== -1) {
        cellsNextToBombs.splice(cellsNextToBombs.indexOf(sw), 1);
      }
    }
  }
  return cellsNextToBombs;
}

//adds 1 to adjacency value for each bomb a cell is touching
var surroundingCells = function() {
  var touchCells = touch();
  for (i = 0; i < cellArray.length; i++) {
    for (j = 0; j < touchCells.length; j++) {
      if(cellArray[i].cellId === touchCells[j]) {
        cellArray[i].adjValue +=1;
      }
    }
  }
}

//User Interface Logic
$(document).ready(function() {
  difficulty = parseInt(prompt("25, 36 or 81?"));
  createObjects(difficulty);
  surroundingCells();

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
    var cells = document.getElementsByClassName('cell');
    for(var p=0; p<cells.length; p++) {
      cells[p].id = p;
    }
  }
  setIDs();

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
  /////////////////////////////////////////////////////////////////////////////////////
  var clickExpander = function(clicked) {
    console.log(cellArray[clicked].adjValue);
  }

  // var south = function(thisPlaceholder) {
  //   var clicked
  //   for (i = parseInt(thisPlaceholder); i < cellArray.length; i += base) {
  //     if (cellArray[i].iterator <9) {
  //       cellArray[i].iterator += 1;
  //       clickExpander(i);
  //       clickExpander(i);
  //     }
  //     if ($("#" + i).hasClass("flag")) {
  //       break;
  //     } else if (cellArray[i].adjValue === 0)  {
  //       if (cellArray[i].cellId >= base * (base-1)) {
  //         $("#" + i).addClass("clicked-on");
  //         break;
  //       } else {
  //         $("#" + i).addClass("clicked-on");
  //       }
  //     } else {
  //       $("#" + i).addClass("clicked-on");
  //       $("#" + i).text(cellArray[i].adjValue);
  //       break;
  //     }
  //   }
  // }

  //click listener
  $(".cell").mousedown(function(event) {
    idValue = parseInt($(this).attr("id"));
    if (stateOfGame === true) {
      switch (event.which) {

        //On left click
        case 1:
        clickExpander(idValue);
        //If you left-click on a bomb, they all show up and game over
        if ($(this).hasClass("has-bomb")){
          $(".has-bomb").addClass("bomb-clicked");
          $(".flag").removeClass("flag");
          stateOfGame = false;
          //If you left-click on a flag, nothing happens
        } else if ($(this).hasClass("flag")) {
          break;
          //If you click on an empty space, it gains class "clicked-on"
          // $(this).addClass("clicked-on");
        } else {
          //shows the adjacency value when a cell is clicked on
          if (cellArray[idValue].adjValue > 0) {
            $(this).addClass("clicked-on");
            $(this).text(cellArray[idValue].adjValue);
          } else {
            clickExpander(idValue);
          }
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
});




//
// var north = function(thisPlaceholder) {
//   for (i = parseInt(thisPlaceholder); i < cellArray.length; i -= base) {
//     if (cellArray[i].iterator <9) {
//       cellArray[i].iterator += 1;
//       clickExpander(i);
//       clickExpander(i);
//     }
//     console.log(cellArray[i]);
//     console.log(cellArray[i].adjValue + " cellarray.adjvalue");
//     if ($("#" + i).hasClass("flag")) {
//       break;
//     } else if (cellArray[i].adjValue === 0) {
//       if (cellArray[i].cellId < base) {
//         $("#" + i).addClass("clicked-on");
//         break;
//       } else {
//         $("#" + i).addClass("clicked-on");
//       }
//     } else {
//       $("#" + i).addClass("clicked-on");
//       $("#" + i).text(cellArray[i].adjValue);
//       break;
//     }
//   }
// }
//
// var east = function(thisPlaceholder) {
//   for (i = parseInt(thisPlaceholder); i < cellArray.length; i++) {
//     if (cellArray[i].iterator <9) {
//       cellArray[i].iterator += 1;
//       clickExpander(i);
//       clickExpander(i);
//     }
//     if ($("#" + i).hasClass("flag")) {
//       break;
//     } else if (cellArray[i].adjValue === 0) {
//       if (cellArray[i].cellId % base === base - 1 && cellArray[i].cellId < base * base) {
//         $("#" + i).addClass("clicked-on");
//         break;
//       } else {
//         $("#" + i).addClass("clicked-on");
//       }
//     } else {
//       $("#" + i).addClass("clicked-on");
//       $("#" + i).text(cellArray[i].adjValue);
//       break;
//     }
//   }
// }
//
// var west = function(thisPlaceholder) {
//   for (i = parseInt(thisPlaceholder); i < cellArray.length; i--) {
//     if (cellArray[i].iterator <9) {
//       cellArray[i].iterator += 1;
//       clickExpander(i);
//       clickExpander(i);
//     }
//     if ($("#" + i).hasClass("flag")) {
//       break;
//     } else if (cellArray[i].adjValue === 0) {
//       if (cellArray[i].cellId % base === 0) {
//         $("#" + i).addClass("clicked-on");
//         break;
//       } else {
//         $("#" + i).addClass("clicked-on");
//       }
//     } else {
//       $("#" + i).addClass("clicked-on");
//       $("#" + i).text(cellArray[i].adjValue);
//       break;
//     }
//   }
// }
//
// var northeast = function(thisPlaceholder) {
//   for (i = parseInt(thisPlaceholder); i < cellArray.length; i -= (base-1)) {
//     if (cellArray[i].iterator <9) {
//       cellArray[i].iterator += 1;
//       clickExpander(i);
//       clickExpander(i);
//     }
//     if ($("#" + i).hasClass("flag")) {
//       break;
//     } else if (cellArray[i].adjValue === 0) {
//       if ((cellArray[i].cellId % base === base - 1)||(cellArray[i].cellId < base)) {
//         $("#" + i).addClass("clicked-on");
//         break;
//       } else{
//         $("#" + i).addClass("clicked-on");
//       }
//     } else {
//       $("#" + i).addClass("clicked-on");
//       $("#" + i).text(cellArray[i].adjValue);
//       break;
//     }
//   }
// }
//
// var northwest = function(thisPlaceholder) {
//   for (i = parseInt(thisPlaceholder); i < cellArray.length; i -= (base+1)) {
//     if (cellArray[i].iterator <9) {
//       cellArray[i].iterator += 1;
//       clickExpander(i);
//       clickExpander(i);
//     }
//     if ($("#" + i).hasClass("flag")) {
//       break;
//     } else if (cellArray[i].adjValue === 0) {
//       if ((cellArray[i].cellId % base === 0)||(cellArray[i].cellId < base)) {
//         $("#" + i).addClass("clicked-on");
//         break;
//       } else{
//         $("#" + i).addClass("clicked-on");
//       }
//     } else {
//       $("#" + i).addClass("clicked-on");
//       $("#" + i).text(cellArray[i].adjValue);
//       break;
//     }
//   }
// }
//
// var southeast = function(thisPlaceholder) {
//   for (i = parseInt(thisPlaceholder); i < cellArray.length; i += (base+1)) {
//     if (cellArray[i].iterator <9) {
//       cellArray[i].iterator += 1;
//       clickExpander(i);
//       clickExpander(i);
//     }
//     if ($("#" + i).hasClass("flag")) {
//       break;
//     } else if (cellArray[i].adjValue === 0) {
//       if ((cellArray[i].cellId % base === base - 1)||(cellArray[i].cellId >= base * (base-1))) {
//         $("#" + i).addClass("clicked-on");
//         break;
//       } else{
//         $("#" + i).addClass("clicked-on");
//       }
//     } else {
//       $("#" + i).addClass("clicked-on");
//       $("#" + i).text(cellArray[i].adjValue);
//       break;
//     }
//   }
// }
//
// var southwest = function (thisPlaceholder) {
//   for (i = parseInt(thisPlaceholder); i < cellArray.length; i += (base-1)) {
//     if (cellArray[i].iterator <9) {
//       cellArray[i].iterator += 1;
//       clickExpander(i);
//       clickExpander(i);
//     }
//     if ($("#" + i).hasClass("flag")) {
//       break;
//     } else if (cellArray[i].adjValue === 0) {
//       if ((cellArray[i].cellId % base >= base * (base-1)) || (cellArray[i].cellId % base === 0)) {
//         $("#" + i).addClass("clicked-on");
//         break;
//       } else {
//         $("#" + i).addClass("clicked-on");
//       }
//     } else {
//       $("#" + i).addClass("clicked-on");
//       $("#" + i).text(cellArray[i].adjValue);
//       break;
//     }
//   }
// }
//
// var clickExpander = function(thisPlaceholder) {
//   try {
//     south(thisPlaceholder);
//     east(thisPlaceholder);
//     north(thisPlaceholder);
//     west(thisPlaceholder);
//     northeast(thisPlaceholder);
//     northwest(thisPlaceholder);
//     southeast(thisPlaceholder);
//     southwest(thisPlaceholder);
//   }
//   catch(e) {
//     console.log("exception is " + e);
//     console.log("placeholder is " + thisPlaceholder)
//   }
// }
