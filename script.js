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

        //Function which will push user move to playerMoves obj
        const pushPlayerMoves = (player, move) => {
            playerMoves[player].push(move);
        };
    
        //Function to add user checked symbol to game board
        const makeMove = (index, symbol) => {
            gameBoard[index] = symbol;
            console.log(gameBoard);
        };
    
        //Function that resets board to initial state
        const resetBoard = () => {
            for (let i = 0; i < gameBoard.length; i++) {
                gameBoard[i] = '';
            }
        };
    
        return { WINNABLE_CELLS, makeMove, resetBoard, pushPlayerMoves, resetPlayerMoves };
    }
    
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

        //Function to stop game if it is draw
        const declareDraw = () => {
            if (moveCount === 9) {
                isGameOver = true;
            }
        };

        const restartGame = () => {
            isGameOver = false;
            moveCount = 0;
            gameFlow.resetPlayerMoves()
            gameFlow.resetBoard();
        };
        //Function that loops trough all winnable combinations and for each cell compares that all indices is included in player moves
        const checkForWinningCombination = (array, player) => {
            return array.some((cells) => cells.every((cell) => player.includes(cell)));
        };
        
        const handleMove = (move) => {
            const playerStatus = gameFlow.getPlayer(gameFlow.WINNABLE_CELLS ,isPlayerOneMove)
            pushSymbol(move);
            declareDraw();
            checkForWinningCombination(playerStatus);
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
                gameLogic.handleMove(cell.getAttribute('data-value'));
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

