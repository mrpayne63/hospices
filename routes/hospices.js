
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
var rowsArray = new Array();
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


exports.map = function(req, res){
	
	var entity = req.params.id;
	var mapType = req.params.type;
	console.log(mapType);
	var db = 'localhost';
	var schema = 'HOSPC';
	var table = 'hospc_2013_DATA';
	var prod = false;
	

	var sql2 = "SELECT *, 2013 myyear from "+schema+"."+table+"  where RPT_REC_NUM  = "+entity
	+"  and WKSHT_CD = 'A000000' and CLMN_NUM in('1000') and LINE_NUM in ('01500','01600','01700','01800','01900')"
	+ "union SELECT *, 2014 myyear from "+schema+"."+table+"  where RPT_REC_NUM  = "+entity
	+"  and WKSHT_CD = 'A000000' and CLMN_NUM in('1000') and LINE_NUM in ('01500','01600','01700','01800','01900')";
	
	if(prod) {	
		db = '10.10.10.11';
		sql2 = "SELECT *,2009 myyear FROM HOSPC.HOSPC_2009_CLXN where cmsid = " + entity + " and WKSHT_CD = 'A000000' and CLMN_NUM in('1000') and LINE_NUM in ('01500','01600','01700','01800','01900')"
		+ " union "+
		" SELECT *,2010 myyear FROM HOSPC.HOSPC_2010_CLXN where cmsid =  " + entity + "  and WKSHT_CD = 'A000000' and CLMN_NUM in('1000') and LINE_NUM in ('01500','01600','01700','01800','01900')"
		+ " union "+
		" SELECT *,2011 myyear FROM HOSPC.HOSPC_2011_CLXN where cmsid =  " + entity + "  and WKSHT_CD = 'A000000' and CLMN_NUM in('1000') and LINE_NUM in ('01500','01600','01700','01800','01900')"
		+ " union "+
		" SELECT *,2012 myyear FROM HOSPC.HOSPC_2012_CLXN where cmsid = " + entity + " and WKSHT_CD = 'A000000' and CLMN_NUM in('1000') and LINE_NUM in ('01500','01600','01700','01800','01900')"
		+ " union "+
		"SELECT *,2013 myyear FROM HOSPC.HOSPC_2013_CLXN where cmsid = " + entity + " and WKSHT_CD = 'A000000' and CLMN_NUM in('1000') and LINE_NUM in ('01500','01600','01700','01800','01900')"
		+ " union "+
		"SELECT *,2014 myyear FROM HOSPC.HOSPC_2014_CLXN where cmsid = " + entity + " and WKSHT_CD = 'A000000' and CLMN_NUM in('1000') and LINE_NUM in ('01500','01600','01700','01800','01900')";
		
	}
	
	var dataArray = createArray(7,6);
	for(var i=0;i<dataArray.length;i++){
		for(var j =0;j<dataArray[i].length;j++){
			dataArray[i][j] = 0;
		}
		
	}


	//console.log(sql2);
	dataArray[1][0] = '2009';
	dataArray[2][0] = '2010';
	dataArray[3][0] = '2011';
	dataArray[4][0] = '2012';
	dataArray[5][0] = '2013';
	dataArray[6][0] = '2014';
	//console.log(sql2);
	connection3.query(sql2,    function(err, rows2) {
		console.log('<html>	<head><title>');
		console.log(myRows[0][1]);
		console.log('</title>');
		
		console.log('<script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>');
		console.log('<script type="text/javascript">');
		console.log("google.charts.load('current', {packages: ['corechart']});");
		console.log("</script></head><body>");
		console.log('<a href="index.html">Home</a><br />\n');
		console.log("<center><h3>Hospice Name</h3></center>");
		console.log('<div id="container" style="width: 550px; height: 400px; margin: 0 auto"></div>');
		console.log('<div id="barcontainer" style="width: 550px; height: 400px; margin: 0 auto"></div>');
		console.log('<div id="colcontainer" style="width: 550px; height: 400px; margin: 0 auto"></div>');
		console.log('<div id="combocontainer" style="width: 550px; height: 400px; margin: 0 auto"></div>');
		
		console.log('<script language="JavaScript">');
		console.log('function drawChart() {\n // Define the chart to be drawn.');
		
		console.log('var data = google.visualization.arrayToDataTable(');
	    dataArray[0][0] =  'Year';
	    dataArray[0][1] =  'PHYSICIAN SERVICES';
	    dataArray[0][2] = 'NURSING CARE';
	    	dataArray[0][3] = 'PHYSICAL THERAPY';
	    		dataArray[0][4] = 'OCCUPATIONAL THERAPY';
	    			dataArray[0][5] = 'SPEECH/LANGUAGE PATHOLOGY';
	    			//dataArray[0][6] = 'HIGH';
	 
	    //, '1500PHYSICIAN SERVICES', , ,,];
	   //                                                  // ['2013', 3833881, 21988746, 341064, 1790500, 1733100],
	                                                     // ['2014', 4178930, 21329083, 409276, 1987400, 1819700],
	                                                     // ['2015', 4555034, 20689211, 491132, 2206000, 1910700],
	                                                      //['2016', 4964987, 20068534, 589358, 2448700, 2006200]
	      
	    
	    for (var i = 0; i < rows2.length; i++) {
	    	var thisIndex = 1;
	        switch (rows2[i].myyear.toString())
	        {
	           case "2009":
	        	   thisIndex = 1;
	        	   dataArray[thisIndex][0] = '2009';
	              break;
	           case "2010":
	        	   thisIndex = 2;
	        	   dataArray[thisIndex][0] = '2010';
	              break;
	           case "2011":
	        	   thisIndex = 3;
	        	   dataArray[thisIndex][0] = '2011';
	              break;
	           case "2012":
	        	   thisIndex = 4;
	        	   dataArray[thisIndex][0] = '2012';
	              break;
	           case "2013":
	        	   thisIndex = 5;
	        	   dataArray[thisIndex][0] = '2013';
	        	   
	              break;
	           case "2014":
	        	   thisIndex = 6;
	        	   dataArray[thisIndex][0] = '2014';
	              break;
	           default:
	        }
	    	
	    	
	    	
	    	
	        switch (rows2[i].LINE_NUM)
	        {
	           case "01500":
	        	  dataArray[thisIndex][1]= parseInt(rows2[i].ITEM,10);
	              break;
	           case "01600":
	         	  dataArray[thisIndex][2]= parseInt(rows2[i].ITEM,10);
	               break;
	           case "01700":
	         	  dataArray[thisIndex][3]= parseInt(rows2[i].ITEM,10);
	               break;
	           case "01800":
	         	  dataArray[thisIndex][4]= parseInt(rows2[i].ITEM,10);
	               break;
	           case "01900":
	         	  dataArray[thisIndex][5]= parseInt(rows2[i].ITEM,10);
	               break;
	          default:
	        }      	  
	    	


	    }  // end row2 for loop
	    

	    
	    console.log(dataArray);
	    
	    console.log(');\n');
	    
	    var dataArray2 = createArray(7,7);
		for(var i=0;i<dataArray.length;i++){
			for(var j =0;j<dataArray[i].length;j++){
				dataArray2[i][j] = dataArray[i][j];
			}
			
		}
	    for(var i=0;i<dataArray2.length;i++){
	    	dataArray2[i][6]= dataArray2[i][1]+dataArray2[i][2]+dataArray2[i][3]+dataArray2[i][4]+dataArray2[i][5];
	    }
	    dataArray2[0][6]= 'Total'; 
	    console.log('var data2 = google.visualization.arrayToDataTable(');
	    console.log(dataArray2);
	    
	    console.log(');\n');
	    var mystring = myRows[0] + "'";
	    console.log('var options = {');//\n chart: {');
	    //console.log("title:");
	    //console.log("\'" + 	myRows[0].trim() );
	    //console.log("\',");
	    
	     
	   // console.log(' subtitle: \'Selected Cost Centers for 2009-2014\'');
	    console.log("legend: { position: 'top', maxLines: 5 },");
	    console.log("title:'Selected Cost Centers 2009 - 2014',");
	    console.log(' isStacked:true\n };');
	    
	    console.log('var options3 = {');//\n chart: {');
	//console.log("title:");
	//console.log("\'" + 	myRows[0].trim() );
	//console.log("\',");

	 
	// console.log(' subtitle: \'Selected Cost Centers for 2009-2014\'');
	console.log("legend: { position: 'top', maxLines: 5 },");
	console.log("title:'Selected Cost Centers 2009 - 2014'");
	console.log(' };');

	console.log('var options4 = {');//\n chart: {');
	//console.log("title:");
	//console.log("\'" + 	myRows[0].trim() );
	//console.log("\',");


	//console.log(' subtitle: \'Selected Cost Centers for 2009-2014\'');
	console.log("legend: { position: 'top', maxLines: 5 },");
	console.log("title:'Selected Cost Centers 2009 - 2014',");
	console.log("isStacked:true,");
	console.log(" vAxis: {title: 'Millions'},");
	console.log("hAxis: {title: 'Years'},");
	console.log("seriesType: 'bars',");
	console.log(" series: {5: {type: 'line'}}");
	console.log(' };');
	    
	    console.log("// Instantiate and draw the chart.");
	    console.log("var chart3 = new google.visualization.BarChart(document.getElementById('container'));");
	    console.log("var chart = new google.visualization.BarChart(document.getElementById('barcontainer'));");
	    console.log("var chart2 = new google.visualization.ColumnChart(document.getElementById('colcontainer'));");
	    console.log("var chart4 = new google.visualization.BarChart(document.getElementById('combocontainer'));");
	    console.log(" chart.draw(data, options);");
	    console.log(" chart2.draw(data, options);");
	    console.log(" chart3.draw(data, options3);");
	    console.log(" chart4.draw(data2, options4);");
	    console.log("}");
	    console.log("google.charts.setOnLoadCallback(drawChart);");
	    console.log(' </script> </body> </html>');
	    //console.log(dataArray);
	    //console.log(dataArray2);
	    
	   
	    //process.exit(0);
	    res.render('hospice2', { title : 'My Title' , dataArray : dataArray , dataArray2 : dataArray2  });
	}); // end connection2 callback

};

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
		rowsArray[i] = rows[i].ITEM;
		} // end top for loop
	rowsArray[i] = 'Entity ID ' + entity;
	res.render('hospice', { dataArray : rowsArray , entity : entity});

}); // end connection callback

		
			
};

