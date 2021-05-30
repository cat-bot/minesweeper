import { AppUtil } from '../coreapp/apputil.js';
import { StatDb } from '../coreapp/statdb.js';

export class AppStats {
    constructor(rootContainerSelector) {
        this.rootContainerSelector = rootContainerSelector;
        this.scoreGridId = 'scores-grid';
        this.util = new AppUtil();
        this.statsdb = new StatDb();

        this.template = `
            <div class='app-container container-sm'>
                <div class='row'>
                    <div class='col-12 p-1 p-sm-3 py-sm-2 g-sm-2'>
                        <table class="table table-striped table-borderless">
                            <thead>
                                <tr>
                                    <th scope="col">user</th>
                                    <th scope="col">game</th>
                                    <th scope="col">difficulty</th>
                                    <th scope="col">time</th>
                                </tr>
                            </thead>
                            <tbody id='${this.scoreGridId}'></tbody>
                        </table>
                    </div>
                </div>
            </div>
        `;
    }
        
    // methods
    MountControls(results) {
        let stack = [];

        results.forEach((doc) => {
            var data = doc.data();
            stack.push(`
                <tr>
                    <td>${data.name}</td>
                    <td>
                        <span class='d-inline-block'>${data.gamealias}</span>
                        <span class='d-none d-sm-inline'>${data.game}</span>
                    </td>
                    <td>${data.gametype}</td>
                    <td>${(data.time / 1000).toFixed(1)}</td>
                </tr>`
            );
        });

        $(`#${this.scoreGridId}`).html(stack.join(''));
    }

    UnMountControls() {
        $(this.rootContainerSelector).html('');
    }

    Mount() {
        this.util.Log("mount appstats");
        $(this.rootContainerSelector).html(this.template);

        this.statsdb.GetScores(this.MountControls.bind(this));
    }

    UnMount() {
        this.util.Log("unmount appstats");
        this.UnMountControls();
    }
}