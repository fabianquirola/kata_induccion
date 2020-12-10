'use strict';

angular.module('Group')
.controller('group', function ($scope) {

 

  $scope.controller_loaded = 'Group loaded!';
  $scope.sum = function (numbers) {
    $scope.result = numbers.reduce(function(memo, number) {
      number = number || 0;
      return memo + number;
    }, 0);
  };
  $scope.isAlive = function (cell){
    return cell.isAlive;
  };

  $scope.checkNextBoard = function (board){

    var nRows = board.length;
    var nCols = board[0].length;
    var newBoard = $scope.createNew(nCols,nRows);

    for(var col = 0 ; col < nCols ; col++){
      for(var row = 0 ; row < nRows ; row++){
        var neighbors = $scope.getAliveNeighbors(col,row,board);
        //rules to know if it will be alive;
        newBoard[col][row] = board[col][row] ? neighbors >= 2 && neighbors <= 3: neighbors === 3;
        newBoard[col][row] = newBoard[col][row]?1:0;
      }
    }
    return newBoard;
  };

 
  $scope.getAliveNeighbors = function (x,y,board) {

    var nRows = board.length;
    var nCols = board[0].length;
    var neighbors = 0;

      if(x+1 < nCols){
        neighbors = neighbors + board[x+1][y];
      }
      if(x-1 >= 0 ){
        neighbors = neighbors + board[x-1][y];
      }
      if(y+1 < nRows){
        neighbors = neighbors + board[x][y+1];
      }
      if(y-1 >= 0){
        neighbors = neighbors + board[x][y-1];
      }
      if(x+1 < nCols && y+1 < nRows){
        neighbors = neighbors + board[x+1][y+1];
      }
      if(x-1 >= 0 && y-1 >= 0 ){
        neighbors = neighbors + board[x-1][y-1];
      }
      if(x-1 >= 0 && y+1 < nRows){
        neighbors = neighbors + board[x-1][y+1];
      }
      if(x+1 < nCols && y-1 >= 0){
        neighbors = neighbors + board[x+1][y-1];
      }
    
    return neighbors;
  };

  $scope.createNew = function (nCols,nRows){
    var newBoard = [];
    for(var col = 0; col < nCols; col++){
      newBoard[col] = [];
      for(var row = 0; row < nRows; row++){
        newBoard[col][row] = 0;
      }
    }
    return newBoard;
  };
})
.config(function ($routeProvider) {
  $routeProvider
  .when('/group', {
    templateUrl: 'scripts/group/views/group.html',
    controller: 'group'
  });
});
