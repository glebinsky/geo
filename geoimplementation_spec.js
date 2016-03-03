'use strict';

describe('geoTest',function(){
  var $scope,
      $rootScope,
      $complile,
      $httpBackend,
      $timeout,
      $templateCache,
      element,
      template,
      createController,
      geoImplementationDev;
      
  geoImplementationDev = angular.module('geoImplementationDev',['geoImplementation','ngMockE2E']);
  geoImplementationDev.run(function($httpBackend){}) 
  beforeEach(module('geoImplementation'));
  beforeEach(inject(function($injector){
    $timeout = $injector.get('$timeout');
    $rootScope = $injector.get('$rootScope');
    $compile = $injector.get('$compile');
    $templateCache = $injector.get('$templateCache');
    $scope = $rootScope.$new();
    template = $templateCache.get('geodirective.html');
    if(!template){
    }
    element = $compile()($scope);
    var $controller = $injector.get('$controller');
    
    createController = function(controller){
      return $controller(controller,{$scope:$scope});
    };
  }));

  it('should load default geo options',inject(function(){
    var controller = createController('geoController');
    expect($scope.options).toEqual({
      enableHighAccuracy: true,
      timeout: 500,
      maximumAge: 500
    });
  }));
});
