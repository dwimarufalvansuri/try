/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 * 
 * (c) Copyright 2009-2014 SAP AG. All rights reserved
 */
jQuery.sap.declare("sap.m.FeedInput");jQuery.sap.require("sap.m.library");jQuery.sap.require("sap.ui.core.Control");sap.ui.core.Control.extend("sap.m.FeedInput",{metadata:{library:"sap.m",properties:{"backgroundDesign":{type:"sap.m.BackgroundDesign",group:"Appearance",defaultValue:sap.m.BackgroundDesign.Translucent},"enabled":{type:"boolean",group:"Behavior",defaultValue:true},"maxLength":{type:"int",group:"Behavior",defaultValue:0},"placeholder":{type:"string",group:"Appearance",defaultValue:'\'Enter Message\' (i18n)'},"postButtonText":{type:"string",group:"Appearance",defaultValue:'\'Post\' (i18n)'},"value":{type:"string",group:"Data",defaultValue:null},"visible":{type:"boolean",group:"Appearance",defaultValue:true}},events:{"post":{}}}});sap.m.FeedInput.M_EVENTS={'post':'post'};
sap.m.FeedInput.prototype.init=function(){var b=sap.ui.getCore().getLibraryResourceBundle("sap.m");this.setProperty("placeholder",b.getText("FEEDINPUT_PLACEHOLDER"),true);this.setProperty("postButtonText",b.getText("FEEDINPUT_POST_BUTTON"),true)};
sap.m.FeedInput.prototype.exit=function(){if(this._oTextArea){this._oTextArea.destroy()}if(this._oButton){this._oButton.destroy()}};
sap.m.FeedInput.prototype.setMaxLength=function(m){this.setProperty("maxLength",m,true);this._getTextArea().setMaxLength(m);return this};
sap.m.FeedInput.prototype.setValue=function(v){this.setProperty("value",v,true);this._getTextArea().setValue(v);this._enablePostButton();return this};
sap.m.FeedInput.prototype.setPlaceholder=function(v){this.setProperty("placeholder",v,true);this._getTextArea().setPlaceholder(v);return this};
sap.m.FeedInput.prototype.setPostButtonText=function(t){this.setProperty("postButtonText",t,true);this._getPostButton().setText(t);return this};
sap.m.FeedInput.prototype.setEnabled=function(e){this.setProperty("enabled",e,true);this._getTextArea().setEnabled(e);this._enablePostButton();return this};
sap.m.FeedInput.prototype._getTextArea=function(){if(!this._oTextArea){this._oTextArea=new sap.m.TextArea(this.getId()+"-textArea",{value:null,maxLength:this.getMaxLength(),placeholder:this.getPlaceholder(),liveChange:jQuery.proxy(function(e){var v=e.getParameter("value");this.setProperty("value",v,true);this._enablePostButton()},this)});this._oTextArea.setParent(this)}return this._oTextArea};
sap.m.FeedInput.prototype._getPostButton=function(){if(!this._oButton){this._oButton=new sap.m.Button(this.getId()+"-button",{enabled:false,type:"Emphasized",text:(jQuery.device.is.phone)?null:this.getPostButtonText(),icon:(jQuery.device.is.phone)?"sap-icon://post":null,press:jQuery.proxy(function(e){this.firePost({value:this.getValue()});this.setValue(null)},this)});this._oButton.setParent(this)}return this._oButton};
sap.m.FeedInput.prototype._enablePostButton=function(){var v=this.getProperty("value");var i=this.getProperty("enabled");var p=(i&&!!v&&v.trim().length>0);var b=this._getPostButton();if(b.getEnabled()!==p){b.setEnabled(p)}};
