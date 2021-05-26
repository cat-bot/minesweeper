"use strict";

const GRID_SIZES = {
    beginner : { width: 9, height: 9, mines: 10, label: "beginner"},
    intermediate: { width: 16, height: 16, mines: 40, label: "intermediate"},
    expert: { width: 16, height: 26, mines: 86, label: "expert"},
};

const GAME_COMPLETION_STATES = {
    started: 0,
    completed: 1,
    failed: 2
};
