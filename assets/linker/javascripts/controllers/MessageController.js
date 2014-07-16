'use strict';

app.controller('MessageController', function($scope, SailsSocket, $log) {
  //
  // Listen for Sails/Socket events
  //
  $scope.$on('SailsSocket:connect', function(ev, data) {
    // Get full collection of todos
    SailsSocket.get(
      '/message?sort=id%20DESC&limit=10', {},
      function(response) {
        $log.debug('SailsSocket :: /message', response);
        $scope.messages = response.reverse();
      });
  });
  
  $scope.$on('SailsSocket:message', function(ev, data) {
    $log.debug('SailsSocket :: $on(message)', data);
    if (data.model === 'message') {
      switch(data.verb) {
        case 'create':
          $scope.messages.push(data.data);
          break;
      }
    }
  });

  $scope.sendMessage = function() {
    $log.debug('sendMessage :: myMessage =', $scope.myMessage);
    if ($scope.myMessage && $scope.myMessage.text.trim() !== "") {
      SailsSocket.post('/message', $scope.myMessage);
      $scope.myMessage.text = "";
    }
  };
});
