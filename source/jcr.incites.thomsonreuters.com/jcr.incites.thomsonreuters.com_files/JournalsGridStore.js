Ext.define('JCR.store.grids.JournalsGridStore', {
    extend: 'Ext.data.Store',
    model: 'JCR.model.grids.Journals',
    sorters: [{
        property: 'journalImpactFactor',
        direction: 'DESC'
    }],
    buffered: true,
    remoteSort: true,
    pageSize: 100,

    proxy: {
        type: 'ajax',
        url: 'JournalHomeGridJson.action',
        timeout: '120000',
        reader: {
            type: 'json',
            root: 'data',
            totalProperty: 'totalCount'
        }
    },
    
    selModel: {
        pruneRemoved: false
    },

    listeners: {
        beforeload: function (store) {
        	//console.log("jcr storage - "+jcrStorage.journalJIFPercentileRangeFrom);
        	//console.log("store params - " + store.getProxy().extraParams.averageJifPercentileRangeFrom);
            store.getProxy().extraParams.jcrYear = jcrStorage.journalJcrYear;
            store.getProxy().extraParams.edition = jcrStorage.journalEdition;
            if (!jcrStorage.journalJournals == '') {
                store.getProxy().extraParams.abbrJournal = jcrStorage.journalJournals;
           } else if(!jcrStorage.journalName == '') {
               store.getProxy().extraParams.abbrJournal = jcrStorage.journalName;
           }
            store.getProxy().extraParams.categoryIds = jcrStorage.journalCategories;
            store.getProxy().extraParams.publisherName = jcrStorage.journalPublishers;
            store.getProxy().extraParams.countryName = jcrStorage.journalCountries;
            store.getProxy().extraParams.subjectCategoryScheme = jcrStorage.journalCategoryscheme;
            store.getProxy().extraParams.jifQuartile = jcrStorage.journalQuartiles;
            store.getProxy().extraParams.impactFactorRangeFrom = jcrStorage.journalRangeFrom;
            store.getProxy().extraParams.impactFactorRangeTo = jcrStorage.journalRangeTo;
            store.getProxy().extraParams.averageJifPercentileRangeFrom = jcrStorage.journalAverageJifPercentileRangeFrom
            store.getProxy().extraParams.averageJifPercentileRangeTo = jcrStorage.journalAverageJifPercentileRangeTo;
            store.getProxy().extraParams.OAFlag = jcrStorage.OAFlag;
        }
        /*load: function(){
        	if($('#selectAll').is(':hidden') && !($('#deselectAll').is(':hidden')))
        	{
        		unmarkAll();        		
        		markAll();
        	}
        }*/
    }
});