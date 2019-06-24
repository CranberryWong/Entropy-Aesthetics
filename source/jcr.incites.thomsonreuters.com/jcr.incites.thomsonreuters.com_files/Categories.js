Ext.define('JCR.store.filterPanel.Categories', {
    extend: 'Ext.data.Store',
    requires: 'JCR.model.filterPanel.Categories',
    model: 'JCR.model.filterPanel.Categories',
        proxy: {
        type: 'ajax',
        url: 'AllCategoriesJson.action',
        timeout: '120000',
        reader: {
            type: 'json',
            root: 'data'
        }
    },

    listeners: {
        beforeload: function (store) {
            if (Ext.getCmp('jcrYear')) store.getProxy().extraParams.jcrYear = Ext.getCmp('jcrYear').getValue();
            else store.getProxy().extraParams.jcrYear = "";
            if (Ext.getCmp('edition')) store.getProxy().extraParams.edition = Ext.getCmp('edition').getValue();
            else store.getProxy().extraParams.edition = "";
            store.getProxy().extraParams.subjectCategoryScheme = "WoS";
        }
    }
});