(function(){function c(l){if(!l||l.type!=CKEDITOR.NODE_ELEMENT||l.getName()!="form"){return[]}var n=[],m=["style","className"];for(var k=0;k<m.length;k++){var j=m[k];var g=l.$.elements.namedItem(j);if(g){var h=new CKEDITOR.dom.element(g);n.push([h,h.nextSibling]);h.remove()}}return n}function e(j,l){if(!j||j.type!=CKEDITOR.NODE_ELEMENT||j.getName()!="form"){return}if(l.length>0){for(var g=l.length-1;g>=0;g--){var k=l[g][0];var h=l[g][1];if(h){k.insertBefore(h)}else{k.appendTo(j)}}}}function d(j,i){var k=c(j);var h={};var g=j.$;if(!i){h["class"]=g.className||"";g.className=""}h.inline=g.style.cssText||"";if(!i){g.style.cssText="position: static; overflow: visible"}e(k);return h}function a(i,h){var j=c(i);var g=i.$;if("class" in h){g.className=h["class"]}if("inline" in h){g.style.cssText=h.inline}e(j)}function f(l){var k=CKEDITOR.instances;for(var j in k){var h=k[j];if(h.mode=="wysiwyg"&&!h.readOnly){var g=h.document.getBody();g.setAttribute("contentEditable",false);g.setAttribute("contentEditable",true)}}if(l.focusManager.hasFocus){l.toolbox.focus();l.focus()}}function b(g){if(!CKEDITOR.env.ie||CKEDITOR.env.version>6){return null}var h=CKEDITOR.dom.element.createFromHtml('<iframe frameborder="0" tabindex="-1" src="javascript:void((function(){document.open();'+(CKEDITOR.env.isCustomDomain()?"document.domain='"+this.getDocument().$.domain+"';":"")+'document.close();})())" style="display:block;position:absolute;z-index:-1;progid:DXImageTransform.Microsoft.Alpha(opacity=0);"></iframe>');return g.append(h,true)}CKEDITOR.plugins.add("maximize",{init:function(m){var g=m.lang;var i=CKEDITOR.document,l=i.getWindow();var n,o;var p;var k;function h(){var q=l.getViewPaneSize();k&&k.setStyles({width:q.width+"px",height:q.height+"px"});m.resize(q.width,q.height,null,true)}var j=CKEDITOR.TRISTATE_OFF;m.addCommand("maximize",{modes:{wysiwyg:!CKEDITOR.env.iOS,source:!CKEDITOR.env.iOS},readOnly:1,editorFocus:false,exec:function(){var q=m.container.getChild(1);var t=m.getThemeSpace("contents");if(m.mode=="wysiwyg"){var B=m.getSelection();n=B&&B.getRanges();o=l.getScrollPosition()}else{var y=m.textarea.$;n=!CKEDITOR.env.ie&&[y.selectionStart,y.selectionEnd];o=[y.scrollLeft,y.scrollTop]}if(this.state==CKEDITOR.TRISTATE_OFF){l.on("resize",h);p=l.getScrollPosition();var r=m.container;while((r=r.getParent())){r.setCustomData("maximize_saved_styles",d(r));r.setStyle("z-index",m.config.baseFloatZIndex-1)}t.setCustomData("maximize_saved_styles",d(t,true));q.setCustomData("maximize_saved_styles",d(q,true));var C={overflow:CKEDITOR.env.webkit?"":"hidden",width:0,height:0};i.getDocumentElement().setStyles(C);!CKEDITOR.env.gecko&&i.getDocumentElement().setStyle("position","fixed");!(CKEDITOR.env.gecko&&CKEDITOR.env.quirks)&&i.getBody().setStyles(C);CKEDITOR.env.ie?setTimeout(function(){l.$.scrollTo(0,0)},0):l.$.scrollTo(0,0);q.setStyle("position",CKEDITOR.env.gecko&&CKEDITOR.env.quirks?"fixed":"absolute");q.$.offsetLeft;q.setStyles({"z-index":m.config.baseFloatZIndex-1,left:"0px",top:"0px"});k=b(q);q.addClass("cke_maximized");h();var u=q.getDocumentPosition();q.setStyles({left:(-1*u.x)+"px",top:(-1*u.y)+"px"});CKEDITOR.env.gecko&&f(m)}else{if(this.state==CKEDITOR.TRISTATE_ON){l.removeListener("resize",h);var z=[t,q];for(var w=0;w<z.length;w++){a(z[w],z[w].getCustomData("maximize_saved_styles"));z[w].removeCustomData("maximize_saved_styles")}r=m.container;while((r=r.getParent())){a(r,r.getCustomData("maximize_saved_styles"));r.removeCustomData("maximize_saved_styles")}CKEDITOR.env.ie?setTimeout(function(){l.$.scrollTo(p.x,p.y)},0):l.$.scrollTo(p.x,p.y);q.removeClass("cke_maximized");if(CKEDITOR.env.webkit){q.setStyle("display","inline");setTimeout(function(){q.setStyle("display","block")},0)}if(k){k.remove();k=null}m.fire("resize")}}this.toggleState();var x=this.uiItems[0];if(x){var A=(this.state==CKEDITOR.TRISTATE_OFF)?g.maximize:g.minimize;var s=m.element.getDocument().getById(x._.id);s.getChild(1).setHtml(A);s.setAttribute("title",A);s.setAttribute("href",'javascript:void("'+A+'");')}if(m.mode=="wysiwyg"){if(n){CKEDITOR.env.gecko&&f(m);m.getSelection().selectRanges(n);var v=m.getSelection().getStartElement();v&&v.scrollIntoView(true)}else{l.$.scrollTo(o.x,o.y)}}else{if(n){y.selectionStart=n[0];y.selectionEnd=n[1]}y.scrollLeft=o[0];y.scrollTop=o[1]}n=o=null;j=this.state},canUndo:false});m.ui.addButton("Maximize",{label:g.maximize,command:"maximize"});m.on("mode",function(){var q=m.getCommand("maximize");q.setState(q.state==CKEDITOR.TRISTATE_DISABLED?CKEDITOR.TRISTATE_DISABLED:j)},null,null,100)}})})();