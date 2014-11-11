var apiTimeout = 60 * 1000;

function getProfessions() {
    return $.ajax('http://home.gibm.ch/interfaces/133/berufe.php', {
        dataType: 'json',
        timeout: apiTimeout
    });
}

function getClasses(professionId) {
    // professionId may be an integer or undefined/ null
    if (!isInteger(professionId) && typeof professionId !== "undefined" && professionId !== null) {
        return null;
    }

    return $.ajax('http://home.gibm.ch/interfaces/133/klassen.php', {
        data: {
            'beruf_id': professionId
        },
        dataType: 'json',
        timeout: apiTimeout
    });
}

function getLessons(classId, week, year) {
    // professionId may be an integer
    // week may be an integer between 1 and 53 or undefined/ null, but only if year is undefinded/ null too
    // year may be an integer or undefined/ null, but only if week is undefinded/ null too
    if (!isInteger(classId)) {
        return null;
    }
    if ((!isInteger(week) && typeof week !== "undefined" && week !== null) ||
        (isInteger(week) && !isInteger(year))) {
        return null;
    }
    if ((!isInteger(year) && typeof year !== "undefined" && year !== null) || 
        (isInteger(year) && !isInteger(week))) {
        return null;
    }

    var data = {
        'klasse_id': classId
    };
    if (isInteger(week) && isInteger(year)) {
        data.woche = week + '-' + year;
    }

    return $.ajax('http://home.gibm.ch/interfaces/133/tafel.php', {
        data: data,
        dataType: 'json',
        timeout: apiTimeout
    });
}
