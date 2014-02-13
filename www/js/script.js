var name='demobaas';
var pass='d@ciXum3';
var code='1234567890';
var sessionCode="";

function updateDbValues(){
  name = $('#name')[0].value;
  pass = $('#pass')[0].value;
  
}  

function loginButtonClicked(evt){
  updateDbValues();
   $.ajax({
	url: 'http://baasbox.sara.cloudlet.sara.nl:9000/login',
	type: 'POST',
    data: { 
       username: name,
       password: pass,
       appcode: code 
     },
     success: function(data, textStatus, jqXHR) 
        {
        	$('#result').html(JSON.stringify(data.data));
            sessionCode=data.data["X-BB-SESSION"];
        },
    error: function(data, textStatus, jqXHR) 
        {
        	$('#result').html(textStatus);
        }
    });
}

function findButtonClicked(evt){
	$.ajax({
	url: 'http://baasbox.sara.cloudlet.sara.nl:9000/document/democollection',
	headers: {
        "X-BB-SESSION": sessionCode
     
    },
     success: function(data, textStatus, jqXHR) 
        {
        	$('#result').html(JSON.stringify(data.data));
        
        },
            error: function(data, textStatus, jqXHR) 
        {
        	$('#result').html(textStatus);
        }
    });
}

function insertButtonClicked(evt){
	$.ajax({
	url: 'http://baasbox.sara.cloudlet.sara.nl:9000/document/democollection',
	type: 'POST',
    data: $('#newelement')[0].value,
    headers: {
        "X-BB-SESSION": sessionCode,
    },
    dataType: 'json',
    contentType: 'application/json',
    success: function(data, textStatus, jqXHR) 
        {
        	$('#result').html(JSON.stringify(data.data));
        },
            error: function(data, textStatus, jqXHR) 
        {
        	$('#result').html(textStatus);
        },
    });
}

jQuery(document).ready(function($) {
  $('#login').click(loginButtonClicked);
  $('#find').click(findButtonClicked);
  $('#insert').click(insertButtonClicked);
});