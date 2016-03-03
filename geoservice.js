'use strict';

angular.module('geoService',[])
.factory('geoService',['$q', 'noGeoMessages', function ($q, noGeoMessages){
  var deferred = $q.defer(),
    watchId;

  function watchPosition(track,options){
    if (navigator.geolocation) {
      if(track)
        watchId = navigator.geolocation.watchPosition(showPosition,showError,options || null);
      else
        navigator.geolocation.getCurrentPosition(showPosition,showError,options || null);
    } else
      deferred.reject({'error':noGeoMessages[error.code] || "Unknown error code:"+error.code});

    return deferred.promise;
  }

  function showPosition(response) {
//console.log(angular.extend({callback:"position"},{"timestamp":response.timestamp},response.coords));
    //deferred.notify(angular.extend({},response.coords,{"timestamp":response.timestamp}));
    deferred.notify(angular.extend({},response));
  }

  function showError(response) {
//console.log(angular.extend({callback:"error"},response));
    deferred.notify(angular.extend({},response));
  }

  function clearWatch(){
//console.log(watchId);
      navigator.geolocation.clearWatch(watchId);
  }

  return {
    watchPosition: watchPosition,
    clearWatch: clearWatch
  };
}])

.value('noGeoMessages',{
  PERMISSION_DENIED:"User denied the request for Geolocation.",
  POSITION_UNAVAILABLE:"Location information is unavailable.",
  TIMEOUT:"The request to get user location timed out.",
  UNKNOWN_ERROR:"An unknown error occurred."
});
