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

    loadProfessions();

    // Event handlers
    professionsSelection.change(function () {
        // Save selected profession
        storageSet('professionId', professionsSelection.val());

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
        storageSet('p' + professionsSelection.val() + '/classId', classesSelection.val());

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

    $(document).keydown(function (e) {
        if (typeof e === "undefined") { e = window.event; }

        var arrowKeyLeft = 37;
        var arrowKeyRight = 39;
        var wKey = 65;
        var dKey = 68;

        var areLessonsShown = lessonsContainer.is(":visible");
        if ((e.keyCode === arrowKeyLeft || e.keyCode === wKey) && areLessonsShown) {
            weekPrevious.trigger('click');
        } else if ((e.keyCode === arrowKeyRight || e.keyCode === dKey) && areLessonsShown) {
            weekNext.trigger('click');
        }
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
        // Fade out container
        professionsContainer.stop().fadeOut();

        // TODO: Show loading animation

        logAjaxProcess('Requesting all professions');
        getProfessions()
            .success(function (data) {
                logAjaxProcess('Sucessfully received ' + data.length + ' professions', true);

                // Add professions
                $.each(data, function (index, item) {
                    professionsSelection.append('<option value="' + item.beruf_id + '">' + item.beruf_name + '</option>');
                });

                // Show result
                professionsResult.show(0);
                professionsError.hide(0);

                // Fade in container
                professionsContainer.stop().fadeIn();

                // Use saved selection
                var savedProfessionId = storageGet("professionId");
                if (savedProfessionId !== null && savedProfessionId !== '-' && professionsSelection.find("option[value='" + savedProfessionId + "']").length) {
                    logUiProcess("Using the saved profession #" + savedProfessionId);

                    professionsSelection.val(savedProfessionId);
                    loadClasses();
                }
            })
            .error(function (xhr, status, error) {
                logAjaxError('Failed to retrieve professions', xhr, status, error);

                // Show error message
                professionsResult.hide(0);
                professionsError.show(0);

                // Fade in container
                professionsContainer.stop().fadeIn();
            });
    }

    function loadClasses() {
        // Fade out container
        classesContainer.stop().fadeOut();
        timetableContainer.stop().fadeOut();

        // TODO: Show loading animation

        logAjaxProcess('Requesting classes for profession #' + professionsSelection.val());
        getClasses(professionsSelection.val())
            .success(function (data) {
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

                    // Fade in container
                    classesContainer.stop().fadeIn();

                    // Use saved selection
                    var savedClassId = storageGet('p' + professionsSelection.val() + "/classId");
                    if (savedClassId !== null && savedClassId !== '-' && classesSelection.find("option[value='" + savedClassId + "']").length) {
                        logUiProcess("Using the saved class #" + savedClassId);

                        classesSelection.val(savedClassId);
                        loadTimetable();
                    }
                }
            })
            .error(function (xhr, status, error) {
                logAjaxError('Failed to retrieve classes', xhr, status, error);

                // Show error message
                classesResult.hide(0);
                classesError.show(0);

                // Fade in container
                classesContainer.stop().fadeIn();
            });
    }

    function loadTimetable(fadeWeekSelection) {
        if (typeof fadeWeekSelection === "undefined") { fadeWeekSelection = true; }

        // Fade out container
        var fadingTarget = fadeWeekSelection ? timetableContainer : lessonsContainer;
        fadingTarget.stop().fadeOut();

        // TODO: Show loading animation

        var week = formatWeekOfYear(weekCurrent.data('week'), weekCurrent.data('year'), true);
        logAjaxProcess('Requesting lessons for class #' + classesSelection.val() + ' in week ' + week);
        getLessons(classesSelection.val(), weekCurrent.data('week'), weekCurrent.data('year'))
            .success(function (data) {
                logAjaxProcess('Sucessfully received ' + data.length + ' lessons', true);

                if (classesSelection.val() !== '-') { // Class selection hasn't changed during AJAX request
                    // Clear old lessons
                    lessons.empty();

                    if (data && data.length) {
                        // Show result
                        lessonsResult.show(0);
                        lessonsNoData.hide(0);
                        lessonsError.hide(0);

                        // Add new lessons
                        $.each(data, function (index, item) {
                            var row = $('<tr id="l' + item.tafel_id + '"></tr>').appendTo(lessons);
                            $('<td>' + formatDayOfWeek(parseInt(item.tafel_wochentag)).substr(0, 3) + ', ' + formatDate(item.tafel_datum) + '</td>').appendTo(row);
                            $('<td>' + formatTime(item.tafel_von) + ' - ' + formatTime(item.tafel_bis) + '</td>').appendTo(row);
                            $('<td>' + item.tafel_lehrer + '</td>').appendTo(row);
                            $('<td>' + item.tafel_longfach + '</td>').appendTo(row);
                            $('<td>' + item.tafel_raum + '</td>').appendTo(row);
                            $('<td>' + item.tafel_kommentar + '</td>').appendTo(row);
                        });
                    } else {
                        // Show no-data message
                        lessonsResult.hide(0);
                        lessonsNoData.show(0);
                        lessonsError.hide(0);
                    }

                    // Fade in container
                    fadingTarget.stop().fadeIn();
                }
            })
            .error(function (xhr, status, error) {
                logAjaxError('Failed to retrieve lessons', xhr, status, error);

                // Show error message
                lessonsResult.hide(0);
                lessonsNoData.hide(0);
                lessonsError.show(0);

                // Fade in container
                fadingTarget.stop().fadeIn();
            });
    }


    function setCurrentWeek(week, year) {
        // Set data attributes
        weekCurrent.data('week', week);
        weekCurrent.data('year', year);

        logUiProcess('Updated the selected week to ' + formatWeekOfYear(week, year));

        // Set text and title
        weekCurrent.text('Week ' + formatWeekOfYear(week, year));

        var weekStart = getDateOfWeek(week, year);
        var weekEnd = addDaysToDate(weekStart, 7);
        weekCurrent.prop('title', formatDate(weekStart) + ' - ' + formatDate(weekEnd));
    }

    // Helpers
    function formatDayOfWeek(dayIndex) {
        if (typeof dayIndex !== 'number' || dayIndex === null ||
            dayIndex < 0 || dayIndex > 6) {
            return null;
        }

        return ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][dayIndex];
    }

    function formatDate(isoString) {
        return $.datepicker.formatDate('dd.mm', new Date(isoString));
    }

    function formatWeekOfYear(week, year) {
        return week + ' - ' + year;
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
