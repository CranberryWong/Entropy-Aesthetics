Ext.define('JCR.store.filterPanel.Publishers', {
    extend: 'Ext.data.Store',
    requires: 'JCR.model.filterPanel.Publishers',
    model: 'JCR.model.filterPanel.Publishers',
    autoLoad: false,
    proxy: {
        type: 'ajax',
        url: 'SearchJournalPublisherJson.action',
        reader: {
            type: 'json',
            root: 'data'
        }
    }
});