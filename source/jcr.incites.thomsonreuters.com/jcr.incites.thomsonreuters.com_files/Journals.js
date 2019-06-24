Ext.define('JCR.store.filterPanel.Journals', {
    extend: 'Ext.data.Store',
    requires: 'JCR.model.filterPanel.Journals',
    model: 'JCR.model.filterPanel.Journals',
    autoLoad: false,
    proxy: {
        type: 'ajax',
        url: 'SearchJournalsJson.action',
        timeout: '120000',
        reader: {
            type: 'json',
            root: 'data',
			totalProperty: 'totalCount'
        }
    }
});