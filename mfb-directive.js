+(function(window, angular, undefined){

  var mfb = angular.module('ng-mfb', []);

  mfb.directive('mfbMenu', ['$timeout',function($timeout){
    return {
      restrict: 'EA',
      transclude: true,
      replace: true,
      scope: {
        position: '@',
        effect: '@',
        label: '@',
        resting: '@restingIcon',
        active: '@activeIcon',

        menuState: '=?',
        togglingMethod: '@',
      },
      templateUrl: 'menu.tpl.html',
      link: function(scope, elem, attrs) {

        var openState = 'open',
            closedState = 'closed';

        /**
         * Check if we're on a touch-enabled device.
         * Requires Modernizr to run, otherwise simply returns false
         */
        function _isTouchDevice(){
          return window.Modernizr && Modernizr.touch;
        }

        function _isHoverActive(){
          return scope.togglingMethod === 'hover';
        }

        /**
         * Convert the toggling method to 'click'.
         * This is used when 'hover' is selected by the user
         * but a touch device is enabled.
         */
        function useClick(){
          scope.$apply(function(){
            scope.togglingMethod = 'click';
          });
        }
        /**
         * Invert the current state of the menu.
         */
        function flipState() {
          scope.menuState = scope.menuState === openState ? closedState : openState;
        }

        /**
         * Set the state to user-defined value. Fallback to closed if no
         * value is passed from the outside.
         */
        //scope.menuState = attrs.menuState || closedState;
        if(!scope.menuState){
          scope.menuState = closedState;
        }

        scope.clicked = function() {
          if(!_isHoverActive()){
            flipState();
          }
        };
        scope.hovered = function() {
          if(_isHoverActive()){
            //flipState();
          }
        }

        /**
         * If on touch device AND 'hover' method is selected:
         * wait for the digest to perform and then change hover to click.
         */
        if ( _isTouchDevice() && _isHoverActive() ){
          $timeout(useClick);
        }

        attrs.$observe('menuState', function(){
          scope.currentState = scope.menuState;
        });

      }
    };
  }]);


  mfb.directive('mfbButton', [function(){
    return {
      require: '^mfbMenu',
      restrict: 'EA',
      transclude: true,
      replace: true,
      scope: {
        icon: '@',
        label: '@'
      },
      templateUrl: 'button.tpl.html'
    };
  }]);

})(window, angular);
