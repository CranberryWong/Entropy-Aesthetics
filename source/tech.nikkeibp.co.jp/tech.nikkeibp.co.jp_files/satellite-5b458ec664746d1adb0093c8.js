(function () {
    // Cutting The Mustard!
    if ('querySelector' in window.parent.document &&
        'addEventListener' in window.parent
    ) {

        // Define Article Body
        var articleBody = null;
      	var articleBodyTmp = window.parent.document.getElementsByClassName('articleBody')
        if(articleBodyTmp.length > 0){
          articleBody = articleBodyTmp[0];
        }

        // Configure
        atlasTracking.config({
            'system': {
                'endpoint': 'atlas-endpoint.data.n8s.jp',
                'beaconTimeout': 2000,
                'cookieName': 'atlasId',
                'cookieMaxAge': (2 * 365 * 24 * 60 * 60),
                'cookieDomain': 'nikkeibp.co.jp'
            },
            'defaults': {
                'pageUrl': window.parent.bpTrackVars.pageUrl,
                'pageReferrer': window.parent.bpTrackVars.pageReferrer,
                'pageTitle': window.parent.bpTrackVars.pageTitle,
            },
            'product': {
                'productFamily': 'NBP-' + window.parent.bpTrackVars.subDomain,
                'productName': window.parent.bpTrackVars.subSite || 'NBP-' + window.parent.bpTrackVars.subDomain
            },
            'options': {
                'useGet': true,
                'exchangeAtlasId': {
                    'pass': false,
                    'passParamKey': 'atlas_id',
                    'passTargetDomains': [],
                    'catch': false,
                    'catchParamKey': 'atlas_id',
                    'catchTargetDomains': [],
                },
                'trackLink': {
                    'enable': true,
                    'internalDomains': ['trend.nikkeibp.co.jp','tech.nikkeibp.co.jp'],
                    'nameAttribute': 'data-atlas-link-name',
                },
                'trackDownload': {
                    'enable': true,
                    'fileExtensions': ['pdf', 'zip', 'laz', 'tar', 'gz', 'tgz', 'docx', 'xlsx', 'pptx', 'doc', 'xls', 'ppt'],
                    'nameAttribute': 'data-atlas-link-name',
                },
                'trackPerformance': {
                    'enable': true,
                },
                'trackScroll': {
                    'enable': true,
                    'granularity': 20,
                    'threshold': 2,
                },
                'trackInfinityScroll': {
                    'enable': false,
                    'step': 600,
                    'threshold': 2,
                },
                'trackRead': {
                    'enable': true,
                    'target': articleBody,
                    'granularity': 25,
                    'milestones': [4, 15, 30, 60, 90, 120],
                },
                'trackViewability': {
                    'enable': false,
                    'targets': [],
                },
                'trackMedia': {
                    'enable': false,
                    'targets': [],
                    'heartbeat': 5,
                },
                'trackUnload': {
                    'enable': true,
                },
                'trackForm': {
                    'enable': false,
                    'targets': [],
                },
                'observeMutation': false,
                'dataSrc': ''
            }
        });

        // Init Page data
        atlasTracking.initPage({
            user: {
                'user_id': atlasTracking.getCookieValue('NID-Serial-Cookie'),
                'user_status': window.parent.bpTrackVars.userStatus,
                'site_session': null
            },
            context: {
                'app': null,
                'app_version': null,
                'source': null,
                'edition': window.parent.bpTrackVars.mediaId,
                'id': null,
                'root_id': null,
                'content_id': window.parent.bpTrackVars.articleId,
                'content_name': window.parent.bpTrackVars.section ? (window.parent.bpTrackVars.section === '0' ? window.parent.bpTrackVars.pageTitle : null) : null,
                'content_status': (window.parent.bpTrackVars.authResult === 'true' || window.parent.bpTrackVars.authResult === 'FREEAUTHOK') ? 'opened' : 'locked',
                'page_name': window.parent.bpTrackVars.pageStatus,
                'page_num': window.parent.bpTrackVars.pageNumber,
                'category_l1': window.parent.bpTrackVars.channel,
                'category_l2': window.parent.bpTrackVars.parentThemeName,
                'category_l3': window.parent.bpTrackVars.themeName,
                'tracking_code': atlasTracking.getQueryValue('n_cid'),
                'events': null,
                'custom_object': {
                    'nbp_parent_content_title': window.parent.bpTrackVars.parentTitle,
                    'theme_id': window.parent.bpTrackVars.themeId,
                    'aggregate_id': window.parent.bpTrackVars.aggregateId,
                    'author': window.parent.bpTrackVars.displayAuthorName,
                    'publish_date': window.parent.bpTrackVars.publishDate,
                    'genre': window.parent.bpTrackVars.genre,
                    'content_tags': window.parent.bpTrackVars.tagName,
                    'search_tags': window.parent.bpTrackVars.searchTagName,
                    'search_keywords': window.parent.bpTrackVars.searchKeyword,
                    'max_page_num': window.parent.bpTrackVars.articlePageTotalNo,
                    'auth_kind': window.parent.bpTrackVars.authKind,
                    'tracking_code_i': atlasTracking.getQueryValue('i_cid'),
                    'tieup_id': window.parent.bpTrackVars.repTieupId ? window.parent.bpTrackVars.repTieupId : window.parent.bpTrackVars.tieupId,
                },
                'funnel': {}
            }
        });

        // Send PV
        atlasTracking.trackPage();
    }
}());

