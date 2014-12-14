describe('ng-mfb', function() {

  var $compile,
      $rootScope;

  beforeEach(module('ng-mfb'));

  beforeEach(inject(function(_$compile_, _$rootScope_){
    $compile = _$compile_;
    $rootScope = _$rootScope_;
  }));

  function compile( template ){
    var node = $compile('<div>' + template + '</div>')($rootScope);
    return node.contents();
  }

  it('should transclude the div element properly', function(){
    //expect(1+3).toBe(9);
    var tpl = '<div mfb-menu  position="tr" effect="zoomin" label="hover here" active-icon="ion-edit" resting-icon="ion-plus-round">' +
              '  <a mfb-button icon="icon-name" label="label-text" ng-repeat="button in buttons"></a>' +
              '</div>'
    var node = compile(tpl);
    $rootScope.$digest();

    console.log(node.children())
    console.log(node.children().length )
    expect(node[0].nodeType).toEqual(1);
    expect(node[1]).toBeUndefined();    
  });

});