/*
			Check payment status script for mobile apps.
			for more details, please visit https://telr.com/support/knowledge-base/mobile-api-integration-guide/

			Devloped by hany.sakr@telr.com 
*/

var codeValue;
var statusURL = "https://secure.innovatepayments.com/gateway/mobile_complete.xml";

function MobileStatusRequest(store, key, complete){
	this.store = store;			// Store ID
	this.key = key;				// Authentication Key
	this.complete = complete;	// Transaction code obtained in the WebView response
};

function RootStatusRequest(mobileStatusRequest){
	this.mobile = mobileStatusRequest;
};

function paymentStatus(xml){
	var xmlDoc = xml.responseXML;
	console.log(xmlDoc);
	var trace = xmlDoc.getElementsByTagName("trace")[0].childNodes[0].nodeValue;
	var status = xmlDoc.getElementsByTagName("status")[0].childNodes[0].nodeValue;
	var message = xmlDoc.getElementsByTagName("message")[0].childNodes[0].nodeValue;

	document.getElementById("paymentDiv").innerHTML = "Payment status refernece no: "+ codeValue +" is : <b>" + message + "</b><br/> Trace: " + trace 
		+ "</br> <input type=\"button\" value=\"Back\" onClick=\"javascript:location.href='index.html'\"/>";
};


var telrService = {

	checkStatus : function(){
		
		codeValue = document.getElementById("code").value;
		var mobileRequest = new RootStatusRequest(new MobileStatusRequest("20040 - Lens Company", "W75df^Kr6v-Gk64T", codeValue));
		
		var x2js = new X2JS();
		var xmlRequest = x2js.json2xml_str(mobileRequest);

		var xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function() {
    		if (this.readyState == 4 && this.status == 200) {
      			paymentStatus(this);
    		}
  		};
  		xhttp.open("POST", statusURL, true);
  		xhttp.send("<?xml version=\"1.0\" encoding=\"UTF-8\"?>"+xmlRequest);

	}


};
