// server.js
// load the things we need
var express = require('express');
var path = require("path");
var app = express();
var publicPath = path.resolve(__dirname, "public");
var staticPath = path.resolve(__dirname, "static2");
app.use(express.static(publicPath));
app.use(express.static(staticPath));

var index = require('./routes');
var about = require('./routes/about');
var hospices = require('./routes/hospices');
app.set('views', __dirname + '/views/pages');
// set the view engine to ejs
app.set('view engine', 'ejs');

var entries = [];
app.locals.entries = entries;
var dataArray = new Array();
app.locals.dataArray = dataArray;

var mysql = require('mysql');
var db = 'localhost';
var schema = 'HOSPC';
var table = 'hospc_2013_DATA';
var prod = false;

var sql3 = "SELECT distinct(RPT_REC_NUM) entity, ITEM from "+schema+"."+table + " where " +
		" RPT_REC_NUM in (31394,32352,32494,32589,32672,32675,33085,33229,33312,33471) and " +
		" WKSHT_CD = 'S100000' and LINE_NUM = '00100' and CLMN_NUM in('0100')";

if(prod) {	
	
	db = '10.10.10.11';
	//entity = 101508;
	sql3 = "SELECT distinct(cmsid) entity , ITEM FROM HOSPC.HOSPC_2009_CLXN where cmsid in ('101537','101529','101500','101508','421555','101515','451520','101518','051511') and  WKSHT_CD = 'S100000' and LINE_NUM = '00100'  and CLMN_NUM in('0100');"

}

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

	//console.log(JSON.stringify(rows));
	for (var i = 0; i < rows.length; i++) {
		//console.log(rows[i].entity);
		entries.push({
			entityID: rows[i].entity,
			name: rows[i].ITEM
			});
} // end top for loop
	

}); // end connection callback



// use res.render to load up an ejs view file
//index page 
app.get('/', index.index);

// about page 
app.get('/about', about.about);

app.get('/hospices', hospices.list);

app.get('/hospice/:id', hospices.one);

app.get('/hospice/:id/map/:type', hospices.map);
 
app.listen(8888);

console.log('8080 is the magic port');
