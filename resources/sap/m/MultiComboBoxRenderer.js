/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 * 
 * (c) Copyright 2009-2014 SAP AG. All rights reserved
 */
jQuery.sap.declare("sap.m.MultiComboBoxRenderer");jQuery.sap.require("sap.m.InputBaseRenderer");jQuery.sap.require("sap.ui.core.Renderer");jQuery.sap.require("sap.ui.core.ValueStateSupport");sap.m.MultiComboBoxRenderer=sap.ui.core.Renderer.extend(sap.m.InputBaseRenderer);sap.m.MultiComboBoxRenderer.CSS_CLASS="sapMMultiComboBox";
sap.m.MultiComboBoxRenderer.addOuterClasses=function(r,c){var C=sap.m.MultiComboBoxRenderer.CSS_CLASS;r.addClass(C);r.addClass(C+"Input")};
sap.m.MultiComboBoxRenderer.addInnerClasses=function(r,c){r.addClass(sap.m.MultiComboBoxRenderer.CSS_CLASS+"InputInner")};
sap.m.MultiComboBoxRenderer.writeInnerContent=function(r,c){r.write('<div class="'+sap.m.MultiComboBoxRenderer.CSS_CLASS+"Arrow"+'"></div>')};
sap.m.MultiComboBoxRenderer.writeInnerValue=function(r,c){var s=c.getSelectedItems()||[];for(var i=0,v="",l=s.length;i<l;i++){v=v+s[i].getText()}r.writeAttributeEscaped("value",v)};
