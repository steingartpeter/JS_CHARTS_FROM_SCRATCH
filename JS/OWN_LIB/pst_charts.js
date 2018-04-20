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
	// Ha nem jött táoló SVG elem, akkor leáll a program.
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


























