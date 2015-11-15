angular.module('zfpxchat').controller('LoginCtrl',function($location,$rootScope,$http,$scope,socket,api){
    $scope.user = {};
    $scope.save = function(){
        api.post('/users/login',$scope.user)
        .success(function(user){
            $rootScope.me = user;
            $location.path('/');
        }).error(function(){
            $location.path('/login');
        });
    }

});