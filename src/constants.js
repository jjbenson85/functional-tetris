export const WIDTH = 16;
export const HEIGHT = 20;
export const BOARD_CELLS = WIDTH*HEIGHT;
export const LEFT = -1;
export const RIGHT = 1;
export const UP = -WIDTH;
export const DOWN = WIDTH;
export const CLOCK = 1;
export const ANTICLOCK = -1;
export const START_SPEED = 10;
export const L_GUTTER = 3;
export const R_GUTTER = WIDTH-(L_GUTTER+1);
export const TOP_GUTTER = WIDTH * 3
export const rotLookup = {
    32: CLOCK,
    90: CLOCK,
    88: ANTICLOCK,
};
export const dirLookup = {
    // 38: UP,
    40: DOWN,
    37: LEFT,
    39: RIGHT
};
export const moveSet = new Set([]) //Stores all current key presses
export const gridArr = new Array(BOARD_CELLS + TOP_GUTTER)
.fill()
.map((e, i) =>
    i % WIDTH < L_GUTTER || i % WIDTH > R_GUTTER ? "hidden" : "black"
)
