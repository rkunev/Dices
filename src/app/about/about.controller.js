(function() {
  'use strict';

  angular
    .module('dices')
    .controller('AboutController', AboutController);

  /** @ngInject */
  function AboutController() {
    var vm = this;

    vm.creationDate = 1449843091733;
    vm.title = 'Hi from About.html';
    vm.description = 'Static text from AboutController';
  }
})();
