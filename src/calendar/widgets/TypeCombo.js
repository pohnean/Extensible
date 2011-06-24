/**
 * @class Ext.ensible.cal.TypeCombo
 * @extends Ext.form.ComboBox
 * <p>A custom combo used for choosing from the list of available types to assign an event to. You must
 * pass a populated type store as the store config or the combo will not work.</p>
 * <p>This is pretty much a standard combo that is simply pre-configured for the options needed by the
 * type components. The default configs are as follows:<pre><code>
fieldLabel: 'Type',
triggerAction: 'all',
mode: 'local',
forceSelection: true,
width: 200
</code></pre>
 * @constructor
 * @param {Object} config The config object
 */
Ext.ensible.cal.TypeCombo = Ext.extend(Ext.form.ComboBox, {
    fieldLabel: 'Type',
    triggerAction: 'all',
    mode: 'local',
    forceSelection: true,
    selectOnFocus: true,
    anchor:'100%',
    
    // private
    defaultCls: 'x-cal-default',
    
    // private
    initComponent: function(){
        var C = Ext.ensible.cal;
        
        C.TypeCombo.superclass.initComponent.call(this);
        
        this.valueField = 'Type';
        this.displayField = 'Type';
        this.iconClsField = 'iconCls'
        
        this.store = new Ext.data.SimpleStore({
            id: 'typeStore',
            fields: ['Type', 'iconCls'],
            data: 
            [
            ['', ''],
            ['Meeting', 'x-etype-meeting'],
            ['Business', 'x-etype-business'],
            ['Call', 'x-etype-call'],
            ['Follow up', 'x-etype-followup'],
            ['Travel', 'x-etype-travel'],
            ['Vacation', 'x-etype-vacation'],
            ['Holiday', 'x-etype-holiday'],
            ['Birthday', 'x-etype-bday'],
            ['Anniversary', 'x-etype-anni'],
            ]
        });
        
        this.tpl = this.tpl ||
        '<tpl for="."><div class="x-combo-list-item">'
        + '<table><tbody><tr>'
        + '<td>'
        + '<div class="{' + this.iconClsField + '} x-icon-combo-icon"></div></td>'
        + '<td>{' + this.displayField + '}</td>'
        + '</tr></tbody></table>'
        + '</div></tpl>';
        
        this.on({
            render:{
                scope: this,
                fn: function() {
                    var wrap = this.el.up('div.x-form-field-wrap');
                    this.wrap.applyStyles({
                        position:'relative'
                    });
                    this.el.addClass('x-icon-combo-input');
                    this.icon = Ext.DomHelper.append(wrap, {
                        tag: 'div', 
                        style:'position:absolute'
                    });
                }
            }
        });
    },
    
    setIconCls: function() {
        var rec = this.store.query(this.valueField, this.getValue()).itemAt(0);
        if(rec) {
            this.icon.className = 'x-icon-combo-icon ' + rec.get(this.iconClsField);
        }
    },
    
    // inherited docs
    setValue: function(value) {
        if (value != '' && value != null) {
            Ext.ensible.cal.TypeCombo.superclass.setValue.call(this, value);
        } else {
            this.clearValue();
        }
        this.setIconCls();
    }
});

Ext.reg('extensible.typecombo', Ext.ensible.cal.TypeCombo);