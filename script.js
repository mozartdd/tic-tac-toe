(() => {
    function GameFlow() {
        //Board to hold cells/fields selected by user's
        const gameBoard = Array(9).fill('');
        //Shallow copy of gameBoardArray
        const gameBoardCopy = [...gameBoard];

        const WINNABLE_CELLS = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], //rows

            [0, 3, 6], [1, 4, 7], [2, 5, 8], //columns

            [0, 4, 8], [2, 4, 6] //diagonal
        ];

        const playerMoves = {
            player1: [],
            player2: []
        };

        //Function to add user checked symbol to game board
        function makeMove(index, symbol) {
            gameBoard[index] = symbol;
        };
        //Function that loops trough all winnable combinations and for each cell compares that all indices is included in player moves
        function checkForWinningCombination(player, winCells) {
            return winCells.some((cells) => cells.every((cell ) => player.includes(cell)));
        }



        return {makeMove, checkForWinningCombination};
    }

    function GameLogic() {
            
    }
    return {GameFlow};
})();









