(this["webpackJsonpsentetik-veri"]=this["webpackJsonpsentetik-veri"]||[]).push([[0],{50:function(e,a,t){e.exports=t(71)},71:function(e,a,t){"use strict";t.r(a);var l=t(13),n=t.n(l),r=t(0),c=t.n(r),o=t(19),s=t(12),m=t(8),i=t(75),u=t(37),p=t(11),E="PAGE_READY",f=function(e){return{type:E,payload:e}};var d=Object(p.b)((function(e){return{excel:e.excel}}),(function(e){return{pageReady:function(a){e(f(a))}}}))((function(e){var a=Object(r.useState)(e.excel.field||{}),t=Object(m.a)(a,1)[0],l=Object(r.useState)(e.excel.final||[]),n=Object(m.a)(l,1)[0],o=Object(r.useState)(e.excel.fileName||""),s=Object(m.a)(o,1)[0];Object(r.useEffect)((function(){return function(){e.pageReady(!1)}}),[]);var p=null!==t&&0!==n.length&&0!==s.length;return c.a.createElement("div",{className:"App"},c.a.createElement(i.a,null,c.a.createElement("div",{className:"row"},c.a.createElement("span",{className:"col-4"}),p?c.a.createElement(u.JsonToExcel,{data:n,className:"col-4 btn btn-primary",filename:s,fields:t,style:{padding:"5px"}}):c.a.createElement("span",{className:"col-4"},c.a.createElement("p",{className:"text-center"},"L\xfctfen ilk olarak veri olu\u015fturunuz.")),c.a.createElement("span",{className:"col-4"}))))})),h=t(32),g=t(77),v=t(76),b=t(46),N="ADD_EXCEL";var x=Object(p.b)((function(e){return{page:e.page}}),(function(e){return{addExcel:function(a){e({type:N,payload:a})},pageReady:function(a){e(f(a))}}}))(Object(s.f)((function(e){var a=Object(r.useState)(null),t=Object(m.a)(a,2),l=t[0],n=t[1],o=Object(r.useState)(null),s=Object(m.a)(o,2),u=s[0],p=s[1],E=Object(r.useState)([]),f=Object(m.a)(E,2),d=f[0],N=f[1],x=Object(r.useState)("Normalizasyon"),y=Object(m.a)(x,2),O=y[0],F=y[1],j=Object(r.useState)(null),w=Object(m.a)(j,2),k=w[0],z=w[1],S=Object(r.useState)("y = mx(0) + ... + mx(n-1) + b, (n = ba\u011f\u0131ms\u0131z \xf6znitelik say\u0131s\u0131)"),M=Object(m.a)(S,2),C=M[0],D=M[1],R=Object(r.useState)("odev_veriseti"),A=Object(m.a)(R,2),J=A[0],P=A[1];function q(e,a){"data"===a?n(e.target.value):"korelasyon"===a?z(e.target.value):"regrasyon"===a?D(e.target.value):P(e.target.value)}function I(e,a,t){var l=d;l.forEach((function(l){l.key===a&&(l[t]=parseFloat(e.target.value))})),N(l)}Object(r.useEffect)((function(){u>0?(e.pageReady(!1),function(){var e=[];N([]);for(var a=0;a<u;a++)e.push({key:a,from:null,to:null});N(e)}()):N([])}),[u]);var T=d.map((function(e,a){return c.a.createElement("div",{key:a},c.a.createElement("div",{className:"row"},c.a.createElement("span",{className:"col-3"}),c.a.createElement("p",{className:"col-2 text-right"},"\xd6znitelik ",a," :"),c.a.createElement("input",{className:"col-2 from",type:"number",placeholder:"from",onChange:function(e){return I(e,a,"from")}}),c.a.createElement("input",{className:"col-2",type:"number",placeholder:"to",onChange:function(e){return I(e,a,"to")}}),c.a.createElement("span",{className:"col-3"})),c.a.createElement("br",null))})),_="Normalizasyon"!==O&&l&&u&&J&&k&&d.length>0;return c.a.createElement("div",{className:"App"},c.a.createElement(g.a,null,c.a.createElement(i.a,null,c.a.createElement("div",{className:"row"},c.a.createElement("span",{className:"col-3"}),c.a.createElement("p",{className:"col-2 text-right"},"Dosya \u0130smi :"),c.a.createElement("input",{className:"col-2",value:J,type:"input",placeholder:"Dosya \u0130smi",onChange:function(e){return q(e,"name")}}),c.a.createElement("span",{className:"col-5"})),c.a.createElement("br",null),c.a.createElement("br",null),c.a.createElement("div",{className:"row"},c.a.createElement("span",{className:"col-3"}),c.a.createElement("p",{className:"col-2 text-right"},"Veri Say\u0131s\u0131 :"),c.a.createElement("input",{className:"col-2",type:"number",step:"500",placeholder:"500 ve daha fazla",onChange:function(e){return q(e,"data")}}),c.a.createElement("span",{className:"col-5"})),c.a.createElement("br",null),c.a.createElement("br",null),c.a.createElement("div",{className:"row"},c.a.createElement("span",{className:"col-3"}),c.a.createElement("p",{className:"col-2 text-right"},"\xd6znitelik Say\u0131s\u0131 :"),c.a.createElement("input",{className:"col-2",type:"number",step:"0.1",placeholder:"En az 2 - dinamik",onChange:function(e){return function(e){e.target.value>=2?p(e.target.value):p(0)}(e)}}),c.a.createElement("span",{className:"col-5"})),c.a.createElement("br",null),T,c.a.createElement("br",null),c.a.createElement("div",{className:"row"},c.a.createElement("span",{className:"col-5"}),c.a.createElement(v.a,null,c.a.createElement(v.a.Toggle,{variant:"primary"},O),c.a.createElement(v.a.Menu,{onClick:function(e){return function(e){F(e.target.text)}(e)}},c.a.createElement(v.a.Item,null,"z-score"),c.a.createElement(v.a.Item,null,"min-max"))),c.a.createElement("span",{className:"col-5"})),c.a.createElement("br",null),c.a.createElement("br",null),c.a.createElement("div",{className:"row"},c.a.createElement("span",{className:"col-3"}),c.a.createElement("p",{className:"col-2 text-right"},"Korelasyon Katsay\u0131s\u0131 :"),c.a.createElement("input",{className:"col-2",type:"number",step:"0.1",placeholder:"0 - 1 aras\u0131",onChange:function(e){return q(e,"korelasyon")}}),c.a.createElement("span",{className:"col-4"})),c.a.createElement("br",null),c.a.createElement("br",null),c.a.createElement("div",{className:"row"},c.a.createElement("span",{className:"col-3"}),c.a.createElement("p",{className:"col-2 text-right"},"Regrasyon :"),c.a.createElement("p",{className:"col-5 font-weight-bold"},C),c.a.createElement("span",{className:"col-2"})),c.a.createElement("br",null),c.a.createElement("br",null),c.a.createElement("div",{className:"row"},c.a.createElement("span",{className:"col-5"}),c.a.createElement(b.a,{disabled:!_,className:"col-2",onClick:function(){return function(){for(var a,t,n=[],r=[],c={index:"index"},o=Array.from({length:u},(function(){return""})),s=JSON.parse(JSON.stringify(d)),m=function(e){var r=s.map((function(r,c,s){var m=s[s.length-1-c],i=m.to-parseFloat(m.from),p=i/l;return 0===e||m.key===u-1?t=1:(t=k*(s[s.length-1].from/n[e-1].row[s.length-1-c].value),t=parseFloat(t.toFixed(2))),a=parseFloat(m.from)+Math.random()*p*i*t,m.from=a.toFixed(2),o[m.key]+=m.from+",",{index:m.key,value:m.from}}));n.push({row:r})},i=0;i<l;i++)m(i);for(var p=function(e){var a=o[o.length-1].split(","),t=o[e].split(",");t.pop();for(var l=0,c=0,s=0,m=0;m<t.length;m++)l+=parseFloat(t[m]),c+=Math.pow(parseFloat(t[m]),2),s+=parseFloat(t[m])*parseFloat(a[m]),l=parseFloat(l.toFixed(1)),c=parseFloat(c.toFixed(1)),s=parseFloat(s.toFixed(1));var i=l/t.length;i=parseFloat(i.toFixed(2));var u=0;t.forEach((function(e){return u+=Math.pow(parseFloat(e)-i,2)}));var p=u/t.length,E=Math.sqrt(p);if(E=parseFloat(E.toFixed(2)),r.unshift({index:e,total:l,totalPow:c,totalDiff:s,mean:i,deviation:E}),"min-max"===O)for(var f=Math.max.apply(Math,Object(h.a)(t)),d=Math.min.apply(Math,Object(h.a)(t)),g=n.length-1;g>=0;g--)n[g].row[e].value=parseFloat((parseFloat(n[g].row[e].value)-d)/(f-d).toFixed(3));else for(var v=n.length-1;v>=0;v--)n[v].row[e].value=parseFloat(((parseFloat(n[v].row[e].value)-i)/E).toFixed(3))},E=o.length-1;E>=0;E--)p(E);var f,g="".concat(r[r.length-1].mean," ="),v=[];r.map((function(e,a,t){var n=t[r.length-1],c=l*e.totalDiff-n.total*e.total,o=Math.sqrt(l*n.totalPow-Math.pow(n.total,2)),s=Math.sqrt(l*e.totalPow-Math.pow(e.total,2));e.corre=c/(o*s),e.mx=parseFloat((n.deviation/e.deviation).toFixed(2));var m=(n.deviation/e.deviation).toFixed(2)+"x"+a;v.push(m)})),v.pop();for(var b=0,N=0;N<r.length-1;N++)b+=r[N].mx*r[N].mean;f=r[r.length-1].mean-parseFloat(b.toFixed(2)),g+=" ".concat(v.join(" + ")," + b, b = ").concat(f.toFixed(2)),D(g),delete r[r.length-1].totalDiff,delete r[r.length-1].corre,d.forEach((function(e){c["Oznitelik".concat(e.key)]="Oznitelik ".concat(e.key)}));var x=[];n.forEach((function(e,a){var t={index:a};e.row.forEach((function(e,a){t["Oznitelik".concat(e.index)]=e.value})),x.push(t)})),e.addExcel({fileName:J,field:c,final:x}),e.pageReady(!0)}()}},"Tamam"),c.a.createElement("span",{className:"col-5"})),c.a.createElement("br",null),c.a.createElement("br",null),c.a.createElement("div",{className:"row"},c.a.createElement("span",{className:"col-5"}),c.a.createElement(b.a,{disabled:!e.page,className:"col-2",onClick:function(){e.history.push("/excel")}},"Excel sayfas\u0131na git"),c.a.createElement("span",{className:"col-5"})))))})));var y=Object(p.b)((function(e){return{page:e.page}}),null)((function(e){return c.a.createElement(o.a,null,c.a.createElement("ul",{className:"list-group list-group-horizontal row"},c.a.createElement("li",{className:"list-group-item list-group-item-secondary text-center col-6"},c.a.createElement(o.b,{className:"text-decoration-none text-danger",to:"/"},"Veri Olu\u015ftur")),c.a.createElement("li",{className:"list-group-item list-group-item-secondary text-center col-6",style:{pointerEvents:e.page?"auto":"none",opacity:e.page?1:.5}},c.a.createElement(o.b,{className:"text-decoration-none text-danger",to:"/excel"},"Excel \xc7\u0131kt\u0131"))),c.a.createElement(s.c,null,c.a.createElement(s.a,{exact:!0,path:"/"},c.a.createElement(x,null)),c.a.createElement(s.a,{path:"/excel"},c.a.createElement(d,null))))})),O=t(18),F=[],j=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:F,a=arguments.length>1?arguments[1]:void 0;switch(a.type){case N:return Object.assign({},e,a.payload);default:return e}},w=function(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0],a=arguments.length>1?arguments[1]:void 0;switch(a.type){case E:return a.payload;default:return e}},k=Object(O.b)({excel:j,page:w}),z=Object(O.c)(k);n.a.render(c.a.createElement(p.a,{store:z}," ",c.a.createElement(y,null)),document.getElementById("root"))}},[[50,1,2]]]);
//# sourceMappingURL=main.7406b16f.chunk.js.map