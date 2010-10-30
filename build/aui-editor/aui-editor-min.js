AUI.add("aui-editor-tools-plugin",function(C){var H=C.Lang,I="justify",G={div:true,h1:true,h2:true,h3:true,h4:true,h5:true,h6:true,p:true},E={br:true},B={li:true},D='<div style="text-align: {0};">{1}</div>';var F={};C.mix(C.Plugin.ExecCommand.COMMANDS,{justify:function(L,K){var P=this;var Q=P.get("host");var J=Q.getInstance();var O=new J.Selection();var N=O.getSelected();var M=false;if(O.isCollapsed||!N.size()){var A=O.anchorTextNode;N=[A];M=true;}N.each(function(U,R,W){var S=U.get("tagName");if(S){S=S.toLowerCase();}if(E[S]){return;}if(S=="font"){var V=U.get("parentNode");if(!V.test("body")){U=V;S=U.get("tagName").toLowerCase();}}if(!U.test("body")&&U.getComputedStyle("textAlign")==K){return;}var T=U.get("parentNode");var X;if(G[S]||U.getComputedStyle("display")=="block"){X=U;}else{if(!T.get("childNodes").item(1)||B[S]){S=T.get("tagName").toLowerCase();if(G[S]||T.getComputedStyle("display")=="block"){X=T;}}else{if(M){Q.execCommand("inserthtml",H.sub(D,[K,J.Selection.CURSOR]));O.focusCursor(true,true);return;}else{X=C.Node.create(H.sub(D,[K,""]));T.insert(X,U);X.append(U);}}}if(X){X.setStyle("textAlign",K);}});},justifycenter:function(){var A=this;return A.get("host").execCommand(I,"center");},justifyleft:function(){var A=this;return A.get("host").execCommand(I,"left");},justifyright:function(){var A=this;return A.get("host").execCommand(I,"right");},subscript:function(){var A=this;return A.get("host").execCommand("wrap","sub");},superscript:function(){var A=this;return A.get("host").execCommand("wrap","sup");},wraphtml:function(M,O){var A=this;var L=A.get("host");var N=L.getInstance();var K=new N.Selection();var J=K.getSelected();if(!K.isCollapsed&&J.size()){J.each(function(R,P,S){var Q=R.ancestor();var T=C.Node.create(O);if(T.html()!=""){if(T.html()=="{0}"){T.html("");}else{A._findInsert(T);}}Q.insert(T,R);T.append(R);});}else{L.execCommand("inserthtml",H.sub(O,[N.Selection.CURSOR]));if(O.indexOf("{0}")!=-1){K.focusCursor(true,true);}}},_findInsert:function(J){var A=this;var K=null;var L=J.get("childNodes");L.some(function(N,M,O){if(N.get("innerHTML")=="{0}"){K.html("");K=N;return true;}return A._findInsert(N);});if(K){wrapper=K;return true;}return false;}});C.Plugin.EditorTools=F;},"@VERSION@",{requires:["aui-base","editor-base"]});AUI.add("aui-editor-menu-plugin",function(E){var L=E.Lang,B=L.isString,G=E.ClassNameManager.getClassName,Q="editormenu",D="editormenuplugin",N="menu",R="content",C=G(Q,R,"list"),I=G(Q,R,"text"),K=G(Q,R,"item"),O="<{1}{2}>{0}</{1}>",M='<li class="'+K+'">'+O+"</li>",F='<ul class="'+C+'"></ul>',J='<li class="'+I+'"><span>{0}</span></li>';var H=E.Component.create({NAME:Q,EXTENDS:E.OverlayContext,ATTRS:{headerContent:{value:"",setter:function(S){var A=this;A._headerContent=S;return"";}},host:{value:false},items:{value:null}},prototype:{renderUI:function(){var A=this;H.superclass.renderUI.apply(A,arguments);var X=A.get("host");var T=A.get("contentBox");var V=A._headerContent;var U=A.get("items");var W=E.Node.create(F);E.each(U,function(c,a,d){var Z="";if(B(c)){Z+=L.sub(J,[c]);}else{var Y=A._generateTagAttr(c);Z+=L.sub(M,[c.label,c.tag,Y]);}var b=E.Node.create(Z);b.setData(Q,c);W.append(b);});var S=new E.Panel({collapsible:false,headerContent:V,icons:[{icon:"close",handler:{fn:A.hide,context:A}}]}).render(T);S.bodyNode.append(W);A._menuList=W;},bindUI:function(){var A=this;H.superclass.bindUI.apply(A,arguments);A._menuList.delegate("click",A._onMenuListItemClick,"."+K,A);},_generateTagAttr:function(X){var A=this;var S=[];var U="";var T=X.attributes;var W=X.styles;if(T){for(var V in T){S.push(" "+V+'="'+T[V]+'"');}}if(W){S=[' style="'];for(var V in W){S.push(V+": "+W[V]+";");}S.push('"');}return S.join("");},_onMenuListItemClick:function(X){var S=this;var W=X.currentTarget;var U=W.getData(Q);var A=S._generateTagAttr(U);var T=L.sub(O,["{0}",U.tag,A]);var V=S.get("host");V.execCommand("wraphtml",T);V.focus();S.hide();},_uiSetHeight:function(U){var A=this;var S=A.get("boundingBox");var T=A._menuList;S.setStyle("height","auto");T.setStyle("height",U);},_uiSetWidth:function(U){var A=this;var S=A.get("boundingBox");var T=A._menuList;S.setStyle("width","auto");T.setStyle("width",U);}}});var P=E.Component.create({EXTENDS:E.Plugin.Base,NAME:D,NS:N,prototype:{add:function(S){var A=this;var T=A.get("host");return new H(E.mix({host:T},S)).render();}}});E.namespace("Plugin").EditorMenu=P;},"@VERSION@",{requires:["aui-base","editor-base","aui-overlay-context","aui-panel","aui-editor-tools-plugin"]});AUI.add("aui-editor-toolbar-plugin",function(S){var AF=S.Lang,T=AF.isFunction,AA=S.ClassNameManager.getClassName,g="editortoolbar",AD="toolbar",W="alignment",c="align-left",t="align-inline",V="align-block",AE="align-right",i="color",n="content",P="font",z="indent",L="input",p="insert",e="insertimage",u="insertlink",q="list",X="select",D="source",M="styles",w="subscript",v="text",l="circle-check",B="close",x={backcolor:true,forecolor:true,format:true,insertimage:true,insertlink:true,source:true,styles:true},Z=["b","big","font","em","i","small","s","strike","strong","sub","sup","u"],Q=AA("button","holder"),R=AA("field",L),Y=AA("field",L,"text"),H=AA("field","label"),f=AA("field","numeric"),N=AA(g,"align","node"),a=AA(g,e),K=AA(g,u),C=AA(g,X,"fontname"),y=AA(g,X,"fontsize"),F=AA(g,"size","separator"),I=AA(g,D,"textarea"),E=AA("state","active"),J=AA(g),b=AA(g,n),o='<div class="'+N+'"></div>',O="<a></a>",d="<img />",k='<a href="{0}"{2}>{1}</a>',G='<textarea class="'+I+'"></textarea>',AC='<div class="'+J+'"><div class="'+b+'"></div></div>',r='<div class="'+Q+'"></div>',AB='<select class="'+C+'">{0}</select>',U='<option selected="selected"></option>'+"<option>Arial</option>"+"<option>Arial Black</option>"+"<option>Comic Sans MS</option>"+"<option>Courier New</option>"+"<option>Lucida Console</option>"+"<option>Tahoma</option>"+"<option>Times New Roman</option>"+"<option>Trebuchet MS</option>"+"<option>Verdana</option>",s='<select class="'+y+'">{0}</select>',m='<option selected="selected"></option>'+'<option value="1">10</option>'+'<option value="2">13</option>'+'<option value="3">16</option>'+'<option value="4">18</option>'+'<option value="5">24</option>'+'<option value="6">32</option>'+'<option value="7">48</option>',j='<span class="'+F+'">x</span>';
var h=S.Component.create({NAME:g,NS:AD,EXTENDS:S.Plugin.Base,ATTRS:{groups:{value:[{type:v},{type:W},{type:z},{type:q}]}},prototype:{initializer:function(){var AU=this;var AL=AU.get("host");var AJ=AL.frame.get("container");var AV=AU.get("groups");var AH=S.Node.create(AC);var AK=AH.one("."+b);AJ.placeBefore(AH);var AN={boundingBox:AH,contentBox:AK};var AM=[];AU.on("buttonitem:click",function(AZ){var AY=this;var AX=AZ.target.get("icon").split("-");if(!x[AX[0]]){AY.execCommand(AX[0],(AX[1]?AX[1]:""));AY.focus();}},AL);for(var AR=0;AR<AV.length;AR++){var AG=AV[AR];var AO=GROUPS[AG.type];var AI;var A=[];for(var AQ=0;AQ<AO.children.length;AQ++){if(!AO.children[AQ].select){A.push(AO.children[AQ]);}}if(A.length>0){AI=new S.Toolbar(S.merge(AO.config,AG.toolbar,{children:A})).render(AK);AI.addTarget(AU);AM.push(AI);}var AP=AO.generate;if(AP&&T(AP.init)){AP.init.call(AU,AL,AN);}for(var AQ=0;AQ<AO.children.length;AQ++){var AT=AO.children[AQ];var AS=AT.icon;if(AP&&T(AP[AS])){var AW=(AG.config?AG.config[AS]:null);AN.button=(AT.select||!AI?null:AI.item(AQ));AP[AS].call(AU,AL,AN,AW);}}}AN.toolbars=AM;},_updateToolbar:function(A,AL){var AM=this;if(A.changedNode){var AH=A.commands;var AN=AL.toolbars;var AP=function(AR,AQ,AT){var AS=!!(AH[AR.get("icon")]);AR.StateInteraction.set("active",AS);};if(AN){for(var AJ=0;AJ<AN.length;AJ++){AN[AJ].each(AP);}}var AG=A.fontFamily;var AK=AL._fontNameOptions;var AO=A.fontSize;var AI=AL._fontSizeOptions;if(AK){AK.item(0).set("selected",true);AK.each(function(AR,AQ,AT){var AS=AR.get("value").toLowerCase();if(AS===AG.toLowerCase()){AR.set("selected",true);}});}if(AI){AO=AO.replace("px","");AI.item(0).set("selected",true);AI.each(function(AS,AR,AU){var AT=AS.get("value").toLowerCase();var AQ=AS.get("text");if(AQ===AO){AS.set("selected",true);}});}}}}});h.generateOverlay=function(AI,AH,A){var AG=new S["OverlayContext"+(A?"Panel":"")](S.merge({align:{node:AI,points:["tl","bl"]},hideOn:"click",showOn:"click",trigger:AI},AH)).render();return AG;};h.generateColorPicker=function(AL,AI,AH,AM){var AK=AI.button;var AG=AK.get("boundingBox");var A=new S.ColorPicker(S.merge({align:{node:AG,points:["tl","bl"]},trigger:AG},AH));if(AH&&AH.plugins){for(var AJ=0;AJ<AH.plugins.length;AJ++){A.plug(AH.plugins[AJ],AH);}}A.render(S.getBody());A.on("colorChange",function(AP){var AN=this;var AO=A.get("rgb");AL.execCommand(AM,AO.hex);AL.focus();});};h.openOverlayToAlignNode=function(AH,AG,AI,A){var AK=AI.getXY();var AJ=A.getXY();AK=[AK[0]+AJ[0],AK[1]+AJ[1]];AG.setStyle("width",A.get("offsetWidth"));AG.setStyle("height",A.get("offsetHeight"));AG.setXY(AK);AG.show();AH.set("align",{node:AG,points:["tl","bc"]});AH.show();};h.STRINGS={ALIGN:"Align",ALIGN_BLOCK:"Block",ALIGN_LEFT:"Left",ALIGN_INLINE:"Inline",ALIGN_RIGHT:"Right",BACKCOLOR:"Background Color",BOLD:"Bold",BORDER:"Border",DESCRIPTION:"Description",EDIT_IMAGE:"Edit Image",EDIT_LINK:"Edit Link",FORECOLOR:"Foreground Color",IMAGE_URL:"Image URL",INDENT:"Indent",INSERT:"Insert",INSERT_IMAGE:"Insert Image",INSERT_LINK:"Insert Link",INSERT_ORDERED_LIST:"Insert Numbered List",INSERT_UNORDERED_LIST:"Insert Bulleted List",ITALIC:"Italic",JUSTIFY_LEFT:"Justify Left",JUSTIFY_CENTER:"Justify Center",JUSTIFY_RIGHT:"Justify Right",LINK_URL:"Link URL",OPEN_IN_NEW_WINDOW:"Open in new window",OUTDENT:"Outdent",PADDING:"Padding",REMOVE_FORMAT:"Format Source",SAVE:"Save",SIZE:"Size",SOURCE:"Source",SUBSCRIPT:"Subscript",SUPERSCRIPT:"Superscript",LINE_THROUGH:"Line Through",UNDERLINE:"Underline"};GROUPS={};GROUPS[W]={children:[{icon:"justifyleft",title:h.STRINGS.JUSTIFY_LEFT},{icon:"justifycenter",title:h.STRINGS.JUSTIFY_CENTER},{icon:"justifyright",title:h.STRINGS.JUSTIFY_RIGHT}]};GROUPS[i]={children:[{icon:"forecolor",title:h.STRINGS.FORECOLOR},{icon:"backcolor",title:h.STRINGS.BACKCOLOR}],generate:{forecolor:function(AI,AH,AG){var A=this;h.generateColorPicker(AI,AH,AG,"forecolor");},backcolor:function(AI,AH,AG){var A=this;h.generateColorPicker(AI,AH,AG,"backcolor");}}};GROUPS[P]={children:[{icon:"fontname",select:true},{icon:"fontsize",select:true}],generate:{init:function(AI,AH){var A=this;var AG=AH.contentBox;S.delegate("change",function(AL){var AJ=this;var AN=AL.currentTarget;var AK=AN.get("className");var AM=AK.substring(AK.lastIndexOf("-")+1);var AO=AN.get("value");AI.execCommand(AM,AO);AI.focus();},AG,"select");AI.after("nodeChange",function(AK){var AJ=this;switch(AK.changedType){case"keyup":case"mousedown":AJ._updateToolbar(AK,AH);break;}},A);},fontname:function(AL,AK,AJ){var A=this;var AG=AK.contentBox;var AI;var AM=[U];if(AJ&&AJ.optionHtml){AM[0]=AJ.optionHtml;}AI=AF.sub(AB,AM);AG.append(AI);var AH=AG.all("."+C+" option");AK._fontNameOptions=AH;},fontsize:function(AL,AK,AJ){var A=this;var AG=AK.contentBox;var AI;var AM=[m];if(AJ&&AJ.optionHtml){AM[0]=AJ.optionHtml;}AI=AF.sub(s,AM);AG.append(AI);var AH=AG.all("."+y+" option");AK._fontSizeOptions=AH;}}};GROUPS[z]={children:[{icon:"indent",title:h.STRINGS.INDENT},{icon:"outdent",title:h.STRINGS.OUTDENT}]};GROUPS[p]={children:[{icon:"insertimage",title:h.STRINGS.INSERT_IMAGE},{icon:"insertlink",title:h.STRINGS.INSERT_LINK}],generate:{insertimage:function(AJ,AS,Ab){var AZ=this;var A=AS.button;var AM=A.get("boundingBox");var AY=h.generateOverlay(AM,Ab,true);var AV=AY.get("contentBox");var AQ=new S.Panel({collapsible:false,title:h.STRINGS.INSERT_IMAGE,icons:[{icon:B,handler:{fn:AY.hide,context:AY}}]}).render(AV);AV=AQ.bodyNode;if(Ab&&Ab.dataBrowser){Ab.dataBrowser.render(AV);}else{var AN=AJ.frame._iframe;var AL;var Ac;var Aa=new S.Form({cssClass:a,labelAlign:"left"}).render(AV);var AP=[{labelText:"none",value:"none"}];for(var AW=1;AW<6;AW++){AP.push({labelText:AW+"px",value:AW+"px solid"});}Aa.add([{id:"imageURL",labelText:h.STRINGS.IMAGE_URL},{id:"size",labelText:h.STRINGS.SIZE,type:"hidden"},{id:"width",labelText:false,cssClass:f},{id:"height",labelText:false,cssClass:f},{id:"padding",labelText:h.STRINGS.PADDING},new S.Select({id:"border",labelText:h.STRINGS.BORDER,options:AP}),{id:"align",labelText:h.STRINGS.ALIGN,type:"hidden"},{id:"description",labelText:h.STRINGS.DESCRIPTION},{id:"linkURL",labelText:h.STRINGS.LINK_URL},{id:"openInNewWindow",labelText:h.STRINGS.OPEN_IN_NEW_WINDOW,type:"checkbox"}],true);
Aa.getField("width").get("boundingBox").placeAfter(j);var AK=Aa.get("contentBox");var AX=S.Node.create(r);var AR=Aa.getField("openInNewWindow");var AU=new S.ButtonItem({icon:l,label:h.STRINGS.INSERT}).render(AX);AU.on("click",function(Ae){var Ao=this;var Af;var Ai;var Am;if(AL){Ai=AL;Am=AL.get("parentNode");if(Am.get("tagName").toLowerCase()=="a"){Af=Am;}}else{Ai=S.Node.create(d);}var Ah=Aa.get("fieldValues");var An=Ah.description;var Aj={src:Ah.imageURL,title:An,alt:An};var Al={border:Ah.border};var Ap=parseInt(Ah.height,10);var Ag=parseInt(Ah.width,10);if(!isNaN(Ap)){Aj.height=Ap;}if(!isNaN(Ag)){Aj.width=Ag;}var Ak=parseInt(Ah.padding,10);if(!isNaN(Ak)){Al.padding=Ak;}AT.some(function(As,Ar,Au){var Aq=this;var At=As.StateInteraction.get("active");if(At){Al.display="";switch(Ar){case 0:Aj.align="left";break;case 1:Aj.align="";break;case 2:Aj.align="center";Al.display="block";break;case 3:Aj.align="right";break;}return true;}});Ai.setAttrs(Aj);Ai.setStyles(Al);var Ad=Ah.linkURL;if(Ad){if(!Af){Af=S.Node.create(O);if(AL){Am.insert(Af,AL);}Af.append(Ai);}Af.setAttribute("href",Ad);Af.setAttribute("target",(AR.get("node").get("checked")?"_blank":""));Ai=Af;}else{if(AL&&Af){Am.insert(AL,Af);Af.remove(true);}}if(!AL&&Ac&&Ac.anchorNode){Ac.anchorNode.append(Ai);}AY.hide();});var AO=S.Node.create(d);var AG=Aa.getField("height");var AH=Aa.getField("width");AO.on("load",function(Ae){var Ad=Ae.currentTarget;if(!AG.get("value")||!AH.get("value")){Aa.set("values",{height:Ad.get("height"),width:Ad.get("width")});}});Aa.getField("imageURL").get("node").on("blur",function(Ad){AO.set("src",this.val());});AK.append(AX);var AT=new S.Toolbar({activeState:true,children:[{icon:c,title:h.STRINGS.ALIGN_LEFT},{icon:t,title:h.STRINGS.ALIGN_INLINE},{icon:V,title:h.STRINGS.ALIGN_BLOCK},{icon:AE,title:h.STRINGS.ALIGN_RIGHT}]});AT.after("buttonitem:click",function(Ae){var Ad=Ae.target;AT.each(function(Ag,Af,Ah){if(Ag!=Ad){Ag.StateInteraction.set("active",false);}});});AT.render(Aa.getField("align").get("contentBox"));AY.on("show",function(Ad){if(!Ac||!Ac.anchorNode){var Ae=AJ.getInstance();AJ.focus();Ac=new Ae.Selection();}});AY.after("hide",function(Ad){Aa.resetValues();AT.each(function(Af,Ae,Ag){Af.StateInteraction.set("active",false);});AR.get("node").set("checked",false);AQ.set("title",h.STRINGS.INSERT_IMAGE);AU.set("label",h.STRINGS.INSERT);AI.hide();AY.set("align",{node:AM,points:["tl","bl"]});AL=null;});AN.on("mouseout",function(Ad){var Ae=AJ.getInstance();Ac=new Ae.Selection();});var AI=S.Node.create(o);AI.hide();S.getBody().append(AI);AJ.on("frame:ready",function(Ad){var Ae=AJ.getInstance();Ae.one("body").delegate("click",function(Ak){var Af=this;if(AL!=Ak.currentTarget){var Ah=Ak.currentTarget;var Aj=Ah.get("parentNode");var Ag=Ah.getStyle("borderWidth");var Al=Ah.getStyle("padding");var Am=(Aj.get("tagName").toLowerCase()=="a");Aa.set("values",{border:(Ag?Ag+" solid":""),description:Ah.get("alt"),height:Ah.get("height"),imageURL:Ah.get("src"),linkURL:(Am?Aj.get("href"):""),width:Ah.get("width"),padding:(Al?parseInt(Al):"")});var Ai=1;switch(Ah.getAttribute("align")){case"left":Ai=0;break;case"center":Ai=2;break;case"right":Ai=3;break;}AT.item(Ai).StateInteraction.set("active",true);AR.get("node").attr("checked",(Am&&Aj.getAttribute("target")=="_blank"));AQ.set("title",h.STRINGS.EDIT_IMAGE);AU.set("label",h.STRINGS.SAVE);AL=Ah;h.openOverlayToAlignNode(AY,AI,AN,Ah);}},"img");});}},insertlink:function(AH,AP,AV){var AU=this;var A=AP.button;var AJ=A.get("boundingBox");var AT=h.generateOverlay(AJ,AV,true);var AR=AT.get("contentBox");var AN=new S.Panel({collapsible:false,title:h.STRINGS.INSERT_LINK,icons:[{icon:B,handler:{fn:AT.hide,context:AT}}]}).render(AR);AR=AN.bodyNode;var AK=AH.frame._iframe;var AI;var AW;var AM=new S.Form({cssClass:K,labelAlign:"left"}).render(AR);AM.add([{id:"description",labelText:h.STRINGS.DESCRIPTION},{id:"linkURL",labelText:h.STRINGS.LINK_URL},{id:"openInNewWindow",labelText:h.STRINGS.OPEN_IN_NEW_WINDOW,type:"checkbox"}],true);var AL=AM.get("contentBox");var AS=S.Node.create(r);var AO=AM.getField("openInNewWindow");var AQ=new S.ButtonItem({icon:l,label:h.STRINGS.INSERT}).render(AS);AQ.on("click",function(AZ){var AX=this;var AY=AM.get("fieldValues");if(AI){AI.setAttribute("href",AY.linkURL);AI.set("innerHTML",AY.description);if(AO.get("node").get("checked")){AI.setAttribute("target","_blank");}else{AI.setAttribute("target","");}}else{AH.execCommand("inserthtml",AF.sub(k,[AY.linkURL,AY.description,(AO.get("node").get("checked")?' target="_blank"':"")]));}AT.hide();});AL.append(AS);AT.after("hide",function(AX){AM.resetValues();AO.get("node").set("checked",false);AN.set("title",h.STRINGS.CREATE_LINK);AQ.set("label",h.STRINGS.INSERT);AG.hide();AT.set("align",{node:AJ,points:["tl","bl"]});AI=null;});var AG=S.Node.create(o);AG.hide();S.getBody().append(AG);AH.on("frame:ready",function(AX){var AY=AH.getInstance();AY.one("body").delegate("click",function(Ac){var AZ=this;if(AI!=Ac.currentTarget){var Ab=Ac.currentTarget;if(!Ab.one("img")){var Aa=Ab.get("parentNode");AM.set("values",{description:Ab.get("innerHTML"),linkURL:Ab.getAttribute("href"),});AO.get("node").attr("checked",(Ab.getAttribute("target")=="_blank"));AN.set("title",h.STRINGS.EDIT_LINK);AQ.set("label",h.STRINGS.SAVE);AI=Ab;h.openOverlayToAlignNode(AT,AG,AK,Ab);}}},"a");});}}};GROUPS[q]={children:[{icon:"insertunorderedlist",title:h.STRINGS.INSERT_UNORDERED_LIST},{icon:"insertorderedlist",title:h.STRINGS.INSERT_ORDERED_LIST}],generate:{init:function(AG){var A=this;AG.plug(S.Plugin.EditorLists);}}};GROUPS[D]={children:[{icon:"format",title:h.STRINGS.REMOVE_FORMAT},{icon:"source",title:h.STRINGS.SOURCE}],generate:{format:function(AJ,AH,AG){var A=this;var AK=AJ.frame;var AI=AH.button;AI.on("click",function(AO){var AL=this;var AP=AL.getInstance();var AN=new AP.Selection();var AM=AN.getSelected();if(!AN.isCollapsed&&AM.size()){AM.each(function(AW,AS,AX){var AQ=this;AW.removeAttribute("style");var AU=AW.get("innerHTML");AU=AU.replace(/<([a-zA-Z0-9]*)\b[^>]*>/g,"<$1>");
for(var AT=0;AT<Z.length;AT++){var AR=new RegExp("(<"+Z[AT]+">|<\\/"+Z[AT]+">)","ig");AU=AU.replace(AR,"");}AW.set("innerHTML",AU);var AV=AW.get("parentNode");if(!AV.test("body")){AV.removeAttribute("style");}});}},AJ);},source:function(AJ,AM,AH){var AN=this;var AG=AJ.frame;var A=AG.get("container");var AK=AM.contentBox;var AI=AM.button;var AL=S.Node.create(G);AL.hide();A.append(AL);AI._visible=false;AI.on("click",function(AR){var AP=AI._visible;if(AP){AJ.set("content",AL.val());AL.hide();AL.val("");AG.show();}else{var AQ=AG._iframe;AL.val(AJ.getContent());var AO=AQ.get("offsetHeight")-AL.getPadding("tb");AL.setStyle("height",AO);AG.hide();AL.show();}AP=!AP;AI._visible=AP;AK.all("select").attr("disabled",AP);AK.all("button").attr("disabled",AP);AI.get("contentBox").attr("disabled",false);});}}};GROUPS[M]={children:[{icon:"styles"}],generate:{styles:function(AK,AI,AH){var A=this;var AJ=AI.button;var AG=AJ.get("boundingBox");AK.plug(S.Plugin.EditorMenu);AK.menu.add(S.merge({align:{node:AG,points:["tl","bl"]},hideOn:"click",showOn:"click",trigger:AG},AH));}}};GROUPS[w]={children:[{icon:"subscript",title:h.STRINGS.SUBSCRIPT},{icon:"superscript",title:h.STRINGS.SUPERSCRIPT}]};GROUPS[v]={children:[{icon:"bold",title:h.STRINGS.BOLD},{icon:"italic",title:h.STRINGS.ITALIC},{icon:"underline",title:h.STRINGS.UNDERLINE},{icon:"strikethrough",title:h.STRINGS.LINE_THROUGH}]};S.namespace("Plugin").EditorToolbar=h;},"@VERSION@",{requires:["aui-base","aui-button-item","aui-color-picker","aui-editor-menu-plugin","aui-editor-tools-plugin","aui-form-select","aui-overlay-context-panel","aui-panel","aui-toolbar","createlink-base","editor-lists","editor-base","plugin"]});AUI.add("aui-editor-bbcode-plugin",function(S){var F=S.Lang,O=F.isArray,P=F.isString,K=S.ClassNameManager.getClassName,J="bbcodeplugin",R="bbcode",N="quote",X=K(N),Q=K(N,"content"),Y=K(N,"title"),T="\\[(({0})=([^\\]]*))\\]([\\s\\S]*?)\\[\\/{0}\\]",V="\\[({0})\\]([\\s\\S]*?)\\[\\/{0}\\]",E="<{0}(>|\\b[^>]*>)([\\s\\S]*?)</{0}>",G="<(([a-z0-9]+)\\b[^>]*?style=(\"|').*?{0}\\s*:\\s*([^;\"']+);?[^>]*)>([\\s\\S]*?)<(/\\2)>",I="(<[a-z0-9]+[^>]*>|</[a-z0-9]+>)",M='<div class="'+X+'"><div class="'+Q+'">',H="</div></div>",D='<div class="'+Y+'">$1</div>'+M,L="<div>{0}</div>",U=new RegExp(I,"gi"),W=[{convert:[["br"]],regExp:"<{0}[^>]*>",output:"\n"},{convert:[{tags:["font-family"],source:["font"]},{tags:["font-size"],source:["size"]},{tags:["[^a-z-]*color"],source:["color"]}],regExp:G,output:"<$1>[{0}=$4]$5[/{0}]<$6>"},{convert:[{tags:["font-style"],source:["i"]},{tags:["font-weight"],source:["b"]}],regExp:G,output:"<$1>[{0}]$5[/{0}]<$6>"},{convert:[["text-decoration"]],regExp:G,output:function(){var Z="";var A=arguments[4].toLowerCase();if(A.indexOf("underline")!=-1){Z+="[u]";}else{if(A.indexOf("line-through")!=-1){Z+="[s]";}}if(Z!=""){return"<"+arguments[1]+">"+Z+arguments[5]+Z.replace("[","[/")+"<"+arguments[6]+">";}return arguments[0];}},{convert:[["margin-left"]],regExp:G,output:function(){var Z="";var a=parseInt(arguments[3],10);if(!isNaN(a)){var b=Math.floor(a/40);for(var A=0;A<b;A++){Z+="[indent]";}}Z=Z+arguments[5]+Z.replace(/\[/g,"[/");return"<"+arguments[1]+">"+Z+"<"+arguments[6]+">";}},{convert:[{tags:["font","size"],source:["size"]},{tags:["font","face"],source:["font"]}],regExp:"(<{0}\\b[^>]*{1}=(\"|')([^\"']+)(\"|')[^>]*>)([\\s\\S]*?)(</{0}>)",output:"$1[{0}=$3]$5[/{0}]$6"},{convert:[["text-align"]],regExp:G,output:"<$1>[$4]$5[/$4]<$6>"},{convert:[["span"]],regExp:E,output:"$2"},{convert:[["blockquote"]],regExp:E,output:"[indent]$2[/indent]"},{convert:[["b"],["strong"]],regExp:E,output:"[b]$2[/b]"},{convert:[["i"],["em"]],regExp:E,output:"[i]$2[/i]"},{convert:[["u"]],regExp:E,output:"[u]$2[/u]"},{convert:[["s"],["strike"]],regExp:E,output:"[s]$2[/s]"},{convert:[["img"]],regExp:"(<a[^>]*>)?<{0}\\b[^>]*src=(\"|')([^\"']+)(\"|')[^>]*>(</a>)?",output:"[img]$3[/img]"},{convert:[["a"]],regExp:"<{0}\\b[^>]*href=(\"|')mailto:([^\"']+)(\"|')[^>]*>([\\s\\S]*?)</{0}>",output:"[email=$2]$4[/email]"},{convert:[["a"]],regExp:"<{0}\\b[^>]*href=(\"|')([^\"']+)(\"|')[^>]*>([\\s\\S]*?)</{0}>",output:"[url=$2]$4[/url]"},{convert:[["center"]],regExp:E,output:"[center]$2[/center]"},{convert:[["ul"]],regExp:E,output:"[list]$2[/list]"},{convert:[["ol"]],regExp:E,output:"[list=1]$2[/list]"},{convert:[["li"]],regExp:E,output:"[*]$2"},{convert:[["code"]],regExp:E,output:"[code]$2[/code]"},{convert:[["quote"]],regExp:"<div\\b[^>]*class=(\"|')_"+X+"s*[^\"']*(\"|')[^>]*>([\\s\\S]*?)</div>",output:"$3"},{convert:[["div"]],regExp:E,output:"$2\n"},{convert:[["h1"],["h2"],["h3"],["h4"],["h5"],["h6"]],regExp:E,output:"[b]$2[/b]\n"},{convert:[["p"]],regExp:E,output:"$2\n\n"},{convert:[{tags:["list","left|center|right"],source:["list"]}],regExp:"(\\[{0}[^\\]]*\\])\\s*\\[({1})\\]([\\s\\S]*?)\\[/\\2\\]\\s*\\[/{0}\\]",output:"[$2]$1$3[/{0}][/$2]"}],C=[{convert:[{tags:["b"],source:["b"]},{tags:["i"],source:["i"]},{tags:["u"],source:["u"]},{tags:["s"],source:["s"]},{tags:["code"],source:["code"]}],regExp:V,output:"<{0}>$2</{0}>"},{convert:[{tags:["color"],source:["color"]}],regExp:T,output:'<span style="{0}: $3;">$4</span>'},{convert:[{tags:["font"],source:["face"]},{tags:["size"],source:["size"]}],regExp:T,output:'<font {0}="$3">$4</font>'},{convert:[["img"]],regExp:V,output:'<img src="$2" alt="" />'},{convert:[{tags:["email"],source:["mailto:"]},{tags:["url"],source:[""]}],regExp:T,output:'<a href="{0}$3">$4</a>'},{convert:[["list"]],regExp:"\\[({0}(=1)?)]([\\s\\S]*?)\\[\\/{0}\\]",output:function(){var a="";if(arguments[1]=="list=1"){a+="<ol>";}else{a+="<ul>";}var A=F.trim(arguments[3]).split("[*]");for(var Z=1;Z<A.length;Z++){a+="<li>"+A[Z]+"</li>";}if(arguments[1]=="list=1"){a+="</ol>";}else{a+="</ul>";}return a;}},{convert:[{tags:["indent"],source:["blockquote"]}],regExp:V,output:"<{0}>$2</{0}>"},{convert:[["left"],["center"],["right"]],regExp:V+"\n?",output:'<div style="text-align: $1;">$2</div>'},{convert:[["\n"]],regExp:"{0}",output:"<br />"}];var B=S.Component.create({NAME:J,NS:R,EXTENDS:S.Plugin.Base,ATTRS:{host:{value:false}},prototype:{initializer:function(){var A=this;
A.afterHostMethod("getContent",A.getBBCode,A);A.get("host").on("contentChange",A._contentChange,A);},getBBCode:function(){var A=this;var c=A.get("host");var Z;var b=c.constructor.prototype.getContent.apply(c,arguments);var d=S.Node.create(F.sub(L,[b]));var a=function(m,g,e){var h;var l=m;do{if(l){h=l;}l=l.one("div."+Q);}while(l);var k=h.get("parentNode");var j=k.previous();var i="["+N;if(j&&j.hasClass(Y)){var f=j.html();f=f.replace(U,"");i+="="+(f.charAt(f.length-1)==":"?f.substring(0,f.length-1):j.html());j.remove(true);}i+="]"+h.html()+"[/"+N+"]";k.html(i);k.removeClass(N);k.addClass("_"+N);};while(Z=d.all("div."+X)){if(!Z.size()){break;}Z.each(a);}b=d.html();b=A._parseTagExpressions(W,b);b=b.replace(U,"");return new S.Do.AlterReturn(null,b);},getContentAsHtml:function(){var A=this;var Z=A.get("host");return Z.constructor.prototype.getContent.apply(Z,arguments);},_contentChange:function(a){var A=this;var Z=a.newVal;Z=Z.replace(/\[quote=([^\]]*)\]/gi,M);Z=Z.replace(/\[quote\]/gi,D);Z=Z.replace(/\[\/quote\]/gi,H);Z=A._parseTagExpressions(C,Z);a.newVal=Z;a.stopImmediatePropagation();},_parseTagExpressions:function(k,e){var h=this;var d;var g;var A;var Z;var l;for(var c=0;c<k.length;c++){d=k[c];g=d.convert;Z=g.length;for(var b=0;b<Z;b++){var a=d.output;A=g[b];if(O(A)){l=A;}else{l=A.tags;if(P(a)){a=F.sub(a,A.source);}}var f=F.sub(d.regExp,l);e=e.replace(new RegExp(f,"gi"),a);}}return e;}}});S.namespace("Plugin").EditorBBCode=B;},"@VERSION@",{requires:["aui-base","editor-base"]});AUI.add("aui-editor",function(B){},"@VERSION@",{skinnable:true,use:["aui-editor-tools-plugin","aui-editor-menu-plugin","aui-editor-toolbar-plugin","aui-editor-bbcode-plugin"]});