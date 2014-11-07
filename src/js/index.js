$(function () {

    // Initialize UI
    var professionsContainer = $('#professions-container');
    var professionsResult = $('#professions-result');
    var professionsSelection = $('#profession');
    var professionsError = $('#professions-error');
    var professionsRetry = $('#professions-retry');

    var classesContainer = $('#classes-container');
    var classesResult = $('#classes-result');
    var classesSelection = $('#class');
    var classesError = $('#classes-error');
    var classesRetry = $('#classes-retry');

    var timetableContainer = $('#timetable-container');
    var weekCurrent = $('#week-current');
    var weekPrevious = $('#week-previous');
    var weekNext = $('#week-next');
    var weekReset = $('#week-reset');
    var lessonsContainer = $('#lessons-container');
    var lessonsResult = $('#lessons-result');
    var lessons = lessonsResult.find('table tbody');
    var lessonsNoData = $('#lessons-no-data');
    var lessonsError = $('#lessons-error');
    var lessonsRetry = $('#lessons-retry');


    professionsContainer.hide(0);
    professionsError.hide(0);
    classesContainer.hide(0);
    classesError.hide(0);
    timetableContainer.hide(0);
    lessonsNoData.hide(0);
    lessonsError.hide(0);

    var today = new Date();
    setCurrentWeek(getWeekOfYear(today), today.getFullYear());
    weekReset.prop('title', 'Go to current week (' + formatWeekOfYear(getWeekOfYear(today), today.getFullYear()) + ')');
    $('#legalTabs a:first').tab('show');

    $(document).keydown(function (e) {
        if (typeof e === "undefined") { e = window.event; }

        var arrowKeyLeft = '37';
        var arrowKeyRight = '39';

        var areLessonsShown = lessonsContainer.is(":visible");
        if (e.keyCode == arrowKeyLeft && areLessonsShown) {
            weekPrevious.trigger('click');
        }
        else if (e.keyCode == arrowKeyRight && areLessonsShown) {
            weekNext.trigger('click');
        }
    });

    loadProfessions();

    // Handle events
    professionsSelection.change(function () {
        // Save selected profession
        localStorage.setItem('professionId', professionsSelection.val());
        logStorageProcess("Saved the selection of profession #" + professionsSelection.val());

        // Load classes
        if (professionsSelection.val() !== '-') {
            loadClasses();
        } else {
            classesContainer.stop().fadeOut();
            timetableContainer.stop().fadeOut();
        }
    });

    classesSelection.change(function () {
        // Save selected class
        localStorage.setItem('p' + professionsSelection.val() + '/classId', classesSelection.val());
        logStorageProcess("Saved the selection of class #" + classesSelection.val() + ' for profession #' + professionsSelection.val());

        // Load timetable
        if (classesSelection.val() !== '-') {
            loadTimetable();
        } else {
            timetableContainer.stop().fadeOut();
        }
    });


    weekPrevious.click(function () {
        var week = weekCurrent.data('week');
        var year = weekCurrent.data('year');

        if (week > 1) {
            week--;
        } else {
            year--;
            week = getWeeksInYear(year);
        }

        setCurrentWeek(week, year);
        loadTimetable(false);
    });

    weekNext.click(function () {
        var week = weekCurrent.data('week');
        var year = weekCurrent.data('year');

        if (week < getWeeksInYear(year)) {
            week++;
        } else {
            year++;
            week = 1;
        }

        setCurrentWeek(week, year);
        loadTimetable(false);
    });

    weekReset.click(function () {
        setCurrentWeek(getWeekOfYear(today), today.getFullYear());
        loadTimetable(false);
    });


    professionsRetry.click(function () {
        loadProfessions();
    });

    classesRetry.click(function () {
        loadClasses();
    });

    lessonsRetry.click(function () {
        loadTimetable();
    });

    // Methods
    function loadProfessions() {
        // TODO: Show loading animation

        logAjaxProcess('Requesting all professions');
        $.ajax('http://home.gibm.ch/interfaces/133/berufe.php', {
            dataType: 'json',
            timeout: 60 * 1000,
            success: function (data) {
                logAjaxProcess('Sucessfully received ' + data.length + ' professions', true);

                // Add professions
                $.each(data, function (index, item) {
                    professionsSelection.append('<option value="' + item.beruf_id + '">' + item.beruf_name + '</option>');
                });

                // Show result
                professionsResult.show(0);
                professionsError.hide(0);

                // TODO: Do when the rest of the method is executed
                // Use saved selection
                var savedProfessionId = localStorage.getItem("professionId");
                if (savedProfessionId && savedProfessionId !== '-' && professionsSelection.find("option[value='" + savedProfessionId + "']").length) {
                    logStorageProcess("Using the saved profession #" + savedProfessionId);

                    professionsSelection.val(savedProfessionId);
                    loadClasses();
                }
            },
            error: function (xhr, status, error) {
                logAjaxError('Failed to retrieve professions', xhr, status, error);

                professionsResult.hide(0);
                professionsError.show(0);
            }
        });

        // TODO: Wait for AJAX call to finish
        // Fade in container
        professionsContainer.fadeIn();
    }

    function loadClasses() {
        classesContainer.stop().fadeOut();
        timetableContainer.stop().fadeOut();
        // TODO: Show loading animation

        logAjaxProcess('Requesting classes for profession #' + professionsSelection.val());
        $.ajax('http://home.gibm.ch/interfaces/133/klassen.php', {
            data: {
                'beruf_id': professionsSelection.val()
            },
            dataType: 'json',
            timeout: 60 * 1000,
            success: function (data) {
                logAjaxProcess('Sucessfully received ' + data.length + ' classes', true);

                if (professionsSelection.val() !== '-') { // Profession selection hasn't changed during AJAX request
                    // Clear old classes
                    classesSelection.find('option[value != "-"]').remove();

                    // Add new classes
                    $.each(data, function (index, item) {
                        classesSelection.append('<option value="' + item.klasse_id + '">' + item.klasse_name + '</option>');
                    });

                    // Show result
                    classesResult.show(0);
                    classesError.hide(0);

                    // TODO: Do when the rest of the method is executed
                    // Use saved selection
                    var savedClassId = localStorage.getItem('p' + professionsSelection.val() + "/classId");
                    if (savedClassId && savedClassId !== '-' && classesSelection.find("option[value='" + savedClassId + "']").length) {
                        logStorageProcess("Using the saved class #" + savedClassId);

                        classesSelection.val(savedClassId);
                        loadTimetable();
                    }
                }
            },
            error: function (xhr, status, error) {
                logAjaxError('Failed to retrieve classes', xhr, status, error);

                classesResult.hide(0);
                classesError.show(0);
            }
        });

        // TODO: Wait for AJAX call to finish
        // Fade in container
        classesContainer.stop().fadeIn();
    }

    function loadTimetable(fadeWeekSelection) {
        if (typeof fadeWeekSelection === "undefined") { fadeWeekSelection = true; }

        var fadingTarget = fadeWeekSelection ? timetableContainer : lessonsContainer;
        fadingTarget.stop().fadeOut();
        // TODO: Show loading animation

        var week = formatWeekOfYear(weekCurrent.data('week'), weekCurrent.data('year'), true);
        logAjaxProcess('Requesting lessons for class #' + classesSelection.val() + ' in week ' + week);
        $.ajax('http://home.gibm.ch/interfaces/133/tafel.php', {
            data: {
                'klasse_id': classesSelection.val(),
                'woche': week
            },
            dataType: 'json',
            timeout: 60 * 1000,
            success: function (data) {
                logAjaxProcess('Sucessfully received ' + data.length + ' lessons', true);

                if (classesSelection.val() !== '-') { // Class selection hasn't changed during AJAX request
                    // Clear old lessons
                    lessons.empty();

                    // Add new lessons
                    if (data && data.length) {
                        lessonsResult.show(0);
                        lessonsNoData.hide(0);
                        lessonsError.hide(0);

                        $.each(data, function (index, item) {
                            var row = $('<tr></tr>').appendTo(lessons);
                            $('<td>' + getDayOfWeek(item.tafel_wochentag) + ', ' + formatDate(item.tafel_datum) + '</td>').appendTo(row);
                            $('<td>' + formatTime(item.tafel_von) + ' - ' + formatTime(item.tafel_bis) + '</td>').appendTo(row);
                            $('<td>' + item.tafel_lehrer + '</td>').appendTo(row);
                            $('<td>' + item.tafel_longfach + '</td>').appendTo(row);
                            $('<td>' + item.tafel_raum + '</td>').appendTo(row);
                            $('<td>' + item.tafel_kommentar + '</td>').appendTo(row);
                        });
                    }
                    else {
                        lessonsResult.hide(0);
                        lessonsNoData.show(0);
                        lessonsError.hide(0);
                    }
                }
            },
            error: function (xhr, status, error) {
                logAjaxError('Failed to retrieve lessons', xhr, status, error);

                lessonsResult.hide(0);
                lessonsNoData.hide(0);
                lessonsError.show(0);
            }
        });

        // TODO: Wait for AJAX call to finish
        // Fade in container
        fadingTarget.stop().fadeIn();
    }


    function setCurrentWeek(week, year) {
        // Set data attributes
        weekCurrent.data('week', week);
        weekCurrent.data('year', year);

        logUiProcess('Updated the selected week to ' + formatWeekOfYear(week, year));

        // Set text
        weekCurrent.text('Week ' + formatWeekOfYear(week, year));
    }

    // Helpers
    function getDayOfWeek(dayIndex) {
        return ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][dayIndex];
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


    function formatDate(isoString) {
        return $.datepicker.formatDate('dd.mm', new Date(isoString));
    }

    function formatWeekOfYear(week, year, isForApi) {
        if (typeof isForApi === "undefined") { isForApi = false; }

        if (isForApi) {
            return week + '-' + year;
        } else {
            return week + ' - ' + year;
        }
    }

    function formatTime(timeString) {
        // The provided string is in the format hh:MM:ss.
        // Returning the first 5 chars (hh:MM).

        if (timeString.length >= 5) {
            return timeString.substr(0, 5);
        }

        return timeString;
    }

});
