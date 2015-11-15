angular.module('zfpxchat').controller('RoomCtrl',function($scope,socket){
    $scope.messages = [];
    socket.emit('getAllMessages');
    socket.on('allMessages',function(messages){
        $scope.messages = messages;
    });
    socket.on('message.add',function(message){
        $scope.messages.push(message);
    });
});