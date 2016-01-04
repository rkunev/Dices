( function() {
    'use strict';

    angular
        .module( 'dices.board' )
        .service( 'board', board );

    /** @ngInject */
    function board( $log, diceCombinations ) {
        var service = {
            calculateResult: calculateResult,
            sumResults: sumResults
        };

        return service;

        function sumResults( allResults ) {
            var result = 0;

            angular.forEach( allResults, function( res ) {
                result += res.value;
            });

            return result;
        }

        function calculateResult( rollResult, combinationId ) {
            var result = 0;

            switch ( combinationId ) {
                case diceCombinations.ONES.ID:
                case diceCombinations.TWOS.ID:
                case diceCombinations.THREES.ID:
                case diceCombinations.FOURS.ID:
                case diceCombinations.FIVES.ID:
                case diceCombinations.SIXES.ID:
                    result = calculateOneOfAKind( rollResult, combinationId );
                    break;
                default:
                    $log.warn( 'No such combination' );
            }

            return result;
        }

        function calculateOneOfAKind( rollResult, kind ) {
            var result = 0;

            rollResult.forEach( function( die ) {
                if ( die === kind ) {
                    result += kind;
                }
            } );

            return result;
        }

    }

} )();
