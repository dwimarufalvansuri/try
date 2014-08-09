﻿ Proj4js.Proj.krovak={init:function(){this.a=6377397.155;this.es=0.006674372230614;this.e=Math.sqrt(this.es);if(!this.lat0){this.lat0=0.863937979737193}if(!this.long0){this.long0=0.7417649320975901-0.308341501185665}if(!this.k0){this.k0=0.9999}this.s45=0.785398163397448;this.s90=2*this.s45;this.fi0=this.lat0;this.e2=this.es;this.e=Math.sqrt(this.e2);this.alfa=Math.sqrt(1.+(this.e2*Math.pow(Math.cos(this.fi0),4))/(1.-this.e2));this.uq=1.04216856380474;this.u0=Math.asin(Math.sin(this.fi0)/this.alfa);this.g=Math.pow((1.+this.e*Math.sin(this.fi0))/(1.-this.e*Math.sin(this.fi0)),this.alfa*this.e/2.);this.k=Math.tan(this.u0/2.+this.s45)/Math.pow(Math.tan(this.fi0/2.+this.s45),this.alfa)*this.g;this.k1=this.k0;this.n0=this.a*Math.sqrt(1.-this.e2)/(1.-this.e2*Math.pow(Math.sin(this.fi0),2));this.s0=1.37008346281555;this.n=Math.sin(this.s0);this.ro0=this.k1*this.n0/Math.tan(this.s0);this.ad=this.s90-this.uq},forward:function(p){var g,u,a,s,d,e,r;var l=p.x;var b=p.y;var c=Proj4js.common.adjust_lon(l-this.long0);g=Math.pow(((1.+this.e*Math.sin(b))/(1.-this.e*Math.sin(b))),(this.alfa*this.e/2.));u=2.*(Math.atan(this.k*Math.pow(Math.tan(b/2.+this.s45),this.alfa)/g)-this.s45);a=-c*this.alfa;s=Math.asin(Math.cos(this.ad)*Math.sin(u)+Math.sin(this.ad)*Math.cos(u)*Math.cos(a));d=Math.asin(Math.cos(u)*Math.sin(a)/Math.cos(s));e=this.n*d;r=this.ro0*Math.pow(Math.tan(this.s0/2.+this.s45),this.n)/Math.pow(Math.tan(s/2.+this.s45),this.n);p.y=r*Math.cos(e)/1.0;p.x=r*Math.sin(e)/1.0;if(this.czech){p.y*=-1.0;p.x*=-1.0}return(p)},inverse:function(p){var u,a,s,d,e,r,f;var o;var t=p.x;p.x=p.y;p.y=t;if(this.czech){p.y*=-1.0;p.x*=-1.0}r=Math.sqrt(p.x*p.x+p.y*p.y);e=Math.atan2(p.y,p.x);d=e/Math.sin(this.s0);s=2.*(Math.atan(Math.pow(this.ro0/r,1./this.n)*Math.tan(this.s0/2.+this.s45))-this.s45);u=Math.asin(Math.cos(this.ad)*Math.sin(s)-Math.sin(this.ad)*Math.cos(s)*Math.cos(d));a=Math.asin(Math.cos(s)*Math.sin(d)/Math.cos(u));p.x=this.long0-a/this.alfa;f=u;o=0;var i=0;do{p.y=2.*(Math.atan(Math.pow(this.k,-1./this.alfa)*Math.pow(Math.tan(u/2.+this.s45),1./this.alfa)*Math.pow((1.+this.e*Math.sin(f))/(1.-this.e*Math.sin(f)),this.e/2.))-this.s45);if(Math.abs(f-p.y)<0.0000000001)o=1;f=p.y;i+=1}while(o==0&&i<15);if(i>=15){Proj4js.reportError("PHI3Z-CONV:Latitude failed to converge after 15 iterations");return null}return(p)}};
