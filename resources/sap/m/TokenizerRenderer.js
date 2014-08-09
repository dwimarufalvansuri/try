/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 * 
 * (c) Copyright 2009-2014 SAP AG. All rights reserved
 */
jQuery.sap.declare("sap.m.TokenizerRenderer");sap.m.TokenizerRenderer={};
sap.m.TokenizerRenderer.render=function(r,c){r.write("<span");r.writeControlData(c);r.addClass("sapMTokenizer");r.writeClasses();r.write(">");var t=c.getTokens();if(t&&t.length){var l=t.length;for(var i=0;i<l;i++){var a=t[i];r.renderControl(a)}}r.write("</span>")};
