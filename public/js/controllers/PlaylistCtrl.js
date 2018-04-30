angular.module('instaDJ').controller('PlaylistCtrl', function($scope, $rootScope, $state) {
  $rootScope.$state = $state; 
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
