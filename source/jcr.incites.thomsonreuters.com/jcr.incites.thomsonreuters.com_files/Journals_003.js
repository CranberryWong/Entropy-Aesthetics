Ext.define('JCR.model.filterPanel.Journals', {
    extend: 'Ext.data.Model',
    //fields: ['abbrJournal', 'journalTitle', 'issn', 'edition', 'jcrCoverageYears']
	 fields: [{ name: 'abbrJournal' },
             { name: 'journalTitle', sortType: 'asUCText' },
			   { name: 'issn' },
			   { name: 'eissn'},
			   { name: 'edition' },
			   { name: 'jcrCoverageYears' }
			 ]
});