/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 * 
 * (c) Copyright 2009-2014 SAP AG. All rights reserved
 */
jQuery.sap.declare("sap.m.ComboBoxRenderer");jQuery.sap.require("sap.m.InputBaseRenderer");jQuery.sap.require("sap.ui.core.Renderer");sap.m.ComboBoxRenderer=sap.ui.core.Renderer.extend(sap.m.InputBaseRenderer);sap.m.ComboBoxRenderer.CSS_CLASS="sapMComboBox";
sap.m.ComboBoxRenderer.addOuterStyles=function(r,c){r.addStyle("max-width",c.getMaxWidth())};
sap.m.ComboBoxRenderer.addOuterClasses=function(r,c){var C=sap.m.ComboBoxRenderer.CSS_CLASS;r.addClass(C);r.addClass(C+"Input")};
sap.m.ComboBoxRenderer.addInnerClasses=function(r,c){r.addClass(sap.m.ComboBoxRenderer.CSS_CLASS+"InputInner")};
sap.m.ComboBoxRenderer.prependInnerContent=function(r,c){r.write('<input disabled="disabled" autocomplete="off" spellcheck="false"');r.writeAttribute("id",c.getId()+"-hint");r.addClass(sap.m.ComboBoxRenderer.CSS_CLASS+"Hint");r.addClass("sapMInputBaseInner");r.writeClasses();r.write(">")};
sap.m.ComboBoxRenderer.writeInnerContent=function(r,c){r.write('<div tabindex="-1"');r.writeAttribute("id",c.getId()+"-arrow");r.addClass(sap.m.ComboBoxRenderer.CSS_CLASS+"Arrow");r.writeClasses();r.write("></div>")};
sap.m.ComboBoxRenderer.writeInnerValue=function(r,c){var s=c.getSelectedItem();if(c.getForceSelection()&&s){r.writeAttributeEscaped("value",s.getText())}};
