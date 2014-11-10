module("API");

// ========== getProfessions()
QUnit.asyncTest( "Get all professions", function(assert) {
    apiTimeout = 10 * 1000;
    
    getProfessions()
        .success(function (data) {
          assert.ok(data.length >= 12, "At least 12 (" + data.length + ") professions were received");
          assert.ok(data.length <= 100, "At most 100 (" + data.length + ") professions were received");
        })
        .error(function (xhr, status, error) {
          assert.ok(false, "Failed to retrieve professions (" + status + "): " + xhr.responseText);
        })
        .always(function () {
          start();
        });
});


// ========== getClasses()
QUnit.test( "Get classes general", function(assert) {
    assert.notStrictEqual(getClasses(), null, "undefined is not null");
    assert.notStrictEqual(getClasses(null), null, "null is not null");
    assert.notStrictEqual(getClasses(10), null, "10 is not null");
    
    assert.strictEqual(getClasses(13.37), null, "13.37 is null");
    assert.strictEqual(getClasses("abc"), null, "'abc' is null");
});


QUnit.asyncTest( "Get all classes", function(assert) {
    apiTimeout = 10 * 1000;
    
    getClasses()
        .success(function (data) {
          assert.ok(data.length >= 50, "At least 50 (" + data.length + ") classes were received");
          assert.ok(data.length <= 10000, "At most 10000 (" + data.length + ") classes were received");		  
        })
        .error(function (xhr, status, error) {
          assert.ok(false, "Failed to retrieve classes for profession #" + professionId + " (" + status + "): " + xhr.responseText);
        })
        .always(function () {
          start();
        });
});

QUnit.asyncTest( "Get classes for profession #10", function(assert) {
    apiTimeout = 10 * 1000;
    
    var professionId = 10; // "Informatiker/innen"
    getClasses(professionId)
        .success(function (data) {
          assert.ok(data.length >= 15, "At least 15 (" + data.length + ") classes were received for profession #" + professionId);
          assert.ok(data.length <= 100, "At most 100 (" + data.length + ") classes were received for profession #" + professionId);		  
        })
        .error(function (xhr, status, error) {
          assert.ok(false, "Failed to retrieve classes for profession #" + professionId + " (" + status + "): " + xhr.responseText);
        })
        .always(function () {
          start();
        });
});

QUnit.asyncTest( "Get classes for profession #15", function(assert) {
    apiTimeout = 10 * 1000;
    
    var professionId = 15; // "Metallbauer/innen"
    getClasses(professionId)
        .success(function (data) {
          assert.ok(data.length >= 3, "At least 3 (" + data.length + ") classes were received for profession #" + professionId);
          assert.ok(data.length <= 100, "At most 100 (" + data.length + ") classes were received for profession #" + professionId);		  
        })
        .error(function (xhr, status, error) {
          assert.ok(false, "Failed to retrieve classes for profession #" + professionId + " (" + status + "): " + xhr.responseText);
        })
        .always(function () {
          start();
        });
});


// ========== getLessons()
QUnit.test( "Get lessons general", function(assert) {
    var classId = 2467010; // "IAP 14-18 B"
    assert.strictEqual(getLessons(), null, "undefined is null");
    assert.strictEqual(getLessons(null), null, "null is null");    
    assert.strictEqual(getLessons(13.37), null, "13.37 is null");
    assert.strictEqual(getLessons("abc"), null, "'abc' is null");
	assert.notStrictEqual(getLessons(classId), null, classId + " is not null");
	
	// TODO: __
});


//QUnit.asyncTest( "Get lessons for class #2467010", function(assert) {
//    apiTimeout = 10 * 1000;
//    
//    var classId = 2467010; // "IAP 14-18 B"
//    getLessons(classId)
//        .success(function (data) {
//		  // No minimum amount of lessons (holidays etc.)
//          assert.ok(data.length <= 100, "At most 100 (" + data.length + ") lessons were received for class #" + classId);		  
//        })
//        .error(function (xhr, status, error) {
//          assert.ok(false, "Failed to retrieve lessons for class #" + classId + " (" + status + "): " + xhr.responseText);
//        })
//        .always(function () {
//          start();
//        });
//});
//
//QUnit.asyncTest( "Get lessons for class #10", function(assert) {
//    apiTimeout = 10 * 1000;
//    
//    var classId = 10; // TODO
//	var week = 10;
//	var year = 10;
//    getLessons(classId, week, year)
//        .success(function (data) {
//          assert.ok(data.length >= 15, "At least 15 (" + data.length + ") classes were received for profession #" + professionId);
//          assert.ok(data.length <= 100, "At most 100 (" + data.length + ") classes were received for profession #" + professionId);		  
//        })
//        .error(function (xhr, status, error) {
//          assert.ok(false, "Failed to retrieve lessons for class #" + classId + " in week " + week + " - " + year + " (" + status + "): " + xhr.responseText);
//        })
//        .always(function () {
//          start();
//        });
//});
