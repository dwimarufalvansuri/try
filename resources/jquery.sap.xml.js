/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 * 
 * (c) Copyright 2009-2014 SAP AG. All rights reserved
 */
sap.ui.define(['jquery.sap.global','sap/ui/Device'],function(q,D){"use strict";q.sap.parseXML=function parseXML(x){var X;if(window.DOMParser){var p=new DOMParser();try{X=p.parseFromString(x,"text/xml")}catch(e){var P=q.sap.getParseError(X);X={};P.reason=e.message;X.parseError=P;return X}}else{X=new ActiveXObject("Microsoft.XMLDOM");X.async=false;X.loadXML(x)}var P=q.sap.getParseError(X);if(P){if(!X.parseError){X.parseError=P}}return X};q.sap.serializeXML=function serializeXML(x){var X="";if(window.ActiveXObject){X=x.xml;if(X){return X}}if(window.XMLSerializer){var s=new XMLSerializer();X=s.serializeToString(x)}return X};q.sap.isEqualNode=function(n,N){if(n===N)return true;if(!n||!N)return false;if(n.isEqualNode){return n.isEqualNode(N)}if(n.nodeType!=N.nodeType)return false;if(n.nodeValue!=N.nodeValue)return false;if(n.baseName!=N.baseName)return false;if(n.nodeName!=N.nodeName)return false;if(n.nameSpaceURI!=N.nameSpaceURI)return false;if(n.prefix!=N.prefix)return false;if(n.nodeType!=1)return true;if(n.attributes.length!=N.attributes.length)return false;for(var i=0;i<n.attributes.length;i++){if(!q.sap.isEqualNode(n.attributes[i],N.attributes[i])){return false}}if(n.childNodes.length!=N.childNodes.length)return false;for(var i=0;i<n.childNodes.length;i++){if(!q.sap.isEqualNode(n.childNodes[i],N.childNodes[i])){return false}}return true};q.sap.getParseError=function getParseError(d){var p={errorCode:-1,url:"",reason:"unknown error",srcText:"",line:-1,linepos:-1,filepos:-1};if(!!D.browser.internet_explorer&&d&&d.parseError&&d.parseError.errorCode!=0){return d.parseError}if(!!D.browser.firefox&&d&&d.documentElement&&d.documentElement.tagName=="parsererror"){var e=d.documentElement.firstChild.nodeValue,r=/XML Parsing Error: (.*)\nLocation: (.*)\nLine Number (\d+), Column (\d+):(.*)/;if(r.test(e)){p.reason=RegExp.$1;p.url=RegExp.$2;p.line=parseInt(RegExp.$3,10);p.linepos=parseInt(RegExp.$4,10);p.srcText=RegExp.$5}return p}if(!!D.browser.webkit&&d&&d.documentElement&&d.documentElement.tagName=="html"&&d.getElementsByTagName("parsererror").length>0){var e=q.sap.serializeXML(d),r=/error on line (\d+) at column (\d+): ([^<]*)/;if(r.test(e)){p.reason=RegExp.$3;p.url="";p.line=parseInt(RegExp.$1,10);p.linepos=parseInt(RegExp.$2,10);p.srcText=""}return p}if(!d||!d.documentElement){return p}return{errorCode:0}};return q},false);
