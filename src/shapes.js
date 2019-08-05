import { WIDTH } from "./constants";

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

const showNextPiece = (shape) => {
  const newShape = shape.layout[0];
  const highestIndex = newShape[3] + 1;
  const arr = new Array(highestIndex).fill().map(() => "none");
  return arr.map((e, i) => (newShape.includes(i) ? shape.color : "none"));
}

const shape = {
  rotation: 0,
  direction: 0,
  cells: [undefined],
  position: 6 - WIDTH,
  shadow: {
    cells: [undefined],
    color: "white"
  }
};

export const shapes = [
  {
    ...shape,
    name: "z-block",
    color: "red",
    layout: shapeOutput(shape1),
  },
  {
    ...shape,
    name: "s-block",
    color: "green",
    layout: shapeOutput(shape2),
  },
  {
    ...shape,
    name: "o-block",
    color: "yellow",
    layout: shapeOutput(shape3),
  },
  {
    ...shape,
    name: "t-block",
    color: "purple",
    layout: shapeOutput(shape4),
  },
  {
    ...shape,
    name: "l-block",
    color: "orange",
    layout: shapeOutput(shape5),
  },
  {
    ...shape,
    name: "j-block",
    color: "blue",
    layout: shapeOutput(shape6),
  },
  {
    ...shape,
    name: "i-block",
    color: "cyan",
    layout: shapeOutput(shape7),
  }
].map(e => {
  e.preview = showNextPiece(e)
  return e
})
