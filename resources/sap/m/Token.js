/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 * 
 * (c) Copyright 2009-2014 SAP AG. All rights reserved
 */
jQuery.sap.declare("sap.m.Token");jQuery.sap.require("sap.m.library");jQuery.sap.require("sap.ui.core.Control");sap.ui.core.Control.extend("sap.m.Token",{metadata:{library:"sap.m",properties:{"selected":{type:"boolean",group:"Misc",defaultValue:false},"key":{type:"string",group:"Misc",defaultValue:""},"text":{type:"string",group:"Misc",defaultValue:""},"editable":{type:"boolean",group:"Misc",defaultValue:true}},aggregations:{"deleteIcon":{type:"sap.ui.core.Icon",multiple:false,visibility:"hidden"}},events:{"delete":{},"press":{}}}});sap.m.Token.M_EVENTS={'delete':'delete','press':'press'};
sap.m.Token.prototype.init=function(){var t=this;this._deleteIcon=new sap.ui.core.Icon({src:"sap-icon://sys-cancel"});this._deleteIcon.addStyleClass("sapMTokenIcon");this._deleteIcon.attachPress(function(){t.fireDelete({token:t})});this.setAggregation("deleteIcon",this._deleteIcon)};
sap.m.Token.prototype.ontap=function(e){if(e.srcControl===this){this.firePress(e)}};
sap.m.Token.prototype.setSelected=function(s){var o=this.getSelected();if(o!==s){this.setProperty("selected",s);if(s){this.addStyleClass("sapMTokenSelected",false)}else{this.removeStyleClass("sapMTokenSelected",false)}}};
