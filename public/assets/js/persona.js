var page_title;
var pers_title;
var contenuto;
var image_url;

$(document).ready(function(){
    
    page_title = $("title");
    serv_title = $("#title_per");
    contenuto = $("#contenuto_per");
    image_url = $("#image_per");
     console.log(URL.id);
    $.ajax({
        method: "GET",
        //dataType: "json",
        dataType: 'json',
        crossDomain: true,
        url: "/person/"+URL.id,
        data: {
            id: URL.id //SEND THE ID OF THE SERVICE TO THE SERVER TO RETRIVE ONLY THOSE DATA
        },
        success: function (response) {
           
            console.log(response.name);
            
            //UPDATE TEXT AND HTML RELATED TO THE RESPONSE RECEIVED
            page_title.text(response.name);
            serv_title.text(response.name);
            contenuto.html(response.descrizione);
            image_url.attr("src", response.img2);
            
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
        url: "http://localhost:3000/agenda?page=services&spec="+URL.id,
       
        success: function (response) {
           
            console.log(response);
            
            loadData(response);
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
        url: "http://localhost:3000/all?table=people&id=" + URL.id,
       
        success: function (response) {
           
            console.log(response);
            
            createCarousel(response);
        },
        
        error: function (request, error) {
            console.log(request + ":" + error);
        }
    });
    
    
});



function createCarousel(json){
    var caro = "";
    for (var i = 0; i < json.length; i++){
        if(json[i].id != URL.id){
            var link = "persona.html?id="+json[i].id;
        
            caro += '<div class="item"><a href="'+link+'" class="overlay-wrapper"><img src="'+json[i].img1+'" class="img-responsive underlay" width="200px"><span class="overlay"><span class="overlay-content"> <span class="h4">'+json[i].qualifica+'</span> </span></span></a><div class="item-details bg-noise"><h4 class="item-title"><a href="'+link+'">'+json[i].name+'</a></h4></div></div>';
        }
    }
    $("#other_people").append(caro);
}



function loadData(json) {

    if(URL.id != 1)
        $("#serv_svolti").html('<h3 class="block-title">Servizi svolti</h3>');
    var el = "";
    
    for (var i = 0; i < json.length; i++){
        if(i==0 || json[i].id != json[i-1].id){
            var servLink = '../services/service.html?id=' + json[i].id;
        
            el += '<li><a href="'+servLink+'">'+json[i].name+'</a><ul>';
        
            for(var j = i; j < json.length; j++){
                if(json[i].id == json[j].id){
                    var locLink = '../location/location.html?id=' + json[j].idlocation;

                    el += '<li><small><a href="'+locLink+'">'+json[j].locationname+'</a></small><br>Orari di servizio:<br><div>'+json[j].orario+'</div></li>';
                }
            }
        }
        el += '</ul></li>';
        
    }
    
    $("#agenda").append(el);
    

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
