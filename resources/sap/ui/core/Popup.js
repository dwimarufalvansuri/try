/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 * 
 * (c) Copyright 2009-2014 SAP AG. All rights reserved
 */
sap.ui.define(['jquery.sap.global','sap/ui/base/EventProvider','sap/ui/base/Object','./Control','./IntervalTrigger','./RenderManager','./UIArea','jquery.sap.script'],function(q,E,B,C,I,R,U){"use strict";var P=E.extend("sap.ui.core.Popup",{constructor:function(c,m,s,a){E.apply(this);this._id=q.sap.uid();this.bOpen=false;this.eOpenState=sap.ui.core.OpenState.CLOSED;if(c){this.setContent(c)}this._oDefaultPosition={my:P.Dock.CenterCenter,at:P.Dock.CenterCenter,of:document,offset:"0 0",collision:"flip"};this._oPosition=q.extend({},this._oDefaultPosition);this._bModal=!!m;this._oPreviousFocus=null;this._sInitialFocusId=null;this._bShadow=typeof(s)==="boolean"?s:true;this._bAutoClose=!!a;this._aAutoCloseAreas;this._animations={open:null,close:null};this._durations={open:"fast",close:"fast"};this._iZIndex=-1;this._oBlindLayer=null;if(this.touchEnabled){this._fAutoCloseHandler=function(e){if(e.isMarked("delayedMouseEvent")||e.isMarked("cancelAutoClose")){return}if(this.eOpenState===sap.ui.core.OpenState.CLOSING||this.eOpenState===sap.ui.core.OpenState.CLOSED){return}var d=e.target,p=this._$().get(0),b=q.contains(p,d),f=false,g=false,i;if(this._aAutoCloseAreas){for(i=0;i<this._aAutoCloseAreas.length;i++){if(q.sap.containsOrEquals(this._aAutoCloseAreas[i],d)){f=true;break}}}if(this._aFocusableArea){for(i=0;i<this._aFocusableArea.length;i++){if(q.sap.containsOrEquals(q.sap.domById(this._aFocusableArea[i]),d)){g=true;break}}}if(!(b||f||g)){this.close()}}}},metadata:{publicMethods:["open","close","setContent","getContent","setPosition","setShadow","setModal","setAutoClose","isOpen","getAutoClose","getOpenState","setAnimations","setDurations","attachOpened","attachClosed","detachOpened","detachClosed"]}});P._activateBlindLayer=true;P.blStack=[];P.M_EVENTS={opened:'opened',closed:'closed'};P.Dock={BeginTop:"begin top",BeginCenter:"begin center",BeginBottom:"begin bottom",LeftTop:"left top",LeftCenter:"left center",LeftBottom:"left bottom",CenterTop:"center top",CenterCenter:"center center",CenterBottom:"center bottom",RightTop:"right top",RightCenter:"right center",RightBottom:"right bottom",EndTop:"end top",EndCenter:"end center",EndBottom:"end bottom"};P.prototype.touchEnabled=sap.ui.Device.support.touch||q.sap.simulateMobileOnDesktop;P.prototype.restoreFocus=!sap.ui.Device.support.touch&&!q.sap.simulateMobileOnDesktop;P.prototype.attachOpened=function(f,l){this.attachEvent("opened",f,l);return this};P.prototype.attachClosed=function(f,l){this.attachEvent("closed",f,l);return this};P.prototype.detachOpened=function(f,l){this.detachEvent("opened",f,l);return this};P.prototype.detachClosed=function(f,l){this.detachEvent("closed",f,l);return this};B.extend("sap.ui.core.Popup.Layer",{constructor:function(){var d=this.getDomString();this._$Ref=q(d).appendTo(sap.ui.getCore().getStaticAreaRef())}});P.Layer.prototype.init=function(r,z){this._$Ref.css("visibility","visible").css("z-index",z);this.update(r,z);this._$Ref.insertAfter(r).show()};P.Layer.prototype.update=function(r,z){var o=r.rect();this._$Ref.css("left",o.left).css("top",o.top);if(r.css("right")!="auto"&&r.css("right")!="inherit"){this._$Ref.css("right",r.css("right")).css("width","auto")}else{this._$Ref.css("width",o.width).css("right","auto")}if(r.css("bottom")!="auto"&&r.css("bottom")!="inherit"){this._$Ref.css("bottom",r.css("bottom")).css("height","auto")}else{this._$Ref.css("height",o.height).css("bottom","auto")}if(typeof(z)==="number"){this._$Ref.css("z-index",z)}};P.Layer.prototype.reset=function(){this._$Ref.hide().css("visibility","hidden").appendTo(sap.ui.getCore().getStaticAreaRef())};P.Layer.prototype.getDomString=function(){q.sap.log.error("sap.ui.core.Popup.Layer: getDomString function must be overwritten!");return""};P.Layer.extend("sap.ui.core.Popup.BlindLayer",{constructor:function(){P.Layer.apply(this)}});P.BlindLayer.prototype.getDomString=function(){return"<div class=\"sapUiBliLy\" id=\"sap-ui-blindlayer-"+q.sap.uid()+"\"><iframe scrolling=\"no\" src=\"javascript:''\"	tabIndex=\"-1\"></iframe></div>"};P.prototype.oBlindLayerPool=new sap.ui.base.ObjectPool(P.BlindLayer);P.Layer.extend("sap.ui.core.Popup.ShieldLayer",{constructor:function(){P.Layer.apply(this)}});P.ShieldLayer.prototype.getDomString=function(){return"<div class=\"sapUiPopupShield\" id=\"sap-ui-shieldlayer-"+q.sap.uid()+"\"></div>"};P.prototype.oShieldLayerPool=new sap.ui.base.ObjectPool(P.ShieldLayer);(function(){var l=0;P.getLastZIndex=function(){return l};P.prototype.getLastZIndex=function(){return P.getLastZIndex()};P.getNextZIndex=function(){return(l+=10)};P.prototype.getNextZIndex=function(){return P.getNextZIndex()}}());P.prototype.open=function(d,m,a,o,b,c,f){if(this.eOpenState!=sap.ui.core.OpenState.CLOSED){return}this.eOpenState=sap.ui.core.OpenState.OPENING;var s=sap.ui.getCore().getStaticAreaRef();s=sap.ui.getCore().getUIArea(s);this._bContentAddedToStatic=false;if(this.oContent instanceof C&&!this.oContent.getParent()){s.addContent(this.oContent,true);this._bContentAddedToStatic=true}if(this.oContent.getUIArea){var A=this.oContent.getUIArea();if(A===null){q.sap.log.warning("The Popup content is NOT connected with an UIArea and may not work properly!")}else if(P._bEnableUIAreaCheck&&A.getRootNode().id!==s.getRootNode().id){q.sap.log.warning("The Popup content is NOT connected with the static-UIArea and may not work properly!")}}if(typeof(d)=="string"){f=c;c=b;b=o;o=a;a=m;m=d;d=-1}if(d===undefined){d=-1}if(this.restoreFocus){this._oPreviousFocus=P.getCurrentFocusInfo()}var r=this._$(true);var e="fast";if((d===0)||(d>0)){e=d}else if((this._durations.open===0)||(this._durations.open>0)){e=this._durations.open}var _;if(m||a||o||b||c){_=this._createPosition(m,a,o,b,c)}else{_=this._oPosition}if(!_.of){_.of=this._oPosition.of||document}this._iZIndex=this._iZIndex===this.getLastZIndex()?this._iZIndex:this.getNextZIndex();var S=sap.ui.getCore().getStaticAreaRef();r.css("position","absolute").css("visibility","hidden");if(!(r[0].parentNode==S)){r.appendTo(S)}r.css("z-index",this._iZIndex);q.sap.log.debug("position popup content "+r.attr("id")+" at "+(window.JSON?JSON.stringify(_.at):String(_.at)));this._applyPosition(_);if(f!==undefined){this.setFollowOf(f)}var t=this;if(sap.ui.Device.os.ios&&sap.ui.Device.support.touch){if(this._oTopShieldLayer){q.sap.clearDelayedCall(this._iTopShieldRemoveTimer);this._iTopShieldRemoveTimer=null}else{this._oTopShieldLayer=this.oShieldLayerPool.borrowObject(r,this._iZIndex+1)}this._iTopShieldRemoveTimer=q.sap.delayedCall(500,this,function(){this.oShieldLayerPool.returnObject(this._oTopShieldLayer);this._oTopShieldLayer=null;this._iTopShieldRemoveTimer=null})}var O=function(){r.css("display","block");if(t._bModal||t._bAutoClose||t._sInitialFocusId){var g=null;if(t._sInitialFocusId){var h=sap.ui.getCore().byId(t._sInitialFocusId);if(h){g=h.getFocusDomRef()}g=g||q.sap.domById(t._sInitialFocusId)}q.sap.focus(g||r.firstFocusableDomRef())}t.eOpenState=sap.ui.core.OpenState.OPEN;if(t.getFollowOf()){P.DockTrigger.addListener(P.checkDocking,t)}t._updateBlindLayer();if(!!sap.ui.Device.browser.internet_explorer&&sap.ui.Device.browser.version==9){q.sap.delayedCall(0,t,function(){t.fireEvent(P.M_EVENTS.opened)})}else{t.fireEvent(P.M_EVENTS.opened)}};r.toggleClass("sapUiShd",this._bShadow).hide().css("visibility","visible");if(e==0){this.bOpen=true;O.apply()}else{if(this._animations.open){this._animations.open.call(null,r,e,O)}else{r.fadeIn(e,O)}}if(!!sap.ui.Device.browser.internet_explorer&&P._activateBlindLayer){this._oBlindLayer=this.oBlindLayerPool.borrowObject(r,this._iZIndex-1)}if(this._bModal){this._showBlockLayer()}if(this.oContent instanceof sap.ui.core.Element){this.oContent.addDelegate(this)}this.bOpen=true;if(this._bModal||this._bAutoClose){this.fEventHandler=q.proxy(this.onFocusEvent,this);var p=r;if(document.addEventListener&&!sap.ui.Device.browser.internet_explorer){document.addEventListener("focus",this.fEventHandler,true);p.get(0).addEventListener("blur",this.fEventHandler,true);if(this._aAutoCloseAreas){for(var i=0;i<this._aAutoCloseAreas.length;i++){this._aAutoCloseAreas[i].addEventListener("blur",this.fEventHandler,true)}}}else{q(document).bind("activate."+this._id,this.fEventHandler);p.bind("deactivate."+this._id,this.fEventHandler);if(this._aAutoCloseAreas){for(var i=0;i<this._aAutoCloseAreas.length;i++){q(this._aAutoCloseAreas[i]).bind("deactivate."+this._id,this.fEventHandler)}}}}if(this.touchEnabled&&!this._bModal&&this._bAutoClose){q(document).on("touchstart mousedown",q.proxy(this._fAutoCloseHandler,this))}if(this._oBlindLayer){this._resizeListenerId=sap.ui.core.ResizeHandler.register(this._$().get(0),q.proxy(this.onresize,this))}};P.prototype.onFocusEvent=function(b){var e=q.event.fix(b);var t=(e.type=="focus"||e.type=="activate")?"focus":"blur";var c=false;if(t=="focus"){var d=this._$().get(0);if(d){c=d==e.target||q.contains(d,e.target);if(!c&&this._aAutoCloseAreas){for(var i=0;i<this._aAutoCloseAreas.length;i++){c=this._aAutoCloseAreas[i]==e.target||q.contains(this._aAutoCloseAreas[i],e.target);if(c){break}}}if(!c&&this._aFocusableArea){var j=this._aFocusableArea.length;for(i=0;i<j;i++){if(q.sap.domById(this._aFocusableArea[i])){c=e.target.id===this._aFocusableArea[i]||q.contains(q.sap.domById(this._aFocusableArea[i]),e.target);if(c){break}}}}q.sap.log.debug("focus event on "+e.target.id+", contains: "+c);if(this._bModal&&!c){var T=(P.getLastZIndex()==this._iZIndex);if(T){if(!sap.ui.Device.support.touch||q(e.target).is(":input")){var D=this.oLastBlurredElement?this.oLastBlurredElement:d;q.sap.focus(D)}}}else if(this._bAutoClose&&c&&this._sTimeoutId){if(this._sTimeoutId){q.sap.clearDelayedCall(this._sTimeoutId);this._sTimeoutId=null}}}}else if(t=="blur"){q.sap.log.debug("blur event on "+e.target.id);if(this._bModal){this.oLastBlurredElement=e.target}else if(this._bAutoClose){if(!this.touchEnabled&&!this._sTimeoutId){this._sTimeoutId=q.sap.delayedCall(0,this,"close")}}}};P.prototype.setInitialFocusId=function(i){this._sInitialFocusId=i};P.prototype.close=function(d){if(this.eOpenState==sap.ui.core.OpenState.CLOSED||this.eOpenState==sap.ui.core.OpenState.CLOSING){return}var r="fast";if((d===0)||(d>0)){r=d}else if((this._durations.close===0)||(this._durations.close>0)){r=this._durations.close}if(r===0&&this.eOpenState==sap.ui.core.OpenState.OPENING){return}this.eOpenState=sap.ui.core.OpenState.CLOSING;if(this.getFollowOf()){P.DockTrigger.removeListener(P.checkDocking,this)}if(this._aFocusableArea){delete this._aFocusableArea}if(this._bFocusableListenersRegistered){delete this._bFocusableListenersRegistered;var e="sap.ui.core.Popup.addFocusableContent-"+this._id;sap.ui.getCore().getEventBus().unsubscribe("sap.ui",e,this._addFocusableArea,this);e="sap.ui.core.Popup.removeFocusableContent-"+this._id;sap.ui.getCore().getEventBus().unsubscribe("sap.ui",e,this._removeFocusableArea,this)}if(this.oContent&&this._bContentAddedToStatic){sap.ui.getCore().getEventBus().publish("sap.ui","__beforePopupClose",{domNode:this._$().get(0)});var s=sap.ui.getCore().getStaticAreaRef();s=sap.ui.getCore().getUIArea(s);s.removeContent(s.indexOfContent(this.oContent),true)}this._bContentAddedToStatic=false;this._sTimeoutId=null;if(this.fEventHandler){var p=this._$();if(document.removeEventListener&&!sap.ui.Device.browser.internet_explorer){document.removeEventListener("focus",this.fEventHandler,true);p.get(0).removeEventListener("blur",this.fEventHandler,true);if(this._aAutoCloseAreas){for(var i=0;i<this._aAutoCloseAreas.length;i++){this._aAutoCloseAreas[i].removeEventListener("blur",this.fEventHandler,true)}}}else{q(document).unbind("activate."+this._id,this.fEventHandler);p.unbind("deactivate."+this._id,this.fEventHandler);if(this._aAutoCloseAreas){for(var i=0;i<this._aAutoCloseAreas.length;i++){q(this._aAutoCloseAreas[i]).unbind("deactivate."+this._id,this.fEventHandler)}}}this.fEventHandler=null}if(this.touchEnabled){if(!this._bModal&&this._bAutoClose){q(document).off("touchstart mousedown",this._fAutoCloseHandler)}}if(this.oContent instanceof sap.ui.core.Element){this.oContent.removeDelegate(this)}var $=this._$();if(this._oBlindLayer){this.oBlindLayerPool.returnObject(this._oBlindLayer)}this._oBlindLayer=null;var t=this;if(sap.ui.Device.os.ios&&sap.ui.Device.support.touch){if(this._oBottomShieldLayer){q.sap.clearDelayedCall(this._iBottomShieldRemoveTimer);this._iBottomShieldRemoveTimer=null}else{this._oBottomShieldLayer=this.oShieldLayerPool.borrowObject($,this._iZIndex-3)}this._iBottomShieldRemoveTimer=q.sap.delayedCall(500,this,function(){this.oShieldLayerPool.returnObject(this._oBottomShieldLayer);this._oBottomShieldLayer=null;this._iBottomShieldRemoveTimer=null})}var c=function(){q($).hide().css("visibility","inherit").css("left","0px").css("top","0px").css("right","");if(t.restoreFocus){if(t._bModal){P.applyFocusInfo(t._oPreviousFocus);t._oPreviousFocus=null;t.oLastBlurredElement=null}}t.bOpen=false;t.eOpenState=sap.ui.core.OpenState.CLOSED;t.fireEvent(P.M_EVENTS.closed)};if(r==0){c.apply()}else{if(this._animations.close){this._animations.close.call(null,$,r,c)}else{$.fadeOut(r,c)}}if(this._bModal){this._hideBlockLayer()}if(this._resizeListenerId){sap.ui.core.ResizeHandler.deregister(this._resizeListenerId);this._resizeListenerId=null}};P.getCurrentFocusInfo=function(){var _=null;var f=sap.ui.getCore().getCurrentFocusedControlId();if(f){var F=sap.ui.getCore().getControl(f);_={'sFocusId':f,'oFocusInfo':F?F.getFocusInfo():{}}}else{try{var e=document.activeElement;if(e){_={'sFocusId':e.id,'oFocusedElement':e,'oFocusInfo':{}}}}catch(a){_=null}}return _};P.applyFocusInfo=function(p){if(p){var f=sap.ui.getCore().getControl(p.sFocusId);if(f){f.applyFocusInfo(p.oFocusInfo)}else{var e=q.sap.domById(p.sFocusId)||p.oFocusedElement;q.sap.focus(e)}}};P.prototype.setContent=function(c){this.oContent=c;return this};P.prototype.getContent=function(){return this.oContent};P.prototype.setPosition=function(m,a,o,b,c){this._oPosition=this._createPosition(m,a,o,b,c);if(this.eOpenState!=sap.ui.core.OpenState.CLOSED){this._applyPosition(this._oPosition);this._oBlindLayer&&this._oBlindLayer.update(this._$())}return this};P.prototype._createPosition=function(m,a,o,b,c){var n=false;if(m&&(m.indexOf("+")>=0||m.indexOf("-")>=0)){n=true;if(b&&b!="0 0"){q.sap.log.warning("offset used in my and in offset, the offset value will be ignored","sap.ui.core.Popup","setPosition")}b=null}var p=q.extend({},this._oDefaultPosition,{"my":m||this._oDefaultPosition.my,"at":a||this._oDefaultPosition.at,"of":o,"offset":b,"collision":c});if(!q.ui.version){if(P._bNewOffset==null){P._bNewOffset=true;if(!(sap.ui.Device.browser.internet_explorer&&sap.ui.Device.browser.version==8&&q.sap.Version(q().jquery).compareTo("1.8.1")<0)){var d=q(document.createElement("div"));d.position({of:window,using:function(e,f){P._bNewOffset=(f!==undefined)}})}}}if(P._bNewOffset||q.sap.Version(q.ui.version).compareTo("1.8.23")>0){if(b&&b!="0 0"){var M=p.my.split(" ");var O=b.split(" ");var s=[parseInt(O[0])<0?"":"+",parseInt(O[1])<0?"":"+"];p.my=M[0]+s[0]+O[0]+" "+M[1]+s[1]+O[1];p.offset=null}}else if(n){var M=p.my.split(" ");var O=["",""];var i=M[0].indexOf("+");if(i<0){i=M[0].indexOf("-")}if(i>=0){O[0]=M[0].slice(i);M[0]=M[0].slice(0,i)}i=M[1].indexOf("+");if(i<0){i=M[1].indexOf("-")}if(i>=0){O[1]=M[1].slice(i);M[1]=M[1].slice(0,i)}p.my=M[0]+" "+M[1];p.offset=O[0]+" "+O[1]}return p};P.prototype._getPositionOffset=function(){var o=[];if(this._oPosition.my&&(this._oPosition.my.indexOf("+")>=0||this._oPosition.my.indexOf("-")>=0)){var m=this._oPosition.my.split(" ");var i=m[0].indexOf("+");if(i<0){i=m[0].indexOf("-")}if(i>=0){o[0]=m[0].slice(i)}i=m[1].indexOf("+");if(i<0){i=m[1].indexOf("-")}if(i>=0){o[1]=m[1].slice(i)}}else if(this._oPosition.offset){o=this._oPosition.offset.split(" ")}return o};P.prototype._applyPosition=function(p){var r=sap.ui.getCore().getConfiguration().getRTL();var $=this._$();var a=p.at;if(typeof(a)==="string"){$.css("display","block").position(this._resolveReference(this._convertPositionRTL(p,r)));this._fixPositioning(p,r)}else if(sap.ui.core.CSSSize.isValid(a.left)&&sap.ui.core.CSSSize.isValid(a.top)){$.css("left",a.left).css("top",a.top)}else if(sap.ui.core.CSSSize.isValid(a.right)&&sap.ui.core.CSSSize.isValid(a.top)){$.css("right",a.right).css("top",a.top)}else if(typeof(a.left)==="number"&&typeof(a.top)==="number"){var d=$[0];if(d&&d.style.right){var w=$.outerWidth();$.css("right",(document.documentElement.clientWidth-(a.left+w))+"px").css("top",a.top+"px")}else{$.css("left",a.left+"px").css("top",a.top+"px")}}this._oLastPosition=p;this._oLastOfRect=this._calcOfRect(p.of)};P.prototype._calcOfRect=function(o){return q(o instanceof sap.ui.core.Element?o.getDomRef():o).rect()};P.prototype._convertPositionRTL=function(p,r){var f=q.extend({},p);if(r){var n=false;if(f.my&&(f.my.indexOf("+")>=0||f.my.indexOf("-")>=0)){n=true}if((f.offset||n)&&((f.my.indexOf("begin")>-1)||(f.my.indexOf("end")>-1))&&((f.at.indexOf("begin")>-1)||(f.at.indexOf("end")>-1))){if(n){var m=f.my.split(" ");if(m.length==2){f.my="";if(m[0]){if(m[0].indexOf("begin")>-1||m[0].indexOf("end")>-1){if(m[0].indexOf("+")>-1){m[0]=m[0].replace("+","-")}else if(m[0].indexOf("-")>-1){m[0]=m[0].replace("-","+")}}f.my=m[0]}if(m[1]){if(m[1].indexOf("begin")>-1||m[1].indexOf("end")>-1){if(m[1].indexOf("+")>-1){m[1]=m[1].replace("+","-")}else if(m[1].indexOf("-")>-1){m[1]=m[1].replace("-","+")}}if(m[0]){f.my=f.my+" "}f.my=f.my+m[1]}}}else{f.offset=this._mirrorOffset(f.offset)}}f.my=f.my.replace("begin","right").replace("end","left");f.at=f.at.replace("begin","right").replace("end","left")}else{f.my=f.my.replace("end","right").replace("begin","left");f.at=f.at.replace("end","right").replace("begin","left")}return f};P.prototype._mirrorOffset=function(o){var O=q.trim(o).split(/\s/);var p=parseInt(O[0],10);return(-p)+" "+O[O.length-1]};P.prototype._fixPositioning=function(p,r){var m=p.my;if(typeof(m)==="string"){if(r&&((m.indexOf("right")>-1)||(m.indexOf("begin")>-1)||(m.indexOf("center")>-1))){var $=this._$();var a=q(window).width()-$.outerWidth()-$.offset().left;$.css("right",a+"px").css("left","")}else if((m.indexOf("right")>-1)||(m.indexOf("end")>-1)){var $=this._$();var a=q(window).width()-$.outerWidth()-$.offset().left;$.css("right",a+"px").css("left","")}}};P.prototype._resolveReference=function(p){var r=p;if(p.of instanceof sap.ui.core.Element){r=q.extend({},p,{of:p.of.getDomRef()})}return r};P.prototype.setShadow=function(s){this._bShadow=s;if(this.eOpenState!=sap.ui.core.OpenState.CLOSED){this._$().toggleClass("sapUiShd",s)}return this};P.prototype.setModal=function(m,M){var o=this._bModal;this._bModal=m;this._sModalCSSClass=M;if(this.isOpen()){if(o!==m){if(m){this._showBlockLayer()}else{this._hideBlockLayer()}if(this.touchEnabled&&this._bAutoClose){if(!m){q(document).on("touchstart mousedown",q.proxy(this._fAutoCloseHandler,this))}else{q(document).off("touchstart mousedown",this._fAutoCloseHandler)}}}}return this};P.prototype.setAutoClose=function(a){if(this.touchEnabled&&this.isOpen()&&this._bAutoClose!==a){if(!this._bModal){if(a){q(document).on("touchstart mousedown",q.proxy(this._fAutoCloseHandler,this))}else{q(document).off("touchstart mousedown",this._fAutoCloseHandler)}}}this._bAutoClose=a;return this};P.prototype.setAutoCloseAreas=function(a){this._aAutoCloseAreas=a;return this};P.prototype.setAnimations=function(o,c){if(o&&(typeof(o)=="function")){this._animations.open=o}if(c&&(typeof(c)=="function")){this._animations.close=c}return this};P.prototype.setDurations=function(o,c){if((o>0)||(o===0)){this._durations.open=o}if((c>0)||(c===0)){this._durations.close=c}return this};P.prototype.setFollowOf=function(f){var u=false;P.DockTrigger.removeListener(P.checkDocking,this);if(typeof(f)==="function"){this._bFollowOf=true;this._followOfHandler=f;u=true}else if(typeof(f)==="boolean"){this._bFollowOf=f;if(!this._bFollowOf){this._followOfHandler=null}u=f}else{this._bFollowOf=false;this._followOfHandler=null;if(f!=null){q.sap.log.error("Trying to set an invalid type to 'followOf: "+f)}}if(u&&this._oLastPosition){this._oLastOfRect=this._calcOfRect(this._oLastPosition.of)}if(this._bFollowOf&&this.getOpenState()===sap.ui.core.OpenState.OPEN){P.DockTrigger.addListener(P.checkDocking,this)}};P.prototype.getAutoClose=function(){return this._bAutoClose};P.prototype.getFollowOf=function(){if(this._bFollowOf){return typeof(this._followOfHandler)==="function"?this._followOfHandler:true}return false};P.prototype.isOpen=function(){return this.bOpen};P.prototype.getOpenState=function(){return this.eOpenState};P.prototype.destroy=function(){if(this._resizeListenerId){sap.ui.core.ResizeHandler.deregister(this._resizeListenerId);this._resizeListenerId=null}this.close();this.oContent=null;if(this._bFollowOf){this.setFollowOf(null)}if(this._aFocusableArea){delete this._aFocusableArea}if(this._bFocusableListenersRegistered){delete this._bFocusableListenersRegistered;var e="sap.ui.core.Popup.addFocusableContent-"+this._id;sap.ui.getCore().getEventBus().unsubscribe("sap.ui",e,this._addFocusableArea);e="sap.ui.core.Popup.removeFocusableContent-"+this._id;sap.ui.getCore().getEventBus().unsubscribe("sap.ui",e,this._removeFocusableArea)}};P.prototype._addFocusableArea=function(c,e,f){if(!this._aFocusableArea){this._aFocusableArea=[]}if(f.id&&typeof(f.id)==="string"){this._aFocusableArea.push(f.id)}else{q.sap.log.warning("Either no id given or id is no string")}};P.prototype._removeFocusableArea=function(c,e,f){if(this._aFocusableArea&&this._aFocusableArea.length>0){for(var i=0;i<this._aFocusableArea.length;i++){if(this._aFocusableArea[i]===f.id){this._aFocusableArea=this._aFocusableArea.splice(i,i);break}}if(f.bAutoClose&&this._bAutoClose){this.close()}}};P.prototype._setIdentity=function(r){if(typeof r==="object"){r.attr("data-sap-ui-popup",this._id)}else{q.sap.log.warning("Incorrect DomRef-type for 'setIdentity': "+r,this);return}if(!this._bFocusableListenersRegistered){this._bFocusableListenersRegistered=true;var e="sap.ui.core.Popup.addFocusableContent-"+this._id;sap.ui.getCore().getEventBus().subscribe("sap.ui",e,this._addFocusableArea,this);e="sap.ui.core.Popup.removeFocusableContent-"+this._id;sap.ui.getCore().getEventBus().subscribe("sap.ui",e,this._removeFocusableArea,this)}};P.prototype._$=function(f){var c;if(this.oContent instanceof C){c=this.oContent.$();if(c.length===0||f){q.sap.log.info("Rendering of popup content: "+this.oContent.getId());if(c.length>0){R.preserveContent(c[0],true,false)}sap.ui.getCore().getRenderManager().render(this.oContent,sap.ui.getCore().getStaticAreaRef());c=this.oContent.$()}}else if(this.oContent instanceof sap.ui.core.Element){c=this.oContent.$()}else{c=q(this.oContent)}this._setIdentity(c);return c};P.prototype._showBlockLayer=function(){var b=q("#sap-ui-blocklayer-popup"),c="sapUiBLy"+(this._sModalCSSClass?" "+this._sModalCSSClass:"");if(b.length===0){b=q('<div id="sap-ui-blocklayer-popup" tabindex="0" class="'+c+'"></div>');b.appendTo(sap.ui.getCore().getStaticAreaRef())}else{b.removeClass().addClass(c)}P.blStack.push(this._iZIndex-2);b.css("z-index",this._iZIndex-2).css("visibility","visible").show();q("html").addClass("sapUiBLyBack")};P.prototype._hideBlockLayer=function(){P.blStack.pop();if(P.blStack.length>0){q("#sap-ui-blocklayer-popup").css("z-index",P.blStack[P.blStack.length-1]).css("visibility","visible").show()}else{q("#sap-ui-blocklayer-popup").css("visibility","inherit").hide()}q("html").removeClass("sapUiBLyBack")};P.DockTrigger=new I(200);P.checkDocking=function(){if(this.getOpenState()===sap.ui.core.OpenState.OPEN){var c=q(this._oLastPosition.of instanceof sap.ui.core.Element?this._oLastPosition.of.getDomRef():this._oLastPosition.of).rect();if(!c){this.close();return}if(c&&c.left===0&&c.top===0&&c.width===0&&c.height===0){if(this._oLastPosition.of.id&&this._oLastPosition.of.id!==""){var n=q(q.sap.domById(this._oLastPosition.of.id)).rect();if(n&&n!==c){c=n}}}if(this._oLastOfRect){if(this._oLastOfRect.left!=c.left||this._oLastOfRect.top!=c.top||this._oLastOfRect.width!=c.width||this._oLastOfRect.height!=c.height){if(this._followOfHandler){var l=q.extend(true,{},this._oLastPosition);this._followOfHandler(l)}else{this._applyPosition(this._oLastPosition)}}}}};P.prototype.ontouchstart=function(e){this.onmousedown(e,true);this._bMousedownCalled=true};P.prototype.onmousedown=function(e,s){if(this._bMousedownCalled&&!s){this._bMousedownCalled=false;return}if(this._iZIndex===this.getLastZIndex()){return}this._iZIndex=this.getNextZIndex();var r=this._$();r.css("z-index",this._iZIndex);if(this._oBlindLayer){this._oBlindLayer.update(r,this._iZIndex-1)}};P.prototype.onAfterRendering=function(e){var r=this.getContent().$();r.toggleClass("sapUiShd",this._bShadow);r.css("position","absolute");this._setIdentity(r);var a=r[0];var l=a.style.left;var b=a.style.right;var t=a.style.top;var c=a.style.bottom;if(!(l&&l!="auto"||b&&b!="auto"||t&&t!="auto"||c&&c!="auto")){q.sap.log.debug("reposition popup content "+r.attr("id")+" at "+(window.JSON?JSON.stringify(this._oLastPosition.at):String(this._oLastPosition.at)));this._applyPosition(this._oLastPosition)}r.show().css("visibility","visible").css("z-index",this._iZIndex);if(this._oBlindLayer){this._resizeListenerId=sap.ui.core.ResizeHandler.register(this._$().get(0),q.proxy(this.onresize,this))}};P.prototype.onBeforeRendering=function(e){if(this._resizeListenerId){sap.ui.core.ResizeHandler.deregister(this._resizeListenerId);this._resizeListenerId=null}};P.prototype.onresize=function(e){if(this.eOpenState!=sap.ui.core.OpenState.CLOSED&&this._oBlindLayer){var t=this;setTimeout(function(){t._updateBlindLayer()},0)}};P.prototype._updateBlindLayer=function(){if(this.eOpenState!=sap.ui.core.OpenState.CLOSED&&this._oBlindLayer){this._oBlindLayer.update(this._$())}};return P},true);
