/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 * 
 * (c) Copyright 2009-2014 SAP AG. All rights reserved
 */
sap.ui.define(['jquery.sap.global','sap/ui/base/Interface','sap/ui/base/Object','jquery.sap.act','jquery.sap.encoder'],function(q,I,B){"use strict";var c=["renderControl","write","writeEscaped","translate","writeAcceleratorKey","writeControlData","writeElementData","writeAttribute","writeAttributeEscaped","addClass","writeClasses","addStyle","writeStyles","writeAccessibilityState","writeIcon","getConfiguration","getHTML"];var N=["render","flush","destroy"];var R=B.extend("sap.ui.core.RenderManager",{constructor:function(){B.apply(this,arguments);this.aBuffer=[];this.aRenderedControls=[];this.aStyleStack=[{}]},metadata:{publicMethods:c.concat(N)}});R.prototype.getRendererInterface=function(){var i=new I(this,c);this.getRendererInterface=q.sap.getter(i);return i};R.prototype.destroy=function(){this.aBuffer=[];this.aRenderedControls=[];this.aStyleStack=[{}]};R.prototype.getConfiguration=function(){return sap.ui.getCore().getConfiguration()};R.prototype.getRenderer=function(C){return R.getRenderer(C)};R.prototype.renderControl=function(C){if(!C){return}if(!this.aRenderStack){this.aRenderStack=new Array()}if(this.aRenderStack&&this.aRenderStack.length>0){q.sap.measure.pause(this.aRenderStack[0]+"---renderControl")}else if(C.getParent()&&C.getParent().getMetadata().getName()=="sap.ui.core.UIArea"){q.sap.measure.pause(C.getParent().getId()+"---rerender")}this.aRenderStack.unshift(C.getId());q.sap.measure.start(C.getId()+"---renderControl","Rendering of "+C.getMetadata().getName());var b=this.aBuffer.length;var o={};if(C.aCustomStyleClasses&&C.aCustomStyleClasses.length>0){o.aCustomStyleClasses=C.aCustomStyleClasses}this.aStyleStack.push(o);q.sap.measure.pause(C.getId()+"---renderControl");var r=this.getRenderer(C);q.sap.measure.resume(C.getId()+"---renderControl");this._bLocked=true;try{var e=q.Event("BeforeRendering");e.srcControl=C;C._handleEvent(e)}finally{this._bLocked=false}var a=C.aBindParameters;if(a&&a.length>0){var d=q(C.getDomRef());if(d&&d[0]){for(var i=0;i<a.length;i++){var p=a[i];d.unbind(p.sEventType,p.fnProxy)}}}r.render(this.getRendererInterface(),C);this.aStyleStack.pop();this.aRenderedControls.push(C);if(C.getUIArea&&C.getUIArea()){C.getUIArea()._onControlRendered(C)}C.bOutput=this.aBuffer.length!=b;q.sap.measure.end(C.getId()+"---renderControl");this.aRenderStack.shift();if(this.aRenderStack&&this.aRenderStack.length>0){q.sap.measure.resume(this.aRenderStack[0]+"---renderControl")}else if(C.getParent()&&C.getParent().getMetadata().getName()=="sap.ui.core.UIArea"){q.sap.measure.resume(C.getParent().getId()+"---rerender")}};R.prototype.getHTML=function(C){var t=this.aBuffer;var r=this.aBuffer=[];this.renderControl(C);this.aBuffer=t;return r.join("")};(function(){var s=function(){var C=sap.ui.getCore();var F=C.getCurrentFocusedControlId(),o=null,a=null;if(F){var b=C.getElementById(F);if(b){o=b.getFocusInfo();a=b.getFocusDomRef()}}return{focusedControlId:F,focusInfo:o,focusDomRef:a}};var f=function(r,a,S){for(var i=0,b=a.length;i<b;i++){var C=a[i];if(C.bOutput){r._bLocked=true;try{var E=q.Event("AfterRendering");E.srcControl=C;q.sap.measure.start(C.getId()+"---AfterRendering","AfterRendering of "+C.getMetadata().getName());C._handleEvent(E);q.sap.measure.end(C.getId()+"---AfterRendering")}finally{r._bLocked=false}}}try{if(S&&S.focusedControlId){var F=sap.ui.getCore().getElementById(S.focusedControlId);if(F&&F.getFocusDomRef()!=S.focusDomRef){F.applyFocusInfo(S.focusInfo)}}}catch(e){q.sap.log.warning("Problems while restore focus after rendering: "+e,null,r)}for(var i=0,b=a.length;i<b;i++){var C=a[i],d=C.aBindParameters;if(d&&d.length>0){var D=q(C.getDomRef());if(D&&D[0]){for(var j=0;j<d.length;j++){var p=d[j];D.bind(p.sEventType,p.fnProxy)}}}}};R.prototype.flush=function(t,d,v){if(this.bRendererMode){q.sap.log.info("Flush must not be called from control renderers. Call ignored.",null,this);return}if(!d&&(typeof v!=="number")&&!v){R.preserveContent(t)}var S=s();var h=R.prepareHTML5(this.aBuffer.join(""));if(this._fPutIntoDom){this._fPutIntoDom(t,h)}else{for(var i=0;i<this.aRenderedControls.length;i++){var o=this.aRenderedControls[i].getDomRef();if(o&&!R.isPreservedContent(o)){if(R.isInlineTemplate(o)){q(o).empty()}else{q(o).remove()}}}if(typeof v==="number"){if(v<=0){q(t).prepend(h)}else{var $=q(t).children().eq(v-1);if($.length===1){$.after(h)}else{q(t).append(h)}}}else if(!v){q(t).html(h)}else{q(t).append(h)}}f(this,this.aRenderedControls,S);this.aRenderedControls=[];this.aBuffer=[];this.aStyleStack=[{}];q.sap.act.refresh()};R.prototype.render=function(C,t){if(this.bRendererMode){q.sap.log.info("Render must not be called from control renderers. Call ignored.",null,this);return}if(this._bLocked){q.sap.log.error("Render must not be called within Before or After Rendering Phase. Call ignored.",null,this);return}this.aBuffer=[];this.renderControl(C);this._fPutIntoDom=function(T,h){if(C&&t){var o=C.getDomRef();if(R.isPreservedContent(o)){o=q.sap.byId("sap-ui-dummy-"+C.getId())[0]||o}var n=o&&o.parentNode!=t;var a=function(){var j=q(t);if(t.innerHTML==""){j.html(h)}else{j.append(h)}};if(n){if(!R.isPreservedContent(o)){if(R.isInlineTemplate(o)){q(o).empty()}else{q(o).remove()}}if(h){a()}}else{if(h){if(o){if(R.isInlineTemplate(o)){q(o).html(h)}else{q(o).replaceWith(h)}}else{a()}}else{if(R.isInlineTemplate(o)){q(o).empty()}else{q(o).remove()}}}}};this.flush(t,true);this._fPutIntoDom=null}}());R.getRenderer=function(C){return C.getMetadata().getRenderer()};R.initHTML5Support=function(){if(!!sap.ui.Device.browser.internet_explorer&&(sap.ui.Device.browser.version===8||sap.ui.Device.browser.version===7)){var t=["article","aside","audio","canvas","command","datalist","details","figcaption","figure","footer","header","hgroup","keygen","mark","meter","nav","output","progress","rp","rt","ruby","section","source","summary","template","time","video","wbr"];for(var i=0;i<t.length;i++){document.createElement(t[i])}var r=new RegExp("<("+t.join("|")+")(\\s|>)","i");var d=null;R.prepareHTML5=function(h){if(h&&h.match(r)){if(!d){d=document.createElement('div');d.style.display='none'}var e=d.cloneNode(true);document.body.appendChild(e);e.innerHTML=h.replace(/^\s\s*/,'').replace(/\s\s*$/,'');document.body.removeChild(e);return e.childNodes}return h};q.sap.log.info("IE8 HTML5 support activated")}else{q.sap.log.info("no IE8 HTML5 support required");R.prepareHTML5=function(h){return h}}};R.forceRepaint=function(d){var D=typeof d=="string"?q.sap.domById(d):d;if(D){q.sap.log.debug("forcing a repaint for "+(D.id||String(D)));var o=D.style.display;var a=document.activeElement;D.style.display="none";D.offsetHeight;D.style.display=o;if(document.activeElement!==a){q.sap.focus(a)}}};(function(){var a="sap-ui-preserve";var A="data-sap-ui-preserve";function g(){var $=q("#"+a);if($.length===0){$=q("<DIV/>",{role:"application",id:a}).addClass("sapUiHidden").css("width","0").css("height","0").css("overflow","hidden").appendTo(document.body)}return $}R.preserveContent=function(r,p,P){sap.ui.getCore().getEventBus().publish("sap.ui","__preserveContent",{domNode:r});var $=g();function d(e){e.each(function(i,f){if(f.id===a||sap.ui.getCore().isStaticAreaRef(f)){return}var h=q(f);if(h.attr(A)){if(f===r){var j=q("<DIV/>",{id:"sap-ui-dummy-"+f.id}).addClass("sapUiHidden");j.insertBefore(h)}$.append(h)}else if(P&&f.id){R.markPreservableContent(h,f.id);$.append(h);return}if(!h.attr("data-sap-ui-area")){d(h.children())}})}q.sap.measure.start(r.id+"---preserveContent","preserveContent for "+r.id);d(p?q(r):q(r).children());q.sap.measure.end(r.id+"---preserveContent")};R.findPreservedContent=function(i){var $=g(),d=$.children("["+A+"='"+i.replace(/(:|\.)/g,'\\$1')+"']");return d};R.markPreservableContent=function($,i){$.attr(A,i)};R.isPreservedContent=function(d){return(d&&d.getAttribute(A)&&d.parentNode&&d.parentNode.id==a)};R.getPreserveAreaRef=function(){return g()[0]};var b="data-sap-ui-template";R.markInlineTemplate=function($){$.attr(b,"")};R.isInlineTemplate=function(d){return(d&&d.hasAttribute(b))}}());R.prototype.write=function(t){this.aBuffer.push.apply(this.aBuffer,arguments);return this};R.prototype.writeEscaped=function(t,l){if(l){var L=t.split("\n");for(var i=0;i<L.length;i++){L[i]=q.sap.encodeHTML(L[i])}t=L.join("<br>")}else{t=q.sap.encodeHTML(t)}this.aBuffer.push(t);return this};R.prototype.translate=function(k){};R.prototype.writeAcceleratorKey=function(){return this};R.prototype.addStyle=function(n,v){if(v!==undefined&&v!==null){var s=this.aStyleStack[this.aStyleStack.length-1];if(!s.aStyle){s.aStyle=[]}s.aStyle.push(n+":"+v)}return this};R.prototype.writeStyles=function(){var s=this.aStyleStack[this.aStyleStack.length-1];if(s.aStyle){this.write(" style=\""+s.aStyle.join(";")+"\" ")}s.aStyle=null;return this};R.prototype.addClass=function(n){if(n){var s=this.aStyleStack[this.aStyleStack.length-1];if(!s.aClasses){s.aClasses=[]}s.aClasses.push(n)}return this};R.prototype.writeClasses=function(e){var s=this.aStyleStack[this.aStyleStack.length-1];var C=e?e.aCustomStyleClasses:((e===false)?[]:s.aCustomStyleClasses);if(s.aClasses||C){var a=[].concat(s.aClasses||[],C||[]);a.sort();a=q.map(a,function(n,i){return(i==0||n!=a[i-1])?n:null});this.write(" class=\"",a.join(" "),"\" ")}if(!e){s.aCustomStyleClasses=null}s.aClasses=null;return this};R.prototype.writeControlData=function(C){this.writeElementData(C);return this};R.prototype.writeElementData=function(e){var s=e.getId();if(s){this.writeAttribute("id",s).writeAttribute("data-sap-ui",s)}var d=e.getCustomData();var l=d.length;for(var i=0;i<l;i++){var D=d[i];if(D.getWriteToDom()){var k=D.getKey();if(typeof D.getValue()==="string"){if((sap.ui.core.ID.isValid(k))&&(k.indexOf(":")==-1)&&(k.indexOf("sap-ui")!==0)){this.writeAttributeEscaped("data-"+k,D.getValue())}else{q.sap.log.error("CustomData with key "+k+" should be written to HTML of "+this+" but the key is not valid (must be a valid sap.ui.core.ID without any colon and may not start with 'sap-ui').")}}else{q.sap.log.error("CustomData with key "+k+" should be written to HTML of "+this+" but the value is not a string.")}}}return this};R.prototype.writeAttribute=function(n,v){this.write(" ",n,"=\"",v,"\"");return this};R.prototype.writeAttributeEscaped=function(n,v){this.writeAttribute(n,q.sap.escapeHTML(String(v)));return this};R.prototype.writeAccessibilityState=function(e,P){if(!sap.ui.getCore().getConfiguration().getAccessibility()){return this}if(arguments.length==1&&!(e instanceof sap.ui.core.Element)){P=e;e=null}var a={};if(e!=null){var m=e.getMetadata();m._enrichChildInfos();var b=function(E,A,v){var o=m.getAllProperties()[E];if(o&&e[o._sGetter]()===v){a[A]="true"}};var d=function(E,A){var o=m.getAllAssociations()[E];if(o&&o.multiple){var j=e[o._sGetter]();if(j.length>0){a[A]=j.join(" ")}}};b("editable","readonly",false);b("enabled","disabled",false);b("visible","hidden",false);b("required","required",true);b("selected","selected",true);b("checked","checked",true);d("ariaDescribedBy","describedby");d("ariaLabelledBy","labelledby")}if(P){var f=function(v){var t=typeof(v);return v===null||v===""||t==="number"||t==="string"||t==="boolean"};var g={};var x,h,t,i;for(x in P){h=P[x];if(f(h)){g[x]=h}else if(typeof(h)==="object"&&f(h.value)){i="";if(h.append&&(x==="describedby"||x==="labelledby")){i=a[x]?a[x]+" ":""}g[x]=i+h.value}}q.extend(a,g)}if(e instanceof sap.ui.core.Element&&e.getParent()&&e.getParent().enhanceAccessibilityState){e.getParent().enhanceAccessibilityState(e,a)}for(var p in a){if(a[p]!=null&&a[p]!==""){this.writeAttributeEscaped(p==="role"?p:"aria-"+p,a[p])}}return this};R.prototype.writeIcon=function(u,C,a){q.sap.require("sap.ui.core.IconPool");var i=sap.ui.core.IconPool.isIconURI(u),s=i?"<span ":"<img ",t=(sap.ui.Device.browser.internet_explorer&&sap.ui.Device.browser.version<9),b,p,o;if(typeof C==="string"){C=[C]}if(i){o=sap.ui.core.IconPool.getIconInfo(u);if(!o){q.sap.log.error("An unregistered icon: "+u+" is used in sap.ui.core.RenderManager's writeIcon method.");return}if(!C){C=[]}C.push("sapUiIcon");if(!o.suppressMirroring){C.push("sapUiIconMirrorInRTL")}}this.write(s);if(q.isArray(C)&&C.length){b=C.join(" ");this.write("class=\""+b+"\" ")}if(i){if(!a){a={}}if(!t){a["data-sap-ui-icon-content"]=o.content}this.write("style=\"font-family: "+o.fontFamily+";\" ")}else{a=q.extend({role:"presentation",alt:"",src:u},a)}if(typeof a==="object"){for(p in a){if(a.hasOwnProperty(p)){this.writeAttributeEscaped(p,a[p])}}}this.write(i?">":"/>");if(i){t&&this.write(o.content);this.write("</span>")}};return R},true);
