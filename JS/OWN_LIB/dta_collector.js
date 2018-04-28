//<M>
//×-
//@-FILENÉV   : JS_CHARTS_FROM_SCRATCH - dta_collector.js-@
//@-SZERZŐ    : AX07057-@
//@-LÉTREHOZVA: 2018. ápr. 28.-@
//@-FÜGGŐSÉGEK:
//×-
// @-- consts.js-@
//-@
//-×
//-@
//@-LEÍRÁS    :
// Az adatok begyűjtése.
//@-MÓDOSÍTÁSOK :
//×-
// @-- ... -@
//-×
//-×
//</M>

var PSTCG = PSTCG || {};

var PSTCG_DC = PSTCG_DC || {}; 



//<nn>
//+===========================================================================+
//|###########################################################################|
//|\\\\\\\\\\                   ADAT   OBJEKTUMOK                  \\\\\\\\\\\|
//|###########################################################################|
//+===========================================================================+
//</nn>
PSTCG_DC.TSTDATA01 = PSTCG_DC.TSTDATA01 || {};


//<nn>
//+===========================================================================+
//|###########################################################################|
//|\\\\\\\\\\               FÜGGVÉNY   OBJEKTUMOK                  \\\\\\\\\\\|
//|###########################################################################|
//+===========================================================================+
//</nn>
PSTCG_DC.getTestData = function(){
//<SF>
// LÉTREHOZVA: 2018. ápr. 28.<br>
// SZERZŐ:    blaise<br>
// A tesztadatok lewkérdezése....<br>
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
	// Egy AJAX hívással feltöltjük a mintaadatokat.<br>
	// Ennek két része lesz:<br>
	// - az első az AJAX törzs a paraméterezéssel:<br>
	// - - method: POST (post hívás kell, mert megy és jön is adat)
	// - - url: a szereven lévő PHP site címe, ami az adatokat kiadja
	// - - data: a beküldött paramétereket tartalmazó jscript objektum
	// - .done() function a hívást követően, ami kezeli a választ
	//</nn>
	$.ajax({
	  method: "POST",
	  url: "/JS_CHARTS_FROM_SCRATCH/PHP/DATA_COLLECTOR.php",
	  data: { ajaxDir: "phpTest01" },
	}).done(function(xhr) {
		//<nn>
		// Gyorsan egy jScript objetumba tesszük az eredményt, majd ...
		//</nn>
		var res = JSON.parse(xhr);
		//<nn>
		// Egy IF szerkezettel kezeljük, hogy a válasz FLAG eleme OK, vagy NOK.
		//</nn>
		if(res.FLAG === "OK") {
			//<nn>
			// Ha rendben volt a FLAG mehet az adat!
			//</nn>
			console.info("Adatok megvannak!");
			PSTCG_DC.TSTDATA01 = res.DATA;
			var ol = $("<ul></ul>");
			for(var ix1=0; ix1 < res.DATA.length; ix1++){
				var li = "<li>";
				li += res.DATA[ix1].recid + ",";
				li += res.DATA[ix1].dat + ",";
				li += res.DATA[ix1].income + "</li>";
				ol.append($(li));	
			}
			$("#chrt0002").append(ol);
		}else {
			//<nn>
			// Ha hiba volt, akkor a hibaüzenetet megjelenítjük egy külön DIV ben a lapon.<br>
			// Ehhez saját modal-t csinálunk, amihez van egy background elem, meg egy üzenet elem.<br>
			// Mindegyiket bedobjuk a body-ba, egy gombbal, amivel el lehet tüntetni.
			//</nn>
			var bgr = '<div id="modal-bgr"></div>';
			
			$("body").append(bgr);
			
			
			var htmlCd = '<div id="modal-div"><div class="ajxERRMsg">' + 'Ajax adatletöltési hiba!<br>';
			htmlCd += 'A hiba leírása:<br>';
			htmlCd += res.MSG + '<br>';
			htmlCd += '===================<br><button class="btn btn-primary" onclick="PSTCG.clearModal()">BEZÁRÁS</button><br></div></div>';
			
			$("body").append(htmlCd);
		}
	});
}



//<nn>
//+===========================================================================+
//|###########################################################################|
//|\\\\\\\\\\                  SEGÉD FÜGGVÉNYEK                    \\\\\\\\\\\|
//|###########################################################################|
//+===========================================================================+
//</nn>
PSTCG.clearModal = function(){
//<SF>
// LÉTREHOZVA: 2018. ápr. 28.<br>
// SZERZŐ:    blaise<br>
// Ez a függvény tünteti el, a modális üzeneteket...<br>
// PARAMÉTEREK:
//×-
// @-- @param ... = ... -@
//-×
//MÓDOSÍTÁSOK:
//×-
// @-- ... -@
//-×
//</SF>
	
	//<DEBUG>
	// Hogy ellenőrizzük, megjeleníthetünk egy console üzenetet:
	//<code>
	// console.log("Modal eltüntető függvény meghívva!");
	//</code>
	//</DEBUG>
	
	$("#modal-div").remove();
	$("#modal-bgr").remove();
	
}























