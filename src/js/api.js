var apiTimeout = 60 * 1000;

function getProfessions() {
    return $.ajax('http://home.gibm.ch/interfaces/133/berufe.php', {
        dataType: 'json',
        timeout: apiTimeout
    });
}

function getClasses(professionId) {
    return $.ajax('http://home.gibm.ch/interfaces/133/klassen.php', {
        data: {
            'beruf_id': professionId
        },
        dataType: 'json',
        timeout: apiTimeout
    });
}

function getLessons(classId, week, year) {
    var weekParameter = week + '-' + year;;

    return $.ajax('http://home.gibm.ch/interfaces/133/tafel.php', {
        data: {
            'klasse_id': classId,
            'woche': weekParameter
        },
        dataType: 'json',
        timeout: apiTimeout
    });
}
