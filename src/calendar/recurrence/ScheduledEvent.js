/**
 * @class Ext.ensible.cal.recurrence.ScheduledEvent
 * Schedules are collections of events and events have temporal expressions to
 * describe when they occur.
 */
Ext.ensible.cal.recurrence.ScheduledEvent = function() {
    this.startDate = null;
    this.endDate = null;
    
    this.temporalExpression = null;
}

Ext.ensible.cal.recurrence.ScheduledEvent.prototype = {
    isOccuring : function(aDate) {
        return this.temporalExpression.includes(aDate);
    }
}


