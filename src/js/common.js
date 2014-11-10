// Storage
function storageSet(key, value) {
    if (Modernizr.localstorage) {
        localStorage.setItem(key, value);

        logStorageProcess("Saved value '" + value + "' for key '" + key + "'");
        return true;
    }

    logWarning("Local Storage is not supported (attempted write operation)");
    return true;
}

function storageGet(key) {
    if (Modernizr.localstorage) {
        return localStorage.getItem(key);
    }

    logWarning("Local Storage is not supported (attempted read operation)");
    return null;
}

// Date/ Time
function getDateOfWeek(week, year) {
    var simple = new Date(year, 0, 1 + (week - 1) * 7);
    var dow = simple.getDay();

    var weekStart = simple;
    if (dow <= 4) {
        weekStart.setDate(simple.getDate() - simple.getDay() + 1);
    } else {
        weekStart.setDate(simple.getDate() + 8 - simple.getDay());
    }

    return weekStart;
}

function getWeekOfYear(date) {
    return $.datepicker.iso8601Week(date);
}

function getWeeksInYear(year) {
    return Math.max(
       getWeekOfYear(new Date(year, 11, 31)),
       getWeekOfYear(new Date(year, 11, 31 - 7))
    );
}


function addDaysToDate(date, days) {
    return new Date(date).setDate(date.getDate() + days);
}

// Logging
function logWarning(message) {
    console.warn(message);
}

function logError(message) {
    console.error(message);
}


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
