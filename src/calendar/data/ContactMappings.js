/**
 * @class Ext.ensible.cal.ContactMappings
 * @extends Object
 * A simple object that provides the field definitions for 
 * {@link Ext.ensible.cal.ContactRecord ContactRecord}s so that they can be easily overridden.
 * 
 */
Ext.ensible.cal.ContactMappings = {
    ContactId:   {name:'ContactId', mapping: 'id', type: 'int'},
    ContactName: {name:'ContactName', mapping: 'name', type: 'string'}
};