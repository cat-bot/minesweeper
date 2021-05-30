import { EnvConfig } from './config/config-APPTARGET.js';

export class StatDb {
    constructor() {
        this.db = firebase.firestore();
    }

    GetScores(onSuccess, onError) {
        this.db.collection(EnvConfig.scores_collection).orderBy("time").get().then(
            (querySnapshot) => { 
                onSuccess(querySnapshot); 
            },
            (error) => { onError(error); }
        );
    }

    AddScore(scoreObject) {
        this.db.collection(EnvConfig.scores_collection).add(scoreObject).then(() => {
            console.log("Document successfully written!");
        });
    }
}