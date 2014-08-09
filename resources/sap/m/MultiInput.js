/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 * 
 * (c) Copyright 2009-2014 SAP AG. All rights reserved
 */
jQuery.sap.declare("sap.m.MultiInput");jQuery.sap.require("sap.m.library");jQuery.sap.require("sap.m.Input");sap.m.Input.extend("sap.m.MultiInput",{metadata:{library:"sap.m",aggregations:{"tokens":{type:"sap.m.Token",multiple:true,singularName:"token"},"tokenizer":{type:"sap.m.Tokenizer",multiple:false}},events:{"tokenChange":{}}}});sap.m.MultiInput.M_EVENTS={'tokenChange':'tokenChange'};jQuery.sap.require("sap.ui.core.Item");jQuery.sap.require("sap.m.Token");
sap.m.MultiInput.prototype.init=function(){var t=this;sap.m.Input.prototype.init.call(this);this._tokenizer=new sap.m.Tokenizer();this._tokenizer.attachTokenChange(function(a){t.fireTokenChange(a.getParameters())});this.setTokenizer(this._tokenizer);this.setTokenizer=function(){console.warn("Tokenizer is read-only!")};this.setShowValueHelp(true);this.setShowSuggestion(true);this.addStyleClass("sapMMultiInput");this.attachSuggestionItemSelected(function(e){var i=e.getParameter("selectedItem");if(i){var a=i.getText();var b=new sap.m.Token({text:a,key:i.getKey()});t.setEnabled(false);t._tokenizer.addValidateToken(a,b,function(v){t.setEnabled(true);if(v){t.setValue("")}})}})};
sap.m.MultiInput.prototype.addValidator=function(v){this._tokenizer.addValidator(v)};
sap.m.MultiInput.prototype.removeValidator=function(v){this._tokenizer.removeValidator(v)};
sap.m.MultiInput.prototype.removeAllValidators=function(){this._tokenizer.removeAllValidators()};
sap.m.MultiInput.prototype.onsapbackspace=function(e){if(this.getCursorPosition()>0||!this.getEditable()){return}var t=this.getTokens();if(t&&t.length){var a=t[t.length-1];if(a.getSelected()){this.removeToken(a)}else{a.setSelected(true)}}};
sap.m.MultiInput.prototype.onsapenter=function(e){if(sap.m.Input.prototype.onsapenter){sap.m.Input.prototype.onsapenter.apply(this,arguments)}var t=this.getValue();if(!t||!this.getEditable()){return}t=t.trim();if(!t){return}var i=null;if(this._getIsSuggestionPopupOpen()){i=this._getSuggestionItem(t)}var a=null;if(i){a=new sap.m.Token({text:i.getText(),key:i.getKey()})}var b=this;this.setEnabled(false);this._tokenizer.addValidateToken(t,a,function(v){b.setEnabled(true);if(v){b.setValue("")}})};
sap.m.MultiInput.prototype.getCursorPosition=function(){return this._$input.cursorPos()};
sap.m.MultiInput.prototype._getIsSuggestionPopupOpen=function(){return this._oSuggestionPopup&&this._oSuggestionPopup.isOpen()};
sap.m.MultiInput.prototype.onsapdelete=function(e){if(this.getValue()||!this.getEditable()){return}var t=[];var a,b,i,l;b=this.getTokens();l=b.length;for(i=0;i<l;i++){a=b[i];if(a.getSelected()){t.push(a)}}l=t.length;for(i=0;i<l;i++){a=t[i];this.removeToken(a)}};
sap.m.MultiInput.prototype.setEditable=function(e){if(e===this.getEditable()){return this}if(sap.m.Input.prototype.setEditable){sap.m.Input.prototype.setEditable.apply(this,arguments)}this._tokenizer.setEditable(e);if(e){this.removeStyleClass("sapMMultiInputNotEditable")}else{this.addStyleClass("sapMMultiInputNotEditable")}return this};
sap.m.MultiInput.prototype._findItem=function(t,I){if(!t){return}if(!(I&&I.length)){return}t=t.toLowerCase();var l=I.length;for(var i=0;i<l;i++){var a=I[i];var c=a.getText();if(!c){continue}c=c.toLowerCase();if(c.indexOf(t)===0){return a}}};
sap.m.MultiInput.prototype._getSuggestionItem=function(t){var i=this.getSuggestionItems();var a=this._findItem(t,i);return a};
sap.m.MultiInput.prototype.addToken=function(t){return this._tokenizer.addToken(t)};
sap.m.MultiInput.prototype.removeToken=function(t){return this._tokenizer.removeToken(t)};
sap.m.MultiInput.prototype.removeAllTokens=function(){return this._tokenizer.removeAllTokens()};
sap.m.MultiInput.prototype.getTokens=function(){return this._tokenizer.getTokens()};
sap.m.MultiInput.TokenChangeType={Added:"added",Removed:"removed",RemovedAll:"removedAll"};sap.m.MultiInput.WaitForAsyncValidation="sap.m.Tokenizer.WaitForAsyncValidation";
