Proj4js.Proj.gnom={init:function(d){this.sin_p14=Math.sin(this.lat0);this.cos_p14=Math.cos(this.lat0);this.infinity_dist=1000*this.a;this.rc=1},forward:function(p){var s,c;var d;var a;var k;var g;var x,y;var l=p.x;var b=p.y;d=Proj4js.common.adjust_lon(l-this.long0);s=Math.sin(b);c=Math.cos(b);a=Math.cos(d);g=this.sin_p14*s+this.cos_p14*c*a;k=1.0;if((g>0)||(Math.abs(g)<=Proj4js.common.EPSLN)){x=this.x0+this.a*k*c*Math.sin(d)/g;y=this.y0+this.a*k*(this.cos_p14*s-this.sin_p14*c*a)/g}else{Proj4js.reportError("orthoFwdPointError");x=this.x0+this.infinity_dist*c*Math.sin(d);y=this.y0+this.infinity_dist*(this.cos_p14*s-this.sin_p14*c*a)}p.x=x;p.y=y;return p},inverse:function(p){var r;var z;var s,a;var c;var l,b;p.x=(p.x-this.x0)/this.a;p.y=(p.y-this.y0)/this.a;p.x/=this.k0;p.y/=this.k0;if((r=Math.sqrt(p.x*p.x+p.y*p.y))){c=Math.atan2(r,this.rc);s=Math.sin(c);a=Math.cos(c);b=Proj4js.common.asinz(a*this.sin_p14+(p.y*s*this.cos_p14)/r);l=Math.atan2(p.x*s,r*this.cos_p14*a-p.y*this.sin_p14*s);l=Proj4js.common.adjust_lon(this.long0+l)}else{b=this.phic0;l=0.0}p.x=l;p.y=b;return p}};
