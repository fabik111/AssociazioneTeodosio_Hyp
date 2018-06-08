var page_title;
var serv_title;
var contenuto;
var image_url;
//var locationX;
//var personaX;
//var dataX;

$(document).ready(function(){
    
    page_title = $("#title");
    serv_title = $("#title_serv");
    contenuto = $("#contenuto_serv");
    image_url = $("#image_serv");
     console.log(URL.id);
    $.ajax({
        method: "GET",
        //dataType: "json",
        dataType: 'json',
        crossDomain: true,
        url: "http://localhost:3000/service/"+URL.id,
        data: {
            id: URL.id //SEND THE ID OF THE SERVICE TO THE SERVER TO RETRIVE ONLY THOSE DATA
        },
        success: function (response) {
           
            console.log(response.name);
            
            //UPDATE TEXT AND HTML RELATED TO THE RESPONSE RECEIVED
            page_title.text(response.name);
            serv_title.text(response.name);
            contenuto.html(response.descrizione);
            image_url.attr("src",response.img); 
            
            //TODO : caricare gli orari dei servizi
        },
        error: function (request, error) {
            console.log(request + ":" + error);
        }
    });
});
    

    
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
