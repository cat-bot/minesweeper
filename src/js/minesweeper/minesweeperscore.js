export class MinesweeperScore {
    constructor(gametype, name, uid, time) {
        this.game = "minesweeper";
        this.gamealias = "&#625;";
        this.gametype = gametype;
        this.name = name;
        this.uid = uid;
        this.time = time;
    }

    get PersistableData() {
        return {
            game: this.game,
            gamealias: this.gamealias,
            gametype: this.gametype,
            name: this.name,
            uid: this.uid,
            time: this.time
        };
    }
}