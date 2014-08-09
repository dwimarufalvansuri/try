/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 * 
 * (c) Copyright 2009-2014 SAP AG. All rights reserved
 */
jQuery.sap.declare("sap.m.DateRangeSelectionRenderer");jQuery.sap.require("sap.ui.core.ValueStateSupport");jQuery.sap.require("sap.ui.core.Renderer");jQuery.sap.require("sap.m.DateRangePickerRenderer");sap.m.DateRangeSelectionRenderer=sap.ui.core.Renderer.extend(sap.m.InputBaseRenderer);
sap.m.DateRangeSelectionRenderer.render=function(r,c){r.write("<div style=\"width:100%\"");r.writeControlData(c);r.write(">");if(!c.getSplittedFromTo()){r.write("<div style=\"width:100%\">");var o=new sap.m.DateRangePicker(c.getId()+"-DrpFromTo",{delimiter:c.getDelimiter(),displayFormat:c.getDisplayFormat(),dateValue:c.getFrom(),secondDateValue:c.getTo()});o.attachChange(function(e){c.fnChangeHandler(e)});r.renderControl(o);r.write("</div>")}else{r.write("<div style='width:49%; float:left;'>");var t=new sap.m.DateRangePicker(c.getId()+"-DrpFrom",{isStartingDateRangePicker:true,displayFormat:c.getDisplayFormat(),dateValue:c.getFrom(),secondDateValue:c.getTo()});t.attachChange(function(e){c.fnChangeHandler(e)});r.renderControl(t);r.write("</div>");r.write("<div style='width:49%; float:right;'>");var T=new sap.m.DateRangePicker(c.getId()+"-DrpTo",{isStartingDateRangePicker:false,displayFormat:c.getDisplayFormat(),dateValue:c.getTo(),secondDateValue:c.getFrom()});T.attachChange(function(e){c.fnChangeHandler(e)});r.renderControl(T);r.write("</div>")}r.write("</div>")};
