$(function () {
    
    // Initialize UI
    var professionSelection = $('#profession-selection');
    var professionSelect = $('#profession');
    
    var classSelection = $('#class-selection');
    var classSelect = $('#class');
    
    var timetableContainer = $('#timetable-container');
    var timetable = $('#timetable tbody');
    
    
    professionSelection.fadeOut(0);
    classSelection.fadeOut(0);
    timetableContainer.fadeOut(0);
    
    // TODO: Show loading animation
    logAjaxProcess('Requesting all professions', false);
    $.ajax('http://home.gibm.ch/interfaces/133/berufe.php', {
        dataType: 'json',
        success: function(data) {
            logAjaxProcess('Sucessfully received ' + data.length + ' professions', true);
            
            // Add professions
            $.each(data, function(index, item) {
            	professionSelect.append('<option value="' + item.beruf_id + '">' + item.beruf_name + '</option>');
            });
            
            // Fade in profession selection
            professionSelection.stop().fadeIn();
            

            // Use saved profession
            var savedProfessionId = localStorage.getItem("professionId");
            if (savedProfessionId && professionSelect.find("option[value='" + savedProfessionId + "']").length) {
                logStorageProcess("Using the saved profession #" + savedProfessionId);

                professionSelect.val(savedProfessionId);
                professionSelect.trigger('change');
            }
        },
        error: function(xhr, status, error) {
            // TODO: Handle error
            logAjaxError('Failed to receive professions', xhr, status, error);
        }
    });
    
    $('#legalTabs a:first').tab('show');
    
    // Handle events
    professionSelect.change(function () {
        // Save selected profession
        localStorage.setItem('professionId', professionSelect.val());
        logStorageProcess("Saved the selection of profession #" + professionSelect.val());


        if (professionSelect.val() !== '') {
            classSelection.fadeOut();
            timetableContainer.fadeOut();
            // TODO: Show loading animation
            
            logAjaxProcess('Requesting classes for profession #' + professionSelect.val(), false);
            $.ajax('http://home.gibm.ch/interfaces/133/klassen.php', {
                data: {
                    'beruf_id': professionSelect.val()
                },
                dataType: 'json',
                success: function(data) {
                    logAjaxProcess('Sucessfully received ' + data.length + ' classes', true);
                    
                    if (professionSelect.val() !== '-') { // Profession selection hasn't changed during AJAX request
                        // Clear old classes
                        classSelect.find('option[value != "-"]').remove();
                        
                        // Add new classes
                        $.each(data, function(index, item) {
                            classSelect.append('<option value="' + item.klasse_id + '">' + item.klasse_name + '</option>');
                        });
                        
                        // Fade in class selection
                        classSelection.stop().fadeIn();


                        // Use saved class
                        var savedClassId = localStorage.getItem("classId");
                        if (savedClassId && classSelect.find("option[value='" + savedClassId + "']").length) {
                            logStorageProcess("Using the saved class #" + savedClassId);

                            classSelect.val(savedClassId);
                            classSelect.trigger('change');
                        }
                    }
                },
                error: function(xhr, status, error) {
                    // TODO: Handle error
                    logAjaxError('Failed to receive classes', xhr, status, error);
                }
            });
        }
        else {
            // TODO: Something
            // Do not show results
            classSelection.fadeOut();
        }
    });
    
    classSelect.change(function () {
        // Save selected class
        localStorage.setItem('classId', classSelect.val());
        logStorageProcess("Saved the selection of class #" + classSelect.val());


        if (classSelect.val() !== '') {
            timetableContainer.fadeOut();
            // TODO: Show loading animation
            
            // TODO: Use real week
            var week = '37-2014';
            logAjaxProcess('Requesting lessons for class #' + classSelect.val() + ' in week ' + week, false);
            $.ajax('http://home.gibm.ch/interfaces/133/tafel.php', {
                data: {
                    'klasse_id': classSelect.val(),
                    'woche': week
                },
                dataType: 'json',
                success: function(data) {
                    logAjaxProcess('Sucessfully received ' + data.length + ' lessons', true);
                    
                    if (classSelect.val() !== '-') { // Class selection hasn't changed during AJAX request
                        // Clear old lessons
                        timetable.empty();
                        
                        // Add new lessons
                        if (data && data.length) {
                            $.each(data, function(index, item) {
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
                error: function(xhr, status, error) {
                    // TODO: Handle error
                    logAjaxError('Failed to receive lessons', xhr, status, error);
                }
            });
        }
        else {
            // TODO: Something
            // Do not show results
            timetableContainer.fadeOut();
        }
    });
    
    // Helpers
    function getDayOfWeek(dayIndex) {
        return ["Mon.", "Tue.", "Wed.", "Thu.", "Fri.", "Sat.", "Sun."][dayIndex];
    }
    
    function formatTime(timeString) {
        // Provided string is in format hh:MM:ss.
        // Return the first 5 chars (hh:MM).

        if (timeString.length >= 5) {
            return timeString.substr(0, 5);
        }

        return timeString;
    }
    
    
    function logAjaxProcess(message, isResponse) {
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
