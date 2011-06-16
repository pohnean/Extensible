/**
 * @class Ext.ensible.cal.recurrence.DayOfMonthTE
 * This file provides a concrete class for determining dates that occur as a
 * given ordinal day of the month. E.g. 29th May.
 */
Ext.ensible.cal.recurrence.DayOfMonthTE = Ext.extend(Ext.ensible.cal.recurrence.TemporalExpression, {
    dayIndex : null,
    monthIndex : null,
    constructor : function(day, month) {
        this.dayIndex = day;
        this.monthIndex = month - 1; // subtract 1 to form javascript month index (0-11)
    },
    includes : function(aDate) {
        return (this.dayMatches(aDate) && this.monthMatches(aDate));
    },
    dayMatches : function(aDate) {
        return (aDate.getDate() == this.dayIndex);
    },
    monthMatches : function (aDate) {
        return (aDate.getMonth() == this.monthIndex);
    }
});