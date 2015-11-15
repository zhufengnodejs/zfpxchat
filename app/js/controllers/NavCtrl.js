angular.module('zfpxchat').controller('NavCtrl',function($rootScope,$scope,$http,$location,socket,api){
  $scope.isActive = function(path){
      return path === $location.path();//判断是否等于当前路径
  }

  $scope.logout = function(){
    api.get('/users/logout').success(function(){
        $rootScope.me = null;
        $location.path('/login');
    }).error(function(){
        $location.path('/login');
    });
  }
});