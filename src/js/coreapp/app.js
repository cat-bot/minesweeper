import { Navigation } from './navigation.js';
import { Minesweeper } from '../minesweeper/minesweeperapp.js';

let $rootAppContainer = '#app-main';

new Navigation($);

// start minesweepr
new Minesweeper($, $rootAppContainer).Start();