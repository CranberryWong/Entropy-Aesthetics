Ext.define('JCR.store.filterPanel.Edition', {
    extend: 'Ext.data.Store',
    fields: ['display', 'value'],
    autoLoad: true,
    /*proxy: {
        type: 'ajax',
        url: 'common/javascript/jcrapp/data/filterPanel/edition.json',
        reader: {
            type: 'json',
            root: 'data'
        }
    }*/
	
	 data: [
	{
        'value': 'SCIE',
        'display': 'SCIE'
    },{
        'value': 'SSCI',
        'display': 'SSCI'
    },{
        'value': 'Both',
        'display': 'Both'
	}]
	
});