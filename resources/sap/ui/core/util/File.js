/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 * 
 * (c) Copyright 2009-2014 SAP AG. All rights reserved
 */
sap.ui.define(['jquery.sap.global','sap/ui/Device'],function(q,D){'use strict';var F={save:function(d,f,s,m,c){var a=f+'.'+s;if(D.browser.internet_explorer){if(D.browser.version>=10){var b=new window.Blob([d]);window.navigator.msSaveOrOpenBlob(b,a)}else{var $=q(document.body);var e=q('<iframe/>',{style:'display:none'});$.append(e);var o=e.get(0).contentWindow.document;o.open(m,'replace');if(c){o.charset=c}o.write(d);o.close();o.execCommand('SaveAs',false,a+'.txt');e.remove()}}else if(D.browser.safari){location.href='data:application/download,'+encodeURIComponent(d)}else{var $=q(document.body);var g=q('<a/>',{download:a,style:'display:none'});$.append(g);var u='data:'+m;if(c){u+=';charset='+c}u+=','+encodeURIComponent(d);g.attr('href',u);g.get(0).click();g.remove()}}};return F},true);
