angular.module('instaDJ').controller('PlaylistCtrl', function($scope, $rootScope, $state, $http) {
  $rootScope.$state = $state;
  $scope.tracks = []; //$rootScope.playlist.tracks;
  $scope.tracksInfo = [];

  //get the playlist info
  $http({method: "GET", url: "/playlist/1"}).then(function success(response){
    $scope.tracks = response.data.data.tracks;
    $scope.populateTable($scope.tracks);
  },
  function error(response){
    console.log(response);
    //some test data in case things go wrong
    $scope.tracks.push("1b60a734-79a7-4f7c-baa3-4ec637fa0729");
    $scope.tracks.push("6e6053d6-6f4b-49b1-8a34-04875106345f");
  });

  $scope.populateTable = function(tracks){
    //pull data from lastFM API and populate the table info array
    for(track in tracks){
      var tempUrl = "http://ws.audioscrobbler.com/2.0/?method=track.getInfo&api_key=31019bd7e0a4251800e5ce24efb9d5ea&mbid="+tracks[track]+"&format=json";
      $http({method: "GET", url: tempUrl}).then(function success(response){
        console.log(response);
        $scope.tracksInfo.push(response.data.track);
      },
      function error(response){
        console.log(response);
      });
    };
  };

  $scope.removeTrack = function(track){
    //remove track from playlist
  };


});
