(function(){function g(){try{var o=this.getSelection();if(!o||!o.document.getWindow().$){return}var m=o.getStartElement();var n=new CKEDITOR.dom.elementPath(m);if(!n.compare(this._.selectionPreviousPath)){this._.selectionPreviousPath=n;this.fire("selectionChange",{selection:o,path:n,element:m})}}catch(p){}}var c,d;function k(){d=true;if(c){return}e.call(this);c=CKEDITOR.tools.setTimeout(e,200,this)}function e(){c=null;if(d){CKEDITOR.tools.setTimeout(g,0,this);d=false}}function f(m){function p(r){return r&&r.type==CKEDITOR.NODE_ELEMENT&&r.getName() in CKEDITOR.dtd.$removeEmpty}function n(s){var r=m.document.getBody();return !s.is("body")&&r.getChildCount()==1}var q=m.startContainer,o=m.startOffset;if(q.type==CKEDITOR.NODE_TEXT){return false}return !CKEDITOR.tools.trim(q.getHtml())?p(q)||n(q):p(q.getChild(o-1))||p(q.getChild(o))}var b={modes:{wysiwyg:1,source:1},readOnly:CKEDITOR.env.ie||CKEDITOR.env.webkit,exec:function(n){switch(n.mode){case"wysiwyg":n.document.$.execCommand("SelectAll",false,null);n.forceNextSelectionCheck();n.selectionChange();break;case"source":var m=n.textarea.$;if(CKEDITOR.env.ie){m.createTextRange().execCommand("SelectAll")}else{m.selectionStart=0;m.selectionEnd=m.value.length}m.focus()}},canUndo:false};function l(n){i(n);var m=n.createText("\u200B");n.setCustomData("cke-fillingChar",m);return m}function a(m){return m&&m.getCustomData("cke-fillingChar")}function j(n){var m=n&&a(n);if(m){if(m.getCustomData("ready")){i(n)}else{m.setCustomData("ready",1)}}}function i(n){var m=n&&n.removeCustomData("cke-fillingChar");if(m){m.setText(m.getText().replace(/\u200B/g,""));m=0}}CKEDITOR.plugins.add("selection",{init:function(o){if(CKEDITOR.env.webkit){o.on("selectionChange",function(){j(o.document)});o.on("beforeSetMode",function(){i(o.document)});o.on("key",function(r){switch(r.data.keyCode){case 13:case CKEDITOR.SHIFT+13:case 37:case 39:case 8:i(o.document)}},null,null,10);var m,p;function n(){var t=o.document,s=a(t);if(s){var r=t.$.defaultView.getSelection();if(r.type=="Caret"&&r.anchorNode==s.$){p=1}m=s.getText();s.setText(m.replace(/\u200B/g,""))}}function q(){var s=o.document,r=a(s);if(r){r.setText(m);if(p){s.$.defaultView.getSelection().setPosition(r.$,r.getLength());p=0}}}o.on("beforeUndoImage",n);o.on("afterUndoImage",q);o.on("beforeGetData",n,null,null,0);o.on("getData",q)}o.on("contentDom",function(){var y=o.document,u=y.getBody(),t=y.getDocumentElement();if(CKEDITOR.env.ie){var v,z,s=1;u.on("focusin",function(B){if(B.data.$.srcElement.nodeName!="BODY"){return}if(v){if(s){try{v.select()}catch(C){}var A=y.getCustomData("cke_locked_selection");if(A){A.unlock();A.lock()}}v=null}});u.on("focus",function(){z=1;r()});u.on("beforedeactivate",function(A){if(A.data.$.toElement){return}z=0;s=1});if(CKEDITOR.env.ie&&CKEDITOR.env.version<8){o.on("blur",function(A){try{o.document&&o.document.$.selection.empty()}catch(B){}})}t.on("mousedown",function(){s=0});t.on("mouseup",function(){s=1});if(CKEDITOR.env.ie&&(CKEDITOR.env.ie7Compat||CKEDITOR.env.version<8||CKEDITOR.env.quirks)){t.on("click",function(A){if(A.data.getTarget().getName()=="html"){o.getSelection().getRanges()[0].select()}})}var x;u.on("mousedown",function(A){if(A.data.$.button==2){var B=o.document.$.selection;if(B.type=="None"){x=o.window.getScrollPosition()}}w()});u.on("mouseup",function(A){if(A.data.$.button==2&&x){o.document.$.documentElement.scrollLeft=x.x;o.document.$.documentElement.scrollTop=x.y}x=null;z=1;setTimeout(function(){r(true)},0)});u.on("keydown",w);u.on("keyup",function(){z=1;r()});y.on("selectionchange",r);function w(){z=0}function r(D){if(z){var C=o.document,B=o.getSelection(),A=B&&B.getNative();if(D&&A&&A.type=="None"){if(!C.$.queryCommandEnabled("InsertImage")){CKEDITOR.tools.setTimeout(r,50,this,true);return}}var E;if(A&&A.type&&A.type!="Control"&&(E=A.createRange())&&(E=E.parentElement())&&(E=E.nodeName)&&E.toLowerCase() in {input:1,textarea:1}){return}v=A&&B.getRanges()[0];k.call(o)}}}else{y.on("mouseup",k,o);y.on("keyup",k,o);y.on("selectionchange",k,o)}});o.on("contentDomUnload",o.forceNextSelectionCheck,o);o.addCommand("selectAll",b);o.ui.addButton("SelectAll",{label:o.lang.selectAll,command:"selectAll"});o.selectionChange=k;CKEDITOR.env.ie9Compat&&o.on("destroy",function(){var r=o.getSelection();r&&r.getNative().clear()},null,null,9)}});CKEDITOR.editor.prototype.getSelection=function(){return this.document&&this.document.getSelection()};CKEDITOR.editor.prototype.forceNextSelectionCheck=function(){delete this._.selectionPreviousPath};CKEDITOR.dom.document.prototype.getSelection=function(){var m=new CKEDITOR.dom.selection(this);return(!m||m.isInvalid)?null:m};CKEDITOR.SELECTION_NONE=1;CKEDITOR.SELECTION_TEXT=2;CKEDITOR.SELECTION_ELEMENT=3;CKEDITOR.dom.selection=function(n){var m=n.getCustomData("cke_locked_selection");if(m){return m}this.document=n;this.isLocked=0;this._={cache:{}};if(CKEDITOR.env.ie){var o=this.getNative().createRange();if(!o||(o.item&&o.item(0).ownerDocument!=this.document.$)||(o.parentElement&&o.parentElement().ownerDocument!=this.document.$)){this.isInvalid=true}}return this};var h={img:1,hr:1,li:1,table:1,tr:1,td:1,th:1,embed:1,object:1,ol:1,ul:1,a:1,input:1,form:1,select:1,textarea:1,button:1,fieldset:1,thead:1,tfoot:1};CKEDITOR.dom.selection.prototype={getNative:CKEDITOR.env.ie?function(){return this._.cache.nativeSel||(this._.cache.nativeSel=this.document.$.selection)}:function(){return this._.cache.nativeSel||(this._.cache.nativeSel=this.document.getWindow().$.getSelection())},getType:CKEDITOR.env.ie?function(){var m=this._.cache;if(m.type){return m.type}var n=CKEDITOR.SELECTION_NONE;try{var o=this.getNative(),q=o.type;if(q=="Text"){n=CKEDITOR.SELECTION_TEXT}if(q=="Control"){n=CKEDITOR.SELECTION_ELEMENT}if(o.createRange().parentElement){n=CKEDITOR.SELECTION_TEXT}}catch(p){}return(m.type=n)}:function(){var n=this._.cache;if(n.type){return n.type}var o=CKEDITOR.SELECTION_TEXT;var q=this.getNative();if(!q){o=CKEDITOR.SELECTION_NONE}else{if(q.rangeCount==1){var m=q.getRangeAt(0),p=m.startContainer;if(p==m.endContainer&&p.nodeType==1&&(m.endOffset-m.startOffset)==1&&h[p.childNodes[m.startOffset].nodeName.toLowerCase()]){o=CKEDITOR.SELECTION_ELEMENT}}}return(n.type=o)},getRanges:(function(){var m=CKEDITOR.env.ie?(function(){function n(p){return new CKEDITOR.dom.node(p).getIndex()}var o=function(y,q){y=y.duplicate();y.collapse(q);var D=y.parentElement(),C=D.ownerDocument;if(!D.hasChildNodes()){return{container:D,offset:0}}var B=D.children,r,F,s=y.duplicate(),E=0,x=B.length-1,z=-1,w,p;while(E<=x){z=Math.floor((E+x)/2);r=B[z];s.moveToElementText(r);w=s.compareEndPoints("StartToStart",y);if(w>0){x=z-1}else{if(w<0){E=z+1}else{if(CKEDITOR.env.ie9Compat&&r.tagName=="BR"){var u="cke_range_marker";y.execCommand("CreateBookmark",false,u);r=C.getElementsByName(u)[0];var t=n(r);D.removeChild(r);return{container:D,offset:t}}else{return{container:D,offset:n(r)}}}}}if(z==-1||z==B.length-1&&w<0){s.moveToElementText(D);s.setEndPoint("StartToStart",y);p=s.text.replace(/(\r\n|\r)/g,"\n").length;B=D.childNodes;if(!p){r=B[B.length-1];if(r.nodeType==CKEDITOR.NODE_ELEMENT){return{container:D,offset:B.length}}else{return{container:r,offset:r.nodeValue.length}}}var v=B.length;while(p>0){p-=B[--v].nodeValue.length}return{container:B[v],offset:-p}}else{s.collapse(w>0?true:false);s.setEndPoint(w>0?"StartToStart":"EndToStart",y);p=s.text.replace(/(\r\n|\r)/g,"\n").length;if(!p){return{container:D,offset:n(r)+(w>0?0:1)}}while(p>0){try{F=r[w>0?"previousSibling":"nextSibling"];p-=F.nodeValue.length;r=F}catch(A){return{container:D,offset:n(r)}}}return{container:r,offset:w>0?-p:r.nodeValue.length+p}}};return function(){var r=this.getNative(),w=r&&r.createRange(),x=this.getType(),v;if(!r){return[]}if(x==CKEDITOR.SELECTION_TEXT){v=new CKEDITOR.dom.range(this.document);var p=o(w,true);v.setStart(new CKEDITOR.dom.node(p.container),p.offset);p=o(w);v.setEnd(new CKEDITOR.dom.node(p.container),p.offset);if(v.endContainer.getPosition(v.startContainer)&CKEDITOR.POSITION_PRECEDING&&v.endOffset<=v.startContainer.getIndex()){v.collapse()}return[v]}else{if(x==CKEDITOR.SELECTION_ELEMENT){var q=[];for(var t=0;t<w.length;t++){var u=w.item(t),y=u.parentNode,s=0;v=new CKEDITOR.dom.range(this.document);for(;s<y.childNodes.length&&y.childNodes[s]!=u;s++){}v.setStart(new CKEDITOR.dom.node(y),s);v.setEnd(new CKEDITOR.dom.node(y),s+1);q.push(v)}return q}}return[]}})():function(){var n=[],o,s=this.document,r=this.getNative();if(!r){return n}if(!r.rangeCount){o=new CKEDITOR.dom.range(s);o.moveToElementEditStart(s.getBody());n.push(o)}for(var p=0;p<r.rangeCount;p++){var q=r.getRangeAt(p);o=new CKEDITOR.dom.range(s);o.setStart(new CKEDITOR.dom.node(q.startContainer),q.startOffset);o.setEnd(new CKEDITOR.dom.node(q.endContainer),q.endOffset);n.push(o)}return n};return function(y){var o=this._.cache;if(o.ranges&&!y){return o.ranges}else{if(!o.ranges){o.ranges=new CKEDITOR.dom.rangeList(m.call(this))}}if(y){var p=o.ranges;for(var s=0;s<p.length;s++){var t=p[s];var x=t.getCommonAncestor();if(x.isReadOnly()){p.splice(s,1)}if(t.collapsed){continue}if(t.startContainer.isReadOnly()){var u=t.startContainer;while(u){if(u.is("body")||!u.isReadOnly()){break}if(u.type==CKEDITOR.NODE_ELEMENT&&u.getAttribute("contentEditable")=="false"){t.setStartAfter(u)}u=u.getParent()}}var r=t.startContainer,z=t.endContainer,v=t.startOffset,w=t.endOffset,q=t.clone();if(r&&r.type==CKEDITOR.NODE_TEXT){if(v>=r.getLength()){q.setStartAfter(r)}else{q.setStartBefore(r)}}if(z&&z.type==CKEDITOR.NODE_TEXT){if(!w){q.setEndBefore(z)}else{q.setEndAfter(z)}}var n=new CKEDITOR.dom.walker(q);n.evaluator=function(B){if(B.type==CKEDITOR.NODE_ELEMENT&&B.isReadOnly()){var A=t.clone();t.setEndBefore(B);if(t.collapsed){p.splice(s--,1)}if(!(B.getPosition(q.endContainer)&CKEDITOR.POSITION_CONTAINS)){A.setStartAfter(B);if(!A.collapsed){p.splice(s+1,0,A)}}return true}return false};n.next()}}return o.ranges}})(),getStartElement:function(){var o=this._.cache;if(o.startElement!==undefined){return o.startElement}var q,r=this.getNative();switch(this.getType()){case CKEDITOR.SELECTION_ELEMENT:return this.getSelectedElement();case CKEDITOR.SELECTION_TEXT:var n=this.getRanges()[0];if(n){if(!n.collapsed){n.optimize();while(1){var p=n.startContainer,m=n.startOffset;if(m==(p.getChildCount?p.getChildCount():p.getLength())&&!p.isBlockBoundary()){n.setStartAfter(p)}else{break}}q=n.startContainer;if(q.type!=CKEDITOR.NODE_ELEMENT){return q.getParent()}q=q.getChild(n.startOffset);if(!q||q.type!=CKEDITOR.NODE_ELEMENT){q=n.startContainer}else{var s=q.getFirst();while(s&&s.type==CKEDITOR.NODE_ELEMENT){q=s;s=s.getFirst()}}}else{q=n.startContainer;if(q.type!=CKEDITOR.NODE_ELEMENT){q=q.getParent()}}q=q.$}}return o.startElement=(q?new CKEDITOR.dom.element(q):null)},getSelectedElement:function(){var n=this._.cache;if(n.selectedElement!==undefined){return n.selectedElement}var m=this;var o=CKEDITOR.tools.tryThese(function(){return m.getNative().createRange().item(0)},function(){var x,q,u=m.getRanges()[0],s=u.getCommonAncestor(1,1),z={table:1,ul:1,ol:1,dl:1};for(var y in z){if(x=s.getAscendant(y,1)){break}}if(x){var r=new CKEDITOR.dom.range(this.document);r.setStartAt(x,CKEDITOR.POSITION_AFTER_START);r.setEnd(u.startContainer,u.startOffset);var v=CKEDITOR.tools.extend(z,CKEDITOR.dtd.$listItem,CKEDITOR.dtd.$tableContent),p=new CKEDITOR.dom.walker(r),w=function(A,t){return function(C,D){if(C.type==CKEDITOR.NODE_TEXT&&(!CKEDITOR.tools.trim(C.getText())||C.getParent().data("cke-bookmark"))){return true}var B;if(C.type==CKEDITOR.NODE_ELEMENT){B=C.getName();if(B=="br"&&t&&C.equals(C.getParent().getBogus())){return true}if(D&&B in v||B in CKEDITOR.dtd.$removeEmpty){return true}}A.halted=1;return false}};p.guard=w(p);if(p.checkBackward()&&!p.halted){p=new CKEDITOR.dom.walker(r);r.setStart(u.endContainer,u.endOffset);r.setEndAt(x,CKEDITOR.POSITION_BEFORE_END);p.guard=w(p,1);if(p.checkForward()&&!p.halted){q=x.$}}}if(!q){throw 0}return q},function(){var p=m.getRanges()[0],s,r;for(var q=2;q&&!((s=p.getEnclosedNode())&&(s.type==CKEDITOR.NODE_ELEMENT)&&h[s.getName()]&&(r=s));q--){p.shrink(CKEDITOR.SHRINK_ELEMENT)}return r.$});return n.selectedElement=(o?new CKEDITOR.dom.element(o):null)},getSelectedText:function(){var m=this._.cache;if(m.selectedText!==undefined){return m.selectedText}var o="",n=this.getNative();if(this.getType()==CKEDITOR.SELECTION_TEXT){o=CKEDITOR.env.ie?n.createRange().text:n.toString()}return(m.selectedText=o)},lock:function(){this.getRanges();this.getStartElement();this.getSelectedElement();this.getSelectedText();this._.cache.nativeSel={};this.isLocked=1;this.document.setCustomData("cke_locked_selection",this)},unlock:function(o){var p=this.document,m=p.getCustomData("cke_locked_selection");if(m){p.setCustomData("cke_locked_selection",null);if(o){var q=m.getSelectedElement(),n=!q&&m.getRanges();this.isLocked=0;this.reset();p.getBody().focus();if(q){this.selectElement(q)}else{this.selectRanges(n)}}}if(!m||!o){this.isLocked=0;this.reset()}},reset:function(){this._.cache={}},selectElement:function(n){if(this.isLocked){var m=new CKEDITOR.dom.range(this.document);m.setStartBefore(n);m.setEndAfter(n);this._.cache.selectedElement=n;this._.cache.startElement=n;this._.cache.ranges=new CKEDITOR.dom.rangeList(m);this._.cache.type=CKEDITOR.SELECTION_ELEMENT;return}m=new CKEDITOR.dom.range(n.getDocument());m.setStartBefore(n);m.setEndAfter(n);m.select();this.document.fire("selectionchange");this.reset()},selectRanges:function(m){if(this.isLocked){this._.cache.selectedElement=null;this._.cache.startElement=m[0]&&m[0].getTouchedStartNode();this._.cache.ranges=new CKEDITOR.dom.rangeList(m);this._.cache.type=CKEDITOR.SELECTION_TEXT;return}if(CKEDITOR.env.ie){if(m.length>1){var w=m[m.length-1];m[0].setEnd(w.endContainer,w.endOffset);m.length=1}if(m[0]){m[0].select()}this.reset()}else{var n=this.getNative();if(!n){return}if(m.length){n.removeAllRanges();CKEDITOR.env.webkit&&i(this.document)}for(var q=0;q<m.length;q++){if(q<m.length-1){var p=m[q],x=m[q+1],z=p.clone();z.setStart(p.endContainer,p.endOffset);z.setEnd(x.startContainer,x.startOffset);if(!z.collapsed){z.shrink(CKEDITOR.NODE_ELEMENT,true);var t=z.getCommonAncestor(),A=z.getEnclosedNode();if(t.isReadOnly()||A&&A.isReadOnly()){x.setStart(p.startContainer,p.startOffset);m.splice(q--,1);continue}}}var s=m[q];var u=this.document.$.createRange();var o=s.startContainer;if(s.collapsed&&(CKEDITOR.env.opera||(CKEDITOR.env.gecko&&CKEDITOR.env.version<10900))&&o.type==CKEDITOR.NODE_ELEMENT&&!o.getChildCount()){o.appendText("")}if(s.collapsed&&CKEDITOR.env.webkit&&f(s)){var y=l(this.document);s.insertNode(y);var r=y.getNext();if(r&&!y.getPrevious()&&r.type==CKEDITOR.NODE_ELEMENT&&r.getName()=="br"){i(this.document);s.moveToPosition(r,CKEDITOR.POSITION_BEFORE_START)}else{s.moveToPosition(y,CKEDITOR.POSITION_AFTER_END)}}u.setStart(s.startContainer.$,s.startOffset);try{u.setEnd(s.endContainer.$,s.endOffset)}catch(v){if(v.toString().indexOf("NS_ERROR_ILLEGAL_VALUE")>=0){s.collapse(1);u.setEnd(s.endContainer.$,s.endOffset)}else{throw v}}n.addRange(u)}this.document.fire("selectionchange");this.reset()}},createBookmarks:function(m){return this.getRanges().createBookmarks(m)},createBookmarks2:function(m){return this.getRanges().createBookmarks2(m)},selectBookmarks:function(p){var m=[];for(var o=0;o<p.length;o++){var n=new CKEDITOR.dom.range(this.document);n.moveToBookmark(p[o]);m.push(n)}this.selectRanges(m);return this},getCommonAncestor:function(){var n=this.getRanges(),o=n[0].startContainer,m=n[n.length-1].endContainer;return o.getCommonAncestor(m)},scrollIntoView:function(){var m=this.getStartElement();m.scrollIntoView()}}})();(function(){var a=CKEDITOR.dom.walker.whitespaces(true),b=/\ufeff|\u00a0/,c={table:1,tbody:1,tr:1};CKEDITOR.dom.range.prototype.select=CKEDITOR.env.ie?function(f){var g=this.collapsed,n,k,d;var h=this.getEnclosedNode();if(h){try{d=this.document.$.body.createControlRange();d.addElement(h.$);d.select();return}catch(o){}}if(this.startContainer.type==CKEDITOR.NODE_ELEMENT&&this.startContainer.getName() in c||this.endContainer.type==CKEDITOR.NODE_ELEMENT&&this.endContainer.getName() in c){this.shrink(CKEDITOR.NODE_ELEMENT,true)}var m=this.createBookmark();var e=m.startNode;var j;if(!g){j=m.endNode}d=this.document.$.body.createTextRange();d.moveToElementText(e.$);d.moveStart("character",1);if(j){var l=this.document.$.body.createTextRange();l.moveToElementText(j.$);d.setEndPoint("EndToEnd",l);d.moveEnd("character",-1)}else{var i=e.getNext(a);n=(!(i&&i.getText&&i.getText().match(b))&&(f||!e.hasPrevious()||(e.getPrevious().is&&e.getPrevious().is("br"))));k=this.document.createElement("span");k.setHtml("&#65279;");k.insertBefore(e);if(n){this.document.createText("\ufeff").insertBefore(e)}}this.setStartBefore(e);e.remove();if(g){if(n){d.moveStart("character",-1);d.select();this.document.$.selection.clear()}else{d.select()}this.moveToPosition(k,CKEDITOR.POSITION_BEFORE_START);k.remove()}else{this.setEndBefore(j);j.remove();d.select()}this.document.fire("selectionchange")}:function(){this.document.getSelection().selectRanges([this])}})();