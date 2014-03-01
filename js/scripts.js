var gosperGliderGun = ["1308", "1408", "1409", "1309", "1318", "1418", "1518", "1219", "1120", "1121", "1619", "1720", "1721", "1223", "1324", "1424", "1524", "1422", "1623", "1425", "1328", "1329", "1229", "1228", "1128", "1129", "1030", "1430", "1432", "1532", "932", "1032", "1142", "1143", "1243", "1242"]

var glider = [6115, 5915, 6114, 6015, 6013];

$(document).ready(function() {
  World.populate();
  
  for (var i=0; i<100; i++) {
    $('table').append('<tr></tr>')
    for (var j=0; j<100; j++) {
      $('tr').last().append('<td id='+ ((i*100)+j) +'></td>')
      
    }
  }
  $('#ggg').click(function(){
            gosperGliderGun.forEach(function(cell){
              var numId = parseInt(cell);
              World.cells[numId].alive = true;
              $('#'+numId).addClass('blue');

            })
           })

  $('#glider').click(function() {
    glider.forEach(function(cell) {
      var numId = cell;
      World.cells[numId].alive = true;
      $('#' + numId).addClass('blue');
    })
  })
$('td').click(function() {
        
        $(this).toggleClass('blue');
         var numberId = $(this).attr('id')

         var cell = World.cells[numberId]
         if (cell.alive === false) {
          cell.live();
        } else {
          cell.dead();
        }
      })


$('#runButton').click(function(){
  $('td').css('border','none')
setInterval(function(){
    World.cells.forEach(function(cell){
    cell.makeDeadOrAlive();
      })
     World.cells.forEach(function(cell){
     if (cell.future === true) {
      
     $('#'+cell.cellId).addClass('blue');
     $('#'+cell.cellId).removeClass('green');
     cell.alive = true;
     } else if (cell.future === false){
      
     $('#'+cell.cellId).addClass('green');
     $('#'+cell.cellId).removeClass('blue');
     cell.alive = false;
     }
})
}, 100)

})
});


var Cell = {
  create: function(cellId) {
    var newCell = Object.create(Cell);
    newCell.initialize(cellId);
    newCell.proximityCheck();
    return newCell;
  },

  initialize: function(cellId) {
    this.cellId = cellId;
    this.alive = false;
  },

  live: function(clickCellId) {
    this.alive = true;
  },

  dead: function(clickCellID) {
    this.alive = false;
  }, 

  futureActive: function(){
    if (this.future === true){
      this.alive = true;
      return true;
    } else {
      this.alive === false;
      return false
    }
  },

  proximityCheck: function() {

    var cellId = this.cellId;
    this.neighbors = [cellId-101, cellId-100, cellId-99, cellId-1, 
                     cellId+1, cellId+99, cellId+100, cellId+101]; 
  },
  liveCount: function(){
    var liveCount = 0;
   for (var i=0; i<this.neighbors.length; i++) {
    var currentNeighbor = World.cells[this.neighbors[i]];
    if (currentNeighbor === undefined){
        i++;
    } else if( currentNeighbor.alive === true) {
      liveCount++;
    }
   }
    return liveCount;
  },

  makeDeadOrAlive: function(){
    var liveCount = this.liveCount();
    if (liveCount < 2 && this.alive === true){
      this.future = false;
    } else if (this.alive === true && liveCount === 2){
      this.future = true;
    } else if (this.alive === true && liveCount === 3){
      this.future = true;
    } else if (liveCount > 3 && this.alive === true){
      this.future = false;
    } else if (this.alive === false && liveCount === 3){
      this.future = true;
    } else if ((this.cellId > 9700 || this.cellId < 301) && this.alive === true){
      this.future = false;
    }
  },
  
};

var World = {
cells:[],
  populate: function() {
    for (var i = 0; i<10000; i++) {
      this.cells.push(Cell.create(i));
    }
  },
}
