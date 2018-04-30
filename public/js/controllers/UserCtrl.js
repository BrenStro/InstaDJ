angular.module('instaDJ').controller('UserCtrl', function($scope, $rootScope, $state, $http) {
  $scope.createdPlaylists = [];
  $scope.likedPlaylists = [];
  $scope.playlist1 = false;
  $scope.playlist2 = false;

  $scope.initialize = function(){
    console.log("initialize");
    $scope.createdPlaylists = $rootScope.user.createdPlaylists;
    $scope.likedPlaylists = $rootScope.user.likedPlaylists;
    //$scope.createdPlaylists.push({name: "Test Playlist"});
    //console.log($scope.createdPlaylists);

    if($scope.createdPlaylists.length == 0){
      $scope.playlist1 = true;
    }
    if($scope.createdPlaylists.length == 0){
      $scope.playlist2 = true;
    }
  };

  $scope.goToPlaylist = function(playlist){
    $rootScope.playlist = playlist;
    $state.go('playlist');
  };

  $scope.createPlaylist = function(playlistName){
    $http({method: "POST", data: {name: playlistName, public: false},
      url: "/playlist/create"}).then(function success(response){
      $rootScope.playlist = response.data.data;
      $rootScope.user.createdPlaylists.push($rootScope.playlist);
      $state.go('playlist');
    },
    function error(response){
      console.log(response);
    });
  }

  $scope.initialize();
});
