import {Line} from "../bisnesLogic/Line.js";
import {BoardView} from "../views/boardView.js";
import {BALL_SELECTED_EVENT, CELL_SELECTED_EVENT} from "../CONSTANTS.js";

export class Game {
    constructor() {
        this.line = new Line()
        this.boardView = new BoardView();
        this.setStartPoint = this.setStartPoint.bind(this);
        this.setEndPoint = this.setEndPoint.bind(this);
        this.boardView.observer.addObserver(BALL_SELECTED_EVENT, this.setStartPoint);
        this.boardView.observer.addObserver(CELL_SELECTED_EVENT, this.setEndPoint);
    }

    start() {
        this.line.createBoard();
        this.boardView.setData(this.line.matrix);
    }



setStartPoint(coordinates) {
        this.line.setStartPoint(coordinates.i, coordinates.j);
}

setEndPoint(coordinates) {
    this.line.setEndPoint(coordinates.i,coordinates.j);
    if (this.line.isReachedToEndPoint()) {
        this.run()
    }
}

run() {
    const timerId = setInterval(() => {
        if (this.line.hasWayToWalk()) {
            this.line.walkToEndpoint(this.line.startDigit);
            this.boardView.setData(this.line.matrix);
            return;
        }
       this.line.resetBoard();
        this.boardView.setData(this.line.matrix);
        let sameDigitsCoordinates = this.line.getDeletedSameDigits(this.line.startI, this.line.startJ);
                if (sameDigitsCoordinates) {
                    this.line.deleteNumbersOfCoordinates(sameDigitsCoordinates);
                    this.boardView.setData(this.line.matrix);
                    clearInterval(timerId);
                    return;
                }
                const digitsArray = this.line.generateRandomDigits();
                for (let i = 0; i < digitsArray.length; i++) {
                    if (this.line.isBoardFilled()) {
                        alert('Game Over...!!!')
                        clearInterval(timerId);
                        return;
                    }
                    let randomCoordinates = this.line.generateRandomCoordinate();

                    while (this.line.matrix[randomCoordinates.i][randomCoordinates.j] !== 0) {
                        randomCoordinates = this.line.generateRandomCoordinate();
                    }
                    this.line.matrix[randomCoordinates.i][randomCoordinates.j] = digitsArray[i];
                    this.boardView.setData(this.line.matrix);
                    sameDigitsCoordinates = this.line.getDeletedSameDigits(randomCoordinates.i, randomCoordinates.j);
                    if (sameDigitsCoordinates) {
                        this.line.deleteNumbersOfCoordinates(sameDigitsCoordinates);
                        this.boardView.setData(this.line.matrix)
                        return;
                    }
                }
        clearInterval(timerId);
    }, 80)
}

}

