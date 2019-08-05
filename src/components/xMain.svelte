<script>
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
  let shapeArray = [];
  const moveSet = new Set([])

  document.onkeydown = e => moveSet.add({direction: dirLookup[e.keyCode], rotation: rotLookup[e.keyCode]});
  document.onkeyup = e => moveSet.delete({direction: dirLookup[e.keyCode], rotation: rotLookup[e.keyCode]});

  const translateArray = (arr) => (amount) => arr.map(e => e + amount)

  function rnd(x) {
    return Math.round(Math.random() * (x - 1));
  }

  function getNextShape(retShape = {}) {
    const hat = shapes.filter(e => e.name != retShape.name)
    return hat[rnd(hat.length)]
  }

   function updateShapeOnGrid(arr, { color, cells }) {
    cells.forEach(index => (arr[index] = color));
  }
  function updateGrid(shape) {
    //Copy blank grid
    let arr = [...gridArr];

    //Update shape on grid
    // updateShapeOnGrid(arr, shape.shadow);
    //Update shape on grid
    updateShapeOnGrid(arr, shape);
    //update static shapes on grid
    // staticColour.forEach(shape => {
    //   updateShapeOnGrid(arr, shape);
    // });

    return arr;
  }
  function makeMove({direction = 0, rot = 0}){
    console.log({direction, rot})
    // console.log(shapeArray)
    const shape = shapeArray[0]

    const rotation = (shape.rotation + rot) % 4;
    const cells = shape.layout[rotation]
    const translateCells = translateArray(cells)
    let position = shape.position + direction;
    console.log({position})
    shapeArray[0] = {
      ...shape,
      rotation,
      cells: translateCells(position),
      position,
      shadow: {
        ...shape.shadow,
      }
    }
    console.log('B')
    outputArr = updateGrid(shape)
  }

  function newGame() {
    console.log("Start Game");
    outputArr = gridArr;
    cancelAnimationFrame(globalID);
    gameOver = false;
    speed = START_SPEED;
    score = 0;
    shapeArray = []
    shapeArray.unshift(getNextShape(), getNextShape())
    repeatOften();
  }


  function repeatOften() {
    //update tick
    frameCounter++;

    //divide ticks
    if (frameCounter * speed > 1000) {
      //update game
      // moveSet.add({direction: DOWN, rotation: 0})
      //reset tick counter
      frameCounter = 0;
    }

    moveSet.forEach(e =>{
      // console.log(e, frameCounter)
      console.log('A')
       makeMove(e)
      // console.log(outputArr)
      moveSet.delete(e);
    })
    //repeat
   if (!gameOver) globalID = requestAnimationFrame(repeatOften);
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
    width: 20%;
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
    {#if !gameOver}
      <div class="nextShape">
        {#each shapeArray[1].preview as color, index}
          {#if index % board.width < 4}
            <div class={`cell ${color}`} />
          {/if}
        {/each}
      </div>
    {/if}
  </div>

</main>
