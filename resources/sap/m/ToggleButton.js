/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 * 
 * (c) Copyright 2009-2014 SAP AG. All rights reserved
 */
jQuery.sap.declare("sap.m.ToggleButton");jQuery.sap.require("sap.m.library");jQuery.sap.require("sap.m.Button");sap.m.Button.extend("sap.m.ToggleButton",{metadata:{library:"sap.m",properties:{"pressed":{type:"boolean",group:"Data",defaultValue:false}}}});
sap.m.ToggleButton.prototype.ontap=function(e){if(this.getEnabled()){if(this.$().is(":visible")){this.firePress({pressed:this.getPressed()})}}e.preventDefault();e.stopPropagation();this.setPressed(!this.getPressed())};
sap.m.ToggleButton.prototype.setPressed=function(p){if(p!=this.getProperty("pressed")){this.setProperty("pressed",p,true);var i=this.$("inner");if(this.getProperty("enabled")){if(!this.getPressed()){i.removeClass("sapMToggleBtnPressed");i.attr("pressed",false)}else{i.addClass("sapMToggleBtnPressed");i.attr("pressed",true)}this.$("img").attr('src',this.getPressed()&&this.getIcon())}}return this};
sap.m.ToggleButton.prototype.onAfterRendering=function(){var i=this.$("inner");if(!this.getPressed()){i.removeClass("sapMToggleBtnPressed");i.attr("pressed",false)}else{i.addClass("sapMToggleBtnPressed");i.attr("pressed",true)}};
sap.m.ToggleButton.prototype.onkeydown=function(e){if(e.which===jQuery.sap.KeyCodes.SPACE||e.which===jQuery.sap.KeyCodes.ENTER){this.ontap(e)}};
