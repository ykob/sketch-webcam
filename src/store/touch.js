import { Vector2 } from 'three';

export default {
  namespaced: true,
  state: {
    vStart: new Vector2(),
    vMoveStart: new Vector2(),
    vMove: new Vector2(),
    vMoveDiff: new Vector2(),
    isStarted: false,
    isMoving: false
  },
  mutations: {
    start(state, { x, y }) {
      state.isStarted = true;
      state.vStart.set(x, y);
      state.vMove.set(x, y);
    },
    move(state, { x, y }) {
      if (state.isStarted === false) return;
      state.vMove.set(x, y);
      if (state.isMoving === false) {
        // judge whether the touch is a swipe or a single tap.
        if (
          state.vStart
            .clone()
            .sub(state.vMove)
            .length() > 3
        ) {
          state.vMoveStart.set(x, y);
          state.isMoving = true;
        }
      } else {
        // judge whether the swipe direction is X or Y.
        state.vMoveDiff.set(
          state.vMove.x - state.vMoveStart.x,
          state.vMove.y - state.vMoveStart.y
        );
      }
    },
    end(state) {
      state.vMoveDiff.set(0, 0);
      state.isStarted = false;
      state.isMoving = false;
    }
  }
};
