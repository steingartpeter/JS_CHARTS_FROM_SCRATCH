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
	// Az adatok, enélkül semi értelme az egésznek.
	//</nn>
	this.DATA = {
		xScrptn:["1",'2','3','4','5','6','7','8'],
		yScrptn:["200","400","600","800","1000"],
		vals01:[180,450,610,500,750,422,880,950]
	};
	
	
	
	
	//<nn>
	// Az alapértelmezett = DEFAULT értékeket tartalmazó objektum.
	//</nn>
	this.META = {
		cntnrId:"chrt001",
		chartId:id,
		fill:"#A5A5A5",
		size:"S",
		title:"Teszt chart 001",
		ttlProps:{
			fontFamily:"Consolas",
			fontSize:"16",
			fontColor:"#050505",
			fontDecor:"none"
		}
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
	// Vagy amik esetleg bejöttek :).
	//</nn>
	if(this.META.size == undefined || this.META.size == 0 || this.META.size == "S"){
		this.DIMS = {
			svgW:200,
			svgH:200,
			chrtMrgT:28,
			chrtMrgB:20,
			chrtMrgL:20,
			chrtMrgR:20,
			chrtBGRectDims: [160,152],	
		};
	}else if(this.META.size == "M"){
		this.DIMS = {
			svgW:400,
			svgH:400,
			chrtMrgT:56,
			chrtMrgB:40,
			chrtMrgL:40,
			chrtMrgR:40,
			chrtBGRectDims: [320,304],	
		};
	}else if(this.META.size == "L"){
		this.DIMS = {
			svgW:600,
			svgH:600,
			chrtMrgT:84,
			chrtMrgB:60,
			chrtMrgL:60,
			chrtMrgR:60,
			chrtBGRectDims: [480,456],	
		};
	}else if(this.META.size == "XL"){
		this.DIMS = {
				svgW:800,
				svgH:800,
				chrtMrgT:112,
				chrtMrgB:80,
				chrtMrgL:80,
				chrtMrgR:80,
				chrtBGRectDims: [640,608],	
			};
		}
	
	
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
	};
	
	
	
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
			var yStep = height / (yLnNr);

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
	};
	
	this.AXESS = {
		axs:[
				{
					grpId:"x-btm-axis01",
					line:{
						id:"",
						x1:this.DIMS.chrtMrgL,
						y1:this.DIMS.svgH - this.DIMS.chrtMrgB,
						x2:this.DIMS.svgW - this.DIMS.chrtMrgL,
						y2:this.DIMS.svgH - this.DIMS.chrtMrgB,
						stroke:'#050505',
						"stroke-width":1,
						opacity:.99
					},
					tickMeta:{
						"nrOfTicks":self.DATA.vals01.length,
						"tick-length":5,
						"tick-color":'#FF0505',
						"tick-stroke":'#FF0505',
						"tick-stroke-width":1,
						"tick-opacity":.99
					},
					gTicks:[],
					axisTxtMeta:{
						txtSize:5,
						txtColor:"#050505",
						txtFontName:"Arial",
						txtDgre:0
					},
					gTexts:[]
				},
				{
					grpId:"y-lft-axis01",
					line:{
						id:"",
						x1:this.DIMS.chrtMrgL,
						y1:this.DIMS.chrtMrgT,
						x2:this.DIMS.chrtMrgL,
						y2:this.DIMS.svgW - this.DIMS.chrtMrgL,
						stroke:'#050505',
						"stroke-width":1,
						opacity:.99
					},
					tickMeta:{
						"nrOfTicks":self.DATA.yScrptn.length,
						"tick-length":5,
						"tick-color":'#FF0505',
						"tick-stroke":'#FF0505',
						"tick-stroke-width":1,
						"tick-opacity":.99
					},
					gTicks:[],
					axisTxtMeta:{
						txtSize:5,
						txtColor:"#050505",
						txtFontName:"Arial",
						txtDgre:0
					},
					gTexts:[]
				}
			],
			baseSetup:function(){
				this.axs[0].line.id = "x-axis-01";
				this.axs[1].line.id = "y-axis-01";
			}
	};
	
	this.DATA_META = {
		typ:"BAR",
		fill:"#FFCC11",
		stroke:"none",
		"stroke-width":"0px",
		opacity:1,
		drwPoints:false,
		dataPoint:{
			shape:"dot",
			size:"3px",
			fill:"#FFAA22",
			"stroke-width":"1px",
			stroke:"#050505",
			position:"above"
		}
	};
	
	this.FUNCS = {
		xScl01:{
			name:"bscX",
			minVal:0,
			maxVal:this.DIMS.svgW-this.DIMS.chrtMrgL-this.DIMS.chrtMrgR,
			minDom:0,
			maxDom:this.DATA.vals01.length+1,
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
	};
	
	//<nn>
	//+-----------------------------------------------------+
	//|/////////////////////////////////////////////////////|
	//| # # #          FUNCTION DECLARATIONS          # # # |
	//|/////////////////////////////////////////////////////|
	//+-----------------------------------------------------+
	//</nn>
	
	//<nn>
	// A META elem beállításának függvénye.
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
		
	};
	
	
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
		
	};
	
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
	};
	
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
		
		
	};

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
			//console.log("prmObj.xLnNr: " + prmObj.xLnNr);
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
				var yStep = height / (prmObj.yLnNr+1);
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
	};


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
		// Ha el akarjuk távolítani az előző chartot, akkor ez kell:
		//</nn>
		cntnr.find("svg").remove();
		
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
		
		//<nn>
		// Már a bgretct-re rátehetjük a feliratot, a chart title-t.
		//</nn>
		var ttl = $(document.createElementNS(PSTCG_CNSTS.SVGNS, 'text'));
		ttl.attr({
			id:"chrtTtl01",
			x:25,
			y:Number(this.META.ttlProps.fontSize)*1.5,
			fill:this.META.ttlProps.fontColor,
			stroke:"none",
			"font-size":this.META.ttlProps.fontColor
		});
		ttl.css("font-family", this.META.fontFamily);
		ttl.text(this.META.title);
		bgRctGrp.append(ttl);
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
		//+-------------------------------------------------------------------+
		//|\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\|
		//|            ***********      TENGELYEK       ***********           |
		//|\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\|
		//+-------------------------------------------------------------------+
		//</nn>
		
		//<nn>
		// Az X TENGELY TENGELY-EGYNESÉNEK GENERÁLÁSA
		// Tanulságos, hogy az x tengelyen az adatoknál szünettel kezdünk, és szünettel fejezzük be a sort...
		// az Y tengelynél ez t em lehet megtenni, mert az adatméretet jelző objektumok a chart teljes
		// magasségéra vannak generálva.
		//</nn>
		var axsGrpX01 = $(document.createElementNS(PSTCG_CNSTS.SVGNS, 'g'));
		axsGrpX01.attr({"id":this.AXESS.axs[0].grpId});
		var xAxLine = $(document.createElementNS(PSTCG_CNSTS.SVGNS, 'line'));
		xAxLine.attr({
			id:this.AXESS.axs[0].line.id,
			x1:this.AXESS.axs[0].line.x1,
			x2:this.AXESS.axs[0].line.x2,
			y1:this.AXESS.axs[0].line.y1,
			y2:this.AXESS.axs[0].line.y2,
			stroke:this.AXESS.axs[0].line.stroke,
			"stroke-width":this.AXESS.axs[0]["stroke-width"],
			opacity:this.AXESS.axs[0].line.opacity
		});
		
		//<nn>
		// Az X TENGELY TICKjei
		//</nn>
		var tckStep = (this.DIMS.svgW - this.DIMS.chrtMrgL-this.DIMS.chrtMrgR)/(this.AXESS.axs[0].tickMeta.nrOfTicks+1)
		var xTcks = $(document.createElementNS(PSTCG_CNSTS.SVGNS, 'g'));
		xTcks.attr({
			id:"xTcks01"
		});
		for(var ix1 =0; ix1<this.AXESS.axs[0].tickMeta.nrOfTicks; ix1++){
			var tck = $(document.createElementNS(PSTCG_CNSTS.SVGNS, 'line'));
			tck.attr({
				id:"x-tck"+ix1,
				x1:this.DIMS.chrtMrgL + ((ix1+1)*tckStep),
				x2:this.DIMS.chrtMrgL + ((ix1+1)*tckStep),
				y1:this.DIMS.svgH-this.DIMS.chrtMrgB,
				y2:this.DIMS.svgH-this.DIMS.chrtMrgB+this.AXESS.axs[0].tickMeta["tick-length"],
				stroke:this.AXESS.axs[0].tickMeta["tick-color"],
				'stroke-width':1,
				opacity:.99
			});
			this.AXESS.axs[0].gTicks.push(tck);
			xTcks.append(this.AXESS.axs[0].gTicks[ix1]);
		}
		axsGrpX01.append(xTcks);
		
		//<nn>
		// Az X TENGELY FELIRATAI
		//</nn>
		var xAxsTxt = $(document.createElementNS(PSTCG_CNSTS.SVGNS, 'g'));
		for(var ix1 =0; ix1<this.AXESS.axs[0].tickMeta.nrOfTicks; ix1++){
			var txt = $(document.createElementNS(PSTCG_CNSTS.SVGNS, 'text'));
			txt.attr({
				id:"xAxsTxt-"+(ix1+1),
				x:this.DIMS.chrtMrgL + ((ix1+1)*tckStep)-(this.AXESS.axs[0].axisTxtMeta.txtSize/2),
				y:this.DIMS.svgH-this.DIMS.chrtMrgB+(this.AXESS.axs[0].axisTxtMeta.txtSize)+this.AXESS.axs[1].tickMeta["tick-length"],
				fill:this.AXESS.axs[0].axisTxtMeta.txtColor,
				"font-size":this.AXESS.axs[0].axisTxtMeta.txtSize
			});
			txt.text(this.DATA.xScrptn[ix1]);
			
			this.AXESS.axs[0].gTexts.push(txt);
			xAxsTxt.append(this.AXESS.axs[0].gTexts[ix1]);
		}
		axsGrpX01.append(xAxsTxt);
		
		
		
		//<nn>
		// Az Y TENGELY TENGELY-EGYENESÉNEK GENERÁLÁSA
		//</nn>
		var axsGrpY01 = $(document.createElementNS(PSTCG_CNSTS.SVGNS, 'g'));
		axsGrpY01.attr({"id":this.AXESS.axs[1].grpId});
		var yAxLine = $(document.createElementNS(PSTCG_CNSTS.SVGNS, 'line'));
		yAxLine.attr({
			id:this.AXESS.axs[1].line.id,
			x1:this.AXESS.axs[1].line.x1,
			x2:this.AXESS.axs[1].line.x2,
			y1:this.AXESS.axs[1].line.y1,
			y2:this.AXESS.axs[1].line.y2,
			stroke:this.AXESS.axs[1].line.stroke,
			"stroke-width":this.AXESS.axs[1]["stroke-width"],
			opacity:this.AXESS.axs[1].line.opacity
		});
		
		//<nn>
		// Az Y TENGELY TICKjei
		//</nn>
		var tckStep = (this.DIMS.svgH - this.DIMS.chrtMrgT-this.DIMS.chrtMrgB)/(this.AXESS.axs[1].tickMeta.nrOfTicks)
		var yTcks = $(document.createElementNS(PSTCG_CNSTS.SVGNS, 'g'));
		yTcks.attr({
			id:"yTcks01"
		});
		for(var ix1 =0; ix1<=this.AXESS.axs[0].tickMeta.nrOfTicks; ix1++){
			var tck = $(document.createElementNS(PSTCG_CNSTS.SVGNS, 'line'));
			tck.attr({
				id:"y-tck"+ix1,
				x1:this.DIMS.chrtMrgL,
				x2:this.DIMS.chrtMrgL - this.AXESS.axs[1].tickMeta["tick-length"],
				y1:this.DIMS.chrtMrgT + ((ix1)*tckStep),
				y2:this.DIMS.chrtMrgT + ((ix1)*tckStep),
				stroke:this.AXESS.axs[1].tickMeta["tick-color"],
				'stroke-width':1,
				opacity:.99
			});
			this.AXESS.axs[1].gTicks.push(tck);
			yTcks.append(this.AXESS.axs[1].gTicks[ix1]);
		}
		axsGrpY01.append(yTcks);
		
		//<nn>
		// Az X TENGELY FELIRATAI
		//</nn>
		var yAxsTxt = $(document.createElementNS(PSTCG_CNSTS.SVGNS, 'g'));
		var maxTxtLen = this.getArrMAX(this.DATA.yScrptn).toString().length;
		
		//console.log("maxTxtLen: " + maxTxtLen);
		for(var ix1 =0; ix1<this.AXESS.axs[1].tickMeta.nrOfTicks; ix1++){
			var txt = $(document.createElementNS(PSTCG_CNSTS.SVGNS, 'text'));
			txt.attr({
				id:"yAxsTxt-"+(ix1+1),
				x:this.DIMS.chrtMrgL - this.AXESS.axs[1].tickMeta["tick-length"] - (3*this.AXESS.axs[1].axisTxtMeta.txtSize),
				y:this.DIMS.svgH - this.DIMS.chrtMrgB - ((ix1+1)*tckStep),
				fill:this.AXESS.axs[1].axisTxtMeta.txtColor,
				"font-size":this.AXESS.axs[1].axisTxtMeta.txtSize
			});
			txt.text(this.DATA.yScrptn[ix1]);
			
			this.AXESS.axs[1].gTexts.push(txt);
			yAxsTxt.append(this.AXESS.axs[1].gTexts[ix1]);
		}
		axsGrpX01.append(yAxsTxt);
		
		
		//<nn>
		// Hozzáadjuk a grfikonhoz
		//</nn>
		axsGrpX01.append(xAxLine);
		axsGrpY01.append(yAxLine);
		svg.append(axsGrpX01);
		svg.append(axsGrpY01);
		
		//<nn>
		//+-------------------------------------------------------------------+
		//|\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\|
		//|            ***********       ADATELEMEK     ***********           |
		//|\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\|
		//+-------------------------------------------------------------------+
		//</nn>
		

		//<nn>
		// Ide az aadatábrázolás elé beteszünk egy tandom data generálót :)
		// Ez később nem kell, csak most a teszteléshez...
		//</nn>
		for(var ix1=0; ix1 < this.DATA.vals01.length; ix1++){
			this.DATA.vals01[ix1] = this.getRndINT(100, 900);
		}
		
		//<nn>
		// Az ADATÁBRÁZOLÓ ELEMEK megrajzolása (oszlopok, vonalak, pontok ..stb)
		//</nn>
		var dataGrp = $(document.createElementNS(PSTCG_CNSTS.SVGNS, 'g'));
		dataGrp.attr({id:"chart-data"});
		var svgDrw = this.genDataSvg(this.DATA_META.typ);
		console.log("svgDrw:");
		console.log(svgDrw);
		dataGrp.append(svgDrw);
		svg.append(dataGrp);
		
		
		//<nn>
		// Az összeállított SVG objektumot bedobjuk a konténerbe.
		//</nn>
		cntnr.append(svg);
	};

	//+--------------------------------------------------+
	//|##################################################|
	//|///////      HELPER/UTILITY FUNCTIONS     \\\\\\\\|
	//|##################################################|
	//+--------------------------------------------------+
		

	this.genDataSvg= function(t){
	//<SF>
	// 2018. júl. 12.<br>
	// Az adatokhoz tartozó grafikus elemek legenerálása<br>
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
		// Ha nem jött tipusmeghatározás -> BAR lesz.
		//</nn>
		if(t === undefined){
			t = "BAR";
		}
		
		
		if(t == "BAR"){
			var svg = [];
			var barWidth = 0.75*(this.DIMS.svgW - this.DIMS.chrtMrgR-this.DIMS.chrtMrgR) / (this.DATA.vals01.length+1);
			
			for(var ix1=0; ix1 < this.DATA.vals01.length; ix1++){
				var r = $(document.createElementNS(PSTCG_CNSTS.SVGNS, 'rect'));
				r.attr({
					id:"bar-" + ("0"+ix1).substring(-2),
					fill:this.DATA_META.fill,
					x:this.FUNCS.xScl01.getVal(ix1+1)+this.DIMS.chrtMrgL-(barWidth/2),
					y:this.DIMS.svgH - this.FUNCS.yScl01.getVal(this.DATA.vals01[ix1])-this.DIMS.chrtMrgB,
					width:barWidth+"px",
					height:this.FUNCS.yScl01.getVal(this.DATA.vals01[ix1]),
					data:this.DATA.vals01[ix1]
				});
				r.mouseenter(function(event){
					var hvDiv = $(document.createElement('div'));
					var d = $(this);
					hvDiv.html("<p>"+d.attr("data")+"</p>");
					hvDiv.addClass("floatDataDiv");
					hvDiv.css({'top':event.pageY-50,'left':event.pageX});
					$("body").append(hvDiv);
				});
				r.mouseout(function(){
					$(".floatDataDiv").remove();
				});
				svg.push(r);
			}
		}
		
		return svg;
	}
	
	this.getOneShadeLighter=function(shdToLighten){
	//<SF>
	// Létrehozva: 2018. dec. 23.<br>
	// Szerző:  Balise Pascal
	// A bemenő hex stringben definiált szín helyette egy árnyalattal világosabbat adunk vissza.<br>
	// PARAMÉTEREK:
	//×-
	// @-- @param shdToLighten = az árnyalat amit világosítani akarunk. -@
	//-×
	//MÓDOSÍTÁSOK:
	//×-
	// @-- ... -@
	//-×
	//</SF>
		
		//<nn>
		// Elkezdjük a visszaadott sztringet épteni, most csak a hex jelölő hashmark-ot
		// tesszük bele.
		//</nn>
		var res = "#";

		//<nn>
		// A három (red/green/blue) színnek adunk három változót, amikbe be is tesszük
		// a beérkező paraméter három értékét INT-é alakítva.
		//</nn>
		var r = parseInt(shdToLighten.substr(1,2),16);
		var g = parseInt(shdToLighten.substr(3,2),16);
		var b = parseInt(shdToLighten.substr(5,2),16);

		//<nn>
		// A színek értékeit a vikégosítás miatt megnöveljük 20-al.
		// Hogy ne csússzunk ki a 0-255 intervallumból, Math.min()-el dolgozunk.
		//</nn>
		r = Math.min(255,r+20);
		g = Math.min(255,g+20);
		b = Math.min(255,b+20);

		//<DEBUG>
		// Megnézhetjük mik az RGB intek a bejövőben:<br>
		// <code>
		// console.log("r: ",r,", g:", g,", b:",b);<br/>>
		// </code>
		//</DEBUG>

		//<nn>
		// A megváltoztatott int értékeket visszaalakítjuk hex sztringgé.
		//</nn>
		res += ("0"+r.toString(16)).substr(-2);
		res += ("0"+g.toString(16)).substr(-2);
		res += ("0"+b.toString(16)).substr(-2);

		//<nn>
		// A kész hexa sztringet visszaadjuk, és kész.
		//</nn>
		return res;
	}

	this.getOneShadeDarker=function(shdToDarken){
	//<SF>
	// Létrehozva: 2018. dec. 23.<br>
	// Szerző:  Balise Pascal
	// A bemenő hex stringben definiált szín helyette egy árnyalattal világosabbat adunk vissza.<br>
	// PARAMÉTEREK:
	//×-
	// @-- @param shdToDarken = az árnyalat amit sötétíteni akarunk. -@
	//-×
	//MÓDOSÍTÁSOK:
	//×-
	// @-- ... -@
	//-×
	//</SF>
		
		//<nn>
		// Elkezdjük a visszaadott sztringet épteni, most csak a hex jelölő hashmark-ot
		// tesszük bele.
		//</nn>
		var res = "#";

		//<nn>
		// A három (red/green/blue) színnek adunk három változót, amikbe be is tesszük
		// a beérkező paraméter három értékét INT-é alakítva.
		//</nn>
		var r = parseInt(shdToDarken.substr(1,2),16);
		var g = parseInt(shdToDarken.substr(3,2),16);
		var b = parseInt(shdToDarken.substr(5,2),16);

		//<nn>
		// A színek értékeit a vikégosítás miatt megnöveljük 20-al.
		// Hogy ne csússzunk ki a 0-255 intervallumból, Math.min()-el dolgozunk.
		//</nn>
		r = Math.min(255,r+20);
		g = Math.min(255,g+20);
		b = Math.min(255,b+20);

		//<DEBUG>
		// Megnézhetjük mik az RGB intek a bejövőben:<br>
		// <code>
		// console.log("r: ",r,", g:", g,", b:",b);<br/>>
		// </code>
		//</DEBUG>

		//<nn>
		// A megváltoztatott int értékeket visszaalakítjuk hex sztringgé.
		//</nn>
		res += ("0"+r.toString(16))-substr(-2);
		res += ("0"+g.toString(16))-substr(-2);
		res += ("0"+b.toString(16))-substr(-2);

		//<nn>
		// A kész hexa sztringet visszaadjuk, és kész.
		//</nn>
		return res;
	}

	this.getRndINT=function(min, max){
	//<SF>
	// 2018. júl. 12.<br>
	// Egy random INT generátor<br>
	// PARAMÉTEREK:
	//×-
	// @-- @param ... = ... -@
	//-×
	//MÓDOSÍTÁSOK:
	//×-
	// @-- ... -@
	//-×
	//</SF>
		
		if(min === undefined){
			min = 1;
		}
		if(max === undefined){
			max = 6;
		}
		return Math.floor(min+(Math.random()*(max-min)));
		
	}
	
	this.getArrMAX = function(a){
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
			var mx = -Infinity, x = a.length;
			while(x--){
				if(a[x] > mx){
					mx = a[x];
				}
			}
			return mx;
		};
		
	this.getArrMIN = function(a){
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
		var mi = Infinity, x = a.length;
		//mi = Math.min(...$a);*/
		while(x--){
			if(arr[x] < mi){
				mi = arr[x];
			}
		}
		return mi;
	};
	
	this.getExtnt = function(a){
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
		res[0] = this.getArrMIN(a);
		res[1] = this.getArrMAX(a);
		
		return res;
	};
	

	
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
	};
};














;