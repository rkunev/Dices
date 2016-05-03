( function() {
    'use strict';

    angular
        .module( 'dices.board' )
        .service( 'board', board );

    /** @ngInject */
    function board( diceCombinations ) {
        var service = {
            calculateResult: calculateResult,
            saveResult: saveResult,
            isGameOver: isGameOver,
            sumResults: sumResults
        };

        return service;

        /**
         * Calculates the points from the saved board entries.
         *
         * @param  {BoardModel} allResults
         * @return {number}
         */
        function sumResults( allResults ) {
            var result = 0;

            angular.forEach( allResults, function( res ) {
                if ( res.isLocked ) {
                    result += res.value;
                }
            } );

            return result;
        }

        /**
         * Given the roll and the combination will calculate the possible result.
         * An entry point for calculating any dice result.
         *
         * @param  {Array} rollResult
         * @param  {number} combinationId The combination Id from the board constants
         * @return {number}
         */
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
                    console.warn( 'No such combination' );
            }

            return result;
        }

        /**
         * Given the rolled dice checks to see if there are duplicate dice for the given kind.
         * Returns the sum of the found duplicate dice.
         *
         * @param  {Array} rollResult
         * @param  {number} kind      Which duplicates to find (1, 2, 3, 4, 5 or 6)
         * @return {number}
         */
        function calculateOneOfAKind( rollResult, kind ) {
            var result = 0;

            rollResult.forEach( function( die ) {
                if ( die === kind ) {
                    result += kind;
                }
            } );

            return result;
        }

        /**
         * Given the rolled dice checks to see if there is a pair (i.e. 2x6).
         * Returns the sum of the pair.
         *
         * @param  {Array} rollResult
         * @return {number}
         */
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

        /**
         * Given the rolled dice checks to see if there are two unique pairs (i.e. 2x6 + 2x5).
         * Returns the sum of the pairs.
         *
         * @param  {Array} rollResult
         * @return {number}
         */
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

        /**
         * Given the rolled dice checks to see if there are n dice of the same kind.
         * Returns the sum of the found duplicate dice.
         *
         * @param  {Array} rollResult
         * @param  {number} n         How many duplicates to find (i.e. 2, 3, 4 or 5)
         * @return {number}
         */
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

        /**
         * Given the rolled dice checks to see if there is any straights.
         * Returns the score for rolling the respective straight.
         *
         * @param  {Array} rollResult
         * @param  {number} combinationId The combination Id from the board constants
         * @return {number}
         */
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

        /**
         * Given the rolled dice checks to see if there is 2xN + 3xM combination.
         * Returns the score for rolling a full house.
         *
         * @param  {Array} rollResult
         * @return {number}
         */
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

        /**
         * Given the rolled dice checks to see if there are 5 of the same kind.
         * Returns the score for rolling a yatzy.
         *
         * @param  {Array} rollResult
         * @return {number}
         */
        function calculateYatzy( rollResult ) {
            var result = 0,
                yatzy = calculateSameOfAKind( rollResult, 5 );

            if ( yatzy > 0 ) {
                result = 50 + yatzy;
            }

            return result;
        }

        /**
         * Returns a new BoardModel with the locked result row from the board rows.
         *
         * @param  {Object}            result       The single row to be locked
         * @param  {Object|BoardModel} boardResults All current board rows
         * @return {Object|BoardModel}              The new BoardModel
         */
        function saveResult( result, boardResults ) {
            var newResults = angular.copy( boardResults );

            angular.forEach( newResults, function( res, i ) {
                if ( res.id === result.id ) {
                    newResults[ i ].isLocked = true;
                }
            } );

            return newResults;
        }

        /**
         * Iterates all rows through provided BoardModel to check for unlocked rows.
         * If there aren't any unlocked rows then the game is over.
         *
         * @param  {Object|BoardModel}  boardResults All current board rows
         * @return {Boolean}
         */
        function isGameOver( boardResults ) {
            var areAllRowsLocked = true;

            for ( var row in boardResults ) {

                //* If any of the rows is unlocked then the game is not over */
                if ( !boardResults[ row ].isLocked ) {
                    areAllRowsLocked = false;
                    break;
                }
            }

            return areAllRowsLocked;
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

        /**
         * Check if the provided array contains duplicates.
         *
         * @param  {Array}  array The array to check
         * @return {Boolean}
         */
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

        /**
         * Returns the sum of all numbers in the array.
         *
         * @param  {Array} array The array.
         * @return {Number}      The sum
         */
        function getArraySum( array ) {
            return array.reduce( function( prev, next ) {
                return prev + next;
            } );
        }
    }

} )();
