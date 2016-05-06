(function() {
    'use strict';

    angular
        .module( 'dices' )
        .directive( 'disableClick', disableClickDirective );

    /** @ngInject */
    function disableClickDirective( $parse ) {
        var directive = {
            priority: 100, // compile before ngClick
            restrict: 'A',
            compile: disableClickCompile
        };

        return directive;

        function disableClickCompile( $element, attr ) {
            var fn = $parse( attr.disableClick );

            return {
                pre: function link( scope, element ) {
                    var eventName = 'click';

                    element.on( eventName, function( event ) {
                        var callback = function() {
                            if ( fn( scope, { $event: event } ) ) {
                                event.stopImmediatePropagation();
                                event.preventDefault();

                                return false;
                            }
                        };

                        scope.$evalAsync( callback );
                    } );
                },
                post: function() {}
            }
        }
    }
})();
