import { Navigation } from './navigation.js';
import { Minesweeper } from '../minesweeper/minesweeperapp.js';
import { Error } from './error.js';
import { AppRoute } from './approute';
import { AppRouter } from './approuter';
import { AppStats } from './../stats/appstats.js';

class App {
    constructor() {
        this.$rootAppContainer = '#app-main';
        this.routes = [
            new AppRoute("/", function() { return new Minesweeper(this.$rootAppContainer); }.bind(this)),
            new AppRoute("/stats", function() { return new AppStats(this.$rootAppContainer); }.bind(this)),
            new AppRoute("/error", function() { return new Error(this.$rootAppContainer); }.bind(this))
        ];
    }

    Mount() {
        new AppRouter(this.routes);
        new Navigation();
    }
}

// start
new App().Mount();


