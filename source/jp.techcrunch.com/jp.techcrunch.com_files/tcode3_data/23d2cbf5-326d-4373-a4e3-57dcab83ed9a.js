!function(e,r,t,n,a){function c(e){var r="";for(var t in e){var n=e[t];r+=encodeURIComponent(t)+"="+encodeURIComponent(n)+"&"}return r.length>0&&(r=r.substring(0,r.length-1)),r}function o(e){var t=r.getElementsByTagName("script")[0],n=r.createElement("script");n.async=!0,n.src=e,t.parentNode.insertBefore(n,t)}function f(r){e.testlog&&(e.testlog.fired||(e.testlog.fired=[]),e.testlog.fired.push(r))}function d(){return"https:"==e.location.protocol}function i(){for(var e,r=0;r<l.t.length;r++)fire=!1,e=l.t[r],"undefined"!=typeof e.sf&&l.pf[e.sf](e.p,e.v)}function u(e){for(var r=0;r<e.length;r++)if(e[r]&&e[r]())return!0;return!1}function b(){var e,r,t=null;l.t.sort(function(e,r){return e.o-r.o});for(var n=0;n<l.t.length;n++)if(r=!1,t=l.t[n],"object"==typeof t&&t.r&&t.r.fire){for(var a=0;a<t.r.fire.length;a++)e=t.r.fire[a],u(l.r[e])&&(r=!0);if(t.r&&t.r.block)for(var c=0;c<t.r.block.length;c++)e=t.r.block[c],u(l.r[e])&&(r=!1);r&&l.tf[t.f](l.tp[t.t],t.v)}}var l={id:"23d2cbf5-326d-4373-a4e3-57dcab83ed9a",tp:{"3e1f74c4-485c-4b87-9f2a-bcb1c05d95e2":{url:"http://pixel.advertising.com/ups/{{id}}/sv",secure_url:"https://pixel.advertising.com/ups/{{id}}/sv"}},m:{"83ef824a-902f-4a7d-ba0b-70ecef969af2":function(){function e(e){var r=new RegExp("[a-z-0-9]{2,63}.[a-z.]{2,5}$"),t=r.exec(e);return e.replace(t[0],"").slice(0,-1)}var r;return r=e(window.location.hostname)},"a1d550fd-270f-4992-ab86-6d67afe97263":function(){var e;return e=window.document.referrer},"6873dbcb-f0d9-4159-b736-c879be21c164":function(){var e;return e=window.location.href},"ab106143-e140-4ef5-8840-94bb8bb5a3cf":function(){var e;return e=window.location.protocol},"045a4d40-4381-46df-a551-7d3fdb2b3acd":function(){var e;return e=window.location.hostname},"8e7037ae-e3eb-40d3-a22b-8d8de9dbac5b":function(){var e;return e=window.location.port||window.location.host.split(":")[1]},"cdca4d5c-89ba-4011-9b48-86ae1994fd0c":function(){return"true"},"e1188b09-ab90-4e12-9da7-7f23367be851":function(){return"techcrunch.com"}},r:[[function(){var e=l.m["cdca4d5c-89ba-4011-9b48-86ae1994fd0c"](),r="true";return e==r}]],tf:[function(e,r){var t=p;"object"!=typeof t&&(t={});var n={};for(var a in t)n[a]=t[a];if("object"==typeof r.data)for(var a in r.data)n[a]=l.m[r.data[a]]();if(s.isync){n.callback=s.isync;var i;i=d()?e.secure_url.replace("{{id}}",r.id):e.url.replace("{{id}}",r.id),o(i+"?"+c(n))}else{var u=new Image;d()?u.src=e.secure_url.replace("{{id}}",r.id)+"?"+c(n):u.src=e.url.replace("{{id}}",r.id)+"?"+c(n),f(u.src)}}],pf:[],t:[{t:"3e1f74c4-485c-4b87-9f2a-bcb1c05d95e2",o:0,v:{id:"57",data:{url:"a1d550fd-270f-4992-ab86-6d67afe97263",domain:"e1188b09-ab90-4e12-9da7-7f23367be851"}},r:{fire:[0],block:[]},f:0}]},p={},s={};"undefined"==typeof n&&(n="pageData"),"undefined"!=typeof e[n]&&(p="object"!=typeof e[n]?{}:e[n]),"undefined"==typeof e["23d2cbf5-326d-4373-a4e3-57dcab83ed9a"]&&(i(),b(),e["23d2cbf5-326d-4373-a4e3-57dcab83ed9a"]=!0)}(window,document,"script","pageData");