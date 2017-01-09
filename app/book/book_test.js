'use strict';

describe('myApp.book module', function() {

  beforeEach(module('myApp.book'));

  describe('view2 controller', function(){

    it('should ....', inject(function($controller) {
      //spec body
      var view2Ctrl = $controller('BookCtrl');
      expect(view2Ctrl).toBeDefined();
    }));

  });
});