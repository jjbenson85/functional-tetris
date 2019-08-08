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
  let count = 0
  return arr.map((e, i) => (newShape.includes(i) ? shape.color+" "+shape.borders[count++] : "none"));
}

const shape = {
  rotation: 0,
  direction: 0,
  cells: [undefined],
  position: 6 - WIDTH,
  shadow: {
    cells: [undefined],
    rotation: 0,
    color: "shadow"
  }
};

export const shapes = [
  {
    ...shape,
    name: "z-block",
    color: "red",
    layout: shapeOutput(shape1),
    shadow:{
      ...shape.shadow,
    //   borders: [
    //   ['R','L D', 'U R', 'L'],
    //   ['D', 'R D', 'L U', 'U'],
    //   ['R', 'L D', 'U R', 'L'],
    //   ['D', 'R D', 'L U', 'U'],
    // ],
      color: "shadow red"
    },
    borders: 
    // [
      ['R','L D', 'U R', 'L'],
    //   ['D', 'R D', 'L U', 'U'],
    //   ['R', 'L D', 'U R', 'L'],
    //   ['D', 'R D', 'L U', 'U'],
    // ]
  },
  {
    ...shape,
    name: "s-block",
    color: "green",
    layout: shapeOutput(shape2),
    shadow: {
      ...shape.shadow,
    //   borders: [
    //   ['D R','L', 'R', 'U L'],
    //   ['D', 'U R', 'L D', 'U'],
    //   ['D R', 'L', 'R', 'U L'],
    //   ['D', 'U R', 'L D', 'U'],
    // ],
      color: "shadow green"
    },
    borders: 
    // [
      ['D R', 'L', 'R', 'U L'],
    //   ['D', 'U R', 'L D', 'U'],
    //   ['D R', 'L', 'R', 'U L'],
    //   ['D', 'U R', 'L D', 'U'],
    // ]
  },
  {
    ...shape,
    name: "o-block",
    color: "yellow",
    layout: shapeOutput(shape3),
    shadow: {
      ...shape.shadow,
    //   borders: [
    //   ['D R','L D', 'U R', 'L U'],
    //   ['D R', 'L D', 'U R', 'L U'],
    //   ['D R', 'L D', 'U R', 'L U'],
    //   ['D R', 'L D', 'U R', 'L U'],
    // ],
      color: "shadow yellow"
    },
    borders: 
    // [
      ['D R', 'L D', 'U R', 'L U'],
    //   ['D R', 'L D', 'U R', 'L U'],
    //   ['D R', 'L D', 'U R', 'L U'],
    //   ['D R', 'L D', 'U R', 'L U'],
    // ]
  },
  {
    ...shape,
    name: "t-block",
    color: "purple",
    layout: shapeOutput(shape4),
    shadow: {
      ...shape.shadow,
    //   borders: [
    //   ['D','R', 'L U R', 'L'],
    //   ['D', 'U R D', 'L', 'U'],
    //   ['R', 'L D R', 'L', 'U'],
    //   ['D', 'R', 'L U D', 'U'],
    // ],
      color: "shadow purple"
    },
    borders: 
    // [
      ['D', 'R', 'L U R', 'L'],
    //   ['D', 'U R D', 'L', 'U'],
    //   ['R', 'L D R', 'L', 'U'],
    //   ['D', 'R', 'L U D', 'U'],
    // ]
  },
  {
    ...shape,
    name: "l-block",
    color: "orange",
    layout: shapeOutput(shape5),
    shadow: {
      ...shape.shadow,
    //   borders: [
    //   ['D','D U', 'U R', 'L'],
    //   ['D R', 'L R', 'L', 'U'],
    //   ['R', 'L D', 'U D', 'U'],
    //   ['D', 'R', 'L R', 'L U'],
    // ],
      color: "shadow orange"
    },
    borders: 
    // [
      ['D', 'D U', 'U R', 'L'],
    //   ['D R', 'L R', 'L', 'U'],
    //   ['R', 'L D', 'U D', 'U'],
    //   ['D','R', 'L R', 'L U'],
    // ]
  },
  {
    ...shape,
    name: "j-block",
    color: "blue",
    layout: shapeOutput(shape6),
    shadow: {
      ...shape.shadow,
    //   borders: [
    //   ['D','D U', 'R', 'U L'],
    //   ['D', 'U R', 'L R', 'L'],
    //   ['D R', 'L', 'U D', 'U'],
    //   ['R', 'L R', 'L D', 'U'],
    // ],
      color: "shadow blue"
    },
    borders: 
    // [
      ['D', 'D U', 'R', 'U L'],
    //   ['D', 'U R', 'L R', 'L'],
    //   ['D R', 'L', 'U D', 'U'],
    //   ['R', 'L R', 'L D', 'U'],
    // ]
  },
  {
    ...shape,
    name: "i-block",
    color: "cyan",
    layout: shapeOutput(shape7),
    shadow: {
      ...shape.shadow,
    //   borders: [
    //   ['D','D U', 'D U', 'U'],
    //   ['R', 'L R', 'L R', 'L'],
    //   ['D', 'D U', 'D U', 'U'],
    //   ['R', 'L R', 'L R', 'L'],
    // ],
      color: "shadow cyan"
    },
    borders: 
    // [
      ['D', 'D U', 'D U', 'U'],
      // ['R', 'L R', 'L R', 'L'],
      // ['D', 'D U', 'D U', 'U'],
      // ['R', 'L R', 'L R', 'L'],
    // ]
  }
].map(e => {
  e.preview = showNextPiece(e)
  return e
})
