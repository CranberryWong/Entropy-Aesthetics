Ext.define('JCR.controller.homePage.JournalHome', {
    extend: 'Ext.app.Controller',
    stores: ['filterPanel.RangeTo','filterPanel.RangeFrom','filterPanel.JIFPercentileRangeTo','filterPanel.JIFPercentileRangeFrom', 
       'filterPanel.Countries','filterPanel.Publishers','filterPanel.CategoryScheme', 'saveAndEditJournals.ExistingList',
       'filterPanel.JCRYear', 'filterPanel.Edition', 'filterPanel.Journals',
       'filterPanel.Categories', 'grids.JournalsGridStore'],

    init: function () {
        this.control({
            'viewport > panel': {
                render: this.onPanelRendered
            },
            'checkboxpopup button[action=save]': {
                click: function () {
                    if (Ext.get('userName').dom.value == null || Ext.get('userName').dom.value == "" || Ext.get('userName').dom.value == " ") {
                        function decision(buttonId) {
                            if (buttonId == "yes") {
                                window.location = "personalize.action";
                            }
                        }
                        Ext.MessageBox.confirm('Login', 'You are not logged-in to perform this action. Do you want to login now?'+'</br></br>', decision);
                    } else {
                        this.savePreference(true);
                    }
                }
            },
            'checkboxpopup button[action=dontSave]': {
                click: function () {
                    this.savePreference(false);
                }
            },
            'journalcheckboxpopup button[action=save]': {
                click: function () {
                    if (Ext.get('userName').dom.value == null || Ext.get('userName').dom.value == "" || Ext.get('userName').dom.value == " ") {
                        function decision(buttonId) {
                            if (buttonId == "yes") {
                                window.location = "personalize.action";
                            }
                        }
                        Ext.MessageBox.confirm('Login', 'You are not logged-in to perform this action. Do you want to login now?'+'</br></br>', decision);
                    } else {
                        this.journalSavePreference(true);
                    }
                }
            },
            'journalcheckboxpopup button[action=dontSave]': {
                click: function () {
                    this.journalSavePreference(false);
                }
            }
        });
    },

    savePreference: function (makeCall) {

        var grid = Ext.getCmp('journalcitationgrid');
        var columns = Ext.getCmp('checkboxgroupcolumns');
        var columnsselected = columns.getChecked();

        Ext.Array.each(grid.columns, function (col, index, all) {
            if (col.dataIndex != 'rank' && col.dataIndex != 'categoryName' && col.dataIndex != 'edition') col.hide();
        });
        Ext.Array.each(columnsselected, function (field, index, all) {
            Ext.Array.each(grid.columns, function (col, index, all) {
                if (col.dataIndex == field.getSubmitValue()) {
                    col.setVisible(true);
                }
            });
        });

        Ext.getCmp('checkboxpopup').close();
        Ext.getCmp('customizegridbutton').enable();

        var columnsInGrid = [];
        var currentColumns = grid.getCurrentColumns();
        Ext.Array.each(currentColumns, function (column, index, all) {

            if (!column.hidden) {
                if (column.dataIndex == 'numberOfJournals') {
                    columnsInGrid.push('journals');
                } else if (column.dataIndex == 'articlesCurrent') {
                    columnsInGrid.push('articles');
                } else {
                    columnsInGrid.push(column.dataIndex);
                }
            }
        });

        var gridColumns = columnsInGrid.join(",");
        Ext.Ajax.request({
            url: 'JcrlogEvent.action?',
            params: {
                type:'jcr_activity_customizeGrid_save'
            }});
            
        Ext.Ajax.request({
                url: 'SaveColumnPreferenceJson.action',
                params: {
                    columnHeaders: gridColumns,
                    type: 'Categories',
					saveInDB: makeCall
                },
                headers: {
                    'Content-Type': 'application/json'
                },
                success: function (response, opts) {},
                failure: function (response, opts) {}
            });
	},

    journalSavePreference: function (makeCall) {
        var grid = Ext.getCmp('journalsgrid');

        var columns = Ext.getCmp('journalcheckboxgroupcolumns');
        var columnsselected = columns.getChecked();
        Ext.Array.each(grid.columns, function (col, index, all) {
            if (col.dataIndex != 'rank' && col.dataIndex != 'journalTitle' && col.dataIndex != '&#160;') col.hide();
        });
        Ext.Array.each(columnsselected, function (field, index, all) {
            Ext.Array.each(grid.columns, function (col, index, all) {
                if (col.dataIndex == field.getSubmitValue()) {

                    col.setVisible(true);

                }
            });
        });

        Ext.getCmp('journalcheckboxpopup').close();
        Ext.getCmp('journalcustomizegridbutton').enable();

        var columnsInGrid = [];
        var currentColumns = grid.getCurrentColumns();
        Ext.Array.each(currentColumns, function (column, index, all) {
            if (!column.hidden) {
                if (column.dataIndex == 'journalTitle') {
                    columnsInGrid.push('fullJournalTitle');
                } else {
                    columnsInGrid.push(column.dataIndex);
                }
            }
        });

        var gridColumns = columnsInGrid.join(",");
		 Ext.Ajax.request({
                url: 'SaveColumnPreferenceJson.action',
                params: {
                    columnHeaders: gridColumns,
                    type: 'Journals',
					saveInDB: makeCall
                },
                headers: {
                    'Content-Type': 'application/json'
                },
                success: function (response, opts) {},
                failure: function (response, opts) {}
            });
    }
});