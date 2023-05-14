const Board = (function() {
    const ticTac = [];
    const squares = document.querySelectorAll(`[class^=square]`);
    const squaresList = Array.from(squares);
    const announcement = document.querySelector('.creditwhereitsdue');
    let counter = 0;
    const gameBoard = document.querySelector('.gameboard');

    const clickFunc = e => {
        const index = squaresList.indexOf(e.target);
        if (ticTac[index] === undefined) {
            ++counter;
            gameTrack(index, pOne, pTwo, counter);
        };
    };
    const move = gameBoard.addEventListener('click', clickFunc);
    const gameOver = (x, y, z, msg) => {
        squares[x].classList.add('won');
        squares[y].classList.add('won');
        squares[z].classList.add('won');
        announcement.textContent = msg;
        announcement.classList.add('big');
        gameBoard.removeEventListener('click', clickFunc);
    }
    return {squares, ticTac, gameOver};
}());

const gameTrack = (indexVal, p1, p2, turnCount) => {
    const turnTrack = () => {
        if (turnCount % 2 != 0) {
            return p1.myToken;
        } else {
            return p2.myToken;
        };
    };
    const whoseTurn = turnTrack();
    const scoreTrack = () => {
        const tttArray = Board.ticTac;
        if (tttArray[indexVal] === undefined) {
                tttArray[indexVal] = whoseTurn;
                Board.squares[indexVal].textContent = tttArray[indexVal];
                p1.didYouWin();
                p2.didYouWin();
                };
    };
    const whatsScore = scoreTrack();
    return {turnTrack, whatsScore};
};

const Player = (name, xox) => {
    const getName = name;
    const myToken = xox;
    const winValues = [
        [0, 1, 2],
        [3, 4, 5], 
        [6, 7, 8], 
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6], 
        ];
    const winChecker = (x, y, z) => {
        if (Board.ticTac[x] === myToken) {
            if ((Board.ticTac[x] === Board.ticTac[y]) && (Board.ticTac[x] === Board.ticTac[z])) {
                const winMessage = name + ' won the game!'
                const stopGame = Board.gameOver;
                stopGame(x, y, z, winMessage);
            };
        };
    };
    const didYouWin = () => {
        for (i = 0; i < winValues.length; ++i) {
            let good = winValues[i];
            winChecker(...good);
        };
    };
    return {getName, myToken, didYouWin};
};

const pOne = Player('Player One', 'X');
const pTwo = Player('Player Two', 'O');

const rldBtn = document.querySelector('.rldBtn');
rldBtn.addEventListener('click', () => {
    location.reload();
    return false;
})