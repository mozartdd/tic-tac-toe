const globalWrapper = (() => {
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
        //Obj that hold information of player chosen cells inside of an arrays
        const playerMoves = {
            player1: [],
            player2: []
        };

        const resetPlayerMoves = () => {
            playerMoves.player1 = [];
            playerMoves.player2 = [];
        };

        //Function to add user checked symbol to game board
        const makeMove = (index, symbol) => {
            if(gameBoard[index] === '') {
                gameBoard[index] = symbol;
                console.log(gameBoard);
            }
        };
    
        //Function that resets board to initial state
        const resetBoard = () => {
            for (let i = 0; i < gameBoard.length; i++) {
                gameBoard[i] = '';
            }
        };
    
        return { WINNABLE_CELLS, playerMoves, makeMove, resetBoard, resetPlayerMoves };
    }
    
    //TODO:1) fix bug that after game is over engine is showing that game is won by opposite from winner player
    //TODO:2) fix bug that i can push same values to player move obj
    function GameLogic() {
        let isPlayerOneMove = true;
        let isGameOver = false;
        let moveCount = 0;

        const player1Symbol = 'X';
        const player2Symbol = 'O';

        //Function that adds player symbol to gameBoard obj based on player move
        const pushSymbol = (move) => {
            if (!isGameOver) {
                const currentSymbol = isPlayerOneMove ? player1Symbol : player2Symbol;
                gameFlow.makeMove(move, currentSymbol);
                isPlayerOneMove = !isPlayerOneMove;  // Toggles the turn
                moveCount++;
                console.log(moveCount);
            }
        };
        //Function which will push user move to playerMoves obj
        const pushPlayerMoves = (move) => {
            const currentPlayer = isPlayerOneMove ? gameFlow.playerMoves.player1 : gameFlow.playerMoves.player2;
            if(!isGameOver) {
                currentPlayer.push(move);      
            }
        };
        

        //Function to stop game if it is draw
        const declareDraw = () => {
            if (moveCount === 9) {
                isGameOver = true;
                console.log('Game has ended with draw!');
            }
        };

        const restartGame = () => {
            isPlayerOneMove = true;
            isGameOver = false;
            moveCount = 0;
            gameFlow.resetPlayerMoves()
            gameFlow.resetBoard();
        };
        //Function that loops trough all winnable combinations and for each cell compares that all indices is included in player moves
        const checkForWinningCombination = (array, player) => {
            const winner =  array.some((cells) => cells.every((cell) => player.includes(cell)));
            const currentSymbol = isPlayerOneMove ? player1Symbol : player2Symbol;
            console.log(gameFlow.playerMoves);
            if (winner) {
                console.log(`${currentSymbol} won the game`);
                isGameOver = true;
            }
        };
        //Declares winner
        const declareWin = () => {

        }
        
        const handleMove = (move) => {
            const currentPlayer = isPlayerOneMove ? gameFlow.playerMoves.player1 : gameFlow.playerMoves.player2;
            pushPlayerMoves(move);
            pushSymbol(move);
            declareDraw();
            checkForWinningCombination(gameFlow.WINNABLE_CELLS, currentPlayer);            
        }
        
        return { handleMove, restartGame};
    }
    
    function GameControls() {
        const startBtn = document.querySelector('[data-class="start-btn"]');
        const gameBoard = document.querySelector('[data-class="high-container"]');
        const cells = document.querySelectorAll('[data-class="cell"]');

        //Makes action after cell on board is pressed
        cells.forEach((cell) => {
            cell.addEventListener('click', () => {
                gameLogic.handleMove(+cell.getAttribute('data-value'));
            })
        }); 
        
        const resetBtn = document.querySelector('[data-class="restart-btn"]')
            .addEventListener('click', gameLogic.restartGame);

        startBtn.addEventListener('click', () => {
            startBtn.closest('.player-input-fields').style.display = 'none';
            gameBoard.style.display = 'grid';
        })

        return { };
    }
    return {GameFlow, GameLogic, GameControls};
})();

const gameFlow = globalWrapper.GameFlow();
const gameLogic = globalWrapper.GameLogic();
const gameControls = globalWrapper.GameControls();

