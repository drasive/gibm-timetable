$(function () {

    // Initialize UI
    var professionSelection = $('#profession-selection');
    var professionSelect = $('#profession');

    var classSelection = $('#class-selection');
    var classSelect = $('#class');

    var timetableContainer = $('#timetable-container');
    var timetable = $('#timetable tbody');

    var weekCurrent = $('#week-current');
    var weekPrevious = $('#week-previous');
    var weekNext = $('#week-next');
    var weekReset = $('#week-reset');


    professionSelection.fadeOut(0);
    classSelection.fadeOut(0);
    timetableContainer.fadeOut(0);

    loadProfessions();

    var today = new Date();
    setCurrentWeek(getWeekOfYear(today), today.getFullYear());
    weekCurrent.prop('title', 'Go to current week (' + formatWeekOfYear(getWeekOfYear(today), today.getFullYear()) + ')');

    $('#legalTabs a:first').tab('show');

    // Handle events
    professionSelect.change(function () {
        // Save selected profession
        localStorage.setItem('professionId', professionSelect.val());
        logStorageProcess("Saved the selection of profession #" + professionSelect.val());


        if (professionSelect.val() !== '') {
            loadClasses();
        }
        else {
            // TODO: Something
            // Do not show results
            classSelection.fadeOut();
        }
    });

    classSelect.change(function () {
        // Save selected class
        localStorage.setItem(professionSelect.val() + '/classId', classSelect.val());
        logStorageProcess("Saved the selection of class #" + classSelect.val() + ' for profession #' + professionSelect.val());


        if (classSelect.val() !== '') {
            loadTimetable();
        }
        else {
            // TODO: Something
            // Do not show results
            timetableContainer.fadeOut();
        }
    });


    weekPrevious.click(function () {
        var week = weekCurrent.data('week');
        var year = weekCurrent.data('year');

        if (week > 1) {
            week--;
        } else {
            year--;
            week = 52; // TODO: Improve week number calculation
        }

        setCurrentWeek(week, year);
        loadTimetable(); // TODO: Do not fade week selection
    });

    weekNext.click(function () {
        var week = weekCurrent.data('week');
        var year = weekCurrent.data('year');

        if (week < 52) { // TODO: Improve end of year detection
            week++;
        } else {
            year++;
            week = 1;
        }

        setCurrentWeek(week, year);
        loadTimetable(); // TODO: Do not fade week selection
    });

    weekReset.click(function () {
        setCurrentWeek(getWeekOfYear(today), today.getFullYear());
        loadTimetable(); // TODO: Do not fade week selection
    });

    // Methods
    function loadProfessions() {
        professionSelection.fadeOut();
        // TODO: Show loading animation

        logAjaxProcess('Requesting all professions');
        $.ajax('http://home.gibm.ch/interfaces/133/berufe.php', {
            dataType: 'json',
            success: function (data) {
                logAjaxProcess('Sucessfully received ' + data.length + ' professions', true);

                // Add professions
                $.each(data, function (index, item) {
                    professionSelect.append('<option value="' + item.beruf_id + '">' + item.beruf_name + '</option>');
                });

                // Fade in profession selection
                professionSelection.stop().fadeIn();


                // Use saved profession
                var savedProfessionId = localStorage.getItem("professionId");
                if (savedProfessionId && professionSelect.find("option[value='" + savedProfessionId + "']").length) {
                    logStorageProcess("Using the saved profession #" + savedProfessionId);

                    professionSelect.val(savedProfessionId);
                    loadClasses();
                }
            },
            error: function (xhr, status, error) {
                // TODO: Handle error
                logAjaxError('Failed to receive professions', xhr, status, error);
            }
        });
    }

    function loadClasses() {
        classSelection.fadeOut();
        timetableContainer.fadeOut();
        // TODO: Show loading animation

        logAjaxProcess('Requesting classes for profession #' + professionSelect.val());
        $.ajax('http://home.gibm.ch/interfaces/133/klassen.php', {
            data: {
                'beruf_id': professionSelect.val()
            },
            dataType: 'json',
            success: function (data) {
                logAjaxProcess('Sucessfully received ' + data.length + ' classes', true);

                if (professionSelect.val() !== '-') { // Profession selection hasn't changed during AJAX request
                    // Clear old classes
                    classSelect.find('option[value != "-"]').remove();

                    // Add new classes
                    $.each(data, function (index, item) {
                        classSelect.append('<option value="' + item.klasse_id + '">' + item.klasse_name + '</option>');
                    });

                    // Fade in class selection
                    classSelection.stop().fadeIn();


                    // Use saved class
                    var savedClassId = localStorage.getItem(professionSelect.val() + "/classId");
                    if (savedClassId && classSelect.find("option[value='" + savedClassId + "']").length) {
                        logStorageProcess("Using the saved class #" + savedClassId);

                        classSelect.val(savedClassId);
                        loadTimetable();
                    }
                }
            },
            error: function (xhr, status, error) {
                // TODO: Handle error
                logAjaxError('Failed to receive classes', xhr, status, error);
            }
        });
    }

    function loadTimetable() {
        timetableContainer.fadeOut();
        // TODO: Show loading animation

        var week = formatWeekOfYear(weekCurrent.data('week'), weekCurrent.data('year'), true);
        logAjaxProcess('Requesting lessons for class #' + classSelect.val() + ' in week ' + week);
        $.ajax('http://home.gibm.ch/interfaces/133/tafel.php', {
            data: {
                'klasse_id': classSelect.val(),
                'woche': week
            },
            dataType: 'json',
            success: function (data) {
                logAjaxProcess('Sucessfully received ' + data.length + ' lessons', true);

                if (classSelect.val() !== '-') { // Class selection hasn't changed during AJAX request
                    // Clear old lessons
                    timetable.empty();

                    // Add new lessons
                    if (data && data.length) {
                        $.each(data, function (index, item) {
                            var row = $('<tr></tr>').appendTo(timetable);
                            $('<td>' + getDayOfWeek(item.tafel_wochentag) + '</td>').appendTo(row);
                            $('<td>' + formatTime(item.tafel_von) + ' - ' + formatTime(item.tafel_bis) + '</td>').appendTo(row);
                            $('<td>' + item.tafel_lehrer + '</td>').appendTo(row);
                            $('<td>' + item.tafel_longfach + '</td>').appendTo(row);
                            $('<td>' + item.tafel_raum + '</td>').appendTo(row);
                            $('<td>' + item.tafel_kommentar + '</td>').appendTo(row);
                        });
                    }
                    else {
                        // TODO: Handle no data

                    }

                    // Fade in timetable container
                    timetableContainer.stop().fadeIn();
                }
            },
            error: function (xhr, status, error) {
                // TODO: Handle error
                logAjaxError('Failed to receive lessons', xhr, status, error);
            }
        });
    }


    function setCurrentWeek(week, year) {
        // Set data attributes
        weekCurrent.data('week', week);
        weekCurrent.data('year', year);

        logUiProcess('Updated the selected week to ' + formatWeekOfYear(week, year));

        // Set text
        weekCurrent.text(formatWeekOfYear(week, year));
    }

    // Helpers
    function getDayOfWeek(dayIndex) {
        return ["Mon.", "Tue.", "Wed.", "Thu.", "Fri.", "Sat.", "Sun."][dayIndex];
    }

    function getWeekOfYear(date) {
        // TODO: Improve a little
        return 45;
    }

    function formatWeekOfYear(week, year, isForApi) {
        isForApi = isForApi || false;

        if (isForApi) {
            return week + '-' + year;
        } else {
            return week + ' - ' + year;
        }
    }

    function formatTime(timeString) {
        // Provided string is in format hh:MM:ss.
        // Return the first 5 chars (hh:MM).

        if (timeString.length >= 5) {
            return timeString.substr(0, 5);
        }

        return timeString;
    }


    function logUiProcess(message) {
        console.debug('[UI] ' + message);
    }

    function logAjaxProcess(message, isResponse) {
        isResponse = isResponse || false;

        var logMessage = '[AJAX] ' + message;

        if (isResponse) {
            console.info(logMessage);
        } else {
            console.debug(logMessage);
        }
    }

    function logAjaxError(message, xhr, status, error) {
        console.error(message + ' (' + status + '): ' + xhr.responseText);
    }

    function logStorageProcess(message) {
        console.debug('[STORAGE] ' + message);
    }

});
