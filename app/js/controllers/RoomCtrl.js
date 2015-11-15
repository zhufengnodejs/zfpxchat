angular.module('zfpxchat').controller('RoomCtrl',function($scope,socket){
    $scope.room = {};
    socket.emit('getAllMessages');
    socket.on('allMessages',function(room){
        $scope.room = room;
    });
    socket.on('message.add',function(message){
        $scope.room.messages.push(message);
    });
});