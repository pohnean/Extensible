/**
 * @class Ext.ensible.cal.recurrence.DayOfWeekInMonthTE
 * This file provides a concrete class for determining dates that every X number of months as a
 * given ordinal day of the week in the month eg, 1st Monday, 2nd last Tuesday
 */
Ext.ensible.cal.recurrence.DayOfWeekInMonthTE = Ext.extend(Ext.ensible.cal.recurrence.TemporalExpression, {
    dayIndex : null,
    count : null,
    constructor : function(dayIndex, count) {
        this.dayIndex = dayIndex;
        this.count = count;
    },
    includes : function(aDate) {
        return this.dayMatches(aDate) && this.weekMatches(aDate);
    },
    dayMatches : function(aDate) {
        return aDate.getDay() == this.dayIndex ;
    },
    weekMatches : function(aDate) {
        if (this.count > 0) {
            return this.weekFromStartMatches(aDate);
        } else {
            return this.weekFromEndMatches(aDate);
        }
    },
    weekFromStartMatches : function(aDate) {
        return this.getWeekInMonth(aDate.getDate()) == this.count;
    },
    weekFromEndMatches : function(aDate) {
        var daysFromMonthEnd = aDate.getDaysInMonth() - aDate.getDate();
        
        return this.getWeekInMonth(daysFromMonthEnd) == abs(this.count);
    },
    getWeekInMonth : function(dayNumber) {        
        return Math.floor(((dayNumber - 1) / 7) + 1);
    }
});