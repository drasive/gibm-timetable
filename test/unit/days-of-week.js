QUnit.test( "Days of week", function(assert) {
    assert.strictEqual(formatDayOfWeek(0), "Sunday", "0 is Sunday");
    assert.strictEqual(formatDayOfWeek(1), "Monday", "1 is Monday");
    assert.strictEqual(formatDayOfWeek(2), "Tuesday", "2 is Tuesday");
    assert.strictEqual(formatDayOfWeek(3), "Wednesday", "3 is Wednesday");
    assert.strictEqual(formatDayOfWeek(4), "Thursday", "4 is Thursday");
    assert.strictEqual(formatDayOfWeek(5), "Friday", "5 is Friday" );
    assert.strictEqual(formatDayOfWeek(6), "Saturday", "6 is Saturday");
    
    assert.strictEqual(formatDayOfWeek(), null, "null is null");
    assert.strictEqual(formatDayOfWeek(-1), null, "-1 is null");
    assert.strictEqual(formatDayOfWeek(123), null, "123 is null");
    assert.strictEqual(formatDayOfWeek(13.37), null, "13.37 is null");
    assert.strictEqual(formatDayOfWeek("abc"), null, "'abc' is null");
});

function formatDayOfWeek(dayIndex) {
    if (typeof dayIndex !== 'number' || dayIndex === null ||
        dayIndex < 0 || dayIndex > 6) {
        return null;
    }
    
    return ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][dayIndex];
}
