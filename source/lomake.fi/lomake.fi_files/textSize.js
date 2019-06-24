(function() {
    var s = document.getElementById("textSize_s");
    var m = document.getElementById("textSize_m");
    var l = document.getElementById("textSize_l");
    var body = window.document.body;

    if (!s || !m || !l) {
        return;
    }

    var removeClass = function(el, klass) {
        el.className = el.className.replace(new RegExp(" ?\\b" + klass + "\\b"), "");
    };

    var addClass = function(el, klass) {
        removeClass(el, klass);
        el.className += " " + klass;
    };

    var addMatching = function(el1, el2) {
        if (el1 === el2) {
            addClass(el1, "selected");
        } else {
            removeClass(el1, "selected");
        }
    }

    s.onclick = m.onclick = l.onclick = function() {
        addMatching(s, this);
        addMatching(m, this);
        addMatching(l, this);

        removeClass(body, s.id);
        removeClass(body, m.id);
        removeClass(body, l.id);
        addClass(body, this.id);

        localStorage.setItem("textSize", this.id);

        return false;
    };

    var defaultSize = localStorage.getItem("textSize") || "textSize_m";
    document.getElementById(defaultSize).click();
})();

