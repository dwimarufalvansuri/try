Proj4js.Proj.aea={init:function(){if(Math.abs(this.lat1+this.lat2)<Proj4js.common.EPSLN){Proj4js.reportError("aeaInitEqualLatitudes");return}this.temp=this.b/this.a;this.es=1.0-Math.pow(this.temp,2);this.e3=Math.sqrt(this.es);this.sin_po=Math.sin(this.lat1);this.cos_po=Math.cos(this.lat1);this.t1=this.sin_po;this.con=this.sin_po;this.ms1=Proj4js.common.msfnz(this.e3,this.sin_po,this.cos_po);this.qs1=Proj4js.common.qsfnz(this.e3,this.sin_po,this.cos_po);this.sin_po=Math.sin(this.lat2);this.cos_po=Math.cos(this.lat2);this.t2=this.sin_po;this.ms2=Proj4js.common.msfnz(this.e3,this.sin_po,this.cos_po);this.qs2=Proj4js.common.qsfnz(this.e3,this.sin_po,this.cos_po);this.sin_po=Math.sin(this.lat0);this.cos_po=Math.cos(this.lat0);this.t3=this.sin_po;this.qs0=Proj4js.common.qsfnz(this.e3,this.sin_po,this.cos_po);if(Math.abs(this.lat1-this.lat2)>Proj4js.common.EPSLN){this.ns0=(this.ms1*this.ms1-this.ms2*this.ms2)/(this.qs2-this.qs1)}else{this.ns0=this.con}this.c=this.ms1*this.ms1+this.ns0*this.qs1;this.rh=this.a*Math.sqrt(this.c-this.ns0*this.qs0)/this.ns0},forward:function(p){var l=p.x;var a=p.y;this.sin_phi=Math.sin(a);this.cos_phi=Math.cos(a);var q=Proj4js.common.qsfnz(this.e3,this.sin_phi,this.cos_phi);var r=this.a*Math.sqrt(this.c-this.ns0*q)/this.ns0;var t=this.ns0*Proj4js.common.adjust_lon(l-this.long0);var x=r*Math.sin(t)+this.x0;var y=this.rh-r*Math.cos(t)+this.y0;p.x=x;p.y=y;return p},inverse:function(p){var r,q,c,t,l,a;p.x-=this.x0;p.y=this.rh-p.y+this.y0;if(this.ns0>=0){r=Math.sqrt(p.x*p.x+p.y*p.y);c=1.0}else{r=-Math.sqrt(p.x*p.x+p.y*p.y);c=-1.0}t=0.0;if(r!=0.0){t=Math.atan2(c*p.x,c*p.y)}c=r*this.ns0/this.a;q=(this.c-c*c)/this.ns0;if(this.e3>=1e-10){c=1-.5*(1.0-this.es)*Math.log((1.0-this.e3)/(1.0+this.e3))/this.e3;if(Math.abs(Math.abs(c)-Math.abs(q))>.0000000001){a=this.phi1z(this.e3,q)}else{if(q>=0){a=.5*Proj4js.common.PI}else{a=-.5*Proj4js.common.PI}}}else{a=this.phi1z(this.e3,q)}l=Proj4js.common.adjust_lon(t/this.ns0+this.long0);p.x=l;p.y=a;return p},phi1z:function(e,q){var s,c,a,b,d;var p=Proj4js.common.asinz(.5*q);if(e<Proj4js.common.EPSLN)return p;var f=e*e;for(var i=1;i<=25;i++){s=Math.sin(p);c=Math.cos(p);a=e*s;b=1.0-a*a;d=.5*b*b/c*(q/(1.0-f)-s/b+.5/e*Math.log((1.0-a)/(1.0+a)));p=p+d;if(Math.abs(d)<=1e-7)return p}Proj4js.reportError("aea:phi1z:Convergence error");return null}};
