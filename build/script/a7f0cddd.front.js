angular.module("zfpxchat",["ngRoute","angularMoment"]).config(function($locationProvider,$routeProvider){$locationProvider.html5Mode(!1),$routeProvider.when("/",{templateUrl:"/pages/room.html",controller:"RoomCtrl"}).when("/login",{templateUrl:"/pages/login.html",controller:"LoginCtrl"}).when("/reg",{templateUrl:"/pages/reg.html",controller:"RegCtrl"}).otherwise({redirectTo:"/"})}),angular.module("zfpxchat").run(function(validator,$location){validator.then(function(){$location.path("/")},function(){$location.path("/login")})}),angular.module("zfpxchat").factory("socket",function($rootScope){var socket=io.connect("http://"+window.location.host);return{on:function(eventName,callback){socket.removeAllListeners(eventName),socket.on(eventName,function(){var args=arguments;$rootScope.$apply(function(){callback.apply(socket,args)})})},emit:function(eventName,data){socket.emit(eventName,data)}}}),angular.module("zfpxchat").directive("enterBreak",function(){return function(scope,element,attrs){var ctrlDown=!1;element.bind("keydown",function(event){17==event.which&&(ctrlDown=!0,setTimeout(function(){ctrlDown=!1},1e3)),13==event.which&&(ctrlDown?element.val(element.val()+"\n"):(scope.$apply(function(){scope.$eval(attrs.enterBreak)}),event.preventDefault()))})}}),angular.module("zfpxchat").directive("scrollToBottom",function(){return{link:function(scope,element,attrs){scope.$watch(function(){return element.children().length},function(){console.log(element.prop("scrollHeight")),element.animate({scrollTop:element.prop("scrollHeight")},1e3)})}}}),angular.module("zfpxchat").controller("RoomCtrl",function($scope,socket){$scope.room={},socket.emit("getAllMessages"),socket.on("allMessages",function(room){$scope.room=room}),socket.on("message.add",function(message){$scope.room.messages.push(message)})}),angular.module("zfpxchat").controller("MessageSendCtrl",["$rootScope","$scope","socket",function($rootScope,$scope,socket){$scope.newMessage="",$scope.createMessage=function(){$scope.newMessage&&(socket.emit("createMessage",{content:$scope.newMessage,creator:$rootScope.me,createAt:new Date}),$scope.newMessage="")}}]),angular.module("zfpxchat").controller("RegCtrl",function($rootScope,$scope,$http,$location,socket,api){$scope.user={},$scope.save=function(){api.post("/users/reg",$scope.user).success(function(user){$rootScope.me=user,$location.path("/")}).error(function(){$location.path("/reg")})}}),angular.module("zfpxchat").controller("LoginCtrl",function($location,$rootScope,$http,$scope,socket,api){$scope.user={},$scope.save=function(){api.post("/users/login",$scope.user).success(function(user){$rootScope.me=user,$location.path("/")}).error(function(){$location.path("/login")})}}),angular.module("zfpxchat").controller("NavCtrl",function($rootScope,$scope,$http,$location,socket,api){$scope.isActive=function(path){return path===$location.path()},$scope.logout=function(){api.get("/users/logout").success(function(){$rootScope.me=null,$location.path("/login")}).error(function(){$location.path("/login")})}}),angular.module("zfpxchat").factory("api",function($rootScope,$http){return{host:"",get:function(url){return $http({url:this.host+url,method:"GET"})},post:function(url,data){return $http({url:this.host+url,method:"POST",data:data})}}}),angular.module("zfpxchat").factory("validator",function($rootScope,$q,api){var deferred=$q.defer();return api.get("/users/validate").success(function(user){$rootScope.me=user,deferred.resolve(user)}).error(function(){deferred.reject()}),deferred.promise});