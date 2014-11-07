// Logging
function logUiProcess(message) {
    console.debug('[UI] ' + message);
}

function logStorageProcess(message) {
    console.debug('[STORAGE] ' + message);
}


function logAjaxProcess(message, isResponse) {
    if (typeof isResponse === "undefined") { isResponse = false; }

    var logMessage = '[AJAX] ' + message;

    if (isResponse) {
        console.info(logMessage);
    } else {
        console.log(logMessage);
    }
}

function logAjaxError(message, xhr, status, error) {
    console.error(message + ' (' + status + '): ' + xhr.responseText);
}
