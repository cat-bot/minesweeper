import { EnvConfig } from './config/config-APPTARGET.js';

export class StatDb {
    constructor() {
        this.db = firebase.firestore();
    }

    GetScores(startAt, n, onSuccess, onError) {
        // fetch 1 more than n, to test for paging
        let k = n + 1;
        this.db.collection(EnvConfig.scores_collection).orderBy("time").startAt(startAt).limit(k).get().then(
            (querySnapshot) => { 
                let results = [];

                querySnapshot.forEach((doc) => {
                    let index = startAt;
                    var data = doc.data();
                    data.docid = doc.id;
                    index++;
                    
                    results.push(data);
                });

                let hasPrev = startAt != 0;
                let hasNext = results.length > n;

                // if the length, exceeds what we wanted to query, there's a next page, so pop the one extra entry
                if (hasNext)
                    results.pop();
        
                let page = {
                    data: results,
                    startAt: startAt,
                    hasPrev: hasPrev,
                    prevStartAt: hasPrev ? startAt - n : undefined,
                    hasNext: hasNext,
                    nextStartAt: hasNext ? startAt + n : undefined
                };

                onSuccess(page); 
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