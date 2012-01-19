CKEDITOR.dialog.add("esp_link",function(l){var i=CKEDITOR.plugins.esp_link;var y=function(){var G=this.getDialog(),F=G.getContentElement("target","popupFeatures"),H=G.getContentElement("target","linkTargetName"),I=this.getValue();if(!F||!H){return}F=F.getElement();F.hide();H.setValue("");switch(I){case"frame":H.setLabel(l.lang.link.targetFrameName);H.getElement().show();break;case"popup":F.show();H.setLabel(l.lang.link.targetPopupName);H.getElement().show();break;default:H.setValue(I);H.getElement().hide();break}};var D=function(){var H=this.getDialog(),J=["urlOptions","anchorOptions","emailOptions"],I=this.getValue();if(I=="url"){if(l.config.linkShowTargetTab){H.showPage("target")}}else{H.hidePage("target")}for(var G=0;G<J.length;G++){var F=H.getContentElement("info",J[G]);if(!F){continue}F=F.getElement().getParent().getParent();if(J[G]==I+"Options"){F.show()}else{F.hide()}}H.layout()};var E=/^javascript:/,u=/^mailto:([^?]+)(?:\?(.+))?$/,j=/subject=([^;?:@&=$,\/]*)/,k=/body=([^;?:@&=$,\/]*)/,t=/^#(.*)$/,n=/^((?:http|https|ftp|news):\/\/)?(.*)$/,b=/^(_(?:self|top|parent|blank))$/,a=/^javascript:void\(location\.href='mailto:'\+String\.fromCharCode\(([^)]+)\)(?:\+'(.*)')?\)$/,w=/^javascript:([^(]+)\(([^)]+)\)$/;var o=/\s*window.open\(\s*this\.href\s*,\s*(?:'([^']*)'|null)\s*,\s*'([^']*)'\s*\)\s*;\s*return\s*false;*\s*/;var h=/(?:^|,)([^=]+)=(\d+|yes|no)/gi;var r=function(H,G){var W=(G&&(G.data("cke-saved-href")||G.getAttribute("href")))||"",J,V,T,K,P={};if((J=W.match(E))){if(p=="encode"){W=W.replace(a,function(ae,ag,af){return"mailto:"+String.fromCharCode.apply(String,ag.split(","))+(af&&x(af))})}else{if(p){W.replace(w,function(ak,am,ah){if(am==A.name){P.type="email";var al=P.email={};var af=/[^,\s]+/g,ag=/(^')|('$)/g,ae=ah.match(af),an=ae.length,aj,ao;for(var ai=0;ai<an;ai++){ao=decodeURIComponent(x(ae[ai].replace(ag,"")));aj=A.params[ai].toLowerCase();al[aj]=ao}al.address=[al.name,al.domain].join("@")}})}}}if(!P.type){if((T=W.match(t))){P.type="anchor";P.anchor={};P.anchor.name=P.anchor.id=T[1]}else{if((V=W.match(u))){var O=W.match(j),Q=W.match(k);P.type="email";var R=(P.email={});R.address=V[1];O&&(R.subject=decodeURIComponent(O[1]));Q&&(R.body=decodeURIComponent(Q[1]))}else{if(W&&(K=W.match(n))){P.type="url";P.url={};P.url.protocol=K[1];P.url.url=K[2]}else{P.type="url"}}}}if(G){var ab=G.getAttribute("target");P.target={};P.adv={};if(!ab){var ad=G.data("cke-pa-onclick")||G.getAttribute("onclick"),Y=ad&&ad.match(o);if(Y){P.target.type="popup";P.target.name=Y[1];var L;while((L=h.exec(Y[2]))){if((L[2]=="yes"||L[2]=="1")&&!(L[1] in {height:1,width:1,top:1,left:1})){P.target[L[1]]=true}else{if(isFinite(L[2])){P.target[L[1]]=L[2]}}}}}else{var ac=ab.match(b);if(ac){P.target.type=P.target.name=ab}else{P.target.type="frame";P.target.name=ab}}var aa=this;var S=function(ae,af){var ag=G.getAttribute(af);if(ag!==null){P.adv[ae]=ag||""}};S("advId","id");S("advLangDir","dir");S("advAccessKey","accessKey");P.adv.advName=G.data("cke-saved-name")||G.getAttribute("name")||"";S("advLangCode","lang");S("advTabIndex","tabindex");S("advTitle","title");S("advContentType","type");CKEDITOR.plugins.esp_link.synAnchorSelector?P.adv.advCSSClasses=B(G):S("advCSSClasses","class");S("advCharset","charset");S("advStyles","style");S("advRel","rel")}var N=P.anchors=[],Z;if(CKEDITOR.plugins.esp_link.emptyAnchorFix){var F=H.document.getElementsByTag("a");for(U=0,I=F.count();U<I;U++){Z=F.getItem(U);if(Z.data("cke-saved-name")||Z.hasAttribute("name")){N.push({name:Z.data("cke-saved-name")||Z.getAttribute("name"),id:Z.getAttribute("id")})}}}else{var X=new CKEDITOR.dom.nodeList(H.document.$.anchors);for(var U=0,I=X.count();U<I;U++){Z=X.getItem(U);N[U]={name:Z.getAttribute("name"),id:Z.getAttribute("id")}}}if(CKEDITOR.plugins.esp_link.fakeAnchor){var M=H.document.getElementsByTag("img");for(U=0,I=M.count();U<I;U++){if((Z=CKEDITOR.plugins.esp_link.tryRestoreFakeAnchor(H,M.getItem(U)))){N.push({name:Z.getAttribute("name"),id:Z.getAttribute("id")})}}}this._.selectedElement=G;return P};var g=function(G,F){if(F[G]){this.setValue(F[G][this.id]||"")}};var m=function(F){return g.call(this,"target",F)};var f=function(F){return g.call(this,"adv",F)};var e=function(G,F){if(!F[G]){F[G]={}}F[G][this.id]=this.getValue()||""};var C=function(F){return e.call(this,"target",F)};var d=function(F){return e.call(this,"adv",F)};function x(F){return F.replace(/\\'/g,"'")}function z(F){return F.replace(/'/g,"\\$&")}var p=l.config.emailProtection||"";if(p&&p!="encode"){var A={};p.replace(/^([^(]+)\(([^)]+)\)$/,function(F,G,H){A.name=G;A.params=[];H.replace(/[^,\s]+/g,function(I){A.params.push(I)})})}function c(H){var F,G=A.name,L=A.params,J,K;F=[G,"("];for(var I=0;I<L.length;I++){J=L[I].toLowerCase();K=H[J];I>0&&F.push(",");F.push("'",K?z(encodeURIComponent(H[J])):"","'")}F.push(")");return F.join("")}function v(G){var F,J=G.length,H=[];for(var I=0;I<J;I++){F=G.charCodeAt(I);H.push(F)}return"String.fromCharCode("+H.join(",")+")"}function B(G){var F=G.getAttribute("class");return F?F.replace(/\s*(?:cke_anchor_empty|cke_anchor)(?:\s*$)?/g,""):""}var s=l.lang.common,q=l.lang.link;return{title:q.title,minWidth:350,minHeight:230,contents:[{id:"info",label:q.info,title:q.info,elements:[{id:"linkType",type:"select",label:q.type,"default":"url",items:[[q.toUrl,"url"],[q.toAnchor,"anchor"],[q.toEmail,"email"]],onChange:D,setup:function(F){if(F.type){this.setValue(F.type)}},commit:function(F){F.type=this.getValue()}},{type:"vbox",id:"urlOptions",children:[{type:"hbox",widths:["25%","75%"],children:[{id:"protocol",type:"select",label:s.protocol,"default":"http://",items:[["http://\u200E","http://"],["https://\u200E","https://"],["ftp://\u200E","ftp://"],["news://\u200E","news://"],[q.other,""]],setup:function(F){if(F.url){this.setValue(F.url.protocol||"")}},commit:function(F){if(!F.url){F.url={}}F.url.protocol=this.getValue()}},{type:"text",id:"url",label:s.url,required:true,onLoad:function(){this.allowOnChange=true},onKeyUp:function(){this.allowOnChange=false;var H=this.getDialog().getContentElement("info","protocol"),F=this.getValue(),G=/^(http|https|ftp|news):\/\/(?=.)/i,J=/^((javascript:)|[#\/\.\?])/i;var I=G.exec(F);if(I){this.setValue(F.substr(I[0].length));H.setValue(I[0].toLowerCase())}else{if(J.test(F)){H.setValue("")}}this.allowOnChange=true},onChange:function(){if(this.allowOnChange){this.onKeyUp()}},validate:function(){var F=this.getDialog();if(F.getContentElement("info","linkType")&&F.getValueOf("info","linkType")!="url"){return true}if(this.getDialog().fakeObj){return true}var G=CKEDITOR.dialog.validate.notEmpty(q.noUrl);return G.apply(this)},setup:function(F){this.allowOnChange=false;if(F.url){this.setValue(F.url.url)}this.allowOnChange=true},commit:function(F){this.onChange();if(!F.url){F.url={}}F.url.url=this.getValue();this.allowOnChange=false}}],setup:function(F){if(!this.getDialog().getContentElement("info","linkType")){this.getElement().show()}}},{type:"button",id:"browse",hidden:"true",filebrowser:"info:url",label:l.lang.esp_link.browseServer}]},{type:"vbox",id:"anchorOptions",width:260,align:"center",padding:0,children:[{type:"fieldset",id:"selectAnchorText",label:q.selectAnchor,setup:function(F){if(F.anchors.length>0){this.getElement().show()}else{this.getElement().hide()}},children:[{type:"hbox",id:"selectAnchor",children:[{type:"select",id:"anchorName","default":"",label:q.anchorName,style:"width: 100%;",items:[[""]],setup:function(H){this.clear();this.add("");for(var G=0;G<H.anchors.length;G++){if(H.anchors[G].name){this.add(H.anchors[G].name)}}if(H.anchor){this.setValue(H.anchor.name)}var F=this.getDialog().getContentElement("info","linkType");if(F&&F.getValue()=="email"){this.focus()}},commit:function(F){if(!F.anchor){F.anchor={}}F.anchor.name=this.getValue()}},{type:"select",id:"anchorId","default":"",label:q.anchorId,style:"width: 100%;",items:[[""]],setup:function(G){this.clear();this.add("");for(var F=0;F<G.anchors.length;F++){if(G.anchors[F].id){this.add(G.anchors[F].id)}}if(G.anchor){this.setValue(G.anchor.id)}},commit:function(F){if(!F.anchor){F.anchor={}}F.anchor.id=this.getValue()}}],setup:function(F){if(F.anchors.length>0){this.getElement().show()}else{this.getElement().hide()}}}]},{type:"html",id:"noAnchors",style:"text-align: center;",html:'<div role="label" tabIndex="-1">'+CKEDITOR.tools.htmlEncode(q.noAnchors)+"</div>",focus:true,setup:function(F){if(F.anchors.length<1){this.getElement().show()}else{this.getElement().hide()}}}],setup:function(F){if(!this.getDialog().getContentElement("info","linkType")){this.getElement().hide()}}},{type:"vbox",id:"emailOptions",padding:1,children:[{type:"text",id:"emailAddress",label:q.emailAddress,required:true,validate:function(){var F=this.getDialog();if(!F.getContentElement("info","linkType")||F.getValueOf("info","linkType")!="email"){return true}var G=CKEDITOR.dialog.validate.notEmpty(q.noEmail);return G.apply(this)},setup:function(G){if(G.email){this.setValue(G.email.address)}var F=this.getDialog().getContentElement("info","linkType");if(F&&F.getValue()=="email"){this.select()}},commit:function(F){if(!F.email){F.email={}}F.email.address=this.getValue()}},{type:"text",id:"emailSubject",label:q.emailSubject,setup:function(F){if(F.email){this.setValue(F.email.subject)}},commit:function(F){if(!F.email){F.email={}}F.email.subject=this.getValue()}},{type:"textarea",id:"emailBody",label:q.emailBody,rows:3,"default":"",setup:function(F){if(F.email){this.setValue(F.email.body)}},commit:function(F){if(!F.email){F.email={}}F.email.body=this.getValue()}}],setup:function(F){if(!this.getDialog().getContentElement("info","linkType")){this.getElement().hide()}}}]},{id:"target",label:q.target,title:q.target,elements:[{type:"hbox",widths:["50%","50%"],children:[{type:"select",id:"linkTargetType",label:s.target,"default":"notSet",style:"width : 100%;",items:[[s.notSet,"notSet"],[q.targetFrame,"frame"],[q.targetPopup,"popup"],[s.targetNew,"_blank"],[s.targetTop,"_top"],[s.targetSelf,"_self"],[s.targetParent,"_parent"]],onChange:y,setup:function(F){if(F.target){this.setValue(F.target.type||"notSet")}y.call(this)},commit:function(F){if(!F.target){F.target={}}F.target.type=this.getValue()}},{type:"text",id:"linkTargetName",label:q.targetFrameName,"default":"",setup:function(F){if(F.target){this.setValue(F.target.name)}},commit:function(F){if(!F.target){F.target={}}F.target.name=this.getValue().replace(/\W/gi,"")}}]},{type:"vbox",width:"100%",align:"center",padding:2,id:"popupFeatures",children:[{type:"fieldset",label:q.popupFeatures,children:[{type:"hbox",children:[{type:"checkbox",id:"resizable",label:q.popupResizable,setup:m,commit:C},{type:"checkbox",id:"status",label:q.popupStatusBar,setup:m,commit:C}]},{type:"hbox",children:[{type:"checkbox",id:"location",label:q.popupLocationBar,setup:m,commit:C},{type:"checkbox",id:"toolbar",label:q.popupToolbar,setup:m,commit:C}]},{type:"hbox",children:[{type:"checkbox",id:"menubar",label:q.popupMenuBar,setup:m,commit:C},{type:"checkbox",id:"fullscreen",label:q.popupFullScreen,setup:m,commit:C}]},{type:"hbox",children:[{type:"checkbox",id:"scrollbars",label:q.popupScrollBars,setup:m,commit:C},{type:"checkbox",id:"dependent",label:q.popupDependent,setup:m,commit:C}]},{type:"hbox",children:[{type:"text",widths:["50%","50%"],labelLayout:"horizontal",label:s.width,id:"width",setup:m,commit:C},{type:"text",labelLayout:"horizontal",widths:["50%","50%"],label:q.popupLeft,id:"left",setup:m,commit:C}]},{type:"hbox",children:[{type:"text",labelLayout:"horizontal",widths:["50%","50%"],label:s.height,id:"height",setup:m,commit:C},{type:"text",labelLayout:"horizontal",label:q.popupTop,widths:["50%","50%"],id:"top",setup:m,commit:C}]}]}]}]},{id:"advanced",label:q.advanced,title:q.advanced,elements:[{type:"vbox",padding:1,children:[{type:"hbox",widths:["45%","35%","20%"],children:[{type:"text",id:"advId",label:q.id,setup:f,commit:d},{type:"select",id:"advLangDir",label:q.langDir,"default":"",style:"width:110px",items:[[s.notSet,""],[q.langDirLTR,"ltr"],[q.langDirRTL,"rtl"]],setup:f,commit:d},{type:"text",id:"advAccessKey",width:"80px",label:q.acccessKey,maxLength:1,setup:f,commit:d}]},{type:"hbox",widths:["45%","35%","20%"],children:[{type:"text",label:q.name,id:"advName",setup:f,commit:d},{type:"text",label:q.langCode,id:"advLangCode",width:"110px","default":"",setup:f,commit:d},{type:"text",label:q.tabIndex,id:"advTabIndex",width:"80px",maxLength:5,setup:f,commit:d}]}]},{type:"vbox",padding:1,children:[{type:"hbox",widths:["45%","55%"],children:[{type:"text",label:q.advisoryTitle,"default":"",id:"advTitle",setup:f,commit:d},{type:"text",label:q.advisoryContentType,"default":"",id:"advContentType",setup:f,commit:d}]},{type:"hbox",widths:["45%","55%"],children:[{type:"text",label:q.cssClasses,"default":"",id:"advCSSClasses",setup:f,commit:d},{type:"text",label:q.charset,"default":"",id:"advCharset",setup:f,commit:d}]},{type:"hbox",widths:["45%","55%"],children:[{type:"text",label:q.rel,"default":"",id:"advRel",setup:f,commit:d},{type:"text",label:q.styles,"default":"",id:"advStyles",validate:CKEDITOR.dialog.validate.inlineStyle(l.lang.common.invalidInlineStyle),setup:f,commit:d}]}]}]}],onShow:function(){var H=this.getParentEditor(),G=H.getSelection(),F=null;if((F=i.getSelectedLink(H))&&F.hasAttribute("href")){G.selectElement(F)}else{F=null}this.setupContent(r.apply(this,[H,F]))},onOk:function(){var O={},I=[],af={},ae=this,K=this.getParentEditor();this.commitContent(af);switch(af.type||"url"){case"url":var T=(af.url&&af.url.protocol!=undefined)?af.url.protocol:"http://",L=(af.url&&CKEDITOR.tools.trim(af.url.url))||"";O["data-cke-saved-href"]=(L.indexOf("/")===0)?L:T+L;break;case"anchor":var ah=(af.anchor&&af.anchor.name),U=(af.anchor&&af.anchor.id);O["data-cke-saved-href"]="#"+(ah||U||"");break;case"email":var H,W=af.email,J=W.address;switch(p){case"":case"encode":var M=encodeURIComponent(W.subject||""),P=encodeURIComponent(W.body||"");var N=[];M&&N.push("subject="+M);P&&N.push("body="+P);N=N.length?"?"+N.join("&"):"";if(p=="encode"){H=["javascript:void(location.href='mailto:'+",v(J)];N&&H.push("+'",z(N),"'");H.push(")")}else{H=["mailto:",J,N]}break;default:var V=J.split("@",2);W.name=V[0];W.domain=V[1];H=["javascript:",c(W)]}O["data-cke-saved-href"]=H.join("");break}if(af.target){if(af.target.type=="popup"){var Y=["window.open(this.href, '",af.target.name||"","', '"];var ac=["resizable","status","location","toolbar","menubar","fullscreen","scrollbars","dependent"];var ad=ac.length;var S=function(ai){if(af.target[ai]){ac.push(ai+"="+af.target[ai])}};for(var aa=0;aa<ad;aa++){ac[aa]=ac[aa]+(af.target[ac[aa]]?"=yes":"=no")}S("width");S("left");S("height");S("top");Y.push(ac.join(","),"'); return false;");O["data-cke-pa-onclick"]=Y.join("");I.push("target")}else{if(af.target.type!="notSet"&&af.target.name){O.target=af.target.name}else{I.push("target")}I.push("data-cke-pa-onclick","onclick")}}if(af.adv){var X=function(ai,aj){var ak=af.adv[ai];if(ak){O[aj]=ak}else{I.push(aj)}};X("advId","id");X("advLangDir","dir");X("advAccessKey","accessKey");if(af.adv.advName){O.name=O["data-cke-saved-name"]=af.adv.advName}else{I=I.concat(["data-cke-saved-name","name"])}X("advLangCode","lang");X("advTabIndex","tabindex");X("advTitle","title");X("advContentType","type");X("advCSSClasses","class");X("advCharset","charset");X("advStyles","style");X("advRel","rel")}O.href=O["data-cke-saved-href"];if(!this._.selectedElement){var ag=K.getSelection(),G=ag.getRanges(true);if(G.length==1&&G[0].collapsed){var R=new CKEDITOR.dom.text(af.type=="email"?af.email.address:O["data-cke-saved-href"],K.document);G[0].insertNode(R);G[0].selectNodeContents(R);ag.selectRanges(G)}var ab=new CKEDITOR.style({element:"a",attributes:O});ab.type=CKEDITOR.STYLE_INLINE;ab.apply(K.document)}else{var F=this._.selectedElement,Z=F.data("cke-saved-href"),Q=F.getHtml();F.setAttributes(O);F.removeAttributes(I);if(af.adv&&af.adv.advName&&CKEDITOR.plugins.esp_link.synAnchorSelector){F.addClass(F.getChildCount()?"cke_anchor":"cke_anchor_empty")}if(Z==Q||af.type=="email"&&Q.indexOf("@")!=-1){F.setHtml(af.type=="email"?af.email.address:O["data-cke-saved-href"])}delete this._.selectedElement}},onLoad:function(){if(!l.config.linkShowAdvancedTab){this.hidePage("advanced")}if(!l.config.linkShowTargetTab){this.hidePage("target")}},onFocus:function(){var F=this.getContentElement("info","linkType"),G;if(F&&F.getValue()=="url"){G=this.getContentElement("info","url");G.select()}}}});