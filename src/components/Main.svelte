<script>
  //   import _ from "lodash";

  import {
    width,
    height,
    LEFT,
    RIGHT,
    UP,
    DOWN,
    CLOCK,
    ANTICLOCK
  } from "../constants";
  import {
   shapes
  } from "../shapes";
  const rotLookup = {
    32: CLOCK
  };
  const dirLookup = {
    38: UP,
    40: DOWN,
    37: LEFT,
    39: RIGHT
  };
  let globalID;
  let board = {
    width,
    height,
    cells: width * height
  };

  let frameCounter = 0;
  const START_SPEED = 10;
  let speed = START_SPEED;
  let gameOver = true;
  let score = 0;
  const gridArr = new Array(board.cells)
    .fill()
    .map((e, i) =>
      i % board.width < 3 || i % board.width > 12 ? "hidden" : "black"
    );
  let outputArr = gridArr;

  let staticPieces = [];
  let shapeDisplay = [];

  const rnd = x => {
    return Math.round(Math.random() * (x - 1));
  }

  const getNextShape = (retShape = {}) => {
    const hat = shapes.filter(e => e.name != retShape.name)
    return hat[rnd(hat.length)]
  }
  const firstShape = getNextShape()
  let playShapes = [firstShape ,getNextShape(firstShape)];

  const moveSet = new Set([])

  document.onkeydown = e => moveSet.add({direction: dirLookup[e.keyCode], rotation: rotLookup[e.keyCode]});
  document.onkeyup = e => moveSet.delete({direction: dirLookup[e.keyCode], rotation: rotLookup[e.keyCode]});


  const clearRows = (shape) => {
    let i = 0
    //Get the rows to check if full
    const rowsToCheck = [
      ...new Set(shape.cells.map(e => parseInt(e / board.width)))
    ];

    // const tetrisRowCount = []

    // rowsToCheck.forEach(row => {
    //   const obj = {
    //     row,
    //     count: 0,
    //     shapes:[]
    //   }
    //   tetrisRowCount[row] = obj
    // })

    // //go through each playshape
    // playShapes.forEach(shape => {
    //   //go through each cell
    //   shape.cells.forEach(cell =>{
    //     const row = parseInt(cell / board.width)
    //     if(rowsToCheck.includes(row)){
    //        tetrisRowCount[row].count++
    //        tetrisRowCount[row].shapes.push(shape)
    //     } 
    //   })
    // })

    // console.log('tetrisRowCount',tetrisRowCount)

    // const tetrisRowFilter = tetrisRowCount.filter(obj => obj.count === 10)

   
    // console.log('tetrisRowFilter',tetrisRowFilter)

    // tetrisRowFilter.forEach(obj => {
    //   const check = obj.row
    //   obj.shapes.forEach(shape => {
    //     const cells = shape.cells.reduce((acc, cell, cellIndex) => {
    //       const cellRow = parseInt(cell / board.width);
    //         // console.log(i++)
    //         //If we are checking this row
    //         if (check === cellRow) {
    //           //Inc counter dont add to acc
    //           // count++;
    //         }else{
    //           //Add to acc and move one row down
    //           // const thing = cellRow < check ? cell + board.width : cell
    //           acc.push(cell);
    //           // newStaticPieces.push(thing);
    //         }
    //         return acc;
    //     },[])
    //     console.log([...shape.cells])
    //     shape.cells = cells
    //     console.log([...shape.cells])
    //   })

    // })

    //  playShapes.forEach((shape,i) => {
    //    if(i===0) return
    //    console.log('shape.cells', shape.cells)
    //   shape.cells = shape.cells.map(e => {
    //     const len = tetrisRowFilter.length || 0
    //     console.log('len',len, e , e+ (board.width * len))
    //      return e+(board.width * len)
    //   })
    //  })
    //if cell is in check add cell to list

    //go through lists if 10 cells 

    rowsToCheck.forEach(check => {
      let count = 0;
      const newStaticPieces = [];
      //Create new potential playShapes
      const newPlayShapes = playShapes.reduce((acc, shape, shapeIndex) => {
        //For each shape in play shapes go thorough its cells
        const cells = shape.cells.reduce((acc, e, cellIndex) => {
          // Work out which row this cell is in
          const cellRow = parseInt(e / board.width);
          // console.log(i++)
          //If we are checking this row
          if (check === cellRow) {
            //Inc counter dont add to acc
            count++;
          }else{
            //Add to acc and move one row down
            const thing = cellRow < check ? e + board.width : e
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
      }
    });
    
    // rowsToCheck.forEach(check => {
    //   let count = 0;
    //   const newStaticPieces = [];
    //   //Create new potential playShapes
    //   const newPlayShapes = playShapes.reduce((acc, shape, shapeIndex) => {
    //     //For each shape in play shapes go thorough its cells
    //     const cells = shape.cells.reduce((acc, e, cellIndex) => {
    //       // Work out which row this cell is in
    //       const cellRow = parseInt(e / board.width);
    //       console.log(i++)
    //       //If we are checking this row
    //       if (check === cellRow) {
    //         //Inc counter dont add to acc
    //         count++;
    //       }else{
    //         //Add to acc and move one row down
    //         const thing = cellRow < check ? e + board.width : e
    //         acc.push(thing);
    //         newStaticPieces.push(thing);
    //       }
    //       return acc;
    //     }, []);
    //     if(cells.length === 0)return acc;
    //     return [...acc, { ...shape, cells }];
    //   }, []);
    //   //If we have found 10 cells on this row remove it
    //   if (count === 10) {
    //     playShapes = newPlayShapes;
    //     staticPieces = newStaticPieces;
    //     score += 10;
    //   }
    // });
  }

  function addToStatic(shape) {
    staticPieces = [...staticPieces, ...shape.cells];
  }

  const checkEndGame = () => {
    return staticPieces.some(e => e < board.width)
  };

  function updateShapeOnGrid(arr, { color = 'hidden', cells = [] }) {
    cells.forEach(index => (arr[index] = color));
  }

  function updateGrid(shape) {
    //Copy blank grid
    const arr = [...gridArr]
    updateShapeOnGrid(arr, shape.shadow)
    playShapes = playShapes.filter( shape => shape.cells.length !== 0 )
    playShapes.forEach((shape,i) => {
      updateShapeOnGrid(arr, shape);
    });
  
    return arr;
  }
  function updateShapes(){
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

  function newGame() {
    console.log("Start Game");
    cancelAnimationFrame(globalID);
    staticPieces = [];
    // staticColour = [];
    gameOver = false;
    speed = START_SPEED;
    score = 0;
    playShapes = [getNextShape(),getNextShape()];
    makeMove({direction: DOWN, rotation: 0})
    outputArr = updateGrid(playShapes[1]);
    repeatOften();
  }

  const translateArray = (arr) => (amount) => arr.map(e => e + amount)
  const isGreaterThan = (B) =>(A) => A > B
  const isLessThan = (B) =>(A) => A < B
  const isInArr = (B) => (A) => B.includes(A)
  const isBottom = isGreaterThan(board.cells)
  const isLeftGutter = e => isLessThan(3)(e % board.width)
  const isRightGutter = e => isGreaterThan(12)(e % board.width)

  function shadowMaker(position, translateCells, isValidMove) {
    let valid = true
    while(valid){  
      const newCells = translateCells(position += width)
      valid = isValidMove(newCells)
    }
    return translateCells(position -= width)
  }


  const movePieceWrapper = (shape, direction = 0, rot = 0) => {
    // Update position
    const rotation = (shape.rotation + rot) % 4;
    const cells = shape.layout[rotation]
    const translateCells = translateArray(cells)
    let position = shape.position + direction;
    // if(shape.cells.length === 0 )position = shape.position 

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

    const shadowCells = shadowMaker(position, translateCells, isValidMove)

    
    return {
      ...shape,
      rotation,
      cells: potentialCells,
      position,
      previous: {
        cells: shape.cells,
        color: 'black',
      },
      shadow: {
        ...shape.shadow,
        cells: shadowCells,
      }
    };
  }

  function makeMove({direction, rotation}){
    playShapes[1] = movePieceWrapper(playShapes[1], direction, rotation)
    if (!gameOver) outputArr = updateGrid(playShapes[1]);
  }

  function repeatOften() {
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

   if (!gameOver) globalID = requestAnimationFrame(repeatOften);
    //repeat
  }
</script>

<style>
  main {
    display: flex;
    background: black;
    flex-grow: 1;
    width: 100vw;
    color: white;
    justify-content: center;
    /* align-items: center; */
  }
  #grid {
    flex-basis: 330px; /*calc(30*18px);*/
    display: flex;
    flex-wrap: wrap;
    overflow: hidden;
  }
  .side {
    /* border: 1px solid pink; */
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
  }
  .cell {
    width: 30px;
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
          {#if index % board.width < 4}
            <div class={`cell ${color}`} />
          {/if}
        {/each}
      {/if}
    </div>
  </div>

</main>
