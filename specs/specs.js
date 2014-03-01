

beforeEach(function() {
  World.cells = [];
})

describe('World', function(){
  describe('populate', function(){
    it('should populate an array of dead cells equal to the total number of cells', function(){
      var testWorld = Object.create(World);
      testWorld.populate();
      testWorld.cells.length.should.equal(900);
      testWorld.cells[3].cellId.should.equal(3)
    });
  });
});

describe('Cell', function() {
  describe('create', function() {
    it('create a new cell and set its id number and alive status to false', function() {
      var testCell = Cell.create(1);
      testCell.cellId.should.equal(1);
      testCell.alive.should.equal(false);  
    });
  });
  describe('live' , function() {
    it('should make a cell alive', function(){
      World.populate();    
      var testCell = Cell.create(0);
      testCell.live(0);
      testCell.alive.should.equal(true);
    });
  });
  describe('dead', function() {
    it('it should make a cell dead', function() {
      World.populate();
      var testCell = Cell.create(1);
      testCell.dead();
      testCell.alive.should.equal(false);  
    });
  });
  describe('proximityCheck',function() {
    it('should identify all 8 of its neighbors',function() {
      World.populate();
      var testCell = World.cells[364];
      testCell.proximityCheck();
      testCell.neighbors.should.eql([333, 334,335,363,365,393,394,395]);
    })
  })
  describe('livecount', function() {
    it('check if all neighbors are alive', function() {
      World.populate();
      var testCell = World.cells[364];
      var liveCell = World.cells[365];
      var liveCell2 = World.cells[363];
      liveCell.live();
      liveCell2.live();
      testCell.liveCount();
      testCell.liveCount().should.equal(2);
    });
  });
  describe('makeDeadOrAlive', function(){
    it('kills or revives the cell based on the live Count', function() {
      World.populate();
      var testCell = World.cells[364]
      var liveCell = World.cells[365]
      liveCell.live();
      var liveCount = testCell.liveCount();
      testCell.makeDeadOrAlive().should.equal(false)
    });
    it('stays alive if there are 2 or 3 live neighbors', function() {
      World.populate();
      var testCell = World.cells[364];
      var liveCell1 = World.cells[365];
      var liveCell2 = World.cells[363];
      testCell.live();
      liveCell1.live();
      liveCell2.live();
      var liveCount = testCell.liveCount();
      testCell.makeDeadOrAlive().should.equal(true)
    });
    it('dies if it has more than 3 neighbors', function() {
      World.populate();
      var testCell = World.cells[364];
      var liveCell1 = World.cells[365];
      var liveCell2 = World.cells[363];
      var liveCell3 = World.cells[395];
      var liveCell4 = World.cells[394];
      testCell.live();
      liveCell1.live();
      liveCell2.live();
      liveCell3.live();
      liveCell4.live();
      var liveCount = testCell.liveCount();
      testCell.makeDeadOrAlive().should.equal(false);
    });
      it('reanimates a dead cell if exactly three of its neighbors are alive', function() {
        World.populate();
        var testCell = World.cells[364];
        var liveCell1 = World.cells[365];
        var liveCell2 = World.cells[363];
        var liveCell3 = World.cells[395];
        liveCell1.live();
        liveCell2.live();
        liveCell3.live();
        var liveCount = testCell.liveCount();
        testCell.makeDeadOrAlive().should.equal(true);
      });
  });
});
