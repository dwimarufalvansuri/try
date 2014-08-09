/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 * 
 * (c) Copyright 2009-2014 SAP AG. All rights reserved
 */
sap.ui.define(['jquery.sap.global','sap/ui/base/Object','jquery.sap.script'],function(q,B){"use strict";sap.ui._maxThemeCheckCycles=100;var T=B.extend("sap.ui.core.ThemeCheck",{constructor:function(C){this._oCore=C;this._iCount=0;this._CUSTOMCSSCHECK=/\.sapUiThemeDesignerCustomCss/i;this._CUSTOMID="sap-ui-core-customcss";this._customCSSAdded=false;this._themeCheckedForCustom=null},getInterface:function(){return this},fireThemeChangedEvent:function(o,f){c(this);var u=sap.ui._maxThemeCheckCycles>0;if(u||f){d.apply(this,[true])}else{T.themeLoaded=true}if(!o&&!this._sThemeCheckId){this._oCore.fireThemeChanged({theme:this._oCore.getConfiguration().getTheme()})}}});T.themeLoaded=false;T.checkStyle=function(s,l){if(typeof(s)==="string"){s=q.sap.domById(s)}var S=q(s);try{var r=!s||!!((s.sheet&&s.sheet.cssRules.length>0)||!!(s.styleSheet&&s.styleSheet.cssText.length>0)||!!(s.innerHTML&&s.innerHTML.length>0));var f=S.attr("sap-ui-ready");f=!!(f==="true"||f==="false");if(l){q.sap.log.debug("ThemeCheck: Check styles '"+S.attr("id")+"': "+r+"/"+f+"/"+!!s)}return r||f}catch(e){}if(l){q.sap.log.debug("ThemeCheck: Error during check styles '"+S.attr("id")+"': false/false/"+!!s)}return false};function c(t){T.themeLoaded=false;if(t._sThemeCheckId){q.sap.clearDelayedCall(t._sThemeCheckId);t._sThemeCheckId=null;t._iCount=0}}function a(t){var l=t._oCore.getLoadedLibraries();var s=t._oCore.getConfiguration().getTheme();var p=t._oCore._getThemePath("sap.ui.core",s)+"custom.css";var r=true;if(!!t._customCSSAdded&&t._themeCheckedForCustom===s){l["sap-ui-theme-"+t._CUSTOMID]={}}q.each(l,function(e){r=r&&T.checkStyle("sap-ui-theme-"+e,true);if(!!r){if(t._themeCheckedForCustom!=s){if(b(t,e)){q.sap.includeStyleSheet(p,t._CUSTOMID);t._customCSSAdded=true;q.sap.log.warning("ThemeCheck delivered custom CSS needs to be loaded, Theme not yet applied");t._themeCheckedForCustom=s;r=false;return false}else{var f=q("LINK[id='"+t._CUSTOMID+"']");if(f.length>0){f.remove();q.sap.log.debug("Custom CSS removed")}t._customCSSAdded=false}}}});if(!r){q.sap.log.warning("ThemeCheck: Theme not yet applied.")}else{t._themeCheckedForCustom=s}return r}function b(t,l){var r=null,s=false;var l=new RegExp(l);q.each(document.styleSheets,function(i,S){if(!!S.ownerNode&&l.test(S.ownerNode.id)&&S.cssRules&&S.cssRules.length>0){r=S.cssRules[0].selectorText;if(t._CUSTOMCSSCHECK.test(r)){s=true;return false}}else if(!!S.owningElement&&l.test(S.owningElement.id)&&S.rules&&S.rules.length>0){r=S.rules[0].selectorText;if(t._CUSTOMCSSCHECK.test(r)){s=true;return false}}});return s}function d(f){this._iCount++;var e=this._iCount>sap.ui._maxThemeCheckCycles;if(!a(this)&&!e){this._sThemeCheckId=q.sap.delayedCall(2,this,d)}else if(!f){c(this);T.themeLoaded=true;this._oCore.fireThemeChanged({theme:this._oCore.getConfiguration().getTheme()});if(e){q.sap.log.warning("ThemeCheck: max. check cycles reached.")}}else{T.themeLoaded=true}}return T},true);
