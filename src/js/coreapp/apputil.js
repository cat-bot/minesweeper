import { EnvConfig } from './config/config-APPTARGET.js';

export class AppUtil {
    constructor() {
        this._log = EnvConfig.env === "dev";
    }
    
    Log(entry) {
        if (this._log && entry)
            console.log(entry);
    }
}