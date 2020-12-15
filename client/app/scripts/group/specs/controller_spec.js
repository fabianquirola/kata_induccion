'use strict';

describe('Controller: select group', function () {

  beforeEach(module('Group'));

  var controller;
  var scope;

  beforeEach(inject(function ($rootScope, $controller) {
    scope = $rootScope.$new();
    controller = $controller('group', { $scope: scope });
  }));

  describe('On instance', function () {
    it('should set "controller_loaded" variable in scope', function () {
      expect(scope.controller_loaded).toContain('loaded');
    });

    it('should Create Blank Board ', function () {

      var rows = 3;
      var cols = 2;

      var result = scope.create_new_board(cols,rows);

      var resultBoard = [
        [0,0,0],
        [0,0,0]
      ];

      expect(result).toEqual(resultBoard);
      
    });

    it('should return case 1 get_alive_neighbors', function () {
      
      var board = [
        [0,0,0,0],
        [0,1,1,0],
        [0,1,1,0],
        [0,0,0,0]];

      var x = 1;
      var y = 1;

      expect(scope.get_alive_neighbors(x,y,board)).toBe(3);

      x = 0;
      y = 0;
      
      expect(scope.get_alive_neighbors(x,y,board)).toBe(1);

      x = 2;
      y = 2;

      expect(scope.get_alive_neighbors(x,y,board)).toBe(3);

    });

    it('should return a 2 case Still lifes / Bloque ', function () {

      var board = [
        [0,0,0,0],
        [0,1,1,0],
        [0,1,1,0],
        [0,0,0,0]];

      var result = scope.check_next_generation(board);

      expect(result).toEqual(board);

      
    });

    it('should return a 3 case Oscilators / Blinker ', function () {

      var board = [
        [0,0,0,0,0],
        [0,0,1,0,0],
        [0,0,1,0,0],
        [0,0,1,0,0],
        [0,0,0,0,0]];

      var result = scope.check_next_generation(board);

      var board_result = [
        [0,0,0,0,0],
        [0,0,0,0,0],
        [0,1,1,1,0],
        [0,0,0,0,0],
        [0,0,0,0,0]];

      expect(result).toEqual(board_result);

    });

  
    it('should return a 4 case Oscilators / Beacon ', function () {

      var board = [
        [0,0,0,0,0,0],
        [0,1,1,0,0,0],
        [0,1,1,0,0,0],
        [0,0,0,1,1,0],
        [0,0,0,1,1,0],
        [0,0,0,0,0,0]
      ];

      var result = scope.check_next_generation(board);

      var board_result = [
        [0,0,0,0,0,0],
        [0,1,1,0,0,0],
        [0,1,0,0,0,0],
        [0,0,0,0,1,0],
        [0,0,0,1,1,0],
        [0,0,0,0,0,0]
      ];

      expect(result).toEqual(board_result);
    });

    it('should return a 5 case Spaceships / Glider ', function () {

     
      var board = [
        [0,0,0,0,0],
        [0,0,1,0,0],
        [1,0,1,0,0],
        [0,1,1,0,0],
        [0,0,0,0,0]
      ];
      
      var result = scope.check_next_generation(board);

      var board_result_1 = [
        [0,0,0,0,0],
        [0,1,0,0,0],
        [0,0,1,1,0],
        [0,1,1,0,0],
        [0,0,0,0,0]
      ];

      expect(result).toEqual(board_result_1);

      var board_result_2 = [
        [0,0,0,0,0],
        [0,0,1,0,0],
        [0,0,0,1,0],
        [0,1,1,1,0],
        [0,0,0,0,0]
      ];

      result = scope.check_next_generation(board_result_1);

      expect(result).toEqual(board_result_2);

    });

    it('should return a 6 Iterate Board ', function () {

      var board = [
        [0,0,0,0,0],
        [0,0,1,0,0],
        [1,0,1,0,0],
        [0,1,1,0,0],
        [0,0,0,0,0]
      ];
      
      scope.board = board;

      var i =0;
      for(; i < 4;i++){
        scope.iterate_board(scope.board);
      }

      var board_result_4 = [
        [0,0,0,0,0],
        [0,0,0,0,0],
        [0,0,0,1,0],
        [0,1,0,1,0],
        [0,0,1,1,0]
      ];

      expect(board_result_4).toEqual(scope.board);
      expect(scope.generation_counter).toEqual(5);
      expect(scope.alive_counter).toEqual(5);

    });

    it('should change the cell', function () {

      var board = [
        [0,0,0,0,0],
        [0,0,1,0,0],
        [1,0,1,0,0],
        [0,1,1,0,0],
        [0,0,0,0,0]
      ];

      scope.board =board;

      var col =2;
      var row =0;

      scope.change_cell_value(col,row);
      expect(scope.board[col][row]).toEqual(0);

    });

    it('should instance varibles', function () {
      expect(scope.play).toBeDefined();
      expect(scope.stop).toBeDefined();
    });

    it('should create blank board', function () {

      var cols =3;
      var rows =3;

      scope.create_new_blank_board(cols,rows);

      expect(scope.board.length).toBe(3);
      expect(scope.board[0].length).toBe(3);
      expect(scope.generation_counter).toEqual(1);
      expect(scope.alive_counter).toEqual(0);
      
    });
    
  });

  describe('when going to /group', function () {

    var route, location, rootScope, httpBackend;

    beforeEach(inject(function ($route, $location, $rootScope, $httpBackend) {
      route = $route;
      location = $location;
      rootScope = $rootScope;
      httpBackend = $httpBackend;

      httpBackend.when('GET', 'scripts/group/views/group.html').respond('<div></div>');
    }));

    afterEach(function () {
      httpBackend.verifyNoOutstandingExpectation();
      httpBackend.verifyNoOutstandingRequest();
    });

    it('should use minesweeper.html and controller', function () {
      expect(route.current).toBeUndefined();

      location.path('/group');

      httpBackend.flush();

      expect(route.current.templateUrl).toBe('scripts/group/views/group.html');
      expect(route.current.controller).toBe('group');
    });

    
  });

});
