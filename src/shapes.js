import { WIDTH, UP, DOWN, LEFT, RIGHT } from "./constants";

const shape1 = [
  [
    [1, 1, 0, 0],
    [0, 1, 1, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
  ],
  [
    [0, 0, 1, 0],
    [0, 1, 1, 0],
    [0, 1, 0, 0],
    [0, 0, 0, 0]
  ],
  [
    [0, 0, 0, 0],
    [1, 1, 0, 0],
    [0, 1, 1, 0],
    [0, 0, 0, 0]
  ],
  [
    [0, 1, 0, 0],
    [1, 1, 0, 0],
    [1, 0, 0, 0],
    [0, 0, 0, 0]
  ]
];
const shape2 = [
  [
    [0, 1, 1, 0],
    [1, 1, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
  ],
  [
    [0, 1, 0, 0],
    [0, 1, 1, 0],
    [0, 0, 1, 0],
    [0, 0, 0, 0]
  ],
  [
    [0, 0, 0, 0],
    [0, 1, 1, 0],
    [1, 1, 0, 0],
    [0, 0, 0, 0]
  ],
  [
    [1, 0, 0, 0],
    [1, 1, 0, 0],
    [0, 1, 0, 0],
    [0, 0, 0, 0]
  ]
];
const shape3 = [
  [
    [1, 1, 0, 0],
    [1, 1, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
  ],
  [
    [1, 1, 0, 0],
    [1, 1, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
  ],
  [
    [1, 1, 0, 0],
    [1, 1, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
  ],
  [
    [1, 1, 0, 0],
    [1, 1, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
  ]
];
const shape4 = [
  [
    [0, 1, 0, 0],
    [1, 1, 1, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
  ],
  [
    [0, 1, 0, 0],
    [0, 1, 1, 0],
    [0, 1, 0, 0],
    [0, 0, 0, 0]
  ],
  [
    [0, 0, 0, 0],
    [1, 1, 1, 0],
    [0, 1, 0, 0],
    [0, 0, 0, 0]
  ],
  [
    [0, 1, 0, 0],
    [1, 1, 0, 0],
    [0, 1, 0, 0],
    [0, 0, 0, 0]
  ]
];
const shape5 = [
  [
    [1, 0, 0, 0],
    [1, 0, 0, 0],
    [1, 1, 0, 0],
    [0, 0, 0, 0]
  ],
  [
    [1, 1, 1, 0],
    [1, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
  ],
  [
    [0, 1, 1, 0],
    [0, 0, 1, 0],
    [0, 0, 1, 0],
    [0, 0, 0, 0]
  ],
  [
    [0, 0, 1, 0],
    [1, 1, 1, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
  ]
];
const shape6 = [
  [
    [0, 1, 0, 0],
    [0, 1, 0, 0],
    [1, 1, 0, 0],
    [0, 0, 0, 0]
  ],
  [
    [1, 0, 0, 0],
    [1, 1, 1, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
  ],
  [
    [0, 1, 1, 0],
    [0, 1, 0, 0],
    [0, 1, 0, 0],
    [0, 0, 0, 0]
  ],
  [
    [0, 0, 0, 0],
    [1, 1, 1, 0],
    [0, 0, 1, 0],
    [0, 0, 0, 0]
  ]
];
const shape7 = [
  [
    [0, 1, 0, 0],
    [0, 1, 0, 0],
    [0, 1, 0, 0],
    [0, 1, 0, 0]
  ],
  [
    [0, 0, 0, 0],
    [1, 1, 1, 1],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
  ],
  [
    [0, 0, 1, 0],
    [0, 0, 1, 0],
    [0, 0, 1, 0],
    [0, 0, 1, 0]
  ],
  [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [1, 1, 1, 1],
    [0, 0, 0, 0]
  ]
];

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

const showNextPiece = ({cells, color, borders}) => {
  const highestIndex = cells[3] + 1;
  const arr = new Array(highestIndex).fill().map(() => "none");
  let count = 0
  return arr.map((e, i) => (cells.includes(i) ? color+" "+borders[count++] : "none"));
}



const shapesArr = [shape1, shape2, shape3, shape4, shape5, shape6, shape7]
const names = ["z-block", "s-block", "o-block", "t-block", "l-block", "j-block", "i-block" ]
const colors = ["red", "green", "yellow", "purple", "orange", "blue", "cyan"]

const buildBorders = (cells) => cells.map((cell, i, arr) => {
  let str = ''
  if (arr.includes(cell + RIGHT)) str += 'R '
  if (arr.includes(cell + LEFT)) str += 'L '
  if (arr.includes(cell + DOWN)) str += 'D '
  if (arr.includes(cell + UP)) str += 'U '
  return str
})

const shape = {
  rotation: 0,
  direction: 0,
  cells: [undefined],
  position: 6 - WIDTH,
  shadow: {
    cells: [undefined],
    color: "shadow"
  }
};

export const shapes = shapesArr.map((shp, i) => {
  const layout = shapeOutput(shp)
  const color = colors[i]
  const borders = buildBorders(layout[0])
  return {
    ...shape,
    name: names[i],
    color,
    layout,
    shadow:{
      ...shape.shadow,
      color: color + ' shadow'
    },
    borders,
    preview: showNextPiece({cells:layout[0], color, borders})
  }
})
