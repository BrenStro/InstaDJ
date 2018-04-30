angular.module('instaDJ').controller('PlaylistCtrl', function($scope, $rootScope, $state, $http) {
  $rootScope.$state = $state;
  $scope.tracksInfo = [];

  $scope.refreshPlaylist = function(){
    //get the playlist info
    console.log($rootScope.playlist.id);
    $http({method: "GET", url: ("/playlist/"+$rootScope.playlist.id)}).then(function success(response){
      $scope.tracks = response.data.data.tracks;
      $scope.populateTable($scope.tracks);
    },
    function error(response){
      console.log(response);
      //some test data in case things go wrong
      $scope.tracks.push("1b60a734-79a7-4f7c-baa3-4ec637fa0729");
      $scope.tracks.push("6e6053d6-6f4b-49b1-8a34-04875106345f");
      $scope.populateTable($scope.tracks);
    });
  }

  $scope.populateTable = function(tracks){
    $scope.tracksInfo = [];
    //pull data from lastFM API and populate the table info array
    for(track in tracks){
      var tempUrl = "http://ws.audioscrobbler.com/2.0/?method=track.getInfo&api_key=31019bd7e0a4251800e5ce24efb9d5ea&mbid="+tracks[track]+"&format=json";
      $http({method: "GET", url: tempUrl}).then(function success(response){
        $scope.tracksInfo.push(response.data.track);
      },
      function error(response){
        console.log(response);
      });
    };
  };

  $scope.removeTrack = function(track){
    //remove track from playlist
    var tracks = {
      tracks: [track.mbid]
    };
    console.log(tracks);
    $http({method: "POST", data: tracks, url: ("/playlist/"+$rootScope.playlist.id+"/deleteTracks")}).then(function success(response){
      //refresh the list
      $scope.refreshPlaylist();
    },
    function error(response){
      console.log(response);
    });
  };

  $scope.addTracksForGenre = function(genre){
    var tempUrl = "http://ws.audioscrobbler.com/2.0/?method=tag.gettoptracks&tag=" + genre + "&api_key=31019bd7e0a4251800e5ce24efb9d5ea&format=json";
    $scope.queryAPI(tempUrl);
  };

  $scope.addTracksForCountry = function(country){
    var tempUrl = "http://ws.audioscrobbler.com/2.0/?method=geo.gettoptracks&country=" + country + "&api_key=31019bd7e0a4251800e5ce24efb9d5ea&format=json";
    $scope.queryAPI(tempUrl);
  };

  $scope.addTopTracks = function(){
    var tempUrl = "http://ws.audioscrobbler.com/2.0/?method=chart.gettoptracks&api_key=31019bd7e0a4251800e5ce24efb9d5ea&format=json";
    $scope.queryAPI(tempUrl);
  };

  $scope.queryAPI = function(tempUrl){
    $http({method: "GET", url: tempUrl}).then(function success(response){
      var tempTracks = response.data.tracks.track;
      var addTracks = [];
      var count = 0;
      var index = 0;
      console.log($scope.tracks); 
      while(count<5){
        //check if mbid isn't an empty string and that it doesn't exist in the playlist already
        if(tempTracks[index].mbid == "" || $scope.tracks.includes(tempTracks[index].mbid)){
          index++;
          continue;
        }
        addTracks.push(tempTracks[index].mbid);
        index++;
        count++;
      }
      console.log(addTracks);
      $scope.addTracks(addTracks);
    },
    function error(response){
      console.log(response);
    });
  }

  $scope.addTracks = function(addedTracks){
    var tracks = {
      tracks: addedTracks
    };
    $http({method: "POST", data: tracks, url: ("/playlist/"+$rootScope.playlist.id+"/addTracks")}).then(function success(response){
      //refresh the list
      $scope.refreshPlaylist();
    },
    function error(response){
      console.log(response);
    });
  }

  $scope.refreshPlaylist();
});
