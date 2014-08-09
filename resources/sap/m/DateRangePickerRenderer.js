/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 * 
 * (c) Copyright 2009-2014 SAP AG. All rights reserved
 */
jQuery.sap.require("sap.ui.core.Renderer");jQuery.sap.require("sap.m.DatePickerRenderer");jQuery.sap.declare("sap.m.DateRangePickerRenderer");sap.m.DateRangePickerRenderer=sap.ui.core.Renderer.extend(sap.m.DatePickerRenderer);
sap.m.DateRangePickerRenderer.writeInnerValue=function(r,d){r.writeAttributeEscaped("value",d._formatValue())};
