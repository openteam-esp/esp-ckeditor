(function(){function a(e,g){var f=g.block||g.blockLimit;if(!f||f.getName()=="body"){return CKEDITOR.TRISTATE_OFF}if(f.getAscendant("blockquote",true)){return CKEDITOR.TRISTATE_ON}return CKEDITOR.TRISTATE_OFF}function d(e){var f=e.editor;if(f.readOnly){return}var g=f.getCommand("esp_blockquote");g.state=a(f,e.data.path);g.fire("state")}function c(g){for(var e=0,f=g.getChildCount(),h;e<f&&(h=g.getChild(e));e++){if(h.type==CKEDITOR.NODE_ELEMENT&&h.isBlockBoundary()){return false}}return true}var b={exec:function(g){var j=g.getCommand("esp_blockquote").state,x=g.getSelection(),q=x&&x.getRanges(true)[0];if(!q){return}var k=x.createBookmarks();if(CKEDITOR.env.ie){var f=k[0].startNode,v=k[0].endNode,h;if(f&&f.getParent().getName()=="blockquote"){h=f;while((h=h.getNext())){if(h.type==CKEDITOR.NODE_ELEMENT&&h.isBlockBoundary()){f.move(h,true);break}}}if(v&&v.getParent().getName()=="blockquote"){h=v;while((h=h.getPrevious())){if(h.type==CKEDITOR.NODE_ELEMENT&&h.isBlockBoundary()){v.move(h);break}}}}var t=q.createIterator(),n;t.enlargeBr=g.config.enterMode!=CKEDITOR.ENTER_BR;if(j==CKEDITOR.TRISTATE_OFF){g.openDialog("esp_blockquote")}else{if(j==CKEDITOR.TRISTATE_ON){var w=[],p={};while((n=t.getNextParagraph())){var y=null,r=null;while(n.getParent()){if(n.getParent().getName()=="blockquote"){y=n.getParent();r=n;break}n=n.getParent()}if(y&&r&&!r.getCustomData("blockquote_moveout")){w.push(r);CKEDITOR.dom.element.setMarker(p,r,"blockquote_moveout",true)}}CKEDITOR.dom.element.clearAllMarkers(p);var e=[],o=[];p={};while(w.length>0){var u=w.shift();bqBlock=u.getParent();if(!u.getPrevious()){u.remove().insertBefore(bqBlock)}else{if(!u.getNext()){u.remove().insertAfter(bqBlock)}else{u.breakParent(u.getParent());o.push(u.getNext())}}if(!bqBlock.getCustomData("blockquote_processed")){o.push(bqBlock);CKEDITOR.dom.element.setMarker(p,bqBlock,"blockquote_processed",true)}e.push(u)}CKEDITOR.dom.element.clearAllMarkers(p);for(i=o.length-1;i>=0;i--){bqBlock=o[i];if(c(bqBlock)){bqBlock.remove()}}if(g.config.enterMode==CKEDITOR.ENTER_BR){var m=true;while(e.length){u=e.shift();if(u.getName()=="div"){docFrag=new CKEDITOR.dom.documentFragment(g.document);var s=m&&u.getPrevious()&&!(u.getPrevious().type==CKEDITOR.NODE_ELEMENT&&u.getPrevious().isBlockBoundary());if(s){docFrag.append(g.document.createElement("br"))}var l=u.getNext()&&!(u.getNext().type==CKEDITOR.NODE_ELEMENT&&u.getNext().isBlockBoundary());while(u.getFirst()){u.getFirst().remove().appendTo(docFrag)}if(l){docFrag.append(g.document.createElement("br"))}docFrag.replace(u);m=false}}}}}x.selectBookmarks(k);g.focus()}};CKEDITOR.plugins.add("esp_blockquote",{init:function(f){var e="esp_blockquote";f.addCommand(e,b);f.ui.addButton("Esp_Blockquote",{label:f.lang.blockquote,command:e});f.on("selectionChange",d);CKEDITOR.dialog.add(e,CKEDITOR.getUrl(this.path+"dialogs/esp_blockquote.js"))},requires:["domiterator"]})})();