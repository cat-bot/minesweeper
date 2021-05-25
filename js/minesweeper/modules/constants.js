"use strict";

const GRID_SIZES = {
    beginner : { width: 9, height: 9, mines: 10},
    intermediate: { width: 16, height: 16, mines: 40},
    expert: { width: 30, height: 16, mines: 99},
};

const GAME_COMPLETION_STATES = {
    started: 0,
    completed: 1,
    failed: 2
};
