VBI.NavigationControl=
function(S){var n={};sap.ui.core.IconPool.insertFontFaceStyle();n.scene=null;n.suppressedVisibility=S;n.m_MinLOD=null;n.m_MaxLOD=null;n.m_lengthScrollLine=94-18;n.m_startScrollPoint=null;n.m_ID=null;n.zoomtimerfrq=33;n.zoomtimer;n.movetimer;n.bInitDrag=false;n.offsetX=0;n.offsetY=0;n.cursX=0;n.cursY=0;n.tint=20;n.m_Div=n.m_Divmapnav=n.m_Divmapscrollarea=n.m_Divmapscrollpoint=n.m_Divmapcursorgrip=n.m_Divmapcursor=n.m_Divmapcursorreset=n.m_Divmapcursorleft=n.m_Divmapcursortop=n.m_Divmapcursorright=n.m_Divmapcursordown=n.m_DivmapmobileHome=n.m_DivmapmobileHomeIcon=n.m_DivmapmobileZoomin=n.m_DivmapmobileZoominIcon=n.m_DivmapmobileZoomout=n.m_DivmapmobileZoomoutIcon=null;n.clear=function(){n.scene=null;n.m_Div=n.m_Divmapnav=n.m_Divmapscrollarea=n.m_Divmapscrollpoint=n.m_Divmapcursorgrip=n.m_Divmapcursor=n.m_Divmapcursorreset=n.m_Divmapcursorleft=n.m_Divmapcursortop=n.m_Divmapcursorright=n.m_Divmapcursordown=n.m_DivmapmobileHome=n.m_DivmapmobileHomeIcon=n.m_DivmapmobileZoomin=n.m_DivmapmobileZoominIcon=n.m_DivmapmobileZoomout=n.m_DivmapmobileZoomoutIcon=null};n.getId=function(a,b){return b+'-'+a};n.AttachEvents=function(){if(VBI.m_bIsMobile)n.AttachTouchEvents();else n.AttachMouseEvents()};n.AttachTouchEvents=function(){jQuery(n.m_DivmapmobileHome).on("click",function(){n.scene.GoToInitialStart()});jQuery(n.m_DivmapmobileHome).on("touchstart",function(){n.scene.GoToInitialStart()});jQuery(n.m_DivmapmobileHome).on("touchend",function(e){e.preventDefault()});jQuery(n.m_DivmapmobileZoomin).on("touchstart",function(){n.StartAnimatedZoom(1)});jQuery(n.m_DivmapmobileZoomin).on("touchend",function(e){if(n.zoomtimer){window.clearInterval(n.zoomtimer);n.ZoomToNextIntegerLOD(true)}e.preventDefault()});jQuery(n.m_DivmapmobileZoomin).on("touchleave",function(){if(n.zoomtimer){window.clearInterval(n.zoomtimer);n.ZoomToNextIntegerLOD(true)}});jQuery(n.m_DivmapmobileZoomout).on("touchstart",function(){n.StartAnimatedZoom(-1)});jQuery(n.m_DivmapmobileZoomout).on("touchend",function(e){if(n.zoomtimer){window.clearInterval(n.zoomtimer);n.ZoomToNextIntegerLOD(false)}e.preventDefault()});jQuery(n.m_DivmapmobileZoomout).on("touchleave",function(){if(n.zoomtimer){window.clearInterval(n.zoomtimer);n.ZoomToNextIntegerLOD(false)}})};n.AttachMouseEvents=function(){var o=1.0;var t=50;var a=null;var f=null;if(n.suppressedVisibility.fade){n.m_Divmapnav.style.opacity=1}jQuery(n.m_Divmapnav).on("mouseenter",function(e){f=e.fromElement});jQuery(n.m_Divmapnav).on("mouseup",function(){if(f)f.focus()});jQuery(n.m_Divmapnav).on("mouseleave",function(){if(!n.suppressedVisibility.fade){o=1.0;a=window.setInterval(function(){if(o<=0.5){window.clearInterval(a)}else{o-=0.01;n.m_Divmapnav.style.opacity=o}},t)}});jQuery(n.m_Divmapnav).on("mouseenter",function(){window.clearInterval(a);n.m_Divmapnav.style.opacity=1});if(!n.suppressedVisibility.zoom){if(n.suppressedVisibility.move)jQuery(n.m_Divmapscrollarea).css('top',10+'px');var m=[0,0];var b=0;jQuery(n.m_Divmapscrollpoint).on("mousedown",function(e){if(e.which==1){m=n.scene.GetCenterPos();b=jQuery(n.m_Divmapscrollpoint).position().top}});jQuery(n.m_Divmapscrollpoint).on("mouseup",function(e){if(e.which==1){var s=jQuery(n.m_Divmapscrollpoint).position().top;var z=n.m_MinLOD+(((n.m_MaxLOD-n.m_MinLOD)*(b))/n.m_lengthScrollLine);n.scene.AnimateZoomToGeo(m,Math.round(z),40);m=[0,0]}});jQuery(n.m_Divmapscrollpoint).draggable({containment:"parent",axis:"y"},{drag:function(){var s=jQuery(n.m_Divmapscrollpoint).position().top;if(s!=b){var z=n.m_MinLOD+(((n.m_MaxLOD-n.m_MinLOD)*(s))/n.m_lengthScrollLine);n.scene.ZoomToZoomlevel(m,z)}b=s}})}if(!n.suppressedVisibility.move){jQuery(n.m_Divmapcursorgrip).on("mouseenter",function(){jQuery(n.m_Divmapcursor).css("background-position","-5px 228px")}).on("mouseleave",function(){jQuery(n.m_Divmapcursor).css("background-position","-5px 305px")});var d=10;jQuery(n.m_Divmapcursorleft).on("mousedown",function(e){if(e.which==1){jQuery(this).css("background-position","-134px 194px");window.clearInterval(n.movetimer);n.movetimer=window.setInterval(function(){n.scene.MoveMap(d,0)},n.tint)}}).on("mouseup",function(e){window.clearInterval(n.movetimer);jQuery(this).css("background-position","-134px 211px")}).on("mouseout",function(e){if(n.bInitDrag==false){window.clearInterval(n.movetimer);jQuery(this).css("background-position","-134px 228px")}}).on("mousemove",function(e){if(n.bInitDrag==true)jQuery(this).css("background-position","-134px 177px")});jQuery(n.m_Divmapcursorright).on("mousedown",function(e){if(e.which==1){jQuery(this).css("background-position","-116px 194px");window.clearInterval(n.movetimer);n.movetimer=window.setInterval(function(){n.scene.MoveMap(-d,0)},n.tint)}}).on("mouseup",function(e){window.clearInterval(n.movetimer);jQuery(this).css("background-position","-116px 211px")}).on("mouseout",function(e){if(n.bInitDrag==false){window.clearInterval(n.movetimer);jQuery(this).css("background-position","-116px 228px")}}).on("mousemove",function(e){if(n.bInitDrag==true)jQuery(this).css("background-position","-116px 177px")});jQuery(n.m_Divmapcursortop).on("mousedown",function(e){if(e.which==1){jQuery(this).css("background-position","-82px 192px");window.clearInterval(n.movetimer);n.movetimer=window.setInterval(function(){n.scene.MoveMap(0,d)},n.tint)}}).on("mouseup",function(e){window.clearInterval(n.movetimer);jQuery(this).css("background-position","-82px 210px")}).on("mouseout",function(e){if(n.bInitDrag==false){window.clearInterval(n.movetimer);jQuery(this).css("background-position","-82px 228px")}}).on("mousemove",function(e){if(n.bInitDrag==true)jQuery(this).css("background-position","-82px 174px")});jQuery(n.m_Divmapcursordown).on("mousedown",function(e){if(e.which==1){jQuery(this).css("background-position","-99px 192px");window.clearInterval(n.movetimer);n.movetimer=window.setInterval(function(){n.scene.MoveMap(0,-d)},n.tint)}}).on("mouseup",function(e){window.clearInterval(n.movetimer);jQuery(this).css("background-position","-99px 210px")}).on("mouseout",function(e){if(n.bInitDrag==false){window.clearInterval(n.movetimer);jQuery(this).css("background-position","-99px 228px")}}).on("mousemove",function(e){if(n.bInitDrag==true)jQuery(this).css("background-position","-99px 174px")});n.cursX=jQuery(n.m_Divmapcursorreset).position().left;n.cursY=jQuery(n.m_Divmapcursorreset).position().top;jQuery(n.m_Divmapcursorreset).on("dragstart",function(e){e.preventDefault()});jQuery(n.m_Divmapcursorreset).on("mousedown",function(e){jQuery(n.m_Divmapcursorleft).css("background-position","-134px 177px");jQuery(n.m_Divmapcursorright).css("background-position","-116px 177px");jQuery(n.m_Divmapcursordown).css("background-position","-99px 174px");jQuery(n.m_Divmapcursortop).css("background-position","-82px 174px");jQuery(this).css("background-position","-222px 263px");n.offsetX=e.pageX-n.cursX;n.offsetY=e.pageY-n.cursY;window.clearInterval(n.movetimer);n.movetimer=0;n.bInitDrag=true;document.addEventListener('mouseup',n.processmouseup,true);document.addEventListener('mousemove',n.processmousemove,true)});jQuery(n.m_Divmapcursorreset).css("position","");jQuery(n.m_Divmapcursorreset).on("dblclick",function(){n.scene.GoToInitialStart()})}};n.AppendButton=function(){n.m_Divmapnav=VBI.Utilities.CreateGeoSceneDivCSS(n.getId('vbi-nav',n.m_ID),'vbi-nav');n.m_DivmapmobileHome=VBI.Utilities.CreateGeoSceneDivCSS(n.getId('vbi-navmobile-home',n.m_ID),'vbi-navmobile-home');n.m_DivmapmobileHome.innerHTML="\ue070";n.m_Divmapnav.appendChild(n.m_DivmapmobileHome);if(!n.suppressedVisibility.zoom){n.m_DivmapmobileZoomin=VBI.Utilities.CreateGeoSceneDivCSS(n.getId('vbi-navmobile-zoomin',n.m_ID),'vbi-navmobile-zoomin');n.m_DivmapmobileZoomin.innerHTML="+";n.m_Divmapnav.appendChild(n.m_DivmapmobileZoomin);n.m_DivmapmobileZoomout=VBI.Utilities.CreateGeoSceneDivCSS(n.getId('vbi-navmobile-zoomout',n.m_ID),'vbi-navmobile-zoomout');n.m_DivmapmobileZoomout.innerHTML="-";n.m_Divmapnav.appendChild(n.m_DivmapmobileZoomout)}n.scene.m_Div.appendChild(n.m_Divmapnav)};n.AppendDiv=function(){var r=sap.ui.getCore().getLibraryResourceBundle("sap.ui.vbm");var t=r.getText("NAVCTL_TITLE_MOVE_ARROWS");var T=r.getText("NAVCTL_TITLE_ZOOM",[0]);T=T.substr(0,T.search(/[0-9]/));n.m_Divmapnav=VBI.Utilities.CreateGeoSceneDivCSS(n.getId('vbi-nav',n.m_ID),'vbi-nav');n.m_Divmapcursor=VBI.Utilities.CreateGeoSceneDivCSS(n.getId('vbi-cursor',n.m_ID),'vbi-cursor');n.m_Divmapscrollarea=VBI.Utilities.CreateGeoSceneDivCSS(n.getId('vbi-scrollarea',n.m_ID),'vbi-scrollarea');n.m_Divmapcursorgrip=VBI.Utilities.CreateGeoSceneDivCSS(n.getId('vbi-cursor-grip',n.m_ID),'vbi-cursor-grip');var m=VBI.Utilities.CreateGeoSceneDivCSS(n.getId('vbi-cursor-middle',n.m_ID),'vbi-cursor-middle');var a=VBI.Utilities.CreateGeoSceneDivCSS(n.getId('vbi-scrolllineupperending',n.m_ID),'vbi-scrolllineupperending');var b=VBI.Utilities.CreateGeoSceneDivCSS(n.getId('vbi-scrollline',n.m_ID),'vbi-scrollline');var c=VBI.Utilities.CreateGeoSceneDivCSS(n.getId('vbi-scrolllinelowerending',n.m_ID),'vbi-scrolllinelowerending');n.m_Divmapscrollpoint=VBI.Utilities.CreateGeoSceneDivCSS(n.getId('vbi-scrollpoint',n.m_ID),'vbi-scrollpoint',T);n.m_Divmapcursorleft=VBI.Utilities.CreateGeoSceneDivCSS(n.getId('vbi-cursor-left',n.m_ID),'vbi-cursor-left',t);n.m_Divmapcursorright=VBI.Utilities.CreateGeoSceneDivCSS(n.getId('vbi-cursor-right',n.m_ID),'vbi-cursor-right',t);n.m_Divmapcursortop=VBI.Utilities.CreateGeoSceneDivCSS(n.getId('vbi-cursor-top',n.m_ID),'vbi-cursor-top',t);n.m_Divmapcursordown=VBI.Utilities.CreateGeoSceneDivCSS(n.getId('vbi-cursor-down',n.m_ID),'vbi-cursor-down',t);n.m_Divmapcursorreset=VBI.Utilities.CreateGeoSceneDivCSS(n.getId('vbi-cursor-reset',n.m_ID),'vbi-cursor-reset',r.getText("NAVCTL_TITLE_MOVE"));m.appendChild(n.m_Divmapcursorleft);m.appendChild(n.m_Divmapcursorright);m.appendChild(n.m_Divmapcursortop);m.appendChild(n.m_Divmapcursordown);m.appendChild(n.m_Divmapcursorreset);n.m_Divmapcursorgrip.appendChild(m);n.m_Divmapscrollarea.appendChild(a);n.m_Divmapscrollarea.appendChild(b);n.m_Divmapscrollarea.appendChild(c);n.m_Divmapscrollarea.appendChild(n.m_Divmapscrollpoint);if(!n.suppressedVisibility.zoom){n.m_Divmapnav.appendChild(n.m_Divmapscrollarea)}if(!n.suppressedVisibility.move){n.m_Divmapnav.appendChild(n.m_Divmapcursor);n.m_Divmapnav.appendChild(n.m_Divmapcursorgrip)}n.scene.m_Div.appendChild(n.m_Divmapnav)};n.AdaptMinMaxLOD=function(s){n.m_MinLOD=n.scene.GetMinLOD();n.m_MaxLOD=n.scene.GetMaxLOD()};n.Awake=function(s,t){n.scene=s;n.m_MinLOD=n.scene.GetMinLOD();n.m_MaxLOD=n.scene.GetMaxLOD();var l=jQuery.sap.byId(t);n.m_ID=jQuery(l).attr('id');if(VBI.m_bIsMobile){n.AppendButton()}else{n.AppendDiv();n.m_Divmapnav.style.opacity=0.5;n.m_startScrollPoint=0}n.AttachEvents()};n.AdjustScrollPoint=function(l){if(VBI.m_bIsMobile)return;if(l){var c=((n.m_lengthScrollLine*(l-n.m_MinLOD))/(n.m_MaxLOD-n.m_MinLOD))+n.m_startScrollPoint;jQuery(n.m_Divmapscrollpoint).css('top',c+'px')}else{var a=n.scene.GetCurrentZoomlevel();var c=((n.m_lengthScrollLine*(a-n.m_MinLOD))/(n.m_MaxLOD-n.m_MinLOD))+n.m_startScrollPoint;jQuery(n.m_Divmapscrollpoint).css('top',c+'px')}};n.StopAnimatedMove=function(){window.clearInterval(n.movetimer);n.movetimer=0;jQuery(n.m_Divmapcursorleft).removeAttr("style");jQuery(n.m_Divmapcursorright).removeAttr("style");jQuery(n.m_Divmapcursordown).removeAttr("style");jQuery(n.m_Divmapcursortop).removeAttr("style");jQuery(n.m_Divmapcursorreset).removeAttr("style");jQuery(n.m_Divmapcursorreset).css('top',21+'px');jQuery(n.m_Divmapcursorreset).css('left',21+'px')};n.ZoomToNextIntegerLOD=function(z){var l=n.scene.m_Canvas[0].m_nExactLOD;var a=z?Math.ceil(l):Math.floor(l);if(l!=a)n.scene.AnimateZoomToGeo(n.scene.GetCenterPos(),a,n.zoomtimerfrq)};n.StartAnimatedZoom=function(z){var a=n.scene.GetCenterPos();if(n.zoomtimer)window.clearInterval(n.zoomtimer);n.zoomtimer=window.setInterval(function(){var b=n.scene.GetCurrentZoomlevel()+0.2*z;n.scene.ZoomToZoomlevel(a,b)},n.zoomtimerfrq)};n.processmouseup=function(){n.bInitDrag=false;n.StopAnimatedMove();document.removeEventListener('mouseup',n.processmouseup,true);document.removeEventListener('mousemove',n.processmousemove,true)};n.processmousemove=function(e){var s,a;if(n.bInitDrag==true){window.clearInterval(n.movetimer);n.movetimer=0;var b=e.pageX-n.offsetX;var c=e.pageY-n.offsetY;var d=parseInt(Math.sqrt(Math.pow(b-n.cursX,2)+Math.pow(c-n.cursY,2)));var m=17;if(d>m){var f=Math.atan2(b-n.cursX,c-n.cursY);s=Math.ceil((n.cursX+(Math.sin(f)*m)));a=Math.ceil((n.cursY+(Math.cos(f)*m)));d=m}else{s=b;a=c}jQuery(n.m_Divmapcursorreset).css('top',a+'px');jQuery(n.m_Divmapcursorreset).css('left',s+'px');var g=-(jQuery(n.m_Divmapcursorreset).position().left-n.cursX)*(d/m);var h=-(jQuery(n.m_Divmapcursorreset).position().top-n.cursY)*(d/m);n.movetimer=window.setInterval(function(){n.scene.MoveMap(g,h)},n.tint)}};return n}
;
