<script>
  import {
    WIDTH,
    BOARD_CELLS,
    LEFT,
    RIGHT,
    UP,
    DOWN,
    CLOCK,
    ANTICLOCK,
    START_SPEED,
    L_GUTTER,
    R_GUTTER,
    TOP_GUTTER,
    rotLookup,
    dirLookup,
    moveSet,
    gridArr,
  } from "../constants";
  import {
   shapes
  } from "../shapes";

  /***
   * 
   * CONSTANTS
   * 
   * ***/
  

  /***
   * 
   * Variables
   * 
   ***/

  let globalID; //callback timer id
  let frameCounter = 0; //timer counter

  let speed = START_SPEED;
  let gameOver = true;
  let score = 0;

  let outputArr = gridArr; //main game array
  let staticPieces = []; // array for collision checking
  let shapeDisplay = []; //preview display
  let playShapes = [] //Stores all current pieces

  const rnd = x => {
    return Math.round(Math.random() * (x - 1));
  }

  //Get next shape with out repition
  const getNextShape = (retShape = {}) => {
    const hat = shapes.filter(e => e.name != retShape.name)
    return hat[rnd(hat.length)]
  }

  const indexToRow = e => parseInt(e / WIDTH)
  const cellsToKeep = (arr,cell,check)=> {
    // Work out which row this cell is in
    const cellRow = indexToRow(cell);
    if(cellRow === check) return arr
    const newIndex = cellRow < check ? cell + WIDTH : cell
    arr.push(newIndex);
    return arr;
  }

  const clearRows = (shape) => {
    //Get the rows to check if full
    const rowsToCheck = [
      ...new Set(shape.cells.map(indexToRow))
    ]

    const rowsToRemove = rowsToCheck.reduce((checkAcc, check)=>{
      
      const count = playShapes.reduce( (acc, shape) => {
        shape.cells.forEach(cell => {
           const cellRow = indexToRow(cell);
           if (check === cellRow) acc++
        })
        return acc
      }, 0)
      if(count===10) checkAcc.push(check)
      return checkAcc
    },[])

    rowsToRemove.forEach(check => {
      //Create new potential playShapes
       playShapes = playShapes.reduce((shapeAcc, shape) => {
        //For each shape in play shapes go thorough its cells
        const cells = shape.cells.reduce((cellAcc,cell)=>cellsToKeep(cellAcc,cell,check), []);
        return [...shapeAcc, { ...shape, cells }];
      }, []);
    });

    // playShapes = playShapes.map(shape => buildBorders(shape.cells))
    playShapes.forEach(shape =>{
      shape.borders = buildBorders(shape.cells)
    })

  //Update score and speed
    score += 10 * rowsToRemove.length
    speed += 5 * rowsToRemove.length

  //Update Static Pieces
  staticPieces = playShapes.reduce((acc,shape)=>{
    shape.cells.forEach(cell=>cell !== undefined && acc.push(cell))
    return acc
  },[])

    // rowsToCheck.forEach(check => {
    //   let count = 0;
    //   const newStaticPieces = [];
    //   //Create new potential playShapes
    //   const newPlayShapes = playShapes.reduce((acc, shape, shapeIndex) => {
    //     //For each shape in play shapes go thorough its cells
    //     const origLen = shape.cells.length
    //     const cells = shape.cells.reduce((acc, e, cellIndex) => {
    //       const cellsToKeep = (arr,cell,check,counter)=> {
    //         // Work out which row this cell is in
    //         const cellRow = indexToRow(cell);
    //         //If we are checking this row
    //         if (check === cellRow) {
    //           counter++;
    //         }else{
    //           //If this row is above th row we are checking, move down
    //           const newIndex = cellRow < check ? cell + WIDTH : cell
    //           arr.push(newIndex);
    //           newStaticPieces.push(newIndex);
    //         }
    //         return {arr, counter};
    //       }
    //       const {arr,counter} = cellsToKeep(acc,e,check,count)
    //       acc = arr
    //       count = counter
    //       return arr

    //     }, []);

    //     console.log('Check', check, 'A-B',origLen-cells.length, ': Count',count)

    //     if(cells.length === 0)return acc;
    //     return [...acc, { ...shape, cells }];
    //   }, []);
    //   //If we have found 10 cells on this row remove it
    //   if (count === 10) {
    //     playShapes = newPlayShapes;
    //     staticPieces = newStaticPieces;
    //     score += 10;
    //     speed += 5
    //   }
    // });
  }

  const addToStatic = (shape) => {
    staticPieces = [...staticPieces, ...shape.cells];
  }

  const checkEndGame = () => {
    return staticPieces.some(e => e < 3*WIDTH)
  };

  const updateShapeOnGrid = (arr, shape) => {
    const { color = 'hidden', cells = [], borders = [], rotation } = shape
    cells.forEach((index,i) => {
      const classes = `${color} ${borders[i]}`
      arr[index] = classes
    });
  }

  const updateGrid = (shape) => {
    //Copy blank grid
    const arr = [...gridArr]
    updateShapeOnGrid(arr, shape.shadow)
    playShapes = playShapes.filter( shape => shape.cells.length !== 0 )
    playShapes.forEach((shape,i) => {
      updateShapeOnGrid(arr, shape);
    });
    return arr;
  }

  const updateShapes = () => {
      const newShape = getNextShape(playShapes[0])
      playShapes.unshift(newShape)
      return playShapes[1];
  }
  const moveIsNotValid = (shape,  direction)=> { 

    if(direction !== DOWN) return shape
    //If down add to static
    addToStatic(shape);

    clearRows(shape);
    gameOver = checkEndGame()
   
    //Promote next shape
    return updateShapes();
  }

  const newGame = () => {
    console.log("Start Game");
    cancelAnimationFrame(globalID);
    staticPieces = [];
    gameOver = false;
    speed = START_SPEED;
    score = 0;
    playShapes = [getNextShape()]
    updateShapes()
    makeMove({direction: DOWN, rotation: 0})
    outputArr = updateGrid(playShapes[1]);
    repeatOften();
  }

  const translateArray = (arr) => (amount) => arr.map(e => e + amount)
  const isGreaterThan = (B) =>(A) => A > B
  const isLessThan = (B) =>(A) => A < B
  const isInArr = (B) => (A) => B.includes(A)
  const isBottom = isGreaterThan(gridArr.length)
  const isLeftGutter = e => isLessThan(L_GUTTER)(e % WIDTH)
  const isRightGutter = e => isGreaterThan(R_GUTTER)(e % WIDTH)

  const shadowMaker = (position, translateCells, isValidMove) => {
    let valid = true
    while(valid){  
      const newCells = translateCells(position += WIDTH)
      valid = isValidMove(newCells)
    }
    return translateCells(position -= WIDTH)
  }

  const buildBorders = (cells) => cells.map((cell,i,arr) =>{
      let str = ''
      if(arr.includes(cell+RIGHT)) str+='R '
      if(arr.includes(cell+LEFT)) str+='L '
      if(arr.includes(cell+DOWN)) str+='D '
      if(cell+UP > TOP_GUTTER && arr.includes(cell+UP)) str+='U '
      return str
    })

  const movePieceWrapper = (shape, direction = 0, rot = 0) => {
    // Update position
    const rotation = (Math.abs(shape.rotation + rot)) % 4;
    const cells = shape.layout[rotation]
    const translateCells = translateArray(cells)
    let position = shape.position + direction;

    while (translateCells(position).some(isLeftGutter)) position++;
    while (translateCells(position).some(isRightGutter)) position--;

    const isInStatic = isInArr(staticPieces)
    const isValidMove = (potentialCells) => !(
      potentialCells.some(isBottom) || 
      potentialCells.some(isInStatic)
    )
    
    const potentialCells = translateCells(position)
    const valid = isValidMove(potentialCells, direction)
    if(!valid) return moveIsNotValid(shape, direction)


    
    const borders = buildBorders(potentialCells)
    const shadowCells = shadowMaker(position, translateCells, isValidMove)
    const shadowBorders = buildBorders(shadowCells)

    return {
      ...shape,
      cells: potentialCells,
      position,
      rotation,
      borders,
      shadow: {
        ...shape.shadow,
        borders: shadowBorders,
        cells: shadowCells,
      }
    };
  }

  const makeMove = ({direction, rotation}) => {
    playShapes[1] = movePieceWrapper(playShapes[1], direction, rotation)
    outputArr = updateGrid(playShapes[1]);
  }

  const repeatOften = () => {
    //update tick
    frameCounter++;

    //divide ticks
    if (frameCounter * speed > 1000) {
      //update game
      moveSet.add({direction: DOWN, rotation: 0})
      //reset tick counter
      frameCounter = 0;
    }

    moveSet.forEach(e => {
      makeMove(e)
      moveSet.delete(e);
    });

    //repeat
   if (!gameOver) globalID = requestAnimationFrame(repeatOften);
  }

  // document.onkeydown = e => console.log(e.keyCode);
  document.onkeydown = e => moveSet.add({direction: dirLookup[e.keyCode], rotation: rotLookup[e.keyCode]});
  document.onkeyup = e => moveSet.delete({direction: dirLookup[e.keyCode], rotation: rotLookup[e.keyCode]});

</script>

<style>
  main {
    display: flex;
    background: black;
    flex-grow: 1;
    width: 100vw;
    color: white;
    justify-content: center;
  }
  #grid {
    display: flex;
    align-items: center;
  }
  #container{
    display: flex;
    flex-wrap: wrap;
    border: 1px solid white;
    background-color: black;
    box-sizing: border-box;
    width: 300px;
    height: 601px;
  }
  .side {
    min-width: 50px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    height: 100%;
    padding: 30px;
  }
  .nextShape {
    width: 128px;
    display: flex;
    flex-wrap: wrap;
    width: 120px;
    height: 120px;
    justify-content: center;
    align-items: center;
  }
  .nextShape .cell {
    width: 25%;
    height: 25%;
  }
  .cell {
    width: 10%;
    height: 5%;
    border: 1px solid black;
  }
  /* .cell.none {
    background: black;
  } */
  .cell.white {
    background: white;
    border: 1px solid white;
  }
  .cell.red {
    background: red;
    border: 1px solid white;
  }
  .cell.yellow {
    background: yellow;
    border: 1px solid white;
  }
  .cell.green {
    background: green;
    border: 1px solid white;
  }
  .cell.orange {
    background: orange;
    border: 1px solid white;
  }
  .cell.purple {
    background: purple;
    border: 1px solid white;
  }
  .cell.cyan {
    background: cyan;
    border: 1px solid white;
  }
  .cell.blue {
    background: blue;
    border: 1px solid white;
  }
  .cell.black {
    background: black;
    border: 1px solid #333;
    border-radius: 0;
  }
  .cell.hidden {
    display: none;
  }
  .cell.shadow{
    opacity: 0.4;
  }
  .cell.U{
     border-top: 0;
     /* height: 31px; */
     border-top-left-radius: 0px;
     border-top-right-radius: 0px;
  }
  .cell.D{ 
    border-bottom: 0;
    /* height: 31px; */
    border-bottom-left-radius: 0px;
    border-bottom-right-radius: 0px;
  }
  .cell.U.D{
      /* height: 32px; */
  }
  .cell.L{
    border-left: 0;
    /* width: 31px; */
    border-top-left-radius: 0px;
    border-bottom-left-radius: 0px;
  }
  .cell.R{ 
    border-right: 0;
    /* width: 31px; */
    border-top-right-radius: 0px;
    border-bottom-right-radius: 0px;
  }
  .cell.L.R{ 
    /* width: 32px; */
  }
</style>

<main>

  <div class="side">
    {#if gameOver}GAME OVER{/if}
    <button on:click={newGame}>NEW GAME</button>
  </div>
  <div id="grid">
    <div id="container">
      {#each outputArr as color, index}
        {#if index > TOP_GUTTER}
          <div class={`cell ${color}`} />
        {/if}
      {/each}
    </div>
  </div>
  <div class="side">
    <div>Score: {score}</div>
    <div class="nextShape">
      {#if !gameOver}
        {#each playShapes[0].preview as color, index}
         
            <div class={`cell ${color}`} />

        {/each}
      {/if}
    </div>
  </div>

</main>
