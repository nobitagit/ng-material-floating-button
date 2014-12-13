var mfb = angular.module('ng-mfb', []);

mfb.directive('mfbMenu', [function(){
  return {
    restrict: 'EA',
    template: '<div>test template</div>'
  };
}]);