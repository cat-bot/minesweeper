import { AppUtil } from '../coreapp/apputil.js';

export class AppStats {
    constructor(rootContainerSelector) {
        this.rootContainerSelector = rootContainerSelector;
        this.util = new AppUtil();

        this.template = `
            <div class='app-container container-sm'>
                <div class='grid-container row'>
                    todo
                </div>
            </div>
        `;
    }
        
    // methods
    MountControls() {
        $(this.rootContainerSelector).html(this.template);
    }

    UnMountControls() {
        $(this.rootContainerSelector).html('');
    }

    Mount() {
        this.util.Log("mount appstats");
        this.MountControls();
    }

    UnMount() {
        this.util.Log("unmount appstats");
        this.UnMountControls();
    }
}