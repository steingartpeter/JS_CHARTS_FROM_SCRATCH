//<M>
//×-
//@-FILENÉV   : JS_CHARTS_FROM_SCRATCH - pst_charts.js-@
//@-SZERZŐ    : AX07057-@
//@-LÉTREHOZVA: 2018. ápr. 19.-@
//@-FÜGGŐSÉGEK:
//×-
// @-- /JS_CHARTS_FROM_SCRATCH/JS/OWN_LIB/consts.js-@
// @-- RQRD_FILE02.js-@
// @-- RQRD_FILE03.js-@
// @-- RQRD_FILE04.js-@
//-@
//-×
//-@
//@-LEÍRÁS    :
// Ide kerül a teljes CHART generáló kód.
//@-MÓDOSÍTÁSOK :
//×-
// @-- ... -@
//-×
//-×
//</M>

var PSTCG = PSTCG || {};


$(function(){
	
	//<nn>
	// Lecsekkoljuk, megy-e a JQuery.
	//</nn>
	console.log("Az alap fekete szín kódja: " + PSTCG_CNSTS.DEFS.COLORS.BLACK);
	
	//<nn>
	// A jobb olvashtaóság kedvéért a függvények konfigurálását egy INIT függvénybe tettem.
	//</nn>
	FUNCTION_SETUP();
	
	$("#fst-chrt-gen").click(PSTCG.GEN_STARTER_CHART);
	
});

//<nn>
// Függvények objektumba helyezése.
//</nn>
function FUNCTION_SETUP(){
	PSTCG.GEN_STARTER_CHART = a0010;
	PSTCG.ADD_DEFS = a0011;
	PSTCG.ADD_BGRECT = a0020;
	PSTCG.ADD_TEXT = a0030;
	PSTCG.ADD_BGGRID = a0040;
	PSTCG.ADD_AXIS = a0050;
	PSTCG.CRT_SCALE = a0060;
}


//+------------------------------------------------------------------------------------------------------------+
//|############################################################################################################|
//|/////////////////////////////////           UTILITY FUNCTIONS            ///////////////////////////////////|
//|############################################################################################################|
//+------------------------------------------------------------------------------------------------------------+
function a0010(){
//<SF>
// 2018. ápr. 19.<br>
// Az elepvető chart generáló függvény.<br>
// Hivó objektum: button#fst-chrt-gen
// PARAMÉTEREK:
//×-
// @-- @param ... = ... -@
//-×
//MÓDOSÍTÁSOK:
//×-
// @-- ... -@
//-×
//</SF>
	
	
	//<nn>
	//...
	//</nn>
	console.log("PSTCG.GEN_STARTER_CHART függvényhívás megérkezett!");
	
	var cntnr = $("#chrt0001");
	var svg = $(document.createElementNS(PSTCG_CNSTS.SVGNS, 'svg'));
	var svgID = "svg-pst-" + Math.floor((Math.random()*10000));
	cntnr.append(svg);
	
	svg.attr({
		"id":svgID,
		"width":PSTCG_CNSTS.DEFS.BASE_S_SVG_W,
		"height":PSTCG_CNSTS.DEFS.BASE_S_SVG_H,
		"fill":PSTCG_CNSTS.DEFS.COLORS.GRAY05
	});
	//<nn>
	// Hozzáadunk egy DEFS tag-et, hogy legyen hová pakolni az extrákat.
	//</nn>
	PSTCG.ADD_DEFS(svg);
	
	//<nn>
	// Hozzáadjuk a háttér rect-et.
	//</nn>
	PSTCG.ADD_BGRECT(svg);
	
	//<nn>
	// Hozzáadjuk a teszt szöveget.
	//</nn>
	PSTCG.ADD_TEXT(svg);
	
	
	//<nn>
	// Hozzáadjuk a háttér hálót.
	//</nn>
	PSTCG.ADD_BGGRID(svg, {});
	
	//<nn>
	// Hozzáadjuk az x tengelyt.
	//</nn>
	PSTCG.ADD_AXIS(svg, {});
	
	var axPrm = {"align":"y-left"}
	//<nn>
	// Hozzáadjuk az y tengelyt.
	//</nn>
	PSTCG.ADD_AXIS(svg, axPrm);
	
	axPrm = {"align":"y-right"}
	//<nn>
	// Hozzáadjuk az y tengelyt.
	//</nn>
	PSTCG.ADD_AXIS(svg, axPrm);
	var clsr = "";
}

function a0011(svgElmnt, txtId){
//<SF>
// 2018. ápr. 19.<br>
// LEÍRÁS<br>
// PARAMÉTEREK:
//×-
// @-- @param svgElmnt = a taralmazós SVG element -@
//-×
//MÓDOSÍTÁSOK:
//×-
// @-- ... -@
//-×
//</SF>
	
	var defs = $(document.createElementNS(PSTCG_CNSTS.SVGNS, 'defs'));
	defs.attr({
		id:"std-def001"
	});
	
	
	
	var grdFill01 = $(document.createElementNS(PSTCG_CNSTS.SVGNS, 'linearGradient'));
	grdFill01.attr({
		"id":"grdFill01",
		"x2":"0%",
		"y2":"100%"
	});
	var stp1 = $(document.createElementNS(PSTCG_CNSTS.SVGNS, 'stop'));
	stp1.attr({
		"offset":"10%",
		"stop-color":PSTCG_CNSTS.DEFS.COLORS.GRAY04
	});
	var stp2 = $(document.createElementNS(PSTCG_CNSTS.SVGNS, 'stop'));
	stp2.attr({
		"offset":"90%",
		"stop-color":PSTCG_CNSTS.DEFS.COLORS.GRAY07
	});
	grdFill01.append(stp1);
	grdFill01.append(stp2);
	
	defs.append(grdFill01);
	
	//<nn>
	// Hozzáadjuk a DEFS tag-et.
	//</nn>
	svgElmnt.append(defs);
}

function a0020(svgElmnt,txtId){
//<SF>
// 2018. ápr. 19.<br>
// Ez a függvény egy új svg-g elemet ad a paraméterként kapott svg elemhez.<br>
// PARAMÉTEREK:
//×-
// @-- @param svgElmnt = a tárolónak használt SVG elem -@
// @-- @param txtId = a hivó által meghatározott IUD, ha van ilyen -@
//-×
//MÓDOSÍTÁSOK:
//×-
// @-- ... -@
//-×
//</SF>
	
	//<nn>
	// Ha nem jött tároló SVG elem, akkor leáll a program.
	//</nn>
	if(svgElmnt === undefined){
		console.error("HIBA -> a tartalmazó SVG elem nem jött meg paraméterként!");
		return;
	}
	//<nn>
	// Ha nem jött ID, akkor bállítunk egy saját alapértelmezettet.
	//</nn>
	if(txtId === undefined){
		txtId = "bgRect01";
	}
	//<nn>
	// Itt létrehozunk egy g[roup] svg elemet, ami egy layout lehetne mondjuk a grafikus analógiára,
	// erre a layout rapakoljuk rá majd a megfelelelő background rectangle-t.
	//</nn>
	var layout = $(document.createElementNS(PSTCG_CNSTS.SVGNS, 'g'));
	var bgrect = $(document.createElementNS(PSTCG_CNSTS.SVGNS, 'rect'));
	
	layout.attr({
		id:"bckkgrnd-layer"
	});
	bgrect.attr({
		"id":txtId,
		"x":PSTCG_CNSTS.DEFS.BASE_S_SVG_MRG_L,
		"y":PSTCG_CNSTS.DEFS.BASE_S_SVG_MRG_T,
		"height":PSTCG_CNSTS.DEFS.BASE_S_SVG_H - PSTCG_CNSTS.DEFS.BASE_S_SVG_MRG_B - PSTCG_CNSTS.DEFS.BASE_S_SVG_MRG_T,
		"width":PSTCG_CNSTS.DEFS.BASE_S_SVG_W - PSTCG_CNSTS.DEFS.BASE_S_SVG_MRG_L - PSTCG_CNSTS.DEFS.BASE_S_SVG_MRG_R,
		//"fill":PSTCG_CNSTS.DEFS.COLORS.MAGENTA
		"fill":"url(#grdFill01)"
	});
	
	//<nn>
	// A tárolóhoz adjuk a besetupolt objektumunkat.
	//</nn>
	layout.append(bgrect);
	$(svgElmnt).append(layout);
	
}

function a0030(svgElmnt,txtId,txt){
//<SF>
// 2018. ápr. 19.<br>
// Egy szöveg hozzáadása a paraméterben kapott SVG objektumhoz.<br>
// PARAMÉTEREK:
//×-
// @-- @param svgElmnt = a tartalmazó SVG elem -@
// @-- @param txtId = a hívó által kívánt ID -@
// @-- @param txt = a hívó által megejelenítendő szöveg -@
//-×
//MÓDOSÍTÁSOK:
//×-
// @-- ... -@
//-×
//</SF>
	
	//<nn>
	// A hiányzó paramétereket inicializáljuk vmi alapértelmezett értékkel.
	//</nn>
	if(svgElmnt === undefined){
		console.error("Nem érkezett tartalmazó objektum hivatkozás, a program leáll.");
		return;
	}
	if(txtId === undefined){
		txtId = "txtId01";
	}
	if(txt === undefined){
		txt = "Hello tesztszöveg";
	}
	
	var svgTxt = $(document.createElementNS(PSTCG_CNSTS.SVGNS, "text"));
	svgTxt.attr({
		"id":txtId,
		"x":10,
		"y":10,
		"fill":"#050505",
		"font-size":"10px"
	});
	svgTxt.text(txt);
	
	svgElmnt.append(svgTxt);
}

function a0040(svgElmnt, prmObj){
//<SF>
// Létrehozva: 2018. ápr. 21.<br>
// Szerző:  Balise Pascal
// LEÍRÁS<br>
// PARAMÉTEREK:
//×-
// @-- @param svgElmnt = az evg elem amihez hozzá kell adni a gridet. -@
// @-- @param prmObj = egy javascript objektum, ami taratlmazza a paramétereket. -@
//-×
//MÓDOSÍTÁSOK:
//×-
// @-- ... -@
//-×
//</SF>
	
	//<nn>
	// A hiányzó paraméterek feltöltése alapértelmezett értékekkel.
	//</nn>
	if(svgElmnt == undefined){
		svgElmnt = $("#chrt0001>svg");
		console.log("SVG elem nem jött paraméterként, auto-inicializálás!");
		console.log(svgElmnt);
	}
	if(prmObj == undefined){
		prmObj = {};
	}
	if(prmObj.elmId == undefined){
		prmObj.elmId = "bgGrid001";
	}
	if(prmObj.lineColor == undefined){
		prmObj.lineColor = "#CDCDCD";
	}
	if(prmObj.xLnNr == undefined){
		prmObj.xLnNr = PSTCG_CNSTS.DEF_RECNR;
	}
	if(prmObj.yLnNr == undefined){
		prmObj.yLnNr = prmObj.xLnNr;
	}
	if(prmObj.width == undefined){
		prmObj.width = PSTCG_CNSTS.DEFS.BASE_S_SVG_W - PSTCG_CNSTS.DEFS.BASE_S_SVG_MRG_L - PSTCG_CNSTS.DEFS.BASE_S_SVG_MRG_R; 
	}
	if(prmObj.height == undefined){
		prmObj.height = PSTCG_CNSTS.DEFS.BASE_S_SVG_H - PSTCG_CNSTS.DEFS.BASE_S_SVG_MRG_B - PSTCG_CNSTS.DEFS.BASE_S_SVG_MRG_T;
	}
	if(prmObj.xTrnslt == undefined){
		prmObj.xTrnslt = 0;
	}
	if(prmObj.yTrnslt == undefined){
		prmObj.yTrnslt = 0;
	}
	
	//<nn>
	// A rácsunk x osztásköze.
	//</nn>
	var xStep = prmObj.width / (prmObj.xLnNr + 1);
	
	//<nn>
	// A rácsunk y osztásköze.
	//</nn>
	var yStep = prmObj.height / (prmObj.yLnNr + 1);
	
	//<nn>
	// A gridhez létrehozunk egy group objektumot.
	//</nn>
	var grdGrp = $(document.createElementNS(PSTCG_CNSTS.SVGNS, "g"));
	//<nn>
	// A grouphoz adunk egy id-t is, niztos ami biztos
	//</nn>
	grdGrp.attr({
		"id":"bg-grid001"
	});
	
	//<nn>
	// Egy for ciklussal meggeneráljuk a háló függőleges vonalait.
	//</nn>
	for(var ix1 = 0; ix1 < prmObj.xLnNr; ix1++){
		var ln = $(document.createElementNS(PSTCG_CNSTS.SVGNS, "line"));
		ln.attr({
			"id":"grd-x"+(ix1+1),
			"x1":0+(ix1+1)*xStep+PSTCG_CNSTS.DEFS.BASE_S_SVG_MRG_L,
			"y1":0+PSTCG_CNSTS.DEFS.BASE_S_SVG_MRG_T,
			"x2":0+(ix1+1)*xStep+PSTCG_CNSTS.DEFS.BASE_S_SVG_MRG_L,
			"y2":prmObj.height+PSTCG_CNSTS.DEFS.BASE_S_SVG_MRG_T,
			"stroke":prmObj.lineColor,
			"stroke-width":1,
			"opacity":.8
		});
		grdGrp.append(ln);
	}
	
	//<nn>
	// Egy for ciklussal meggeneráljuk a háló vízszintes vonalait.
	//</nn>
	for(var ix1 = 0; ix1 < prmObj.yLnNr; ix1++){
		var ln = $(document.createElementNS(PSTCG_CNSTS.SVGNS, "line"));
		ln.attr({
			"id":"grd-y"+(ix1+1),
			"x1":0+PSTCG_CNSTS.DEFS.BASE_S_SVG_MRG_L,
			"y1":0+(ix1+1)*yStep+PSTCG_CNSTS.DEFS.BASE_S_SVG_MRG_T,
			"x2":0+PSTCG_CNSTS.DEFS.BASE_S_SVG_MRG_L+prmObj.width,
			"y2":0+(ix1+1)*yStep+PSTCG_CNSTS.DEFS.BASE_S_SVG_MRG_T,
			"stroke":prmObj.lineColor,
			"stroke-width":1,
			"opacity":.8
		});
		grdGrp.append(ln);
	}
	
	
	svgElmnt.append(grdGrp);
	
}

function a0050(svgElmnt, prmObj){
//<SF>
// Létrehozva: 2018. ápr. 21.<br>
// Szerző:  Balise Pascal
// Ez a függvény egy tengelyt fog generálni a kapott elemek alapján.<br>
// PARAMÉTEREK:
//×-
// @-- @param svgElmnt = at DVG objektum amibe tenni kell a tengelyeket. -@
// @-- @param prmObj = a javascript objektum ami minden paramétert tartalmaz. -@
//-×
//MÓDOSÍTÁSOK:
//×-
// @-- ... -@
//-×
//</SF>
	
	//<nn>
	// A hiányzó paraméterek feltöltése alapértelmezett értékekkel.
	//</nn>
	if(svgElmnt == undefined){
		svgElmnt = $("#chrt0001>svg");
		console.log("SVG elem nem jött paraméterként, auto-inicializálás!");
		console.log(svgElmnt);
	}
	if(prmObj == undefined){
		prmObj = {};
	}
	if(prmObj.align == undefined){
		prmObj.align = "x-bottom";
	}
	if(prmObj.lineColor == undefined){
		prmObj.lineColor = "#FF0505";
	}
	if(prmObj.xXlate == undefined){
		if(prmObj.align == "y-right"){
			prmObj.xXlate = PSTCG_CNSTS.DEFS.BASE_S_SVG_W - PSTCG_CNSTS.DEFS.BASE_S_SVG_MRG_R;
		}else{
			prmObj.xXlate = PSTCG_CNSTS.DEFS.BASE_S_SVG_MRG_L;
		}
	}
	if(prmObj.yXlate == undefined){
		if(prmObj.align == "x-bottom"){
			prmObj.yXlate = PSTCG_CNSTS.DEFS.BASE_S_SVG_H-PSTCG_CNSTS.DEFS.BASE_S_SVG_MRG_B;
		}else{
			prmObj.yXlate = PSTCG_CNSTS.DEFS.BASE_S_SVG_MRG_T;
		}
	}
	if(prmObj.length == undefined){
		if(prmObj.align == "x-bottom" || prmObj.align == "x-top"){
			prmObj.length = PSTCG_CNSTS.DEFS.BASE_S_SVG_W - PSTCG_CNSTS.DEFS.BASE_S_SVG_MRG_L - PSTCG_CNSTS.DEFS.BASE_S_SVG_MRG_R;
		}else if(prmObj.align == "y-left" || prmObj.align == "y-right"){
			prmObj.length = PSTCG_CNSTS.DEFS.BASE_S_SVG_H - PSTCG_CNSTS.DEFS.BASE_S_SVG_MRG_T - PSTCG_CNSTS.DEFS.BASE_S_SVG_MRG_B;
		}else{
			prmObj.length = PSTCG_CNSTS.DEFS.BASE_S_SVG_H - PSTCG_CNSTS.DEFS.BASE_S_SVG_MRG_T - PSTCG_CNSTS.DEFS.BASE_S_SVG_MRG_B;
		}
		
	}
	//<nn>
	// Ha nem jött param objektumban tick objektum, akkor csinálunk:)
	// Ez hosszabb menet lesz, egy újabb grouppal...
	//</nn>
	if(prmObj.ticks == undefined){
		prmObj.ticks = {};
	}
	if(prmObj.ticks.tckNr == undefined){
		prmObj.ticks.tckNr = PSTCG_CNSTS.DEF_RECNR;
	}
	if(prmObj.ticks.lineColor == undefined){
		prmObj.ticks.lineColor = prmObj.lineColor;
	}
	if(prmObj.ticks.align == undefined){
		if(prmObj.align == 'y-left' || prmObj.align == 'y-right'){
			prmObj.ticks.align = 'x';
		}else{
			prmObj.ticks.align = 'y';
		}
	}
	if(prmObj.ticks.length == undefined){
		//prmObj.ticks.length = prmObj.length/10;
		prmObj.ticks.length = 4;
	}
	
	//<nn>
	// Ha nem jött tengely-felirat tömb akkor csinálunk :)
	//</nn>
	if(prmObj.tickText == undefined){
		prmObj.tickText = [];
		for(var ix1 = 1; ix1 <= prmObj.ticks.tckNr;ix1++){
			prmObj.tickText[ix1-1] = ix1;
		}
	}
	if(prmObj.showTickText == undefined){
		prmObj.showTickText = true;
	}
	
	//<nn>
	// Létrehozunk egy GROUP-ot az axisnak.
	//</nn>
	var axsGrp = $(document.createElementNS(PSTCG_CNSTS.SVGNS, "g"));
	axsGrp.attr({
		"id":prmObj.align+"-axis-001"
	});
	
	
	//<nn>
	// Hozzáadjuk a tengely vonalat a tengelygroup-hoz.
	//</nn>
	var ln = $(document.createElementNS(PSTCG_CNSTS.SVGNS, "line"));
	ln.attr({
		"id":"axis-"+prmObj.align,
		"x1":0 + prmObj.xXlate,
		"y1":0 + prmObj.yXlate,
		"stroke":prmObj.lineColor,
		"stroke-width":1,
		"opacity":.99
	});
	//<nn>
	// Különféleképpen kell kezelni az X, és az Y tengelyek értékeit.
	//</nn>
	if(prmObj.align == "x-bottom"){
		ln.attr({
			"x2":0 + prmObj.xXlate + prmObj.length,
			"y2":0 + prmObj.yXlate
		});
	}else if(prmObj.align == "y-left"){
		ln.attr({
			"x2":0 + prmObj.xXlate,
			"y2":0 + prmObj.yXlate + prmObj.length
		});
	}else if(prmObj.align == "y-right"){
		ln.attr({
			"x2":0 + prmObj.xXlate,
			"y2":0 + prmObj.yXlate + prmObj.length
		});
	}else{
		ln.attr({
			"x2":0 + prmObj.xXlate,
			"y2":0 + prmObj.yXlate + prmObj.length
		});
	}
	//<nn>
	// Ha megvan a tengelyt mutató line objektum, hozzáadjuk a tengely grouphoz.
	//</nn>
	axsGrp.append(ln);
	
	//<nn>
	// A tengely beosztásainak (tick) is létrehozunk egy GROUPot.
	//</nn>
	var tckGrp = $(document.createElementNS(PSTCG_CNSTS.SVGNS, "g"));
	tckGrp.attr({
		"id":"ticks001"
	});
	
	//<nn>
	// Egy változóba tesszük a tickek közötti távolságot.
	//</nn>
	var step = prmObj.length / (prmObj.ticks.tckNr+1);
	
	//<nn>
	// A tick-ekhez tartozó line elemeket generáljuk le.
	//</nn>
	if(prmObj.align == "x-bottom"){
		for(var ix1=0; ix1<prmObj.ticks.tckNr; ix1++){
			var tLn = $(document.createElementNS(PSTCG_CNSTS.SVGNS, "line"));
			tLn.attr({
				"id":"tck-x-"+ix1,
				"x1":0 + prmObj.xXlate + ((ix1 + 1) * step),
				"y1":prmObj.yXlate,
				"x2":0 + prmObj.xXlate + ((ix1 + 1) * step),
				"y2":prmObj.yXlate + prmObj.ticks.length,
				"stroke":prmObj.ticks.lineColor,
				"stroke-width":1,
				"opacity":1
			});
			tckGrp.append(tLn);
			//<nn>
			// Ha a szöveghozzáadás kell, akkor betesszük szöveget is a tenegly-tick-ekhez
			//</nn>
			if(prmObj.showTickText){
				var txt = $(document.createElementNS(PSTCG_CNSTS.SVGNS, "text"));
				txt.attr({
					"id":"tck-txt-x-"+ix1,
					"x":0 + prmObj.xXlate + ((ix1 + 1) * step) - 2,
					"y":prmObj.yXlate + 12,
					"font-family":"Verdana",
					"font-size":PSTCG_CNSTS.DEF_AX_TCK_FONT_SIZE,
					"fill":"#050505",
					"opacity":1
				});
				txt.text(prmObj.tickText[ix1]);
				tckGrp.append(txt);
			}
		}
	}else if(prmObj.align == "y-left"){
		for(var ix1=0; ix1<prmObj.ticks.tckNr; ix1++){
			var tLn = $(document.createElementNS(PSTCG_CNSTS.SVGNS, "line"));
			tLn.attr({
				"id":"tck-y-"+ix1,
				"x1":0 + prmObj.xXlate,
				"y1":0 + prmObj.yXlate + ((ix1 + 1) * step),
				"x2":0 + prmObj.xXlate - prmObj.ticks.length,
				"y2":0 + prmObj.yXlate + ((ix1 + 1) * step),
				"stroke":prmObj.ticks.lineColor,
				"stroke-width":1,
				"opacity":1
			});
			tckGrp.append(tLn);
			//<nn>
			// Ha a szöveghozzáadás kell, akkor betesszük szöveget is a tenegly-tick-ekhez
			//</nn>
			if(prmObj.showTickText){
				var txt = $(document.createElementNS(PSTCG_CNSTS.SVGNS, "text"));
				txt.attr({
					"id":"tck-txt-x-"+ix1,
					"x":0 + prmObj.xXlate - 10,
					"y":0 + prmObj.yXlate + ((ix1 + 1) * step) + 3,
					"font-family":"Verdana",
					"font-size":PSTCG_CNSTS.DEF_AX_TCK_FONT_SIZE,
					"fill":"#050505",
					"opacity":1
				});
				txt.text(prmObj.tickText[ix1]);
				tckGrp.append(txt);
			}
		}
	}else if(prmObj.align == "y-right"){
		for(var ix1=0; ix1<prmObj.ticks.tckNr; ix1++){
			var tLn = $(document.createElementNS(PSTCG_CNSTS.SVGNS, "line"));
			tLn.attr({
				"id":"tck-y-"+ix1,
				"x1":0 + prmObj.xXlate,
				"y1":0 + prmObj.yXlate + ((ix1 + 1) * step),
				"x2":0 + prmObj.xXlate + prmObj.ticks.length,
				"y2":0 + prmObj.yXlate + ((ix1 + 1) * step),
				"stroke":prmObj.ticks.lineColor,
				"stroke-width":1,
				"opacity":1
			});
			tckGrp.append(tLn);
		}
	}
	
	
	
	
	//<nn>
	// A tengely GROUP-jához adjuk a tick-groupot is.
	//</nn>
	axsGrp.append(tckGrp);
	
	//<nn>
	// Ha a végeztünk, akkor a paraméterben kapott SVG elemhez adjuk a teljes, felépített tengely group-ot.
	//</nn>
	svgElmnt.append(axsGrp);
	
}

function a0060(sclMin, sclMax, domMin, domMax){
//<SF>
// 2018. ápr. 24.<br>
// A skála elemet generáló függvény.<br>
// Ez lenne az a függvény, ami az adatok, és a grafikon terjedelméből/mérteéből, az egyes adatelemeket
// koordináta értékekre fordítja le.
// Ehhez persze tudni akell, hogy mi lesz az értelmezés tartaomány (adatok terjedelme), és mi lesz az értékkészlet (grafikon adott dimenziója)
// PARAMÉTEREK:
//×-
// @-- @param sclMin = a grafikon minimumértéke (0) -@
// @-- @param sclMax = a grafikon maximumértéke (0) -@
// @-- @param domMin = az adatok minimumértéke (0) -@
// @-- @param domMax = az adatok maximumértéke (0) -@
//-×
//MÓDOSÍTÁSOK:
//×-
// @-- ... -@
//-×
//</SF>
	
	//<nn>
	//...
	//</nn>
	if(sclMin == undefined){
		sclMin = 0;
	}
	if(sclMax == undefined){
		sclMax = 330;
	}
	if(domMin == undefined){
		domMin = 50;
	}
	if(domMax == undefined){
		domMax = 1000;
	}
	
	//<nn>
	// A visszadandó objektum, aminek a getVal függvényét használjuk majd a skálázáshoz, 
	// amivel az ábrázolandó értékeket átkonvertáljuk pixelbeni távolságokká.
	//</nn>
	var scl = {};
	
	//<nn>
	// A scale objektum elemei:
	// min/maxVAL => az értékkészlet maxi/mini-muma, vagyis a pixlekoordináták <br>
	// min/maxDOM => az értelmezési tartomány maxi/mini-muma, vagyis az adatok kerekített szélsőértékei <br> 
	// extVal/Dom => az értékkészlet, és az értelmezési tartomány terjedelme.
	//
	//</nn>
	scl.minVal = sclMin;
	scl.maxVal = sclMax;
	scl.minDom = domMin;
	scl.maxDom = domMax;
	scl.extVal = scl.maxVal - scl.minVal;
	scl.extDom = scl.maxDom - scl.minDom;
	
	scl.getVal = function(val){
		
		if(val >= this.maxDom){
			return this.maxVal;
		}else if(val <= this.minDom){
			return this.minVal;
		}else{
			console.log("this.maxVal-this.minVal: " + (this.maxVal-this.minVal));
			console.log("this.maxDom-this.minDom: " + (this.maxDom-this.minDom));
			return (val - this.minDom) * (this.extVal/this.extDom);
		}
	};
	
	//<nn>
	// A scale objektumunkat viszaadjuk.
	//</nn>
	return scl;
}

function a0070(svgElmnt, data, type, sclX, sclY){
//<SF>
// Létrehozva: 2018. ápr. 24.<br>
// Szerző:  Balise Pascal
// Az adatokat reprezentáló SVG obketumok legenrálása.<br>
// PARAMÉTEREK:
//×-
// @-- @param svgElmnt = az grafikont tároló SVG tag -@
// @-- @param data = az adatokat tároló tömb (min 2 dimenziós >x, és y tengely adatai. -@
// @-- @param type = az grafikont tároló SVG tag -@
// @-- @param sclX = az X tengely skálázó objektuma -@
// @-- @param sclX = az Y tengely skálázó objektuma -@
//-×
//MÓDOSÍTÁSOK:
//×-
// @-- ... -@
//-×
//</SF>
	
	
	
}



















