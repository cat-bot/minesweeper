export class AppUtil {
    constructor() {
        // defined elsewhere
        this._log = AppEnv === "dev";
    }
    
    Log(entry) {
        if (this._log && entry)
            console.log(entry);
    }
}

