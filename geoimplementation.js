'use strict';

angular.module('geoImplementation',['geoService'])
.directive('geoDirective',['geoService', function (geoService){
  return {
    templateUrl: 'geodirective.tpl.html',
    link: function ($scope,$element,$attr){
      $scope.clearResponses = function(){
        $scope.responses.splice(0);
      },

      $scope.changeTrack = function(){
        geoService.clearWatch();      
        $scope.clearResponses();
        geoService.watchPosition($scope.track, $scope.options)
        .then(function(obj){
            //console.log('success');
          geoService.clearWatch();
          $scope.clearResponses();
          $scope.responses.push(angular.copy(obj));
        },function(obj){
            //console.log('error');
          geoService.clearWatch();
          $scope.clearResponses();
          $scope.responses.push(angular.copy(obj));
        },function(obj){
          if(obj.code && obj.code === 1)
            alert('you must allow geolocation');
            //console.log('notify');
          $scope.responses.push(angular.copy(obj));
        });
      };

      $scope.stopTrack = function(){
        geoService.clearWatch();
      };

      //$scope.changeTrack();
    }
  };
}])

.controller('geoController',['$scope', 'watchOptions', function($scope, watchOptions){
  angular.extend($scope,{
    responses : [],
    options: angular.extend({},watchOptions),
    track: true
  });
}])

.filter('coordName', [function(){
  return function(input){
    switch(input){
      case "accuracy":
        return "Accuracy";
        break;
      case "altitude":
        return "Altitude";
        break;
      case "altitudeAccuracy":
        return "Altitude Accuracy";
        break;
      case "heading":
        return "Heading";
        break;
      case "latitude":
        return "Latitude";
        break;
      case "longitude":
        return "Longitude";
        break;
      case "speed":
        return "Speed";
        break;
      default:
        return input;
    }
  };
}])

.filter('emptyVal', [function(){
  return function(input){
    switch(input){
      case null:
      case undefined:
      case "":
        return "N/A";
        break;
      default:
        return input;
    }
  };
}])

.value('watchOptions',{
  enableHighAccuracy: true,
  timeout: 500,
  maximumAge: 500
});
