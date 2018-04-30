angular.module('instaDJ').controller('LoginCtrl', function($scope, $rootScope, $state, $http) {
    $rootScope.$state = $state;
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
        console.log(response);
        $scope.loginFailed = true;
      });
    }
});
