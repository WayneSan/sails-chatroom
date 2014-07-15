'use strict';

/**
 * The main Sails Angular app module
 *
 * @type {angular.Module}
 */
var app = angular.module('chatroom', ['ui.bootstrap']);

app.directive('scrollBottomOnMessage', function() {
  return function(scope, element, attrs) {
    scope.$watch(function() { return scope.messages }, function(messages) {
      //console.log('scrollBottomOnMessage', messages);
      if (messages && messages.length) {
        $(element).animate({
          scrollTop: element.prop('scrollHeight')
        }, 1000);
      }
    });
  };
});
