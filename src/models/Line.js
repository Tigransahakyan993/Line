export class Line {

    constructor() {
        this.matrix = [];
        this.M = 9;
        this.N = 9;
        this.startI = null;
        this.startJ = null;
        this.endI = null;
        this.endJ = null;
        this.startDigit = null;
        this.setStartPoint = this.setStartPoint.bind(this);
        this.setEndPoint = this.setEndPoint.bind(this);
    }

     startAlgorithm() {
         this.startDigit = this.matrix[this.startI][this.startJ];
         this.matrix[this.startI][this.startJ] = 1;

         let currentCoordinates = [{i: this.startI, j: this.startJ}];
         let currentDigit = 2;
         while (!this.isFinished(currentCoordinates)) {
             this.setNeighbours(currentCoordinates, currentDigit);
             currentDigit++;
             currentCoordinates = this.getCoordinatesOf(currentDigit);
         }

         if (this.isReachedToEndPoint()) {
             while (currentDigit > 0) {
                 this.showShortWay();
                 currentDigit--;
             }
             return
         }
         this.matrix[this.startI][this.startJ] = this.startDigit;
         this.resetBoard();
     }

     hasWayToWalk() {
             if (this.startI - 1 >= 0 && this.matrix[this.startI - 1][this.startJ] === 1) {
                 return true;
             }
             if (this.startJ + 1 < 9 && this.matrix[this.startI][this.startJ + 1] === 1) {
                 return true
             }
             if (this.startI + 1 < 9 && this.matrix[this.startI + 1][this.startJ] === 1) {
                 return true;
             }
            return this.startJ - 1 >= 0 && this.matrix[this.startI][this.startJ - 1] === 1

     }

     resetBoard() {
        for (let i = 0; i < this.M; i++) {
            for (let j = 0; j < this.N; j++) {
                if (this.matrix[i][j] > 0) {
                    this.matrix[i][j] = 0;
                }
            }
        }
    }

     createBoard() {
        for (let i = 0; i < this.M; i++) {
            this.matrix[i] = [];
            for (let j = 0; j < this.N; j++) {
                this.matrix[i][j] = 0;
            }
        }
         const digits = this.generateRandomDigits();
         for (let i = 0; i < digits.length; i++) {
             let coordinate = this.generateRandomCoordinate();
             while (this.matrix[coordinate.i][coordinate.j] !== 0){
                 coordinate = this.generateRandomCoordinate();
             }
             this.matrix[coordinate.i][coordinate.j] = digits[i];
         }
    }

     setStartPoint(i, j) {
        if (this.matrix[i][j] >= 0) return
        this.startI = i;
        this.startJ = j;
    }

     setEndPoint(i, j) {
         if (this.matrix[i][j] !== 0 || !(!(this.startI !== 0 && !this.startI) && !(this.startJ !== 0 && !this.startJ))) {
            return;
        }
        this.endI = i;
        this.endJ = j;
        this.matrix[this.endI][this.endJ] = this.M * this.N;
         console.log(`endI:${this.endI} _ endJ:${this.endJ}`)

         this.startAlgorithm();
         console.log(this.matrix);
    }

     getCoordinatesOf(num) {
        const coordinates = [];
        for (let i = 0; i < this.M; i++) {
            for (let j = 0; j < this.N; j++) {
                if (this.matrix[i][j] === num) {
                    coordinates.push({i: i, j: j})
                }
            }
        }
        return coordinates;
    }

     setNeighbours(currentCoordinates, digit) {

        currentCoordinates.forEach(currentCoordinate => {
            let {i, j} = currentCoordinate;
            if (i - 1 >= 0 && (this.matrix[i - 1][j] === 0)) {
                this.matrix[i - 1][j] = digit + 1;
            }
            if (j + 1 < 9 && (this.matrix[i][j + 1] === 0)) {
                this.matrix[i][j + 1] = digit + 1;
            }
            if (i + 1 < 9 && (this.matrix[i + 1][j] === 0)) {
                this.matrix[i + 1][j] = digit + 1;
            }
            if (j - 1 >= 0 && (this.matrix[i][j - 1] === 0)) {
                this.matrix[i][j - 1] = digit + 1;
            }
        })
    }

     showShortWay() {
        if (this.endI - 1 >= 0
            && this.matrix[this.endI - 1][this.endJ] < this.matrix[this.endI][this.endJ] && this.matrix[this.endI - 1][this.endJ] > 1) {
            this.matrix[this.endI][this.endJ] = 1;
            this.endI -= 1;
            return;
        }
        if (this.endJ + 1 < 9
            && this.matrix[this.endI][this.endJ + 1] < this.matrix[this.endI][this.endJ] && this.matrix[this.endI][this.endJ + 1] > 1) {
            this.matrix[this.endI][this.endJ] = 1;
            this.endJ += 1;
            return;
        }
        if (this.endI + 1 < 9
            && this.matrix[this.endI + 1][this.endJ] < this.matrix[this.endI][this.endJ] && this.matrix[this.endI + 1][this.endJ] > 1) {
            this.matrix[this.endI][this.endJ] = 1;
            this.endI += 1;
            return;
        }
        if (this.endJ - 1 >= 0
            && this.matrix[this.endI][this.endJ - 1] < this.matrix[this.endI][this.endJ] && this.matrix[this.endI][this.endJ - 1] > 1) {
            this.matrix[this.endI][this.endJ] = 1;
            this.endJ -= 1;
            return
        }
         this.matrix[this.endI][this.endJ] = 1;
    }

     walkToEndpoint(startDigit) {
        if (this.startI - 1 >= 0 && this.matrix[this.startI - 1][this.startJ] === 1) {
            this.matrix[this.startI - 1][this.startJ] = startDigit;
            this.matrix[this.startI][this.startJ] = 0;
            this.startI -= 1;
            return;
        }
        if (this.startJ + 1 < 9 && this.matrix[this.startI][this.startJ + 1] === 1) {
            this.matrix[this.startI][this.startJ + 1] = startDigit;
            this.matrix[this.startI][this.startJ] = 0;
            this.startJ += 1;
            return;
        }
        if (this.startI + 1 < 9 && this.matrix[this.startI + 1][this.startJ] === 1) {
            this.matrix[this.startI + 1][this.startJ] = startDigit;
            this.matrix[this.startI][this.startJ] = 0;
            this.startI += 1;
            return;
        }
        if (this.startJ - 1 >= 0 && this.matrix[this.startI][this.startJ - 1] === 1) {
            this.matrix[this.startI][this.startJ - 1] = startDigit;
            this.matrix[this.startI][this.startJ] = 0;
            this.startJ -= 1;
        }
    }

     generateRandomDigits() {
        const randomDigits = [];
        for (let i = 0; i < 3; i++) {
            randomDigits.push(-Math.floor(Math.random() * 6 + 1));
        }
        return randomDigits;
    }

     generateRandomCoordinate() {
        return {i: Math.floor(Math.random() * 9), j: Math.floor(Math.random() * 9)}
    }

     isFinished(currentCoordinates) {
        return this.isReachedToEndPoint() || !this.hasWayToContinue(currentCoordinates)
    }

     isBoardFilled() {
        for (let i = 0; i < this.M; i++) {
            for (let j = 0; j < this.N; j++) {
                if (this.matrix[i][j] === 0) return false
            }
        }
        return true;
    }

     isReachedToEndPoint() {
        if (this.endI - 1 >= 0 && this.matrix[this.endI - 1][this.endJ] > 0) {
            return true;
        }
        if (this.endJ + 1 < 9 && this.matrix[this.endI][this.endJ + 1] > 0) {
            return true;
        }
        if (this.endI + 1 < 9 && this.matrix[this.endI + 1][this.endJ] > 0) {
            return true;
        }
        return  this.endJ - 1 >= 0 && this.matrix[this.endI][this.endJ - 1] > 0;
    }

     hasWayToContinue(currentCoordinates) {
        for (let k = 0; k < currentCoordinates.length; k++) {
            const {i, j} = currentCoordinates[k];

            if (i - 1 >= 0 && (this.matrix[i - 1][j] === 0)) {
                return true;
            }
            if (j + 1 < 9 && (this.matrix[i][j + 1] === 0)) {
                return true;
            }
            if (i + 1 < 9 && (this.matrix[i + 1][j] === 0)) {
                return true;
            }
            if (j - 1 >= 0 && (this.matrix[i][j - 1] === 0)) {
                return true;
            }
        }
        return false
    }

     getHorizontalDeletedDigits(i, j) {
        const coordinates = [];
        const startPointI = i;
        const startPointJ = j;

        while (j + 1 < 9 && this.matrix[i][j + 1] === this.matrix[startPointI][startPointJ]) {
            j++;
            coordinates.push({i, j})
        }

        i = startPointI;
        j = startPointJ;
        while (j - 1 >= 0 && this.matrix[i][j - 1] === this.matrix[startPointI][startPointJ]) {
            j--;
            coordinates.push({i, j});
        }
        coordinates.push({i: startPointI, j: startPointJ});
        if (coordinates.length > 4) {
            coordinates.sort((a, b) => {
                return a.j > b.j ? 1 : -1
            })
            return coordinates;
        }
    }

     getVerticalDeletedDigits(i, j) {
        const coordinates = [];
        const startPointI = i;
        const startPointJ = j;

        while (i + 1 < 9 && this.matrix[i + 1][j] === this.matrix[startPointI][startPointJ]) {
            i++;
            coordinates.push({i, j})
        }

        i = startPointI;
        j = startPointJ;
        while (i - 1 >= 0 && this.matrix[i - 1][j] === this.matrix[startPointI][startPointJ]) {
            i--;
            coordinates.push({i, j});
        }
        coordinates.push({i: startPointI, j: startPointJ});
        if (coordinates.length > 4) {
            coordinates.sort((a, b) => {
                return a.i > b.i ? 1 : -1
            })
            return coordinates;
        }
    }

     getLeftDiagonalDeletedDigits(i, j) {
        const coordinates = [];
        const startPointI = i;
        const startPointJ = j;

        while (i + 1 < 9 && j + 1 < 9 && this.matrix[i + 1][j + 1] === this.matrix[startPointI][startPointJ]) {
            i++;
            j++;
            coordinates.push({i, j})
        }

        i = startPointI;
        j = startPointJ;
        while (i - 1 >= 0 && j - 1 >= 0 && this.matrix[i - 1][j - 1] === this.matrix[startPointI][startPointJ]) {
            i--;
            j--;
            coordinates.push({i, j});
        }
        coordinates.push({i: startPointI, j: startPointJ});
        if (coordinates.length > 4) {
            coordinates.sort((a, b) => {
                return a.j > b.j ? 1 : -1
            })
            return coordinates;
        }
    }

     getRightDiagonalDeletedDigits(i, j) {
        const coordinates = [];
        const startPointI = i;
        const startPointJ = j;

        while (i - 1 >= 0 && j + 1 < 9 && this.matrix[i - 1][j + 1] === this.matrix[startPointI][startPointJ]) {
            i--;
            j++;
            coordinates.push({i, j})
        }

        i = startPointI;
        j = startPointJ;
        while (i + 1 < 9 && j - 1 >= 0 && this.matrix[i + 1][j - 1] === this.matrix[startPointI][startPointJ]) {
            i++;
            j--;
            coordinates.push({i, j});
        }
        coordinates.push({i: startPointI, j: startPointJ});
        if (coordinates.length > 4) {
            coordinates.sort((a, b) => {
                return a.i > b.i ? 1 : -1
            })
            return coordinates;
        }
    }

     deleteNumbersOfCoordinates(coordinates) {
        coordinates.forEach((coordinate) => {
            const {i, j} = coordinate;
            this.matrix[i][j] = 0;
        })
    }

     getDeletedSameDigits(i, j) {
        const deletedCoordinates = [];
        let temp;

        temp = this.getHorizontalDeletedDigits(i, j);
        if (temp) {
            deletedCoordinates.push(...temp);
        }
        temp = this.getVerticalDeletedDigits(i, j);
        if (temp) {
            deletedCoordinates.push(...temp);
        }
        temp = this.getLeftDiagonalDeletedDigits(i, j);
        if (temp) {
            deletedCoordinates.push(...temp);
        }
        temp = this.getRightDiagonalDeletedDigits(i, j);
        if (temp) {
            deletedCoordinates.push(...temp);
        }
        if (deletedCoordinates.length > 0) {
            return deletedCoordinates;
        }
    }

}
