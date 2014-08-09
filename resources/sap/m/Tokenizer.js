/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 * 
 * (c) Copyright 2009-2014 SAP AG. All rights reserved
 */
jQuery.sap.declare("sap.m.Tokenizer");jQuery.sap.require("sap.m.library");jQuery.sap.require("sap.ui.core.Control");sap.ui.core.Control.extend("sap.m.Tokenizer",{metadata:{library:"sap.m",properties:{"editable":{type:"boolean",group:"Misc",defaultValue:true},"width":{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:null}},aggregations:{"tokens":{type:"sap.m.Token",multiple:true,singularName:"token"}},events:{"tokenChange":{}}}});sap.m.Tokenizer.M_EVENTS={'tokenChange':'tokenChange'};
sap.m.Tokenizer.prototype.init=function(){this._aTokenValidators=[]};
sap.m.Tokenizer.prototype.addValidator=function(v){if(typeof(v)==="function"){this._aTokenValidators.push(v)}};
sap.m.Tokenizer.prototype.removeValidator=function(v){var i=this._aTokenValidators.indexOf(v);if(i!==-1){this._aTokenValidators.splice(i,1)}};
sap.m.Tokenizer.prototype.removeAllValidators=function(){this._aTokenValidators=[]};
sap.m.Tokenizer.prototype._validateToken=function(t,T,v,V){var i,a,l;if(!V){V=this._aTokenValidators}l=V.length;if(l===0){if(!T&&v){v(false)}return T}for(i=0;i<l;i++){a=V[i];T=a({text:t,suggestedToken:T,asyncCallback:this._getAsyncValidationCallback(V,i,t,v)});if(!T){if(v){v(false)}return null}if(T===sap.m.Tokenizer.WaitForAsyncValidation){return null}}return T};
sap.m.Tokenizer.prototype._getAsyncValidationCallback=function(v,V,i,f){var t=this;return function(T){if(T){v=v.slice(V+1);T=t._validateToken(i,T,f,v);t._addUniqueToken(T,f)}else{if(f){f(false)}}}};
sap.m.Tokenizer.prototype.addValidateToken=function(t,T,v){if(typeof(T)==="function"){v=T;T=null}T=this._validateToken(t,T,v);this._addUniqueToken(T,v)};
sap.m.Tokenizer.prototype._addUniqueToken=function(t,v){if(!t){return}if(v){v(true)}var a=this._tokenExists(t);if(a){return}this.addToken(t)};
sap.m.Tokenizer.prototype._tokenExists=function(t){var a=this.getTokens();if(!(a&&a.length)){return false}var k=t.getKey();if(!k){return false}var l=a.length;for(var i=0;i<l;i++){var c=a[i];var b=c.getKey();if(b===k){return true}}return false};
sap.m.Tokenizer.prototype.addToken=function(t){this.addAggregation("tokens",t);t.attachDelete(this._onDeleteToken,this);t.attachPress(this._onTokenPress,this);t.setEditable(this.getEditable());this.fireTokenChange({token:t,type:sap.m.Tokenizer.TokenChangeType.Added})};
sap.m.Tokenizer.prototype.removeToken=function(t){t=this.removeAggregation("tokens",t);if(t){t.detachDelete(this._onDeleteToken,this);t.detachPress(this._onTokenPress,this)}this.fireTokenChange({token:t,type:sap.m.Tokenizer.TokenChangeType.Removed});return t};
sap.m.Tokenizer.prototype.removeAllTokens=function(){var i,l,t,a;a=this.getTokens();l=a.length;for(i=0;i<l;i++){t=a[i];t.detachDelete(this._onDeleteToken,this);t.detachPress(this._onTokenPress,this)}this.removeAllAggregation("tokens");this.fireTokenChange({tokens:a,type:sap.m.Tokenizer.TokenChangeType.RemovedAll})};
sap.m.Tokenizer.prototype._onDeleteToken=function(e){var t=e.getParameter("token");if(t){this.removeToken(t)}};
sap.m.Tokenizer.prototype._onTokenPress=function(e){var s=e.oSource;var a=s.getSelected();s.setSelected(!a);var b=e.getParameter("originalEvent").ctrlKey;if(b){return}var l,i,t,c;c=this.getTokens();l=c.length;for(i=0;i<l;i++){t=c[i];if(t!==s){t.setSelected(false)}}};
sap.m.Tokenizer.prototype.setEditable=function(e){this.setProperty("editable",e);var t=this.getTokens();var l=t.length;for(var i=0;i<l;i++){var c=t[i];c.setEditable(e)}return this};
sap.m.Tokenizer.prototype.setWidth=function(w){this.setProperty("width",w,true);this.$().css("width",this.getWidth());return this};
sap.m.Tokenizer.TokenChangeType={Added:"added",Removed:"removed",RemovedAll:"removedAll"};sap.m.Tokenizer.WaitForAsyncValidation="sap.m.Tokenizer.WaitForAsyncValidation";
