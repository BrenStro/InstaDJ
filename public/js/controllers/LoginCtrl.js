angular.module('instaDJ').controller('LoginCtrl', function($scope, $rootScope, $state, $http) {

    $scope.loginFailed = false;

    $scope.loginPage = function(){
        $state.go('login');
    }

    $scope.login = function(user){
      $http({method: "POST", data: $scope.user, url: "/login"}).then(function success(response){
        $rootScope.user = response.data;
        $state.go('user');
      },
      function error(response){
        $scope.loginFailed = true;
      })
    }
});
