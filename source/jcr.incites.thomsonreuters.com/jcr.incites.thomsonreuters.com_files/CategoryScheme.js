Ext.define('JCR.store.filterPanel.CategoryScheme', {
    extend: 'Ext.data.Store',
    requires: 'JCR.model.filterPanel.CategoryScheme',
    model: 'JCR.model.filterPanel.CategoryScheme',
    autoLoad: true,
    data: [{
    	'id': 'WoS',
        'display': 'Web of Science'
    }, {
        'id': 'ESI',
        'display': 'Essential Science Indicators'
    }]
});