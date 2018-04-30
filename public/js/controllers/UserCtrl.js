angular.module('instaDJ').controller('UserCtrl', function($scope, $rootScope, $state, $http) {
  $scope.createdPlaylists = [];
  $scope.likedPlaylists = [];
  $scope.playlist1 = true;
  $scope.playlist2 = true;

  $scope.initialize = function(){
    //refresh user info
    $scope.refreshUser();

    if($rootScope.user.createdPlaylists.length > 0){
      $scope.createdPlaylists = $rootScope.user.createdPlaylists;
      $scope.playlist1 = false;
    }
    if($rootScope.user.likedPlaylists.length > 0){
      $scope.likedPlaylists = $rootScope.user.likedPlaylists;
      $scope.playlist2 = false;
    }
  };

  $scope.refreshUser = function(){
    $http({method: "GET", data: $scope.user, url: ("/user/" + $rootScope.user.id)}).then(function success(response){
      console.log("refreshing user");
      console.log(response);
      $rootScope.user = response.data.user;
    },
    function error(response){
      console.log(response);
    });
  }

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
