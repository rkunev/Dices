(function() {
  'use strict';

  angular
    .module('dices')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {

    $log.debug('runBlock end');
  }

})();
