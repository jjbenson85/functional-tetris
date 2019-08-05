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
  } from "../constants";
  import {
   shapes
  } from "../shapes";

  /***
   * 
   * CONSTANTS
   * 
   * ***/
  const rotLookup = {
    32: CLOCK,
    90: CLOCK,
    88: ANTICLOCK, 
  };
  const dirLookup = {
    38: UP,
    40: DOWN,
    37: LEFT,
    39: RIGHT
  };
  const moveSet = new Set([]) //Stores all current key presses
  const gridArr = new Array(BOARD_CELLS)
    .fill()
    .map((e, i) =>
      i % WIDTH < L_GUTTER || i % WIDTH > R_GUTTER ? "hidden" : "black"
    );

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

  const clearRows = (shape) => {
    //Get the rows to check if full
    const rowsToCheck = [
      ...new Set(shape.cells.map(e => parseInt(e / WIDTH)))
    ];
    rowsToCheck.forEach(check => {
      let count = 0;
      const newStaticPieces = [];
      //Create new potential playShapes
      const newPlayShapes = playShapes.reduce((acc, shape, shapeIndex) => {
        //For each shape in play shapes go thorough its cells
        const cells = shape.cells.reduce((acc, e, cellIndex) => {
          // Work out which row this cell is in
          const cellRow = parseInt(e / WIDTH);
          // console.log(i++)
          //If we are checking this row
          if (check === cellRow) {
            //Inc counter dont add to acc
            count++;
          }else{
            //If this row is above th row we are checking, move down
            const thing = cellRow < check ? e + WIDTH : e
            acc.push(thing);
            newStaticPieces.push(thing);
          }
          return acc;
        }, []);
        if(cells.length === 0)return acc;
        return [...acc, { ...shape, cells }];
      }, []);
      //If we have found 10 cells on this row remove it
      if (count === 10) {
        playShapes = newPlayShapes;
        staticPieces = newStaticPieces;
        score += 10;
        speed += 5
      }
    });
  }

  const addToStatic = (shape) => {
    staticPieces = [...staticPieces, ...shape.cells];
  }

  const checkEndGame = () => {
    return staticPieces.some(e => e < WIDTH)
  };

  const updateShapeOnGrid = (arr, { color = 'hidden', cells = [] }) => {
    cells.forEach(index => (arr[index] = color));
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
  const isBottom = isGreaterThan(BOARD_CELLS)
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

    return {
      ...shape,
      cells: potentialCells,
      position,
      rotation,
      shadow: {
        ...shape.shadow,
        cells: shadowMaker(position, translateCells, isValidMove),
      }
    };
  }

  const makeMove = ({direction, rotation}) => {
    playShapes[1] = movePieceWrapper(playShapes[1], direction, rotation)
    if (!gameOver) outputArr = updateGrid(playShapes[1]);
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
    WIDTH: 100vw;
    color: white;
    justify-content: center;
  }
  #grid {
    flex-basis: 330px;
    display: flex;
    flex-wrap: wrap;
    overflow: hidden;
  }
  .side {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    height: 100%;
    padding: 30px;
  }
  .nextShape {
    WIDTH: 128px;
    display: flex;
    flex-wrap: wrap;
  }
  .cell {
    WIDTH: 30px;
    height: 30px;
    border: 1px solid grey;
  }
  .cell.none {
    border: 1px solid black;
  }
  .cell.white {
    background: white;
  }
  .cell.red {
    background: red;
  }
  .cell.yellow {
    background: yellow;
  }
  .cell.green {
    background: green;
  }
  .cell.orange {
    background: orange;
  }
  .cell.purple {
    background: purple;
  }
  .cell.cyan {
    background: cyan;
  }
  .cell.blue {
    background: blue;
  }
  .cell.black {
    background: black;
  }
  .cell.hidden {
    display: none;
  }
</style>

<main>

  <div class="side">
    {#if gameOver}GAME OVER{/if}
    <button on:click={newGame}>NEW GAME</button>
  </div>
  <div id="grid">
    {#each outputArr as color, index}
      <div class={`cell ${color}`} />
    {/each}
  </div>
  <div class="side">
    <div>Score: {score}</div>
    <div class="nextShape">
      {#if !gameOver}
        {#each playShapes[0].preview as color, index}
          {#if index % WIDTH < 4}
            <div class={`cell ${color}`} />
          {/if}
        {/each}
      {/if}
    </div>
  </div>

</main>
