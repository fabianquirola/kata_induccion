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

  $scope.is_alive = function (col,row,board){
    var neighbors = $scope.get_alive_neighbors(col,row,board);
    var alive = board[col][row] ? neighbors >= 2 && neighbors <= 3: neighbors === 3;
    return alive?1:0;
  };

  $scope.board = [
    [0,0,0,0,0],
    [0,0,1,0,0],
    [0,0,1,0,0],
    [0,0,1,0,0],
    [0,0,0,0,0]];
  $scope.generation_counter=0;


  $scope.check_next_generation = function (board){

    var n_rows = board.length;
    var n_cols = board[0].length;
    var new_board = $scope.create_new_board(n_cols,n_rows);

    for(var col = 0 ; col < n_cols ; col++){
      for(var row = 0 ; row < n_rows ; row++){ 
        //rules to know if it will be alive;
        new_board[col][row] = $scope.is_alive(col,row,board);
      }
    }
    return new_board;
  };

 
  $scope.get_alive_neighbors = function (x,y,board) {

    var n_rows = board.length;
    var n_cols = board[0].length;
    var neighbors = 0;

      if(x+1 < n_cols){
        neighbors = neighbors + board[x+1][y];
      }
      if(x-1 >= 0 ){
        neighbors = neighbors + board[x-1][y];
      }
      if(y+1 < n_rows){
        neighbors = neighbors + board[x][y+1];
      }
      if(y-1 >= 0){
        neighbors = neighbors + board[x][y-1];
      }
      if(x+1 < n_cols && y+1 < n_rows){
        neighbors = neighbors + board[x+1][y+1];
      }
      if(x-1 >= 0 && y-1 >= 0 ){
        neighbors = neighbors + board[x-1][y-1];
      }
      if(x-1 >= 0 && y+1 < n_rows){
        neighbors = neighbors + board[x-1][y+1];
      }
      if(x+1 < n_cols && y-1 >= 0){
        neighbors = neighbors + board[x+1][y-1];
      }
    
    return neighbors; 

  };

  $scope.create_new_board = function (n_cols,n_rows){
    var new_board = [];
    for(var col = 0; col < n_cols; col++){
      new_board[col] = [];
      for(var row = 0; row < n_rows; row++){
        new_board[col][row] = 0;
      }
    }
    return new_board;
  };

  $scope.iterate_board = function (board){
    $scope.board=$scope.check_next_generation(board);
    $scope.generation_counter++;
  };

  $scope.create_new_board_random = function (n_cols,n_rows){
    var new_board = [];
    for(var col = 0; col < n_cols; col++){
      new_board[col] = [];
      for(var row = 0; row < n_rows; row++){
        new_board[col][row] = Math.round(Math.random());
      }
    }
    return new_board;
  };
})
.config(function ($routeProvider) {
  $routeProvider
  .when('/group', {
    templateUrl: 'scripts/group/views/group.html',
    controller: 'group'
  });
});
