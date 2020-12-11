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

    it('should return get_alive_neighbors', function () {
      
      var board = [[0,0,0,0],[0,1,1,0],[0,1,1,0],[0,0,0,0]];

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
    it('should return a 1 case Create Blank Board ', function () {

      var resultBoard = [
        [0,0,0],
        [0,0,0]
    ];

      var n_rows = 3;
      var n_cols = 2;

      var result = scope.create_new_board(n_cols,n_rows);

      expect(result).toEqual(resultBoard);

      
    });

    it('should return a 2 case Still lifes / Bloque ', function () {

      var board = [[0,0,0,0],[0,1,1,0],[0,1,1,0],[0,0,0,0]];

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
      
      var board_result = [
        [0,0,0,0,0],
        [0,0,0,0,0],
        [0,1,1,1,0],
        [0,0,0,0,0],
        [0,0,0,0,0]];

      var result = scope.check_next_generation(board);

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
      
      var board_result = [
        [0,0,0,0,0,0],
        [0,1,1,0,0,0],
        [0,1,0,0,0,0],
        [0,0,0,0,1,0],
        [0,0,0,1,1,0],
        [0,0,0,0,0,0]
      ];

      var result = scope.check_next_generation(board);

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
      
      var board_result_1 = [
        [0,0,0,0,0],
        [0,1,0,0,0],
        [0,0,1,1,0],
        [0,1,1,0,0],
        [0,0,0,0,0]
      ];

      var board_result_2 = [
        [0,0,0,0,0],
        [0,0,1,0,0],
        [0,0,0,1,0],
        [0,1,1,1,0],
        [0,0,0,0,0]
      ];

      var board_result_3 = [
        [0,0,0,0,0],
        [0,0,0,0,0],
        [0,1,0,1,0],
        [0,0,1,1,0],
        [0,0,1,0,0]
      ];
      
      var board_result_4 = [
        [0,0,0,0,0],
        [0,0,0,0,0],
        [0,0,0,1,0],
        [0,1,0,1,0],
        [0,0,1,1,0]
      ];

      var result = scope.check_next_generation(board);

      expect(result).toEqual(board_result_1);


      result = scope.check_next_generation(board_result_1);

      expect(result).toEqual(board_result_2);


      result = scope.check_next_generation(board_result_2);

      expect(result).toEqual(board_result_3);


      result = scope.check_next_generation(board_result_3);

      expect(result).toEqual(board_result_4);

    });

    it('should return a 6 Iterate Board ', function () {

     
      var board = [
        [0,0,0,0,0],
        [0,0,1,0,0],
        [1,0,1,0,0],
        [0,1,1,0,0],
        [0,0,0,0,0]
      ];
    
      
      var board_result_4 = [
        [0,0,0,0,0],
        [0,0,0,0,0],
        [0,0,0,1,0],
        [0,1,0,1,0],
        [0,0,1,1,0]
      ];
      
      scope.board = board;
      var result = []; 
      var i =0;
      for(; i < 4;i++){
        scope.iterate_board(scope.board);
      }

      expect(board_result_4).toEqual(scope.board);
      expect(i).toEqual(scope.generation_counter);

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
