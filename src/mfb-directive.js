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

        menuState: '@',
        togglingMethod: '@',
      },
      template: '<ul class="mfb-component--{{position}} mfb-{{effect}}" data-mfb-toggle="{{togglingMethod}}" data-mfb-state="{{currentState}}">' +
                ' <li class="mfb-component__wrap">' +
                '  <a ng-click="toggleMenu()" data-mfb-label="{{label}}" class="mfb-component__button--main">' +
                '   <i class="mfb-component__main-icon--resting {{resting}}"></i>' +
                '   <i class="mfb-component__main-icon--active {{active}}"></i>' +              
                '  </a>' +
                '  <ul class="mfb-component__list" ng-transclude>' +
                '  </ul>' +
                ' </li>' +        
                '</ul>',
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
         * Set the state to user-defined value. Fallback to closed if no
         * value is passed from the outside.
         */
        scope.currentState = attrs.menuState || closedState;

        /**
         * Invert the current state of the menu.
         *
         * The click handler is always attached, so we prevent this callback
         * from firing when hover is selected.
         */
        scope.toggleMenu = function() {
          if ( _isHoverActive() ){ return; }
          scope.currentState = scope.currentState === openState ? closedState : openState;
        };

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
      template: '<li>' + 
                ' <a href="" data-mfb-label="{{label}}" class="mfb-component__button--child">' +
                '   <i class="mfb-component__child-icon {{icon}}"' +
                '   </i>' +
                ' </a>' +
                '</li>'
    };
  }]);

})(window, angular);



