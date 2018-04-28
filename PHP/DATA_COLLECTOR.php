<?php
#moddoc:
//<M>
//×-
//@-FILENÉV   : JS_CHARTS_FROM_SCRATCH - DATA_COLLECTOR.php-@
//@-SZERZŐ    : AX07057-@
//@-LÉTREHOZVA:  2018. ápr. 23.-@
//@-FÜGGŐSÉGEK:
//×-
// @-- MYSQL_DB_HLR.php-@
// @-- P_CONSTS.php-@
//-×
//-@
//@-LEÍRÁS    :
//Ez a PHP kód azt a feladatot látja el ...
//-@
//@-MÓDOSÍTÁSOK :
//×-
// @-- ... -@
//-×
//-@
//-×
//</M>
    

    include_once $_SERVER['DOCUMENT_ROOT'] . '/JS_CHARTS_FROM_SCRATCH/PHP/MYSQL_DB_HLR.php';

    if(strpos(array_keys($_REQUEST)[0],'":"') > 0){
        
        //<nn>
		//No az ANGULAR a data objektumot JSON formátumban küldi, így sajnos
		//azt dekódolni kell...
		//</nn>
		$var = json_decode(array_keys($_REQUEST)[0], true);
		//<DEBUG>
		// A JSON dekódolt REQUEST tömb megnézésée:<br>
		//print_r($var);
		//echo "************************";
		//echo "\$var.procId:" . $var['procId'] . "\n";
		//</DEBUG>
		
		//<nn>
		// A$_REQUETS ajaxDir-jébe betesszük a $var DEJSONIFIED ajaxDir-jét, így az angular-os, és @author ax07057
		// nem angularos hívások is működnek.
		//</nn>
		$_REQUEST["ajaxDir"] = $var['ajaxDir'];
		//<DEBUG>
		//...
		//$_REQUEST["ajaxDir"] = $var["ajaxDir"];
		//echo "String ellenőrzés -> OK(pos:) ->Keys: <br>Print_r \$_REQUEST-re:<br>";
		//print_r($_REQUEST);
		//</DEBUG>
    }
    
    //<nn>
    // Egy switch szerkezetbe ágyazzuk a hívások kezelését.
    //</nn>
    switch ($_REQUEST["ajaxDir"]) {
        case "test001":
            testFunc001();
        break;
        case "phpTest01":
            getTstData001();
        break;
        default:
            defFunc();
        break;
    }
	
    //<nn>
    // A függvények definiálása:
    //</nn>
    
    function testFunc001() {
    //<SF>
    // 2018. ápr. 24.<br>
    // Az első adatszolgáltató tesztfüggvény.<br>
    // PARAMÉTEREK:
    //×-
    // @-- @param ... = ... -@
    //-×
    //MÓDOSTÁSOK:
    //×-
    // @-- ... -@
    //-×
    //</SF>
        $fNv = $_SERVER['DOCUMENT_ROOT'] . "/JS_CHARTS_FROM_SCRATCH/DATA/data_001.TXT";
        $fHlr = fopen($fNv,"r");
        
        $dataArr = array();
        while($ln = fgets($fHlr,4096)){
            $aktRec = explode("|",$ln);
            array_push($dataArr, $aktRec);
        }
        
        fclose($fHlr);   
        echo json_encode($dataArr,JSON_UNESCAPED_UNICODE);
    }

    function defFunc(){
    //<SF>
    // LÉTREHOZÁS:2018. ápr. 24.<br>
    // SZERZŐ: Balise Pascal<br>
    // Ismét egy alapértelmezett adatvisszaadó függvény.<br>
    // PARAMÉTEREK:
    //×-
    // @-- @param ... = ... -@
    //-×
    //MÓDOSTÁSOK:
    //×-
    // @-- ... -@
    //-×
    //</SF>
        
        $dataArr = array();
        $dys = rand(10,100);
        for($ix1 = 0;$ix1<5;$ix1++){
            $aktRec['dat'] = date("Y-m-d", strtotime(("-". ($dys-$ix1) . " days"), now()));
            $aktRec['val'] = rand(10, 150)*100;
            array_push($dataArr, $aktRec);
        }
        
        echo json_encode($dataArr,JSON_UNESCAPED_UNICODE);
    }
    
    function getTstData001(){
    //<SF>
    // LÉTREHOZVA:  2018. ápr. 28.<br>
    // SZERZŐ:           blaise
    // LEÍRÁS<br>
    // PARAMÉTEREK:
    //×-
    // @-- @param ... = ... -@
    //-×
    //MÓDOSTÁSOK:
    //×-
    // @-- ... -@
    //-×
    //</SF>
        $dbHlr = new DB_HLR();
        
        $c = $dbHlr->getCon();
        
        $d = $dbHlr->getTestData001();
        
        echo json_encode($d,JSON_UNESCAPED_UNICODE);
        
    }
    

?>










