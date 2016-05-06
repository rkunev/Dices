( function() {
    'use strict';

    angular
        .module( 'dices.board' )
        .service( 'scoreSheetService', scoreSheetService );

    /** @ngInject */
    function scoreSheetService( ScoreSheetModel, ScoreSheetCellModel, utilitiesService, diceCombinations ) {
        this.updateUnlockedCellValues = updateUnlockedCellValues;
        this.updateTotal = updateTotal;

        /**
         * Generate a new scoresheet with updated total property.
         *
         * @param  {ScoreSheet} scoreSheet
         * @return {ScoreSheet}
         */
        function updateTotal( scoreSheet ) {
            var newScoreSheet = new ScoreSheetModel( {
                total: scoreSheet.total,
                cells: scoreSheet.cells
            } );

            return newScoreSheet.updateTotal();
        }

        /**
         * Fill all unlocked cells with the possible result.
         * Instead of modifing the passed ScoreSheet it creates a new one
         * with filled values.
         *
         * @param  {ScoreSheet}
         * @param  {Array}      roll
         * @return {ScoreSheet}
         */
        function updateUnlockedCellValues( scoreSheet, roll ) {
            var newCells = scoreSheet.cells.map( function( cell ) {
                return new ScoreSheetCellModel( {
                    id: cell.id,
                    isLocked: cell.isLocked,
                    value: cell.isLocked ? cell.value : calculateResult( roll, cell.id )
                } );
            } );

            return new ScoreSheetModel( {
                total: scoreSheet.total,
                cells: newCells
            } );
        }

        /**
         * Given the roll and the combination will calculate the possible result.
         * An entry point for calculating any dice result.
         * @todo  This might be refactored as a utility service or diceService
         *
         * @param  {Array}  roll
         * @param  {number} combinationId The combination Id from the board constants
         * @return {number}
         */
        function calculateResult( roll, combinationId ) {
            var result = 0;

            switch ( combinationId ) {
                case diceCombinations.ONES.ID:
                case diceCombinations.TWOS.ID:
                case diceCombinations.THREES.ID:
                case diceCombinations.FOURS.ID:
                case diceCombinations.FIVES.ID:
                case diceCombinations.SIXES.ID:
                    // @fixme this might not work if ids are not 1-6
                    result = calculateOneOfAKind( roll, combinationId );
                    break;
                case diceCombinations.ONE_PAIR.ID:
                    result = calculateOnePair( roll );
                    break;
                case diceCombinations.TWO_PAIRS.ID:
                    result = calculateTwoPairs( roll );
                    break;
                case diceCombinations.THREE_OF_A_KIND.ID:
                    result = calculateSameOfAKind( roll, 3 );
                    break;
                case diceCombinations.FOUR_OF_A_KIND.ID:
                    result = calculateSameOfAKind( roll, 4 );
                    break;
                case diceCombinations.SMALL_STRAIGHT.ID:
                case diceCombinations.LARGE_STRAIGHT.ID:
                    result = calculateStraight( roll, combinationId );
                    break;
                case diceCombinations.FULL_HOUSE.ID:
                    result = calculateFullHouse( roll );
                    break;
                case diceCombinations.YATZY.ID:
                    result = calculateYatzy( roll );
                    break;
                case diceCombinations.CHANCE.ID:
                    result = utilitiesService.getArraySum( roll );
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
         * @param  {Array}  roll
         * @param  {number} kind       Which duplicates to find (1, 2, 3, 4, 5 or 6)
         * @return {number}
         */
        function calculateOneOfAKind( roll, kind ) {
            var result = 0,
                duplicatesCount = utilitiesService.countInArray( roll, kind );

            if ( duplicatesCount ) {
                result = duplicatesCount * kind;
            }

            return result;
        }

        /**
         * Given the rolled dice checks to see if there is a pair (i.e. 2x6).
         * Returns the sum of the pair.
         *
         * @param  {Array}  roll
         * @return {number}
         */
        function calculateOnePair( roll ) {
            var result = 0,
                pairSum = 0,
                sortedRoll = roll.slice().sort();

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
         * @fixme Will not work with 6 dice roll. Also can be done better without mutations to sortedRoll
         *
         * @param  {Array}  roll
         * @return {number}
         */
        function calculateTwoPairs( roll ) {
            var result = 0,
                pairs = [],
                sortedRoll = roll.slice().sort();

            pairs.push( utilitiesService.splicePair( sortedRoll ) );
            pairs.push( utilitiesService.splicePair( sortedRoll ) );

            if ( ( pairs[ 0 ].length && pairs[ 1 ].length ) && ( pairs[ 0 ][ 0 ] !== pairs[ 1 ][ 0 ] ) ) {
                pairs = Array.prototype.concat( pairs[ 0 ], pairs[ 1 ] );

                result = utilitiesService.getArraySum( pairs );
            }

            return result;
        }

        /**
         * Given the rolled dice checks to see if there are n dice of the same kind.
         * Returns the sum of the found duplicate dice.
         *
         * @param  {Array}  roll
         * @param  {number} n         How many duplicates to find (i.e. 2, 3, 4 or 5)
         * @return {number}
         */
        function calculateSameOfAKind( roll, n ) {
            var result = 0;

            for ( var i = 6; i > 0; i-- ) {
                if ( utilitiesService.countInArray( roll, i ) >= n ) {
                    result = i * n;
                    break;
                }
            }

            return result;
        }

        /**
         * Given the rolled dice checks to see if there is a small or a large straight.
         * Returns the score for rolling the respective straight.
         *
         * @param  {Array}  roll
         * @param  {number} combinationId The combination Id from the board constants
         * @return {number}
         */
        function calculateStraight( roll, combinationId ) {
            var result = 0,
                hasDuplicates = utilitiesService.hasDuplicates( roll ),
                hasOnes = utilitiesService.arrayContains( roll, 1 ),
                hasSixes = utilitiesService.arrayContains( roll, 6 );

            if ( hasDuplicates ) {
                return result;
            }

            /**
             * Small straight contains a '1' and doesn't contain '6'.
             * Large doesn't contain a '1' and contains a '6'.
             */
            if ( combinationId === diceCombinations.SMALL_STRAIGHT.ID ) {
                if ( hasOnes && !hasSixes ) {
                    result = utilitiesService.getArraySum( roll );
                }
            } else if ( combinationId === diceCombinations.LARGE_STRAIGHT.ID ) {
                if ( !hasOnes && hasSixes ) {
                    result = utilitiesService.getArraySum( roll );
                }
            }

            return result;
        }

        /**
         * Given the rolled dice checks to see if there is 2xN + 3xM combination.
         * Returns the score for rolling a full house.
         * @fixme Will not work with 6 dice roll.
         *
         * @param  {Array}  roll
         * @return {number}
         */
        function calculateFullHouse( roll ) {
            var result = 0,
                threeOfAKind = [],
                sortedRoll = roll.slice().sort();

            // Get the 3 of a kind.
            for ( var i = 0; i < roll.length; i++ ) {
                if ( sortedRoll[i] === sortedRoll[ i + 1 ] && sortedRoll[ i ] === sortedRoll[ i + 2 ] ) {
                    threeOfAKind = sortedRoll.splice( i, 3 );
                    break;
                }
            }

            // If there was 3 of a kind check if remaining dice contain a pair
            if ( threeOfAKind.length && ( sortedRoll[ 0 ] === sortedRoll[ 1 ] ) ) {
                result = utilitiesService.getArraySum( roll );
            }

            return result;
        }

        /**
         * Given the rolled dice checks to see if there are 5 of the same kind.
         * Returns the score for rolling a yatzy.
         *
         * @param  {Array}  roll
         * @return {number}
         */
        function calculateYatzy( roll ) {
            var result = 0,
                yatzy = calculateSameOfAKind( roll, 5 );

            if ( yatzy > 0 ) {
                result = 50 + yatzy;
            }

            return result;
        }
    }
} )();
