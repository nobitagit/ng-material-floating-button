describe('ng-mfb', function() {

  'use strict';

  var $compile,
      $timeout,
      $rootScope;

  beforeEach(module('ng-mfb'));

  beforeEach(inject(function(_$compile_, _$rootScope_, _$timeout_){
    $compile = _$compile_;
    $rootScope = _$rootScope_;
    $timeout = _$timeout_;
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
    $rootScope.$digest();
    return node.contents();
  }

  describe('the directive', function(){

    it('should properly transclude the div element', function(){
      var tpl = '<div mfb-menu position="tr" effect="zoomin" label="hover here" active-icon="ion-edit" resting-icon="ion-plus-round">' +
                '  <a mfb-button icon="icon-name" label="label-text"></a>' +
                '</div>';

      var node = compile(tpl);

      expect(node.hasClass('mfb-component--tr')).toBeTruthy();
      expect(node.find('ul').hasClass('mfb-component__list')).toBeTruthy();
    });

    it('should be possibile to be instantiated as an attribute', function(){
        var tpl = '<div mfb-menu></div>',
            node = compile(tpl);

        expect(node.parent().find('ul')).toBeTruthy();
    });

    it('should be possibile to be instantiated as an element', function(){
        var tpl = '<mfb-menu></mfb-menu>',
            node = compile(tpl);

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

  describe('State of the menu', function() {

    var node;

    function generateTpl(){
      var tpl = '<div mfb-menu menu-state="state"></div>';

      node = compile(tpl);
      $rootScope.$digest();
    }

    it('should be open if user sets it as open', function(){
      $rootScope.state = 'open';
      generateTpl();
      expect(node[0].getAttribute('data-mfb-state')).toBe('open');
    });

    it('should be closed if user sets it as closed', function(){
      $rootScope.state = 'closed';
      generateTpl();
      expect(node[0].getAttribute('data-mfb-state')).toBe('closed');
    });

    it('should default to closed if unspecified', function(){
      $rootScope.state;
      generateTpl();
      expect(node[0].getAttribute('data-mfb-state')).toBe('closed');
    });

    it('should be possible to be changed from outside', function(){
      $rootScope.state;
      generateTpl();
      $rootScope.state = 'open';
      $rootScope.$digest();
      expect(node[0].getAttribute('data-mfb-state')).toBe('open');
    });
  });

  describe('When Touch support is detected', function() {
    var node;

    function generateTpl( togglingMethod ){
      var tpl = '<div mfb-menu toggling-method="' + togglingMethod +'"></div>';
      node = compile(tpl);
      $rootScope.$digest();
    }

    it('hover should be converted to click behavior', function() {
      window.Modernizr = {
        touch: true
      };
      generateTpl('hover');
      $timeout.flush();
      expect(node[0].getAttribute('data-mfb-toggle')).toBe('click');
    });
  });

  describe('Default templates via template-url attribute', function() {
    var node;

    function generateTpl( tplUrl ){
      var tpl = '<div mfb-menu template-url="' + tplUrl +'"></div>';
      node = compile(tpl);
      $rootScope.$digest();
    }

    it('should fallback to core template if unspecified', function() {
      var tpl = '<div mfb-menu></div>',
          i;
      node = compile(tpl);
      $rootScope.$digest();
      i = node.find('i');
      expect(i.length).toBe(2);
    });

    it('should allow for Angular Material template to be requested', function() {
      generateTpl('ng-mfb-menu-md.tpl.html');
      var i = node.find('i'),
          btn = node.find('md-button');
      expect(i.length).toBe(0);
      expect(btn).not.toBe(undefined);
    });

  });

  describe('Custom, user-defined templates', function() {
    var $templateCache, node;

    beforeEach(inject(function(_$templateCache_) {
      $templateCache = _$templateCache_;
    }));

    function generateTpl( tplUrl, pos ){
      var tpl = '<div mfb-menu template-url="' + tplUrl +'" position="'+ pos  +'"></div>';
      node = compile(tpl);
      $rootScope.$digest();
    }

    it('should be possible to be defined and used', function() {
      $templateCache.put('myTpl',
         '<section class="mfb-component--{{position}}"></section>');
      generateTpl('myTpl', 'br');
      expect(node.find('section')).toBeTruthy()
    });

    it('should properly make use of the attributes provided', function() {
      $templateCache.put('myTpl',
         '<section class="mfb-component--{{position}}"></section>');
      generateTpl('myTpl', 'br');
      expect(node.hasClass('mfb-component--br')).toBeTruthy();
    });
  });
});
