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
    console.debug('Requesting all professions');
    $.ajax('http://home.gibm.ch/interfaces/133/berufe.php', {
        dataType: 'json',
        success: function(data) {
            console.log('Sucessfully received ' + data.length + ' professions');
            
            // Add professions
            $.each(data, function(index, item) {
            	professionSelect.append('<option value="' + item.beruf_id + '">' + item.beruf_name + '</option>');
            });
            
            // Fade in profession selection
            professionSelection.stop();
            professionSelection.fadeIn();
            
            // TODO: Read saved selection            
        },
        error: function(xhr, status, error) {
            // TODO: Handle error
            logAjaxError('Failed to receive professions', xhr, status, error);
        }
    });
    
    $('#legalTabs a:first').tab('show');
    
    // Handle events
    professionSelect.change(function() {        
        if (professionSelect.val() !== '') {
            classSelection.fadeOut();
            // TODO: Show loading animation
            
            console.debug('Requesting classes for profession #' + professionSelect.val());
            $.ajax('http://home.gibm.ch/interfaces/133/klassen.php', {
                data: {
                    'beruf_id': professionSelect.val()
                },
                dataType: 'json',
                success: function(data) {
                    console.log('Sucessfully received ' + data.length + ' classes');
                    
                    if (professionSelect.val() !== '-') { // Profession selection hasn't changed during AJAX request
                       // Clear old classes
                       classSelect.find('option[value != "-"]').remove();
                       
                       // Add new classes
                       $.each(data, function(index, item) {
                           classSelect.append('<option value="' + item.klasse_id + '">' + item.klasse_name + '</option>');
                       });
                       
                       // Fade in class selection
                       classSelection.stop();
                       classSelection.fadeIn();
                       
                       // TODO: Save selection
                    } 
                },
                error: function(xhr, status, error) {
                    // TODO: Handle error
                    logAjaxError('Failed to receive classes', xhr, status, error);
                }
            });
        }
        else {
            classSelection.fadeOut();
        }
    });
    
    classSelect.change(function() {        
        if (classSelect.val() !== '') {
            console.log(timetable);
            timetableContainer.fadeOut();
            // TODO: Show loading animation
            
            // TODO: Use real week
            var week = '37-2014';
            console.debug('Requesting lessons for class #' + classSelect.val() + ' in week ' + week);            
            $.ajax('http://home.gibm.ch/interfaces/133/tafel.php', {
                data: {
                    'klasse_id': classSelect.val(),
                    'woche': week
                },
                dataType: 'json',
                success: function(data) {
                    console.log('Sucessfully received ' + data.length + ' lessons');
                    
                    if (professionSelect.val() !== '-') { // Profession selection hasn't changed during AJAX request
                       // Clear old lessons
                       timetable.empty();
                       
                       // Add new lessons
                       if (data.length) {
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
                       timetableContainer.stop();
                       timetableContainer.fadeIn();
                    } 
                },
                error: function(xhr, status, error) {
                    // TODO: Handle error
                    logAjaxError('Failed to receive lessons', xhr, status, error);
                }
            });
        }
        else {
            timetableContainer.fadeOut();
        }
    });
    
    // Helpers
    function getDayOfWeek(dayIndex) {
        return ["Mon.", "Tue.", "Wed.", "Thu.", "Fri.", "Sat.", "Sun."][dayIndex];
    }
    
    function formatTime(timeString) {
        // TODO: __
        return timeString;
    }
    
    
    function logAjaxError(message, xhr, status, error) {
        console.error(message + ' (' + status + '): ' + xhr.responseText);
    }
    
});
