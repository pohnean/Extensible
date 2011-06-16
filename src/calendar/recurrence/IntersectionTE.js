/**
 * @class Ext.ensible.cal.recurrence.IntersectionTE
 * A temporal expression whose result is the intersection of one or more temporal
 * expressions. (The 'AND' condition)
 */
Ext.ensible.cal.recurrence.IntersectionTE = Ext.extend(Ext.ensible.cal.recurrence.TemporalExpression, {
    expressions: null,
    constructor : function(expressions) {
        this.expressions = expressions || [];
    },
    includes : function(aDate) {
        var included = true;
        
        if (this.expressions.length > 0)  {
            for (var i = 0; i < this.expressions.length; i++) {
                included = included && this.expressions[i].includes(aDate);
            }
        }
        
        return included;
    },
    add : function(expression) {
        this.expressions.push(expression);
    },
    remove : function(expression) {
        var idx = this.expressions.indexOf(expression);
        this.expressions.splice(idx, 1);
    }
});