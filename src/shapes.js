import { width } from "./constants";

const shape1 = [
  [[1, 1, 0, 0], [0, 1, 1, 0], [0, 0, 0, 0], [0, 0, 0, 0]],
  [[0, 0, 1, 0], [0, 1, 1, 0], [0, 1, 0, 0], [0, 0, 0, 0]],
  [[0, 0, 0, 0], [1, 1, 0, 0], [0, 1, 1, 0], [0, 0, 0, 0]],
  [[0, 1, 0, 0], [1, 1, 0, 0], [1, 0, 0, 0], [0, 0, 0, 0]]
];
const shape2 = [
  [[0, 1, 1, 0], [1, 1, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]],
  [[0, 1, 0, 0], [0, 1, 1, 0], [0, 0, 1, 0], [0, 0, 0, 0]],
  [[0, 0, 0, 0], [0, 1, 1, 0], [1, 1, 0, 0], [0, 0, 0, 0]],
  [[1, 0, 0, 0], [1, 1, 0, 0], [0, 1, 0, 0], [0, 0, 0, 0]]
];
const shape3 = [
  [[1, 1, 0, 0], [1, 1, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]],
  [[1, 1, 0, 0], [1, 1, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]],
  [[1, 1, 0, 0], [1, 1, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]],
  [[1, 1, 0, 0], [1, 1, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]]
];
const shape4 = [
  [[0, 1, 0, 0], [1, 1, 1, 0], [0, 0, 0, 0], [0, 0, 0, 0]],
  [[0, 1, 0, 0], [0, 1, 1, 0], [0, 1, 0, 0], [0, 0, 0, 0]],
  [[0, 0, 0, 0], [1, 1, 1, 0], [0, 1, 0, 0], [0, 0, 0, 0]],
  [[0, 1, 0, 0], [1, 1, 0, 0], [0, 1, 0, 0], [0, 0, 0, 0]]
];
const shape5 = [
  [[1, 0, 0, 0], [1, 0, 0, 0], [1, 1, 0, 0], [0, 0, 0, 0]],
  [[1, 1, 1, 0], [1, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]],
  [[0, 1, 1, 0], [0, 0, 1, 0], [0, 0, 1, 0], [0, 0, 0, 0]],
  [[0, 0, 1, 0], [1, 1, 1, 0], [0, 0, 0, 0], [0, 0, 0, 0]]
];
const shape6 = [
  [[0, 1, 0, 0], [0, 1, 0, 0], [1, 1, 0, 0], [0, 0, 0, 0]],
  [[1, 0, 0, 0], [1, 1, 1, 0], [0, 0, 0, 0], [0, 0, 0, 0]],
  [[0, 1, 1, 0], [0, 1, 0, 0], [0, 1, 0, 0], [0, 0, 0, 0]],
  [[0, 0, 0, 0], [1, 1, 1, 0], [0, 0, 1, 0], [0, 0, 0, 0]]
];
const shape7 = [
  [[0, 1, 0, 0], [0, 1, 0, 0], [0, 1, 0, 0], [0, 1, 0, 0]],
  [[0, 0, 0, 0], [1, 1, 1, 1], [0, 0, 0, 0], [0, 0, 0, 0]],
  [[0, 0, 1, 0], [0, 0, 1, 0], [0, 0, 1, 0], [0, 0, 1, 0]],
  [[0, 0, 0, 0], [0, 0, 0, 0], [1, 1, 1, 1], [0, 0, 0, 0]]
];

const shapeOutput = arr =>
  arr.reduce((acc, rotation) => {
    const rot = rotation.reduce((rotAcc, row, rowIndex) => {
      const rowArr = row.reduce((rowAcc, col, colIndex) => {
        if (col) rowAcc.push(colIndex + rowIndex * width);
        return rowAcc;
      }, []);
      return [...rotAcc, ...rowArr];
    }, []);
    acc.push(rot);
    return acc;
  }, []);

 const shapeArr1 = shapeOutput(shape1);
 const shapeArr2 = shapeOutput(shape2);
 const shapeArr3 = shapeOutput(shape3);
 const shapeArr4 = shapeOutput(shape4);
 const shapeArr5 = shapeOutput(shape5);
 const shapeArr6 = shapeOutput(shape6);
 const shapeArr7 = shapeOutput(shape7);

function showNextPiece(shape) {
  const newShape = shape.layout[0];
  const highestIndex = newShape[3] + 1;
  const arr = new Array(highestIndex).fill().map(() => "none");
  return arr.map((e, i) => (newShape.includes(i) ? shape.color : "none"));
}
const shape = {
  layout: shapeArr1,
  rotation: 0,
  direction: 0,
  cells: [undefined],
  previous: {
    cells: [-1],
    color: 'black',
  },
  position: 6 - width,
  shadow: {
    cells: [],
    color: "white"
  }
};

export const shapes = [
  {
    ...shape,
    name: "z-block",
    color: "red",
    layout: shapeArr1
  },
  {
    ...shape,
    name: "s-block",
    color: "green",
    layout: shapeArr2
  },
  {
    ...shape,
    name: "o-block",
    color: "yellow",
    layout: shapeArr3
  },
  {
    ...shape,
    name: "t-block",
    color: "purple",
    layout: shapeArr4
  },
  {
    ...shape,
    name: "l-block",
    color: "orange",
    layout: shapeArr5
  },
  {
    ...shape,
    name: "j-block",
    color: "blue",
    layout: shapeArr6
  },
  {
    ...shape,
    name: "i-block",
    color: "cyan",
    layout: shapeArr7
  }
].map(e => {
  e.preview = showNextPiece(e)
  return e
})
