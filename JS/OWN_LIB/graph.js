//<M>
//×-
//@-FILENÉV   : PROJECT NAME - graph.js-@
//@-SZERZŐ    : AX07057-@
//@-LÉTREHOZVA: 2018-06-24-@
//@-FÜGGŐSÉGEK:
//×-
// @-- consts.js-@
//-@
//-×
//-@
//@-LEÍRÁS    :
// Ez a javascript file egy CHART objektumot tartalmaz, mintha az egy class lene.<br>
// Először is definiáljuk benne az összetett részelemeket, mint egy MEAT a leaíráshoz, 
// vagy a BGRECT a háttérhez, esetleg a 
//@-MÓDOSÍTÁSOK :
//×-
// @-- ... -@
//-×
//-×
//</M>

var PSTCG = PSTCG || {};

PSTCG.CHART = function(id){
//<SF>
// LÉTREHOZVA: 2018. jún. 24.<br>
// SZERZŐ:    blaise<br>
// Ez a függvény afféle konstruktor, a fentebb definiált JSON objektumból ad egyet vissza.<br>
// PARAMÉTEREK:
//×-
// @-- @param id = az svg objektum ID-je, ha jön -@
//-×
//MÓDOSÍTÁSOK:
//×-
// @-- ... -@
//-×
//</SF>

	var self = this;
	
	if(id === undefined){
		id = 'pst-chrt'+Math.floor(Math.random()*1000);
	}
	
	//<nn>
	// Az alapértelmezett = DEFAULT értékeket tartalmazó objektum.
	//</nn>
	this.META = {
		cntnrId:"chrt001",
		chartId:id,
		fill:"#A5A5A5",
		size:"S",
		title:"Teszt chart 001"
	};
	
	//<nn>
	// Az SVG elemek definíciója, mint:<br>
	// - lineraGradient
	// - blur
	//</nn>
	this.SVGDEFS = {
		id:'svg-defs-001',
		grads:[
			{
				id:'linGrd001',
				x1:'0%',
				y1:'0%',
				x2:'0%',
				y2:'100%',
				stop1:{
					offset:'10%',
					'stop-color':'#858585',
				},
				stop2:{
					offset:'90%',
					'stop-color':'#E5E5E5'
				}
			},
			{
				id:'linGrd002',
				x1:'0%',
				y1:'0%',
				x2:'0%',
				y2:'100%',
				stop1:{
					offset:'10%',
					'stop-color':'#E5E5E5',
				},
				stop2:{
					offset:'90%',
					'stop-color':'#858585'
				}
			}
		],
		filters:[
			{
				id:"fltr-blur01",
				type:"feGaussianBlur",
				inElm:"SourceGraphic",
				stdDeviation:2
			}
		]
	};
	
	//<nn>
	// A chartot leíró dimenziók.
	// Az itt alapértelmezettként megjelenítettek az S méretű charthoz valók.
	//</nn>
	this.DIMS = {
		svgW:200,
		svgH:200,
		chrtMrgT:28,
		chrtMrgB:20,
		chrtMrgL:20,
		chrtMrgR:20,
		chrtBGRectDims: [160,152],	
	};
	
	//<nn>
	// A chart hattár rectangle-je ez adja a színezett hátteret magához a charthoz. emiatt:<br/>
	//×-
	// @-- a méretének követni ekll a CHART méretét -@
	// @-- a margókkal való eltolásnak meg kell jelennie -@
	// @-- item text 03 -@
	// @-- ... -@
	//-×
	//</nn>
	this.BGRECT = {
		g:{},
		id:"",
		x:0+this.DIMS.chrtMrgL,
		y:0+this.DIMS.chrtMrgT,
		width:this.DIMS.chrtBGRectDims[0],
		height:this.DIMS.chrtBGRectDims[1],
		fill:'url:linGrd001'
	}
	
	
	//<nn>
	// Még mindig a háttér, most lássuk a GRID-et!<br/>
	// Ezzel annyi a gáz, hogy nem lehet még tudni, hogy milyen dimenziójú háló lesz.<br/>
	// Pedig x darab függőleges, és y darab vízszintes vonalból kell majd állnia. Mivel erről fogalmunk sincs itt még, 
	// jobb lesz nekik simán 1-1 tömböt definiálni csak.
	//</nn>
	this.BGGRID = {
		grpId:"bg-grid01",
		'x-lines':[],
		'y-lines':[],
		baseSetup:function(){
			var lineColor = "#CDCDCD";
			var xLnNr = self.DATA.vals01.length;
			var yLnNr = xLnNr;
			var width = self.DIMS.svgW - self.DIMS.chrtMrgL - self.DIMS.chrtMrgR;
			var height = self.DIMS.svgH - self.DIMS.chrtMrgB - self.DIMS.chrtMrgT;
			var xTrnslt = 0;
			var yTrnslt = 0;

			//<nn>
			// A rácsunk x osztásköze.
			//</nn>
			var xStep = width / (xLnNr + 1);

			//<nn>
			// A rácsunk y osztásköze.
			//</nn>
			var yStep = height / (yLnNr + 1);

			//<nn>
			// Egy for ciklussal meggeneráljuk a háló függőleges vonalait.
			//</nn>
			for (var ix1 = 0; ix1 < xLnNr; ix1++) {
				var ln = $(document.createElementNS(PSTCG_CNSTS.SVGNS, "line"));
				ln.attr({
					"id" : "grd-x" + (ix1 + 1),
					"x1" : 0 + (ix1 + 1) * xStep + self.DIMS.chrtMrgL,
					"y1" : 0 + self.DIMS.chrtMrgT,
					"x2" : 0 + (ix1 + 1) * xStep + self.DIMS.chrtMrgL,
					"y2" : height + self.DIMS.chrtMrgT,
					"stroke" : lineColor,
					"stroke-width" : 1,
					"opacity" : .8
				});
				this["x-lines"].push(ln);
			}

			//<nn>
			// Egy for ciklussal meggeneráljuk a háló vízszintes vonalait.
			//</nn>
			for (var ix1 = 0; ix1 < yLnNr; ix1++) {
				var ln = $(document.createElementNS(PSTCG_CNSTS.SVGNS, "line"));
				ln.attr({
					"id" : "grd-y" + (ix1 + 1),
					"x1" : 0 + self.DIMS.chrtMrgL,
					"y1" : 0 + (ix1 + 1) * yStep + self.DIMS.chrtMrgT,
					"x2" : 0 + self.DIMS.chrtMrgL + width,
					"y2" : 0 + (ix1 + 1) * yStep + self.DIMS.chrtMrgT,
					"stroke" : lineColor,
					"stroke-width" : 1,
					"opacity" : .8
				});
				this['y-lines'].push(ln);
			}
		}
	}
	
	this.AXESS = {
		axs:[
				{
					grpId:"x-btm-axis01",
					line:{
						id:"",
						x1:this.DIMS.chrtMrgL,
						y1:this.DIMS.svgW - this.DIMS.chrtMrgT,
						x2:this.DIMS.svgW - this.DIMS.chrtMrgT - this.DIMS.chrtMrgL,
						y2:this.DIMS.svgW - this.DIMS.chrtMrgT - this.DIMS.chrtMrgL,
						stroke:'#FF0505',
						"stroke-width":1,
						opacity:.99
					},
					gTicks:[],
					gTexts:[]
				},
				{
					grpId:"y-lft-axis01",
					line:{
						id:"",
						x1:this.DIMS.chrtMrgL,
						y1:this.DIMS.chrtMrgT,
						x2:this.DIMS.chrtMrgL,
						y2:this.DIMS.svgW - this.DIMS.chrtMrgT - this.DIMS.chrtMrgL,
						stroke:'#FF0505',
						"stroke-width":1,
						opacity:.99
					},
					gTicks:[],
					gTexts:[]
				}
		]
	}
	
	this.DATA = {
		xScrptn:["1",'2','3','4','5'],
		yScrptn:["200","400","400","800",'1000'],
		vals01:[180,450,610,500,750]
	}
	
	this.FUNCS = {
		xScl01:{
			name:"bscX",
			minVal:0,
			maxVal:400,
			minDom:0,
			maxDom:1000,
			extVal:function(){return this.maxVal-this.minVal;},
			extDom:function(){return this.maxDom-this.minDom;},
			getVal:function(v){
				if (v >= this.maxDom) {
					return this.maxVal;
				} else if (v <= this.minDom) {
					return this.minVal;
				} else {
					return this.minVal + ((v - this.minDom) * (this.extVal() / this.extDom()))
				}
			}
		},
		yScl01:{
			name:"bscY",
			minVal:0,
			maxVal:this.DIMS.svgH-this.DIMS.chrtMrgT-this.DIMS.chrtMrgB,
			minDom:0,
			maxDom:1000,
			extVal:function(){return this.maxVal-this.minVal;},
			extDom:function(){return this.maxDom-this.minDom;},
			getVal:function(v){
				if (v >= this.maxDom) {
					return this.maxVal;
				} else if (v <= this.minDom) {
					return this.minVal;
				} else {
					return this.minVal + ((v - this.minDom) * (this.extVal() / this.extDom()))
				}
			}
		}
	}
	
	//<nn>
	//+-----------------------------------------------------+
	//|/////////////////////////////////////////////////////|
	//| # # #          FUNCTION DECLARATIONS          # # # |
	//|/////////////////////////////////////////////////////|
	//+-----------------------------------------------------+
	//</nn>
	
	//<nn>
	// A META elem bellításának függvénye.
	//</nn>
	this.setMeta = function(prmObj){
	//<SF>
	// LÉTREHOZVA: 2018. jún. 24.<br>
	// SZERZŐ:    blaise<br>
	// Ez a függvény van arra, hogy egy teljes paraméter objektummal beállítsuk full customra a
	// jelen chart META elemeit.<br>
	// PARAMÉTEREK:
	//×-
	// @-- @param prmObj = a paraméterobjektum, ami tartalmazza a META-ban beállítható elmek egy részét vagy mindet. -@
	//-×
	//MÓDOSÍTÁSOK:
	//×-
	// @-- ... -@
	//-×
	//</SF>
		
		if(prmObj.cntnrId !== undefined){
			this.META.cntnrId = prmObj.cntnrId; 
		}
		//chartId:id,
		if(prmObj.chartId !== undefined){
			this.META.chartId = prmObj.chartId;
		}
		//fill:"#A5A5A5",
		if(prmObj.fill !== undefined){
			this.META.fill = prmObj.fill;
		}
		//size:"S",
		if(prmObj.size !== undefined){
			this.META.size = prmObj.size;
		}
		//title:"Teszt chart 001"
		if(prmObj.title !== undefined){
			this.META.title = prmObj.title;
		}
		
	}
	
	this.setDIMS = function(prmObj){
	//<SF>
	// LÉTREHOZVA: 2018. jún. 24.<br>
	// SZERZŐ:    blaise<br>
	// Ez a függvény beállítja/módosítja a DIMS objektumon keresztül a chart méreteit.<br>
	// Fontos, hogy emiatt itt módosítani kell a BG rect definícióját is!<br>
	// PARAMÉTEREK:
	//×-
	// @-- @param prmObj = a paramétereket tartalmazó objektum -@
	//-×
	//MÓDOSÍTÁSOK:
	//×-
	// @-- ... -@
	//-×
	//</SF>
		
		if(prmObj.size !== undefined){
			if(prmObj.size === 'M'){
				this.META.size = "M",
				this.DIMS.svgW = 400;
				this.DIMS.svgH = 400;
				this.DIMS.chrtMrgT = 56;
				this.DIMS.chrtMrgB = 40;
				this.DIMS.chrtMrgL = 40;
				this.DIMS.chrtMrgR = 40;
				this.DIMS.chrtBGRectDims = [320,304];
			}else if(prmObj.size === 'L'){
				this.META.size = "L";
				this.DIMS.svgW = 600;
				this.DIMS.svgH = 600;
				this.DIMS.chrtMrgT = 84;
				this.DIMS.chrtMrgB = 60;
				this.DIMS.chrtMrgL = 60;
				this.DIMS.chrtMrgR = 60;
				this.DIMS.chrtBGRectDims = [480,456];
			}else if(prmObj.size === 'XL'){
				this.META.size = "XL";
				this.DIMS.svgW = 800;
				this.DIMS.svgH = 800;
				this.DIMS.chrtMrgT = 112;
				this.DIMS.chrtMrgB = 80;
				this.DIMS.chrtMrgL = 80;
				this.DIMS.chrtMrgR = 80;
				this.DIMS.chrtBGRectDims = [640,608];
			}else{
				console.error("Ismeretlen méretmegnevezés: " + prmObj.size +", az elsogadott elemek: S/M/L/XL");
				return;
			}
			
			this.BGRECT = {
				x:0+this.DIMS.chrtMrgL,
				y:0+this.DIMS.chrtMrgT,
				width:this.DIMS.chrtBGRectDims[0],
				height:this.DIMS.chrtBGRectDims[1],
				fill:'url:linGrd001'
			}
			
		}
		
	}
	
	this.setBGRct = function(prmObj){
	//<SF>
	// Létrehozva: 2018. jún. 27.<br>
	// Szerző:  Balise Pascal
	// Mindig az aktuális tesztfüggvény...<br>
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
		// Kezeljük a hiányzó paraméterek esetét.
		//</nn>
		if(prmObj.col0 === undefined){
			prmObj.col0 = "#525252";
		}
		
		if(prmObj.col1 === undefined){
			prmObj.col1 = "#E5E5E5";
		}
		
		//<nn>
		// megszerezzük az első linGrad elem ID-jét
		//</nn>
		var bgGrdId = this.SVGDEFS.grads[0].id;
		
		//<nn>
		// Átállítjuk a színátmenet szélső értékeit a paraméterben kapott színekre.
		//</nn>
		var stp1 = $("#"+bgGrdId+">stop").eq(0);
		stp1.attr({"stop-color":prmObj.col0});
		
		var stp2 = $("#"+bgGrdId+">stop").eq(1);
		stp2.attr({"stop-color":prmObj.col1});
	}
	
	this.setScales = function(prmObj){
	//<SF>
	// Létrehozva: 2018. jún. 30.<br>
	// Szerző:  Balise Pascal
	// A scal function-ös objektumok beállítása.<br>
	// PARAMÉTEREK:
	//×-
	// @-- @param prmObj = a paraméter objketum -@
	//-×
	//MÓDOSÍTÁSOK:
	//×-
	// @-- ... -@
	//-×
	//</SF>
		
		if(prmObj.name === undefined){
		//<nn>
		// Léterhozunk egy új alapértelemezett skálázó objektumot.
		//</nn>
			
		}else if(prmObj.name === "bscX"){
		//<nn>
		// A paraméterobjektum az alap X skálát módosítja.
		//</nn>
		}else if(prmObj.name === "bscX"){
		//<nn>
		// A paraméterobjektum az alap Y skálát módosítja.
		//</nn>	
		}else{
		//<nn>
		// A paraméterobjektum egy új elnevezett skálázó elemet ad a FUNC elemhez.
		//</nn>
			
			this.FUNCS[prmObj.name] = {
				name:prmObj.name,
				minVal:0,
				maxVal:this.DIMS.svgH-this.DIMS.chrtMrgT-this.DIMS.chrtMrgB,
				minDom:0,
				maxDom:1000,
				extVal:function(){return this.maxVal-this.minVal;},
				extDom:function(){return this.maxDom-this.minDom;},
				getVal:function(v){
					if (v >= this.maxDom) {
						return this.maxVal;
					} else if (v <= this.minDom) {
						return this.minVal;
					} else {
						return this.minVal + ((v - this.minDom) * (this.extVal() / this.extDom()));
					}
				}
			};
			
			//<nn>
			// Az új scale elemeinek beállítása. 
			//</nn>
			if(prmObj.minDom !== undefined){
				this.FUNCS[prmObj.name].minDom = prmObj.minDom;
			}
			if(prmObj.maxDom !== undefined){
				this.FUNCS[prmObj.name].maxDom = prmObj.maxDom;
			}
			if(prmObj.minVal !== undefined){
				this.FUNCS[prmObj.name].minVal = prmObj.minVal;
			}
			if(prmObj.maxVal !== undefined){
				this.FUNCS[prmObj.name].maxVal = prmObj.maxVal;
			}
			
		}
		
		
	}

	this.setBGGrid = function(prmObj){
	//<SF>
	// Létrehozva: 2018. jún. 30.<br>
	// Szerző:  Balise Pascal
	// A háttérháló/rács tulajdonságainak beállítása<br>
	// PARAMÉTEREK:
	//×-
	// @-- @param prmObj = a szokásos mindent tartalmazó paraméter objketum -@
	//-×
	//MÓDOSÍTÁSOK:
	//×-
	// @-- ... -@
	//-×
	//</SF>
		
		//<nn>
		// A rács X sűrűségének megváltoztatása.<br>
		// Mivel ez a két mutatvány a rács teljes eldobásával, és újragenerálásával jár,
		// minden kisebb módosítást ezek uzán alkalmazunk, mert különben azok az itt használt 
		// default értékekkel lennének felülírva.
		//</nn>
		if(prmObj.xLnNr !== undefined){
			console.log("prmObj.xLnNr: " + prmObj.xLnNr);
			if(prmObj.xLnNr != this.BGGRID["x-lines"].length){
				//<nn>
				// Kitöröljük a korábbi gridet.
				//</nn>
				var xGrid = $("#"+this.BGGRID.grpId+">g").eq(0);
				xGrid.empty();
				this.BGGRID["x-lines"] = [];
				//<nn>
				// A generáláshoz szükséges változók aktuális értékeit kiszámítjuk!
				//</nn>
				var width = this.DIMS.svgW - this.DIMS.chrtMrgL - this.DIMS.chrtMrgR;
				var height = this.DIMS.svgH - this.DIMS.chrtMrgB - this.DIMS.chrtMrgT;
				var xStep = width / (prmObj.xLnNr + 1);
				//<nn>
				// Gondoskodunk a vonalszín beálításáról is, ha az nem jött volna paraméterként
				//</nn>
				if(prmObj.lineColor === undefined){
					prmObj.lineColor = "#CDCDCD";
				}
				//<nn>
				// Egy for ciklussal legenerájuk az új grid csíkokat.
				//</nn>
				for (var ix1 = 0; ix1 < prmObj.xLnNr; ix1++) {
					var ln = $(document.createElementNS(PSTCG_CNSTS.SVGNS, "line"));
					ln.attr({
						"id" : "grd-x" + (ix1 + 1),
						"x1" : 0 + (ix1 + 1) * xStep + this.DIMS.chrtMrgL,
						"y1" : 0 + this.DIMS.chrtMrgT,
						"x2" : 0 + (ix1 + 1) * xStep + this.DIMS.chrtMrgL,
						"y2" : height + this.DIMS.chrtMrgT,
						"stroke" : prmObj.lineColor,
						"stroke-width" : 1,
						"opacity" : .8
					});
					this.BGGRID["x-lines"].push(ln);
					xGrid.append(ln);
				}
				
			}
		}
		
		//<nn>
		// A rács X sűrűségének megváltoztatása
		//</nn>
		if(prmObj.yLnNr !== undefined){
			if(prmObj.yLnNr != this.BGGRID["y-lines"].length){
				console.log("prmObj.yLnNr: " + prmObj.yLnNr);
				//<nn>
				// Kitöröljük a korábbi gridet.
				//</nn>
				var yGrid = $("#"+this.BGGRID.grpId+">g").eq(1);
				yGrid.empty();
				//<nn>
				// A generáláshoz szükséges változók aktuális értékeit kiszámítjuk!
				//</nn>
				var width = this.DIMS.svgW - this.DIMS.chrtMrgL - this.DIMS.chrtMrgR;
				var height = this.DIMS.svgH - this.DIMS.chrtMrgB - this.DIMS.chrtMrgT;
				var yStep = height / (prmObj.yLnNr + 1);;
				//<nn>
				// Gondoskodunk a vonalszín beálításáról is, ha az nem jött volna paraméterként
				//</nn>
				if(prmObj.lineColor === undefined){
					prmObj.lineColor = "#CDCDCD";
				}
				//<nn>
				// Egy for ciklussal legenerájuk az új grid csíkokat.
				//</nn>
				for (var ix1 = 0; ix1 < prmObj.yLnNr; ix1++) {
					var ln = $(document.createElementNS(PSTCG_CNSTS.SVGNS, "line"));
					ln.attr({
						"id" : "grd-y" + (ix1 + 1),
						"x1" : 0 + this.DIMS.chrtMrgL,
						"y1" : 0 + (ix1 + 1) * yStep + this.DIMS.chrtMrgT,
						"x2" : 0 + this.DIMS.chrtMrgL + width,
						"y2" : 0 + (ix1 + 1) * yStep + this.DIMS.chrtMrgT,
						"stroke" : prmObj.lineColor,
						"stroke-width" : 1,
						"opacity" : .8
					});
					this.BGGRID["y-lines"].push(ln);
					yGrid.append(ln);
				}
				
			}
		}
		
		//<nn>
		// Minden rácsvonal színének beállítása
		//</nn>
		if (prmObj.lineColor !== undefined) {
			var lns =$("#"+c.BGGRID.grpId+">g>line");
			lns.attr({
				stroke:prmObj.lineColor
			});
		}
		if (prmObj.xLineColor !== undefined) {
			var xGrp =$("#"+this.BGGRID.grpId+">g").eq(0);
			var lns = xGrp.children("line");
			lns.attr({
				stroke: prmObj.xLineColor
			});
		}
		if (prmObj.yLineColor !== undefined) {
			var yGrp =$("#"+this.BGGRID.grpId+">g").eq(1);
			var lns = yGrp.children("line");
			lns.attr({
				stroke: prmObj.yLineColor
			});
		}
		
		//<nn>
		// A rács átlátszóságának beállítása
		//</nn>
		if (prmObj.opacity !== undefined) {
			var lns =$("#"+c.BGGRID.grpId+">g>line");
			lns.attr({
				opacity:prmObj.opacity
			});
		}
		
		
		//<nn>
		// A rácsvonalak vastagságának beállítása
		//</nn>
		if (prmObj.strokeWidth !== undefined) {
			var lns =$("#"+c.BGGRID.grpId+">g>line");
			lns.attr({
				"stroke-width":prmObj.strokeWidth
			});
		}
	}


	this.render = function(prmObj){
	//<SF>
	// Létrehozva: 2018. jún. 27.<br>
	// Szerző:  Balise Pascal
	// LEÍRÁS<br>
	// PARAMÉTEREK:
	//×-
	// @-- @param prmObj = paraméter objketuzm, több elemből! -@
	//-×
	//MÓDOSÍTÁSOK:
	//×-
	// @-- ... -@
	//-×
	//</SF>
			
		//<nn>
		// Levesszük az oldalról a konténer objektum egy referenciáját.
		//</nn>
		var cntnr = $("#"+this.META.cntnrId);
		
		
		//<nn>
		//+-------------------------------------------------------------------+
		//|\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\|
		//|          ***********   ALAP SVG OBJKETUM    ***********           |
		//|\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\|
		//+-------------------------------------------------------------------+
		//</nn>
		
		//<nn>
		// Összeállítjuk az SVG objektumot, amit majd ha készre faragjuk, odatesszük a konténerobjektumba!
		//</nn>
		var svg = $(document.createElementNS(PSTCG_CNSTS.SVGNS, 'svg'));
		console.log("render - svg");
		console.log(svg);
		
		svg.attr({
			id : this.META.chartId,
			fill : this.META.fill,
			size : this.META.size,
			title : this.META.title,
			width : this.DIMS.svgW,
			height : this.DIMS.svgH
		});
		
		//<nn>
		//+-------------------------------------------------------------------+
		//|\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\|
		//|            ***********   DEFS SVG ELEMEK    ***********           |
		//|\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\|
		//+-------------------------------------------------------------------+
		//</nn>
		var defs = $(document.createElementNS(PSTCG_CNSTS.SVGNS, 'defs'));
		defs.attr({
			id : this.SVGDEFS.id
		});
		
		//<nn>
		// Egy FOR ciklussal bejárjuk az alapobjektum GRADS tömbét, és az ottan JSON objektumokat SVG elemekké alakítjuk.
		//</nn>
		for(var ix1 = 0; ix1<this.SVGDEFS.grads.length; ix1++){
			//<nn>
			// Az aktuális linearGradient feltöltse.
			//</nn>
			var grdFill = $(document.createElementNS(PSTCG_CNSTS.SVGNS, 'linearGradient'));
			grdFill.attr({
				"id" : this.SVGDEFS.grads[ix1].id,
				"x1" : this.SVGDEFS.grads[ix1].x1,
				"x2" : this.SVGDEFS.grads[ix1].x2,
				"y1" : this.SVGDEFS.grads[ix1].y1,
				"y2" : this.SVGDEFS.grads[ix1].y2
			});
			//<nn>
			// Az aktuális linGrad STOP-jainak feltöltése...
			//</nn>
			var stp1 = $(document.createElementNS(PSTCG_CNSTS.SVGNS, 'stop'));
			stp1.attr({
				"offset" : this.SVGDEFS.grads[ix1].stop1.offset,
				"stop-color" : this.SVGDEFS.grads[ix1].stop1["stop-color"]
			});
			var stp2 = $(document.createElementNS(PSTCG_CNSTS.SVGNS, 'stop'));
			stp2.attr({
				"offset" : this.SVGDEFS.grads[ix1].stop2.offset,
				"stop-color" : this.SVGDEFS.grads[ix1].stop2["stop-color"]
			});
			
			//<nn>
			// A stop-okat a linGradhoz adjuk
			//</nn>
			grdFill.append(stp1);
			grdFill.append(stp2);
			
			//<nn>
			// A linGrad-ot a DEFS-hez adjuk
			//</nn>
			defs.append(grdFill);			
		}
		

		//<nn>
		// Egy FOR ciklussal bejárjuk az alapobjektum FILTERS tömbét, és az ottani JSON objektumokat SVG elemekké alakítjuk.
		//</nn>
		for(var ix1 = 0; ix1<this.SVGDEFS.filters.length; ix1++){
			//<nn>
			// A filter objektumok SVG-vé alakítása.
			//</nn>
			var blrs = $(document.createElementNS(PSTCG_CNSTS.SVGNS, 'filter'));
			blrs.attr({
				"id" : this.SVGDEFS.filters[ix1].id,
			});
			
			//<nn>
			// A filterbe pakoljuk az első alapértelmezett BLUR-t.
			//</nn>
			var fltrTag = $(document.createElementNS(PSTCG_CNSTS.SVGNS, this.SVGDEFS.filters[ix1].type));
			fltrTag.attr({
				"in" : this.SVGDEFS.filters[ix1].inElm,
				"stdDeviation" : this.SVGDEFS.filters[ix1].stdDeviation
			});
			
			//<nn>
			// A blur-t a FILTER-be tesszük.
			//</nn>
			blrs.append(fltrTag);
			
			//<nn>
			// A Filter-t a DEFS-be tesszük
			//</nn>
			defs.append(blrs);
		}

		//<nn>
		// Hozzáadjuk a DEFS tag-et.
		//</nn>
		svg.append(defs);
		
		
		
		//<nn>
		//+-------------------------------------------------------------------+
		//|\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\|
		//|            ***********   HÁTTÉR TÉGLALAP    ***********           |
		//|\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\|
		//+-------------------------------------------------------------------+
		//</nn>
		
		//<nn>
		// A hattér négyzet létrehozása egy layer group-pal, és egy rect-el.
		//</nn>
		var bgRctGrp = $(document.createElementNS(PSTCG_CNSTS.SVGNS, 'g'));
		var bgRect = $(document.createElementNS(PSTCG_CNSTS.SVGNS, 'rect'));
		
		bgRctGrp.attr({id:"bckkgrnd-layer"});
		bgRect.attr({
			id : this.BGRECT.id,
			x : this.BGRECT.x,
			y : this.BGRECT.y,
			height : this.BGRECT.height,
			width : this.BGRECT.width,
			//fill : this.BGRECT.fill
			fill : "url(#" + this.SVGDEFS.grads[0].id + ")"
		});
		
		bgRctGrp.append(bgRect);
		svg.append(bgRctGrp);
		
		
		
		//<nn>
		//+-------------------------------------------------------------------+
		//|\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\|
		//|            ***********    HÁTTÉR RÁCS       ***********           |
		//|\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\|
		//+-------------------------------------------------------------------+
		//</nn>
		
		//<nn>
		// Ellenőrizzük, hogy be vannak-e állítva az alapértelmezett értékek
		//</nn>
		if(this.BGGRID['x-lines'].length == 0){
			this.BGGRID.baseSetup();
		}
		
		var bgGrdGrp = $(document.createElementNS(PSTCG_CNSTS.SVGNS, 'g'));
		bgGrdGrp.attr({
			"id":this.BGGRID.grpId
			}
		);
		var xGrdGrp = $(document.createElementNS(PSTCG_CNSTS.SVGNS, 'g'));
		for(var ix1 = 0; ix1 < this.BGGRID["x-lines"].length; ix1++){
			xGrdGrp.append(this.BGGRID["x-lines"][ix1]);
		}
		var yGrdGrp = $(document.createElementNS(PSTCG_CNSTS.SVGNS, 'g'));
		for(var ix1 = 0; ix1 < this.BGGRID["y-lines"].length; ix1++){
			yGrdGrp.append(this.BGGRID["y-lines"][ix1]);
		}
		bgGrdGrp.append(xGrdGrp);
		bgGrdGrp.append(yGrdGrp);
		
		svg.append(bgGrdGrp);
		
		//<nn>
		// A TENGELYEK MEGRAJZOLÁSA
		// TICK-ek, feliratok...
		//</nn>
		
		
		//<nn>
		// Az ADATÁBRÁZOLÓ ELEMEK megrjzolása (oszlopok, vonalak, pontok ..stb)
		//</nn>
		
		
		
		
		
		//<nn>
		// Az összeállított SVG objektumot bedobjuk a konténerbe.
		//</nn>
		cntnr.append(svg);
	}

	this.getArrMAX = function($a){
	//<SF>
	// Létrehozva: 2018. jún. 30.<br>
	// Szerző:  Balise Pascal
	// Egy paraméterben kapott tömb maximumát adja vissza<br>
	// PARAMÉTEREK:
	//×-
	// @-- @param $a = a tömb -@
	//-×
	//MÓDOSÍTÁSOK:
	//×-
	// @-- ... -@
	//-×
	//</SF>
		var mx = -9999;
		mx = Math.max(...$a);
		return mx;
	}
	
	this.getArrMIN = function($a){
	//<SF>
	// Létrehozva: 2018. jún. 30.<br>
	// Szerző:  Balise Pascal
	// Egy paraméterben kapott tömb maximumát adja vissza<br>
	// PARAMÉTEREK:
	//×-
	// @-- @param $a = a tömb -@
	//-×
	//MÓDOSÍTÁSOK:
	//×-
	// @-- ... -@
	//-×
	//</SF>
		var mi = -9999;
		mi = Math.min(...$a);
		return mi;
	}
	
	this.getExtnt = function($a){
	//<SF>
	// Létrehozva: 2018. jún. 30.<br>
	// Szerző:  Balise Pascal
	// LEÍRÁS<br>
	// PARAMÉTEREK:
	//×-
	// @-- @param ... = ... -@
	//-×
	//MÓDOSÍTÁSOK:
	//×-
	// @-- ... -@
	//-×
	//</SF>
		var res = [];
		res[0] = this.getArrMIN($a);
		res[1] = this.getArrMAX($a);
		
		return res;
	}
	
	
	this.test001 = function(col0, col1){
		//<SF>
		// Létrehozva: 2018. jún. 27.<br>
		// Szerző:  Balise Pascal
		// Mindig az aktuális tesztfüggvény...<br>
		// PARAMÉTEREK:
		//×-
		// @-- @param ... = ... -@
		//-×
		//MÓDOSÍTÁSOK:
		//×-
		// @-- ... -@
		//-×
		//</SF>
			
			if(col0 === undefined){
				
			}
			
			var bgGrdId = this.SVGDEFS.grads[0].id;
			var stp1 = $("#"+bgGrdId+">stop").eq(0);
			stp1.attr({"stop-color":col0});
			
			var stp2 = $("#"+bgGrdId+">stop").eq(1);
			stp2.attr({"stop-color":col1});
		}
};














