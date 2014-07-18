'use strict';

(function($) {
  $(document).ready(function() {
    $('[data-toggle="tooltip"]').tooltip();
  });
})(jQuery);

/**
 * The main Sails Angular app module
 *
 * @type {angular.Module}
 */
var app = angular.module('chatroom', ['customDirectives', 'ui.utils', 'ui.bootstrap']);

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
    scope.$watch('messages.length', function(length) {
      //console.log('scrollBottomOnMessage', length);
      if (length) {
        $(element).animate({
          scrollTop: element.prop('scrollHeight')
        }, 1000);
      }
    });
  };
});
