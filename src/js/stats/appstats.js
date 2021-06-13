import { AppUtil } from '../coreapp/apputil.js';
import { StatDb } from '../coreapp/statdb.js';

export class AppStats {
    constructor(rootContainerSelector) {
        this.rootContainerSelector = rootContainerSelector;
        this.scoreGridId = 'scores-grid';
        this.util = new AppUtil();
        this.statsdb = new StatDb();
        this.pageStart = 0;
        this.pageSize = 10;

        this.template = `
            <div class='app-container container-sm stats-container'>
                <div class='row'>
                    <div class='col-12 p-1 p-sm-3 py-sm-2 g-sm-2'>
                        <table class="table table-striped table-borderless">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">user</th>
                                    <th scope="col">difficulty</th>
                                    <th scope="col">time (s)</th>
                                </tr>
                            </thead>
                            <tbody id='${this.scoreGridId}' class='opacity-animation'></tbody>
                        </table>
                    </div>
                    <div class='col-12 p-1 p-sm-3 py-sm-2 g-sm-2 d-none content-justify-center' id='paging'>
                        <nav aria-label="...">
                            <ul class="pagination pagination">
                                <li id="pg-prev" class="disabled page-item" title="show me the previous scores"><a class="page-link" href="#/stats">&lt; prev</a></li>
                                <li id='pg-next' class="disabled page-item" title="show me the next scores"><a class="page-link" href="#/stats">next &gt;</a></li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        `;
    }
        
    // methods
    MountStats(results) {
        // record where we are at for next paging
        this.pageStart =  results.startAt;

        // cosmetic index for display
        let startIndex = results.startAt;
        let stack = results.data.map((d) => {
            startIndex++;
            return `
                <tr id='${d.docid}'>
                    <td>${startIndex}</td>
                    <td>${d.name}</td>
                    <td>${d.gametype}</td>
                    <td>${(d.time / 1000).toFixed(1)}</td>
                </tr>`;
        });

        // show the scores
        $(`#${this.scoreGridId}`).html(stack.join('')).toggleClass('fadeIn');

        // show the paging, rebind handlers
        if (results.hasNext || results.hasPrev) {
            $('#paging')
                .removeClass('d-none')
                .find('#pg-prev')
                .off('click')
                .addClass('disabled')
                .end()
                .find('#pg-next')
                .off('click')
                .addClass('disabled');

            if (results.hasPrev) {
                let prev = function() {
                    this.QueryData(this.pageStart - this.pageSize, this.pageSize);
                }.bind(this);

                $('#pg-prev')
                    .removeClass('disabled')
                    .on('click', prev);
            }

            if (results.hasNext) {
                let next = function() {
                    this.QueryData(this.pageStart + this.pageSize, this.pageSize);
                }.bind(this);

                $('#pg-next')
                    .removeClass('disabled')
                    .on('click', next);
            }
        }
    }

    QueryData(pageStart, pageSize) {
        this.statsdb.GetScores(pageStart, pageSize, this.MountStats.bind(this));
    }

    UnMountControls() {
        $(this.rootContainerSelector).html('');
    }

    Mount() {
        this.util.Log("mount appstats");
        $(this.rootContainerSelector).html(this.template);

        // query inital data
        this.QueryData(this.pageStart, this.pageSize);
    }

    UnMount() {
        this.util.Log("unmount appstats");
        this.UnMountControls();
    }
}