Ext.define('JCR.model.grids.Journals', {
    extend: 'Ext.data.Model',
    fields: ['mark', 'rank', 'journalTitle', 'totalCites',
        'journalImpactFactor', 'eigenFactor', 'impactFactorWithoutJournalSelfCites',
        'fiveYearImpactFactor', 'immediacyIndex', 'citableItems',
        'citedHalfLife','citingHalfLife', 'eigenFactorScore', 'articleInfluenceScore',
        'jifQuartile', 'abbrJournal', 'cites', 'articles', 'citesCurrent',
        'articlesCurrent', 'selfCites', 'year', 'edition','impactFactorSelfCites','issn',
        'originalResearch', 'jifPercentile', 'normEigenFactor']
});