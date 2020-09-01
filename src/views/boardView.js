import {Observable} from "../models/Observable.js";
import {BALL_SELECTED_EVENT, CELL_SELECTED_EVENT} from "../CONSTANTS.js";

export class BoardView {
    constructor() {
        this.isExist = false;
        this.observer = new Observable();
        this.dispatchStartPoint = this.dispatchStartPoint.bind(this)
        this.dispatchEndPoint = this.dispatchEndPoint.bind(this);
    }

    render(){
        if (!this.isExist) {
            this.create()
            this.isExist = true;
            return
        }
        this.update()
    }

    create() {
        this.board = document.createElement('div');
        for (let i = 0; i < this.matrix.length; i++) {
            const row = document.createElement('div');
            row.classList.add('row');
            for (let j = 0; j < this.matrix[i].length; j++) {
                const cell = document.createElement('div');
                cell.setAttribute('id', `i:${i}_j:${j}`);
                cell.classList.add('cell');
                if (this.matrix[i][j] < 0) {
                    const ball = document.createElement('div');
                    ball.classList.add('ball');
                    this.setColor(this.matrix[i][j], ball);
                    ball.addEventListener('click', this.dispatchStartPoint);
                    cell.appendChild(ball);
                    row.appendChild(cell);
                    continue;
                }
                cell.addEventListener('click', this.dispatchEndPoint);
                row.appendChild(cell);
            }
            this.board.appendChild(row);
        }
        document.body.appendChild(this.board);
    }

    update() {
        for (let i = 0; i < this.board.children.length; i++) {
            for (let j = 0; j < this.board.children[i].children.length; j++) {
                const cell = this.board.children[i].children[j];
                if (cell.childElementCount) {
                    cell.children[0].remove();
                }
                cell.removeEventListener('click', this.dispatchEndPoint);

                if (this.matrix[i][j] < 0) {
                        const ball = document.createElement('div');
                        ball.classList.add('ball');
                        this.setColor(this.matrix[i][j], ball);
                        ball.addEventListener('click', this.dispatchStartPoint);
                        cell.appendChild(ball);
                        continue;
                }
                cell.addEventListener('click', this.dispatchEndPoint)
            }
        }
    }

    dispatchStartPoint(event) {
        let i = Array.from(event.target.parentElement.parentElement.parentElement.children).indexOf(event.target.parentElement.parentElement);
        let j = Array.from(event.target.parentElement.parentElement.children).indexOf(event.target.parentElement);

        this.observer.notify(BALL_SELECTED_EVENT, {i, j});
        console.log(`startI: ${i}_startJ: ${j}`);
    }

    dispatchEndPoint(event) {
        let i = Array.from(event.target.parentElement.parentElement.children).indexOf(event.target.parentElement);
        let j = Array.from(event.target.parentElement.children).indexOf(event.target);
        this.observer.notify(CELL_SELECTED_EVENT,{i, j})
        console.log(`endI: ${i}_endJ: ${j}`);
    }


    setColor(digit, ball) {
        switch (digit) {
            case -1:
                ball.classList.add('blue');
                break;

            case -2:
                ball.classList.add('red');
                break;

            case -3:
                ball.classList.add('green');
                break;

            case -4:
                ball.classList.add('yellow');
                break;

            case -5:
                ball.classList.add('aqua');
                break;

            case -6:
                ball.classList.add('blueviolet');
                break;

        }
    }

    setData(matrix) {
this.matrix = matrix;
this.render()
    }
}