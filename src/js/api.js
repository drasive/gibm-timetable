var apiTimeout = 60 * 1000;

function getProfessions() {
    return $.ajax('http://home.gibm.ch/interfaces/133/berufe.php', {
        dataType: 'json',
        timeout: apiTimeout
    });
}

function getClasses(professionId) {
    if (typeof professionId !== "undefined" && professionId !== null && !isInteger(professionId)) {
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
    if (typeof classId !== 'number' || !isInteger(classId)) {
        return null;
    }
    if (typeof week !== "undefined" && week !== null && !isInteger(week)) {
        return null;
    }
    if (typeof year !== "undefined" && year !== null && !isInteger(year)) {
        return null;
    }

    var weekParameter = week + '-' + year;

    return $.ajax('http://home.gibm.ch/interfaces/133/tafel.php', {
        data: {
            'klasse_id': classId,
            'woche': weekParameter
        },
        dataType: 'json',
        timeout: apiTimeout
    });
}
