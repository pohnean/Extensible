/**
 * @class Ext.ensible.cal.recurrence.DateUntilTE
 * This file provides a concrete class for determining dates that occurs until
 * a certain date. Every 2 weeks on Thursday, until 25 Aug 2011
 */
Ext.ensible.cal.recurrence.DateUntilTE = Ext.extend(Ext.ensible.cal.recurrence.TemporalExpression, {
    constructor : function() {
        
    },
    includes : function(aDate) {
        throw "Method not implemented.";
    }
});