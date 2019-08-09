import { WIDTH, UP, DOWN, LEFT, RIGHT } from "./constants";

const zBlock = [
  [0, 0, 0, 0],
  [1, 1, 0, 0],
  [0, 1, 1, 0],
  [0, 0, 0, 0]
];
const sBlock = [
  [0, 0, 0, 0],
  [0, 1, 1, 0],
  [1, 1, 0, 0],
  [0, 0, 0, 0]
];
const oBlock = [
  [0, 0, 0, 0],
  [0, 1, 1, 0],
  [0, 1, 1, 0],
  [0, 0, 0, 0]
];
const tBlock = [
  [0, 0, 0, 0],
  [0, 1, 0, 0],
  [1, 1, 1, 0],
  [0, 0, 0, 0]
];
const lBlock = [
  [0, 1, 0, 0,],
  [0, 1, 0, 0,],
  [0, 1, 1, 0,],
  [0, 0, 0, 0,]
];
const jBlock = [
  [0, 0, 1, 0,],
  [0, 0, 1, 0,],
  [0, 1, 1, 0,],
  [0, 0, 0, 0,]
];
const iBlock = [
  [0, 1, 0, 0],
  [0, 1, 0, 0],
  [0, 1, 0, 0],
  [0, 1, 0, 0]
];
// const zBlock = [
//   [
//     [1, 1, 0, 0],
//     [0, 1, 1, 0],
//     [0, 0, 0, 0],
//     [0, 0, 0, 0]
//   ],
//   [
//     [0, 0, 1, 0],
//     [0, 1, 1, 0],
//     [0, 1, 0, 0],
//     [0, 0, 0, 0]
//   ],
//   [
//     [0, 0, 0, 0],
//     [1, 1, 0, 0],
//     [0, 1, 1, 0],
//     [0, 0, 0, 0]
//   ],
//   [
//     [0, 1, 0, 0],
//     [1, 1, 0, 0],
//     [1, 0, 0, 0],
//     [0, 0, 0, 0]
//   ]
// ];



// const sBlock = [
//   [
//     [0, 1, 1, 0],
//     [1, 1, 0, 0],
//     [0, 0, 0, 0],
//     [0, 0, 0, 0]
//   ],
//   [
//     [0, 1, 0, 0],
//     [0, 1, 1, 0],
//     [0, 0, 1, 0],
//     [0, 0, 0, 0]
//   ],
//   [
//     [0, 0, 0, 0],
//     [0, 1, 1, 0],
//     [1, 1, 0, 0],
//     [0, 0, 0, 0]
//   ],
//   [
//     [1, 0, 0, 0],
//     [1, 1, 0, 0],
//     [0, 1, 0, 0],
//     [0, 0, 0, 0]
//   ]
// ];
// const oBlock = [
//   [
//     [1, 1, 0, 0],
//     [1, 1, 0, 0],
//     [0, 0, 0, 0],
//     [0, 0, 0, 0]
//   ],
//   [
//     [1, 1, 0, 0],
//     [1, 1, 0, 0],
//     [0, 0, 0, 0],
//     [0, 0, 0, 0]
//   ],
//   [
//     [1, 1, 0, 0],
//     [1, 1, 0, 0],
//     [0, 0, 0, 0],
//     [0, 0, 0, 0]
//   ],
//   [
//     [1, 1, 0, 0],
//     [1, 1, 0, 0],
//     [0, 0, 0, 0],
//     [0, 0, 0, 0]
//   ]
// ];
// const tBlock = [
//   [
//     [0, 1, 0, 0],
//     [1, 1, 1, 0],
//     [0, 0, 0, 0],
//     [0, 0, 0, 0]
//   ],
//   [
//     [0, 1, 0, 0],
//     [0, 1, 1, 0],
//     [0, 1, 0, 0],
//     [0, 0, 0, 0]
//   ],
//   [
//     [0, 0, 0, 0],
//     [1, 1, 1, 0],
//     [0, 1, 0, 0],
//     [0, 0, 0, 0]
//   ],
//   [
//     [0, 1, 0, 0],
//     [1, 1, 0, 0],
//     [0, 1, 0, 0],
//     [0, 0, 0, 0]
//   ]
// ];
// const lBlock = [
//   [
//     [1, 0, 0, 0],
//     [1, 0, 0, 0],
//     [1, 1, 0, 0],
//     [0, 0, 0, 0]
//   ],
//   [
//     [1, 1, 1, 0],
//     [1, 0, 0, 0],
//     [0, 0, 0, 0],
//     [0, 0, 0, 0]
//   ],
//   [
//     [0, 1, 1, 0],
//     [0, 0, 1, 0],
//     [0, 0, 1, 0],
//     [0, 0, 0, 0]
//   ],
//   [
//     [0, 0, 1, 0],
//     [1, 1, 1, 0],
//     [0, 0, 0, 0],
//     [0, 0, 0, 0]
//   ]
// ];
// const jBlock = [
//   [
//     [0, 1, 0, 0],
//     [0, 1, 0, 0],
//     [1, 1, 0, 0],
//     [0, 0, 0, 0]
//   ],
//   [
//     [1, 0, 0, 0],
//     [1, 1, 1, 0],
//     [0, 0, 0, 0],
//     [0, 0, 0, 0]
//   ],
//   [
//     [0, 1, 1, 0],
//     [0, 1, 0, 0],
//     [0, 1, 0, 0],
//     [0, 0, 0, 0]
//   ],
//   [
//     [0, 0, 0, 0],
//     [1, 1, 1, 0],
//     [0, 0, 1, 0],
//     [0, 0, 0, 0]
//   ]
// ];
// const iBlock = [
//   [
//     [0, 1, 0, 0],
//     [0, 1, 0, 0],
//     [0, 1, 0, 0],
//     [0, 1, 0, 0]
//   ],
//   [
//     [0, 0, 0, 0],
//     [1, 1, 1, 1],
//     [0, 0, 0, 0],
//     [0, 0, 0, 0]
//   ],
//   [
//     [0, 0, 1, 0],
//     [0, 0, 1, 0],
//     [0, 0, 1, 0],
//     [0, 0, 1, 0]
//   ],
//   [
//     [0, 0, 0, 0],
//     [0, 0, 0, 0],
//     [1, 1, 1, 1],
//     [0, 0, 0, 0]
//   ]
// ];
const rotateBlock = block => [
  [block[3][0], block[2][0], block[1][0], block[0][0]],
  [block[3][1], block[2][1], block[1][1], block[0][1]],
  [block[3][2], block[2][2], block[1][2], block[0][2]],
  [block[3][3], block[2][3], block[1][3], block[0][3]],
]

const getRotatedBlocks = (block1) => {
  const block2 = rotateBlock(block1)
  const block3 = rotateBlock(block2)
  const block4 = rotateBlock(block3)
  return [block1, block2, block3, block4]
}

const shapeOutput = arr =>
  arr.reduce((acc, rotation) => {
    const rot = rotation.reduce((rotAcc, row, rowIndex) => {
      const rowArr = row.reduce((rowAcc, col, colIndex) => {
        if (col) rowAcc.push(colIndex + rowIndex * WIDTH);
        return rowAcc;
      }, []);
      return [...rotAcc, ...rowArr];
    }, []);
    acc.push(rot);
    return acc;
  }, []);

function* nextInArr(arr){
  yield* arr
} 

const createPreview = (layout, color, borders)=> {
  const border = nextInArr(borders)
  return layout.reduce( (rowAcc,row) => {
    row.forEach( (cell) => {
      if (cell === 0) rowAcc.push('')
      else rowAcc.push(color + ' ' + border.next().value)
    })
    return rowAcc
  },[])
}

const buildBorders = (cells) => cells.map((cell, i, arr) => {
  let str = ''
  if (arr.includes(cell + RIGHT)) str += 'R '
  if (arr.includes(cell + LEFT)) str += 'L '
  if (arr.includes(cell + DOWN)) str += 'D '
  if (arr.includes(cell + UP)) str += 'U '
  return str
})

const blockArr = [zBlock, sBlock, oBlock, tBlock, lBlock, jBlock, iBlock]
const shapesArr = blockArr.map(getRotatedBlocks)
const names = ["z-block", "s-block", "o-block", "t-block", "l-block", "j-block", "i-block"]
const colors = ["red", "green", "yellow", "purple", "orange", "blue", "cyan"]

const protoShape = {
  rotation: 0,
  direction: 0,
  cells: [undefined],
  position: parseInt(WIDTH/2)-1,
  shadow: {
    cells: [undefined],
    color: "shadow"
  }
};

function* buildShapes(){
  let i = 0
  while (i < shapesArr.length){
    const shape = shapesArr[i]
    const color = colors[i]
    const name = names[i]
    const layout = shapeOutput(shape)
    const borders = buildBorders(layout[0])
    const shadow = {
      ...protoShape.shadow,
      color: color + ' ' + protoShape.shadow.color
    }
    const preview = createPreview(shape[0], color, borders)
    i++
    yield {
      ...protoShape,
      name,
      color,
      layout,
      shadow,
      borders,
      preview,
    }
  }
}

export const shapes = [...buildShapes()]

// export const shapes = shapesArr.map((shp, i) => {
//   const layout = shapeOutput(shp)
//   const color = colors[i]
//   const borders = buildBorders(layout[0])
//   return {
//     ...shape,
//     name: names[i],
//     color,
//     layout,
//     shadow:{
//       ...shape.shadow,
//       color: color + ' shadow'
//     },
//     borders,
//     preview: createPreview(shp[0], color, borders)
//   }
// })
