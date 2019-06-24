document.cookie = 'jcr.breadCrumb=Home#./JCRJournalHomeAction.action?year=&edition=&journal=', '_parent';
var jcrStorage = {};
var journalInformationTabData = {};
var journalInformationTabCategories = {};
var customMask;
var visualizationFlag = true;

Ext.Loader.setConfig({
    enabled: true,
    disableCaching: false
});
Ext.Ajax.disableCaching = false;

Ext.application({
    name: 'JCR',
    autoCreateViewport: false,
    appFolder: "common/javascript/jcrapp",
    controllers: ['homePage.JournalHome'],
    launch: function () {
        jcrStorage.journalEdition = getParameterByName('edition');
        jcrStorage.journalJcrYear = getParameterByName('year');
        jcrStorage.journalCategories = getParameterByName('categories');
        jcrStorage.categoryName = getParameterByName('categoryName');
        jcrStorage.journalCountries = getParameterByName('country');
        
        var journalsgridHeight = '450px';
        
        if(Ext.util.Cookies.get('jcrvisualization') == 'hide')
        {
        	journalsgridHeight = '946px';
        }
        
        Ext.create('JCR.view.grid.JournalsGrid', {
            renderTo: Ext.get("journalsgrid"),
            height: journalsgridHeight,
            width: '710px',
            viewConfig: {
                listeners: {
                    viewready: function (view) {

                        jcrStorage.journalTotalCount = Ext.getCmp('journalsgrid').getStore().totalCount;
                        var start = jcrStorage.journalPage * 25 + 1;
                        var limit = start + 24;
                        if (jcrStorage.journalTotalCount < 25) {
                            $("#next").addClass("disabled");
                            $("#last").addClass("disabled");
                        } else {
                            $("#next").removeClass("disabled");
                            $("#last").removeClass("disabled");
                        }
                        if (limit < jcrStorage.journalTotalCount) {
                            document.getElementById('dispalyMesage').innerHTML = '<b>' + start + ' - ' + limit + '</b> of ' + jcrStorage.journalTotalCount;

                        } else if (jcrStorage.journalTotalCount == 0) {
                            document.getElementById('dispalyMesage').innerHTML = 'No data to display';
                        } else document.getElementById('dispalyMesage').innerHTML = '<b>' + start + ' - ' + jcrStorage.journalTotalCount + '</b> of ' + jcrStorage.journalTotalCount;
                    }
                }
            }
        });
        Ext.create('Ext.form.field.Display', {
            renderTo: 'categoryName',
            id: 'categoryName',
            value: (jcrStorage.categoryName != undefined && jcrStorage.categoryName != '') ? '<h2 style="width: 960px;">Journals in ' + jcrStorage.categoryName + '</h2>' : ''
        });
        Ext.create('Ext.form.field.Display', {
            renderTo: 'breadScrumb',
            id: 'breadScrumb',
            value: breadScrumb()
        });

        Ext.create('Ext.view.View', {
            renderTo: 'categories',
            width: '200px',
            height: '250px',
            id: 'categorySelectionView',
            autoScroll: true,
            loadMask: false,
            store: 'filterPanel.Categories',
            queryMode: 'remote',
            tpl: new Ext.XTemplate('<tpl for="."><div onClick="checkCategoryDeselected('+"'journals'"+')" class="category-selection" id ="id" style="background-color:white;"><label><input type="checkbox" name={categoryId} value={categoryId} getStatus() ? "checked" : "unchecked" /><span id={categoryId}>{categoryName}</span></label></div></tpl>'),
            itemSelector: 'div.category-selection',
            listeners: {
                beforerender: function () {
                    Ext.getStore('filterPanel.Categories').load({
                        callback: function () {
                            $("#categorySelectionView input[type='checkBox']").each(function () {
                                if ($(this).val() == jcrStorage.journalCategories) {
                                    $(this).prop("checked", true);
                                }
                            });
                         }
                    });
                }
                /*select: function(){
                	if($("#categories").find("input:checked").length == 0)
                    {
                		document.cookie='jcr.journalHomeStickCats=';
                    }
                }*/
            }
        });
        Ext.create('Ext.form.ComboBox', {
            xtype: 'combobox',
            editable: false,
            id: 'jcrYear',
            renderTo: Ext.get("jcrYear"),
            store: 'filterPanel.JCRYear',
            queryMode: 'remote',
            displayField: 'jcrYear',
            valueField: 'jcrYear',
            listeners: {
                beforerender: function () {
                    Ext.getStore('filterPanel.JCRYear').load();
                },
                select: function (combo, selection) {
                    Ext.getCmp('jcrYear').setValue(combo.getValue());
                    var homeEdition;
                    if ($($("[name=Edition]")[0]).attr("checked")) {
                        if ($($("[name=Edition]")[1]).attr("checked")) {
                            homeEdition = 'Both';
                        } else {
                            homeEdition = 'SCIE';
                        }
                    } else if ($($("[name=Edition]")[1]).attr("checked")) {
                        homeEdition = 'SSCI';
                    }
                    var preCategories = [];
                    $("#categories").find("input:checked").each(function () {
                        if (categories != undefined) preCategories.push($(this).val());
                        else preCategories.push($(this).val());
                    });
                    if (Ext.getCmp('categorySelectionView')) {
                        var store = Ext.getCmp('categorySelectionView').getStore();
                        store.load({
                            params: {
                                edition: homeEdition,
                                subjectCategoryScheme: Ext.getCmp('catScheme').getValue(),
                                jcrYear: Ext.getCmp('jcrYear').getValue(),
                                OAFlag: jcrStorage.OAFlag
                            },
                            callback: function () {
                                $("#categorySelectionView input[type='checkBox']").each(function () {
                                    if (preCategories.indexOf($(this).val()) != -1) {
                                        $(this).prop("checked", true);
                                    }
                                });
                            }
                        });
                    }
                }
            }
        });

        Ext.create('JCR.view.home.filterPanel.SearchCombo', {
            store: 'filterPanel.Journals',
            forceSelection: false,
            emptyText: 'Search Journals ',
            queryMode: 'remote',
            displayField: 'journalTitle',
            valueField: 'abbrJournal',
            id: 'journalSearch',
            renderTo: Ext.get("journalSearch")
        });

        Ext.create('JCR.view.home.filterPanel.SelectionCombo', {
            store: 'filterPanel.Journals',
            queryMode: 'local',
            overflowY: 'auto',
            forceSelection: false,
            multiSelect: true,
            prevValues: [],
            height: 217,
            width: 200,
            id: 'journalSelection',
            displayField: 'journalTitle',
            valueField: 'abbrJournal',
            renderTo: Ext.get("journalSelection")
        });

        Ext.create('JCR.view.home.filterPanel.journal.PublisherSearchCombo', {
            store: 'filterPanel.Publishers',
            forceSelection: false,
            emptyText: 'Search Publishers ',
            queryMode: 'remote',
            displayField: 'publisherName',
            valueField: 'publisherName',
            id: 'publisherSearch',
            renderTo: Ext.get("publisherSearch")
        });

        Ext.create('JCR.view.home.filterPanel.SelectionCombo', {
            store: 'filterPanel.Publishers',
            queryMode: 'local',
            overflowY: 'auto',
            forceSelection: false,
            multiSelect: true,
            prevValues: [],
            height: 217,
            width: 200,
            id: 'publisherSelection',
            displayField: 'publisherName',
            valueField: 'publisherName',
            renderTo: Ext.get("publisherSelection")
        });

        Ext.create('JCR.view.home.filterPanel.journal.CountrySearchCombo', {
            store: 'filterPanel.Countries',
            forceSelection: false,
            emptyText: 'Search Countries/Regions',
            queryMode: 'remote',
            displayField: 'countryName',
            valueField: 'countryId',
            id: 'countrySearch',
            width: 200,
            renderTo: Ext.get("countrySearch")
        });

        Ext.create('JCR.view.home.filterPanel.SelectionCombo', {
            store: 'filterPanel.Countries',
            queryMode: 'local',
            overflowY: 'auto',
            forceSelection: false,
            multiSelect: true,
            prevValues: [],
            height: 217,
            width: 200,
            id: 'countrySelection',
            displayField: 'countryName',
            valueField: 'countryId',
            renderTo: Ext.get("countrySelection")
        });

        Ext.create('Ext.form.ComboBox', {
            editable: false,
            width: '80px',
            height: '22px',
            id: 'rangeFrom',
            store: 'filterPanel.RangeFrom',
            queryMode: 'local',
            displayField: 'display',
            valueField: 'value',
            renderTo: Ext.get("rangeFrom"),
            listeners: {
                select: function (combo, selection) {
                    Ext.getCmp('rangeFrom').setValue(combo.getValue());
                }
            }
        });

        Ext.create('Ext.form.ComboBox', {
            editable: false,
            width: '80px',
            height: '22px',
            id: 'rangeTo',
            store: 'filterPanel.RangeTo',
            queryMode: 'local',
            displayField: 'display',
            valueField: 'value',
            renderTo: Ext.get("rangeTo"),
            listeners: {
                select: function (combo, selection) {
                    Ext.getCmp('rangeTo').setValue(combo.getValue());
                }
            }
        });
        
         Ext.create('Ext.form.ComboBox', {
            editable: false,
            width: '80px',
            height: '22px',
            id: 'jifPercentileRangeFrom',
            store: 'filterPanel.JIFPercentileRangeFrom',
            queryMode: 'local',
            displayField: 'display',
            valueField: 'value',
            renderTo: Ext.get("jifPercentileRangeFrom"),
            listeners: {
                select: function (combo, selection) {
                    Ext.getCmp('jifPercentileRangeFrom').setValue(combo.getValue());
                }
            }
        });

        Ext.create('Ext.form.ComboBox', {
            editable: false,
            width: '80px',
            height: '22px',
            id: 'jifPercentileRangeTo',
            store: 'filterPanel.JIFPercentileRangeTo',
            queryMode: 'local',
            displayField: 'display',
            valueField: 'value',
            renderTo: Ext.get("jifPercentileRangeTo"),
            listeners: {
                select: function (combo, selection) {
                    Ext.getCmp('jifPercentileRangeTo').setValue(combo.getValue());
                }
            }
        });

        Ext.create('Ext.form.ComboBox', {
            xtype: 'combobox',
            editable: false,
            id: 'catScheme',
            renderTo: Ext.get("catScheme"),
            store: 'filterPanel.CategoryScheme',
            queryMode: 'local',
            displayField: 'display',
            valueField: 'id',
            value: 'WoS',
            listeners: {

                select: function (combo, selection) {
                    Ext.getCmp('catScheme').setValue(combo.getValue());
                    if (Ext.getCmp('categorySelectionView')) {
                        var preCategories = [];
                        $("#categories").find("input:checked").each(function () {
                            if (categories != undefined) preCategories.push($(this).val());
                            else preCategories.push($(this).val());
                        });
                        var store = Ext.getCmp('categorySelectionView').getStore();

                        store.load({
                            params: {
                                //edition : Ext.getCmp('edition').getValue(),
                                jcrYear: Ext.getCmp('jcrYear').getValue(),
                                subjectCategoryScheme: Ext.getCmp('catScheme').getValue()
                            },
                            callback: function () {
                                $("#categorySelectionView input[type='checkBox']").each(function () {
                                    if (preCategories.indexOf($(this).val()) != -1) {
                                        $(this).prop("checked", true);
                                    }
                                });
                            }
                        });
                    }
                }
            }
        });

        if (jcrStorage.journalCountries) {
            Ext.getCmp('countrySelection').setValue(jcrStorage.journalCountries);
        }

        Ext.create('Ext.form.ComboBox', {
            xtype: 'combo',
            id: 'search',
            renderTo: 'mastersearchjournal',
            enableKeyEvents: true,
            store: Ext.create('JCR.store.filterPanel.Journals', {
                storeId: 'masterSearch',
                proxy: {
                    type: 'ajax',
                    url: 'SearchJournalsJson.action',
                    headers: {
                         'Content-Type': 'application/json'
                    },
                    timeout: '120000',
                    reader: {
                        type: 'json',
                        root: 'data'
                    }


                },
                listeners: {
                    refresh: function () {
                        if (jcrStorage.enterPressed) {

                            jcrStorage.enterPressed = false;

                            /*Checking whether the store count is greater than 1 if it is true navigating the page to search landing*/
                            if (Ext.getStore('masterSearch').getProxy().getReader().rawData.totalCount > 1) {
                                document.cookie = "jcr.searchString=" + jcrStorage.UrlSearchString;
                                var query = Ext.util.Cookies.get('jcr.searchString');
                                document.cookie = 'jcr.breadCrumb='+Ext.util.Cookies.get('jcr.breadCrumb')+'##Master Search('+query+')#./JCRMasterSearchAction.action?pg=SEARCH&searchString='+query;
                                window.open('./JCRMasterSearchAction.action?pg=SEARCH&searchString=' + query, "_self");
                            }
                            /*checking whether store count is equal to 1 if it is true navigating the page to journal profile*/
                            else if (Ext.getStore('masterSearch').getProxy().getReader().rawData.totalCount == 1) {
                                jcrStorage.abbrJournal = Ext.getStore('masterSearch').getAt(0).data.abbrJournal;
                                jcrStorage.journalEdition = Ext.getStore('masterSearch').getAt(0).data.edition;
                                jcrStorage.journalTitle = Ext.getStore('masterSearch').getAt(0).data.journalTitle;
                                jcrStorage.journalEdition = jcrStorage.journalEdition;
                                var max = Math.max.apply(Math, Ext.getStore('masterSearch').getAt(0).data.jcrCoverageYears);
                                jcrStorage.journalJcrYear = max;
                                Ext.Ajax.request({
                                    url: 'JournalInformationDataJson.action',
                                    params: {
                                        abbrJournal: jcrStorage.abbrJournal,
                                        edition: jcrStorage.journalEdition,
                                        jcrYear: jcrStorage.journalJcrYear
                                    },
                                    headers: {
                                        'Content-Type': 'application/json'
                                    },
                                    timeout: 120000,
                                    method: 'GET',
                                    success: function (response) {
                                        var json = Ext.decode(response.responseText);
                                        try {
                                            var data = json.data;
                                            jcrStorage.issn = data[0].issn;
                                        } catch (e) {
                                            document.cookie = "jcr.searchString=" + encodeURIComponent(jcrStorage.journalTitle);
                                            var query = Ext.util.Cookies.get('jcr.searchString');
                                            document.cookie = 'jcr.breadCrumb='+Ext.util.Cookies.get('jcr.breadCrumb')+'##Master Search('+query+')#./JCRMasterSearchAction.action?pg=SEARCH&searchString='+query;
                                            window.open('./JCRMasterSearchAction.action?pg=SEARCH&searchString=' + query, "_self");
                                            return;
                                        }
                                        Ext.Ajax.request({
                                            url: 'SearchJournalsByIssnJson.action',
                                            params: {
                                                issn: jcrStorage.issn,
                                                edition: jcrStorage.journalEdition,
                                                jcrYear: jcrStorage.journalJcrYear
                                            },
                                            headers: {
                                                'Content-Type': 'application/json'
                                            },
                                            timeout: 120000,
                                            method: 'GET',
                                            success: function (response) {
                                                var json = Ext.decode(response.responseText);
                                                var data = json.data;
                                                
                                                if (data.length == 1){
                    	                            jcrStorage.abbrJournal = data[0].abbrJournal;
                    	                            jcrStorage.journalTitle = data[0].journalTitle;
                    	                            jcrStorage.journalImpactFactor = data[0].impactFactor;
                    	                        }
                                                else
        										{
        											if(jcrStorage.abbrJournal == data[0].abbrJournal)
        											{
        												 jcrStorage.journalImpactFactor = data[0].impactFactor;
        											}
        											else{
        												if(data[1].hasImpactFactor)
        													{
        														jcrStorage.journalImpactFactor = data[1].impactFactor;
        													}
        											}
        										}
                                                document.cookie = 'jcr.breadCrumb='+Ext.util.Cookies.get('jcr.breadCrumb')+'##Journal Profile('+jcrStorage.abbrJournal+')#./JCRJournalProfileAction.action?pg=JRNLPROF&journalImpactFactor=' + jcrStorage.journalImpactFactor + '&year=' + jcrStorage.journalJcrYear + '&journalTitle=' + encodeURIComponent(jcrStorage.journalTitle) + '&edition=' + jcrStorage.journalEdition + '&journal=' + encodeURIComponent(jcrStorage.abbrJournal);
                                                if(jcrStorage.journalJcrYear<2017)
                        						{
                        							window.open('./JCRJournalProfileAction.action?pg=JRNLPROF&journalImpactFactor='+jcrStorage.journalImpactFactor+'&year='+jcrStorage.journalJcrYear+'&journalTitle='+encodeURIComponent(jcrStorage.fullJournalTitle)+'&edition='+jcrStorage.journalEdition+'&journal='+encodeURIComponent(jcrStorage.abbrJournal)+'','_parent');
                        						}
                                                else
                        						{
                                                	var sid = Ext.util.Cookies.get('jcr.jcrSID');
                                                	var jppUrl = Ext.util.Cookies.get('jcr.jcrProfilePageUrl');
                            						jppUrl = jppUrl.replace("[JOURNAL]", encodeURIComponent(jcrStorage.abbrJournal));
                            						jppUrl = jppUrl.replace("[YEAR]", jcrStorage.journalJcrYear);
                            						jppUrl = jppUrl.replace("[EDITIONS]", jcrStorage.journalEdition);
                            						jppUrl = jppUrl.replace("[PSSID]", sid);
                            						window.open('http://' + jppUrl); 
                        						}
                                            }
                                        });
                                    }
                                });
                            }
                            /*if the count of the store is zero we are showing an alert*/
                            else if (Ext.getStore('masterSearch').getProxy().getReader().rawData.totalCount == 0) {
                                if (customMask) {
                                    customMask.hide();
                                }
                            }
                        }
                    }
                }
            }),

            width: 160,
            queryMode: 'remote',
            queryParam: 'query',
            valueField: 'abbrJournal',
            emptyText: 'Master Search',
            displayField: 'journalTitle',

            minChars: 1,
            typeAhead: false,
            autoSelect: false,
            hideTrigger: true,
            enableKeyEvents: true,

            listConfig: {
                emptyText: 'No results found',
                getInnerTpl: function () {
                    return '<a href = "#">{journalTitle}</a>';
                },
                listeners: {
                    highlightitem: function (view) {
                        jcrStorage.itemHighlighted = true;
                    }
                }
            },

            listeners: {

                keyup: function (combo, e, eOpts) {
                	var text = Ext.getCmp('search').getValue();
                	var regex = new RegExp("^[a-zA-Z0-9-& ]+$");
                    if (regex.test(text)) {
                    	jcrStorage.UrlSearchString = encodeURIComponent(text);
                    }
                },
                afterrender: function (combo, eOpts) {
                    combo.getStore().clearData();
                },
                /*if the combo is collapsed we are setting the itemhighlighted variable to false*/
                collapse: function () {
                    jcrStorage.itemHighlighted = false;
                },
                /*the select function handles both the enter press event from the keyboard and mouse click and navigates the page to journal profile*/
                select: function (combo, records, eOpts) {
                    jcrStorage.enterPressed = false;
                    if (customMask) {
                        customMask.show();
                    }
                    /*Checking whether the store count is greater than 1 if it is true navigating the page to search landing*/
                    if (Ext.getStore('masterSearch').getProxy().getReader().rawData.totalCount == 0) {
                        document.cookie = "jcr.searchString=" + jcrStorage.UrlSearchString;
                        var query = Ext.util.Cookies.get('jcr.searchString');

                        document.cookie = 'jcr.breadCrumb='+Ext.util.Cookies.get('jcr.breadCrumb')+'##Master Search('+query+')#./JCRMasterSearchAction.action?pg=SEARCH&searchString='+query;
                        window.open('./JCRMasterSearchAction.action?pg=SEARCH&searchString=' + query, "_self");
                    } else {
                        jcrStorage.abbrJournal = records[0].getData().abbrJournal;
                        jcrStorage.journalEdition = records[0].getData().edition;
                        jcrStorage.journalTitle = records[0].getData().journalTitle;
                        jcrStorage.journalEdition = jcrStorage.journalEdition;
                        if(Ext.getStore('masterSearch').getProxy().getReader().rawData.totalCount == 1)
                        {
                        	var max = Math.max.apply(Math, records[0].getData().jcrCoverageYears);
                        	jcrStorage.journalJcrYear = max;
                        }
                        else
                        {
                        	jcrStorage.journalJcrYear = jcrStorage.latestJcrYear;
                        }
                        	
                        Ext.Ajax.request({
                            url: 'JournalInformationDataJson.action',
                            params: {
                                abbrJournal: jcrStorage.abbrJournal,
                                edition: jcrStorage.journalEdition,
                                jcrYear: jcrStorage.journalJcrYear
                            },
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            timeout: 120000,
                            method: 'GET',
                            success: function (response) {
                                var json = Ext.decode(response.responseText);
                                try {
                                    var data = json.data;
                                    jcrStorage.issn = data[0].issn;
                                } catch (e) {
                                    document.cookie = "jcr.searchString=" + encodeURIComponent(jcrStorage.journalTitle);
                                    var query = Ext.util.Cookies.get('jcr.searchString');

                                    document.cookie = 'jcr.breadCrumb='+Ext.util.Cookies.get('jcr.breadCrumb')+'##Master Search('+query+')#./JCRMasterSearchAction.action?pg=SEARCH&searchString='+query;
                                    window.open('./JCRMasterSearchAction.action?pg=SEARCH&searchString=' + query, "_self");
                                    return;
                                }
                                Ext.Ajax.request({
                                    url: 'SearchJournalsByIssnJson.action',
                                    params: {
                                        issn: jcrStorage.issn,
                                        edition: jcrStorage.journalEdition,
                                        jcrYear: jcrStorage.journalJcrYear
                                    },
                                    headers: {
                                        'Content-Type': 'application/json'
                                    },
                                    timeout: 120000,
                                    method: 'GET',
                                    success: function (response) {
                                        var json = Ext.decode(response.responseText);
                                        var data = json.data;
                                        if (data.length == 1){
            	                            jcrStorage.abbrJournal = data[0].abbrJournal;
            	                            jcrStorage.journalTitle = data[0].journalTitle;
            	                            jcrStorage.journalImpactFactor = data[0].impactFactor;
            	                        }
                                        else
										{
											if(jcrStorage.abbrJournal == data[0].abbrJournal)
											{
												 jcrStorage.journalImpactFactor = data[0].impactFactor;
											}
											else{
												if(data[1].hasImpactFactor)
													{
														jcrStorage.journalImpactFactor = data[1].impactFactor;
													}
											}
										}
                                        document.cookie = 'jcr.breadCrumb='+Ext.util.Cookies.get('jcr.breadCrumb')+'##Journal Profile('+jcrStorage.abbrJournal+')#./JCRJournalProfileAction.action?pg=JRNLPROF&journalImpactFactor=' + jcrStorage.journalImpactFactor + '&year=' + jcrStorage.journalJcrYear + '&journalTitle=' + encodeURIComponent(jcrStorage.journalTitle) + '&edition=' + jcrStorage.journalEdition + '&journal=' + encodeURIComponent(jcrStorage.abbrJournal);
                                        if(jcrStorage.journalJcrYear<2017)
                						{
                							window.open('./JCRJournalProfileAction.action?pg=JRNLPROF&journalImpactFactor='+jcrStorage.journalImpactFactor+'&year='+jcrStorage.journalJcrYear+'&journalTitle='+encodeURIComponent(jcrStorage.fullJournalTitle)+'&edition='+jcrStorage.journalEdition+'&journal='+encodeURIComponent(jcrStorage.abbrJournal)+'','_parent');
                						}
                                        else
                						{
                                        	var sid = Ext.util.Cookies.get('jcr.jcrSID');
                                        	var jppUrl = Ext.util.Cookies.get('jcr.jcrProfilePageUrl');
                    						jppUrl = jppUrl.replace("[JOURNAL]", encodeURIComponent(jcrStorage.abbrJournal));
                    						jppUrl = jppUrl.replace("[YEAR]", jcrStorage.journalJcrYear);
                    						jppUrl = jppUrl.replace("[EDITIONS]", jcrStorage.journalEdition);
                    						jppUrl = jppUrl.replace("[PSSID]", sid);
                    						window.open('http://' + jppUrl); 
                						}
                                    }
                                });
                            }
                        });
                    }
                },
                /*This function handles the enter press event*/
                specialkey: function (combo, e) {
                    if (e.getCharCode() == e.ENTER) {
                        Ext.Ajax.request({
                            url: 'JcrlogEvent.action',
                            params: {
                                type: 'jcr_activity_submit'
                            }
                        });
                        if (customMask) {
                            customMask.show();
                        }
                        jcrStorage.enterPressed = true;
                        /*Checking whether the item in the combo is highlighted r not and checking whether the store is loaded */
                        if (!(jcrStorage.itemHighlighted) && (!combo.getStore().isLoading())) {
                            combo.getStore().fireEvent("refresh"); //calling the refresh event
                        }
                    }
                },
                beforequery: function (queryEvent){
                	Ext.Ajax.abortAll();
                	return true;
                }
            }
        });
        
        if (location.hash == "#journalHome") {
            var journalList = Ext.util.Cookies.get('journalList');
            if (Ext.getCmp('journalSelection')) {
                Ext.getCmp('journalSelection').setValue(journalList);
                Ext.getCmp('journalSelection').prevValues = Ext.getCmp('journalSelection').getValue();
            }

            jcrStorage.journalEdition = '';
            jcrStorage.journalJcrYear = '';
            jcrStorage.journalCategories = '';
            jcrStorage.journalName = journalList.split(",").join("','");
            Ext.getCmp('journalsgrid').getStore().clearData();
            Ext.getCmp('journalsgrid').getStore().load({
                params: {
                    edition: '',
                    jcrYear: '',
                    categoryIds: '',
                    abbrJournal: jcrStorage.journalName,
                    publisherName: '',
                    countryName: '',
                    subjectCategoryScheme: '',
                    jifQuartile: '',
                    impactFactorRangeFrom: '',
                    averageJifPercentileRangeFrom: '',
                    averageJifPercentileRangeTo: '',
                    impactFactorRangeTo: '',
                    OAFlag: ''
                },
                callback: function () {
                    jcrStorage.journalTotalCount = this.totalCount;
                    if (jcrStorage.journalTotalCount <= 500){
                    	$('#deselectAll').hide();
                    	$('#selectAll').show();
                    } else {
                    	$('#selectAll').hide();
                    }
                    
                    if (jcrStorage.journalTotalCount < 25) {
                        $("#first").addClass("disabled");
                        $("#prev").addClass("disabled");
                        $("#next").addClass("disabled");
                        $("#last").addClass("disabled");
                        if (jcrStorage.journalTotalCount != 0) $('#dispalyMesage').html('<b>1 - ' + jcrStorage.journalTotalCount + '</b> of ' + jcrStorage.journalTotalCount);
                        else $('#dispalyMesage').html('No data to display');
                    } else {
                        $("#first").addClass("disabled");
                        $("#prev").addClass("disabled");
                        $("#next").removeClass("disabled");
                        $("#last").removeClass("disabled");
                        $('#dispalyMesage').html('<b>1 - 25</b> of ' + jcrStorage.journalTotalCount);
                    }
                }
            });
        }
    }
});
var buttonTemplate = [
    '<div id="{id}-btnWrap" class="{baseCls}-wrap',
    '<tpl if="splitCls"> {splitCls}</tpl>',
    '{childElCls}" unselectable="on">',
    '<span id="{id}-btnEl" class="{baseCls}-button" role="button" hidefocus="on" unselectable="on"',
    '<tpl if="tabIndex != null>',
    ' tabIndex="{tabIndex}"',
    '</tpl>',
    '>',
    '<span id="{id}-btnInnerEl" class="{baseCls}-inner {innerCls}',
    '{childElCls}" unselectable="on">',
    '{text}',
    '</span>',
    '<span role="img" id="{id}-btnIconEl" class="{baseCls}-icon-el {iconCls}',
    '{childElCls} {glyphCls}" unselectable="on" style="',
    '<tpl if="iconUrl">background-image:url({iconUrl});</tpl>',
    '<tpl if="glyph && glyphFontFamily">font-family:{glyphFontFamily};</tpl>">',
    '<tpl if="glyph">&#{glyph};</tpl><tpl if="iconCls || iconUrl">&#160;</tpl>',
    '</span>',
    '</span>',
    '</div>',
    '<tpl if="closable">',
    '<a id="{id}-closeEl" class="{baseCls}-close-btn" title="{closeText}" href="#"></a>',
    '</tpl>'];

if (!Ext.isIE) {

    buttonTemplate = [
        '<span id="{id}-btnWrap" class="{baseCls}-wrap',
        '<tpl if="splitCls"> {splitCls}</tpl>',
        '{childElCls}" unselectable="on" alt="{text} button">',
    /*Added By VSC for ADA compliance*/
        '<input type="button" id="{id}-btnEl" class="jcr-button {baseCls}-inner {innerCls}',
        '{childElCls}" role="button" hidefocus="on" unselectable="on"',
        'value="{text}" alt="{text} button"/>',
    /*Ends Here*/
        '<span id="{id}-btnInnerEl" class="{baseCls}-inner {innerCls}',
        '{childElCls}" unselectable="on" alt="{text} button">',
        '</span>',
        '<span role="button" id="{id}-btnIconEl" class="{baseCls}-icon-el {iconCls}',
        '{childElCls} {glyphCls}" unselectable="on" style="',
        '<tpl if="iconUrl">background-image:url({iconUrl});</tpl>',
        '<tpl if="glyph && glyphFontFamily">font-family:{glyphFontFamily};</tpl>">',
        '<tpl if="glyph">&#{glyph};</tpl><tpl if="iconCls || iconUrl">&#160;</tpl>',
        '</span>',
        '</span>',
        '</span>',
        '<tpl if="closable">',
        '<span id="{id}-closeEl" class="{baseCls}-close-btn" title="{closeText}" tabIndex="0"alt="{text}',
        ' button">{text}</span>',
        '</tpl>'];
}

function retrieveArticlesJIFDenomHome(abbrJournalTemp, jcrYear, edition, fullTitle)
{
	var abbrJournal = abbrJournalTemp;
	var jcrYearTemp = jcrYear;
	var jcrFullTitle = fullTitle;
	var journalEdition = edition;
	var maxCap = Ext.util.Cookies.get('jcr.maxCapYearJCRtoWoS');
	var minCap = Ext.util.Cookies.get('jcr.minCapYearJCRtoWoS');//Implement if we back fill data to 1999.
	if(jcrYearTemp >= maxCap)
		{
			document.cookie = 'jcr.breadCrumb='+Ext.util.Cookies.get('jcr.breadCrumb')+'##Recent Items#./JCRHomePageAction.action?pg=DOCLIST&year='+jcrYearTemp+'&edition='+journalEdition+'&journal='+encodeURIComponent(abbrJournal)+'&journalTitle='+encodeURIComponent(jcrFullTitle)+'','_parent';
			window.open('./JCRJIFDenomAction.action?pg=DOCLISTJIFDENOM&year='+jcrYearTemp+'&edition='+journalEdition+'&journal='+encodeURIComponent(abbrJournal)+'&journalTitle='+encodeURIComponent(jcrFullTitle)+'','_parent');
		} 
	else
		{
			alert("No data found");
		}
	/*var abbrJournal = Ext.util.Cookies.get('jcr.abbrJournal');
	var maxCap = Ext.util.Cookies.get('jcr.maxCapYearJCRtoWoS');
	//var minCap = Ext.util.Cookies.get('jcr.minCapYearJCRtoWoS');//Implement if we back fill data to 1999. 
	var jcrYearTemp = jcrYear;
	
	Ext.Ajax.request({
        url: 'RetrieveUTsJCRtoWOSPost.action?',
        async: false,
        method: 'GET',
        params: {
            abbrJournal: jcrStorage.abbrJournal,
            jcrYear: jcrYearTemp
        },
        headers: {
            'Content-Type': 'application/json'
        },
        success: function (response) {
					var tempJsonObject = JSON.parse(response.responseText);
					var hasSub = tempJsonObject.data.isSubbed;
					if(hasSub)
						{
							var stringUTs = tempJsonObject.data.articleUTsString;
							var stringForeignSID = tempJsonObject.data.foreignSID;
							var baseURL = tempJsonObject.data.urlBase;
							if(stringUTs && jcrYearTemp >= maxCap)
								{
									makePostJCRtoWoS(stringForeignSID, stringUTs, baseURL);
									
								}
							else
								{ 
									alert("No data found");
								}
						}
					else
						{
							window.open('./JCRToWosPostAction.action');
						}
        }
    });*/
}



function makePostJCRtoWoS(foreignSID, articleUTs, url)
{
	 var urlComplete = url + '/WOS_InboundIncitesSearch.do?product=WOS&search_mode=GeneralSearch&SID='+foreignSID+'&service_mode=inboundFromIncites&preferencesSaved=';
	 var winName='MyWindow';
	 var form = document.createElement("form");
	 form.setAttribute("method", "post");
	 form.setAttribute("action", urlComplete);
	 form.setAttribute("target", winName);

	 var params = { 'action' : 'inboundIDsSearch','uts' : articleUTs};
	 for (var i in params) {
		if (params.hasOwnProperty(i)) {
		  var input = document.createElement('input');
		  input.type = 'hidden';
		  input.name = i;
		  input.value = params[i];
		  form.appendChild(input);
		}
	  } 
	 document.body.appendChild(form);
	 
	 window.open('', winName);
	 form.submit();
}
