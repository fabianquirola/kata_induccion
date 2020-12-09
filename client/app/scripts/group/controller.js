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
    var newBoard = board;

    //var neighbors = getAliveNeighbors(previousBoard);
   /* for(var col = 0 ; col < nCols ; col++){
      for(var row = 0 ; row < nRows ; row++){
        //var neighbors = $scope.getAliveNeighbors(col,row,board);
        //newBoard[col][row] = board[col][row]? neighbors >= 2 && neighbors <= 3: neighbors === 3;
      }
    }*/
    return newBoard;

  };

  $scope.getAliveNeighbors = function (x,y,board) {
     //four posible directions
    var nRows = board.length;
    var nCols = board[0].length;
    return 3;
  };

  

})
.config(function ($routeProvider) {
  $routeProvider
  .when('/group', {
    templateUrl: 'scripts/group/views/group.html',
    controller: 'group'
  });
});
