
/*
 * Not currently in use, may or may not be implemented...
 */
Ext.ensible.cal.ContactCombo = Ext.extend(Ext.form.ComboBox, {
    allowBlank: true,
    autoSelect: false,
    forceSelection: true,
    selectOnFocus: true,
    triggerAction: 'all',
    fieldLabel: 'Contacts',
    name: 'Contacts',
    anchor:'100%',
    mode: 'local',
    classField: 'cls',
    styleField: 'style',
    extraItemStyle: 'border-width:2px',
    // private
    initComponent: function(){
        var C = Ext.ensible.cal,
        M = C.ContactMappings;
                
        this.valueField = M.ContactId.name;
        this.displayField = M.ContactName.name;
        
        C.ContactCombo.superclass.initComponent.call(this);
    },
    setValue: function(value) {
        if (value != '' && value != null) {
            Ext.ensible.cal.CalendarCombo.superclass.setValue.call(this, value);
        } else {
            this.clearValue();
        }
    }
});

Ext.reg('extensible.contactcombo', Ext.ensible.cal.ContactCombo);
