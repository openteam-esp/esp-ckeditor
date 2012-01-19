CKEDITOR.dialog.add("esp_video",function(f){var a=f.lang.esp_video;function e(j,l){var k=this.getValue();if(!k&&this.id=="id"){k=h()}j.setAttribute(this.id,k);if(!k){return}switch(this.id){case"poster":l.backgroundImage="url("+k+")";break;case"width":l.width=k+"px";break;case"height":l.height=k+"px";break}}function b(n,o,k){var j=this.id.match(/(\w+)(\d)/),p=j[1],m=parseInt(j[2],10);var l=k[m]||(k[m]={});l[p]=this.getValue()}function g(j){if(j){this.setValue(j.getAttribute(this.id))}else{if(this.id=="id"){this.setValue(h())}}}function c(n,k){var j=this.id.match(/(\w+)(\d)/),o=j[1],m=parseInt(j[2],10);var l=k[m];if(!l){return}this.setValue(l[o])}function h(){var j=new Date();return"video"+j.getFullYear()+j.getMonth()+j.getDate()+j.getHours()+j.getMinutes()+j.getSeconds()}var d=function(){var j=this.previewImage;j.removeListener("load",d);j.removeListener("error",i);j.removeListener("abort",i);this.setValueOf("info","width",j.$.width);this.setValueOf("info","height",j.$.height)};var i=function(){var j=this.previewImage;j.removeListener("load",d);j.removeListener("error",i);j.removeListener("abort",i)};return{title:a.dialogTitle,minWidth:400,minHeight:140,onShow:function(){this.fakeImage=this.videoNode=null;this.previewImage=f.document.createElement("img");var j=this.getSelectedElement();if(j&&j.data("cke-real-element-type")&&j.data("cke-real-element-type")=="video"){this.fakeImage=j;var l=f.restoreRealElement(j),k=[];k.push({src:l.getAttribute("src")});this.videoNode=l;this.setupContent(l,k)}else{this.setupContent(null,[])}},onOk:function(){var o=null;if(!this.fakeImage){o=CKEDITOR.dom.element.createFromHtml("<cke:video></cke:video>",f.document);o.setAttributes({controls:"controls",src:this.getValueOf("info","src0")})}else{o=this.videoNode}var q={},m=[];this.commitContent(o,q,m);var k="",j="",n=a.linkTemplate||"",l=a.fallbackTemplate||"";j=n.replace("%src%",this.getValueOf("info","src0")).replace("%type%",this.getValueOf("info","src0").split("/").pop());o.setHtml(k+l.replace("%links%",j));var p=f.createFakeElement(o,"cke_video","video",false);p.setStyles(q);if(this.fakeImage){p.replace(this.fakeImage);f.getSelection().selectElement(p)}else{f.insertElement(p)}},onHide:function(){if(this.previewImage){this.previewImage.removeListener("load",d);this.previewImage.removeListener("error",i);this.previewImage.removeListener("abort",i);this.previewImage.remove();this.previewImage=null}},contents:[{id:"info",elements:[{type:"hbox",widths:["320px","80px"],children:[{type:"text",id:"src0",label:a.sourceVideo,commit:b,setup:c},{type:"button",id:"browse",hidden:"true",style:"display:inline-block;margin-top:10px;",filebrowser:{action:"Browse",target:"info:src0",url:f.config.filebrowserVideoBrowseUrl||f.config.filebrowserBrowseUrl},label:f.lang.esp_video.browseServer}]},{type:"hbox",widths:["50%","50%"],children:[{type:"text",id:"width",label:f.lang.common.width,"default":512,validate:CKEDITOR.dialog.validate.notEmpty(a.widthRequired),commit:e,setup:g},{type:"text",id:"height",label:f.lang.common.height,"default":410,validate:CKEDITOR.dialog.validate.notEmpty(a.heightRequired),commit:e,setup:g}]},{type:"hbox",widths:["320px","80px"],children:[{type:"text",id:"poster",label:a.poster,commit:e,setup:g,onChange:function(){var j=this.getDialog(),l=this.getValue();if(l.length>0){j=this.getDialog();var k=j.previewImage;k.on("load",d,j);k.on("error",i,j);k.on("abort",i,j);k.setAttribute("src",l)}}},{type:"button",id:"browse",hidden:"true",style:"display:inline-block;margin-top:10px;",filebrowser:{action:"Browse",target:"info:poster",url:f.config.filebrowserImageBrowseUrl||f.config.filebrowserBrowseUrl},label:f.lang.esp_video.browseServer}]}]}]}});