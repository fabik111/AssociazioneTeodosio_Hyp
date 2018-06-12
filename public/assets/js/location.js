var page_title;
var loc_title;
var contenuto;
var image_url;
var map_url;
var contatti;

$(document).ready(function(){
    
    page_title = $("#title");
    loc_title = $("#title_loc");
    contenuto = $("#contenuto_loc");
    image_url = $("#image_loc");
    map_url = $("iframe");
    contatti = $("#contacts");
    
     console.log(URL.id);
    $.ajax({
        method: "GET",
        //dataType: "json",
        dataType: 'json',
        crossDomain: true,
        url: "http://localhost:3000/location/"+URL.id,
        data: {
            id: URL.id //SEND THE ID OF THE SERVICE TO THE SERVER TO RETRIVE ONLY THOSE DATA
        },
        success: function (response) {
           
            console.log(response.name);
            
            //UPDATE TEXT AND HTML RELATED TO THE RESPONSE RECEIVED
            page_title.text(response.name);
            loc_title.text(response.name);
            contenuto.html(response.descrizione);
            image_url.attr("src",response.img); 
            map_url.attr("src", response.mappa);
            contatti.html(response.contatti);
            
        },
        error: function (request, error) {
            console.log(request + ":" + error);
        }
    });
    
    $.ajax({
        method: "GET",
        //dataType: "json",
        dataType: 'json',
        crossDomain: true,
        url: "http://localhost:3000/agenda_location",
       
        success: function (response) {
           
            console.log(response);
            
            loadData(response);
        },
        
        error: function (request, error) {
            console.log(request + ":" + error);
        }
    });
    
    
});






function loadData(json) {

    console.log(json);
    var el = "";
    
    for (var i = 0; i < json.length; i++){
        
        var servLink = '../services/service.html?id=' + json[i].idservizio;
        
        el += '<li><a href="'+servLink+'">'+json[i].servicesname+'</a><p>Orari di servizio:<br><div>'+json[i].orario+'</div></li>';

    }
    
    $("#agendaList").append(el);
    

}
    

    
var URL = function () {
  // This function is anonymous, is executed immediately and 
  // the return value is assigned to QueryString!
  var query_string = {};
  var query = window.location.search.substring(1);
  var vars = query.split("&");
  for (var i=0;i<vars.length;i++) {
    var pair = vars[i].split("=");
        // If first entry with this name
    if (typeof query_string[pair[0]] === "undefined") {
      query_string[pair[0]] = decodeURIComponent(pair[1]);
        // If second entry with this name
    } else if (typeof query_string[pair[0]] === "string") {
      var arr = [ query_string[pair[0]],decodeURIComponent(pair[1]) ];
      query_string[pair[0]] = arr;
        // If third or later entry with this name
    } else {
      query_string[pair[0]].push(decodeURIComponent(pair[1]));
    }
  } 
  return query_string;
}();
