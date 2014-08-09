/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 * 
 * (c) Copyright 2009-2014 SAP AG. All rights reserved
 */
jQuery.sap.declare("sap.m.FeedInputRenderer");sap.m.FeedInputRenderer={};
sap.m.FeedInputRenderer.render=function(r,c){if(!c.getVisible()){return}r.write("<div");r.writeControlData(c);r.addClass("sapMFeedIn");r.addClass("sapMFeedInBG"+c.getBackgroundDesign());r.writeClasses();r.write(">");r.renderControl(c._getTextArea());r.renderControl(c._getPostButton());r.write("</div>")};
