/**
 * @class Ext.ensible.cal.recurrence.FrequencyTE
 * This file provides a concrete class for determining dates that occur at
 * regular intervals. (Daily, Weekly, Monthly, Yearly, Every 2 Years)
 */
Ext.ensible.cal.recurrence.FrequencyTE = Ext.extend(Ext.ensible.cal.recurrence.TemporalExpression, {
    theDate : null,
    frequency : null,
    interval : null,
    limit: null,
    constructor : function(theDate, frequency, interval, limit) {
        this.theDate = theDate;
        this.frequency = frequency;
        this.interval = interval || 1;
        this.limit = limit || 0; // 0 is infinite number of occurences
    },
    includes : function(aDate) {
        var diff,isWithinLimit;
        
        if (this.theDate > aDate) {
            return false;
        }
        
        switch (this.frequency) {
            case "DAILY":
                // Does it occur on this day?
                diff = Ext.ensible.Date.diffDays(this.theDate, aDate);
                break;
            case "WEEKLY":
                // Does it occur within this week?
                diff = Ext.ensible.Date.diffWeeks(this.theDate, aDate);
                break;
            case "MONTHLY":
                // Does it occur within this month?
                diff = Ext.ensible.Date.diffMonths(this.theDate, aDate);
                break;
            case "YEARLY":
                // Does it occur within this year?
                diff = Ext.ensible.Date.diffYears(this.theDate, aDate);
                break;
        }
        
        if (diff >= 0 && this.interval > 0) {
            if (this.limit > 0) {
                isWithinLimit = ((diff / this.interval) < this.limit);
            } else {
                isWithinLimit = true;
            }
            
            return (diff % this.interval == 0) && isWithinLimit;
        } else {
            return false;
        }  
        
        return this.occursWithinPeriod(aDate) && this.isWithinLimit()
    }
});