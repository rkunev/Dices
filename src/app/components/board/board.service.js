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
                if ( res.isLocked ) {
                    result += res.value;
                }
            } );

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
                case diceCombinations.ONE_PAIR.ID:
                    result = calculateOnePair( rollResult );
                    break;
                case diceCombinations.TWO_PAIRS.ID:
                    result = calculateTwoPairs( rollResult );
                    break;
                case diceCombinations.THREE_OF_A_KIND.ID:
                    result = calculateSameOfAKind( rollResult, 3 );
                    break;
                case diceCombinations.FOUR_OF_A_KIND.ID:
                    result = calculateSameOfAKind( rollResult, 4 );
                    break;
                case diceCombinations.SMALL_STRAIGHT.ID:
                case diceCombinations.LARGE_STRAIGHT.ID:
                    result = calculateStraight( rollResult, combinationId );
                    break;
                case diceCombinations.FULL_HOUSE.ID:
                    result = calculateFullHouse( rollResult );
                    break;
                case diceCombinations.YATZY.ID:
                    result = calculateYatzy( rollResult );
                    break;
                case diceCombinations.CHANCE.ID:
                    result = getArraySum( rollResult );
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

        function calculateOnePair( rollResult ) {
            var result = 0,
                pairSum = 0,
                sortedRoll = rollResult.slice().sort();

            for ( var i = 0; i < sortedRoll.length - 1; i++ ) {
                pairSum = sortedRoll[ i ] + sortedRoll[ i + 1 ];

                if ( sortedRoll[ i ] === sortedRoll[ i + 1 ] ) {
                    if ( pairSum > result ) {
                        result = pairSum;
                    }
                }
            }

            return result;
        }

        function calculateTwoPairs( rollResult ) {
            var result = 0,
                pairs = [],
                sortedRoll = rollResult.slice().sort();

            pairs.push( splicePair( sortedRoll ) );
            pairs.push( splicePair( sortedRoll ) );

            if ( ( pairs[ 0 ].length && pairs[ 1 ].length ) && ( pairs[ 0 ][ 0 ] !== pairs[ 1 ][ 0 ] ) ) {
                pairs = Array.prototype.concat( pairs[ 0 ], pairs[ 1 ] );
                pairs.forEach( function( elem ) {
                    result += elem;
                } )
            }

            function splicePair( sortedRoll ) {
                var pairs = [];

                for ( var i = 0; i < sortedRoll.length - 1; i++ ) {
                    if ( sortedRoll[ i ] === sortedRoll[ i + 1 ] ) {
                        pairs = sortedRoll.splice( i, 2 );
                    }
                }

                return pairs;
            }

            return result;
        }

        function calculateSameOfAKind( rollResult, n ) {
            var result = 0;

            for ( var i = 6; i > 0; i-- ) {
                if ( countInArray( rollResult, i ) >= n ) {
                    result = i * n;
                    break;
                }
            }

            return result;
        }

        function calculateStraight( rollResult, combinationId ) {
            var result = 0;

            /**
             * Small straight contains a '1' and doesn't contain '6'.
             * Large contains a '6' and doesn't contain '1'.
             * If there are no duplicates then we have a specific straight
             */
            if ( combinationId === diceCombinations.SMALL_STRAIGHT.ID ) {
                if ( ( rollResult.indexOf( 1 ) >= 0 && rollResult.indexOf( 6 ) < 0 ) && !hasDuplicates( rollResult ) ) {
                    result = getArraySum( rollResult );
                }
            } else {
                if ( ( rollResult.indexOf( 6 ) >= 0 && rollResult.indexOf( 1 ) < 0 ) && !hasDuplicates( rollResult ) ) {
                    result = getArraySum( rollResult );
                }
            }

            return result;
        }

        function calculateFullHouse( rollResult ) {
            var result = 0,
                threeOfAKind = [],
                sortedRoll = rollResult.slice().sort();

            //* Get the 3 of a kind */
            for ( var i = 0; i < rollResult.length; i++ ) {
                if ( sortedRoll[i] === sortedRoll[i+1] && sortedRoll[i] === sortedRoll[i+2] ) {
                    threeOfAKind = sortedRoll.splice( i, 3 );
                    break;
                }
            }

            //* If there was 3 of a kind check if remaining dice contain a pair */
            if ( threeOfAKind.length && (sortedRoll[0] === sortedRoll[1]) ) {
                result = getArraySum( rollResult );
            }

            return result;
        }

        function calculateYatzy( rollResult ) {
            var result = 0,
                yatzy = calculateSameOfAKind( rollResult, 5 );

            if ( yatzy > 0 ) {
                result = 50 + yatzy;
            }

            return result;
        }

        function countInArray( array, what ) {
            var count = 0;
            for ( var i = 0; i < array.length; i++ ) {
                if ( array[ i ] === what ) {
                    count++;
                }
            }
            return count;
        }

        function hasDuplicates( array ) {
            var sorted_arr = array.slice().sort(),
                hasDuplicate = false;

            for ( var i = 0; i < sorted_arr.length - 1; i++ ) {
                if ( sorted_arr[ i + 1 ] == sorted_arr[ i ] ) {
                    hasDuplicate = true;
                    break;
                }
            }

            return hasDuplicate;
        }

        function getArraySum( array ) {
            return array.reduce( function( prev, next ) {
                return prev + next;
            } )
        }
    }

} )();
