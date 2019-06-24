Ext.define('JCR.store.saveAndEditJournals.ExistingList', {
    extend: 'Ext.data.Store',
    requires: 'JCR.model.saveAndEditJournals.ExistingList',
    model: 'JCR.model.saveAndEditJournals.ExistingList',
    proxy: {
        type: 'ajax',
        url: 'RetrieveSavedJournalsJson.action',
        reader: {
            type: 'json',
            root: 'data'
        }
    }
});