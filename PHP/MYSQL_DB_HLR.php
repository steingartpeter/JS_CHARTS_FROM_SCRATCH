<?php
#moddoc:
//<M>
//×-
//@-FILENÉV   : JS_CHARTS_FROM_SCRATCH - MYSQL_DB_HLR.php-@
//@-SZERZŐ    : AX07057-@
//@-LÉTREHOZVA: 2018. ápr. 28.-@
//@-FÜGGŐSÉGEK:
//×-
// @-- p_consts.php -@
//-×
//-@
//@-LEÍRÁS    :
// Ez a PHP kód azt a feladatot látja el, hogy teret ad az adatbázikezelést végző osztálynak.
//-@
//@-MÓDOSÍTÁSOK :
//×-
// @-- ... -@
//-×
//-@
//-×
//</M>
    
    
    include_once $_SERVER['DOCUMENT_ROOT'] . '/JS_CHARTS_FROM_SCRATCH/PHP/P_CONSTS.php';

class DB_HLR{

    //<nn>
    // ============================================================<br>
    // CLASS:   DB_HLR<br>
    // CREATED: 2018-04-28<br>
    // AUTHOR:  AX07057<br>
    // ============================================================<br>
    // DESCRIPTION:<br>
    // Ez az osztály tartalmazza az adatbáziskezeléshez szükséges 
    // valamennyi kódot.
    // ============================================================<br>
    //</nn>
    
    private $clsID = "";
    private $dbConn = "";
    
    
    //<nn>
    //+==================================================================+<br>
    //|XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX|<br>
    //|##########             ALAP ADATBÁZIS FUNKCIÓK            ########|<br>
    //|XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX|<br>
    //+==================================================================+<br>
    //</nn>
    
    public function __construct(){
    //<SF>
    // LÉTREHOZVE:  2018. ápr. 28.<br>
    // SZERZŐ:      blaise
    // A konstruktor ...<br>
    // PARAMÉTEREK:
    //×-
    // @-- @param --- = nincsenek paraméterek -@
    //-×
    //MÓDOSTÁSOK:
    //×-
    // @-- ... -@
    //-×
    //</SF>
    }
    
    public function connect($host = APP_DB_HOST, $usr = APP_DB_USRNM, $pwd = APP_DB_USRPWD, $dbNm = APP_DB_DATBNAME){
    //<SF>
    // LÉTREHOZVA:  2018. ápr. 28.<br>
    // SZERZŐ:           blaise
    // A csatlakozás végrehajtása paraméterekkel.<br>
    // PARAMÉTEREK:
    //×-
    // @-- @param $host = az adatbázishost IP (alapértelmezésben localhost) -@
    // @-- @param $usr = az adatbázisfelhasználó -@
    // @-- @param $pwd = a login jelszó -@
    // @-- @param $dbNm = az adatabázis neve -@
    //-×
    //MÓDOSTÁSOK:
    //×-
    // @-- ... -@
    //-×
    //</SF>
    
        $c = mysqli_connect($host,$usr,$pwd,$dbNm);
        if($c != false){
            $this->dbConn = $c;
        }else{
            die("<p class=\"ERRMsg\">
                Az adatbázis csatlakozás sikertelen!<br>
                HOST:" . $host . "<br>" .
                "USER:" . $usr . "<br>" .
                "PASSW:" . $pwd . "<br>" .
                "DATABASE:" . $dbNm . "<br>" .
            "</p>");
        }
    }

    public function getCon(){
    //<SF>
    // LÉTREHOZVA:  2018. ápr. 28.<br>
    // SZERZŐ:           blaise
    // A connection objektum kiadása a hívónak.<br>
    // PARAMÉTEREK:
    //×-
    // @-- @param ... = ... -@
    //-×
    //MÓDOSTÁSOK:
    //×-
    // @-- ... -@
    //-×
    //</SF>
        return $this->dbConn;
    }
        
    public function chngDB($dbNm){
    //<SF>
    // LÉTREHOZVA:  2018. ápr. 28.<br>
    // SZERZŐ:           blaise
    // A csatlakozás adatbázisának megváltoztatása.<br>
    // PARAMÉTEREK:
    //×-
    // @-- @param $dbNm = az új adatbázis neve -@
    //-×
    //MÓDOSTÁSOK:
    //×-
    // @-- ... -@
    //-×
    //</SF>
        mysqli_select_db($this->dbConn, $dbNm);
    }

    
    
    //<nn>
    //+==================================================================+<br>
    //|XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX|<br>
    //|##########                   LEKÉRDEÉSEK                  ########|<br>
    //|XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX|<br>
    //+==================================================================+<br>
    //</nn>
    
    public function getTestData001(){
    //<SF>
    // LÉTREHOZVA:  2018. ápr. 28.<br>
    // SZERZŐ:           blaise
    // LEÍRÁS<br>
    // PARAMÉTEREK:
    //×-
    // @-- @param ... = nincsenek paraméterek -@
    //-×
    //MÓDOSTÁSOK:
    //×-
    // @-- ... -@
    //-×
    //</SF>
    
        //<nn>
        // Ellenőrizzük a csatlakozást, ha nincs létrehozzuk.
        //</nn>
        if(!$this->dbConn){
            $this->connect();
        }
        
        //<nn>
        // Létrehozzuk a visszaadandó eredménytömböt, ami két részből áll:<br>
        // - FLAG = [OK/NOK]
        // - DATA/MSG = [ADATOK/HIBAÜZENET]
        //</nn>
        $resArr = array();
        
        //<nn>
        // Egy lokális csatlakozási objektum.
        //</nn>
        $c = $this->dbConn;
        
        
        $q = "SELECT * FROM " . APP_DB_DFLT_TBLNM . ";";
        $res = mysqli_query($c, $q);
        
        if($res){
            $resArr['FLAG'] = "OK";
            $resArr['DATA'] = array();
            while($rec = mysqli_fetch_assoc($res)){
                array_push($resArr['DATA'],$rec);
            }
        }else{
            $resArr['FLAG'] = "NOK";
            $resArr['MSG'] = "PHP-MYSQL HIBA!<br>";
            $resArr['MSG'] .= "A hiba leírása =>> <br><p class=\"code\">" . mysqli_error($c) . "</p>";
        }
        
        return $resArr;
    }
    
}




















?>