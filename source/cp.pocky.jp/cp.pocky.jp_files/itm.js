(function(n,w,d){
    var g={},pr=w.location.protocol,cvid="mHDmdffSCFxfWgmjsQ",gp=n;
    g.cid=1000040;
    g.cf={"gid": "GTM-M5TXT9Z", "dlt": "none"};
    var old = (!g.cf.dlt || g.cf.dlt == "oldstyle")? true:false;
    if(old){
        w[n] = g;
    }else{
        gp = n+".c"+g.cid;
        w[n] = w[n] || {};
        w[n]["c"+g.cid] = g;
    }
    g.ld=function(url){
        var e=d.createElement("script");
        e.type='text/javascript';e.async=true;e.src=url;
        var st=d.getElementsByTagName("script")[0];
        st.parentNode.insertBefore(e,st);
    };
    g.fo=function(dat){
        w._fout_queue = w._fout_queue || {};
        if(w._fout_queue.segment === void 0) w._fout_queue.segment = {};
        if(w._fout_queue.segment.queue === void 0) w._fout_queue.segment.queue = [];
        var p = {'user_id': g.cid };
        if(dat){ p.dat = dat; }
        w._fout_queue.segment.queue.push(p);
        g.ld(pr+'//js.fout.jp/segmentation.js');
    };
    g.gt=function(gid, data, dl){
        w[dl] = w[dl] || [];
        if(data){ w[dl].push(data); }
        w[dl].push({'gtm.start':new Date().getTime(),event:'gtm.js'});
        g.ld(pr+'//www.googletagmanager.com/gtm.js?id='+gid+"&l="+dl);
    };
    g.yt=function(yid){
        g.ld(pr+'//s.yjtag.jp/tag.js#site='+yid);
    };
    g.sa_cb=function(p){
        g.aid = "-";
        g.sids = "";
        if(p.audience_id){
            g.aid = p.audience_id;
            var s = ',';
            p = p.segments;
            for(var i=0,len=p.length;i<len;i++){
                s += p[i].segment_id + ',';
            }
            g.sids = s;
        }
        g.tm({SegmentsString:s});
    };
    g.ia_cb=function(p){
        g.imid = p.imid;
        g.seids = p.segment_eids.join(",");
        if(g.seids){ g.seids = ","+g.seids+","; }
        g.tm({imid:g.imid, segment_eids:g.seids});
    };
    g.tm=function(data){
        if(old){
            if(g.cf.gid){ g.gt(g.cf.gid,data,"itm_dl1"); }
            if(g.cf.gid2){ g.gt(g.cf.gid2,data,"itm_dl2"); }
        }else{
            if(g.cf.gid){ g.gt(g.cf.gid,data,"itm_dl1_"+g.cid); }
            if(g.cf.gid2){ g.gt(g.cf.gid2,data,"itm_dl2_"+g.cid); }
        }
        if(g.cf.yid){ g.yt(g.cf.yid); }
    };
    if(g.cf.fo){ g.fo(w._itm_dat_); }
    if(old || g.cf.dlt == "foid"){
        g.ld(pr+'//cnt.fout.jp/segapi/audience?callback='+gp+'.sa_cb&cvid='+cvid);
    }else if(g.cf.dlt == "none"){
        g.tm(null);
    }else if(g.cf.dlt == "imid" && g.cf.imt){
        g.ld(pr+'//sync.im-apps.net/imid/segment?callback='+gp+'.ia_cb&token='+g.cf.imt);
    }
})("_itm_",window,document);