/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 * 
 * (c) Copyright 2009-2014 SAP AG. All rights reserved
 */
jQuery.sap.declare("sap.m.InputBase");jQuery.sap.require("sap.m.library");jQuery.sap.require("sap.ui.core.Control");sap.ui.core.Control.extend("sap.m.InputBase",{metadata:{library:"sap.m",properties:{"value":{type:"string",group:"Data",defaultValue:null,bindable:"bindable"},"width":{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:null},"enabled":{type:"boolean",group:"Behavior",defaultValue:true},"visible":{type:"boolean",group:"Appearance",defaultValue:true},"valueState":{type:"sap.ui.core.ValueState",group:"Appearance",defaultValue:sap.ui.core.ValueState.None},"name":{type:"string",group:"Misc",defaultValue:null},"placeholder":{type:"string",group:"Misc",defaultValue:null},"editable":{type:"boolean",group:"Behavior",defaultValue:true}},events:{"change":{}}}});sap.m.InputBase.M_EVENTS={'change':'change'};jQuery.sap.require("sap.ui.core.EnabledPropagator");jQuery.sap.require("sap.ui.core.IconPool");sap.ui.core.EnabledPropagator.call(sap.m.InputBase.prototype);sap.ui.core.IconPool.insertFontFaceStyle();sap.m.InputBase.prototype._bShowLabelAsPlaceholder=(function($,d){if(!("placeholder"in document.createElement("input"))){return true}var u=d.support.touch;if(u&&((d.os.ios&&d.os.version>=6)||(d.os.android&&d.browser.chrome))||(d.os.blackberry&&d.os.version>=10)){u=null}return u}(jQuery,sap.ui.Device));
sap.m.InputBase.prototype._setLabelVisibility=function(){if(this.getDomRef()&&this._$label){this._$label.css("display",this.getValue()?"none":"inline")}};
sap.m.InputBase.prototype._getInputValue=function(v){v=(typeof v=="undefined")?this._$input.val():v.toString();if(this.getMaxLength&&this.getMaxLength()>0){v=v.substring(0,this.getMaxLength())}return v};
sap.m.InputBase.prototype.setMaxLength=function(m){if(m<0){return this}this.setProperty("maxLength",m,true);if(this.getDomRef()){if(m===0){this._$input.removeAttr("maxlength")}else{this._$input.val(this._$input.val().substring(0,m));this._$input.attr("maxlength",m)}}return this};
sap.m.InputBase.prototype.init=function(){this._curpos=0;this._lastValue="";this._changeProxy=jQuery.proxy(this.onChange,this)};
sap.m.InputBase.prototype.onBeforeRendering=function(){if(this.getDomRef()){this._$input.off();this._curpos=this._$input.cursorPos()}};
sap.m.InputBase.prototype.onAfterRendering=function(){this._$input=this.$("inner");this._$input.on("change",this._changeProxy);if(this._bShowLabelAsPlaceholder){this._$label=this.$().find("label");this._setLabelVisibility();if(sap.ui.Device.os.ios&&sap.ui.Device.os.version<=5){this._$label.on("click",function(){})}}};
sap.m.InputBase.prototype.exit=function(){this._$input=null;this._$label=null};
sap.m.InputBase.prototype.ontouchstart=function(e){e.setMarked()};
sap.m.InputBase.prototype.ontouchend=function(e){this._curpos=this._$input.cursorPos()};
sap.m.InputBase.prototype.onkeyup=function(e){this._curpos=this._$input.cursorPos()};
sap.m.InputBase.prototype.onfocusout=function(e){if(sap.ui.Device.browser.msie){this.onChange(e)}if(sap.ui.Device.os.ios){var s=sap.m.getScrollDelegate(this);if(s){s.refresh()}}};
sap.m.InputBase.prototype.onChange=function(e){if(!this._$input){return}var v=this._getInputValue();if(v!==this._lastValue){this.setProperty("value",v,true);this._curpos=this._$input.cursorPos();this._setLabelVisibility();this._lastValue=v;this.fireChange({value:v,newValue:v})}};
sap.m.InputBase.prototype.onsapenter=function(e){if(sap.ui.Device.browser.msie&&e.target.tagName.toUpperCase()==="INPUT"){this.onChange(e)}};
sap.m.InputBase.prototype.onsapescape=function(e){var v=this._getInputValue();if(v!==this._lastValue){this.setValue(this._lastValue);this.fireEvent("liveChange",{value:this._lastValue,newValue:this._lastValue})}};
sap.m.InputBase.prototype.bindToInputEvent=function(c){this._$input.on("input",c);var b=sap.ui.Device.browser;if(b.msie&&b.version<10){this._$input.on({cut:function(e){setTimeout(function(){c(e)},0)},keyup:function(e){var k=jQuery.sap.KeyCodes;if(e.which===k.DELETE||e.which===k.BACKSPACE){c(e)}}})}};
sap.m.InputBase.prototype.setValueState=function(v){var o=this.getValueState();v=this.validateProperty("valueState",v);if(v===o){return this}if(!this.getDomRef()){return this.setProperty("valueState",v)}var $=this.$();this.setProperty("valueState",v,true);if(o){$.removeClass("sapMInputBase"+o);this._$input.removeClass("sapMInputBase"+o+"Inner")}if(v){$.addClass("sapMInputBase"+v);this._$input.addClass("sapMInputBase"+v+"Inner")}var t=sap.ui.core.ValueStateSupport.enrichTooltip(this,this.getTooltip_AsString());this.$().attr("title",t||"");return this};
sap.m.InputBase.prototype.setValue=function(v){v=this.validateProperty("value",v);v=this._getInputValue(v);if(v!==this.getValue()){this._lastValue=v;this.setProperty("value",v,true);if(this.getDomRef()&&(this._getInputValue()!==v)){this._$input.val(v);this._setLabelVisibility();this._curpos=this._$input.cursorPos()}}return this};
sap.m.InputBase.prototype.setWidth=function(w){this.setProperty("width",w,true);this.$().css("width",this.getWidth());return this};
sap.m.InputBase.prototype.setPlaceholder=function(p){this.setProperty("placeholder",p,true);if(this.getDomRef()){if(this._$label){this._$label.text(this._getPlaceholder())}else{this._$input.attr("placeholder",this._getPlaceholder())}}return this};
sap.m.InputBase.prototype._getPlaceholder=function(){return this.getPlaceholder()};
sap.m.InputBase.prototype.getFocusInfo=function(){return{id:this.getId(),cursorPos:this._curpos}};
sap.m.InputBase.prototype.applyFocusInfo=function(f){if(this.getDomRef()){sap.ui.core.Element.prototype.applyFocusInfo.call(this,f);this._$input.cursorPos(this._curpos)}return this};
sap.m.InputBase.prototype.getFocusDomRef=function(){return this.getDomRef("inner")};
sap.m.InputBase.prototype.getIdForLabel=function(){return this.getId()+'-inner'};
