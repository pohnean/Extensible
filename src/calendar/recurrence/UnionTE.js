/**
 * @class Ext.ensible.cal.recurrence.UnionTE
 * A temporal expression whose result is the union of one or more temporal
 * expressions.
 */
Ext.ensible.cal.recurrence.UnionTE = Ext.extend(Ext.ensible.cal.recurrence.TemporalExpression, {
    expressions: null,
    constructor : function(expressions) {
        this.expressions = expressions || [];
    },
    includes : function(aDate) {
        if (this.expressions.length > 0)  {            
            for (var i = 0; i < this.expressions.length; i++) {
                if (this.expressions[i].includes(aDate) == true) {
                    return true;
                }
            }
        }
        return false;
    },
    add : function(expression) {
        this.expressions.push(expression);
    },
    remove : function(expression) {
        var idx = this.expressions.indexOf(expression);
        this.expressions.splice(idx, 1);
    }
});