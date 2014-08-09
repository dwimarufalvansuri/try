/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 * 
 * (c) Copyright 2009-2014 SAP AG. All rights reserved
 */
sap.ui.define(['jquery.sap.global','sap/ui/base/ManagedObjectMetadata'],function(q,M){"use strict";var E=function(c,C){M.apply(this,arguments)};E.prototype=q.sap.newObject(M.prototype);E.uid=M.uid;E.prototype.getElementName=function(){return this._sClassName};E.prototype.getRendererName=function(){return this._sRendererName};E.prototype.getRenderer=function(){var r=this.getRendererName();if(!r){return}var R=q.sap.getObject(r);if(R){return R}q.sap.require(r);return q.sap.getObject(r)};E.prototype.applySettings=function(c){var s=c.metadata;this._sVisibility=s["visibility"]||"public";var r=c.hasOwnProperty("renderer")?(c.renderer||""):undefined;delete c.renderer;M.prototype.applySettings.call(this,c);this._sRendererName=this.getName()+"Renderer";if(typeof r!=="undefined"){if(typeof r==="string"){this._sRendererName=r||undefined;return}if(typeof r==="function"){r={render:r}}var p=this.getParent();var b;if(p&&p instanceof E){b=p.getRenderer()}if(!b){q.sap.require("sap.ui.core.Renderer");b=sap.ui.core.Renderer}var R=q.sap.newObject(b);q.extend(R,r);q.sap.setObject(this.getRendererName(),R)}};E.prototype.afterApplySettings=function(){M.prototype.afterApplySettings.apply(this,arguments);this.register&&this.register(this)};E.prototype.isHidden=function(){return this._sVisibility==="hidden"};return E},true);
