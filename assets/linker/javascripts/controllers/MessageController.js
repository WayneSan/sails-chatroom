'use strict';

app.controller('MessageController', function($scope, SailsSocket, $log) {
  //
  // Listen for Sails/Socket events
  //
  $scope.$on('SailsSocket:connect', function(ev, data) {
    // Get full collection of todos
    SailsSocket.get(
      '/message?sort=createdAt%20DESC&limit=10', {},
      function(response) {
        $log.debug('SailsSocket::/message', response);
        $scope.messages = response;
      });
  });
});
