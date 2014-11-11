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
    assert.strictEqual(getLessons(13.37), null, "13.37, undefined, undefined is null");
    assert.strictEqual(getLessons("abc"), null, "'abc', undefined, undefined is null");
	assert.strictEqual(getLessons(), null, "undefined, undefined, undefined is null");
    assert.strictEqual(getLessons(null), null, "null, undefined, undefined is null");    
	assert.notStrictEqual(getLessons(classId), null, classId + ", undefined, undefined is not null");
	
	var week = 45;
	assert.strictEqual(getLessons(classId, 13.37), null, classId + ", 13.37, undefined is null");
	assert.strictEqual(getLessons(classId, "abc"), null, classId + ", 'abc', undefined is null");
	assert.notStrictEqual(getLessons(classId), null, classId + ", undefined, undefined is not null");
	assert.notStrictEqual(getLessons(classId, null), null, classId + ", null, undefined is not null");
	assert.strictEqual(getLessons(classId, week), null, classId + ", " + week + ", undefined is null");
	assert.strictEqual(getLessons(classId, week, null), null, classId + ", " + week + ", undefined is null");
	
	var year = 2014;
	assert.strictEqual(getLessons(classId, week, 13.37), null, classId + ", " + week + ", 13.37 is null");
	assert.strictEqual(getLessons(classId, week, "abc"), null, classId + ", " + week + ", 'abc' is null");
	assert.strictEqual(getLessons(classId, week), null, classId + ", " + week + ", undefined is null");
	assert.strictEqual(getLessons(classId, week, null), null, classId + ", " + week + ", null is null");
	assert.notStrictEqual(getLessons(classId, week, year), null, classId + ", " + week + ", " + year + " is not null");
	assert.strictEqual(getLessons(classId, null, year), null, classId + ", null, " + year + " is null");
});


QUnit.asyncTest( "Get lessons for class #2467010", function(assert) {
    apiTimeout = 10 * 1000;
    
    var classId = 2467010; // "IAP 14-18 B"
    getLessons(classId)
        .success(function (data) {
		  // No minimum amount of lessons (holidays etc.)
          assert.ok(data.length <= 100, "At most 100 (" + data.length + ") lessons were received for class #" + classId);		  
        })
        .error(function (xhr, status, error) {
          assert.ok(false, "Failed to retrieve lessons for class #" + classId + " (" + status + "): " + xhr.responseText);
        })
        .always(function () {
          start();
        });
});

QUnit.asyncTest( "Get lessons for class #2467098 in week 45-2014", function(assert) {
    apiTimeout = 10 * 1000;
    
    var classId = 2467098; // "MA 14-17 B"
	var week = 45;
	var year = 2014;
    getLessons(classId, week, year)
        .success(function (data) {
          assert.strictEqual(data.length, 3, "3 lessons were received for class #" + classId + " in week " + week + "-" + year);
        })
        .error(function (xhr, status, error) {
          assert.ok(false, "Failed to retrieve lessons for class #" + classId + " in week " + week + "-" + year + " (" + status + "): " + xhr.responseText);
        })
        .always(function () {
          start();
        });
});
