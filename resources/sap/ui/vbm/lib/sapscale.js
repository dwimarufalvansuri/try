VBI.Scale=
function(s){var a={};a.m_Scene=s;a.m_ID=null;a.clear=function(){a.m_Scene=null};a.Awake=function(t){var l=jQuery.sap.byId(t);a.m_ID=$(l).attr('id');jQuery(l).vbinav({scale:a})};return a}
;
