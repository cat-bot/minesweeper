export class MinesweeperScore {
    constructor(gametype, name, uid, time) {
        this.Persistable = {
            game: "minesweeper",
            gamealias: "&#625;",
            gametype: gametype,
            name: name,
            uid: uid,
            time: time
        };
    }

    get PersistableData() {
        return this.Persistable;
    }
}