export class Error {
    constructor(rootContainerSelector) {
        this.rootContainerSelector = rootContainerSelector;
    }

    set ErrorCode(httpErrorCode) {
        this.httpErrorCode = httpErrorCode;
    }

    get ErrorCode() {
        return this.httpErrorCode;
    }

    set UserErrorMessage(msg) {
        this.message = msg;
    }

    get UserErrorMessage() {
        return this.message;
    }

    Mount() {
        $(this.rootContainerSelector).html(`
            <div class='error-container container-sm mt-4'>
                <div class='row py-4'>
                    <div class='col-12 d-flex justify-content-center align-content-middle'>
                        <div class='font-monospace fs-1'>${this.ErrorCode}</div>
                    </div>
                    <div class='col-12 d-flex justify-content-center align-content-middle pb-3 px-3 text-center'>
                        <div class='fs-3'>${this.UserErrorMessage}</div>
                    </div>
                </div>
            </div>
        `);
    }

    UnMount() {
        $(this.rootContainerSelector).html('');
    }
}