var mfb = angular.module('ng-mfb', []);

mfb.directive('mfbMenu', [function(){
  return {
    restrict: 'EA',
    transclude: true,
    replace: true,
    scope: {
      position: '@',
      effect: '@'
    },
    link: function(scope, elem, attrs){
      scope.pos = attrs.position;
      scope.eff = attrs.effect;
    },
    template: '<ul class="mfb-component--{{pos}} mfb-{{eff}}" ng-transclude></ul>'    
  };
}]);

mfb.directive('mfbMainButton', [function(){
  return {
    require: '^mfbMenu',
    restrict: 'EA',
    transclude: true,  
    replace: true,
    template: '<li>test</li>'
  };
}]);

mfb.directive('mfbButton', [function(){
  return {
    require: '^mfbMenu',
    restrict: 'EA',
    transclude: true,  
    replace: true,
    template: '<li ng-transclude></li>'
  };
}]);