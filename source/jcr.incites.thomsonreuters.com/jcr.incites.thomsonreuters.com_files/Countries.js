Ext.define('JCR.store.filterPanel.Countries', {
    extend: 'Ext.data.Store',
    requires: 'JCR.model.filterPanel.Countries',
    model: 'JCR.model.filterPanel.Countries',
    autoLoad: false,
    proxy: {
        type: 'ajax',
        url: 'SearchJournalCountryJson.action',
        reader: {
            type: 'json',
            root: 'data'
        }
    }
});