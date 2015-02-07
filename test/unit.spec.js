describe('ng-mfb', function() {

  var $compile,
      $rootScope;

  beforeEach(module('ng-mfb'));

  beforeEach(inject(function(_$compile_, _$rootScope_){
    $compile = _$compile_;
    $rootScope = _$rootScope_;
  }));

  /**
   * This directive uses transclusion so for testing purposes we have to
   * wrap the tested element in a wrapping div and then fetch its
   * contents. See: 
   * Testing Transclusion Directives @ https://docs.angularjs.org/guide/unit-testing
   *
   **/
  function compile( template ){
    var node = $compile('<div>' + template + '</div>')($rootScope);
    return node.contents();
  }

  describe('the directive', function(){

    it('should properly transclude the div element', function(){
      var tpl = '<div mfb-menu position="tr" effect="zoomin" label="hover here" active-icon="ion-edit" resting-icon="ion-plus-round">' +
                '  <a mfb-button icon="icon-name" label="label-text"></a>' +
                '</div>';

      var node = compile(tpl);
      $rootScope.$digest();

      expect(node.hasClass('mfb-component--tr')).toBeTruthy();
      expect(node.find('ul').hasClass('mfb-component__list')).toBeTruthy();      
    });

    it('should be possibile to be instantiated as an attribute', function(){
        var tpl = '<div mfb-menu></div>',
            node = compile(tpl);
        $rootScope.$digest();   

        expect(node.parent().find('ul')).toBeTruthy();
    });

    it('should be possibile to be instantiated as an element', function(){
        var tpl = '<mfb-menu></mfb-menu>',
            node = compile(tpl);
        $rootScope.$digest();   

        expect(node.parent().find('mfb-menu')).toBeTruthy();
    });

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

  describe('when passing an option to the effect attribute', function(){

    it('should assign the correspondig animation class', function(){

      var tpl = '<div mfb-menu effect="zoomin"></div>';

      var node = compile(tpl);
      $rootScope.$digest();  

      expect(node.hasClass('mfb-zoomin')).toBeTruthy();     
    });
  });

  describe('when passing some text to the label attribute', function(){

    it('should assign this text to the main button "data-mfb-label" attribute', function(){

      var label = 'some text',
          tpl = '<div mfb-menu label="' + label + '"></div>',
          node = compile(tpl),
          main_button;

      $rootScope.$digest();  

      main_button = node.find('a').eq(0);
      expect(main_button.attr('data-mfb-label')).toBe(label);
    });
  });

  describe('when passing values to the icons attributes', function() {

    var main_button;

    beforeEach(function(){
      var tpl = '<div mfb-menu active-icon="ion-edit" resting-icon="ion-plus-round"></div>',
          node = compile(tpl);

      $rootScope.$digest();   

      main_button = node.find('a').eq(0);  
    });

    it('should assign the right class for the icon shown at rest', function() {
      var icon1 = main_button.find('i').eq(0);
      expect( icon1.hasClass('mfb-component__main-icon--resting') ).toBeTruthy();
      expect( icon1.hasClass('ion-plus-round') ).toBeTruthy();
    });
    
    it('should assign the right class for the icon shown for active state', function() {
      var icon2 = main_button.find('i').eq(1);
      expect( icon2.hasClass('mfb-component__main-icon--active') ).toBeTruthy();
      expect( icon2.hasClass('ion-edit') ).toBeTruthy();
    });    
  });

  describe('number of child buttons should be the right one', function() {

    it('if manually specified by the user', function() {
      var tpl = '<div mfb-menu position="tr" effect="zoomin" label="hover here" active-icon="ion-edit" resting-icon="ion-plus-round">' +
                '  <a mfb-button icon="icon-name" label="label-text"></a>' +
                '  <a mfb-button icon="icon-name" label="label-text"></a>' +
                '  <a mfb-button icon="icon-name" label="label-text"></a>' +
                '</div>',
          node = compile(tpl),
          buttons;

      $rootScope.$digest();     

      buttons = node.find('ul').children();

      expect(buttons.length).toEqual(3);

    });

    it('if specified through an ng-repeat', function() {

      $rootScope.buttons = [{
          label: 'a link',
          icon: 'ion-paper-airplane'
        },{
          label: 'a link',
          icon: 'ion-paper-airplane'
        },{
          label: 'a link',
          icon: 'ion-paper-airplane'
        }];

      var tpl = '<div mfb-menu position="tr" effect="zoomin" label="hover here" active-icon="ion-edit" resting-icon="ion-plus-round">' +
                '  <a mfb-button icon="{{button.icon}}" label="{{button.label}}" ng-repeat="button in buttons"></a>' +
                '</div>',
          node = compile(tpl),
          buttons;

      $rootScope.$digest();     

      buttons = node.find('ul').children();

      expect(buttons.length).toEqual(3);
          
    });        
  });

  describe('when instantiated with click support', function() {

    var node;

    function generateTpl( state ){
      var tpl = '<div mfb-menu menu-state="' + state +'"></div>';

      node = compile(tpl);
      $rootScope.$digest();      
    }

    describe('should retain the initial state as set by the user:', function(){

      it('data-mfb-state must be "open" if menu-state is "open"', function(){
        generateTpl( 'open' );
        expect(node[0].getAttribute('data-mfb-state')).toBe('open');
      });

      it('data-mfb-state must be "closed" if menu-state is "closed"', function(){
        generateTpl( 'closed' );
        expect(node[0].getAttribute('data-mfb-state')).toBe('closed');
      });      
    });
  });

  describe('Touch support:', function() {
    var node;

    function generateTpl( togglingMethod ){
      var tpl = '<div mfb-menu toggling-method="' + togglingMethod +'"></div>';

      node = compile(tpl);
      $rootScope.$digest();      
    }

    it('', function() {
      window.Modernizr = {
        touch: true
      };
      generateTpl('hover');
    });
  });

});