/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 * 
 * (c) Copyright 2009-2014 SAP AG. All rights reserved
 */
jQuery.sap.declare("sap.m.MultiComboBox");jQuery.sap.require("sap.m.library");jQuery.sap.require("sap.m.InputBase");sap.m.InputBase.extend("sap.m.MultiComboBox",{metadata:{publicMethods:["isOpen","close","getItemByKey","setSelectedKeys","getSelectedKeys"],library:"sap.m",properties:{"maxWidth":{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:'100%'}},defaultAggregation:"items",aggregations:{"items":{type:"sap.ui.core.Item",multiple:true,singularName:"item"},"popup":{type:"sap.ui.core.Control",multiple:false,visibility:"hidden"}},associations:{"selectedItems":{type:"sap.ui.core.Item",multiple:true,singularName:"selectedItem"}},events:{"selectionChange":{},"selectionFinish":{}}}});sap.m.MultiComboBox.M_EVENTS={'selectionChange':'selectionChange','selectionFinish':'selectionFinish'};jQuery.sap.require("sap.ui.core.EnabledPropagator");jQuery.sap.require("sap.m.MultiComboBoxRenderer");jQuery.sap.require("sap.m.InputBase");jQuery.sap.require("sap.m.Bar");jQuery.sap.require("sap.m.List");jQuery.sap.require("sap.m.Popover");jQuery.sap.require("sap.m.Dialog");jQuery.sap.require("sap.ui.core.IconPool");sap.ui.core.IconPool.insertFontFaceStyle();sap.ui.core.EnabledPropagator.apply(sap.m.MultiComboBox.prototype,[true]);
sap.m.MultiComboBox.prototype._getParentPopup=function(){var s=this.$();return(s&&s.closest("[data-sap-ui-popup]"))||null};
sap.m.MultiComboBox.prototype._synchronizeSelectedItemAndKey=function(s,S,I){if(!I.length){this._setSelectedItem({item:null,id:"",key:null,suppressInvalidate:true});jQuery.sap.log.info("Info: _synchronizeSelectedItemAndKey() the select control does not contain any item on ",this);return}var k=this._getKeyOfItems(s);if(S){for(var i=0,K=null,o=null,l=S.length;i<l;i++){K=S[i];if(jQuery.inArray(K,k)>-1){continue}o=this.getItemByKey(""+K);if(o){this.addAssociation("selectedItems",o,true);this._setSelectedListItem(this._getSelectedListItem(o))}}return}};
sap.m.MultiComboBox.prototype._setSelectedItem=function(o){var l,k=null;var i=this.getAggregation("items");if(o.item&&this._isItemSelected(o.item)){return}if(i&&jQuery.inArray(o.key,this._getKeyOfItems(i))<0){return}if(o.item){this.addAssociation("selectedItems",o.item,o.suppressInvalidate)}if(o.fireChangeEvent){this.fireSelectionChange({selectedItem:o.item,selected:true})}if(!o.listItemUpdated){l=this._getSelectedListItem(o.item);this._setSelectedListItem(l)}};
sap.m.MultiComboBox.prototype._removeSelectedItem=function(o){var l,k=null;if(o.item&&!this._isItemSelected(o.item)){return}if(o.item){this.removeAssociation("selectedItems",o.item,o.suppressInvalidate)}if(o.fireChangeEvent){this.fireSelectionChange({selectedItem:o.item,selected:false})}if(!o.listItemUpdated){l=this._getSelectedListItem(o.item);this._removeSelectedListItem(l)}};
sap.m.MultiComboBox.prototype._getKeyOfItems=function(I){for(var i=0,k=[];I&&i<I.length;i++){k.push(I[i].getKey())}return k.length?k:null};
sap.m.MultiComboBox.prototype._isItemSelected=function(i){return(jQuery.inArray(i.getKey(),this._getKeyOfItems(this.getSelectedItems()))>-1?true:false)};
sap.m.MultiComboBox.prototype._setSelectedListItem=function(s){if(this._oList){if(s){this._oList.setSelectedItem(s,true)}}};
sap.m.MultiComboBox.prototype._removeSelectedListItem=function(s){if(this._oList){if(s){this._oList.setSelectedItem(s,false)}}};
sap.m.MultiComboBox.prototype._getSelectedListItem=function(i){return(i&&i._oListItem)?i._oListItem:null};
sap.m.MultiComboBox.prototype._addFocusableParentPopup=function(d){sap.m.MultiComboBox._publishEventToPopup({action:"add",child:this.getAggregation("popup"),parent:d})};
sap.m.MultiComboBox.prototype._removeFocusableParentPopup=function(d){sap.m.MultiComboBox._publishEventToPopup({action:"remove",child:this.getAggregation("popup"),parent:d})};
sap.m.MultiComboBox._publishEventToPopup=function(o){var p,e;if(!o.parent||!o.child){return}p=o.parent.attr("data-sap-ui-popup");e="sap.ui.core.Popup."+o.action+"FocusableContent"+"-"+p;sap.ui.getCore().getEventBus().publish("sap.ui",e,{id:o.child.getId()})};
sap.m.MultiComboBox.prototype._focusItem=function(l){if(!l){return}l.focus()};
sap.m.MultiComboBox.prototype._mapItemToListItem=function(i){if(!i){return null}var l=sap.m.MultiComboBoxRenderer.CSS_CLASS+"Item";var L=i.getEnabled()?"Enabled":"Disabled";var s=(this._isItemSelected(i))?l+"Selected":"";var o=new sap.m.StandardListItem({title:i.getText(),type:i.getEnabled()?sap.m.ListType.Active:sap.m.ListType.Inactive}).addStyleClass(l+" "+l+L+" "+s);i._oListItem=o;return o};
sap.m.MultiComboBox.prototype._findMappedItem=function(l,I){for(var i=0,a=I||this.getItems(),b=a.length;i<b;i++){if(a[i]._oListItem===l){return a[i]}}return null};
sap.m.MultiComboBox.prototype._updateSelectedItem=function(i){this._setSelectedItem({item:i||null,id:i?i.getId():"",key:i?i.getKey():null,suppressInvalidate:true})};
sap.m.MultiComboBox.prototype._fillList=function(I){if(!I){return}for(var i=0,l,a=I.length;i<a;i++){l=this._mapItemToListItem(I[i]);if(sap.ui.Device.support.touch){l.addEventDelegate({ontouchstart:function(e){e.setMark("cancelAutoClose")}})}this._oList.addAggregation("items",l,true);if(this._isItemSelected(I[i])){this._oList.setSelectedItem(l)}}};
sap.m.MultiComboBox.prototype._clearList=function(){this._oList&&this._oList.destroyAggregation("items",true)};
sap.m.MultiComboBox.prototype._createPopupFactory=function(p){var P=this.getAggregation("popup");if(P){return P}P=this["_create"+p]();this.setAggregation("popup",P,true);P.addStyleClass(sap.m.MultiComboBoxRenderer.CSS_CLASS+"Popup").attachBeforeOpen(this.onBeforeOpen,this).attachAfterOpen(this.onAfterOpen,this).attachBeforeClose(this.onBeforeClose,this).attachAfterClose(this.onAfterClose,this).addEventDelegate({onBeforeRendering:this.onBeforeRenderingPopup,onAfterRendering:this.onAfterRenderingPopup},this);return P};
sap.m.MultiComboBox.prototype._addActiveState=function(){this.addStyleClass(sap.m.MultiComboBoxRenderer.CSS_CLASS+"Pressed")};
sap.m.MultiComboBox.prototype._removeActiveState=function(){this.removeStyleClass(sap.m.MultiComboBoxRenderer.CSS_CLASS+"Pressed")};
sap.m.MultiComboBox.prototype._findItemsByFirstCharacter=function(c){for(var i=0,a=this.getItems(),I=[];i<I.length;i++){if(a[i].getText().charAt(0).toUpperCase()===c.toUpperCase()){I.push(a[i])}}return(I.length?I:null)};
sap.m.MultiComboBox.prototype._createList=function(){this._oList=new sap.m.List({width:"100%",mode:sap.m.ListMode.MultiSelect,includeItemInSelection:true,rememberSelections:true}).addStyleClass(sap.m.MultiComboBoxRenderer.CSS_CLASS+"List").attachBrowserEvent("tap",function(e){if(e.target.children.length===0){this.close()}},this).attachSelectionChange(this._handleSelectionLiveChange,this)};
sap.m.MultiComboBox.prototype.onBeforeOpen=function(){var p=this.getPopup(),P=this["_onBeforeOpen"+this._getPopupType()];this._addActiveState();p.addContent(this._oList);this.addContent();P&&P.call(this)};
sap.m.MultiComboBox.prototype.onAfterOpen=function(){};
sap.m.MultiComboBox.prototype.onBeforeClose=function(){};
sap.m.MultiComboBox.prototype.onAfterClose=function(){this._removeActiveState()};
sap.m.MultiComboBox.prototype._setPopupType=function(p){this._sPopupType=p};
sap.m.MultiComboBox.prototype._getPopupType=function(){return this._sPopupType};
sap.m.MultiComboBox.prototype._createPopover=function(){var p=new sap.m.Popover({showHeader:false,placement:sap.m.PlacementType.Vertical,offsetX:0,offsetY:0,initialFocus:this,bounce:false});this._decoratePopover(p);return p};
sap.m.MultiComboBox.prototype._decoratePopover=function(p){var s=this;p._removeArrow=function(){this._marginTop=0;this._marginLeft=0;this._marginRight=0;this._marginBottom=0;this._arrowOffset=0;this._offsets=["0 0","0 0","0 0","0 0"]};p._setPosition=function(){this._myPositions=["begin bottom","begin center","begin top","end center"];this._atPositions=["begin top","end center","begin bottom","begin center"]};p._setArrowPosition=function(){};p._setMinWidth=function(w){this.getDomRef().style.minWidth=w};p._setWidth=function(w){if(sap.ui.Device.system.desktop||sap.ui.Device.system.tablet){this.getContent()[0].setWidth(w)}};p.open=function(){return this.openBy(s)}};
sap.m.MultiComboBox.prototype._onAfterRenderingPopover=function(){var p=this.getPopup(),w=(this.$().outerWidth()/parseFloat(sap.m.BaseFontSize))+"rem";p._removeArrow();p._setPosition();if(sap.ui.Device.system.phone){p._setMinWidth("100%")}else{p._setWidth(w)}};
sap.m.MultiComboBox.prototype._createDialog=function(){var C=sap.m.MultiComboBoxRenderer.CSS_CLASS;var d=new sap.m.Dialog({stretchOnPhone:true,customHeader:new sap.m.Bar({contentLeft:new sap.m.InputBase({value:"tbd",width:"100%",editable:false}).addStyleClass(C+"Input")}).addStyleClass(C+"Bar")});d.getAggregation("customHeader").attachBrowserEvent("tap",function(){d.close()},this);return d};
sap.m.MultiComboBox.prototype._onBeforeOpenDialog=function(){var h=this.getPopup().getCustomHeader();h.getContentLeft()[0].setValue("tbd 2")};
sap.m.MultiComboBox.prototype.init=function(){sap.m.InputBase.prototype.init.apply(this,arguments);this._setPopupType(sap.ui.Device.system.phone?"Dialog":"Popover");this._createList()};
sap.m.MultiComboBox.prototype.onBeforeRendering=function(){sap.m.InputBase.prototype.onBeforeRendering.apply(this,arguments);var i=this.getItems(),s=this.getSelectedItems(),k=this.getSelectedKeys();this._synchronizeSelectedItemAndKey(s,k,i);this._clearList();this._fillList(i)};
sap.m.MultiComboBox.prototype.onAfterRendering=function(){sap.m.InputBase.prototype.onAfterRendering.apply(this,arguments);this.bindToInputEvent(jQuery.proxy(this._handleLiveChangeEvent,this))};
sap.m.MultiComboBox.prototype.exit=function(){sap.m.InputBase.prototype.exit.apply(this,arguments);this._removeFocusableParentPopup(this._getParentPopup());if(this._oList){this._oList.destroy();this._oList=null}};
sap.m.MultiComboBox.prototype.ontouchstart=function(e){e.setMarked();this._addActiveState()};
sap.m.MultiComboBox.prototype.ontouchend=function(e){e.setMarked();if(this.getEnabled()&&this.getEditable()){if(!this.isOpen()||!this.hasContent()){this._removeActiveState()}}};
sap.m.MultiComboBox.prototype.ontap=function(e){e.setMarked();if(!this.getEnabled()||!this.getEditable()){return}if(this.isOpen()){this.close();this._removeActiveState();return}if(this.hasContent()){this.open(true)}if(this.isOpen()){this._addActiveState()}};
sap.m.MultiComboBox.prototype._handleSelectionLiveChange=function(c){var l=c.getParameter("listItem");var i=c.getParameter("selected");var n=this._findMappedItem(l);if(l.getType()==="Inactive"){return}if(!n){return}if(i){this._setSelectedItem({item:n,id:n.getId(),key:n.getKey(),fireChangeEvent:true,suppressInvalidate:true,listItemUpdated:true})}else{this._removeSelectedItem({item:n,id:n.getId(),key:n.getKey(),fireChangeEvent:true,suppressInvalidate:true,listItemUpdated:true})}};
sap.m.MultiComboBox.prototype._handleLiveChangeEvent=function(e){var C=sap.m.MultiComboBoxRenderer.CSS_CLASS;var i=this.getItems();var I=e.target;var v=I.value;if(i.length){this.open()}i.forEach(function(o){var m=v!==""&&(o.getText().toLowerCase().indexOf(v.toLowerCase(),0)===0);var l=o._oListItem;if(v===""){m=true;this._updateSelectedItem(null)}o.data(C+"ItemVisible",m);if(l){l.setVisible(m)}},this)};
sap.m.MultiComboBox.prototype.onkeypress=function(e){e.setMarked();if(!this.getEnabled()){return}var i=this._findItemsByFirstCharacter(String.fromCharCode(e.which));if(i){}};
sap.m.MultiComboBox.prototype.onsapshow=function(e){e.setMarked();if(e.keyCode===jQuery.sap.KeyCodes.F4){e.preventDefault()}if(this.isOpen()){this.close();return}if(this.hasContent()){this.open()}};
sap.m.MultiComboBox.prototype.onsaphide=sap.m.MultiComboBox.prototype.onsapshow;
sap.m.MultiComboBox.prototype.onsapescape=function(e){if(this.isOpen()){e.setMarked();this.close()}};
sap.m.MultiComboBox.prototype.onsapenter=function(e){e.setMarked();this.close()};
sap.m.MultiComboBox.prototype.onsapdown=function(e){};
sap.m.MultiComboBox.prototype.onsapup=function(e){};
sap.m.MultiComboBox.prototype.onsaphome=function(e){};
sap.m.MultiComboBox.prototype.onsapend=function(e){};
sap.m.MultiComboBox.prototype.onsappagedown=function(e){};
sap.m.MultiComboBox.prototype.onsappageup=function(e){};
sap.m.MultiComboBox.prototype.onsapfocusleave=function(e){var p=this.getAggregation("popup");if(p){if(e.relatedControlId&&jQuery.sap.containsOrEquals(p.getFocusDomRef(),sap.ui.getCore().byId(e.relatedControlId).getFocusDomRef())){jQuery.sap.delayedCall(0,this,"focus")}}};
sap.m.MultiComboBox.prototype.addContent=function(p){};
sap.m.MultiComboBox.prototype.getPopup=function(){if(this.bIsDestroyed){return null}return this._createPopupFactory(this._getPopupType())};
sap.m.MultiComboBox.prototype.hasContent=function(){return!!this.getItems().length};
sap.m.MultiComboBox.prototype.onBeforeRenderingPopup=function(){var o=this["_onBeforeRendering"+this._getPopupType()];this._removeFocusableParentPopup(this._getParentPopup());o&&o.call(this)};
sap.m.MultiComboBox.prototype.onAfterRenderingPopup=function(){var o=this["_onAfterRendering"+this._getPopupType()];this._addFocusableParentPopup(this._getParentPopup());o&&o.call(this)};
sap.m.MultiComboBox.prototype.open=function(){var p=this.getPopup();this.focus();if(p){p.open()}return this};
sap.m.MultiComboBox.prototype.addItem=function(i){this.addAggregation("items",i);i.data(sap.m.MultiComboBoxRenderer.CSS_CLASS+"ItemVisible",true);if(this._oList){this._oList.addItem(this._mapItemToListItem(i))}return this};
sap.m.MultiComboBox.prototype.insertItem=function(i,I){this.insertAggregation("items",i,I);i.data(sap.m.MultiComboBoxRenderer.CSS_CLASS+"ItemVisible",true);if(this._oList){this._oList.insertItem(this._mapItemToListItem(i),I)}return this};
sap.m.MultiComboBox.prototype.setSelectedItems=function(I){if(!jQuery.isArray(I)||(!(I[0]instanceof sap.ui.core.Item)&&typeof I[0]!=="string")){jQuery.sap.log.error('Error: setSelectedItems() "aItems" has to be an array of sap.ui.core.Item instances or an array of valid sap.ui.core.Item Ids',this);return this}for(var i=0,o=null;i<I.length;i++){o=I[i];if(typeof o==="string"){o=sap.ui.getCore().byId(o)}this._setSelectedItem({item:o||null,id:o?o.getId():"",key:o?o.getKey():null,fireChangeEvent:true,suppressInvalidate:true})}return this};
sap.m.MultiComboBox.prototype.addSelectedItem=function(i){if(!i){return this}if(typeof i==="string"){i=sap.ui.getCore().byId(i)}this._setSelectedItem({item:i,id:i?i.getId():"",key:i?i.getKey():null,fireChangeEvent:true,suppressInvalidate:true});return this};
sap.m.MultiComboBox.prototype.setSelectedKeys=function(k){if(!k||!k.length){return this}this.removeAllSelectedItems();this.addSelectedKeys(k);return this};
sap.m.MultiComboBox.prototype.addSelectedKeys=function(k){if(!k||!k.length){return this}for(var i=0,I=null;i<k.length;i++){I=this.getItemByKey(k[i]);if(!I){continue}this._setSelectedItem({item:I,id:I.getId(),key:I.getKey(),fireChangeEvent:true,suppressInvalidate:true})}return this};
sap.m.MultiComboBox.prototype.removeSelectedKeys=function(k){if(!k||!k.length){return this}for(var i=0,I=null,l=k.length;i<l;i++){I=this.getItemByKey(k[i]);if(!I){continue}this._removeSelectedItem({item:I,id:I.getId(),key:I.getKey(),fireChangeEvent:true,suppressInvalidate:true})}return this};
sap.m.MultiComboBox.prototype.getItemAt=function(i){return this.getItems()[+i]||null};
sap.m.MultiComboBox.prototype.getSelectedItems=function(){var I=this.getAssociation("selectedItems");if(!I){return null}if(!jQuery.isArray(I)){jQuery.sap.log.error('Error: getSelectedItems() - array is expected')}for(var i=0,r=[];i<I.length;i++){r.push(sap.ui.getCore().byId(I[i]))}return r.length?r:null;};
sap.m.MultiComboBox.prototype.getSelectedKeys=function(){var I=this.getSelectedItems();if(!I){return null}for(var i=0,k=[];i<I.length;i++){k.push(I[i].getKey())}return k.length?k:null};
sap.m.MultiComboBox.prototype.getFirstItem=function(){return this.getItems()[0]||null};
sap.m.MultiComboBox.prototype.getLastItem=function(){var i=this.getItems();return i[i.length-1]||null};
sap.m.MultiComboBox.prototype.getItemByKey=function(k){for(var i=0,I=this.getItems();i<I.length;i++){if(I[i].getKey()===k){return I[i]}}return null};
sap.m.MultiComboBox.prototype.removeItem=function(i){i=this.removeAggregation("items",i);if(this._oList){this._oList.removeItem(i&&i._oListItem)}return i};
sap.m.MultiComboBox.prototype.removeAllItems=function(){var i=this.removeAllAggregation("items");if(this._oList){this._oList.removeAllItems()}return i};
sap.m.MultiComboBox.prototype.destroyItems=function(){this.destroyAggregation("items");if(this._oList){this._oList.destroyItems()}return this};
sap.m.MultiComboBox.prototype.isOpen=function(){var p=this.getAggregation("popup");return!!(p&&p.isOpen())};
sap.m.MultiComboBox.prototype.close=function(){var p=this.getAggregation("popup");if(p){p.close();this.fireSelectionFinish({selectedItems:this.getSelectedItems()})}return this};
