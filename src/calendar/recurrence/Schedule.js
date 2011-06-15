/**
 * @class Ext.ensible.cal.recurrence
 * Library for handling complex recurring events.
 */
Ext.namespace("Ext.ensible.cal.recurrence");

/**
 * @class Ex.ensible.cal.recurrence.Schedule
 * Schedules are collections of events and events have temporal expressions to
 * describe when they occur. 
 */
Ext.ensible.cal.recurrence.Schedule = function(scheduledEvents) {
    this.scheduledEvents = scheduledEvents;
}

Ext.ensible.cal.recurrence.Schedule.prototype = {
    add : function(evt) {
        
    },
    remove : function(evt) {
        
    },
    clear : function() {
        
    },
    count : function() {
        if (this.scheduledEvents != null) {
            return this.scheduledEvents.length;
        }        
    },
    isOccuring : function(evt, aDate) {
        
    },
    eventsForDate : function(aDate) {
        
    },
    dates : function(evt, during) {
        
    },
    nextOccurence : function(evt) {
        
    }
}