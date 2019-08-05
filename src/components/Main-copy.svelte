    <script>
    import _ from "lodash";
    const boardWidth = 10;
    const boardHeight = 24;

    let gameOver = false;
    const LEFT = -1;
    const RIGHT = 1;
    const UP = -boardWidth;
    const DOWN = boardWidth;

    const numberOfCells = boardWidth * boardHeight - 1;
    const speed = 10;
    let piecePosition = 0;

    let pieceColor = "white";

    let outputArr = [];
    const gridArr = new Array(numberOfCells+1).fill().map(() => "black");

    let staticPieces = [];
    let rowCounter = 0;
    const shape1 = [
    [
        [0,0,0,0],
        [0,0,0,0],
        [1,1,0,0],
        [0,1,1,0],
    ],
    [
        [0,0,0,0],
        [0,0,1,0],
        [0,1,1,0],
        [0,1,0,0],
    ],
    [
        [0,0,0,0],
        [0,0,0,0],
        [1,1,0,0],
        [0,1,1,0],
    ],
    [
        [0,0,0,0],
        [0,0,1,0],
        [0,1,1,0],
        [0,1,0,0],
    ],
    ]

    const shapeOutput = shape1.reduce((acc, rotation)=>{
        const rot = rotation.reduce((rotAcc, row, rowIndex)=>{
                const rowArr = row.reduce((rowAcc,col, colIndex)=>{
                    if(col) rowAcc.push(colIndex+(rowIndex*boardWidth))
                return rowAcc
            },[])
            return [...rotAcc, ...rowArr]
        },[])
        console.log({rot})
        acc.push(rot)
        return acc
    },[])
    console.log({shapeOutput})
    const piece1 = [DOWN+DOWN, DOWN+DOWN+RIGHT, DOWN+DOWN+DOWN+RIGHT, DOWN+DOWN+DOWN+RIGHT + RIGHT]; //Z
    const piece2 = [0, RIGHT, UP + RIGHT, UP + RIGHT + RIGHT]; //Zii
    const piece3 = [0, RIGHT, UP + RIGHT, UP]; //square
    const piece4 = [0, RIGHT, UP, UP + UP]; //L
    const piece5 = [0, RIGHT, RIGHT + UP, RIGHT + UP + UP]; //Lii
    const piece6 = [RIGHT, RIGHT + UP, UP, RIGHT + RIGHT + UP]; //T
    const piece7 = [0, UP, UP + UP, UP + UP + UP]; //T
    // const piece1 = [UP, UP + RIGHT, RIGHT, RIGHT + RIGHT]; //Z
    // const piece2 = [0, RIGHT, UP + RIGHT, UP + RIGHT + RIGHT]; //Zii
    // const piece3 = [0, RIGHT, UP + RIGHT, UP]; //square
    // const piece4 = [0, RIGHT, UP, UP + UP]; //L
    // const piece5 = [0, RIGHT, RIGHT + UP, RIGHT + UP + UP]; //Lii
    // const piece6 = [RIGHT, RIGHT + UP, UP, RIGHT + RIGHT + UP]; //T
    // const piece7 = [0, UP, UP + UP, UP + UP + UP]; //T
    // const pieceArr = [piece1, piece2, piece3, piece4, piece5, piece6, piece7];
    const pieceArr = [piece1];
    let currentPiece = shapeOutput[1];
    let globalID;
    let frameCounter = 0;
    let rotationPos = 0
    let rowPos = 0
    let colPos = 0

    document.onkeydown = checkKey;

    
    
    function checkKey(e) {
        e = e || window.event;
        requestAnimationFrame(() => {
            console.log(e.keyCode)
            switch(e.keyCode){
            case 38:
                
                    break;
            case 40: 
            console.log('here')
                movePiece(DOWN)
                break
            case 37:
                movePiece(LEFT)
                break
            case 39:
                movePiece(RIGHT)
        }
        });
    }
    function getNextPosition(piece, direction) {
        let x = colPos
        let y = rowPos * boardWidth
        console.log({rowPos, y , colPos})
       return shapeOutput[1].map(e => e + x + y);
    }
    function isAtBottom(arr){
        return !!arr.find(e => e > numberOfCells);
    }
    function isCollision(arr){
        return !!_.intersection(arr, staticPieces).length;
    }
    function isHitSide(arr){
        const flatArr = arr.map(e =>e % boardWidth).sort();
        const widthDiff = flatArr[3] - flatArr[0]
        return (arr.some(e => e < 0) || widthDiff > 4 || widthDiff < 0) 
    }
    function addToStaticPieces(arr){
        staticPieces = _.union(staticPieces, arr);
    }
    function checkEndGame(){
        console.log({gameOver})
        if (staticPieces.some(e => e < 40)) {
            gameOver = true;
            console.log("Game Over!");
        }
    }
    function generateNewPiece(){
        console.log('generateNewPiece')
        const rnd = Math.round(Math.random() * (pieceArr.length - 1));
        return pieceArr[rnd];
    }
    function updateGrid(currentPiece, staticPieces) {
        const arr = [...gridArr];
        currentPiece.forEach(e => (arr[e] = pieceColor));
        staticPieces.forEach(e => (arr[e] = "red"));
        return arr
    }

    // function checkCollision(currentPieceArr, nextPieceArr, staticPieces) {
    //     const intersection = _.intersection(nextPieceArr, staticPieces);
    //     const isAtBottom = nextPieceArr.find(e => e > numberOfCells);
    //     const flatArr = nextPieceArr.map(e =>e % boardWidth).sort();
    //     const widthDiff = flatArr[3] - flatArr[0]
    //     console.log({widthDiff})

    //     if (widthDiff > 5) {
    //         console.log('update piece pos')
    //         return currentPiece
    //     }
    //     if (intersection.length || isAtBottom) {
    //         staticPieces = _.union(staticPieces, currentPiece);
    //         if (staticPieces.some(e => e < boardWidth)) {
    //             cancelAnimationFrame(globalID);
    //             console.log("Game Over!");
    //             return;
    //         }
    //         const rnd = Math.round(Math.random() * (pieceArr.length - 1));
    //         currentPiece = pieceArr[rnd];
    //     } else {
    //         currentPiece = nextPieceArr;
    //     }
    // }

    function movePiece(direction){
        //get next position
    
        // const currentPiece = [...shapeOutput[rotation]]
        const nextPieceArr = getNextPosition(shape1, direction);
        //check position is valid

        // pieceArr = checkCollision(nextPieceArr, staticPieces);
        if(isHitSide(nextPieceArr)){
            console.log('move hit')
        }else if (isAtBottom(nextPieceArr) || isCollision(nextPieceArr)){
            addToStaticPieces(currentPiece, direction)
            checkEndGame()
            currentPiece = generateNewPiece()
        }else{
             switch(direction){
            case DOWN:
                rowPos++;
                break;
            case LEFT:
                colPos--
                break;
            case RIGHT:
                colPos++
                break;
        }
            currentPiece = nextPieceArr
        }
        outputArr = updateGrid(currentPiece, staticPieces).slice(40)
    }
    

    function repeatOften() {

        //update tick
        frameCounter++;

        //divide ticks
        if (frameCounter > speed) {
            
            movePiece(DOWN)

            //reset tick counter
            frameCounter = 0;
        }
        //repeat
        if(gameOver){
            console.log('end')
            cancelAnimationFrame(globalID);
        } else{
            globalID = requestAnimationFrame(repeatOften);
        }
    }
    repeatOften();
</script>

<style>
    main {
        display: flex;
        background: black;
        flex-grow: 1;
        width: 100vw;
        color: white;
        justify-content: center;
        align-items: center;
    }
    #grid {
        flex-basis: 330px;
        display: flex;
        flex-wrap: wrap;
        overflow: hidden;
    }
    .cell {
        width: 30px;
        height: 30px;
        border: 1px solid red;
    }
    .cell.white {
        background: white;
    }
    .cell.red {
        background: red;
    }
    .cell.black {
        background: black;
    }
</style>

<main>
    <div id="grid">
    {#each outputArr as color, index}
        <div class={`cell ${color}`}>{index}</div>
    {/each}
    </div>
</main>
