/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 * 
 * (c) Copyright 2009-2014 SAP AG. All rights reserved
 */
jQuery.sap.declare("sap.me.OverlapCalendar");jQuery.sap.require("sap.me.library");jQuery.sap.require("sap.ui.core.Control");sap.ui.core.Control.extend("sap.me.OverlapCalendar",{metadata:{library:"sap.me",properties:{"startDate":{type:"string",group:"Data",defaultValue:null},"weeksPerRow":{type:"int",group:"Appearance",defaultValue:2},"firstDayOffset":{type:"int",group:"Appearance",defaultValue:0},"showOverlapIndicator":{type:"boolean",group:"Appearance",defaultValue:false},"visible":{type:"boolean",group:"Appearance",defaultValue:true},"swipeToNavigate":{type:"boolean",group:"Behavior",defaultValue:true},"width":{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:'100%'}},aggregations:{"calendarEvents":{type:"sap.me.OverlapCalendarEvent",multiple:true,singularName:"calendarEvent"},"calendar":{type:"sap.me.Calendar",multiple:false,visibility:"hidden"},"typeLabels":{type:"sap.m.Label",multiple:true,singularName:"typeLabel",visibility:"hidden"},"nameLabels":{type:"sap.m.Label",multiple:true,singularName:"nameLabel",visibility:"hidden"}},events:{"endOfData":{},"changeDate":{}}}});sap.me.OverlapCalendar.M_EVENTS={'endOfData':'endOfData','changeDate':'changeDate'};jQuery.sap.require("sap.me.Calendar");jQuery.sap.require("sap.ui.core.theming.Parameters");
sap.me.OverlapCalendar.prototype.init=function(){this.setAggregation("calendar",new sap.me.Calendar({singleRow:true,weeksPerRow:this.getWeeksPerRow(),monthsPerRow:1,monthsToDisplay:1,dayWidth:48,dayHeight:48,swipeToNavigate:this.getSwipeToNavigate()}));this.getCalendar().attachChangeCurrentDate(this.onCurrentDateChanged,this);this._typeWithBgImages=["04","07"];this._oDaysOverlap={}};
sap.me.OverlapCalendar.prototype.onswiperight=function(e){if(this.getSwipeToNavigate()){this.getCalendar().onswiperight(e)}};
sap.me.OverlapCalendar.prototype.onswipeleft=function(e){if(this.getSwipeToNavigate()){this.getCalendar().onswipeleft(e)}};
sap.me.OverlapCalendar.prototype.setSwipeToNavigate=function(s){this.getCalendar().setSwipeToNavigate(s);this.setProperty("swipeToNavigate",s,true)};
sap.me.OverlapCalendar.prototype._getFirstDateDisplayed=function(){var f=this.getCalendar().getFirstDayOffset();var c=new Date(this.getStartDate());var C=c.getDate();var i=c.getDay();c.setDate(1);var d=i+1-f;c.setDate(C-d+1);return c};
sap.me.OverlapCalendar.prototype._getLastDateDisplayed=function(){var w=this.getCalendar().getDays();var W=w.length;var i=this.getCalendar().getWeeksPerRow();var d=i*W;var c=this._getFirstDateDisplayed();var t=new Date(c.getTime());t.setDate(t.getDate()+d-1);return t};
sap.me.OverlapCalendar.prototype.setWeeksPerRow=function(w){this.getCalendar().setWeeksPerRow(w);this.setProperty("weeksPerRow",w)};
sap.me.OverlapCalendar.prototype.getCalendar=function(){return this.getAggregation("calendar")};
sap.me.OverlapCalendar.prototype.setStartDate=function(d){this.getCalendar().setFirstDayOffset(0);this.getCalendar().setCurrentDate(d);this.setProperty("startDate",d);var o=this._getDaysOffset(new Date(d),this._getFirstDateDisplayed());this.getCalendar().setFirstDayOffset(o)};
sap.me.OverlapCalendar.prototype.onCurrentDateChanged=function(e){this.setProperty("startDate",e.getParameter("currentDate"),true);this.getCalendar().invalidate();this._renderCalendarEvents();this.fireChangeDate({firstDate:this._getFirstDateDisplayed(),endDate:this._getLastDateDisplayed()})};
sap.me.OverlapCalendar.prototype.onBeforeRendering=function(){this._aRows=[];this._lastDate=null;this._firstDate=null;var c=this.getCalendarEvents();jQuery.each(c,jQuery.proxy(this._parseCalendarEvent,this))};
sap.me.OverlapCalendar.prototype.onAfterRendering=function(){this._renderCalendarEvents()};
sap.me.OverlapCalendar.prototype._getDayId=function(d){var c=new Date(this._getFirstDateDisplayed());return this._getDaysOffset(c,d)};
sap.me.OverlapCalendar.prototype._cleanUpDivs=function(){jQuery(".sapMeOverlapCalendarDay").removeClass().addClass("sapMeOverlapCalendarDay");jQuery(".sapMeOverlapCalendarHalfDay").remove();jQuery(".sapMeOverlapCalendarDay.sapMeOverlapCalendarDayWithHalf").removeClass(".sapMeOverlapCalendarDayWithHalf");jQuery(".sapMeOverlapCalendarOverlap").css("background-color","transparent").css("border","none");jQuery(".sapMeOverlapCalendarTypeLbl").remove()};
sap.me.OverlapCalendar.prototype._renderCalendarEvents=function(){this._mHalfDays={};this._cleanUpDivs();this._oDaysOverlap={};var c=this.getCalendarEvents();jQuery.each(c,jQuery.proxy(this._renderCalendarEvent,this));jQuery.each(this._mHalfDays,jQuery.proxy(this._renderHalfDayCalendarEvent,this));if(this.getShowOverlapIndicator()){for(var i in this._oDaysOverlap){if(this._oDaysOverlap[i]!=undefined&&this._oDaysOverlap[i]>1){var $=jQuery.sap.byId("overlap-"+i);$.css("background-color",sap.ui.core.theming.Parameters.get("sapMeOverlapCalendarIndicator"));$.css("border-right","1px solid "+sap.ui.core.theming.Parameters.get("sapMeOverlapCalendarIndicator"))}}};if(this._firstDate&&this._lastDate){var a=this._getFirstDateDisplayed();a.setDate(a.getDate()+7);var b=this._getLastDateDisplayed();b.setDate(b.getDate()-7);if((this._dayIsBefore(this._lastDate,a))){this.fireEndOfData({before:false})}else if(this._dayIsAfter(this._firstDate,b)){this.fireEndOfData({before:true})}}};
sap.me.OverlapCalendar.prototype._addToDayOverlap=function(d){if(this._oDaysOverlap[d]==undefined){this._oDaysOverlap[d]=0}this._oDaysOverlap[d]++};
sap.me.OverlapCalendar.prototype._getDaysOffset=function(f,s){return Math.abs(this._getDaysDifference(f,s))};
sap.me.OverlapCalendar.prototype._getDaysDifference=function(f,s){var O=1000*60*60*24;var d=f.getTime();var a=s.getTime();var b=d-a;return Math.round(b/O)};
sap.me.OverlapCalendar.prototype._dayIsAfter=function(d,a){return(this._getDaysDifference(d,a)>0)};
sap.me.OverlapCalendar.prototype._dayIsBefore=function(d,a){return(this._getDaysDifference(d,a)<0)};
sap.me.OverlapCalendar.prototype._renderHalfDayCalendarEvent=function(k,h){var e=h[0];var $=jQuery.sap.byId(k);var t=e.getType();var b=(jQuery.inArray(t,this._typeWithBgImages)>-1);$.addClass("sapMeOverlapCalendarDayWithHalf");$.append("<div class='sapMeOverlapCalendarHalfDay sapMeOverlapCalendarType"+t+"HalfDayStart'></div>");var d=(100/(this.getCalendar().getWeeksPerRow()*7));$.children(":first").width(d+"%").height(this.getCalendar().getDayHeight());if(h.length>1){var a=h[1];var c=a.getType();$.append("<div class='sapMeOverlapCalendarHalfDay sapMeOverlapCalendarType"+c+"HalfDayEnd'></div>")}else if(b){$.append("<div class='sapMeOverlapCalendarHalfDay sapMeOverlapCalendarTypeHalfDayEnd'></div>")}$.children(":last").width(d+"%").height(this.getCalendar().getDayHeight())};
sap.me.OverlapCalendar.prototype._renderCalendarEvent=function(i,c){var s=new Date(c.getStartDay());var e=new Date(c.getEndDay());if(this._lastDate==undefined){this._lastDate=e}if(this._dayIsAfter(e,this._lastDate)){this._lastDate=e};if(this._firstDate==undefined){this._firstDate=s}if(this._dayIsBefore(s,this._firstDate)){this._firstDate=s}var a=this._getFirstDateDisplayed();var l=this._getLastDateDisplayed();if((!this._dayIsBefore(e,a))&&(!this._dayIsAfter(s,l))){var r=c.getRow();var b=this.getId()+"-row-"+r+"-lbls";var $=jQuery.sap.byId(b);var d=this._dayIsAfter(s,a)?s:a;e=this._dayIsAfter(e,l)?l:e;var n=this._getDaysOffset(d,e)+1;var f=this._getDaysOffset(a,d);var t=c.getTypeName();var g="sapMeOverlapCalendarType"+c.getType();var h=undefined;var j;if(c.getHalfDay()===true){j=this._getDayId(d);var k=r+"-"+j;if(this._mHalfDays[k]==undefined){this._mHalfDays[k]=[];h=jQuery.sap.byId(k)}this._mHalfDays[k].push(c)}else{while((this._getDaysDifference(d,e)<=0)){j=this._getDayId(d);this._addToDayOverlap(j);h=jQuery.sap.byId(r+"-"+j);h.addClass(g);d.setDate(d.getDate()+1)}}if(h!=undefined){$.width(this.getWidth());$.append("<label dir='Inherit' id='lbl"+h.attr("id")+"'>"+t+"</label>");var o=$.children('#lbl'+h.attr("id"));o.addClass("sapMeOverlapCalendarTypeLbl sapMLabel");var p=(100/(this.getCalendar().getWeeksPerRow()*7));var w=(n*p);o.width(w+"%");var q=(f*p);var m=(f==0)?1:.5;var u=q+"%";o.css("left",u);o.css("padding-left",m+"rem")}}};
sap.me.OverlapCalendar.prototype._parseCalendarEvent=function(i,c){var r=c.getRow();if(r!=-1){if(c.getName()!=undefined){if(this._aRows[r]==undefined&&c.getName()!=""){this._aRows[r]=c.getName()}}else{}}else{}};
sap.me.OverlapCalendar.prototype._getLabelForRow=function(i){return this._getLabel(this._aRows[i],"nameLabels").addStyleClass("sapMeOverlapCalendarNameLbl")};
sap.me.OverlapCalendar.prototype._getLabel=function(t,a){var l=new sap.m.Label({text:t});this.addAggregation(a,l,true);return l};
