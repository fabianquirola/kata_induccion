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

    it('should return a 1 case Still lifes / Bloque ', function () {

      var board = [[0,0,0,0],[0,1,1,0],[0,1,1,0],[0,0,0,0]];

      var result = scope.checkNextBoard(board);

      expect(result).toBe(board);
    });

/*
    it('should return a 2 case Oscilators / Blinker ', function () {

      var board = [[0,0,0,0,0],[0,0,1,0,0],[0,0,1,0,0],[0,0,1,0,0],[0,0,0,0,0]];

      expect(scope.controller_loaded).toContain('loaded');
    });
*/
    it('should return getAliveNeighbors', function () {
      
      var board = [[0,0,0,0],[0,1,1,0],[0,1,1,0],[0,0,0,0]];

      var x = 1;
      var y = 1;

      expect(scope.getAliveNeighbors(x,y,board)).toBe(3);

      x = 0;
      y = 0;
      expect(scope.getAliveNeighbors(x,y,board)).toBe(1);


      x = 2;
      y = 2;
      expect(scope.getAliveNeighbors(x,y,board)).toBe(3);
    });
    
    // it('should return case 1', function () {
    //   scope.sum([1, 3]);
    //   expect(scope.result).toBe(4);
    // });

    // it('should return case 2', function () {
      // var result = scope.sum([10,5]);
      // expect(result).toBe(15);
    // });

    // fit('should return case 3', function () {
      // var result = scope.sum([10,5,6,null,7]);
      // expect(result).toBe(28);

      // result = scope.sum([10, undefined]);
      // expect(result).toBe(10);
    // });
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
