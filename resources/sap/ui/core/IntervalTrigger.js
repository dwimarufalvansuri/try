/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 * 
 * (c) Copyright 2009-2014 SAP AG. All rights reserved
 */
sap.ui.define(['jquery.sap.global','./EventBus'],function(q,E){"use strict";var _="sapUiIntervalTrigger-event";var I=sap.ui.base.Object.extend("sap.ui.core.IntervalTrigger",{constructor:function(i){sap.ui.base.Object.apply(this);this._oEventBus=new E();this._delayedCallId=null;this._triggerProxy=q.proxy(t,this);this._iInterval=0;if(i){this.setInterval(i)}}});var t=function(){q.sap.clearDelayedCall(this._delayedCallId);var h=this._oEventBus._defaultChannel.hasListeners(_);if(this._iInterval>0&&h){this._oEventBus.publish(_);this._delayedCallId=q.sap.delayedCall(this._iInterval,this,this._triggerProxy)}};I.prototype.destroy=function(){sap.ui.base.Object.prototype.destroy.apply(this,arguments);delete this._triggerProxy;this._oEventBus.destroy();delete this._oEventBus};I.prototype.setInterval=function(i){if(this._iInterval!==i){this._iInterval=i;this._triggerProxy()}};I.prototype.addListener=function(f,l){this._oEventBus.subscribe(_,f,l);this._triggerProxy()};I.prototype.removeListener=function(f,l){this._oEventBus.unsubscribe(_,f,l)};I.prototype.getInterface=function(){return this};return I},true);
