/**
 * @class Ext.ensible.cal.RecurringEvent
 * This is an wrapper class for the recurring events. 
 * It is responsible for determining and generating individual occurences, 
 * given a set of recurring events.
 */
Ext.ensible.cal.RecurringEvent = function(rec) {
    var M = Ext.ensible.cal.EventMappings;
    
    this.rec = rec;
    
    this.evt = rec.data;
    
    this.startDate = this.evt[M.StartDate.name];
    
    this.endDate = this.evt[M.EndDate.name];
    
    this.rrules = this.parseRecurRule(this.evt[M.RRule.name]);
    
    console.log(this.rrules.FREQ);
};

Ext.ensible.cal.RecurringEvent.RecurFrequency = {
    'DAILY' :  {
        type: Date.DAY,
        factor: 1
    },
    'WEEKLY' :  {
        type: Date.DAY,
        factor: 7
    },
    'MONTHLY' :  {
        type: Date.MONTH,
        factor: 1
    },
    'YEARLY' :  {
        type: Date.YEAR,
        factor: 1
    }
}
   
Ext.ensible.cal.RecurringEvent.prototype = {
    /**
     * Determines the next occurrence of a recurring event.
     * @param {Integer} index an index which defines the current number of occurence, 1 being the first occurence.
     * @return {Object} nextOccurence an event object of the particular occurence
     */
    findOccurence : function(index) {
        var M = Ext.ensible.cal.EventMappings;
        
        // dont return the original occurence, start returning only from first recurrence
        if (index <= 0) {
            return null;
        }
        
        // clone the original record
        var occurence = this.rec.copy(); 
        
        if (this.rrules.COUNT <= index) {
            return null;
        }
        
        // calculate amount of time to add
        var recurFreq = Ext.ensible.cal.RecurringEvent.RecurFrequency[this.rrules.FREQ];
        var interval = (this.rrules.INTERVAL !== undefined) ? this.rrules.INTERVAL : 1;
        var timespan = interval * recurFreq.factor * index;
        
        occurence.data[M.StartDate.name] = occurence.data[M.StartDate.name].add(recurFreq.type, timespan);
        occurence.data[M.EndDate.name] = occurence.data[M.EndDate.name].add(recurFreq.type, timespan);
        
        
        occurence.id = occurence.id + "_" + index;
        
        if (this.rrules.UNTIL < occurence.data[M.EndDate.name]) {
            return null;            
        }
                
        
        console.log(occurence.data.StartDate);
        return occurence;
    },
    
    /**
     * Determines all occurrence of a recurring event between a date range.
     * @return {Array} evts an array of event objects for matching occurences.
     */
    findAllOccurences : function(from, to) {
        var first_index = this.firstVisible(from, to), 
        last_index = this.lastVisible(from, to), 
        occurences = [];
        
        
        if (first_index !== false && last_index !== false) {
            // determine index of first visible occurence
            for (var i = first_index; i <= last_index; i++) {   
                var occurence = this.findOccurence(i);
                
                if (occurence != null) {
                    occurences.push(occurence);
                }
            }
        }
        return occurences;
    },
    
    /**
     * Determines the index of the first visible occurence
     * @param {Date} from the start date
     * @param {Date} to the end date
     * @return {Integer} index
     */
    firstVisible : function(from, to) {
        var dayBefore = from.add(Date.MILLI, -1);
        var n, l = this.lastVisible(null, dayBefore);
                
        if (l != false) {
            n = l + 1;
        } else {
            // if original evnt is within current view
            if (this.startDate > from) {
                n = 0;
            } else {
                // original event is not with current view
                n = false;
            }
        }
        
        return n;
    },
    
    /**
     * Determines the index of the last visible occurence
     * @param {Date} from the start date
     * @param {Date} to the end date
     * @return {Integer} index
     */
    lastVisible : function(from, to) {
        var n, diff, offset, startMonth, endMonth;
        var interval = (typeof this.rrules.INTERVAL == 'undefined') ? 1 : this.rrules.INTERVAL; // default is 1
                        
        switch (this.rrules.FREQ) {
            case "DAILY":
                diff = Ext.ensible.Date.diffDays(this.startDate, to);
                break;
            case "WEEKLY":
                diff = Ext.ensible.Date.diffDays(this.startDate, to) / 7;
                break;
            case "MONTHLY":
//                startMonth = this.startDate.getMonth();
//                endMonth = to.clone().
                diff = Ext.ensible.Date.diffMonths(this.startDate, to);
                break;
            case "YEARLY":
                diff = Ext.ensible.Date.diffYears(this.startDate, to);
                break;
                
        }
        
//        console.log("DIFF: " + diff);
//        console.log("INTERVAL: " + interval);
//        console.log("MOD: " + (diff % interval));
        
        offset = diff % interval;
        n = Math.floor(diff / interval);
        
        if (n < 0) {
            n = false;
        }
            
//        console.log("offset: " + offset);
        console.log("n: " + n);               
        
        return n;
    },
    
    
    /**
     * Parses a recur rule in iCalendar format into a javascript object.
     * @param {String} rrule the iCalendar recurrence rule.
     * @return {Object} rrules the parsed recur rule object
     */
    parseRecurRule : function(rrule) {
        var parsed = [], 
        rules = rrule.split(';');
                
        Ext.each(rules, function(rule) {
            rule = rule.split('=');
            var condition = rule[0];
            var params = rule[1];
            
            // if params list is comma-separated, split it into array
            if (params.indexOf(',') != -1) {
                params = params.split(',');
            } 
            // param is a string, convert it into javascript object wherever possible
            else {
                switch (condition) {
                    case 'UNTIL':
                        params = Date.parseDate(params, "Ymd\\T000000\\Z");
                        break;
                    case 'INTERVAL':
                        params = parseInt(params);
                        break;
                }
            }
            
            parsed[condition] = params;
        }, this);
        
        return parsed;
    }
}