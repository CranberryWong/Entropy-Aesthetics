Ext.define('JCR.store.filterPanel.JCRYear', {
    extend: 'Ext.data.Store',
    requires: 'JCR.model.filterPanel.JCRYear',
    model: 'JCR.model.filterPanel.JCRYear',
    
    proxy: {
        type: 'ajax',
        url: 'JcrYearListJson.action',
        reader: {
            type: 'json',
            root: 'data'
        }
    },

    listeners: {
        load: function (store, records, successful, eOpts) {
            {
                jcrStorage.latestJcrYear = store.getAt(0).get('jcrYear');
                if (Ext.getCmp('jcrYear')) {
                	if((Ext.util.Cookies.get('jcr.categoryHomeStickJCRYear') != undefined && Ext.util.Cookies.get('jcr.categoryHomeStickJCRYear') != ''
                		&& Ext.util.Cookies.get('jcr.categoryHomeStickJCRYear') != null && Ext.util.Cookies.get('jcr.categoryHomeStickJCRYear') != 'null' ) 
                			&& (jcrStorage.journalJcrYear==undefined || jcrStorage.journalJcrYear=='') && (Ext.get("categoriesGrid") != null))
                    {
                    	var jcrYear = Ext.util.Cookies.get('jcr.categoryHomeStickJCRYear');
                    	Ext.getCmp('jcrYear').setValue(jcrYear);
                    }
                	else if(jcrStorage.journalJcrYear==undefined || jcrStorage.journalJcrYear=='' || jcrStorage.journalJcrYear=='undefined')
                    	Ext.getCmp('jcrYear').setValue(store.getAt(0).get('jcrYear'));
                    else
                    	Ext.getCmp('jcrYear').setValue(jcrStorage.journalJcrYear);
                }
                if (Ext.getCmp('journalJcrYear')) {
                    Ext.getCmp('journalJcrYear').setValue(store.getAt(0).get('jcrYear'));
                }
                if (Ext.getCmp('quartileJcrYear')) { 
                    Ext.getCmp('quartileJcrYear').setValue(store.getAt(0).get('jcrYear'));
                }
            }
        }
    }
});