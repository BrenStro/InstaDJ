angular.module('instaDJ').controller('PlaylistCtrl', function($scope, $rootScope, $state, $http) {
  $rootScope.$state = $state;
  $scope.tracks = []; //$rootScope.playlist.tracks;
  $scope.tracks.push("1b60a734-79a7-4f7c-baa3-4ec637fa0729")
  $scope.tracksInfo = [];
  for(track in $scope.tracks){
    var tempUrl = "http://ws.audioscrobbler.com/2.0/?method=track.getInfo&api_key=31019bd7e0a4251800e5ce24efb9d5ea&mbid="+$scope.tracks[track]+"&format=json";
    $http({method: "GET", url: tempUrl}).then(function success(response){
      console.log(response);
      $scope.tracksInfo.push(response.data.track);
    },
    function error(response){
      console.log(response);
    });
  };
    $scope.data = [
      {
        title: "a title",
        album: "an albumn",
        artist: "an artist"
      },
      {
        title: "another title",
        album: "another albumn",
        artist: "another artist"
      },
      {
        title: "a different title",
        album: "a different albumn",
        artist: "a different artist"
      }
  ];
});
