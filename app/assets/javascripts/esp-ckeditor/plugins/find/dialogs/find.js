(function(){var h;function e(i){return i.type==CKEDITOR.NODE_TEXT&&i.getLength()>0&&(!h||!i.isReadOnly())}function d(i){return !(i.type==CKEDITOR.NODE_ELEMENT&&i.isBlockBoundary(CKEDITOR.tools.extend({},CKEDITOR.dtd.$empty,CKEDITOR.dtd.$nonEditable)))}var f=function(){return{textNode:this.textNode,offset:this.offset,character:this.textNode?this.textNode.getText().charAt(this.offset):null,hitMatchBoundary:this._.matchBoundary}};var a=["find","replace"],c=[["txtFindFind","txtFindReplace"],["txtFindCaseChk","txtReplaceCaseChk"],["txtFindWordChk","txtReplaceWordChk"],["txtFindCyclic","txtReplaceCyclic"]];function g(k){var j,n,p,q;j=k==="find"?1:0;n=1-j;var o,m=c.length;for(o=0;o<m;o++){p=this.getContentElement(a[j],c[o][j]);q=this.getContentElement(a[n],c[o][n]);q.setValue(p.getValue())}}var b=function(t,n){var u=new CKEDITOR.style(CKEDITOR.tools.extend({attributes:{"data-cke-highlight":1},fullMatch:1,ignoreReadonly:1,childRule:function(){return 0}},t.config.find_highlight,true));var v=function(A,y){var z=this;var B=new CKEDITOR.dom.walker(A);B.guard=y?d:function(C){!d(C)&&(z._.matchBoundary=true)};B.evaluator=e;B.breakOnFalse=1;if(A.startContainer.type==CKEDITOR.NODE_TEXT){this.textNode=A.startContainer;this.offset=A.startOffset-1}this._={matchWord:y,walker:B,matchBoundary:false}};v.prototype={next:function(){return this.move()},back:function(){return this.move(true)},move:function(z){var y=this.textNode;if(y===null){return f.call(this)}this._.matchBoundary=false;if(y&&z&&this.offset>0){this.offset--;return f.call(this)}else{if(y&&this.offset<y.getLength()-1){this.offset++;return f.call(this)}else{y=null;while(!y){y=this._.walker[z?"previous":"next"].call(this._.walker);if(this._.matchWord&&!y||this._.walker._.end){break}}this.textNode=y;if(y){this.offset=z?y.getLength()-1:0}else{this.offset=0}}}return f.call(this)}};var r=function(y,z){this._={walker:y,cursors:[],rangeLength:z,highlightRange:null,isMatched:0}};r.prototype={toDomRange:function(){var y=new CKEDITOR.dom.range(t.document);var A=this._.cursors;if(A.length<1){var C=this._.walker.textNode;if(C){y.setStartAfter(C)}else{return null}}else{var B=A[0],z=A[A.length-1];y.setStart(B.textNode,B.offset);y.setEnd(z.textNode,z.offset+1)}return y},updateFromDomRange:function(y){var A,z=new v(y);this._.cursors=[];do{A=z.next();if(A.character){this._.cursors.push(A)}}while(A.character);this._.rangeLength=this._.cursors.length},setMatched:function(){this._.isMatched=true},clearMatched:function(){this._.isMatched=false},isMatched:function(){return this._.isMatched},highlight:function(){if(this._.cursors.length<1){return}if(this._.highlightRange){this.removeHighlight()}var y=this.toDomRange(),A=y.createBookmark();u.applyToRange(y);y.moveToBookmark(A);this._.highlightRange=y;var z=y.startContainer;if(z.type!=CKEDITOR.NODE_ELEMENT){z=z.getParent()}z.scrollIntoView();this.updateFromDomRange(y)},removeHighlight:function(){if(!this._.highlightRange){return}var y=this._.highlightRange.createBookmark();u.removeFromRange(this._.highlightRange);this._.highlightRange.moveToBookmark(y);this.updateFromDomRange(this._.highlightRange);this._.highlightRange=null},isReadOnly:function(){if(!this._.highlightRange){return 0}return this._.highlightRange.startContainer.isReadOnly()},moveBack:function(){var y=this._.walker.back(),z=this._.cursors;if(y.hitMatchBoundary){this._.cursors=z=[]}z.unshift(y);if(z.length>this._.rangeLength){z.pop()}return y},moveNext:function(){var y=this._.walker.next(),z=this._.cursors;if(y.hitMatchBoundary){this._.cursors=z=[]}z.push(y);if(z.length>this._.rangeLength){z.shift()}return y},getEndCharacter:function(){var y=this._.cursors;if(y.length<1){return null}return y[y.length-1].character},getNextCharacterRange:function(y){var z,B,A=this._.cursors;if((z=A[A.length-1])&&z.textNode){B=new v(x(z))}else{B=this._.walker}return new r(B,y)},getCursors:function(){return this._.cursors}};function x(A,y){var z=new CKEDITOR.dom.range();z.setStart(A.textNode,(y?A.offset:A.offset+1));z.setEndAt(t.document.getBody(),CKEDITOR.POSITION_BEFORE_END);return z}function s(z){var y=new CKEDITOR.dom.range();y.setStartAt(t.document.getBody(),CKEDITOR.POSITION_AFTER_START);y.setEnd(z.textNode,z.offset);return y}var q=0,p=1,j=2;var m=function(B,z){var y=[-1];if(z){B=B.toLowerCase()}for(var A=0;A<B.length;A++){y.push(y[A]+1);while(y[A+1]>0&&B.charAt(A)!=B.charAt(y[A+1]-1)){y[A+1]=y[y[A+1]-1]+1}}this._={overlap:y,state:0,ignoreCase:!!z,pattern:B}};m.prototype={feedCharacter:function(y){if(this._.ignoreCase){y=y.toLowerCase()}while(true){if(y==this._.pattern.charAt(this._.state)){this._.state++;if(this._.state==this._.pattern.length){this._.state=0;return j}return p}else{if(!this._.state){return q}else{this._.state=this._.overlap[this._.state]}}}return null},reset:function(){this._.state=0}};var i=/[.,"'?!;: \u0085\u00a0\u1680\u280e\u2028\u2029\u202f\u205f\u3000]/;var l=function(z){if(!z){return true}var y=z.charCodeAt(0);return(y>=9&&y<=13)||(y>=8192&&y<=8202)||i.test(z)};var k={searchRange:null,matchRange:null,find:function(J,z,E,L,A,D){if(!this.matchRange){this.matchRange=new r(new v(this.searchRange),J.length)}else{this.matchRange.removeHighlight();this.matchRange=this.matchRange.getNextCharacterRange(J.length)}var G=new m(J,!z),B=q,H="%";while(H!==null){this.matchRange.moveNext();while((H=this.matchRange.getEndCharacter())){B=G.feedCharacter(H);if(B==j){break}if(this.matchRange.moveNext().hitMatchBoundary){G.reset()}}if(B==j){if(E){var y=this.matchRange.getCursors(),I=y[y.length-1],K=y[0];var C=new v(s(K),true),F=new v(x(I),true);if(!(l(C.back().character)&&l(F.next().character))){continue}}this.matchRange.setMatched();if(A!==false){this.matchRange.highlight()}return true}}this.matchRange.clearMatched();this.matchRange.removeHighlight();if(L&&!D){this.searchRange=w(1);this.matchRange=null;return arguments.callee.apply(this,Array.prototype.slice.call(arguments).concat([true]))}return false},replaceCounter:0,replace:function(C,B,D,y,A,H,z){h=1;var I=0;if(this.matchRange&&this.matchRange.isMatched()&&!this.matchRange._.isReplaced&&!this.matchRange.isReadOnly()){this.matchRange.removeHighlight();var G=this.matchRange.toDomRange();var F=t.document.createText(D);if(!z){var E=t.getSelection();E.selectRanges([G]);t.fire("saveSnapshot")}G.deleteContents();G.insertNode(F);if(!z){E.selectRanges([G]);t.fire("saveSnapshot")}this.matchRange.updateFromDomRange(G);if(!z){this.matchRange.highlight()}this.matchRange._.isReplaced=true;this.replaceCounter++;I=1}else{I=this.find(B,y,A,H,!z)}h=0;return I}};function w(B){var z,A=t.getSelection(),y=t.document.getBody();if(A&&!B){z=A.getRanges()[0].clone();z.collapse(true)}else{z=new CKEDITOR.dom.range();z.setStartAt(y,CKEDITOR.POSITION_AFTER_START)}z.setEndAt(y,CKEDITOR.POSITION_BEFORE_END);return z}var o=t.lang.findAndReplace;return{title:o.title,resizable:CKEDITOR.DIALOG_RESIZE_NONE,minWidth:350,minHeight:170,buttons:[CKEDITOR.dialog.cancelButton],contents:[{id:"find",label:o.find,title:o.find,accessKey:"",elements:[{type:"hbox",widths:["230px","90px"],children:[{type:"text",id:"txtFindFind",label:o.findWhat,isChanged:false,labelLayout:"horizontal",accessKey:"F"},{type:"button",id:"btnFind",align:"left",style:"width:100%",label:o.find,onClick:function(){var y=this.getDialog();if(!k.find(y.getValueOf("find","txtFindFind"),y.getValueOf("find","txtFindCaseChk"),y.getValueOf("find","txtFindWordChk"),y.getValueOf("find","txtFindCyclic"))){alert(o.notFoundMsg)}}}]},{type:"fieldset",label:CKEDITOR.tools.htmlEncode(o.findOptions),style:"margin-top:29px",children:[{type:"vbox",padding:0,children:[{type:"checkbox",id:"txtFindCaseChk",isChanged:false,label:o.matchCase},{type:"checkbox",id:"txtFindWordChk",isChanged:false,label:o.matchWord},{type:"checkbox",id:"txtFindCyclic",isChanged:false,"default":true,label:o.matchCyclic}]}]}]},{id:"replace",label:o.replace,accessKey:"M",elements:[{type:"hbox",widths:["230px","90px"],children:[{type:"text",id:"txtFindReplace",label:o.findWhat,isChanged:false,labelLayout:"horizontal",accessKey:"F"},{type:"button",id:"btnFindReplace",align:"left",style:"width:100%",label:o.replace,onClick:function(){var y=this.getDialog();if(!k.replace(y,y.getValueOf("replace","txtFindReplace"),y.getValueOf("replace","txtReplace"),y.getValueOf("replace","txtReplaceCaseChk"),y.getValueOf("replace","txtReplaceWordChk"),y.getValueOf("replace","txtReplaceCyclic"))){alert(o.notFoundMsg)}}}]},{type:"hbox",widths:["230px","90px"],children:[{type:"text",id:"txtReplace",label:o.replaceWith,isChanged:false,labelLayout:"horizontal",accessKey:"R"},{type:"button",id:"btnReplaceAll",align:"left",style:"width:100%",label:o.replaceAll,isChanged:false,onClick:function(){var z=this.getDialog();var y;k.replaceCounter=0;k.searchRange=w(1);if(k.matchRange){k.matchRange.removeHighlight();k.matchRange=null}t.fire("saveSnapshot");while(k.replace(z,z.getValueOf("replace","txtFindReplace"),z.getValueOf("replace","txtReplace"),z.getValueOf("replace","txtReplaceCaseChk"),z.getValueOf("replace","txtReplaceWordChk"),false,true)){}if(k.replaceCounter){alert(o.replaceSuccessMsg.replace(/%1/,k.replaceCounter));t.fire("saveSnapshot")}else{alert(o.notFoundMsg)}}}]},{type:"fieldset",label:CKEDITOR.tools.htmlEncode(o.findOptions),children:[{type:"vbox",padding:0,children:[{type:"checkbox",id:"txtReplaceCaseChk",isChanged:false,label:o.matchCase},{type:"checkbox",id:"txtReplaceWordChk",isChanged:false,label:o.matchWord},{type:"checkbox",id:"txtReplaceCyclic",isChanged:false,"default":true,label:o.matchCyclic}]}]}]}],onLoad:function(){var y=this;var B,z;var A=0;this.on("hide",function(){A=0});this.on("show",function(){A=1});this.selectPage=CKEDITOR.tools.override(this.selectPage,function(C){return function(E){C.call(y,E);var D=y._.tabs[E];var H,G,F;G=E==="find"?"txtFindFind":"txtFindReplace";F=E==="find"?"txtFindWordChk":"txtReplaceWordChk";B=y.getContentElement(E,G);z=y.getContentElement(E,F);if(!D.initialized){H=CKEDITOR.document.getById(B._.inputId);D.initialized=true}if(A){g.call(this,E)}}})},onShow:function(){k.searchRange=w();var A=this.getParentEditor().getSelection().getSelectedText(),y=(n=="find"?"txtFindFind":"txtFindReplace");var z=this.getContentElement(n,y);z.setValue(A);z.select();this.selectPage(n);this[(n=="find"&&this._.editor.readOnly?"hide":"show")+"Page"]("replace")},onHide:function(){var y;if(k.matchRange&&k.matchRange.isMatched()){k.matchRange.removeHighlight();t.focus();y=k.matchRange.toDomRange();if(y){t.getSelection().selectRanges([y])}}delete k.matchRange},onFocus:function(){if(n=="replace"){return this.getContentElement("replace","txtFindReplace")}else{return this.getContentElement("find","txtFindFind")}}}};CKEDITOR.dialog.add("find",function(i){return b(i,"find")});CKEDITOR.dialog.add("replace",function(i){return b(i,"replace")})})();