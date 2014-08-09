/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 * 
 * (c) Copyright 2009-2014 SAP AG. All rights reserved
 */
jQuery.sap.declare("sap.ui.unified.ShellHeadUserItem");jQuery.sap.require("sap.ui.unified.library");jQuery.sap.require("sap.ui.core.Element");sap.ui.core.Element.extend("sap.ui.unified.ShellHeadUserItem",{metadata:{library:"sap.ui.unified",properties:{"username":{type:"string",group:"Appearance",defaultValue:''},"image":{type:"sap.ui.core.URI",group:"Appearance",defaultValue:null}},events:{"press":{}}}});sap.ui.unified.ShellHeadUserItem.M_EVENTS={'press':'press'};jQuery.sap.require("sap.ui.core.IconPool");sap.ui.core.IconPool.getIconInfo("","");
sap.ui.unified.ShellHeadUserItem.prototype.onclick=function(e){this.firePress()};
sap.ui.unified.ShellHeadUserItem.prototype.setImage=function(i){this.setProperty("image",i,true);if(this.getDomRef()){this._refreshImage()}return this};
sap.ui.unified.ShellHeadUserItem.prototype.setUsername=function(u){this.setProperty("username",u,true);if(this.getDomRef()){this.$("name").html("").text(jQuery.sap.encodeHTML(u||""))}return this};
sap.ui.unified.ShellHeadUserItem.prototype._refreshImage=function(){var i=this.$("img");var I=this.getImage();i.html("").css("style","");if(!I){i.css("display","none")}else if(sap.ui.core.IconPool.isIconURI(I)){var o=sap.ui.core.IconPool.getIconInfo(I);if(o){i.text(o.content).css("font-family","'"+o.fontFamily+"'")}}else{i.html("<img src='"+jQuery.sap.encodeHTML(I)+"'></img>")}};
