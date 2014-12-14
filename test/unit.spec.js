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

  it('should properly transclude the div element', function(){
    var tpl = '<div mfb-menu position="tr" effect="zoomin" label="hover here" active-icon="ion-edit" resting-icon="ion-plus-round">' +
              '  <a mfb-button icon="icon-name" label="label-text"></a>' +
              '</div>';

    var node = compile(tpl);
    $rootScope.$digest();

    expect(node.hasClass('mfb-component--tr')).toBeTruthy();
    expect(node.find('ul').hasClass('mfb-component__list')).toBeTruthy();      
  });


  describe('when passing an option to the position attribute', function(){

    var node;

    function generateTpl( pos ){
      var tpl = '<div mfb-menu position="' + pos +'"></div>';

      node = compile(tpl);
      $rootScope.$digest();      
    }

    it('should place the menu on top right if "tr" is passed', function(){
      generateTpl('tr');
      expect(node.hasClass('mfb-component--tr')).toBeTruthy();     
    });

    it('should place the menu on top left if "tl" is passed', function(){
      generateTpl('tl');
      expect(node.hasClass('mfb-component--tl')).toBeTruthy();     
    });

    it('should place the menu on bottom right if "br" is passed', function(){
      generateTpl('br');
      expect(node.hasClass('mfb-component--br')).toBeTruthy();     
    });

    it('should place the menu on top left if "bl" is passed', function(){
      generateTpl('bl');
      expect(node.hasClass('mfb-component--bl')).toBeTruthy();     
    });            
  });




});