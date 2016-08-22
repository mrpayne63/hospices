
var mysql = require('mysql');
var db = 'localhost';
var schema = 'HOSPC';
var table = 'hospc_2013_DATA';
var prod = false;
function createArray(length) {
	  var arr = new Array(length || 0),
	      i = length;

	  if (arguments.length > 1) {
	      var args = Array.prototype.slice.call(arguments, 1);
	      while(i--) arr[length-1 - i] = createArray.apply(this, args);
	  }

	  return arr;
	}

var sql3 = "SELECT distinct(RPT_REC_NUM) entity, ITEM from "+schema+"."+table + " where " +
		" RPT_REC_NUM in (31394,32352,32494,32589,32672,32675,33085,33229,33312,33471) and " +
		" WKSHT_CD = 'S100000' and LINE_NUM = '00100' and CLMN_NUM in('0100')";

if(prod) {	
	
	db = '10.10.10.11';
	//entity = 101508;
	sql3 = "SELECT distinct(cmsid) entity , ITEM FROM HOSPC.HOSPC_2009_CLXN where cmsid in ('101537','101529','101500','101508','421555','101515','451520','101518','051511') and  WKSHT_CD = 'S100000' and LINE_NUM = '00100'  and CLMN_NUM in('0100');"

}

//console.log(sql3);
var myRows;// = new Array();
var dataArray = new Array();
//app.locals.dataArray = dataArray;


var connection3 = mysql.createConnection({
    host : db,
    user : 'nodeuser',
    password : 'Cheese2000',
    database : schema
});

connection3.connect(function(err) {
    if (!err) {
        //console.log("Database3 is connected ... nn");
    } else {
        console.log("Error3 connecting database ... nn");
    }
});

connection3.query(sql3,function(err, rows) {

	myRows = createArray(rows.length,2);
	for (var i = 0; i < rows.length; i++) {
		//console.log(rows[i].entity);
		myRows[i][0]= rows[i].entity;
		myRows[i][1]= rows[i].ITEM;
} // end top for loop
	

}); // end connection callback


/*
 * GET users listing.
 */

exports.list = function(req, res){
	
	
	res.render('hospices', { title: 'List Hospices', myRows: myRows  });
};

exports.one = function(req, res) {
	var entity = req.params.id;
	
	var sql2 = "SELECT distinct(RPT_REC_NUM) entity, ITEM from "+schema+"."+table + " where " +
	"  RPT_REC_NUM  = "+entity	+"   and " +
	" WKSHT_CD = 'S100000' and LINE_NUM = '00100'  and CLMN_NUM in('0100','0200','0300','0400','0500')";

if(prod) {	

sql2 = "SELECT distinct(cmsid) entity , ITEM FROM HOSPC.HOSPC_2009_CLXN where cmsid = " + entity + " and  WKSHT_CD = 'S100000' and LINE_NUM = '00100'  " +
		"and CLMN_NUM in('0100','0200','0300','0400','0500');"

}
connection3.query(sql2,function(err, rows) {
	
	
	for (var i = 0; i < rows.length; i++) {
		console.log(rows[i].ITEM);
		dataArray[i] = rows[i].ITEM;
		} // end top for loop
	dataArray[i] = 'Entity ID ' + entity;
	res.render('hospice', { dataArray : dataArray });

}); // end connection callback

		
			
	}