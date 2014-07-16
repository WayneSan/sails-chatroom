(function() {
  'use strict';

  angular.module('customDirectives', []).
    directive('contenteditable', ['$sce', function($sce) {
      return {
        restrict: 'A', // only activate on element attribute
        require: '?ngModel', // get a hold of NgModelController
        link: function(scope, element, attrs, ngModel) {
          if(!ngModel) return; // do nothing if no ng-model

          // Specify how UI should be updated
          ngModel.$render = function() {
            element.html($sce.getTrustedHtml(ngModel.$viewValue || ''));
          };

          // Listen for change events to enable binding
          element.on('blur change', function() {
            scope.$apply(read);
          }).on('focus', function() {
            requestAnimationFrame(function() {
              var range = document.createRange();
              range.selectNodeContents(element[0]);
              var sel = window.getSelection();
              sel.removeAllRanges();
              sel.addRange(range);
            });
          }).on('keypress', function(ev) {
            if (ev.keyCode === 13) {
              var nextSibling = this.nextSibling || this.parentElement.nextSibling;
              nextSibling.focus();
              ev.preventDefault();
            }
          });
          read(); // initialize

          // Write data to the model
          function read() {
            var text = element.text();
            if (text !== undefined) {
              if (text.trim() === '') {
                text = ngModel.$viewValue;
                element.text(text);
              } else {
                ngModel.$setViewValue(text);
              }
            }
          }
        }
      };
    }]);

})();
