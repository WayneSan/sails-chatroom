'use strict';

/**
 * The main Sails Angular app module
 *
 * @type {angular.Module}
 */
var app = angular.module('chatroom', ['ui.bootstrap']);

app.filter('prettyDate', function() {
  return function(dateString) {
    var dateMoment = moment(dateString),
        dateDiffNow = moment() - dateMoment;
    if (dateDiffNow < 3600000) {
      return dateMoment.fromNow();
    } else if (dateDiffNow < 86400000) {
      return dateMoment.format('HH:mm');
    }
    return dateMoment.format('YYYY-MM-DD HH:mm');
  };
});

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
