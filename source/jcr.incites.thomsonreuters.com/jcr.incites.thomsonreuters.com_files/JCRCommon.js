var JCR_HELP_URLS = {
	    'categoryhomePageHtml':     helpContextURL + 'jcrHomePage.html',
        'categoryProfileHtml':      helpContextURL + 'jcrCategoryProfile.html',

        'categoryCitedHtml':        helpContextURL + 'jcrCategoryProfile/jcrCategoryCited.html',
        'categoryCitingHtml':       helpContextURL + 'jcrCategoryProfile/jcrCategoryCiting.html',
        'categoryInformationHtml':  helpContextURL + 'jcrCategoryProfile/jcrCategoryInformation.html',
        'categoryMetricTrendsHtml': helpContextURL + 'jcrCategoryProfile/jcrCategoryMetricTrends.html',

        'journalProfileHtml':       helpContextURL + 'jcrJournalProfile.html',
        'journalHomePageHtml':      helpContextURL + 'jcrJournalHomePage.html',

        'journalMetricTrendsHtml':  helpContextURL + 'jcrJournalProfile/jcrMetricTrends.html',
        'journalInformationHtml':   helpContextURL + 'jcrJournalProfile/jcrJournalInformation.html',
        'journalRankHtml':          helpContextURL + 'jcrJournalProfile/jcrJournalProfileRank.html',
        'journalBoxPlotHtml':       helpContextURL + 'jcrJournalProfile/jcrJournalProfileBoxPlot.html',
        'journalCitingHtml':        helpContextURL + 'jcrJournalProfile/jcrJournalProfileCitingTab.html',
        'journalEgoNetworkHtml':    helpContextURL + 'jcrJournalProfile/jcrJournalProfileEgoNetwork.html',
        'journalCitedHtml':         helpContextURL + 'jcrJournalProfile/jcrJournalProfileCitedJournal.html',

        'trendComparisonHtml':      helpContextURL + 'jcrTrendComparison.html',
        'quartileComparisonHtml':   helpContextURL + 'jcrQuartileComparison.html',
        'jcrSearchPageHtml':        helpContextURL + 'jcrHomePage/jcrMasterSearch.html',
        'jcrDocumentListHtml':      helpContextURL + 'jcrJournalProfile/jcrJournalInformation/jcrDocumentListPage.html'
};

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

function breadScrumb() {
    var breadScrumbStr, breadCrumbString = Ext.util.Cookies.get('jcr.breadCrumb');
    var bcNavs = [], NmeVal = [], bb = 0;
    if(Ext.util.Cookies.get('jcr.breadCrumb') == null)
	{
    	
		//document.cookie = 'jcr.breadCrumb=Home#./JCRHomePageAction.action?year=&edition=&category=##Journal Rankings#./JCRJournalHomeAction.action?';
		document.cookie = 'jcr.breadCrumb=Home#./JCRJournalHomeAction.action?##Journal Rankings#./JCRJournalHomeAction.action?';

	}
    document.cookie = 'jcr.breadCrumb=' + Ext.util.Cookies.get('jcr.breadCrumb').replace('###', '##');
    breadCrumbString = Ext.util.Cookies.get('jcr.breadCrumb');

    // replaces all duplicate breadcrumbs except the latest one
    if (breadCrumbString.indexOf('Master Search(') != -1
            && breadCrumbString.indexOf('Master Search(') != breadCrumbString.lastIndexOf('Master Search(')) {
        breadCrumbString = breadCrumbString.substring(0, breadCrumbString.indexOf("Master Search("))
            + breadCrumbString.substring(breadCrumbString.lastIndexOf("Master Search("), breadCrumbString.length);
        document.cookie = 'jcr.breadCrumb=' + breadCrumbString;
    }
    if (breadCrumbString.indexOf('Journal Rankings') != -1
            && breadCrumbString.indexOf('Journal Rankings') != breadCrumbString.lastIndexOf('Journal Rankings')) {
        var firstPart = breadCrumbString.substring(0, breadCrumbString.indexOf("Journal Rankings"))
        var secondPart = breadCrumbString.substring(breadCrumbString.indexOf("Journal Rankings"), breadCrumbString.length)
        secondPart = secondPart.substring(secondPart.indexOf("##") + 2, secondPart.length);
        breadCrumbString = firstPart + secondPart;
        document.cookie = 'jcr.breadCrumb=' + breadCrumbString;
    }

    bcNavs = breadCrumbString.split('##');
    for (bb = 0; bb < bcNavs.length; bb++) {
        NmeVal = bcNavs[bb].split('#');

        var bcDisplay = NmeVal[0];
        var bcValue = NmeVal[1];

        // bcDisplayName - Name that displays on screen
        // bcDisplayValue - Value that shows on hover of name
        var bcDisplayName = "",
            bcDisplayValue = "";

        if (bcDisplay.indexOf('Journal Profile') != -1) {
            bcDisplayName = 'Journal Profile';
            bcDisplayValue = bcDisplay.replace('Journal Profile(', 'Journal Profile (');
            bcValue = encodeBreadcrumbValue(bcValue, '&journal=');
        } else if (bcDisplay.indexOf('Category Profile') != -1) {
            bcDisplayName = 'Category Profile';
            bcDisplayValue = bcDisplay.replace('Category Profile(', 'Category Profile (');
            bcValue = encodeBreadcrumbValue(bcValue, '&category=');
        } else if (bcDisplay.indexOf('Journal Rankings') != -1) {
            bcDisplayName = 'Journal Rankings';
            bcDisplayValue = bcDisplay.replace('Journal Rankings(', 'Journal Rankings (');
            if (bcValue.indexOf('&categories=') != -1) {
                bcValue = encodeBreadcrumbValue(bcValue, '&categories=');
            } else if (bcValue.indexOf('&country=') != -1) {
                bcValue = encodeBreadcrumbValue(bcValue, '&country=');
            }
        } else if (bcDisplay.indexOf('Master Search') != -1) {
            bcDisplayName = 'Master Search';
            bcDisplayValue = bcDisplay.replace('Master Search(', 'Master Search (');
        } else {
            bcDisplayName = bcDisplay;
            bcDisplayValue = bcDisplay;
        }

        if (breadScrumbStr == undefined) {
            breadScrumbStr = "";
        }

        if (bb == bcNavs.length - 1) {
            breadScrumbStr = breadScrumbStr + '<li><a title="' + bcDisplayValue + '" alt="' + bcDisplayValue + '">'
                 + bcDisplayName + '</a></li>';
        } else {
            breadScrumbStr = breadScrumbStr + '<li><a onclick="resettingBreadScrumb(this)" href="'
                 + bcValue.replace(/ /g, '%20') + '" title="' + bcDisplayValue + '" alt="' + bcDisplayValue + '">'
                 + bcDisplayName + '</a></li>';
        }
    }

    return breadScrumbStr;
}

function encodeBreadcrumbValue(bcValue, bcType) {
    return bcValue.substr(0, bcValue.indexOf(bcType) + bcType.length) + encodeURIComponent(bcValue.substr(bcValue.indexOf(bcType) + bcType.length));
}

function resettingBreadScrumb(url) {
    var breadCrumbString = Ext.util.Cookies.get('jcr.breadCrumb');
    var fullURL = url.href;
    var absPath = decodeURIComponent(fullURL.substr((fullURL.substr(0, fullURL.indexOf('.action?'))).lastIndexOf('/')));
    if (breadCrumbString.indexOf(absPath) != -1) {
        document.cookie = 'jcr.breadCrumb=' + breadCrumbString.substring(0, breadCrumbString.indexOf(absPath) + absPath.length + 1);
    }
}
function checkCategoryDeselected(page)
{
	if($("#categories").find("input:checked").length == 0)
    {
		if(page =='categories')
		{
			document.cookie='jcr.categoryHomeStickCats=';
		}else if (page == 'journals')
		{
			document.cookie='jcr.journalHomeStickCats=';
		}
    }
}
