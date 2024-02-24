import { useEffect, useState } from "react";
import Square from "./Square.jsx";
import './css/Board.css';

const PLAYERSYMBOL = ['X', 'O'];
const WINCRITERIA = ['012', '345', '678', '036', '147', '258', '048', '246'];

function Board(props) {
    const [currentPlayer, setCurrentPlayer] = useState(PLAYERSYMBOL[0]);
    const [winner, setWinner] = useState(null);
    const [square, setSquare] = useState(Array.from(new Array(9)));

    useEffect(() => {
        let playerX = getAreaClickedByPlayer(square, PLAYERSYMBOL[0]);
        let playerY = getAreaClickedByPlayer(square, PLAYERSYMBOL[1]);
        let hasWinner = checkWinOrDraw(playerX, playerY);
        if (hasWinner?.won) {
            setWinner(hasWinner.won);
        } else if (hasWinner?.draw) {
            setWinner("DRAW");
        }
    }, [square]);

    const getAreaClickedByPlayer = (square, playerToCheck) => {
        return square.map((val, index) => (val === playerToCheck) ? index : null).filter(ele => ele !== null);
    }

    const checkWinOrDraw = (playerX, playerY) => {
        let XWon = WINCRITERIA.some(winCon => winCon.split("").every(ele => playerX.join("").includes(ele)));
        let YWon = WINCRITERIA.some(winCon => winCon.split("").every(ele => playerY.join("").includes(ele)));
        if (XWon || YWon) {
            return { won: XWon ? PLAYERSYMBOL[0] : PLAYERSYMBOL[1] };
        }
        if (playerX.length + playerY.length === 9) {
            return { draw: 1 };
        }
        return {};
    }

    const handleClick = (e) => {
        if (winner) {
            return;
        }
        let buttonId = e.target.dataset.buttonId;
        let tempSquare = [...square];
        if (tempSquare[buttonId] === undefined) {
            tempSquare[buttonId] = currentPlayer;
            setSquare(tempSquare);
            setCurrentPlayer(prevPlayer => prevPlayer === PLAYERSYMBOL[0] ? PLAYERSYMBOL[1] : PLAYERSYMBOL[0]);
        }
    }

    const resetBoard = () => {
        setCurrentPlayer(PLAYERSYMBOL[0]);
        setWinner(null);
        setSquare(Array.from(new Array(9)));
    }

    return <div className="board-container">
        {winner != null ?
            winner === "DRAW" ?
                <div className="board-header"><span>Draw</span> <button onClick={resetBoard}>Reset Board</button></div>
                :
                <div className="board-header"><span>Winner is: {winner}</span> <button onClick={resetBoard}>Reset Board</button></div>
            :
            <div className="board-header">Current player: {currentPlayer}</div>
        }
        <div className="board" onClick={handleClick}>
            {
                square.map((_, index) => {
                    let playerStyles = '';
                    if (square[index] === PLAYERSYMBOL[0]) {
                        playerStyles = 'player-one-styles';
                    } else if (square[index] === PLAYERSYMBOL[1]) {
                        playerStyles = 'player-two-styles';
                    }
                    return <Square key={index} className={playerStyles} displayValue={square[index]} buttonId={index} />
                })
            }
        </div>
    </div>;
}

export default Board;