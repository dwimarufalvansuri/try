/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 * 
 * (c) Copyright 2009-2014 SAP AG. All rights reserved
 */
sap.ui.define(['jquery.sap.global','./ControlTree','./Highlighter','./LogViewer','./PropertyList'],function(q,C,H,L,P){"use strict";var D=function(){};D.prototype.startPlugin=function(c,o){this.oCore=c;this.oWindow=window;this.bRunsEmbedded=typeof window.top.testfwk=="undefined";q.sap.log.info("Starting DebugEnv plugin ("+(this.bRunsEmbedded?"embedded":"testsuite")+")");if(!this.bRunsEmbedded||c.getConfiguration().getInspect()){this.init(o)}if(!this.bRunsEmbedded||c.getConfiguration().getTrace()){this.initLogger(q.sap.log,o)}};D.prototype.stopPlugin=function(){q.sap.log.info("Stopping DebugEnv plugin.");this.oCore=null};D.prototype.init=function(o){this.oControlTreeWindow=this.bRunsEmbedded?this.oWindow:(top.frames["sap-ui-ControlTreeWindow"]||top);this.oPropertyListWindow=this.bRunsEmbedded?this.oWindow:(top.frames["sap-ui-PropertyListWindow"]||top);var r=sap.ui.getCore().getConfiguration().getRTL();var c=this.oControlTreeWindow.document.getElementById("sap-ui-ControlTreeRoot"),p=this.oPropertyListWindow.document.getElementById("sap-ui-PropertyWindowRoot");if(!c){c=this.oControlTreeWindow.document.createElement("DIV");c.setAttribute("id","sap-ui-ControlTreeRoot");c.setAttribute("tabindex",-1);c.style.position="absolute";c.style.fontFamily="Arial";c.style.fontSize="8pt";c.style.backgroundColor="white";c.style.color="black";c.style.border="1px solid gray";c.style.overflow="auto";c.style.zIndex="999999";c.style.top="1px";if(r){c.style.left="1px"}else{c.style.right="1px"}c.style.height="49%";c.style.width="200px";this.oControlTreeWindow.document.body.appendChild(c)}else{c.innerHTML=""}this.oControlTreeRoot=c;if(!p){p=this.oPropertyListWindow.document.createElement("DIV");p.setAttribute("id","sap-ui-PropertyWindowRoot");p.setAttribute("tabindex",-1);p.style.position="absolute";p.style.fontFamily="Arial";p.style.fontSize="8pt";p.style.backgroundColor="white";p.style.color="black";p.style.border="1px solid gray";p.style.overflow="auto";p.style.zIndex="99999";p.style.width="196px";p.style.height="49%";if(r){p.style.left="1px"}else{p.style.right="1px"}p.style.bottom="1px";this.oPropertyListWindow.document.body.appendChild(p)}else{p.innerHTML=""}this.oPropertyWindowRoot=p;this.oControlTree=new C(this.oCore,this.oWindow,c,this.bRunsEmbedded);this.oPropertyList=new P(this.oCore,this.oWindow,p);this.oControlTree.attachEvent(C.M_EVENTS.SELECT,this.oPropertyList.update,this.oPropertyList);if(!o){this.oControlTree.renderDelayed()}q(window).unload(q.proxy(function(e){this.oControlTree.exit();this.oPropertyList.exit()},this))};D.prototype.initLogger=function(l,o){this.oLogger=l;if(!this.bRunsEmbedded){this.oTraceWindow=top.frames["sap-ui-TraceWindow"];this.oTraceViewer=this.oTraceWindow.oLogViewer=new L(this.oTraceWindow,'sap-ui-TraceWindowRoot');this.oTraceViewer.sLogEntryClassPrefix="lvl";this.oTraceViewer.lock()}else{this.oTraceWindow=this.oWindow;this.oTraceViewer=new L(this.oTraceWindow,'sap-ui-TraceWindowRoot')}this.oLogger.addLogListener(this.oTraceViewer);this.oCore.attachUIUpdated(this.enableLogViewer,this);if(!o){var t=this;this.oTimer=setTimeout(function(){t.enableLogViewer()},0)}};D.prototype.enableLogViewer=function(){if(this.oTimer){clearTimeout(this.oTimer);this.oTimer=undefined}this.oCore.detachUIUpdated(this.enableLogViewer,this);if(this.oTraceViewer){this.oTraceViewer.unlock()}};D.prototype.isRunningEmbedded=function(){return this.bRunsEmbedded};D.prototype.isControlTreeShown=function(){return q(this.oControlTreeRoot).css("visibility")==="visible"||q(this.oControlTreeRoot).css("visibility")==="inherit"};D.prototype.showControlTree=function(){if(!this.oControlTreeRoot){this.init(false)}q(this.oControlTreeRoot).css("visibility","visible")};D.prototype.hideControlTree=function(){q(this.oControlTreeRoot).css("visibility","hidden")};D.prototype.isTraceWindowShown=function(){var l=this.oTraceWindow&&this.oTraceWindow.document.getElementById('sap-ui-TraceWindowRoot');return l&&(q(l).css("visibility")==="visible"||q(l).css("visibility")==="inherit")};D.prototype.showTraceWindow=function(){if(!this.oTraceWindow&&q&&q.sap&&q.sap.log){this.initLogger(q.sap.log,false)}var l=this.oTraceWindow&&this.oTraceWindow.document.getElementById('sap-ui-TraceWindowRoot');if(l){q(l).css("visibility","visible")}};D.prototype.hideTraceWindow=function(){var l=this.oTraceWindow&&this.oTraceWindow.document.getElementById('sap-ui-TraceWindowRoot');if(l){q(l).css("visibility","hidden")}};D.prototype.isPropertyListShown=function(){return q(this.oPropertyWindowRoot).css("visibility")==="visible"||q(this.oPropertyWindowRoot).css("visibility")==="inherit"};D.prototype.showPropertyList=function(){if(!this.oPropertyWindowRoot){this.init(false)}q(this.oPropertyWindowRoot).css("visibility","visible")};D.prototype.hidePropertyList=function(){q(this.oPropertyWindowRoot).css("visibility","hidden")};(function(){var t=new D();sap.ui.getCore().registerPlugin(t);D.getInstance=q.sap.getter(new sap.ui.base.Interface(t,["isRunningEmbedded","isControlTreeShown","showControlTree","hideControlTree","isTraceWindowShown","showTraceWindow","hideTraceWindow","isPropertyListShown","showPropertyList","hidePropertyList"]))}());return D},true);
